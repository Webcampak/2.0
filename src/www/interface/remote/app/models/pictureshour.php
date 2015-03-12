<?php
/*
Copyright 2010-2012 Infracom & Eurotechnia (support@webcampak.com)
This file is part of the Webcampak project.
Webcampak is free software: you can redistribute it and/or modify it 
under the terms of the GNU General Public License as published by 
the Free Software Foundation, either version 3 of the License, 
or (at your option) any later version.

Webcampak is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Webcampak. 
If not, see http://www.gnu.org/licenses/.
*/
/**
 * @class Pictureshour
 */
class Pictureshour {
	public $id, $attributes;	
    
	static function all() {
		Log::debug("Log: /remote/lib/models/pictureshour.php - all() function");

		$userAuth = new Authorizations();
		$dbsources = new SourcesDB();
		$picsfs = new PicturesFS();		
		
		//Get sourceid from Sencha store, if no set sourceid to 0
		if (isset($_REQUEST["sourceid"])) {
			if ($_REQUEST["sourceid"] == "0") {
				//If no source is defined by Sencha, send a request to get allowed sources, select the ID with smallest weight.
				Log::debug("Log: /remote/lib/models/pictureshour.php - all() - No sources specified by Sencha, looking into database to find default source");
				$allowedsources = $userAuth->userAllowedSources();
				$sourceid = $allowedsources[0]['sourceid'];
				Log::debug("Log: /remote/lib/models/picturesview.php - all() - No sources specified by Sencha, using source: " . $sourceid);								
			} 
			else {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);}
		}
		
		if ($userAuth->isAllowedToAccessSource($sourceid) == true) {		
			date_default_timezone_set(CFGSYS_TIMEZONE);
	
			//Get timestamp from Sencha store, if no timestamp, set to 0
			if (isset($_REQUEST["currentdate"])) {$currentdate = strip_tags($_REQUEST["currentdate"]) * 1;}
			else {$currentdate = 0;}		
			if ($currentdate == 0) { // We look to lates picture within directory
				$currentdate = $picsfs->getPicture(CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/", "last");
				//$currentdate = mktime(1, 1, 1, substr($currentpicture, 4,2), substr($currentpicture, 6,2), substr($currentpicture, 0,4));	
			} 
			else {
				Log::debug("Log: /remote/lib/models/videoslist.php - all() - Using date sent by Sencha");
				//$currentdate = round($currentdate / 1000); // 28800 to be removed, this is a trick
			} 

			Log::debug("Log: /remote/lib/models/videoslist.php - all() - current date: " . $currentdate);		
			Log::debug("Log: /remote/lib/models/videoslist.php - all() - target directory: " . $targetdir);
			
			$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/" . substr($currentdate, 0,8) . "/";
			Log::debug("Log: /remote/lib/models/pictureshour.php - all() - target directory: " . $targetdir);

			Log::debug("Log: /remote/lib/models/pictureshour.php - all() - Scan pictures directory to extract hours and minutes");
			$checkpics = array();
			if (is_dir($targetdir)) {
				if ($handle = opendir($targetdir)) {
					while (false !== ($currentpic = readdir($handle))) {
						if ($currentpic != "." && $currentpic != ".." && substr($currentpic, 0,2)== "20") {
							$path_parts = pathinfo($targetdir . $currentpic);
							if ($path_parts['extension'] == "jpg") {
								//array_push($listfiles, $currentpic);
								//error_log("Scan Pic: H: " . substr($currentpic, 8,2) . " - M:" .  substr($currentpic,10,2) . " - " . $targetdir . $currentpic, 0);
								$currenthour = substr($currentpic, 8,2);
								$currentminute = substr($currentpic,10,2);
								//SEND BACK FILENAME
								$checkpics[$currenthour][$currentminute] = substr($currentpic, 0,14);
								//SEND BACK TIMESTAMP
								//$checkpics[$currenthour][$currentminute] = mktime(substr($currentpic, 8,2), substr($currentpic, 10,2), substr($currentpic, 12,2), substr($currentpic, 4,2), substr($currentpic, 6,2), substr($currentpic, 0,4))  * 1000;
								//20120703002202
							}
						}
					}
					closedir($handle);
				}
			}
			
			Log::debug("Log: /remote/lib/models/pictureshour.php - all() - Directory scanned, preparing array to be sent back via JSON");
			$picsdb = new PicturesDB();				
			$results = array();
			for ($i=0;$i<24;$i++) {
				$tmpresults = array();
				if ($i < 10) {$currenthour = "0" . $i;} else {$currenthour = (string)$i;}
				$tmpresults['id'] = $currenthour;
				for ($j=0;$j<60;$j++) {
					if ($j < 10) {$currentminute = "0" . $j;} else {$currentminute = (string)$j;}
					if (isset($checkpics[$currenthour][$currentminute])) {
						if ($checkpics[$currenthour][$currentminute] != "0") {
							$tmpresults[$currentminute] = $checkpics[$currenthour][$currentminute];
							if ($picsdb->getPictureCommentsId($sourceid, substr($tmpresults[$currentminute], 0,14)) > 0) {
								$tmpresults[$currentminute] = "X" . $tmpresults[$currentminute];
							}
						}
					} else {
						$tmpresults[$currentminute] = "0";
					}				
				}
				array_push($results, $tmpresults);
			}		
			return $results; 
		}
		else {
			Log::debug("Log: /remote/lib/models/pictureshour.php - all() - User not allowed to access page, terminating ....");
			exit();
		}
	}
}

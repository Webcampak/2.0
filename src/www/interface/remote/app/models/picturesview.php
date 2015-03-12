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
 * @class Picturesview
 */
class Picturesview {
	public $id, $attributes;	

	//Return all elements necessary to display pictures    
	static function all() {
		Log::debug("Log: /remote/lib/models/picturesview.php - all() function");

		//Get timestamp from Sencha store, if no timestamp, set to 0
		if (isset($_REQUEST["currentdate"])) {$currentdate = strip_tags($_REQUEST["currentdate"]) * 1;}
		else {$currentdate = 0;}
		$tmpresults['currentdate'] = $currentdate;

		$userAuth = new Authorizations();
		$dbsources = new SourcesDB();
		$picsfs = new PicturesFS();
		
		//Get sourceid from Sencha store, if no set sourceid to 0
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);}
		else {$sourceid = 0;}
		Log::debug("Log: /remote/lib/models/picturesview.php - all() - sourceid: " . $sourceid );
		if ($sourceid == 0) {
			//If no source is defined by Sencha, send a request to get allowed sources, select the ID with smallest weight.
			Log::debug("Log: /remote/lib/models/picturesview.php - all() - No sources specified by Sencha, looking into database");
			$allowedsources = $userAuth->userAllowedSources();
			$sourceid = $allowedsources[0]['sourceid'];
			Log::debug("Log: /remote/lib/models/picturesview.php - all() - No sources specified by Sencha, using source: " . $sourceid);				
		} 

		
		if ($userAuth->isAllowedToAccessSource($sourceid) == true) {
			Log::debug("Log: /remote/lib/models/picturesview.php - all() - User allowed to access source " . $sourceid);

			$results = array();

			if (isset($_REQUEST["zoomlevel"])) { $tmpresults['zoomlevel'] = (int) strip_tags($_REQUEST["zoomlevel"]);} 
			else {$tmpresults['zoomlevel'] = 0;}

			if (isset($_REQUEST["timthumb"])) { $tmpresults['timthumb'] = (int) strip_tags($_REQUEST["timthumb"]);} 
			else {$tmpresults['timthumb'] = 0;}
			if ($tmpresults['timthumb'] == 2) {			
				$tmpresults['timthumb'] = CFGDIR_TIMTHUMBUSE;
			}

			//Get source name pass it to the return array
			$tmpresults['sourcename'] = $dbsources->getSourceName($sourceid);		
			Log::debug("Log: /remote/lib/models/picturesview.php - all() - Source Name:" . $tmpresults['sourcename'] . " ID: " . $sourceid);

			$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/";
			Log::debug("Log: /remote/lib/models/picturesview.php - all() - Target Directory: " . $targetdir);
			if ($currentdate == 0) {
				Log::debug("Log: /remote/lib/models/picturesview.php - all() - No date selected, looking for latest picture in directory");
				$currentpicture = $picsfs->getPicture($targetdir, "last");
			} else {
				Log::debug("Log: /remote/lib/models/picturesview.php - all() - Date selected via interface: " . $currentdate);				
				$currentpicture = $currentdate . ".jpg";
			}
			
			//Find closest picture			
			if (!is_file($targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture)) {
				Log::debug("Log: /remote/lib/models/picturesview.php - all() - " . $currentpicture . " does not exist, looking for closest picture");	
				$currentpicture = $picsfs->getClosestPicture($sourceid, $currentpicture);													
			}				
			
			Log::debug("Log: /remote/lib/models/picturesview.php - all() - Target file: " . $targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture);							
			if (is_file($targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture)) {
				Log::debug("Log: /remote/lib/models/picturesview.php - all() - Check Picture: " . $targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture);								
				$tmpresults['id'] = substr($currentpicture, 0,14);
				$tmpresults['sourceid'] = $sourceid;			
				$tmpresults['picture'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($currentpicture, 0,8) . "/" . $currentpicture . "&s=" . $sourceid . "&q=100";	
				$tmpresults['pictureurl'] = "/sources/source" . $sourceid . "/pictures/" . substr($currentpicture, 0,8) . "/" . $currentpicture;					
/*				if (CFGDIR_TIMTHUMB != "") {
					$tmpresults['picture'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($currentpicture, 0,8) . "/" . $currentpicture . "&s=" . $sourceid . "&q=100";				
				} else {
					$tmpresults['picture'] = CFGDIR_WEBSOURCESDIR . "source" . $sourceid . "/pictures/" . substr($currentpicture, 0,8) . "/" . $currentpicture;				
				}*/
				list($picwidth, $picheight, $pictype, $attr) = getimagesize($targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture);
				$tmpresults['picturewidth'] = $picwidth;			
				$tmpresults['pictureheight'] = $picheight;										
				$tmpresults['picturetime'] = substr($currentpicture, 0,14);
				$tmpresults['picturelast'] = $picsfs->getPicture($targetdir, "last");

				//Looking for a comment associated with the picture
				$picsdb = new PicturesDB();	
				$tmpresults['picturecomment'] = $picsdb->getPictureComment($sourceid, substr($currentpicture, 0,14));				

				// Looking for thumbnails
				// Thumbnails will be used to display 15th, 10th, 5th pic before and after current picture
				// We start by building an array containing all pictures from current day, on day before and one day after (considering that there is always more than 15 pictures per days), otherwise it would be necessary to look into more directories
				Log::debug("Log: /remote/lib/models/picturesview.php - all() - Looking up for thumbnails");
				$checkdir = array();
				$checkpics = array();			
				$checkdir = $picsfs->getPicturesDirectories($targetdir);
				for($i=0;$i<count($checkdir); $i++) {
					if ($checkdir[$i] == substr($currentpicture, 0,8)) {
						if (isset($checkdir[$i-1]) && $checkdir[$i-1] != "") {
							$tmparray = array();
							$tmparray = $picsfs->getPicturesFiles($targetdir . $checkdir[$i-1] . "/");
							$checkpics = array_merge($checkpics, $tmparray);						
						}
						$tmparray = array();
						$tmparray = $picsfs->getPicturesFiles($targetdir . $checkdir[$i] . "/");
						$checkpics = array_merge($checkpics, $tmparray);
						if (isset($checkdir[$i+1])) {					
							if ($checkdir[$i+1] != "") {
								$tmparray = array();
								$tmparray = $picsfs->getPicturesFiles($targetdir . $checkdir[$i+1] . "/");
								$checkpics = array_merge($checkpics, $tmparray);	
							}
						}
					}
				}
				sort($checkpics);

				for($i=0;$i<count($checkpics); $i++) {
					if (substr($checkpics[$i], 0,14) == substr($currentpicture, 0,14)) {
						//error_log("CHECK PICS: " . $checkpics[$i] . " == " . substr($currentpicture, 0,14), 0);																						
						if (isset($checkpics[$i-15])) {
								if ($checkpics[$i-15] != "") {
									$tmpresults['thumb1'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i-15], 0,8) . "/" . $checkpics[$i-15] . "&s=" . $sourceid . "&q=100";
									$tmpresults['thumb1time'] = substr($checkpics[$i-15], 0,14);
									Log::debug("Log: /remote/lib/models/picturesview.php - all() - Thumbnail 1 identified: " . $checkpics[$i-15]);
								}
						}
						if (isset($checkpics[$i-10])) {
								if ($checkpics[$i-10] != "") {
									$tmpresults['thumb2'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i-10], 0,8) . "/" . $checkpics[$i-10] . "&s=" . $sourceid . "&q=100";
									$tmpresults['thumb2time'] = substr($checkpics[$i-10], 0,14);
									Log::debug("Log: /remote/lib/models/picturesview.php - all() - Thumbnail 2 identified: " . $checkpics[$i-10]);
								}
						}													
						if (isset($checkpics[$i-5])) {
								if ($checkpics[$i-5] != "") {
									$tmpresults['thumb3'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i-5], 0,8) . "/" . $checkpics[$i-5] . "&s=" . $sourceid . "&q=100";
									$tmpresults['thumb3time'] = substr($checkpics[$i-5], 0,14);
									Log::debug("Log: /remote/lib/models/picturesview.php - all() - Thumbnail 3 identified: " . $checkpics[$i-5]);
								}
						}													
						if (isset($checkpics[$i-1])) {
								if ($checkpics[$i-1] != "") {
									$tmpresults['pictureprevious'] = substr($checkpics[$i-1], 0,14);
									Log::debug("Log: /remote/lib/models/picturesview.php - all() - Previous picture identified: " . $checkpics[$i-1]);
								}
						}													
						if (isset($checkpics[$i+1])) {
								if ($checkpics[$i+1] != "") {
									$tmpresults['picturenext'] = substr($checkpics[$i+1], 0,14);
									Log::debug("Log: /remote/lib/models/picturesview.php - all() - Following picture identified: " . $checkpics[$i+1]);
								}						
						}													
						if (isset($checkpics[$i+5])) {
								if ($checkpics[$i+5] != "") {
									$tmpresults['thumb4'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i+5], 0,8) . "/" . $checkpics[$i+5] . "&s=" . $sourceid . "&q=100";
									$tmpresults['thumb4time'] = substr($checkpics[$i+5], 0,14);
									Log::debug("Log: /remote/lib/models/picturesview.php - all() - Thumbnail 4 identified: " . $checkpics[$i+5]);
								}													
						}													
						if (isset($checkpics[$i+10])) {
								if ($checkpics[$i+10] != "") {
									$tmpresults['thumb5'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i+10], 0,8) . "/" . $checkpics[$i+10] . "&s=" . $sourceid . "&q=100";
									$tmpresults['thumb5time'] = substr($checkpics[$i+10], 0,14);
									Log::debug("Log: /remote/lib/models/picturesview.php - all() - Thumbnail 5 identified: " . $checkpics[$i+10]);
								}													
						}													
						if (isset($checkpics[$i+15])) {
								if ($checkpics[$i+15] != "") {
									$tmpresults['thumb6'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i+15], 0,8) . "/" . $checkpics[$i+15] . "&s=" . $sourceid . "&q=100";
									$tmpresults['thumb6time'] = substr($checkpics[$i+15], 0,14);
									Log::debug("Log: /remote/lib/models/picturesview.php - all() - Thumbnail 6 identified: " . $checkpics[$i+15]);
								}													
						}													
					}
				}
				
				Log::debug("Log: /remote/lib/models/picturesview.php - all() - Identify dates to be disabled into calendar (if no pictures are available for the date)");
				//Defined dates to be displayed in calendar
				//$tmpresults['disableddates'] = "'06/09/2012', '04/../2012'";
				$checkdirs = array();
				if (is_dir($targetdir)) {
					//$checkdirs = $picsfs->getPicturesDirectories($targetdir);
					$firstpicture = $picsfs->getPicture($targetdir, "first"); // Get first webcampak picture
					$lastpicture = $picsfs->getPicture($targetdir, "last"); // Get first webcampak picture					
					$tmpresults['disableddates'] = "";
					//YYYYMMDD				
					//$alldays = $picsfs->getDaysBetweenDates(substr($checkdirs[0], 0,8), substr(end($checkdirs), 0,8));	
					$alldays = $picsfs->getDaysBetweenDates(substr($firstpicture, 0,8), substr($lastpicture, 0,8));	
					foreach($alldays as $idx=>$currentday) { 
						if ($picsfs->getNbPicturesDirectory($targetdir . $currentday . "/") == 0) {
							//error_log("Log: /remote/lib/session_db.php - getPicturesviews() - Processing Day: " . $currentday . " - Nb Pictures for this day: " . $picsfs->getNbPicturesDirectory($targetdir . $currentday . "/"), 0);						
							if ($tmpresults['disableddates'] != "") { $tmpresults['disableddates'] = $tmpresults['disableddates'] . ", ";}
							$tmpresults['disableddates'] = $tmpresults['disableddates'] . "'" . substr($currentday, 4,2) . "/" . substr($currentday, 6,2) . "/" .  substr($currentday, 0,4) . "'";
						}
					} 				
					if (substr($firstpicture, 0,2)== "20") {
						$tmpresults['mindate'] = mktime(8, 8, 8, substr($firstpicture, 4,2), substr($firstpicture, 6,2), substr($firstpicture, 0,4))  * 1000;	
					}
					if (substr($lastpicture, 0,2)== "20") {
						$tmpresults['maxdate'] = mktime(8, 8, 8, substr($lastpicture, 4,2), substr($lastpicture, 6,2), substr($lastpicture, 0,4))  * 1000;	
					}
				}
				array_push($results, $tmpresults);
			}
			//error_log("Output Elements: " . http_build_query($results), 0);					
			return $results; 	
		} else {
			Log::debug("Log: /remote/lib/models/picturesview.php - all() - User not allowed to access source: " . $sourceid . ", terminating ....");
			exit();
		}
    }

}

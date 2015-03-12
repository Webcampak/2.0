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
 * @class Configwatermarkfile
 */
class Sensor  { 
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/sensor.php - all() function");
		
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
		Log::debug("Log: /remote/lib/models/sensor.php - all() - sourceid: " . $sourceid );
		if ($sourceid == 0) {
			Log::debug("Log: /remote/lib/models/sensor.php - all() - No sources specified by Sencha, looking into database");
			$allowedsources = $userAuth->userAllowedSources();
			$sourceid = $allowedsources[0]['sourceid'];
			Log::debug("Log: /remote/lib/models/sensor.php - all() - No sources specified by Sencha, using source: " . $sourceid);				
		} 

		$results = array();
		if ($userAuth->isAllowedToAccessSource($sourceid) == true) {
			Log::debug("Log: /remote/lib/models/sensor.php - all() - User allowed to access source " . $sourceid);
			if ($userAuth->isAllowedToAccessPage("auth.sensors") == true) {
				$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/";	
				if ($currentdate == 0) {
					Log::debug("Log: /remote/lib/models/picturesview.php - all() - No date selected, looking for latest picture in directory");
					$currentpicture = $picsfs->getPicture($targetdir, "last");
				} else {
					Log::debug("Log: /remote/lib/models/picturesview.php - all() - Date selected via interface: " . $currentdate);				
					$currentpicture = $currentdate . ".jpg";
				}						
				//Looking for Sensor Files
				$i = 1;
				if ($handle = opendir($targetdir . substr($currentpicture, 0,8) . "/")) {
					while (false !== ($entry = readdir($handle))) {
						if (substr($entry, 0,7) == "Sensor-") {
							$path_parts = pathinfo($targetdir . substr($currentpicture, 0,8) . "/" . $entry);
							if ($path_parts['extension'] == "png") {
								$tmpresults['sensor' . $i] = "/sources/source" . $sourceid . "/pictures/" . substr($currentpicture, 0,8) . "/" . $entry;
								$i++;	
							}							
						}
					}
					closedir($handle);
				}
			}				
			array_push($results, $tmpresults);					
		}	
		return $results; 				
	}	


}

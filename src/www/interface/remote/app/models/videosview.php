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
 * @class Videosview
 */
class Videosview {
	public $id, $attributes;	

	//Return all elements necessary to display video    
	static function all() {
		Log::debug("Log: /remote/lib/models/videosview.php - all() function");

		$tmpresults = array();

		//Get timestamp from Sencha store, if no timestamp, set to 0
		if (isset($_REQUEST["currentfile"])) {$currentfile = strip_tags($_REQUEST["currentfile"]);}
		else {$currentfile = 0;}
		$tmpresults['currentfile'] = $currentfile;

		$userAuth = new Authorizations();
		$dbsources = new SourcesDB();
		$vidsfs = new VideosFS();
		
		//Get sourceid from Sencha store, if no set sourceid to 0
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);}
		else {$sourceid = 0;}
		Log::debug("Log: /remote/lib/models/videosview.php - all() - sourceid: " . $sourceid );
		if ($sourceid == 0) {
			//If no source is defined by Sencha, send a request to get allowed sources, select the ID with smallest weight.
			Log::debug("Log: /remote/lib/models/videosview.php - all() - No sources specified by Sencha, looking into database");
			$allowedsources = $userAuth->userAllowedSources();
			$sourceid = $allowedsources[0]['sourceid'];
			Log::debug("Log: /remote/lib/models/videosview.php - all() - No sources specified by Sencha, using source: " . $sourceid);				
		} 

		if ($userAuth->isAllowedToAccessSource($sourceid) == true) {
			Log::debug("Log: /remote/lib/models/videosview.php - all() - User allowed to access source " . $sourceid);

			$results = array();
			$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/videos/";
			
			//Get source name pass it to the return array
			$tmpresults['sourcename'] = $dbsources->getSourceName($sourceid);		
			Log::debug("Log: /remote/lib/models/videosview.php - all() - Source Name:" . $tmpresults['sourcename'] . " ID: " . $sourceid);
			Log::debug("Log: /remote/lib/models/videosview.php - all() - Target Directory: " . $targetdir);
			
			if ($currentfile == 0) {
				$currentfile = $vidsfs->getVideo($targetdir, "last");
			}
			if (!is_file($targetdir . $currentfile)) {
				$currentfile = $vidsfs->getVideo($targetdir, "last");
			}
			$currentdate = mktime(1, 1, 1, substr($currentfile, 4,2), substr($currentfile, 6,2), substr($currentfile, 0,4));	
			$tmpresults['currentdate'] = mktime(8, 8, 8, substr($currentfile, 4,2), substr($currentfile, 6,2), substr($currentfile, 0,4))  * 1000;						
			Log::debug("Log: /remote/lib/models/videosview.php - all() - File selected via interface: " . $currentfile);			

			if (is_file($targetdir . $currentfile)) {
				$tmpresults['sourceid'] = $sourceid;
				if (is_file($targetdir . $currentfile . ".mp4")) {
					Log::debug("Log: /remote/lib/models/videosview.php - all() - An MP4 video file is available for: " . $currentfile);
					if (is_file($targetdir . $currentfile . ".jpg")) {							
						list($picwidth, $picheight, $pictype, $attr) = getimagesize($targetdir . $currentfile . ".jpg");
						$tmpresults['previewpicturewidth'] = $picwidth;			
						$tmpresults['previewpictureheight'] = $picheight;
						$tmpresults['previewpicture'] = CFGDIR_WEBSOURCESDIR . "source" . $sourceid . "/videos/" . $currentfile . ".jpg";
					}
					$tmpresults['previewvideo'] = CFGDIR_WEBSOURCESDIR . "source" . $sourceid . "/videos/" . $currentfile . ".mp4";
				}
				if (substr($currentfile, 8) == ".1080p.avi" || substr($currentfile, 8) == ".720p.avi" || substr($currentfile, 8) == ".480p.avi" || substr($currentfile, 8) == ".custom.avi") {
					$tmpresults['videoname'] = $currentfile; // Video is an automated generated video
				} else {
					$tmpresults['videoname'] = substr($currentfile, 9); // Video is a custom generated video (location 9 to remove _)
				}				

				// Identify previous and following pictures
				$checkvids = $vidsfs->getVideosFiles($targetdir, 0);
				for($i=0;$i<count($checkvids); $i++) {
					if ($checkvids[$i] == $currentfile) {
						if (isset($checkvids[$i-1])) {
							if ($checkvids[$i-1] != "") {
								$tmpresults['videoprevious'] = $checkvids[$i-1];
								Log::debug("Log: /remote/lib/models/videosview.php - all() - Previous video identified: " . $checkvids[$i-1]);
							}
						}													
						if (isset($checkvids[$i+1])) {
							if ($checkvids[$i+1] != "") {
								$tmpresults['videonext'] = $checkvids[$i+1];
								Log::debug("Log: /remote/lib/models/videosview.php - all() - Following video identified: " . $checkvids[$i+1]);
							}						
						}							
					}
				}
				
				Log::debug("Log: /remote/lib/models/videosview.php - all() - Identify dates to be disabled into calendar (if no videos are available for the date)");
				//Defined dates to be displayed in calendar
				//$tmpresults['disableddates'] = "'06/09/2012', '04/../2012'";
				$checkdirs = array();
				if (is_dir($targetdir)) {
					$firstvideo = $vidsfs->getVideo($targetdir, "first"); // Get first webcampak video
					$lastvideo = $vidsfs->getVideo($targetdir, "last"); // Get first webcampak video					
					$tmpresults['disableddates'] = "";
					//YYYYMMDD				
					$alldays = $vidsfs->getDaysBetweenDates(substr($firstvideo, 0,8), substr($lastvideo, 0,8));
					$daysnbvideos = $vidsfs->getNbVideos($targetdir);
					foreach($alldays as $idx=>$currentday) { 
						if (isset($daysnbvideos[$currentday])) {
							//Log::debug("Log: /remote/lib/models/videosview.php - all() - Day: " . $currentday . " Nb Videos: " . $daysnbvideos[$currentday]);
						} else {
							//Log::debug("Log: /remote/lib/models/videosview.php - all() - Day: " . $currentday . " Nb Videos: 0");							
							if ($tmpresults['disableddates'] != "") { $tmpresults['disableddates'] = $tmpresults['disableddates'] . ", ";}
							$tmpresults['disableddates'] = $tmpresults['disableddates'] . "'" . substr($currentday, 4,2) . "/" . substr($currentday, 6,2) . "/" .  substr($currentday, 0,4) . "'";	
						}
					} 				
					if (substr($firstvideo, 0,2)== "20") {
						$tmpresults['mindate'] = mktime(8, 8, 8, substr($firstvideo, 4,2), substr($firstvideo, 6,2), substr($firstvideo, 0,4))  * 1000;	
					}
					if (substr($lastvideo, 0,2)== "20") {
						$tmpresults['maxdate'] = mktime(8, 8, 8, substr($lastvideo, 4,2), substr($lastvideo, 6,2), substr($lastvideo, 0,4))  * 1000;	
					}
				}				
			}	
			array_push($results, $tmpresults);	
			return $results; 			
		} else {
			Log::debug("Log: /remote/lib/models/videosview.php - all() - User not allowed to access source: " . $sourceid . ", terminating ....");
			exit();
		}
    }

}

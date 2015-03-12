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
 * @class VideosFS
 * Contains all functions related to pictures and MySQL database
 */
class VideosFS {	


	public function getVideosFiles($targetdir, $day) {
		//Return an array containing all videos in a directory
		// $day correspond to day, using YYYYMMDD format
		Log::debug("Log: /remote/lib/filesystem/videos.php - getVideosFiles(" . $targetdir . ", " . $day . ")");
		$checkvids = array(); 
		if (is_dir($targetdir)) {
			if ($handle = opendir($targetdir)) {
				while (false !== ($currentvid = readdir($handle))) {
					if (is_file($targetdir . $currentvid) && substr($currentvid, 0,2) == "20") {
						$path_parts = pathinfo($targetdir . $currentvid);
						if ($path_parts['extension'] == "avi") {
							Log::debug("Log: /remote/lib/filesystem/videos.php - getVideosFiles() - " . $currentvid);	
							if ($day == 0) {
								array_push($checkvids, $currentvid);
							} else {
								if (substr($currentvid, 0,8) == $day) {
									array_push($checkvids, $currentvid);
								} elseif ($day == 0) {
									array_push($checkvids, $currentvid);									
								}
							}
						}
					}
				}
				closedir($handle);
			}					
		}
		rsort($checkvids);
		return $checkvids;
	}  

	//Return the number of videos for a specified day
	public function getNbVideos($targetdir) {	
		//Log::debug("Log: /remote/lib/filesystem/pictures.php - getNbPicturesDirectory() function", 0);  	
		$count = 0;
		$results = array();
		if (is_dir($targetdir)) {
			if ($handle = opendir($targetdir)) {
				while (false !== ($currentvid = readdir($handle))) {
					if (is_file($targetdir . $currentvid) && substr($currentvid, 0,2) == "20") {
						$path_parts = pathinfo($targetdir . $currentvid);
						if ($path_parts['extension'] == "avi") {
							$currentday = substr($currentvid, 0,8);
							if (isset($results[$currentday])) {
								$results[$currentday] = $results[$currentday]++;
							} else {
								$results[$currentday] = 1;
							}
							//error_log("LIST FILES: " . $day . " == " . substr($currentvid, 0,8), 0);								
							//if ($day == substr($currentvid, 0,8)) {
								//error_log("=====LIST FILES: " . $day . " == " . substr($currentvid, 0,8), 0);								
							//	$count = $count++;
							//} 
						}
					}
				}
				closedir($handle);
			}			
		}
		return $results;
		//return $count;		
	}


	public function getDaysBetweenDates($strDateFrom,$strDateTo) {	
		Log::debug("Log: /remote/lib/filesystem/videos.php - getDaysBetweenDates() function", 0);  		
		// takes two dates formatted as YYYYMMDD and creates an inclusive array of the dates between the from and to dates.
		// Taken from: http://stackoverflow.com/questions/4312439/php-return-all-dates-between-two-dates-in-an-array
		$aryRange=array();	
		$iDateFrom=mktime(1,0,0,substr($strDateFrom,4,2),substr($strDateFrom,6,2),substr($strDateFrom,0,4));
		$iDateTo=mktime(1,0,0,substr($strDateTo,4,2),substr($strDateTo,6,2),substr($strDateTo,0,4));
		if ($iDateTo>=$iDateFrom) {
			array_push($aryRange,date('Ymd',$iDateFrom)); // first entry
			while ($iDateFrom<$iDateTo) {
				$iDateFrom+=86400; // add 24 hours
				array_push($aryRange,date('Ymd',$iDateFrom));
			}
		}
		return $aryRange;
	}	

	public function getVideo($targetdir, $type) {
		Log::debug("Log: /remote/lib/filesystem/videos.php - getVideo() function"); 
		Log::debug("Log: /remote/lib/filesystem/videos.php - getVideo() - Looking for: " . $type . " video");  		
		//Find the latest video for the current pictures directory YYYYMMDD/YYYYMMDDHHMMSS.jpg
		// If type == "first", return the first picture of the directory
		// If type == "last", return the last picture of the directory
		$checkvids = array();		
		if (is_dir($targetdir)) {	
			$checkvids = $this->getVideosFiles($targetdir, 0);
			sort($checkvids);
			if ($type == "last") {
				$checkvids = array_reverse($checkvids);
			}			
			if (isset($checkvids[0])) {
				Log::debug("Log: /remote/lib/filesystem/videos.php - getVideo() - " . $type . " video: " . $checkvids[0]);
				return $checkvids[0];
			}
		} 
	}
	
}



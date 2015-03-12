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
 * @class PicturesFS
 * Contains all functions related to pictures and MySQL database
 */
class PicturesFS {	
	//
	// getPicturesDirectories()
	// Takes a directory and return all subdirectories using Webcampak directory naming convention (YYYYMMDD)
	public function getPicturesDirectories($targetdir) {
		Log::debug("Log: /remote/lib/filesystem/pictures.php - getPicturesDirectories() function", 0);
		$checkdirs = array();
		if (is_dir($targetdir)) {
			if ($handle = opendir($targetdir)) {
				while (false !== ($currentdir = readdir($handle))) {
					if (is_dir($targetdir . $currentdir) && substr($currentdir, 0,2)== "20") {
						array_push($checkdirs, $currentdir);
					}
				}
				closedir($handle);
			}
		}
		sort($checkdirs);
		return $checkdirs;
	}

	public function getPicturesFiles($targetdir) {
		//Return an array containing all pictures in a directory
		Log::debug("Log: /remote/lib/filesystem/pictures.php - getPicturesFiles() function", 0);
		$checkpics = array(); 
		if (is_dir($targetdir)) {
			if ($handle = opendir($targetdir)) {
				while (false !== ($currentpic = readdir($handle))) {
					if (is_file($targetdir . $currentpic) && substr($currentpic, 0,2) == "20") {
						$path_parts = pathinfo($targetdir . $currentpic);
						if ($path_parts['extension'] == "jpg") {
							//error_log("LIST FILES: " . $targetdir . $currentpic, 0);
							array_push($checkpics, $currentpic);
						}
					}
				}
				closedir($handle);
			}					
		}
		sort($checkpics);
		return $checkpics;
	}  

	public function getDaysBetweenDates($strDateFrom,$strDateTo) {	
		Log::debug("Log: /remote/lib/filesystem/pictures.php - getDaysBetweenDates() function", 0);  		
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

	public function getNbPicturesDirectory($targetdir) {	
		//Log::debug("Log: /remote/lib/filesystem/pictures.php - getNbPicturesDirectory() function", 0);  	
		$count = 0;
		if (is_dir($targetdir)) {
			if ($handle = opendir($targetdir)) {
				while (false !== ($currentpic = readdir($handle))) {
					if (is_file($targetdir . $currentpic) && substr($currentpic, 0,2) == "20") {
						$path_parts = pathinfo($targetdir . $currentpic);
						if ($path_parts['extension'] == "jpg") {
							$count++;
						}
					}
				}
				closedir($handle);
			}			
		}
		return $count;		
	}
	
	public function getLatestPicture($targetdir) {
		Log::debug("Log: /remote/lib/filesystem/pictures.php - getLatestPicture() function", 0);  
		//Find the latest picture for the current pictures directory YYYYMMDD/YYYYMMDDHHMMSS.jpg
		$checkdirs = array();		
		if (is_dir($targetdir)) {
			if ($handle = opendir($targetdir)) {
				while (false !== ($currentdir = readdir($handle))) {
					if (is_dir($targetdir . $currentdir) && substr($currentdir, 0,2)== "20") {
						array_push($checkdirs, $currentdir);
					}
				}
				closedir($handle);
			}
			sort($checkdirs);
			$checkdirs = array_reverse($checkdirs);
			for($i=0;$i<count($checkdirs); $i++) {				
				if (is_dir($targetdir . $checkdirs[$i] . "/")) {
					if ($handle = opendir($targetdir . $checkdirs[$i] . "/")) {
						$checkpics = array();
						while (false !== ($currentpic = readdir($handle))) {
							//Log::debug("Log: /remote/lib/filesystem/pictures.php - getLatestPicture() - Scan directory: " . $checkdirs[$i]);							
							if (is_file($targetdir . $checkdirs[$i] . "/" . $currentpic) && substr($currentpic, 0,2) == "20") {
								$path_parts = pathinfo($targetdir . $checkdirs[$i] . "/" . $currentpic);
								if ($path_parts['extension'] == "jpg") {
									array_push($checkpics, $currentpic);
								}
							}
						}
						closedir($handle);
						if (count($checkpics) > 0) {
							//If there is more than one picture within directory we leave "for"
							break;
						}
					}			
				}
			}
			sort($checkpics);
			$checkpics = array_reverse($checkpics);
			if (isset($checkpics[0])) {
				Log::debug("Log: /remote/lib/filesystem/pictures.php - getLatestPicture() - Latest picture: " . $checkpics[0]);
				return $checkpics[0];
			}
		} 
	}

	function getClosest($search, $array) {
		$closest = null;
		foreach($array as $item) {
			if($closest == null || abs($search - $closest) > abs($item - $search)) {
				$closest = $item;
			}
		}
		return $closest;
	}

	public function getClosestPicture($sourceid, $currentpicture) {
		Log::debug("Log: /remote/lib/filesystem/pictures.php - getClosestPicture() function", 0);  
		//Find the latest picture for the current pictures directory YYYYMMDD/YYYYMMDDHHMMSS.jpg
		$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/";		
		$checkdirs = array();		
		if (is_dir($targetdir)) {
			// List all directories
			if ($handle = opendir($targetdir)) {
				while (false !== ($currentdir = readdir($handle))) {
					if (is_dir($targetdir . $currentdir) && substr($currentdir, 0,2)== "20") {
						array_push($checkdirs, $currentdir);
					}
				}
				closedir($handle);
			}
			sort($checkdirs);
			
			//extract previous, current and following directories
			$newcheckdirs = array();
			for($i=0;$i<count($checkdirs); $i++) {
				//Log::debug("Log: /remote/lib/filesystem/pictures.php - getClosestPicture() - currently looking at: " . $checkdirs[$i] . " current picture:" . substr($currentpicture, 0,8));  				
				if ($checkdirs[$i] == substr($currentpicture, 0,8)) {
					array_push($newcheckdirs, $checkdirs[$i]);
					if (isset($checkdirs[$i - 1])) {
						array_push($newcheckdirs, $checkdirs[$i - 1]);
					}
					if (isset($checkdirs[$i + 1])) {
						array_push($newcheckdirs, $checkdirs[$i + 1]);
					}
				}
			}
			//If array is empty, we look for closest value
			if (empty($newcheckdirs)) {
				Log::debug("Log: /remote/lib/filesystem/pictures.php - getClosestPicture() - scan did not succeed, looking for closest day");  								
				$closestValue = $this->getClosest(substr($currentpicture, 0,8), $checkdirs);
				array_push($newcheckdirs, $closestValue);				
			}
			sort($newcheckdirs);
			Log::printrhtml($newcheckdirs);  
			$checkpics = array();		
			//We memorize all possible pictures to then find the closest
			for($i=0;$i<count($newcheckdirs); $i++) {	
				if (is_dir($targetdir . $newcheckdirs[$i] . "/")) {
					if ($handle = opendir($targetdir . $newcheckdirs[$i] . "/")) {
						while (false !== ($currentpic = readdir($handle))) {
							if (is_file($targetdir . $newcheckdirs[$i] . "/" . $currentpic) && substr($currentpic, 0,2) == "20") {
								//Log::debug("Log: /remote/lib/filesystem/pictures.php - getClosestPicture() - adding file to memory: " . $currentpic);  												
								$path_parts = pathinfo($targetdir . $newcheckdirs[$i] . "/" . $currentpic);
								if ($path_parts['extension'] == "jpg") {
									array_push($checkpics, substr($currentpic, 0,14));
								}
							}							
						}					
					}					
				}
			}
			sort($checkpics);	
			$closestValue = $this->getClosest(substr($currentpicture, 0,14), $checkpics);					
			Log::debug("Log: /remote/lib/filesystem/pictures.php - getClosestPicture() - Closest picture found is: " . $closestValue . ".jpg");
			return $closestValue . ".jpg";	
		} 
	}

	public function getPicture($targetdir, $type) {
		Log::debug("Log: /remote/lib/filesystem/pictures.php - getPicture() function"); 
		Log::debug("Log: /remote/lib/filesystem/pictures.php - getPicture() - Looking for: " . $type . " picture");  		
		//Find the latest picture for the current pictures directory YYYYMMDD/YYYYMMDDHHMMSS.jpg
		// If type == "first", return the first picture of the directory
		// If type == "last", return the last picture of the directory
		$checkdirs = array();		
		if (is_dir($targetdir)) {
			if ($handle = opendir($targetdir)) {
				while (false !== ($currentdir = readdir($handle))) {
					//Log::debug("Log: /remote/lib/filesystem/pictures.php - getPicture() - Looking into: " . $currentdir . " directory");  		
					if (is_dir($targetdir . $currentdir) && substr($currentdir, 0,2)== "20") {
						array_push($checkdirs, $currentdir);
					}
				}
				closedir($handle);
			}
			sort($checkdirs);
			if ($type == "last") {
				$checkdirs = array_reverse($checkdirs);
			}
			for($i=0;$i<count($checkdirs); $i++) {				
				if (is_dir($targetdir . $checkdirs[$i] . "/")) {
					if ($handle = opendir($targetdir . $checkdirs[$i] . "/")) {
						$checkpics = array();
						while (false !== ($currentpic = readdir($handle))) {
							//Log::debug("Log: /remote/lib/filesystem/pictures.php - getPicture() - Scan directory: " . $checkdirs[$i]);							
							if (is_file($targetdir . $checkdirs[$i] . "/" . $currentpic) && substr($currentpic, 0,2) == "20") {
								$path_parts = pathinfo($targetdir . $checkdirs[$i] . "/" . $currentpic);
								if ($path_parts['extension'] == "jpg") {
									array_push($checkpics, $currentpic);
								}
							}
						}
						closedir($handle);
						if (count($checkpics) > 0) {
							//If there is more than one picture within directory we leave "for"
							break;
						}
					}			
				}
			}
			if (isset($checkpics)) {
				sort($checkpics);
				if ($type == "last") {
					$checkpics = array_reverse($checkpics);
				}			
				if (isset($checkpics[0])) {
					Log::debug("Log: /remote/lib/filesystem/pictures.php - getPicture() - picture: " . $checkpics[0]);
					return $checkpics[0];
				}
			}
		} 
	}
	
}



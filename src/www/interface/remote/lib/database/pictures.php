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
 * @class PicturesDB
 * Contains all functions related to pictures and MySQL database
 */
class PicturesDB {
	public function __construct() {
		$_db = new mysqli(CFGMYSQL_HOST, CFGMYSQL_LOGIN , CFGMYSQL_PASSWORD, CFGMYSQL_DATABASE);	
		if ($_db->connect_error) {
			error_log('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error, 0);				 	
			die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);     
		}
		return $_db;        
	}

	public function __destruct() {
		$_db = $this->__construct();
		$_db->close();
		return $this;
	}

	//Get comments ID based upon sourceid and picture name
	public function getPictureCommentsId($sourceid, $picturename) {
		Log::debug("Log: /remote/lib/database/pictures.php - getPictureCommentsId() function");
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id FROM pictures WHERE sourceid='" . $sourceid . "' AND picturename='" . $picturename . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return (int) $results['id'];
	}

	//Get comment based upon his sourceid and picture name
	public function getPictureComment($sourceid, $picturename) {
		Log::debug("Log: /remote/lib/database/pictures.php - getPictureComment() function");
		$_db = $this->__construct();
		$_result = $_db->query("SELECT comment FROM pictures WHERE sourceid='" . $sourceid . "' AND picturename='" . $picturename . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return $results['comment'];
	}

	//Get comments ID based upon sourceid and picture name
	public function insertPictureComment($sourceid, $picturename, $comment) {
		Log::debug("Log: /remote/lib/database/pictures.php - insertPictureComment() function");
		$commentid = $this->getPictureCommentsId($sourceid, $picturename);		
		$_db = $this->__construct();	
		if ($comment == "") {
			if ($stmt = $_db->prepare("DELETE FROM pictures WHERE sourceid=? AND picturename=?")) {
				$stmt->bind_param('dd', $sourceid, $picturename);
				$stmt->execute();
				$stmt->close();
					Log::debug("Log: /remote/lib/database/pictures.php - insertPictureComment() - Comment destroyed");
			}
		} else {			
			if ($commentid > 0) {
				if ($stmt = $_db->prepare("UPDATE pictures SET comment=?  WHERE sourceid=? AND picturename=?")) {
					$stmt->bind_param('sdd', $comment, $sourceid, $picturename);
					$stmt->execute();
					$stmt->close();
					Log::debug("Log: /remote/lib/database/pictures.php - insertPictureComment() - Comment Updated");
				}	
			} else {
				if($stmt = $_db->prepare("INSERT INTO pictures (sourceid, picturename, comment) VALUES (?, ?, ?)")) {
					$stmt->bind_param('dds', $sourceid, $picturename, $comment);
					$stmt->execute();
					$stmt->close();
					Log::debug("Log: /remote/lib/database/pictures.php - insertPictureComment() - Comment inserted");
				} 			
			}
		}
		$this->__destruct($_db);		 			
	}

/*	
	//
	// getPicturesDirectories()
	// Takes a directory and return all subdirectories using Webcampak directory naming convention (YYYYMMDD)
	public function getPicturesDirectories($targetdir) {
		error_log("Log: /remote/lib/session_db.php - getPicturesDirectories() function", 0);   
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
		//Return an array containing all pictures
		error_log("Log: /remote/lib/session_db.php - getPicturesFiles() function", 0);  
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
	    // takes two dates formatted as YYYYMMDD and creates an inclusive array of the dates between the from and to dates.
	    // Taken from: http://stackoverflow.com/questions/4312439/php-return-all-dates-between-two-dates-in-an-array
	    $aryRange=array();	
	    $iDateFrom=mktime(1,0,0,substr($strDateFrom,4,2),substr($strDateFrom,6,2),substr($strDateFrom,0,4));
	    $iDateTo=mktime(1,0,0,substr($strDateTo,4,2),substr($strDateTo,6,2),substr($strDateTo,0,4));
	    if ($iDateTo>=$iDateFrom)
	    {
	        array_push($aryRange,date('Ymd',$iDateFrom)); // first entry
	        while ($iDateFrom<$iDateTo)
	        {
	            $iDateFrom+=86400; // add 24 hours
	            array_push($aryRange,date('Ymd',$iDateFrom));
	        }
	    }
	    return $aryRange;
	}	

	public function getNbPicturesDirectory($targetdir) {	
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
*/


}



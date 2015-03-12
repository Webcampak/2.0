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
 * @class SessionDB
 * 
 */
class SessionDB {
    public function __construct() {

	    $_db = new mysqli(CFGMYSQL_HOST, CFGMYSQL_LOGIN , CFGMYSQL_PASSWORD, CFGMYSQL_DATABASE);
	
	    if ($_db->connect_error) {
	    		error_log('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error, 0);				 	
	        die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	        
	    }
	
	    return $_db;        
    }

	public function __destruct()
	{
	    $_db = $this->__construct();
	    $_db->close();
	
	    return $this;
	}

    // Get Database private key
    public function sqlNextkey($tablename) {
       error_log("Log: /remote/lib/session_db.php - pkTable(" . $tablename . ") function", 0);    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT Auto_increment as id FROM information_schema.tables WHERE table_name='" . $tablename . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
    }	 
  
    public function sqlGetRecords($selectstatement) {      	
       error_log("Log: /remote/lib/session_db.php - sqlGetRecords() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query($selectstatement) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = array();
	    while ($row = $_result->fetch_assoc()) {
	    	 //error_log("Select Rec: " . http_build_query($row), 0);
	        array_push($results, $row);
	    }	
	    $this->__destruct($_db);    
	    return $results;    	
    }    
/*
	public function getGroupAvailablePages() {      	
		error_log("Log: /remote/lib/session_db.php - getGroupAvailablePages() function", 0);    	 
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}           	    	    	    	
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, name FROM pages ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
	    	$_searchresult = $_db->query("SELECT COUNT(id) AS cid FROM groups_pages WHERE groups_id='" . $gid . "' AND pages_id='" . $row['id'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$searchreasult = $_searchresult->fetch_assoc();
			if ($searchreasult['cid'] == 0) {
			//error_log("Select Rec ID: " . $row['id'] . " - " . $searchreasult['cid'], 0);
				array_push($results, $row);
			}
		}	
		$this->__destruct($_db);    
		return $results;    	
	}  
*/	


/*
	public function getSourceAvailableUsers() {      	
		error_log("Log: /remote/lib/session_db.php - getSourceAvailableUsers() function", 0);    	 
		if (isset($_REQUEST["sid"])) {
			$sid = (int) strip_tags($_REQUEST["sid"]);
		}           	    	    	    	
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, username, firstname, lastname FROM users ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
	    	$_searchresult = $_db->query("SELECT COUNT(id) AS cid FROM sources_groups WHERE usergroup='" . $sid . "' AND username='" . $row['username'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$searchreasult = $_searchresult->fetch_assoc();
			//error_log("Select Rec ID: " . $row['username'] . " - " . $searchreasult['cid'] . " sid: " . $sid, 0);
			if ($searchreasult['cid'] == 0) {
				array_push($results, $row);
			}
		}	
		$this->__destruct($_db);    
		return $results;    	
	}  	
 
*/ 

/* 
	public function getSourceName($sourceid) {      	
		error_log("Log: /remote/lib/session_db.php - getSourceName() function - Source ID:" . $sourceid, 0);    	    	    	    	    	
		$_db = $this->__construct();
		$_result = $_db->query("SELECT name FROM sources WHERE sourceid='" . $sourceid . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);	
		error_log("Log: /remote/lib/session_db.php - getSourceName() Source Name:" . $results['name'], 0);    	    	    	    	    		    	 
		return $results['name'];
	}  
*/  

/*
	public function getGroupID($groupname) {
       error_log("Log: /remote/lib/session_db.php - getGroupID() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT id FROM groups WHERE name='" . $groupname . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
	}
 */ 
/*  
    //Get all users from database, return an array containing those results
    public function getUsers() {      	
       error_log("Log: /remote/lib/session_db.php - getUsers() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT 
	    	u.id AS id, u.username AS username, 
	    	u.password AS password, u.firstname AS firstname, 
	    	u.lastname AS lastname, u.email AS email, 
	    	u.companies_id AS company, u.groups_id AS groupid, 
	    	g.name AS groupname,
	    	g.id AS groupid,
	    	c.name AS cname
	    	FROM users AS u
	    	LEFT JOIN groups AS g ON u.groups_id = g.id
	    	LEFT JOIN companies AS c ON u.companies_id = c.id
	    	ORDER BY u.username ASC") 
	    	or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = array();
	    while ($row = $_result->fetch_assoc()) {
	    	$row['password'] = "xxxxxx";
	    	//error_log("Select Rec: " . http_build_query($row), 0);
	        array_push($results, $row);
	    }	
	    $this->__destruct($_db);
	    //error_log("Users: " . http_build_query($results), 0);
	    return $results;    	
    }
*/

/*
    //Get all users from database, return an array containing those results
    public function getPictureshours() {      	
		error_log("Log: /remote/lib/session_db.php - getPictureshours() function", 0); 
		date_default_timezone_set('UTC');
		
		//Get timestamp 
		if (isset($_REQUEST["currentdate"])) {
			if ($_REQUEST["currentdate"] == "0") {
				//if timestamp not set (=0), get current server timestamp
				$currentdate = time();
			} else {
				//convert timestamp from microseconds to seconds
				$currentdate = (int) substr(strip_tags($_REQUEST["currentdate"]), 0,-3);
			}
		}
		//Get sourceid 
		if (isset($_REQUEST["sourceid"])) {
			if ($_REQUEST["sourceid"] == "0") {
				//Set default source id
				$sourceid = "3"; //TO BE CHANGED BY A FUNCTION 
			} else {
				//convert timestamp from microseconds to seconds
				$sourceid = (int) strip_tags($_REQUEST["sourceid"]);
			}
		}
		
		error_log("Log: /remote/lib/session_db.php - getPictureshours() current timestamp: " . $currentdate, 0);
		$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/" . date("Ymd", $currentdate) . "/";
		error_log("Log: /remote/lib/session_db.php - getPictureshours() target dir: " . $targetdir, 0);		
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
					}
				} else {
					$tmpresults[$currentminute] = "0";
				}
				
			}
			array_push($results, $tmpresults);
		}		
		return $results; 
		error_log("Users: " . http_build_query($results), 0);			
	}
*/



	public function getPicturesDirectories($targetdir) {
		//Return an array containing all directories
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

/*	
    //Collect all details used to display pictures
    public function getPicturesviews() {      	
		error_log("Log: /remote/lib/session_db.php - getPicturesviews() function", 0); 
		
		$results = array();
		//Get timestamp
		if (isset($_REQUEST["currentdate"])) {$currentdate = strip_tags($_REQUEST["currentdate"]);}
		else {$currentdate = 0;}
		
		//Set sourceid from parameters passed with REST request, if nothing available, look for default source within user's permissions
		//TO BE MODIFIED TO INCLUDE SOURCE LOOKUP FOR CURRENT USER IN CASE SOURCE NOT SPECIFIED
		if (isset($_REQUEST["sourceid"])) {
			if ($_REQUEST["sourceid"] == "0") {$sourceid = "3"; } 
			else {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);}
		}
		//Get source name pass it to the return array
		$tmpresults['sourcename'] = $this->getSourceName($sourceid);

		if (isset($_REQUEST["zoomlevel"])) { $tmpresults['zoomlevel'] = (int) strip_tags($_REQUEST["zoomlevel"]);} 
		else {$tmpresults['zoomlevel'] = 0;}


		$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/";
		if ($currentdate == 0) {
			//Find the latest picture for the current source
			$checkpics = array();
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
				if (is_dir($targetdir . $checkdirs[0] . "/")) {
					if ($handle = opendir($targetdir . $checkdirs[0] . "/")) {
						while (false !== ($currentpic = readdir($handle))) {
							if (is_file($targetdir . $checkdirs[0] . "/" . $currentpic) && substr($currentpic, 0,2) == "20") {
								$path_parts = pathinfo($targetdir . $checkdirs[0] . "/" . $currentpic);
								if ($path_parts['extension'] == "jpg") {
									array_push($checkpics, $currentpic);
								}
							}
						}
						closedir($handle);
					}					
				}
				sort($checkpics);
				$checkpics = array_reverse($checkpics);
				error_log("Log: /remote/lib/session_db.php - getPicturesviews() - Latest picture: " . $checkpics[0], 0);
				$currentpicture = $checkpics[0];
			}
		} else {
			$currentpicture = $currentdate . ".jpg";
		}
		if (is_file($targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture)) {
			error_log("Log: /remote/lib/session_db.php - getPicturesviews() - Check Picture: " . $targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture, 0);								
			$tmpresults['id'] = substr($currentpicture, 0,14);
			$tmpresults['sourceid'] = $sourceid;			
			if (CFGDIR_TIMTHUMB != "") {
				$tmpresults['picture'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($currentpicture, 0,8) . "/" . $currentpicture . "&s=" . $sourceid . "&q=100";				
			} else {
				$tmpresults['picture'] = CFGDIR_WEBSOURCESDIR . "source" . $sourceid . "/pictures/" . substr($currentpicture, 0,8) . "/" . $currentpicture;				
			}
			list($picwidth, $picheight, $pictype, $attr) = getimagesize($targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture);
			$tmpresults['picturewidth'] = $picwidth;			
			$tmpresults['pictureheight'] = $picheight;										
			$tmpresults['picturetime'] = substr($currentpicture, 0,14);
			
			//START FINDING THUMBNAILS
			//GET LIST OF ALL DIRECTORIES
			
			$checkdir = array();
			$checkpics = array();			
			$checkdir = $this->getPicturesDirectories($targetdir);
			for($i=0;$i<count($checkdir); $i++) {
				//error_log("if " . $checkdir[$i] . " == " . substr($currentpicture, 0,8), 0);												
				if ($checkdir[$i] == substr($currentpicture, 0,8)) {
					//error_log("CHECK DIR: " . $checkdir[$i] . " == " . substr($currentpicture, 0,8), 0);												
					if ($checkdir[$i-1] != "") {
						$tmparray = array();
						$tmparray = $this->getPicturesFiles($targetdir . $checkdir[$i-1] . "/");
						$checkpics = array_merge($checkpics, $tmparray);						
					}
					$tmparray = array();
					$tmparray = $this->getPicturesFiles($targetdir . $checkdir[$i] . "/");
					$checkpics = array_merge($checkpics, $tmparray);
					if (isset($checkdir[$i+1])) {					
						if ($checkdir[$i+1] != "") {
							$tmparray = array();
							$tmparray = $this->getPicturesFiles($targetdir . $checkdir[$i+1] . "/");
							$checkpics = array_merge($checkpics, $tmparray);	
						}
					}
					//$checkpics = $this->getPicturesFiles($targetdir . $checkdir[$i] . "/");
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
						}
					}
					if (isset($checkpics[$i-10])) {
						if ($checkpics[$i-10] != "") {
							$tmpresults['thumb2'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i-10], 0,8) . "/" . $checkpics[$i-10] . "&s=" . $sourceid . "&q=100";
							$tmpresults['thumb2time'] = substr($checkpics[$i-10], 0,14);
						}
					}										
					if (isset($checkpics[$i-5])) {
						if ($checkpics[$i-5] != "") {
							$tmpresults['thumb3'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i-5], 0,8) . "/" . $checkpics[$i-5] . "&s=" . $sourceid . "&q=100";
							$tmpresults['thumb3time'] = substr($checkpics[$i-5], 0,14);
						}
					}										
					if (isset($checkpics[$i-1])) {
						if ($checkpics[$i-1] != "") {
							$tmpresults['pictureprevious'] = substr($checkpics[$i-1], 0,14);
						}
					}										
					if (isset($checkpics[$i+1])) {
						if ($checkpics[$i+1] != "") {
							$tmpresults['picturenext'] = substr($checkpics[$i+1], 0,14);
						}					
					}										
					if (isset($checkpics[$i+5])) {
						if ($checkpics[$i+5] != "") {
							$tmpresults['thumb4'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i+5], 0,8) . "/" . $checkpics[$i+5] . "&s=" . $sourceid . "&q=100";
							$tmpresults['thumb4time'] = substr($checkpics[$i+5], 0,14);
						}										
					}										
					if (isset($checkpics[$i+10])) {
						if ($checkpics[$i+10] != "") {
							$tmpresults['thumb5'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i+10], 0,8) . "/" . $checkpics[$i+10] . "&s=" . $sourceid . "&q=100";
							$tmpresults['thumb5time'] = substr($checkpics[$i+10], 0,14);
						}										
					}										
					if (isset($checkpics[$i+15])) {
						if ($checkpics[$i+15] != "") {
							$tmpresults['thumb6'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($checkpics[$i+15], 0,8) . "/" . $checkpics[$i+15] . "&s=" . $sourceid . "&q=100";
							$tmpresults['thumb6time'] = substr($checkpics[$i+15], 0,14);
						}										
					}										
				}
			}
			
			//Defined dates to be displayed in calendar
			//$tmpresults['disableddates'] = "'06/09/2012', '04/../2012'";

			$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/";
			//Find the latest picture for the current source
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

				$tmpresults['disableddates'] = "";
				//YYYYMMDD				
				$alldays = $this->getDaysBetweenDates(substr($checkdirs[0], 0,8), substr(end($checkdirs), 0,8));	
				foreach($alldays as $idx=>$currentday) { 
					if ($this->getNbPicturesDirectory($targetdir . $currentday . "/") == 0) {
						//error_log("Log: /remote/lib/session_db.php - getPicturesviews() - Processing Day: " . $currentday . " - Nb Pictures for this day: " . $this->getNbPicturesDirectory($targetdir . $currentday . "/"), 0);						
						if ($tmpresults['disableddates'] != "") { $tmpresults['disableddates'] = $tmpresults['disableddates'] . ", ";}
						$tmpresults['disableddates'] = $tmpresults['disableddates'] . "'" . substr($currentday, 4,2) . "/" . substr($currentday, 6,2) . "/" .  substr($currentday, 0,4) . "'";
					}
				} 				
				
				if (substr($checkdirs[0], 0,2)== "20") {
					$tmpresults['mindate'] = mktime(1, 1, 1, substr($checkdirs[0], 4,2), substr($checkdirs[0], 6,2), substr($checkdirs[0], 0,4))  * 1000;	
				}	
			}
			
			array_push($results, $tmpresults);
		}
		error_log("Output Elements: " . http_build_query($results), 0);					
		return $results; 

	}	
*/

	public function getAdvConfigObjs() {      	
		error_log("Log: /remote/lib/session_db.php - getAdvConfigObjs() function", 0);    	    	
		//$_db = $this->__construct();
		$configobj = new ConfigObj();
		$wpakallsettings = $configobj->getConfigFromFile();
		foreach($wpakallsettings as $keyfile=>$valuefile) {
			//error_log("----------------------------------------------------------------------------------------", 0);   			
			//error_log("Log: /remote/lib/session_db.php - getAdvConfigObjs() function: File: " . $keyfile , 0);
			foreach($valuefile as $valueobj) {
				//error_log("Log: /remote/lib/session_db.php - getAdvConfigObjs() function: key: " . $valueobj['key'] . "-----" . $valueobj['description'] , 0);
				$results = 0;
				$insertdb = false;
				$_db = $this->__construct();
				$_result = $_db->query("SELECT id FROM settings WHERE cfgkey='" . $valueobj['key'] . "' AND file='" . $keyfile . "'");// or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
				if ($_result === false) {
					$insertdb = true;
				} else {
					$results = $_result->num_rows;
					if ($results == 0) {
						$insertdb = true;
					}
				}
				if ($insertdb == true && substr($valueobj['key'], 0, 3) == "cfg") {//substr('abcdef', 0, 3);   
					if($stmt = $_db->prepare("INSERT INTO settings (cfgkey, description, file) VALUES (?, ?, ?)")) {
						$stmt->bind_param('sss', $insertkey, $insertdescription, $insertfile);
						$insertkey = $_db->real_escape_string($valueobj['key']);
						$insertdescription = $_db->real_escape_string(substr($valueobj['description'], 0, 250));
						$insertfile = $_db->real_escape_string($keyfile);
						$stmt->execute();
						$stmt->close();

	  			  } 
				}
				$this->__destruct($_db);
			}    	
		}
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, cfgkey, description, file FROM settings ORDER BY cfgkey ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			//error_log("Select Rec: " . http_build_query($row), 0);
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;    	
	}    


/*    
    public function insertUser($rec) {
       error_log("Log: /remote/lib/session_db.php - insertUser() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO users (username, password, firstname, lastname, email, companies_id, groups_id) VALUES (?, SHA1(?), ?, ?, ?, ?, ?)")) {
	        $stmt->bind_param('sssssdd', $username, $password, $firstname, $lastname, $email, $company, $groupid);
	
	        $username = $_db->real_escape_string($rec['username']);
	        $password = $_db->real_escape_string($rec['password']);
	        $firstname = $_db->real_escape_string($rec['firstname']);
	        $lastname = $_db->real_escape_string($rec['lastname']);
	        $email = $_db->real_escape_string($rec['email']);
	        $company = (int) $_db->real_escape_string($rec['company']);
	        $groupid = (int) $_db->real_escape_string($rec['groupname']);
	        //$groupid = (int) $this->getGroupID($rec['groupname']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }
*/    

/*
    public function insertCompany($rec) {
       error_log("Log: /remote/lib/session_db.php - insertCompany() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO companies (name) VALUES (?)")) {
	        $stmt->bind_param('s', $name);
	        $name = $_db->real_escape_string($rec['name']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }
*/
/*
    public function insertGroup($rec) {
       error_log("Log: /remote/lib/session_db.php - insertGroup() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO groups (name) VALUES (?)")) {
	        $stmt->bind_param('s', $name);
	        $name = $_db->real_escape_string($rec['name']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }

*/

/*
    public function insertSource($rec) {
       error_log("Log: /remote/lib/session_db.php - insertSource() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO sources (sourceid, name, weight) VALUES (?, ?, ?)")) {
	        $stmt->bind_param('dsd', $sourceid, $name, $weight);
	        $name = $_db->real_escape_string($rec['name']);
	        $sourceid = (int) $_db->real_escape_string($rec['sourceid']);	        	
	        $weight = (int) $_db->real_escape_string($rec['weight']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }

*/

/*
    public function insertPage($rec) {
       error_log("Log: /remote/lib/session_db.php - insertGroup() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO pages (name) VALUES (?)")) {
	        $stmt->bind_param('s', $name);
	        $name = $_db->real_escape_string($rec['name']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }
    */
/*    
    public function updateUser($idx, $attributes) {       
       //error_log("Log: /remote/lib/session_db.php - updateUser() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateUser() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 39) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE users SET username=?, firstname=?, lastname=?, email=?, companies_id=?, groups_id=? WHERE id=?")) {
	        $stmt->bind_param('ssssddd', $username, $firstname, $lastname, $email, $company, $groupid, $id);
	
	        $username = $attributes['username'];
	        $firstname = $attributes['firstname'];
	        $lastname = $attributes['lastname'];
	        $email = $attributes['email'];
	        $company = (int) $attributes['cname'];
	        $groupid = (int) $attributes['groupname'];
	        //$groupid = (int) $this->getGroupID($attributes['groupname']);
	        $id = (int) $attributes['id']; 	        //cast id to int
	
	        $stmt->execute();
	
	        $stmt->close();
	    }
	    if ($attributes['password'] != "xxxxxx") {
		    if ($stmt = $_db->prepare("UPDATE users SET password=SHA1(?) WHERE id=?")) {
		        $stmt->bind_param('sd', $password, $id);
		        $password = $attributes['password'];
		        $id = (int) $attributes['id'];
		        $stmt->execute();
		
		        $stmt->close();
		    }	    
	    }
	   }
	
	    return $this;      
    }
*/    

/*
    public function addUserToGroup($gid, $attributes) {
		if (isset($attributes['mid'])) {
			if ($attributes['mid'] > 39) {
				error_log("Log: /remote/lib/session_db.php - addUserToGroup() : User id:" . $attributes['mid'], 0);    	    	    	    	    	          	    	    	    	    	
				$_db = $this->__construct();
				if ($stmt = $_db->prepare("UPDATE users SET groups_id=?  WHERE id=?")) {
					$stmt->bind_param('dd', $gid, $id);
					$id = (int) $attributes['mid']; //cast id to int
					$stmt->execute();
					$stmt->close();
				}
				//return $this->sqlGetRecords("SELECT id, username, firstname, lastname FROM users WHERE groups_id = '" . $gid . "' AND id = '" . $attributes['mid'] . "' ORDER BY username ASC");
			}
		}
	}
*/

/*
    public function addPageToGroup($gid, $attributes) {
		if (isset($attributes['pid'])) {
				error_log("Log: /remote/lib/session_db.php - addPageToGroup() : Page id:" . $attributes['pid'] . "Group ID:" . $gid, 0);    	    	    	    	    	          	    	    	    	    	
				$_db = $this->__construct();
				
				//Check if there if page is already attached to group				
	   		$_result = $_db->query("SELECT id FROM groups_pages WHERE groups_id='" . $gid . "' AND pages_id='" . $attributes['pid'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	   		$results = $_result->fetch_assoc();	
				if ($results['id'] > 0) {
					error_log("Log: /remote/lib/session_db.php - addPageToGroup() : Page id:" . $attributes['pid'] . " already attached to group", 0);    	    	    	    	    	          	    	    	    	    						
				} else {
					error_log("Log: /remote/lib/session_db.php - addPageToGroup() : Inserting page into group", 0);    	    	    	    	    	          	    	    	    	    						
					//If page is not already attached to group we can add it into the database
					if($stmt = $_db->prepare("INSERT INTO groups_pages (pages_id, groups_id) VALUES (?,?)")) {
						$stmt->bind_param('dd', $pageid, $gid);
						$pageid = (int) $attributes['pid']; //cast id to int
	        			$stmt->execute();
	        			$stmt->close();
	    			} 				
				}
				$this->__destruct($_db);
		}
	}
*/

/*
    public function addUserToSource($sid, $attributes) {
		if (isset($attributes['mid'])) {
				error_log("Log: /remote/lib/session_db.php - addUserToSource() : User: " . $attributes['username'] . " - Source ID:" . $sid, 0);    	    	    	    	    	          	    	    	    	    	
				$_db = $this->__construct();
				
				//Check if there if page is already attached to group				
	   		$_result = $_db->query("SELECT id FROM sources_groups WHERE usergroup='" . $sid . "' AND username='" . $attributes['username'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	   		$results = $_result->fetch_assoc();	
				if ($results['id'] > 0) {
					error_log("Log: /remote/lib/session_db.php - addUserToSource() : User:" . $attributes['username'] . " already attached to source", 0);    	    	    	    	    	          	    	    	    	    						
				} else {
					error_log("Log: /remote/lib/session_db.php - addUserToSource() : Inserting user into source", 0);    	    	    	    	    	          	    	    	    	    						
					//If page is not already attached to group we can add it into the database
					if($stmt = $_db->prepare("INSERT INTO sources_groups (username, usergroup) VALUES (?,?)")) {
						$stmt->bind_param('sd', $username, $sid);
						$username = $_db->real_escape_string($attributes['username']);
	        			$stmt->execute();
	        			$stmt->close();
	    			} 				
				}
				$this->__destruct($_db);
		}
	}

*/

/*
	//
	// removeUserFromGroup() : Remove a user from the selected group and set his group id to 0 (no group) 
	// Returns updated list of group members
	// $_REQUEST["gid"] is set in the appropriate sencha store	
	//
	public function removeUserFromGroup($idx) {
		error_log("Log: /remote/lib/session_db.php - removeUserFromGroup() function", 0);   
		$results = array();
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}   
		if ($gid > 0) {
			error_log("Log: /remote/lib/session_db.php - removeUserFromGroup() - Set group ID to 0", 0);   			 	    	    	    	    	    	
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("UPDATE users SET groups_id=? WHERE id=?")) {
				$stmt->bind_param('dd', $newgid, $id);
				$newgid = (int) "0";
				$id = (int) $idx;
				$stmt->execute();
				$stmt->close();
			} 
	
			$_result = $_db->query("SELECT id, username, firstname, lastname FROM users WHERE groups_id = '" . $gid . "' ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = array();
			while ($row = $_result->fetch_assoc()) {
				error_log("SELECT Rec: " . http_build_query($row), 0);
				array_push($results, $row);
			}	
		$this->__destruct($_db);    
		}
		return $results;   
	}  
 */
 
 /*
	//
	// removePageFromGroup() : Remove a page from the selected group 
	// Returns updated list of group pages
	// $_REQUEST["gid"] is set in the appropriate sencha store	
	//
	public function removePageFromGroup($idx) {
		error_log("Log: /remote/lib/session_db.php - removePageFromGroup() function", 0);   
		$results = array();
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}   
		if ($gid > 0) {
			error_log("Log: /remote/lib/session_db.php - removePageFromGroup() - Delete record from groups_pages table", 0);   			 	    	    	    	    	    	
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("DELETE FROM groups_pages WHERE pages_id=? AND groups_id=?")) {
				$stmt->bind_param('dd', $id, $gid);
				$id = (int) $idx;
				$stmt->execute();
				$stmt->close();
			}	
	
			$_result = $_db->query("SELECT p.id AS id, p.name AS name FROM groups_pages AS gp LEFT JOIN pages AS p ON gp.pages_id = p.id WHERE gp.groups_id = '" . $gid . "' ORDER BY p.name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = array();
			while ($row = $_result->fetch_assoc()) {
				//error_log("SELECT Rec: " . http_build_query($row), 0);				
				array_push($results, $row);
			}	
			$this->__destruct($_db);    
		}
		return $results;   
	}   
*/
/*
	//
	// removeUserFromSource() : Remove a user from the selected source 
	// Returns updated list of users
	// $_REQUEST["sid"] is set in the appropriate sencha store	
	//
	public function removeUserFromSource($username) {
		error_log("Log: /remote/lib/session_db.php - removeUserFromSource() function", 0);   
		$results = array();
		if (isset($_REQUEST["sid"])) {
			$sid = (int) strip_tags($_REQUEST["sid"]);
		}   
		if ($sid > 0) {
			error_log("Log: /remote/lib/session_db.php - removeUserFromSource() - Delete user " . $username . " from source " . $sid, 0);   			 	    	    	    	    	    	
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("DELETE FROM sources_groups WHERE usergroup=? AND username=?")) {
				$stmt->bind_param('ds', $sid, $username);
				$username = $_db->real_escape_string($username);
				$stmt->execute();
				$stmt->close();
			}	
			error_log("Log: /remote/lib/session_db.php - removeUserFromSource() - Reload user list", 0);   			 	    	    	    	    	    		
			$_result = $_db->query("SELECT 
	    			u.id AS id,
	    			u.username AS username,
	    			u.firstname AS firstname,
	    			u.lastname AS lastname
	    		FROM sources_groups AS sg
	    		LEFT JOIN users AS u ON sg.username = u.username
	    		WHERE sg.usergroup = '" . $sid . "' AND u.username != ''
	    		ORDER BY u.username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = array();
			while ($row = $_result->fetch_assoc()) {
				//error_log("SELECT Rec: " . http_build_query($row), 0);				
				array_push($results, $row);
			}	
			$this->__destruct($_db);    
		}
		return $results;   
	}   
*/

/*
    public function updateCompany($idx, $attributes) {       
       //error_log("Log: /remote/lib/session_db.php - updateCompany() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateCompany() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE companies SET name=?  WHERE id=?")) {
	        $stmt->bind_param('sd', $name, $id);
	        $name = $attributes['name'];
	        $id = (int) $attributes['id']; //cast id to int
	        $stmt->execute();
	        $stmt->close();
	    }
	   }
	    return $this;      
    }    
*/
/*
    public function updateGroup($idx, $attributes) {       
       //error_log("Log: /remote/lib/session_db.php - updateGroup() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateGroup() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE groups SET name=?  WHERE id=?")) {
	        $stmt->bind_param('sd', $name, $id);
	        $name = $attributes['name'];
	        $id = (int) $attributes['id']; //cast id to int
	        $stmt->execute();
	        $stmt->close();
	    }
	   }
	    return $this;      
    }    
*/

/*
    public function updatePage($idx, $attributes) {       
       error_log("Log: /remote/lib/session_db.php - updatePage() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE pages SET name=?  WHERE id=?")) {
	        $stmt->bind_param('sd', $name, $id);
	        $name = $attributes['name'];
	        $id = (int) $attributes['id']; //cast id to int
	        $stmt->execute();
	        $stmt->close();
	    }
	   }
	    return $this;      
    }  
*/

/*
    public function updateSource($idx, $attributes) {       
       //error_log("Log: /remote/lib/session_db.php - updateGroup() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateSource() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE sources SET name=?, sourceid=?, weight=?  WHERE id=?")) {
	        $stmt->bind_param('sddd', $name, $sourceid, $weight, $id);
	        $name = $attributes['name'];
	        $id = (int) $attributes['id']; //cast id to int	   
	        $sourceid = (int) $attributes['sourceid']; //cast id to int	             
	        $weight = (int) $attributes['weight']; //cast id to int
	        $stmt->execute();
	        $stmt->close();
	    }
	   }
	    return $this;      
    }    
 */  
    public function updateAdvConfigObj($idx, $attributes) {       
       error_log("Log: /remote/lib/session_db.php - updateAdvConfigObj() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateAdvConfigObj() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE settings SET description=?  WHERE id=?")) {
	        $stmt->bind_param('sd', $name, $id);
	        $description = $attributes['description'];
	        $id = (int) $attributes['id']; //cast id to int
	        $stmt->execute();
	        $stmt->close();
	    }
	   }
	    return $this;      
    }       
    
    
    public function destroyUser($idx) {
        error_log("Log: /remote/lib/session_db.php - destroyUser() function", 0); 
        //return array_shift(array_splice($_SESSION['rs'], $idx, 1));
	    $_db = $this->__construct();
	   if ((int) $idx > 39) {
	    if ($stmt = $_db->prepare("DELETE FROM users WHERE id=?")) {
	        $stmt->bind_param('d', $id);
	        $id = (int) $idx;
	        if ($id >= 2) { // Root as id #1 and we do not allow deletion of root user
	        		$stmt->execute();
			  }
	        $stmt->close();
	    }
	   }
	    $_result = $_db->query("SELECT id, username, password, firstname, lastname, email FROM users ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = array();
	    while ($row = $_result->fetch_assoc()) {
	    	$row['password'] = "xxxxxx";
	      array_push($results, $row);
	    }	
	    $this->__destruct($_db);    
	    return $results; 
    }

/*
	public function destroyCompany($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyCompany() function", 0);    	    	    	    	    	    	
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM companies WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}

		$_result = $_db->query("SELECT id, name FROM companies ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;  
		   
	}    
*/
/*
	public function destroyGroup($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyGroup() function", 0);    	    	    	    	    	    	
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM groups WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}
		// Delete all links to this group from database
		if ($stmt = $_db->prepare("DELETE FROM groups_pages WHERE groups_id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}	

		$_result = $_db->query("SELECT id, name FROM groups ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;     
	}  
*/

/*
	public function destroyPage($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyPage() function", 0); 
		if (isset($_REQUEST["deletepage"])) {
			if (strip_tags($_REQUEST["deletepage"]) == "yes") {
				$_db = $this->__construct();    
				if ($stmt = $_db->prepare("DELETE FROM pages WHERE id=?")) {
					$stmt->bind_param('d', $id);
					$id = (int) $idx;
					$stmt->execute();
					$stmt->close();
				}
				// Delete all links to this page from database
				if ($stmt = $_db->prepare("DELETE FROM groups_pages WHERE pages_id=?")) {
					$stmt->bind_param('d', $id);
					$id = (int) $idx;
					$stmt->execute();
					$stmt->close();
				}		
		
				$_result = $_db->query("SELECT id, name FROM pages ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
				$results = array();
				while ($row = $_result->fetch_assoc()) {
					array_push($results, $row);
				}	
				$this->__destruct($_db);    
				return $results; 
			}
		}		    	    	    	    	    	
    
	}  
*/
	//
	// destroyGroupAvailableUser() : Remove a user from its current group by updating record with selected group id
	// returns updated list of users currently not in the selected group
	// $_REQUEST["gid"] is set in the appropriate sencha store
	//
	public function destroyGroupAvailableUser($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyGroupAvailableUser() function", 0);  
		$results = array();  
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}
		if ($gid > 0) {  			    	    	    	    	
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("UPDATE users SET groups_id=? WHERE id=?")) {
				$stmt->bind_param('dd', $gid, $id);
				$id = (int) $idx;	//cast id to int
				$stmt->execute();
				$stmt->close();
			} 
			$_result = $_db->query("SELECT id, username, firstname, lastname FROM users WHERE groups_id != '" . $gid . "' ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			while ($row = $_result->fetch_assoc()) {
				//error_log("Select Rec: " . http_build_query($row), 0);
				array_push($results, $row);
			}	
			$this->__destruct($_db);
		} 
		return $results;   
	} 

/*
	public function destroySource($idx) {
		error_log("Log: /remote/lib/session_db.php - destroySource() function", 0);    	    	    	    	    	    	
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM sources WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}
		// Delete all permissions for this source	
		if ($stmt = $_db->prepare("DELETE FROM sources_groups WHERE usergroup=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}		
		// List all sources
		$_result = $_db->query("SELECT id, sourceid, name, weight FROM sources ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;     
	}  
*/	
	public function destroyAdvConfigObjs($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyAdvConfigObjs() function", 0);    	    	    	    	    	    	
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM settings WHERE id!=''")) {
			//$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}
	
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, cfgkey, description, file FROM settings ORDER BY cfgkey ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			error_log("Select Rec: " . http_build_query($row), 0);
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;   
	}  	
	
}



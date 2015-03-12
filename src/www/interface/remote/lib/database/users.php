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
 * @class UsersDB
 * Contains all functions related to users and MySQL database
 */
class UsersDB {
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

	//Get user ID based upon his username and password
	public function getUsersId($username, $password) {
		Log::debug("Log: /remote/lib/database/users.php - getUsersId() function");
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, groups_id, companies_id, username FROM users WHERE username='" . $username . "' AND password=SHA1('" . $password . "') LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return (int) $results['id'];
	}

	//Get username based upon his id
	public function getUsername($userid) {
		Log::debug("Log: /remote/lib/database/users.php - getUsername() function");
		$_db = $this->__construct();
		$_result = $_db->query("SELECT username FROM users WHERE id='" . $userid . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return $results['username'];
	}

	//Check if user is allowed to access a specific source
	public function getIdFromUsername($username) {
		Log::debug("Log: /remote/lib/database/users.php - getIdFromUsername() function");		
		$_db = $this->__construct();
		$_result = $_db->query("SELECT COUNT(id) AS cid, id FROM users WHERE username='" . $username . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);
		if ((int) $results['cid'] > 0) {
			return (int) $results['id'];
		} else {
			return false;			
		}
	}

	//Check if user is allowed to access a specific source
	public function isUsersSourceAllowed($username, $sourceid) {
		Log::debug("Log: /remote/lib/database/users.php - isUsersSourceAllowed() function");		
		$_db = $this->__construct();
		$_result = $_db->query("SELECT COUNT(id) AS cid FROM sources_groups WHERE usergroup='" . $sourceid . "' AND username='" . $username . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);
		if ( (int) $results['cid'] > 0) {
			return true;
		} else {
			return false;			
		}
	}
	
	//Check if user is allowed to access a specific source
	public function isUsersSourceAllowedToEditSource($username, $sourceid) {
		Log::debug("Log: /remote/lib/database/users.php - isUsersSourceAllowedToEdit() function");		
		$_db = $this->__construct();
		$_result = $_db->query("SELECT permission FROM sources_groups WHERE usergroup='" . $sourceid . "' AND username='" . $username . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);
		if ($results['permission'] != "ro") {
			return true;
		} else {
			return false;			
		}
	}	

	//Update user's language
	public function updateLanguage($id, $language) {       
		Log::debug("Log: /remote/lib/database/users.php - updateLanguage() function");
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE users SET lang=?  WHERE id=?")) {
			$stmt->bind_param('sd', $language, $id);
			$stmt->execute();
			$stmt->close();
			Log::activity("updateCompany() - User id: " . $id . " language updated to:" . $language);																			        							        																		        
		}
		return $this;      
	}  

	//Get username based upon his id
	public function getLanguage($userid) {
		Log::debug("Log: /remote/lib/database/users.php - getUsername() function");
		$_db = $this->__construct();
		$_result = $_db->query("SELECT lang FROM users WHERE id='" . $userid . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return $results['lang'];
	}
	
	//Check if user is allowed to access admin panel
	public function isUsersAdminAccessAllowed($username) {
		Log::debug("Log: /remote/lib/database/users.php - isUsersAdminAccessAllowed() function");		
		$_db = $this->__construct();
		$_result = $_db->query("SELECT COUNT(id) AS cid FROM sources_groups WHERE usergroup='admin' AND username='" . $username . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);
		if ( (int) $results['cid'] > 0) {
			return true;
		} else {
			return false;			
		}
	}	

	//Check if user is allowed to access a specific page
	public function isUsersPageAllowed($userid, $pagename) {
		Log::debug("Log: /remote/lib/database/users.php - isUsersPageAllowed() function");	
//		Log::debug("Log: /remote/lib/database/users.php - isUsersPageAllowed() pagename: " . $pagename . " - userid: " . $userid);											
		$_db = $this->__construct();
		
		$_result = $_db->query("SELECT groups_id FROM users WHERE id='" . $userid . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();	
		$usergroupid = (int) $results['groups_id'];

		$_result = $_db->query("SELECT id AS pagesid FROM pages WHERE name='" . $pagename . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();	
		$pageid = (int) $results['pagesid'];
		
		//Check if user has been attached to a group AND if pagename has an ID, if not, return false
		if ($usergroupid > 0 && $pageid > 0) {
			$_result = $_db->query("SELECT COUNT(id) AS cid FROM groups_pages WHERE groups_id='" . $usergroupid . "' AND pages_id='" . $pageid . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = $_result->fetch_assoc();
			$this->__destruct($_db);
//			Log::debug("Log: /remote/lib/database/users.php - isUsersPageAllowed() COUNT:" . $results['cid']);						
			if ( (int) $results['cid'] > 0) {
				return true;
			} else {
				return false;			
			}
		}
		else {
			return false;	
		}
	}
	
	public function getAllowedPagesForUser($userid) {
		Log::debug("Log: /remote/lib/database/users.php - getAllowedPagesForUser() function");	

		$_db = $this->__construct();			
		if ($userid > 1) {
			//Get user's group ID		
			$_result = $_db->query("SELECT groups_id FROM users WHERE id='" . $userid . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = $_result->fetch_assoc();	
			$usergroupid = (int) $results['groups_id'];

			$_result = $_db->query("SELECT
				p.name AS name
				FROM groups_pages AS gp
				LEFT JOIN pages AS p ON gp.pages_id = p.id
				WHERE gp.groups_id = '" . $usergroupid . "'
				ORDER BY p.name ASC") 
				or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		} elseif ($userid == 1) {
			//Root user can access everything by default
			$_result = $_db->query("SELECT
				p.name AS name
				FROM pages AS p
				ORDER BY p.name ASC") 
				or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);			
		}
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			$row['status'] = true;
			array_push($results, $row);
		}
		$this->__destruct($_db);
		return $results; 		
	}
	
	
	//Get a list of sources this users can have access to
	public function getUsersSources($username) {
		Log::debug("Log: /remote/lib/database/users.php - getUsersSources() function");						
		$_db = $this->__construct();
		if ($username != "root") {
			$_result = $_db->query("SELECT
				s.id AS id, 
				s.sourceid AS sourceid,
				s.name AS name,
				s.weight AS weight
				FROM sources_groups AS sg
				LEFT JOIN sources AS s ON sg.usergroup = s.sourceid
				WHERE sg.username = '" . $username . "'
				ORDER BY s.weight ASC") 
				or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		} else {
			$_result = $_db->query("SELECT 
				s.id AS id,
				s.sourceid AS sourceid,
				s.name AS name,
				s.weight AS weight				
				FROM sources AS s
				ORDER BY s.weight ASC") 
				or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);			
		}
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			if ($row['sourceid'] != "") {
				//Look for latest picture captured by source
				$targetdir = CFGDIR_SOURCESDIR . "source" . $row['sourceid'] . "/pictures/";
				$picsfs = new PicturesFS();
				$latestpicture = $picsfs->getPicture($targetdir, "last");
				$row['latestpicture'] = $latestpicture;
				if ($latestpicture != "") {
					$row['latestpicturedisp'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($latestpicture, 0,8) . "/" . $latestpicture . "&s=" . $row['sourceid'] . "&q=100";
					list($picwidth, $picheight, $pictype, $attr) = getimagesize($targetdir . substr($latestpicture, 0,8) . "/" . $latestpicture);
					$row['latestpicturewidth'] = $picwidth;			
					$row['latestpictureheight'] = $picheight;		
					$row['latestpicturedate'] = substr($latestpicture, 0,14);								
				} else {
					$row['latestpicturedisp'] = "0";
					$row['latestpicture'] = "0";
					$row['latestpicturewidth'] = "0";			
					$row['latestpictureheight'] = "0";		
					$row['latestpicturedate'] = "0";																		
				}
				
				array_push($results, $row);
			}
		}	
		$this->__destruct($_db);
		return $results;
	}

	
	//Get a list of all users from the database
	public function getUsers() {      	
		Log::debug("Log: /remote/lib/database/users.php - getUsers() function");						
		$_db = $this->__construct();
		$_result = $_db->query("SELECT 
			u.id AS id, u.username AS username, 
			u.password AS password, u.firstname AS firstname, 
			u.lastname AS lastname, u.email AS email, 
			u.companies_id AS company, u.groups_id AS groupid, 
			g.name AS groupname,
			g.id AS groupid,
			c.name AS companyname,
			c.id AS companyid
			FROM users AS u
			LEFT JOIN groups AS g ON u.groups_id = g.id
			LEFT JOIN companies AS c ON u.companies_id = c.id
			ORDER BY u.username ASC") 
			or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			$row['password'] = "xxxxxx"; // Replace password with xxxxxx as we don't want it to be sent regularly over the network
			//Log::debug("Log: /remote/lib/database/users.php - getUsers() - Username: " . $row['username']);
			//Check if user is allowed to connect to 'admin' interface
			$_resultcheckadmin = $_db->query("SELECT COUNT(id) AS cid FROM sources_groups WHERE usergroup='admin' AND username='" . $row['username'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$resultscheckadmin = $_resultcheckadmin->fetch_assoc();
			if (isset($resultscheckadmin['cid']) && (int) $resultscheckadmin['cid'] > 0) {
				$row['admin'] = "yes";
			} else {
				$row['admin'] = "no";
			}		
			array_push($results, $row);

		}	
		$this->__destruct($_db);
		return $results;    	
	}

	//Get a list of all users from the database
	public function getCloudusers() {      	
		Log::debug("Log: /remote/lib/database/users.php - getCloudusers() function");						
		$_db = $this->__construct();
		$_result = $_db->query("SELECT 
			u.id AS id, u.username AS username, 
			u.password AS password, u.firstname AS firstname, 
			u.lastname AS lastname, u.email AS email, 
			u.companies_id AS company, u.groups_id AS groupid, 
			g.name AS groupname,
			g.id AS groupid,
			c.name AS cname,
			c.id AS company,
			u.lang AS lang,
			u.invoice AS invoice,
			u.cloud AS accounttype,
			u.expirydate AS expirydate,			
			u.lastlogin AS lastlogin
			FROM users AS u
			LEFT JOIN groups AS g ON u.groups_id = g.id
			LEFT JOIN companies AS c ON u.companies_id = c.id
			WHERE g.name = 'Webcampak Cloud'
			ORDER BY u.username ASC") 
			or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			$row['password'] = "xxxxxx"; // Replace password with xxxxxx as we don't want it to be sent regularly over the network
			//Check if user is allowed to connect to 'admin' interface
			$_resultcheckadmin = $_db->query("SELECT COUNT(id) AS cid FROM sources_groups WHERE usergroup='admin' AND username='" . $row['username'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$resultscheckadmin = $_resultcheckadmin->fetch_assoc();
			if (isset($resultscheckadmin['cid']) && (int) $resultscheckadmin['cid'] > 0) {
				$row['admin'] = "yes";
			} else {
				$row['admin'] = "no";
			}	
			$row['expirydate'] = $row['expirydate'] * 1000; //Multiply by 1000 for javascript miliseconds timestamp
			array_push($results, $row);

		}	
		$this->__destruct($_db);
		return $results;    	
	}	
	
	//Insert a user inside the database
	public function insertUser($rec) {
		Log::debug("Log: /remote/lib/database/users.php - insertUser() function");	
		if($this->getIdFromUsername(strip_tags($rec['username'])) == false) {
			$_db = $this->__construct();
			if($stmt = $_db->prepare("INSERT INTO users (username, password, firstname, lastname, email, companies_id, groups_id) VALUES (?, SHA1(?), ?, ?, ?, ?, ?)")) {
				$stmt->bind_param('sssssdd', $username, $password, $firstname, $lastname, $email, $company, $groupid);
		
				$username = $_db->real_escape_string(strip_tags($rec['username']));
				$password = $_db->real_escape_string(strip_tags($rec['password']));
				$firstname = $_db->real_escape_string(strip_tags($rec['firstname']));
				$lastname = $_db->real_escape_string(strip_tags($rec['lastname']));
				$email = $_db->real_escape_string(strip_tags($rec['email']));
				$company = (int) $_db->real_escape_string($rec['company']);
				$groupid = (int) $_db->real_escape_string($rec['groupname']);
				//$groupid = (int) $this->getGroupID($rec['groupname']);
				Log::debug("Log: /remote/lib/database/users.php - insertUser() - " . http_build_query($rec));
				$stmt->execute();
				$stmt->close();
				
				//Allow (or not) user to access interface
				$this->setUserAdminAccess((int) $this->getIdFromUsername($username), $rec['admin']);					
				
				$status['success'] = true;
				$status['message'] = 'User successfully added';				
				return $status;						
			} 
		} else {
			$status['success'] = false;
			$status['message'] = 'There is already a user with this username';				
			return $status;			
		}
	}	

	//Insert a cloud user inside the database
	public function insertClouduser($rec) {
		Log::debug("Log: /remote/lib/database/users.php - insertUser() function");	
		if($this->getIdFromUsername(strip_tags($rec['username'])) == false) {
			$_db = $this->__construct();
			if($stmt = $_db->prepare("INSERT INTO users (username, password, firstname, lastname, email, companies_id, groups_id, lang, invoice, expirydate, lastlogin, cloud) VALUES (?, SHA1(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {
				$stmt->bind_param('sssssddssdds', $username, $password, $firstname, $lastname, $email, $company, $groupid, $lang, $invoice, $expirydate, $lastlogin, $accounttype);
		
				$username = $_db->real_escape_string(strip_tags($rec['username']));
				$password = $_db->real_escape_string(strip_tags($rec['password']));
				$firstname = $_db->real_escape_string(strip_tags($rec['firstname']));
				$lastname = $_db->real_escape_string(strip_tags($rec['lastname']));
				$email = $_db->real_escape_string(strip_tags($rec['email']));
				$company = (int) $_db->real_escape_string($rec['companyid']);
				$groupid = (int) $_db->real_escape_string($rec['groupid']);
				$lang = $_db->real_escape_string(strip_tags($rec['lang']));			
				$invoice = $_db->real_escape_string(strip_tags($rec['invoice']));
				$accounttype = $_db->real_escape_string(strip_tags($rec['accounttype']));							
				//$expirydate = (int) $_db->real_escape_string(strip_tags($rec['expirydate'])) / 1000;		
				$expirydate = (int) $_db->real_escape_string(strip_tags(strtotime($rec['expirydate'])));		
					
				$lastlogin =0;			
				//$groupid = (int) $this->getGroupID($rec['groupname']);
				Log::debug("Log: /remote/lib/database/users.php - insertUser() - " . http_build_query($rec));
				$stmt->execute();
				$stmt->close();
				
				//Allow (or not) user to access interface
				$this->setUserAdminAccess((int) $this->getIdFromUsername($username), $rec['admin']);				
				
				$status['success'] = true;
				$status['message'] = 'User successfully added';				
				return $status;						
			} 
		} else {
			$status['success'] = false;
			$status['message'] = 'There is already a user with this username';				
			return $status;			
		}
	}	
		
	//Destroy a user from the database
	public function destroyUser($idx) {
		Log::debug("Log: /remote/lib/database/users.php - destroyUser() function");
		$username = $this->getUsername($idx);
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("DELETE FROM users WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			if ($id >= 2) { // Root has id #1 and we do not allow deletion of root user
				$stmt->execute();
			}
			$stmt->close();
		}
		Log::debug("Log: /remote/lib/database/users.php - destroyUser() User removed from 'users' table");
		if ($stmt = $_db->prepare("DELETE FROM sources_groups WHERE username=?")) {
			$stmt->bind_param('s', $username);
			if ($idx >= 2) { // Root as id #1 and we do not allow deletion of root user
				$stmt->execute();
			}
			$stmt->close();
		}		
		Log::debug("Log: /remote/lib/database/users.php - destroyUser() User removed from 'sources_groups' table");				
/*		$_result = $_db->query("SELECT id, username, password, firstname, lastname, email FROM users ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			$row['password'] = "xxxxxx";
			array_push($results, $row);
		}	
*/
		$this->__destruct($_db);  
		return $this->getUsers(); 
	}

	//Destroy a user from the database
	public function destroyCloudUser($idx) {
		Log::debug("Log: /remote/lib/database/users.php - destroyCloudUser() function");
		$username = $this->getUsername($idx);
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("DELETE FROM users WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			if ($id >= 2) { // Root has id #1 and we do not allow deletion of root user
				$stmt->execute();
			}
			$stmt->close();
		}
		Log::debug("Log: /remote/lib/database/users.php - destroyCloudUser() User removed from 'users' table");
		if ($stmt = $_db->prepare("DELETE FROM sources_groups WHERE username=?")) {
			$stmt->bind_param('s', $username);
			if ($idx >= 2) { // Root as id #1 and we do not allow deletion of root user
				$stmt->execute();
			}
			$stmt->close();
		}		
		Log::debug("Log: /remote/lib/database/users.php - destroyCloudUser() User removed from 'sources_groups' table");				
/*		$_result = $_db->query("SELECT id, username, password, firstname, lastname, email FROM users ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			$row['password'] = "xxxxxx";
			array_push($results, $row);
		}	
*/		
		$this->__destruct($_db);    
		return $this->getCloudusers(); 
	}	

	//Update users record within database
	public function updateUser($idx, $attributes) {       
		Log::debug("Log: /remote/lib/database/users.php - updateUser() function");
		Log::debug("Log: /remote/lib/database/users.php - updateUser() Update user: " . $attributes['id']);		
	   if($this->getIdFromUsername(strip_tags($attributes['username'])) == false || $this->getIdFromUsername(strip_tags($attributes['username'])) == (int) $attributes['id']) {
			//Get Previous username
			$initialUsername = $this->getUsername((int) $attributes['id']);
			$_db = $this->__construct();
			if ($stmt = $_db->prepare("UPDATE users SET username=?, firstname=?, lastname=?, email=?, companies_id=?, groups_id=? WHERE id=?")) {
				$stmt->bind_param('ssssddd', $username, $firstname, $lastname, $email, $company, $groupid, $id);
		
				$username = strip_tags($attributes['username']);
				$firstname = strip_tags($attributes['firstname']);
				$lastname = strip_tags($attributes['lastname']);
				$email = strip_tags($attributes['email']);
				$company = (int) $attributes['companyname']; 
				if ($company < 1) {$company = (int) $attributes['companyid']; } //This is a trick, to be removed by a cleaner solution
				$groupid = (int) $attributes['groupname'];
				if ($groupid < 1) {$groupid = (int) $attributes['groupid']; }	//This is a trick, to be removed by a cleaner solution			
				//$groupid = (int) $this->getGroupID($attributes['groupname']);
				$id = (int) $attributes['id']; 			//cast id to int
		
				$stmt->execute();
		
				$stmt->close();
			}
			//If password has been modified we update its value
			if ($attributes['password'] != "xxxxxx") {
			    if ($stmt = $_db->prepare("UPDATE users SET password=SHA1(?) WHERE id=?")) {
					$stmt->bind_param('sd', $password, $id);
					$password = strip_tags($attributes['password']);
					$id = (int) $attributes['id'];
					$stmt->execute();
					$stmt->close();
		       		Log::debug("Log: /remote/lib/database/users.php - updateUser() Password updated");		 													
				}
			}
			//Updates usergroup database to reflect modification of username (if any)
			if ($initialUsername != strip_tags($attributes['username'])) {
			    if ($stmt = $_db->prepare("UPDATE sources_groups SET username=? WHERE username=?")) {
					$stmt->bind_param('ss', $newUsername, $oldUsername);
					$newUsername = strip_tags($attributes['username']);
					$oldUsername = $initialUsername;
					$stmt->execute();
					$stmt->close();
		       		Log::debug("Log: /remote/lib/database/users.php - updateUser() Username changed");		 								
				}				
			}
			$this->setUserAdminAccess((int) $attributes['id'], $attributes['admin']);
			/*
			//Manage modification of admin access status
			$adminAccess = $this->isUsersAdminAccessAllowed(strip_tags($attributes['username']));
			if ($attributes['admin'] == "yes" && $adminAccess == false) { // Means user currently do not have permission to access page, we add this permission.
				if($stmt = $_db->prepare("INSERT INTO sources_groups (username, usergroup) VALUES (?,?)")) {
					$stmt->bind_param('ss', $username, $usergroup);
					$username = $_db->real_escape_string(strip_tags($attributes['username']));
					$usergroup = $_db->real_escape_string("admin");
	        		$stmt->execute();
	        		$stmt->close();
	        		Log::debug("Log: /remote/lib/database/users.php - updateUser() User now allowed to access administration panel");		 			
	    		} 			
			} elseif ($attributes['admin'] == "no" && $adminAccess == true) { // Means it's necessary to remove permission for this user
				if ($stmt = $_db->prepare("DELETE FROM sources_groups WHERE username=? AND usergroup='admin'")) {
					$stmt->bind_param('s', $username);
					$username = $_db->real_escape_string(strip_tags($attributes['username']));
					$id = (int) $attributes['id'];
					if ($id >= 2) { // Root has id #1 and we do not allow modification of root's permissions
						$stmt->execute();
					}
					$stmt->close();
			  		Log::debug("Log: /remote/lib/database/users.php - updateUser() Access to administration panel removed for user: " . $username);		 								
				}			
			}
			*/
			$status['success'] = true;
			$status['message'] = 'User successfully updated';				
			return $status;	
		} else {
			$status['success'] = false;
			$status['message'] = 'There is already a user with this username';				
			return $status;	
		}
		return $this;      
	}

	//Update users record within database
	public function updateClouduser($idx, $attributes) {       
		Log::debug("Log: /remote/lib/database/users.php - updateClouduser() function");
		Log::debug("Log: /remote/lib/database/users.php - updateClouduser() Update user: " . $attributes['id']);		
	   if($this->getIdFromUsername(strip_tags($attributes['username'])) == false || $this->getIdFromUsername(strip_tags($attributes['username'])) == (int) $attributes['id']) {
			//Get Previous username
			$initialUsername = $this->getUsername((int) $attributes['id']);
			$_db = $this->__construct();
			if ($stmt = $_db->prepare("UPDATE users SET username=?, firstname=?, lastname=?, email=?, invoice=?, companies_id=?, cloud=? WHERE id=?")) {
				$stmt->bind_param('sssssdsd', $username, $firstname, $lastname, $email, $invoice, $companyid, $accounttype, $id);
		
				$username = strip_tags($attributes['username']);
				$firstname = strip_tags($attributes['firstname']);
				$lastname = strip_tags($attributes['lastname']);
				$email = strip_tags($attributes['email']);
				$invoice = strip_tags($attributes['invoice']);
				$accounttype = strip_tags($attributes['accounttype']);			
				$companyid = (int) $attributes['cname'];
				if ($companyid == 0) {
					$dbcompanies = new CompaniesDB();
					$companyid = $dbcompanies->getIdFromCompanyName($attributes['cname']);
				}
				$id = (int) $attributes['id'];
		
				$stmt->execute();
		
				$stmt->close();
			}
			//If password has been modified we update its value
			if ($attributes['password'] != "xxxxxx") {
			    if ($stmt = $_db->prepare("UPDATE users SET password=SHA1(?) WHERE id=?")) {
					$stmt->bind_param('sd', $password, $id);
					$password = strip_tags($attributes['password']);
					$id = (int) $attributes['id'];
					$stmt->execute();
					$stmt->close();
		       	Log::debug("Log: /remote/lib/database/users.php - updateClouduser() Password updated");		 													
				}
			}

			//If expiry date has been modified we update its value
			if ($attributes['expirydate'] != "0" && $attributes['expirydate'] != "") {
			    if ($stmt = $_db->prepare("UPDATE users SET expirydate=? WHERE id=?")) {
					$stmt->bind_param('sd', $expirydate, $id);
					$expirydate = strip_tags(strtotime($attributes['expirydate']));
					$id = (int) $attributes['id'];
					$stmt->execute();
					$stmt->close();
		       	Log::debug("Log: /remote/lib/database/users.php - updateClouduser() Expiry date updated");		 													
				}
			}			
			
			//Updates usergroup database to reflect modification of username (if any)
			if ($initialUsername != strip_tags($attributes['username'])) {
			    if ($stmt = $_db->prepare("UPDATE sources_groups SET username=? WHERE username=?")) {
					$stmt->bind_param('ss', $newUsername, $oldUsername);
					$newUsername = strip_tags($attributes['username']);
					$oldUsername = $initialUsername;
					$stmt->execute();
					$stmt->close();
		       		Log::debug("Log: /remote/lib/database/users.php - updateClouduser() Username changed");		 								
				}				
			}
			$this->setUserAdminAccess((int) $attributes['id'], $attributes['admin']);
			$status['success'] = true;
			$status['message'] = 'User successfully updated';				
			return $status;	
		} else {
			$status['success'] = false;
			$status['message'] = 'There is already a user with this username';				
			return $status;	
		}
		return $this;      
	}

	//Get all sources available for a specific user
	public function getUserAvailableSources($username) {  
		Log::debug("Log: /remote/lib/database/users.php - getUserAvailableSources() function");	  	      	    	    	    	
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, sourceid, name FROM sources ORDER BY weight ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();	
		while ($row = $_result->fetch_assoc()) {
	    	$_searchresult = $_db->query("SELECT COUNT(id) AS cid FROM sources_groups WHERE username='" . $username . "' AND usergroup='" . $row['sourceid'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$searchreasult = $_searchresult->fetch_assoc();
			if ($searchreasult['cid'] == 0) {
				array_push($results, $row);
			}
		}	
		$this->__destruct($_db);    
		return $results;    	
	} 

	//Get all sources available for a specific user
	public function setUserAdminAccess($userid, $allowaccess) {
		Log::debug("Log: /remote/lib/database/users.php - setUserAdminAccess() function");	 
		$username = $this->getUsername($userid);      	    	    	    			
		//Manage modification of admin access status
		$adminAccess = $this->isUsersAdminAccessAllowed(strip_tags($username));
		if ($allowaccess == "yes" && $adminAccess == false) { // Means user currently do not have permission to access page, we add this permission.
			$_db = $this->__construct();
			if($stmt = $_db->prepare("INSERT INTO sources_groups (username, usergroup) VALUES (?,?)")) {
				$stmt->bind_param('ss', $username, $usergroup);
				$username = $_db->real_escape_string(strip_tags($username));
				$usergroup = $_db->real_escape_string("admin");
	       	$stmt->execute();
	       	$stmt->close();
	       	Log::debug("Log: /remote/lib/database/users.php - setUserAdminAccess() User now allowed to access administration panel");		 			
	   	}
	   	$this->__destruct($_db);    			
		} elseif ($allowaccess == "no" && $adminAccess == true) { // Means it's necessary to remove permission for this user
			$_db = $this->__construct();
			if ($stmt = $_db->prepare("DELETE FROM sources_groups WHERE username=? AND usergroup='admin'")) {
				$stmt->bind_param('s', $username);
				$username = $_db->real_escape_string(strip_tags($username));
				if ($userid >= 2) { // Root has id #1 and we do not allow modification of root's permissions
					$stmt->execute();
				}
				$stmt->close();
		  		Log::debug("Log: /remote/lib/database/users.php - setUserAdminAccess() Access to administration panel removed for user: " . $username);		 								
	   		$this->__destruct($_db);    			
			}			
		} else {
		  	Log::debug("Log: /remote/lib/database/users.php - setUserAdminAccess() - Nothing to do for user: " . $username);		 											
		}
	}	
}



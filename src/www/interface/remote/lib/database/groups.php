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
 * @class GroupsDB
 * Contains all functions related to groups and MySQL database
 */
class GroupsDB {
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

	public function insertGroup($rec) {
		Log::debug("Log: /remote/lib/database/groups.php - insertGroup() function");
		$_db = $this->__construct();
		if($stmt = $_db->prepare("INSERT INTO groups (name) VALUES (?)")) {
			$stmt->bind_param('s', $name);
			$name = $_db->real_escape_string($rec['name']);
			error_log("Insert Rec: " . http_build_query($rec), 0);
			$stmt->execute();
			$stmt->close();
			Log::activity("insertGroup() - Group name: " . $name . " created");																			        							        																	
		} 
	}

	public function destroyGroup($idx) {
		Log::debug("Log: /remote/lib/database/groups.php - destroyGroup() function");
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM groups WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
			Log::activity("destroyGroup() - Group id: " . $id . " removed from 'groups' table");																			        							        														
		}
		// Delete all links to this group from database
		if ($stmt = $_db->prepare("DELETE FROM groups_pages WHERE groups_id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
			Log::activity("destroyGroup() - Group id: " . $id . " removed from 'groups_pages' table");																			        							        														
		}	

		$_result = $_db->query("SELECT id, name FROM groups ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;     
	}  	

	public function updateGroup($idx, $attributes) {
		Log::debug("Log: /remote/lib/database/groups.php - updateGroup() function");
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE groups SET name=?  WHERE id=?")) {
			$stmt->bind_param('sd', $name, $id);
			$name = $attributes['name'];
			$id = (int) $attributes['id']; //cast id to int
			$stmt->execute();
			$stmt->close();
			Log::activity("updateGroup() - Group id: " . $id . " updated to: " . $name);																			        							        											
		}
		return $this;      
	}    

	public function getGroupAvailablePages() {    
		Log::debug("Log: /remote/lib/database/groups.php - getGroupAvailablePages() function");	  	
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
				array_push($results, $row);
			}
		}	
		$this->__destruct($_db);    
		return $results;    	
	} 
	
	public function updatePage($idx, $attributes) {       
		Log::debug("Log: /remote/lib/database/groups.php - updatePage() function");	  	
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE pages SET name=?  WHERE id=?")) {
			$stmt->bind_param('sd', $name, $id);
			$name = $attributes['name'];
			$id = (int) $attributes['id']; //cast id to int
			$stmt->execute();
			$stmt->close();
			Log::activity("insertPage() - Page id: " . $id . " updated to: " . $name);																			        							        							
		}
		return $this;      
	}  
	
	public function insertPage($rec) {
		Log::debug("Log: /remote/lib/database/groups.php - insertPage() function");	  	
		$_db = $this->__construct();
		if($stmt = $_db->prepare("INSERT INTO pages (name) VALUES (?)")) {
			$stmt->bind_param('s', $name);
			$name = $_db->real_escape_string($rec['name']);
			//error_log("Insert Rec: " . http_build_query($rec), 0);
			$stmt->execute();
			$stmt->close();
			Log::debug("Log: /remote/lib/database/groups.php - updatePage() - Page inserted: " . $name);	
			Log::activity("insertPage() - Page name: " . $name . " inserted into database");																			        							        
		} 
	}

	public function destroyPage($idx) {
		Log::debug("Log: /remote/lib/database/groups.php - destroyPage() function");	  	
		if (isset($_REQUEST["deletepage"])) {
			if (strip_tags($_REQUEST["deletepage"]) == "yes") {
				$_db = $this->__construct();    
				if ($stmt = $_db->prepare("DELETE FROM pages WHERE id=?")) {
					$stmt->bind_param('d', $id);
					$id = (int) $idx;
					$stmt->execute();
					$stmt->close();
					Log::activity("destroyPage() - Page id: " . $id . " . removed removed from 'pages' table");																			        
				}
				// Delete all links to this page from database
				if ($stmt = $_db->prepare("DELETE FROM groups_pages WHERE pages_id=?")) {
					$stmt->bind_param('d', $id);
					$id = (int) $idx;
					$stmt->execute();
					$stmt->close();
					Log::activity("destroyPage() - Page id: " . $id . " . removed removed from 'groups_pages' table");											
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

	public function addUserToGroup($gid, $attributes) {
		Log::debug("Log: /remote/lib/database/groups.php - addUserToGroup() function");	  			
		if (isset($attributes['mid'])) {
			error_log("Log: /remote/lib/session_db.php - addUserToGroup() : User id:" . $attributes['mid'], 0);    	    	    	    	    	          	    	    	    	    	
			$_db = $this->__construct();
			if ($stmt = $_db->prepare("UPDATE users SET groups_id=?  WHERE id=?")) {
				$stmt->bind_param('dd', $gid, $id);
				$id = (int) $attributes['mid']; //cast id to int
				$stmt->execute();
				$stmt->close();
				Log::activity("addUserToGroup() - User id: " . $id . " . added to group id: " . $gid);						
			}
		}
	}

	//
	// removeUserFromGroup() : Remove a user from the selected group and set his group id to 0 (no group) 
	// Returns updated list of group members
	// $_REQUEST["gid"] is set in the appropriate sencha store	
	//
	public function removeUserFromGroup($idx) {
		Log::debug("Log: /remote/lib/database/groups.php - removeUserFromGroup() function");	  			
		$results = array();
		if (isset($_REQUEST["gid"])) {$gid = (int) strip_tags($_REQUEST["gid"]);}   
		if ($gid > 0) {
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("UPDATE users SET groups_id=? WHERE id=?")) {
				$stmt->bind_param('dd', $newgid, $id);
				$newgid = (int) "0";
				$id = (int) $idx;
				$stmt->execute();
				$stmt->close();
				Log::activity("removeUserFromGroup() - User id: " . $id . " . removed from group (set group id to 0)");						
			} 
	
			$_result = $_db->query("SELECT id, username, firstname, lastname FROM users WHERE groups_id = '" . $gid . "' ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = array();
			while ($row = $_result->fetch_assoc()) {
				array_push($results, $row);
			}	
		$this->__destruct($_db);    
		}
		return $results;   
	}  

    public function addPageToGroup($gid, $attributes) {
		Log::debug("Log: /remote/lib/database/groups.php - addPageToGroup() function");	  			    	
		if (isset($attributes['pid'])) {
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
	        			Log::activity("addPageToGroup() - Page id: " . $pageid . " . added to group id: " . $gid);						
	    			} 				
				}
				$this->__destruct($_db);
		}
	}
	
	
	//
	// removePageFromGroup() : Remove a page from the selected group 
	// Returns updated list of group pages
	// $_REQUEST["gid"] is set in the appropriate sencha store	
	//
	public function removePageFromGroup($idx) {
		Log::debug("Log: /remote/lib/database/groups.php - removePageFromGroup() function");	  			    	
		$results = array();
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}   
		if ($gid > 0) {
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("DELETE FROM groups_pages WHERE pages_id=? AND groups_id=?")) {
				$stmt->bind_param('dd', $id, $gid);
				$id = (int) $idx;
				$stmt->execute();
				$stmt->close();
	        	Log::activity("removePageFromGroup() - Page id: " . $pageid . " . removed from group id: " . $gid);										
			}	
	
			$_result = $_db->query("SELECT p.id AS id, p.name AS name FROM groups_pages AS gp LEFT JOIN pages AS p ON gp.pages_id = p.id WHERE gp.groups_id = '" . $gid . "' ORDER BY p.name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = array();
			while ($row = $_result->fetch_assoc()) {
				array_push($results, $row);
			}	
			$this->__destruct($_db);    
		}
		return $results;   
	}   
	
	
	public function getGroupID($groupname) {
		Log::debug("Log: /remote/lib/database/groups.php - getGroupID() function");	  			    	
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id FROM groups WHERE name='" . $groupname . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return $results['id'];
	}
  	

}



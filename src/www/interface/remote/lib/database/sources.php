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
 * @class SourcesDB
 * Contains all functions related to users and MySQL database
 */
class SourcesDB {
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

	public function getSourceName($sourceid) {
		Log::debug("Log: /remote/lib/database/sources.php - getSourceName() function");
		$_db = $this->__construct();
		$_result = $_db->query("SELECT name FROM sources WHERE sourceid='" . $sourceid . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return $results['name'];
	}
	
	public function getSourceIdFromId($id) {
		Log::debug("Log: /remote/lib/database/sources.php - getSourceNameFromId() function");
		$_db = $this->__construct();
		$_result = $_db->query("SELECT sourceid FROM sources WHERE id='" . $id . "' LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return $results['sourceid'];
	}	

	//Check if user is allowed to access a specific source
	public function getIdfromSourceId($sourceid) {
		Log::debug("Log: /remote/lib/database/sources.php - getIdfromSourceId() function");		
		$_db = $this->__construct();
		$_result = $_db->query("SELECT COUNT(id) AS cid, id FROM sources WHERE sourceid='" . $sourceid . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);
		if ((int) $results['cid'] > 0) {
			return (int) $results['id'];
		} else {
			return false;			
		}
	}

	public function findAvailableSourceId() {
		Log::debug("Log: /remote/lib/database/sources.php - getSourceName() function");
		$_db = $this->__construct();
		$_result = $_db->query("SELECT sourceid FROM sources ORDER BY sourceid DESC LIMIT 1") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return $results['sourceid'];
	}

	public function insertSource($rec) {
		Log::debug("Log: /remote/lib/database/sources.php - insertSource() function");
		if($this->getIdfromSourceId((int) $rec['sourceid']) == false) {
			$_db = $this->__construct();
			if($stmt = $_db->prepare("INSERT INTO sources (sourceid, name, weight) VALUES (?, ?, ?)")) {
				$stmt->bind_param('dsd', $sourceid, $name, $weight);
				$name = $_db->real_escape_string($rec['name']);
				$sourceid = (int) $_db->real_escape_string($rec['sourceid']);	        	
				$weight = (int) $_db->real_escape_string($rec['weight']);
				$stmt->execute();
				$stmt->close();
				Log::activity("insertSource() - Source name: " . $name . " created");
				if (!is_dir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/")) {
					//Once database record created, create directories if does not exist
					passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- sourcecreatedir " . $sourceid);					
					Log::activity("updateSource() - Source directory created: " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/");	
				}
				if (!is_file(CFGDIR_CONF . "config-source" . $sourceid . ".cfg")) {
					//Once database record created, create configuration files if does not exist
					passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- sourcecreateconf " . $sourceid);
					passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updatecrontab " . $sourceid);					
					Log::activity("updateSource() - Source directory created: " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/");	
				}
				//Create FTP configuration and refresh FTP server
				passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- sourcecreateftp " . $sourceid);	
				passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updateftp " . $sourceid);									
									
				$status['success'] = true;
				$status['message'] = 'Source successfully added';				
				return $status;																									        							        																		        
			}
		} else {
			Log::debug("Log: /remote/lib/database/sources.php - insertSource() - Error: There is already a source with this sourceid");
			$status['success'] = false;
			$status['message'] = 'There is already a source with this source id';				
			return $status;
		}
		
	}

	public function destroySource($idx) {
		Log::debug("Log: /remote/lib/database/sources.php - destroySource() function");
		$sourceid = $this->getSourceIdFromId((int) $idx);
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM sources WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
			Log::activity("destroySource() - Source id: " . $id . " deleted");
			
			passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- sourcedeleteconf " . $sourceid);
			passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- sourcedeletecontent " . $sourceid);									
			passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updatecrontab " . $sourceid);								
			passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updateftp " . $sourceid);					
																			        							        																		        			
		}
		// Delete all permissions for this source	
		if ($stmt = $_db->prepare("DELETE FROM sources_groups WHERE usergroup=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
			Log::activity("destroySource() - Source id: " . $id . " deleted from 'sources_groups' table");																			        							        																		        						
		}		

		// Delete all comments for this source	
		if ($stmt = $_db->prepare("DELETE FROM pictures WHERE sourceid=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
			Log::activity("destroySource() - Source id: " . $id . " deleted from 'pictures' table");																			        							        																		        						
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
	
	public function updateSource($idx, $attributes) {       
		Log::debug("Log: /remote/lib/database/sources.php - updateSource() function");
		$status = array();
		$status['id'] = (int) $attributes['id'];
		if($this->getIdfromSourceId((int) $attributes['sourceid']) == false || $this->getIdfromSourceId((int) $attributes['sourceid']) == (int) $attributes['id']) {
			$initialSourceid = $this->getSourceIdFromId((int) $attributes['id']);				
			$_db = $this->__construct();
			if ($stmt = $_db->prepare("UPDATE sources SET name=?, sourceid=?, weight=?  WHERE id=?")) {
				$stmt->bind_param('sddd', $name, $sourceid, $weight, $id);
				$name = $attributes['name'];
				$id = (int) $attributes['id']; //cast id to int	   
				$sourceid = (int) $attributes['sourceid']; //cast id to int	             
				$weight = (int) $attributes['weight']; //cast id to int
				$stmt->execute();
				$stmt->close();
				Log::activity("updateSource() - Source id: " . $id . " updated");	
/*				
				if (is_dir(CFGDIR_SOURCESDIR . "source" . $initialSourceid . "/") && !is_dir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/")) {
					//Once database updated, rename source directory
					passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- changesourceid " . $initialSourceid . " " .  $sourceid);					
					//passthru("sudo -u " . CFGSYS_SYSTEMUSER . " mv " . CFGDIR_SOURCESDIR . "source" . $initialSourceid . "/" . " " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/");
					Log::activity("updateSource() - Source directory renamed from: " . CFGDIR_SOURCESDIR . "source" . $initialSourceid . "/" . " to " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/");	
				}																						        							        																		        							        
*/
			} else {
		       Log::debug("Log: /remote/lib/database/sources.php - updateSource(): Error updating source details");		 												
			}
			
			//If source id is updated, update permissions
			//Updates usergroup database to reflect modification of sourceid (if any)
			if ($initialSourceid != (int) strip_tags($attributes['sourceid'])) {
			    if ($stmt = $_db->prepare("UPDATE sources_groups SET usergroup=? WHERE usergroup=?")) {
					$stmt->bind_param('dd', $newSourceid, $oldSrouceid);
					$newSourceid = (int) strip_tags($attributes['sourceid']);
					$oldSrouceid = (int) $initialSourceid;
					$stmt->execute();
					$stmt->close();
		       		Log::debug("Log: /remote/lib/database/sources.php - updateSource() Sourceid changed in 'sources_groups' table");		 								
				}		
			}
			$status['success'] = true;
			//$status['message'] = _("Source: " . $attributes['id'] . " updated successfully (source id: " . $attributes['sourceid'] . ")");
			$status['message'] = sprintf(str_replace(array('#SID#', '#SOURCEID#'), array($attributes['id'], $attributes['sourceid']),  _("Source: #SID# updated successfully (source id: #SOURCEID#)")));			
			return $status;	
		} else {
			Log::debug("Log: /remote/lib/database/sources.php - updateSource() - Error: There is already a source with this sourceid");
			$status['success'] = false;
			$status['message'] = "There is already a source with this source id (" . $attributes['sourceid'] . ")";				
			return $status;
		}
	}   	 

	public function getSourceAvailableUsers() {      	
		Log::debug("Log: /remote/lib/database/sources.php - getSourceAvailableUsers() function");
		if (isset($_REQUEST["sid"])) {$sid = (int) strip_tags($_REQUEST["sid"]);}           	    	    	    	
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, username, firstname, lastname FROM users ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
	    	$_searchresult = $_db->query("SELECT COUNT(id) AS cid FROM sources_groups WHERE usergroup='" . $sid . "' AND username='" . $row['username'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$searchreasult = $_searchresult->fetch_assoc();
			if ($searchreasult['cid'] == 0) {
				array_push($results, $row);
			}
		}	
		$this->__destruct($_db);    
		return $results;    	
	}  	

/*
    public function addUserToSource($sid, $attributes) {
  		Log::debug("Log: /remote/lib/database/sources.php - addUserToSource() function");  	
		if (isset($attributes['mid'])) {   	    	    	    	    	          	    	    	    	    	
				$_db = $this->__construct();
				//Check if there if user is already attached to source				
	   		$_result = $_db->query("SELECT id FROM sources_groups WHERE usergroup='" . $sid . "' AND username='" . $attributes['username'] . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	   		$results = $_result->fetch_assoc();	
				if ($results['id'] > 0) {
					Log::debug("Log: /remote/lib/session_db.php - addUserToSource() : User:" . $attributes['username'] . " already attached to source");  	
				} else {
					//If page is not already attached to group we can add it into the database
					if($stmt = $_db->prepare("INSERT INTO sources_groups (username, usergroup) VALUES (?,?)")) {
						$stmt->bind_param('sd', $username, $sid);
						$username = $_db->real_escape_string($attributes['username']);
	        			$stmt->execute();
	        			$stmt->close();
	        			Log::activity("addUserToSource() User:" . $attributes['username'] . " attached to source id: " . $sid);																			        							        																		        							        
	    			} 				
				}
				$this->__destruct($_db);
		}
	}
*/
    public function addUserToSource($sourceid, $username) {
  		Log::debug("Log: /remote/lib/database/sources.php - addUserToSource() function");
  		global $dbusers;
		$userid = $dbusers->getIdFromUsername($username);
		if (isset($userid)) {   	    	    	    	    	          	    	    	    	    	
				$_db = $this->__construct();
				//Check if there if user is already attached to source				
	   		$_result = $_db->query("SELECT id FROM sources_groups WHERE usergroup='" . $sourceid . "' AND username='" . $username . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	   		$results = $_result->fetch_assoc();	
				if ($results['id'] > 0) {
					Log::debug("Log: /remote/lib/session_db.php - addUserToSource() : User:" . $username . " already attached to source");  	
				} else {
					//If page is not already attached to group we can add it into the database
					if($stmt = $_db->prepare("INSERT INTO sources_groups (username, usergroup, permission) VALUES (?,?, 'rw')")) {
						$stmt->bind_param('sd', $usernamedb, $sourceid);
						$usernamedb = $_db->real_escape_string($username);
	        			$stmt->execute();
	        			$stmt->close();
	        			Log::activity("addUserToSource() User:" . $username . " attached to source id: " . $sourceid);																			        							        																		        							        
	    			} 				
				}
				$this->__destruct($_db);
		}
	}

    public function updateUserSourcePermission($idx, $attributes, $username) {
  		Log::debug("Log: /remote/lib/database/sources.php - updateUserSourcePermission() function"); 	    	    	          	    	    	    	    	
		$_db = $this->__construct();
		//If page is not already attached to group we can add it into the database
		if ($stmt = $_db->prepare("UPDATE sources_groups SET permission=? WHERE username=? AND usergroup=?")) {
			$stmt->bind_param('ssd', $permission, $username, $sourceid);
			$sourceid = (int) $attributes['sourceid']; 
			$permission = $attributes['permission'];       
  			Log::debug("Log: /remote/lib/database/sources.php - updateUserSourcePermission() - Set permission: " . $permission . " where id: " . $id); 	    	    	          	    	    	    	    							       
			$stmt->execute();
			$stmt->close();
		}					
		$this->__destruct($_db);
		$status['success'] = true;
		$status['message'] = 'User successfully updated';				
		return $status;			
	}


	//
	// removeUserFromSource() : Remove a user from the selected source 
	// Returns updated list of users
	// $_REQUEST["sid"] is set in the appropriate sencha store	
	//
	public function removeUserFromSource($username, $sourceid) {
  		Log::debug("Log: /remote/lib/database/sources.php - removeUserFromSource() function");  	
		$results = array();
		//if (isset($_REQUEST["sid"])) {$sid = (int) strip_tags($_REQUEST["sid"]);}   
		if ($sourceid > 0) {
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("DELETE FROM sources_groups WHERE usergroup=? AND username=?")) {
				$stmt->bind_param('ds', $sourceid, $username);
				$username = $_db->real_escape_string($username);
				$stmt->execute();
				$stmt->close();
				Log::activity("removeUserFromSource() User:" . $username . " removed from source id: " . $sourceid);																			        							        																		        							        
			}	
			error_log("Log: /remote/lib/session_db.php - removeUserFromSource() - Reload user list", 0);   			 	    	    	    	    	    		
			$_result = $_db->query("SELECT 
	    			u.id AS id,
	    			u.username AS username,
	    			u.firstname AS firstname,
	    			u.lastname AS lastname
	    		FROM sources_groups AS sg
	    		LEFT JOIN users AS u ON sg.username = u.username
	    		WHERE sg.usergroup = '" . $sourceid . "' AND u.username != ''
	    		ORDER BY u.username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = array();
			while ($row = $_result->fetch_assoc()) {
				array_push($results, $row);
			}	
			$this->__destruct($_db);    
		}
		return $results;   
	}  	


	
	
}



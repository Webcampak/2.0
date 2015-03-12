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
 * @class UserSource
 */
class UserSource extends Model {
	public $id, $attributes;	

	static function create($params) {
		Log::debug("Log: /remote/app/models/usersource.php - create() function");
		Log::debug("Log: /remote/app/models/usersource.php - create() - " . http_build_query(get_object_vars($params)));						     
		if (isset($_REQUEST["userid"])) {$userid = (int) strip_tags($_REQUEST["userid"]);}   
		if ($userid > 0) {
			global $dbusers;
			$obj = new self(get_object_vars($params));			
			$username = $dbusers->getUsername($userid);
			$attributes = get_object_vars($params);
			$dbsources = new SourcesDB();
			$dbsources->addUserToSource($attributes['sourceid'], $username);
			return $obj;
		}       
    }

	static function find($id) {
		Log::debug("Log: /remote/lib/models/usersource.php - find() function");
		if (isset($_REQUEST["userid"])) {$userid = (int) strip_tags($_REQUEST["userid"]);} 		
		global $dbusers;			
		$username = $dbusers->getUsername($userid);		
		$dbgeneric = new GenericDB();    			
		$findUserSource = $dbgeneric->getSqlRecords("SELECT 
	   			s.id AS id,
	   			s.sourceid AS sourceid,
	   			s.name AS name,
	   			sg.permission AS permission
	   		FROM sources_groups AS sg
	   		LEFT JOIN sources AS s ON sg.usergroup = s.sourceid
	   		WHERE sg.username = '" . $username . "' AND s.sourceid > 0
	    		ORDER BY s.weight ASC");		
		$found = null;
		foreach ($findUserSource as $rec) {
			if ($rec['id'] == $id) {
				$found = new self($rec);
				break;
			}
		}
		//Log::debug("Log: /remote/lib/models/usersource.php - find() - found: " .  $found);		
		return $found;
	}

	static function destroy($id) {
		Log::debug("Log: /remote/app/models/usersource.php - create() function");
		$rec = null;
		if (isset($_REQUEST["userid"])) {$userid = (int) strip_tags($_REQUEST["userid"]);} 
		if ($userid > 0) {
			global $dbusers;			
			$username = $dbusers->getUsername($userid);
			$dbsources = new SourcesDB();
			$dbgeneric = new GenericDB();    
			$sourceid = $dbsources->getSourceIdFromId($id);
			$rs = $dbgeneric->getSqlRecords("SELECT 
	    			s.id AS id,
	    			s.sourceid AS sourceid,
	    			s.name AS name,
	    			sg.permission AS permission
	    		FROM sources_groups AS sg
	    		LEFT JOIN sources AS s ON sg.usergroup = s.sourceid
	    		WHERE sg.username = '" . $username . "' AND s.sourceid > 0
	    		ORDER BY s.weight ASC");
			foreach ($rs as $idx => $row) {
				if ($row['id'] == $id) {
					$rec = new self($dbsources->removeUserFromSource($username, $sourceid));
					break;
				}
			}
		}
		return $rec;
	}
   
	static function all() {
		Log::debug("Log: /remote/app/models/usersource.php - all() function");		
		if (isset($_REQUEST["userid"])) {$userid = (int) strip_tags($_REQUEST["userid"]);}   
		if ($userid > 0) {
			global $dbusers;
			$username = $dbusers->getUsername($userid);			
			$dbgeneric = new GenericDB(); 				   
			return $dbgeneric->getSqlRecords("SELECT 
	    			s.id AS id,
	    			s.sourceid AS sourceid,
	    			s.name AS name,
	    			sg.permission AS permission	    			
	    		FROM sources_groups AS sg
	    		LEFT JOIN sources AS s ON sg.usergroup = s.sourceid
	    		WHERE sg.username = '" . $username . "' AND s.sourceid > 0
	    		ORDER BY s.weight ASC");
		} else {
			return null;
		}    
    }

	static function update($id, $params) {
		Log::debug("Log: /remote/lib/models/usersource.php - update() function");
		if (isset($_REQUEST["userid"])) {$userid = (int) strip_tags($_REQUEST["userid"]);} 		
		global $dbusers;			
		$username = $dbusers->getUsername($userid);				
 		$rec = self::find($id);
		if ($rec == null) {return $rec;}
		$dbgeneric = new GenericDB(); 		
		$rs = $dbgeneric->getSqlRecords("SELECT 
	    			s.id AS id,
	    			s.sourceid AS sourceid,
	    			s.name AS name,
	    			sg.permission AS permission	    			
	    		FROM sources_groups AS sg
	    		LEFT JOIN sources AS s ON sg.usergroup = s.sourceid
	    		WHERE sg.username = '" . $username . "' AND s.sourceid > 0
	    		ORDER BY s.weight ASC");
		foreach ($rs as $idx => $row) {
			if ($row['id'] == $id && $userid > 1) {
				Log::debug("Log: /remote/lib/models/usersource.php - update() - record found");				
				$rec->attributes = array_merge($rec->attributes, get_object_vars($params));
				$dbsources = new SourcesDB();
				$rec->status = $dbsources->updateUserSourcePermission($idx, $rec->attributes, $username);				
				break;
			}
		}
		return $rec;		
	}

	public function __construct($params) {
		Log::debug("Log: /remote/app/models/usersource.php - __construct() function");    	
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function to_hash() {
		Log::debug("Log: /remote/app/models/usersource.php - to_hash() function");    	
		return $this->attributes;
	}

}

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
 * @class SourceMember
 */
class SourceMember extends Model {
    public $id, $attributes;	


	static function create($params) {
		Log::debug("Log: /remote/app/models/sourcemember.php - create() function");		
		Log::debug("Log: /remote/app/models/sourcemember.php - create() - " . http_build_query(get_object_vars($params)));	    
		if (isset($_REQUEST["sid"])) {$sid = (int) strip_tags($_REQUEST["sid"]);} else {$sid = 0;}
		if ($sid > 0) {
			$obj = new self(get_object_vars($params));
			$attributes = get_object_vars($params);
			$dbsources = new SourcesDB();
			$dbsources->addUserToSource($sid, $attributes['username']);
			return $obj;
		}       
    }

	static function destroy($id) {
		Log::debug("Log: /remote/app/models/sourcemember.php - destroy() function");		
		$rec = null;
		if (isset($_REQUEST["sid"])) {$sourceid = (int) strip_tags($_REQUEST["sid"]);}   
		if ($sourceid > 0) {
			$dbgeneric = new GenericDB(); 
			$dbsources = new SourcesDB();	         
			$rs = $dbgeneric->getSqlRecords("SELECT 
	    			u.id AS id,
	    			u.username AS username,
	    			u.firstname AS firstname,
	    			u.lastname AS lastname
	    		FROM sources_groups AS sg
	    		LEFT JOIN users AS u ON sg.username = u.username
	    		WHERE sg.usergroup = '" . $sourceid . "' AND u.username != ''
	    		ORDER BY u.username ASC");
			foreach ($rs as $idx => $row) {
				if ($row['id'] == $id) {
					$rec = new self($dbsources->removeUserFromSource($row['username'], $sourceid));
					break;
				}
			}
		}
		return $rec;
	}
   
	static function all() {
		Log::debug("Log: /remote/app/models/sourcemember.php - all() function");		
		if (isset($_REQUEST["sid"])) {$sid = (int) strip_tags($_REQUEST["sid"]);} else {$sid = 0;}		  
		if ($sid > 0) { 
			$dbgeneric = new GenericDB(); 		       
			return $dbgeneric->getSqlRecords("SELECT 
	    			u.id AS id,
	    			u.username AS username,
	    			u.firstname AS firstname,
	    			u.lastname AS lastname
	    		FROM sources_groups AS sg
	    		LEFT JOIN users AS u ON sg.username = u.username
	    		WHERE sg.usergroup = '" . $sid . "' AND u.username != ''
	    		ORDER BY u.username ASC");
		} else {
			return null;
		}    
    }

	public function __construct($params) {
		Log::debug("Log: /remote/app/models/sourcemember.php - __construct() function");		    	
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function to_hash() {
		Log::debug("Log: /remote/app/models/sourcemember.php - to_hash() function");		    	
		return $this->attributes;
	}

}

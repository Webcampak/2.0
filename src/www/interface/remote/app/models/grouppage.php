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
 * @class GroupPage
 */
class GroupPage extends Model {
	public $id, $attributes;	

	static function create($params) {
		Log::debug("Log: /remote/app/models/grouppage.php - create() function");
		Log::debug("Log: /remote/app/models/grouppage.php - create() - " . http_build_query(get_object_vars($params)));						     
		if (isset($_REQUEST["gid"])) {$gid = (int) strip_tags($_REQUEST["gid"]);}   
		if ($gid > 0) {
			$obj = new self(get_object_vars($params));
			$dbgroups = new GroupsDB();
			$dbgroups->addPageToGroup($gid, get_object_vars($params));			
			return $obj;
		}       
    }

	static function destroy($id) {
		Log::debug("Log: /remote/app/models/grouppage.php - create() function");
		$rec = null;
		if (isset($_REQUEST["gid"])) {$gid = (int) strip_tags($_REQUEST["gid"]);}   
		if ($gid > 0) {
			$dbgroups = new GroupsDB(); 
			$dbgeneric = new GenericDB();    
			$rs = $dbgeneric->getSqlRecords("SELECT 
	    			p.id AS id,
	    			p.name AS name
	    		FROM groups_pages AS gp
	    		LEFT JOIN pages AS p ON gp.pages_id = p.id
	    		WHERE gp.groups_id = '" . $gid . "'
	    		ORDER BY p.name ASC");
			foreach ($rs as $idx => $row) {
				if ($row['id'] == $id) {
					$rec = new self($dbgroups->removePageFromGroup($id));
					break;
				}
			}
		}
		return $rec;
	}
   
	static function all() {
		Log::debug("Log: /remote/app/models/grouppage.php - all() function");		
		if (isset($_REQUEST["gid"])) {$gid = (int) strip_tags($_REQUEST["gid"]);}   
		if ($gid > 0) {
			$dbgeneric = new GenericDB(); 				   
			return $dbgeneric->getSqlRecords("SELECT 
	    			p.id AS id,
	    			p.name AS name
	    		FROM groups_pages AS gp
	    		LEFT JOIN pages AS p ON gp.pages_id = p.id
	    		WHERE gp.groups_id = '" . $gid . "'
	    		ORDER BY p.name ASC");
		} else {
			return null;
		}    
    }

	public function __construct($params) {
		Log::debug("Log: /remote/app/models/grouppage.php - __construct() function");    	
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function to_hash() {
		Log::debug("Log: /remote/app/models/grouppage.php - to_hash() function");    	
		return $this->attributes;
	}

}

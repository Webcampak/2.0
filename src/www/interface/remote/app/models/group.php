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
 * @class Group
 */
class Group { //extends Model {
	public $id, $attributes;	

	static function create($params) {
		Log::debug("Log: /remote/lib/models/group.php - create() function");    	
		$obj = new self(get_object_vars($params));
		$obj->save();
		return $obj;
	}

	static function find($id) {
		Log::debug("Log: /remote/lib/models/group.php - find() function");    	
		$dbgeneric = new GenericDB(); 
		$found = null;
		foreach ($dbgeneric->getSqlRecords("SELECT id, name FROM groups ORDER BY name ASC") as $rec) {
			if ($rec['id'] == $id) {
				$found = new self($rec);
				break;
			}
		}
		return $found;
	}

	static function update($id, $params) {
		Log::debug("Log: /remote/lib/models/group.php - update() function");
		$rec = self::find($id);
		if ($rec == null) {
			return $rec;
		}
		$dbgeneric = new GenericDB();
		$dbgroups = new GroupsDB(); 		
		$rs = $dbgeneric->getSqlRecords("SELECT id, name FROM groups ORDER BY name ASC");
		foreach ($rs as $idx => $row) {
			if ($row['id'] == $id) {
				$rec->attributes = array_merge($rec->attributes, get_object_vars($params));
				$dbgroups->updateGroup($idx, $rec->attributes);
				break;
			}
		}
		return $rec;
	}
    
	static function destroy($id) {
		Log::debug("Log: /remote/lib/models/group.php - destroy() function");
		$dbgeneric = new GenericDB(); 	
		$rec = null;
		$rs = $dbgeneric->getSqlRecords("SELECT id, name FROM groups ORDER BY name ASC");
		$dbgroups = new GroupsDB();
		foreach ($rs as $idx => $row) {
			if ($row['id'] == $id) {
				$rec = new self($dbgroups->destroyGroup($id));
				break;
			}
		}
		return $rec;
	}
    
	static function all() {
		Log::debug("Log: /remote/lib/models/group.php - all() function");
		$dbgeneric = new GenericDB(); 	
		return $dbgeneric->getSqlRecords("SELECT id, name FROM groups ORDER BY name ASC");
	}

	public function __construct($params) {
		Log::debug("Log: /remote/lib/models/group.php - __construct() function");
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function save() {
		Log::debug("Log: /remote/lib/models/group.php - save() function");
		$dbgeneric = new GenericDB();
		$this->attributes['id'] = $dbgeneric->getNextTableKey("groups");
		$dbgroups = new GroupsDB(); 		
		$dbgroups->insertGroup($this->attributes);
	}

	public function to_hash() {
		Log::debug("Log: /remote/lib/models/group.php - to_hash() function");
		return $this->attributes;
	}

}

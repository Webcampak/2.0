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
 * @class GroupAvailablePage
 */
class GroupAvailablePage { //extends Model {
    public $id, $attributes;	


	static function create($params) {
		Log::debug("Log: /remote/app/models/groupavailablepage.php - create() function");
		$obj = new self(get_object_vars($params));
		$obj->save();
		return $obj;
	}

	static function find($id) {
		Log::debug("Log: /remote/app/models/groupavailablepage.php - find() function");
		$dbgroups = new GroupsDB();		
		$found = null;
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}           
		foreach ($dbgroups->getGroupAvailablePages() as $rec) {
			if ($rec['id'] == $id) {
				$found = new self($rec);
				break;
			}
		}
		return $found;
	}

	static function update($id, $params) {
		Log::debug("Log: /remote/app/models/groupavailablepage.php - update() function");
		$dbgroups = new GroupsDB();		
		$rec = self::find($id);
		if ($rec == null) {
			return $rec;
		}
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}            
		$rs = $dbgroups->getGroupAvailablePages();
		foreach ($rs as $idx => $row) {
			if ($row['id'] == $id) {
				$rec->attributes = array_merge($rec->attributes, get_object_vars($params));
				$dbgroups->updatePage($idx, $rec->attributes);
				break;
			}
		}
		return $rec;
	}
    
	static function destroy($id) {
		Log::debug("Log: /remote/app/models/groupavailablepage.php - destroy() function");
		$dbgroups = new GroupsDB();		
		$rec = null;
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}           
		$rs = $dbgroups->getGroupAvailablePages();
		foreach ($rs as $idx => $row) {
			if ($row['id'] == $id) {
				$rec = new self($dbgroups->destroyPage($id));
				break;
			}
		}
		return $rec;
	}
    
	static function all() {
		Log::debug("Log: /remote/app/models/groupavailablepage.php - all() function");
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}
		$dbgroups = new GroupsDB();		
		return $dbgroups->getGroupAvailablePages();
	}

	public function __construct($params) {
		Log::debug("Log: /remote/app/models/groupavailablepage.php - __construct() function");
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function save() {
		Log::debug("Log: /remote/app/models/groupavailablepage.php - save() function");
		$dbgeneric = new GenericDB();
		$this->attributes['id'] = $dbgeneric->getNextTableKey("pages");
		$dbgroups = new GroupsDB(); 		
		$dbgroups->insertPage($this->attributes);
    }

	public function to_hash() {
		Log::debug("Log: /remote/app/models/groupavailablepage.php - to_hash() function");
		return $this->attributes;
	}

}

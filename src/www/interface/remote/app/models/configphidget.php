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
 * @class Configphidget
 */
class Configphidget { //extends Model {
    public $id, $attributes;	

	static function find($id) {
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true) {				
			Log::debug("Log: /remote/lib/models/configphidget.php - find() function");
			$found = null;
			$configObj = new ConfigObj();			
			foreach ($configObj->getPhidgets($sourceid) as $rec) {
				if ($rec['id'] == $id) {
					$found = new self($rec);
					break;
				}
			}
			return $found;
		}
	}

	static function update($id, $params) {
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true && $userAuth->isAllowedToEditSource($sourceid) == true) {
			Log::debug("Log: /remote/lib/models/configphidget.php - update() function");
			global $dbusers;
	 		$rec = self::find($id);
			if ($rec == null) {return $rec;}
			$configObj = new ConfigObj();
			$rs = $configObj->getPhidgets($sourceid);
			foreach ($rs as $idx => $row) {
				if ($row['id'] == $id) {
					$rec->attributes = array_merge($rec->attributes, get_object_vars($params));
					$rec->status = $configObj->updatePhidgets($idx, $rec->attributes, $sourceid);
					break;
				}
			}
			return $rec;
		} else {
			Log::debug("Log: /remote/lib/models/configpicture.php - update() - User not allowed to edit source");	
			return false;
		}		
	}
        
	static function all() {
		Log::debug("Log: /remote/lib/models/configphidget.php - all() function");
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true) {		
			$configObj = new ConfigObj();
			return $configObj->getPhidgets($sourceid);
		}
	}

	public function __construct($params) {
		Log::debug("Log: /remote/lib/models/configphidget.php - __construct() function");
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function to_hash() {
		Log::debug("Log: /remote/lib/models/configphidget.php - to_hash() function");
		return $this->attributes;
	}

}

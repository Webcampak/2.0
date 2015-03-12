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
 * @class Cloudconfigftpserver
 */
class Cloudconfigftpserver { //extends Model {
    public $id, $attributes;	

	static function create($params) {
		Log::debug("Log: /remote/lib/models/cloudconfigftpserver.php - create() function");
		$obj = new self(get_object_vars($params));
		$obj->status = $obj->save();
		return $obj;
	}

	static function find($id) {
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true) {					
			Log::debug("Log: /remote/lib/models/cloudconfigftpserver.php - find() function");
			$configObj = new ConfigObj();
			$found = null;
			foreach ($configObj->getFTPServers($sourceid) as $rec) {
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
			Log::debug("Log: /remote/lib/models/cloudconfigftpserver.php - update() function");
			$configObj = new ConfigObj();
 			$rec = self::find($id);
			if ($rec == null) {return $rec;}
			$rs = $configObj->getFTPServers($sourceid);
			foreach ($rs as $idx => $row) {
				if ($row['id'] == $id) {
					$rec->attributes = array_merge($rec->attributes, get_object_vars($params));
					$rec->status = $configObj->updateFTPServer($idx, $rec->attributes, $sourceid);
					break;
				}
			}
			return $rec;
		}
	}
    
	static function destroy($id) {
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true && $userAuth->isAllowedToEditSource($sourceid) == true) {
			Log::debug("Log: /remote/lib/models/cloudconfigftpserver.php - destroy() function");
			$configObj = new ConfigObj();
			$rec = null;
			$rs = $configObj->getFTPServers($sourceid);
			foreach ($rs as $idx => $row) {
				if ($row['id'] == $id) {
					$rec = new self($configObj->destroyFTPServer($sourceid, $id));
					break;
				}
			}
			return $rec;
		}
	}
    
	static function all() {
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true) {		
			Log::debug("Log: /remote/lib/models/cloudconfigftpserver.php - all() function");
			$configObj = new ConfigObj();
			return $configObj->getFTPServers($sourceid);
		}
	}

	public function __construct($params) {
		Log::debug("Log: /remote/lib/models/cloudconfigftpserver.php - __construct() function");
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function save() {	
		$userAuth = new Authorizations();			
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true && $userAuth->isAllowedToEditSource($sourceid) == true) {
			Log::debug("Log: /remote/lib/models/cloudconfigftpserver.php - save() function");				
			global $dbusers;
			$configObj = new ConfigObj();
			$this->attributes['id'] = $configObj->getFTPServersNextId($sourceid);
			return $configObj->insertFTPServer($this->attributes, $sourceid);
		}
	}

	public function to_hash() {
		Log::debug("Log: /remote/lib/models/cloudconfigftpserver.php - to_hash() function");
		return $this->attributes;
	}

}

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
 * @class Source
 */
class Source { //extends Model {
    public $id, $attributes;	

	static function create($params) {
		Log::debug("Log: /remote/app/models/source.php - create() function");
		$obj = new self(get_object_vars($params));
		$obj->status = $obj->save();
		return $obj;
	}

    static function find($id) {
		Log::debug("Log: /remote/app/models/source.php - find() function");
		$found = null;
		$userAuth = new Authorizations();	
		foreach ($userAuth->userAllowedSources() as $rec) {
			if ($rec['id'] == $id) {
				$found = new self($rec);
				break;
			}
		}
		return $found;
	}

	static function update($id, $params) {
		Log::debug("Log: /remote/app/models/source.php - update() function");
		$rec = self::find($id);
		if ($rec == null) {
			return $rec;
		}
		$userAuth = new Authorizations();				
		$rs = $userAuth->userAllowedSources();
		$dbsources = new SourcesDB(); 		
		foreach ($rs as $idx => $row) {
			if ($row['id'] == $id) {
				$rec->attributes = array_merge($rec->attributes, get_object_vars($params));
				$rec->status = $dbsources->updateSource($idx, $rec->attributes);
				break;
			}
		}
		return $rec;
	}
    
	static function destroy($id) {
		Log::debug("Log: /remote/app/models/source.php - destroy() function");
		$userAuth = new Authorizations();				
		$rs = $userAuth->userAllowedSources();
		$rec = null;
		$dbsources = new SourcesDB(); 
		foreach ($rs as $idx => $row) {
			if ($row['id'] == $id) {
				$rec = new self($dbsources->destroySource($id));
				break;
			}
		}
		return $rec;
	}
    
	static function all() {
		Log::debug("Log: /remote/app/models/source.php - all() function");
		//$dbgeneric = new GenericDB(); 	
		//return $dbgeneric->getSqlRecords("SELECT id, sourceid, name, weight FROM sources ORDER BY weight ASC");		
		$userAuth = new Authorizations();		
		return $userAuth->userAllowedSources();
	}

	public function __construct($params) {
		Log::debug("Log: /remote/app/models/source.php - __construct() function");    	
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function save() {
		Log::debug("Log: /remote/app/models/source.php - save() function");    	
		$dbgeneric = new GenericDB();
		global $dbusers;
		$this->attributes['id'] = $dbgeneric->getNextTableKey("sources");
		$dbsources = new SourcesDB(); 		
		$saveoutput = $dbsources->insertSource($this->attributes);
		
		$attributes['mid'] = $dbusers->getUsersId(strip_tags($_SERVER['PHP_AUTH_USER']), strip_tags($_SERVER['PHP_AUTH_PW']));
		$attributes['username'] = strip_tags($_SERVER['PHP_AUTH_USER']);
		//Add current user to source
		$dbsources->addUserToSource($this->attributes['sourceid'], $attributes['username']);
		//Add root user to source
		$attributes['username'] = "root";
		$dbsources->addUserToSource($this->attributes['sourceid'], $attributes['username']);	
		return $saveoutput;	
	}

	public function to_hash() {
		Log::debug("Log: /remote/app/models/source.php - to_hash() function");    	
		return $this->attributes;
	}

}

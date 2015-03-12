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
 * @class Model
 * Baseclass for Models in this imaginary ORM
 */
class Model {
	public $id, $attributes;
    
	static function create($params) {
		Log::debug("Log: /remote/lib/model.php - create() function");
		$obj = new self(get_object_vars($params));
		$obj->save();
		return $obj;
	}
    static function find($id) {
        error_log("Log: /remote/lib/model.php - find() function", 0);    	    	    	
        global $dbh;
        $found = null;
        foreach ($dbh->getUsers() as $rec) {
            if ($rec['id'] == $id) {
                $found = new self($rec);
                break;
            }
        }
        return $found;
    }
    static function update($id, $params) {
        error_log("Log: /remote/lib/model.php - update() function", 0);    	    	    	
        global $dbh;
        $rec = self::find($id);

        if ($rec == null) {
            return $rec;
        }
        $rs = $dbh->getUsers();

        foreach ($rs as $idx => $row) {
            if ($row['id'] == $id) {
                $rec->attributes = array_merge($rec->attributes, get_object_vars($params));
                $dbh->update($idx, $rec->attributes);
                break;
            }
        }
        return $rec;
    }
    static function destroy($id) {
        error_log("Log: /remote/lib/model.php - destroy() function", 0);    	    	
        global $dbh;
        $rec = null;
        $rs = $dbh->getUsers();
        foreach ($rs as $idx => $row) {
            if ($row['id'] == $id) {
                $rec = new self($dbh->destroy($id));
                break;
            }
        }
        return $rec;
    }
    static function all() {
        error_log("Log: /remote/lib/model.php - all() function", 0);    	
        global $dbh;
        return $dbh->getUsers();
    }

    public function __construct($params) {
        error_log("Log: /remote/lib/model.php - __construct() function", 0);    	    	    	
        $this->id = isset($params['id']) ? $params['id'] : null;
        $this->attributes = $params;
    }
    public function save() {
        error_log("Log: /remote/lib/model.php - save() function", 0);    	    	    	
        global $dbh;
        $this->attributes['id'] = $dbh->pk();
        $dbh->insert($this->attributes);
    }
    public function to_hash() {
        error_log("Log: /remote/lib/model.php - to_hash() function", 0);    	    	    	
        return $this->attributes;
    }
}


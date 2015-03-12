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
 * @class GroupAvailableUser
 */
class GroupAvailableUser {// extends Model {
    public $id, $attributes;	
    
	static function all() {
		Log::debug("Log: /remote/app/models/groupavailableuser.php - all() function");   	
		$dbgeneric = new GenericDB();
		if (isset($_REQUEST["gid"])) {$gid = (int) strip_tags($_REQUEST["gid"]);}   
		if ($gid > 0) {  
			return $dbgeneric->getSqlRecords("SELECT id, username, firstname, lastname FROM users WHERE groups_id != '" . $gid . "' ORDER BY username ASC");
		} else {
			return null;
		}    
	}

}

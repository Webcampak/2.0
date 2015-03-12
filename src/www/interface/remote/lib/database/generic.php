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
 * @class GenericDB
 * Contains all functions related to MySQL database
 */
class GenericDB {
	public function __construct() {
		$_db = new mysqli(CFGMYSQL_HOST, CFGMYSQL_LOGIN , CFGMYSQL_PASSWORD, CFGMYSQL_DATABASE);	
		if ($_db->connect_error) {
			error_log('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error, 0);				 	
			die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);     
		}
		return $_db;        
	}

	public function __destruct() {
		$_db = $this->__construct();
		$_db->close();
		return $this;
	}

	public function getNextTableKey($tablename) {
		Log::debug("Log: /remote/lib/database/generic.php - getNextTableKey(" . $tablename . ") function");		  	    	    	    
		$_db = $this->__construct();
		$_result = $_db->query("SELECT Auto_increment as id FROM information_schema.tables WHERE table_name='" . $tablename . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);		 
		return $results['id'];
	}	 

    public function getSqlRecords($selectstatement) {
		Log::debug("Log: /remote/lib/database/generic.php - sqlGetRecords(" . $selectstatement . ") function");		  	    	    	        	      	
		$_db = $this->__construct();
		$_result = $_db->query($selectstatement) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;    	
    }  


}



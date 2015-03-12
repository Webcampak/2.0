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
 * @class CompaniesDB
 * Contains all functions related to companies and MySQL database
 */
class CompaniesDB {
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

	//Check if user is allowed to access a specific source
	public function getIdFromCompanyName($name) {
		Log::debug("Log: /remote/lib/database/companies.php - getIdFromCompanyName() function");		
		$_db = $this->__construct();
		$_result = $_db->query("SELECT COUNT(id) AS cid, id FROM companies WHERE name='" . $name . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = $_result->fetch_assoc();
		$this->__destruct($_db);
		if ((int) $results['cid'] > 0) {
			return (int) $results['id'];
		} else {
			return false;			
		}
	}
	
	public function updateCompany($idx, $attributes) {       
		Log::debug("Log: /remote/lib/database/companies.php - updateCompany() function");
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE companies SET name=?  WHERE id=?")) {
			$stmt->bind_param('sd', $name, $id);
			$name = $attributes['name'];
			$id = (int) $attributes['id']; //cast id to int
			$stmt->execute();
			$stmt->close();
			Log::activity("updateCompany() - Company name: " . $name . " updated");																			        							        																		        
		}
		return $this;      
	}  

	public function destroyCompany($idx) {
		Log::debug("Log: /remote/lib/database/companies.php - destroyCompany() function");
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM companies WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
			Log::activity("destroyCompany() - Company id: " . $id . " deleted");																			        							        																		        
		}

		$_result = $_db->query("SELECT id, name FROM companies ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;   
	}    

	public function insertCompany($rec) {
		Log::debug("Log: /remote/lib/database/companies.php - insertCompany() function");
		$_db = $this->__construct();
		if($stmt = $_db->prepare("INSERT INTO companies (name) VALUES (?)")) {
			$stmt->bind_param('s', $name);
			$name = $_db->real_escape_string($rec['name']);
			error_log("Insert Rec: " . http_build_query($rec), 0);
			$stmt->execute();
			$stmt->close();
			Log::activity("insertCompany() - Company name: " . $name . " inserted");																			        							        																		        	        
		} 
	}

}



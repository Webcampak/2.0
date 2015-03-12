<?php
 /**
 * @class SessionDB
 * 
 */
class SessionDB {
    public function __construct() {

	    $_db = new mysqli(CFGMYSQL_HOST, CFGMYSQL_LOGIN , CFGMYSQL_PASSWORD, CFGMYSQL_DATABASE);
	
	    if ($_db->connect_error) {
	    		error_log('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error, 0);				 	
	        die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	        
	    }
	
	    return $_db;        
    }

	public function __destruct()
	{
	    $_db = $this->__construct();
	    $_db->close();
	
	    return $this;
	}

    // Get Database private key
    public function pkTable($tablename) {
       error_log("Log: /remote/lib/session_db.php - pkTable(" . $tablename . ") function", 0);    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT Auto_increment as id FROM information_schema.tables WHERE table_name='" . $tablename . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
    }	 
/*    
    // Get Database private key
    public function pkUser() {
       error_log("Log: /remote/lib/session_db.php - pkUser() function", 0);    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT Auto_increment as id FROM information_schema.tables WHERE table_name='users'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
    }

    // Get Database private key
    public function pkCompany() {
       error_log("Log: /remote/lib/session_db.php - pkCompany() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT Auto_increment as id FROM information_schema.tables WHERE table_name='companies'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
    }

    // Get Database private key
    public function pkGroup() {
       error_log("Log: /remote/lib/session_db.php - pkGroup() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT Auto_increment as id FROM information_schema.tables WHERE table_name='groups'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
    }

    // Get Database private key
    public function pkGroupMember() {
       error_log("Log: /remote/lib/session_db.php - pkGroupMember() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT Auto_increment as id FROM information_schema.tables WHERE table_name='users'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
    }

    // Get Database private key
    public function pkSource() {
       error_log("Log: /remote/lib/session_db.php - pkSource() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT Auto_increment as id FROM information_schema.tables WHERE table_name='sources'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
    }
 */   
	public function getGroupID($groupname) {
       error_log("Log: /remote/lib/session_db.php - getGroupID() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT id FROM groups WHERE name='" . $groupname . "'") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = $_result->fetch_assoc();
	    $this->__destruct($_db);		 
    	 return $results['id'];
	}
  
    //Get all users from database, return an array containing those results
    public function getUsers() {      	
       error_log("Log: /remote/lib/session_db.php - getUsers() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT 
	    	u.id AS id, u.username AS username, 
	    	u.password AS password, u.firstname AS firstname, 
	    	u.lastname AS lastname, u.email AS email, 
	    	u.companies_id AS company, u.groups_id AS groupid, 
	    	g.name AS groupname
	    	FROM users AS u
	    	LEFT JOIN groups AS g ON u.groups_id = g.id
	    	ORDER BY u.username ASC") 
	    	or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = array();
	    while ($row = $_result->fetch_assoc()) {
	    	$row['password'] = "xxxxxx";
	    	//$row['company'] = (int) $row['company'];
	    	//error_log("Select Rec: " . http_build_query($row), 0);
	        array_push($results, $row);
	    }	
	    $this->__destruct($_db);    
	    return $results;    	
    }

    public function getCompanies() {      	
       error_log("Log: /remote/lib/session_db.php - getCompanies() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT id, name FROM companies ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = array();
	    while ($row = $_result->fetch_assoc()) {
	    	//error_log("Select Rec: " . http_build_query($row), 0);
	        array_push($results, $row);
	    }	
	    $this->__destruct($_db);    
	    return $results;    	
    }    

    public function getGroups() {      	
       error_log("Log: /remote/lib/session_db.php - getGroups() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT id, name FROM groups ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = array();
	    while ($row = $_result->fetch_assoc()) {
	    	//error_log("Select Rec: " . http_build_query($row), 0);
	        array_push($results, $row);
	    }	
	    $this->__destruct($_db);    
	    return $results;    	
    }    



    public function getSources() {      	
       error_log("Log: /remote/lib/session_db.php - getSources() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    $_result = $_db->query("SELECT id, sourceid, name, weight FROM sources ORDER BY weight ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = array();
	    while ($row = $_result->fetch_assoc()) {
	    	//error_log("Select Rec: " . http_build_query($row), 0);
	        array_push($results, $row);
	    }	
	    $this->__destruct($_db);    
	    return $results;    	
    }    

	public function getAdvConfigObjs() {      	
		error_log("Log: /remote/lib/session_db.php - getAdvConfigObjs() function", 0);    	    	
		//$_db = $this->__construct();
		$configobj = new ConfigObj();
		$wpakallsettings = $configobj->getConfigFromFile();
		foreach($wpakallsettings as $keyfile=>$valuefile) {
			//error_log("----------------------------------------------------------------------------------------", 0);   			
			//error_log("Log: /remote/lib/session_db.php - getAdvConfigObjs() function: File: " . $keyfile , 0);
			foreach($valuefile as $valueobj) {
				//error_log("Log: /remote/lib/session_db.php - getAdvConfigObjs() function: key: " . $valueobj['key'] . "-----" . $valueobj['description'] , 0);
				$results = 0;
				$insertdb = false;
				$_db = $this->__construct();
				$_result = $_db->query("SELECT id FROM settings WHERE cfgkey='" . $valueobj['key'] . "' AND file='" . $keyfile . "'");// or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
				if ($_result === false) {
					$insertdb = true;
				} else {
					$results = $_result->num_rows;
					if ($results == 0) {
						$insertdb = true;
					}
				}
				if ($insertdb == true && substr($valueobj['key'], 0, 3) == "cfg") {//substr('abcdef', 0, 3);   
					if($stmt = $_db->prepare("INSERT INTO settings (cfgkey, description, file) VALUES (?, ?, ?)")) {
						$stmt->bind_param('sss', $insertkey, $insertdescription, $insertfile);
						$insertkey = $_db->real_escape_string($valueobj['key']);
						$insertdescription = $_db->real_escape_string(substr($valueobj['description'], 0, 250));
						$insertfile = $_db->real_escape_string($keyfile);
						$stmt->execute();
						$stmt->close();

	  			  } 
				}
				$this->__destruct($_db);
			}    	
		}
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, cfgkey, description, file FROM settings ORDER BY cfgkey ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			//error_log("Select Rec: " . http_build_query($row), 0);
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;    	
	}    


    
    public function insertUser($rec) {
       error_log("Log: /remote/lib/session_db.php - insertUser() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO users (username, password, firstname, lastname, email, companies_id, groups_id) VALUES (?, SHA1(?), ?, ?, ?, ?, ?)")) {
	        $stmt->bind_param('sssssdd', $username, $password, $firstname, $lastname, $email, $company, $groupid);
	
	        $username = $_db->real_escape_string($rec['username']);
	        $password = $_db->real_escape_string($rec['password']);
	        $firstname = $_db->real_escape_string($rec['firstname']);
	        $lastname = $_db->real_escape_string($rec['lastname']);
	        $email = $_db->real_escape_string($rec['email']);
	        $company = (int) $_db->real_escape_string($rec['company']);
	        //$groupid = (int) $_db->real_escape_string($rec['groupid']);
	        $groupid = (int) $this->getGroupID($rec['groupname']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }
    public function insertCompany($rec) {
       error_log("Log: /remote/lib/session_db.php - insertCompany() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO companies (name) VALUES (?)")) {
	        $stmt->bind_param('s', $name);
	
	        $name = $_db->real_escape_string($rec['name']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }

    public function insertGroup($rec) {
       error_log("Log: /remote/lib/session_db.php - insertGroup() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO groups (name) VALUES (?)")) {
	        $stmt->bind_param('s', $name);
	
	        $name = $_db->real_escape_string($rec['name']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }

    public function insertSource($rec) {
       error_log("Log: /remote/lib/session_db.php - insertSource() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if($stmt = $_db->prepare("INSERT INTO sources (sourceid, name, weight) VALUES (?, ?, ?)")) {
	        $stmt->bind_param('dsd', $name);
	        $name = $_db->real_escape_string($rec['name']);
	        $sourceid = (int) $_db->real_escape_string($rec['sourceid']);	        	
	        $weight = (int) $_db->real_escape_string($rec['weight']);
		 	  error_log("Insert Rec: " . http_build_query($rec), 0);
	        $stmt->execute();
	        $stmt->close();
	    } 
    }
    
    public function updateUser($idx, $attributes) {       
       //error_log("Log: /remote/lib/session_db.php - updateUser() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateUser() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 39) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE users SET username=?, firstname=?, lastname=?, email=?, companies_id=?, groups_id=? WHERE id=?")) {
	        $stmt->bind_param('ssssddd', $username, $firstname, $lastname, $email, $company, $groupid, $id);
	
	        $username = $attributes['username'];
	        $firstname = $attributes['firstname'];
	        $lastname = $attributes['lastname'];
	        $email = $attributes['email'];
	        $company = (int) $attributes['company'];
	        $groupid = (int) $this->getGroupID($attributes['groupname']);
	        $id = (int) $attributes['id']; 	        //cast id to int
	
	        $stmt->execute();
	
	        $stmt->close();
	    }
	    if ($attributes['password'] != "xxxxxx") {
		    if ($stmt = $_db->prepare("UPDATE users SET password=SHA1(?) WHERE id=?")) {
		        $stmt->bind_param('sd', $password, $id);
		        $password = $attributes['password'];
		        $id = (int) $attributes['id'];
		        $stmt->execute();
		
		        $stmt->close();
		    }	    
	    }
	   }
	
	    return $this;      
    }
    
    public function updateCompany($idx, $attributes) {       
       //error_log("Log: /remote/lib/session_db.php - updateCompany() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateCompany() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE companies SET name=?  WHERE id=?")) {
	        $stmt->bind_param('sd', $name, $id);
	
	        $name = $attributes['name'];
	        $id = (int) $attributes['id']; //cast id to int
	
	        $stmt->execute();
	
	        $stmt->close();
	    }
	   }
	    return $this;      
    }    

    public function updateGroup($idx, $attributes) {       
       //error_log("Log: /remote/lib/session_db.php - updateGroup() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateGroup() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE groups SET name=?  WHERE id=?")) {
	        $stmt->bind_param('sd', $name, $id);
	
	        $name = $attributes['name'];
	        $id = (int) $attributes['id']; //cast id to int
	
	        $stmt->execute();
	
	        $stmt->close();
	    }
	   }
	    return $this;      
    }    

    public function updateSource($idx, $attributes) {       
       //error_log("Log: /remote/lib/session_db.php - updateGroup() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateSource() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE sources SET name=?, sourceid=?, weight=?  WHERE id=?")) {
	        $stmt->bind_param('sddd', $name, $sourceid, $weight, $id);
	
	        $name = $attributes['name'];
	        $id = (int) $attributes['id']; //cast id to int	   
	        $sourceid = (int) $attributes['sourceid']; //cast id to int	             
	        $weight = (int) $attributes['weight']; //cast id to int
	
	        $stmt->execute();
	
	        $stmt->close();
	    }
	   }
	    return $this;      
    }    
   
    public function updateAdvConfigObj($idx, $attributes) {       
       error_log("Log: /remote/lib/session_db.php - updateAdvConfigObj() function", 0); 
       error_log("Log: /remote/lib/session_db.php - updateAdvConfigObj() : id:" . $attributes['id'], 0);    	    	    	    	    	          	    	    	    	    	
	   if ($attributes['id'] > 9) {
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE settings SET description=?  WHERE id=?")) {
	        $stmt->bind_param('sd', $name, $id);
	
	        $description = $attributes['description'];
	        $id = (int) $attributes['id']; //cast id to int
	
	        $stmt->execute();
	
	        $stmt->close();
	    }
	   }
	    return $this;      
    }       
    
    
    public function destroyUser($idx) {
        error_log("Log: /remote/lib/session_db.php - destroyUser() function", 0); 
        //return array_shift(array_splice($_SESSION['rs'], $idx, 1));
	    $_db = $this->__construct();
	   if ((int) $idx > 39) {
	    if ($stmt = $_db->prepare("DELETE FROM users WHERE id=?")) {
	        $stmt->bind_param('d', $id);
	        $id = (int) $idx;
	        if ($id >= 2) { // Root as id #1 and we do not allow deletion of root user
	        		$stmt->execute();
			  }
	        $stmt->close();
	    }
	   }
	
	    $_result = $_db->query("SELECT id, username, password, firstname, lastname, email FROM users ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    $results = array();
	    while ($row = $_result->fetch_assoc()) {
	    	$row['password'] = "xxxxxx";
	      array_push($results, $row);
	    }	
	    $this->__destruct($_db);    
	    return $results; 

        
    }
    
	public function destroyCompany($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyCompany() function", 0);    	    	    	    	    	    	
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM companies WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}
	
		$_result = $_db->query("SELECT id, name FROM companies ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;     
	}    

	public function destroyGroup($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyGroup() function", 0);    	    	    	    	    	    	
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM groups WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}
	
		$_result = $_db->query("SELECT id, name FROM groups ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;     
	}  

	//
	// getGroupsMembers() : Returns a list of users currently in the selected group
	// $_REQUEST["gid"] is set in the appropriate sencha store	
	//
	public function getGroupsMembers() {      	
		error_log("Log: /remote/lib/session_db.php - getGroupsMembers() function", 0);    
		$results = array();
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}   
		if ($gid > 0) {   		    	    	    	    	    	
			$_db = $this->__construct();
			$_result = $_db->query("SELECT id, username, firstname, lastname FROM users WHERE groups_id = '" . $gid . "' ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			while ($row = $_result->fetch_assoc()) {
				//error_log("getGroupsMembers - Select Rec: " . http_build_query($row), 0);
				array_push($results, $row);
			}	
			$this->__destruct($_db);
		}    
		return $results;    	
	}    

/*
    public function insertGroupMember($rec) {
       error_log("Log: /remote/lib/session_db.php - insertGroupMember() function", 0);    	    	    	    	    	
	    $_db = $this->__construct();
	    if ($stmt = $_db->prepare("UPDATE users SET groups_id=? WHERE id=?")) {
	        $stmt->bind_param('dd', $groupid, $id);
	        $groupid = 3; //(int) $this->getGroupID($attributes['groupname']);
	        $id = (int) $attributes['id']; 	        //cast id to int
	        $stmt->execute();
	        $stmt->close();
	    } 
    }
*/
	//
	// destroyGroupMember() : Remove a user from the selected group and set his group id to 0 (no group) 
	// Returns updated list of group members
	// $_REQUEST["gid"] is set in the appropriate sencha store	
	//
	public function destroyGroupMember($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyGroupMember() function", 0);   
		$results = array();
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}   
		if ($gid > 0) {  		 	    	    	    	    	    	
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("UPDATE users SET groups_id=? WHERE id=?")) {
				$stmt->bind_param('dd', $gid, $id);
				$id = (int) $idx;
				$stmt->execute();
				$stmt->close();
			} 
	
			$_result = $_db->query("SELECT id, username, firstname, lastname FROM users WHERE groups_id = '" . $gid . "' ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$results = array();
			while ($row = $_result->fetch_assoc()) {
				//error_log("Select Rec: " . http_build_query($row), 0);
				array_push($results, $row);
			}	
		$this->__destruct($_db);    
		}
		return $results;   
	}  


	//
	// getGroupAvailableUsers() : Returns a list of users currently not in the selected group
	// $_REQUEST["gid"] is set in the appropriate sencha store	
	//
	public function getGroupAvailableUsers() {    
		error_log("Log: /remote/lib/session_db.php - getGroupAvailableUsers() function", 0);
		$results = array();
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}
		error_log("Log: /remote/lib/session_db.php - getGroupAvailableUsers() GID: " . $gid, 0);		
		if ($gid > 0) {        
			$_db = $this->__construct();
			$_result = $_db->query("SELECT id, username, firstname, lastname FROM users WHERE groups_id != '" . $gid . "' ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			while ($row = $_result->fetch_assoc()) {
				//error_log("getGroupsMembers - Select Rec: " . http_build_query($row), 0);
				array_push($results, $row);
			}	
		$this->__destruct($_db);  
		}  
		return $results; 	
	} 
	
	//
	// destroyGroupAvailableUser() : Remove a user from its current group by updating record with selected group id
	// returns updated list of users currently not in the selected group
	// $_REQUEST["gid"] is set in the appropriate sencha store
	//
	public function destroyGroupAvailableUser($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyGroupAvailableUser() function", 0);  
		$results = array();  
		if (isset($_REQUEST["gid"])) {
			$gid = (int) strip_tags($_REQUEST["gid"]);
		}
		if ($gid > 0) {  			    	    	    	    	
			$_db = $this->__construct();    
			if ($stmt = $_db->prepare("UPDATE users SET groups_id=? WHERE id=?")) {
				$stmt->bind_param('dd', $gid, $id);
				$id = (int) $idx;	//cast id to int
				$stmt->execute();
				$stmt->close();
			} 
			$_result = $_db->query("SELECT id, username, firstname, lastname FROM users WHERE groups_id != '" . $gid . "' ORDER BY username ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			while ($row = $_result->fetch_assoc()) {
				//error_log("Select Rec: " . http_build_query($row), 0);
				array_push($results, $row);
			}	
			$this->__destruct($_db);
		} 
		return $results;   
	} 

	public function destroySource($idx) {
		error_log("Log: /remote/lib/session_db.php - destroySource() function", 0);    	    	    	    	    	    	
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM sources WHERE id=?")) {
			$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}
	
		$_result = $_db->query("SELECT id, sourceid, name, weight FROM sources ORDER BY name ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;     
	}  
	
	public function destroyAdvConfigObjs($idx) {
		error_log("Log: /remote/lib/session_db.php - destroyAdvConfigObjs() function", 0);    	    	    	    	    	    	
		$_db = $this->__construct();    
		if ($stmt = $_db->prepare("DELETE FROM settings WHERE id!=''")) {
			//$stmt->bind_param('d', $id);
			$id = (int) $idx;
			$stmt->execute();
			$stmt->close();
		}
	
		$_db = $this->__construct();
		$_result = $_db->query("SELECT id, cfgkey, description, file FROM settings ORDER BY cfgkey ASC") or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		$results = array();
		while ($row = $_result->fetch_assoc()) {
			error_log("Select Rec: " . http_build_query($row), 0);
			array_push($results, $row);
		}	
		$this->__destruct($_db);    
		return $results;   
	}  	
	
}



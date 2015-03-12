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
 * @class Authorizations
 * Contains all functions related to what users are allowed to do or see
 */
class Authorizations {	

	// Check if currently connected user is allowed to get content from the source
	public function isAllowedToAccessSource($sourceid) {
		Log::debug("Log: /remote/lib/authorization/authorizations.php - isAllowedToAccessSource() function");			
		//Log::debug("Log: /remote/lib/authorization/authorizations.php - isAllowedToAccessSource() - SERVER: PHP_AUTH_USER: " . $_SERVER['PHP_AUTH_USER'] . " - PHP_AUTH_PW: " . $_SERVER['PHP_AUTH_PW'] . " - REMOTE USER: " . $_SERVER['REMOTE_USER']);		
		if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
			global $dbusers;
			$userid = $dbusers->getUsersId(strip_tags($_SERVER['PHP_AUTH_USER']), strip_tags($_SERVER['PHP_AUTH_PW']));
//			error_log("Log: /remote/lib/authorization/authorizations.php - isAllowedToAccessSource() - UserID: " . $userid, 0);		
			if ($userid > 1) {
				return $dbusers->isUsersSourceAllowed(strip_tags($_SERVER['PHP_AUTH_USER']), $sourceid);
			}
			elseif ($userid == 1) { // If userid == 1, means root is connected, by default root has access to everything
				return true;
			} else {	//If userid is not set, return false
				return false;
			}
		} else {
			return false;	
		}
	}

	// Check if currently connected user is allowed to access the page
	public function isAllowedToAccessPage($pagename) {
		Log::debug("Log: /remote/lib/authorization/authorizations.php - isAllowedToAccessPage() function");    				
		if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
			global $dbusers;
			$userid = $dbusers->getUsersId(strip_tags($_SERVER['PHP_AUTH_USER']), strip_tags($_SERVER['PHP_AUTH_PW']));
//			Log::debug("Log: /remote/lib/authorization/authorizations.php - isAllowedToAccessPage() - UserID: " . $userid);		
			if ($userid > 1) {
				return $dbusers->isUsersPageAllowed($userid, $pagename);
			}
			elseif ($userid == 1) { // If userid == 1, means root is connected, by default root has access to everything
				return true;
			} else {	//If userid is not set, return false
				return false;
			}
		} else {
			return false;	
		}
	}

	// Check if currently connected user is allowed to get content from the source
	public function isAllowedToEditSource($sourceid) {
		Log::debug("Log: /remote/lib/authorization/authorizations.php - isAllowedToEditSource() function");			
		if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
			global $dbusers;
			$userid = $dbusers->getUsersId(strip_tags($_SERVER['PHP_AUTH_USER']), strip_tags($_SERVER['PHP_AUTH_PW']));
//			error_log("Log: /remote/lib/authorization/authorizations.php - isAllowedToAccessSource() - UserID: " . $userid, 0);		
			if ($userid > 1) {
				return $dbusers->isUsersSourceAllowedToEditSource(strip_tags($_SERVER['PHP_AUTH_USER']), $sourceid);
			}
			elseif ($userid == 1) { // If userid == 1, means root is connected, by default root has access to everything
				return true;
			} else {	//If userid is not set, return false
				return false;
			}
		} else {
			return false;	
		}
	}
	
	public function getAllowedPages() {	
		if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
			global $dbusers;
			$userid = $dbusers->getUsersId(strip_tags($_SERVER['PHP_AUTH_USER']), strip_tags($_SERVER['PHP_AUTH_PW']));	
			if ($userid > 0) {
				return $dbusers->getAllowedPagesForUser($userid); 
			} else {
				return false;	
			}
		}
	}

	//Get a list of sources user is allowed to access 
	public function userAllowedSources() {
		Log::debug("Log: /remote/lib/authorization/authorizations.php - userAllowedSources() function");    						
		if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
			global $dbusers;
			$userid = $dbusers->getUsersId(strip_tags($_SERVER['PHP_AUTH_USER']), strip_tags($_SERVER['PHP_AUTH_PW']));
			Log::debug("Log: /remote/lib/authorization/authorizations.php - isAllowedToAccessSource() - UserID: " . $userid . " - Username: " . strip_tags($_SERVER['PHP_AUTH_USER']));		
			if ($userid >= 1) {
				return $dbusers->getUsersSources(strip_tags($_SERVER['PHP_AUTH_USER']));
			} else {	//If userid is not set, return false
				return false;
			}
		} else {
			return false;	
		}
	}


}



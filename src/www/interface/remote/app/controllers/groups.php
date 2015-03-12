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
 * @class Groups
 * A simple application controller extension
 */
class Groups extends ApplicationController {
    /**
     * view
     * Retrieves rows from database.
     */
	public function view() {
		Log::debug("Log: /remote/app/controllers/groups.php - view() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.permissions") == true) {
			$res = new Response();
			$res->success = true;
			$res->message = "Loaded data";
			$res->data = Group::all();
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/groups.php - view() - User not allowed to access 'permissions-groups' page");			
		}
	}
    /**
     * create
     */
	public function create() {
		Log::debug("Log: /remote/lib/controllers/groups.php - create() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.permissions") == true) {		
			$res = new Response();
			$rec = Group::create($this->params);
			if ($rec) {
				$res->success = true;
				$res->message = "Created new Group" . $rec->id;
				$res->data = $rec->to_hash();
			} else {
				$res->message = "Failed to create Group";
			}
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/groups.php - create() - User not allowed to access 'permissions-groups' page");			
		}        
	}
    /**
     * update
     */
	public function update() {
		Log::debug("Log: /remote/lib/controllers/groups.php - update() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.permissions") == true) {		    	
			$res = new Response();
			$rec = Group::update($this->id, $this->params);
			if ($rec) {
				$res->data = $rec->to_hash();
				$res->success = true;
				$res->message = 'Updated Group ' . $this->id;
			} else {
				$res->message = "Failed to find that Group";
			}
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/groups.php - update() - User not allowed to access 'permissions-groups' page");			
		}  			
	}
    /**
     * destroy
     */
    public function destroy() {
		Log::debug("Log: /remote/lib/controllers/groups.php - destroy() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.permissions") == true) {	    	
			$res = new Response();
			if (Group::destroy($this->id)) {
				$res->success = true;
				$res->message = 'Destroyed Group ' . $this->id;
			} else {
				$res->message = "Failed to destroy Group";
			}
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/groups.php - destroy() - User not allowed to access 'permissions-groups' page");			
		}          
	}
}


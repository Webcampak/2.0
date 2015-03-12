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
 * @class Groupavailableusers
 * A simple application controller extension
 */
class Groupavailableusers extends ApplicationController {
    /**
     * view
     * Retrieves rows from database.
     */
	public function view() {
		Log::debug("Log: /remote/app/controllers/groupavailableusers.php - view() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.permissions") == true) {
			$res = new Response();
			$res->success = true;
			$res->message = "Loaded data";
			$res->data = GroupAvailableUser::all();
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/groups.php - view() - User not allowed to access 'permissions-groups' page");			
		}          
	}
    /**
     * create
     */
	public function create() {
		Log::debug("Log: /remote/app/controller/groupavailableusers.php - create() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("disabled") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support POST method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/groupavailableusers.php - create() - User not allowed to access 'permissions-groups' page");			
		}
	}
    /**
     * update
     */
	public function update() {
		Log::debug("Log: /remote/app/controller/groupavailableusers.php - update() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("disabled") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support PUT method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/groupavailableusers.php - update() - User not allowed to access 'permissions-groups' page");			
		}
	}
    /**
     * destroy
     */
	public function destroy() {
		Log::debug("Log: /remote/app/controller/groupavailableusers.php - destroy() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("disabled") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support DELETE method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/groupavailableusers.php - destroy() - User not allowed to access 'permissions-groups' page");			
		}
	}
}


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
 * @class Cloudusers
 * A simple application controller extension
 */
class Cloudusers extends ApplicationController {
    /**
     * view
     * Retrieves rows from database.
     */
	public function view() {
		Log::debug("Log: /remote/app/controllers/cloudusers.php - view() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.cloud") == true) {
			$res = new Response();
			$res->success = true;
			$res->message = "Loaded data";
			$res->data = Clouduser::all();
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/cloudusers.php - view() - Clouduser not allowed to access 'permissions-users' page");			
		}
	}
    /**
     * create
     */
	public function create() {
		Log::debug("Log: /remote/lib/controllers/cloudusers.php - create() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.cloud") == true) {
			$res = new Response();
			$rec = Clouduser::create($this->params);
			if ($rec) {
				if ($rec->status['success'] == 1) {
					$res->data = $rec->to_hash();
					$res->success = true;
					$res->message = $rec->status['message'];
				} else {
					$res->data = $rec->to_hash();					
					$res->success = false;
					$res->message = $rec->status['message'];
				}				
			} else {
				$res->message = "Failed to create Clouduser";
			}
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/cloudusers.php - create() - Clouduser not allowed to access 'permissions-users' page");			
		}		
	}
    /**
     * update
     */
	public function update() {
		Log::debug("Log: /remote/lib/controllers/cloudusers.php - update() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.cloud") == true) {
			$res = new Response();
			$rec = Clouduser::update($this->id, $this->params);
			if ($rec) {
				if ($rec->status['success'] == 1) {
					$res->data = $rec->to_hash();
					$res->success = true;
					$res->message = $rec->status['message'];
				} else {
					$res->data = $rec->to_hash();					
					$res->success = false;
					$res->message = $rec->status['message'];
				}				
			} else {
				$res->message = "Failed to find that Clouduser";
			}
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/cloudusers.php - update() - Clouduser not allowed to access 'permissions-users' page");			
		}
	}
    /**
     * destroy
     */
	public function destroy() {
		Log::debug("Log: /remote/lib/controllers/cloudusers.php - destroy() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.admin.cloud") == true) {
			$res = new Response();
			if (Clouduser::destroy($this->id)) {
				$res->success = true;
				$res->message = 'Destroyed Clouduser ' . $this->id;
			} else {
				$res->message = "Failed to destroy Clouduser";
			}
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/cloudusers.php - destroy() - Clouduser not allowed to access 'permissions-users' page");			
		}
	}
}


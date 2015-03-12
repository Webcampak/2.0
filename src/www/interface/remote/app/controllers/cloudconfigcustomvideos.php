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
 * @class Cloudconfigcustomvideos
 * A simple application controller extension
 */
class Cloudconfigcustomvideos extends ApplicationController {
    /**
     * view
     * Retrieves rows from database.
     */
	public function view() {
		Log::debug("Log: /remote/app/controllers/cloudconfigcustomvideos.php - view() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.cloud.read") == true) {
			$res = new Response();
			$res->success = true;
			$res->message = "Loaded data";
			$res->data = Cloudconfigcustomvideo::all();
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/cloudconfigcustomvideos.php - view() - User not allowed to access 'configuration' page");			
		}
	}
    /**
     * create
     */
	public function create() {
		Log::debug("Log: /remote/lib/controllers/cloudconfigcustomvideos.php - create() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.cloud.write") == true) {
			$res = new Response();
			$rec = Cloudconfigcustomvideo::update($this->params); 
			if ($rec) {
				if ($rec->status['success'] == 1) {
					$res->success = true;
					$res->message = $rec->status['message'];
				} else {
					$res->success = false;
					$res->message = $rec->status['message'];
				}				
			} else {
				$res->message = "Failed to save configuration";
			}
			return $res->to_json();				
		} else {
			Log::debug("Log: /remote/lib/controllers/cloudconfigcustomvideos.php - create() - User not allowed to access 'configuration' page");			
		}		
	}
    /**
     * update
     */
	public function update() {
		Log::debug("Log: /remote/lib/controllers/cloudconfigcustomvideos.php - update() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("disabled") == true) {
			$res->message = "This REST request currently do not support PUT method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/cloudconfigcustomvideos.php - update() - User not allowed to access 'configuration' page");			
		}
	}
    /**
     * destroy
     */
	public function destroy() {
		Log::debug("Log: /remote/lib/controllers/cloudconfigcustomvideos.php - destroy() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("disabled") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support DELETE method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/cloudconfigcustomvideos.php - destroy() - User not allowed to access 'configuration' page");			
		}
	}
}


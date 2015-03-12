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
 * @class Loglogfiles
 * A simple application controller extension
 */
class Loglogfiles extends ApplicationController {
    /**
     * view
     * Retrieves rows from database.
     */
	public function view() {
		Log::debug("Log: /remote/app/controllers/loglogfiles.php - view() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.config.logs") == true) {
			$res = new Response();
			$res->success = true;
			$res->message = "Loaded data";
			$res->data = Loglogfile::all();
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/loglogfiles.php - view() - User not allowed to access 'loglogfiles' page");			
		}
	}
    /**
     * create
     */
	public function create() {
		Log::debug("Log: /remote/lib/controllers/loglogfiles.php - create() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("disabled") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support POST method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/loglogfiles.php - create() - User not allowed to access 'loglogfiles' page");			
		}		
	}
    /**
     * update
     */
	public function update() {
		Log::debug("Log: /remote/lib/controllers/loglogfiles.php - update() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("disabled") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support PUT method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/loglogfiles.php - update() - User not allowed to access 'loglogfiles' page");			
		}
	}
    /**
     * destroy
     */
	public function destroy() {
		Log::debug("Log: /remote/lib/controllers/loglogfiles.php - destroy() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("disabled") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support DELETE method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/loglogfiles.php - destroy() - User not allowed to access 'loglogfiles' page");			
		}
	}
}


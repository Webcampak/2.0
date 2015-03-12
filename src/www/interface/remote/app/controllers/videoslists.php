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
 * @class Videoslists
 * A simple application controller extension
 */
class Videoslists extends ApplicationController {
    /**
     * view
     * Retrieves rows from database.
     */
	public function view() {
		Log::debug("Log: /remote/app/controller/videoslists.php - view() function");	
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.view.videos") == true) {
			$res = new Response();
			$res->success = true;
			$res->message = "Loaded data";
			$res->data = Videoslist::all();
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/videoslists.php - view() - User not allowed to access 'videos' page");			
		}
	}
    /**
     * create
     */
	public function create() {
		Log::debug("Log: /remote/app/controller/videoslists.php - create() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("videos") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support POST method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/videoslists.php - create() - User not allowed to access 'videos' page");			
		}
	}
    /**
     * update
     */
	public function update() {
		Log::debug("Log: /remote/app/controller/videoslists.php - update() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("videos") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support PUT method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/videoslists.php - update() - User not allowed to access 'videos' page");			
		}
	}
    /**
     * destroy
     */
	public function destroy() {
		Log::debug("Log: /remote/app/controller/videoslists.php - destroy() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("videos") == true) {
			$res = new Response();
			$res->message = "This REST request currently do not support DELETE method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/videoslists.php - update() - User not allowed to access 'videos' page");			
		}
	}
}


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
 * @class Picturesviews
 * Return a JSON object containing all elements necessary to display pictures
 */
class Picturesviews extends ApplicationController {
    /**
     * view
     */
	public function view() {
		Log::debug("Log: /remote/app/controller/picturesviews.php - view() function");
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("auth.view.pictures") == true) {		
			$res = new Response();
			$res->success = true;
			$res->message = "Loaded data";
			$res->data = Picturesview::all();
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/picturesviews.php - view() - User not allowed to access 'pictures' page");			
		}
	}
    /**
     * create
     */
	public function create() {
		Log::debug("Log: /remote/app/controller/picturesviews.php - create() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("pictures") == true) {		
			$res = new Response();
			$res->message = "This REST request currently do not support POST method";
			//
			$res->success = true;
			$res->data = Picturesview::all();
			//		
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/picturesviews.php - create() - User not allowed to access 'pictures' page");			
		}
	}
    /**
     * update
     */
	public function update() {
		Log::debug("Log: /remote/app/controller/picturesviews.php - update() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("pictures") == true) {		
			$res = new Response();
			$res->message = "This REST request currently do not support PUT method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/picturesviews.php - update() - User not allowed to access 'pictures' page");			
		}
	}
    /**
     * destroy
     */
	public function destroy() {
		Log::debug("Log: /remote/app/controller/picturesviews.php - destroy() function");			
		$userAuth = new Authorizations();
		if ($userAuth->isAllowedToAccessPage("pictures") == true) {	
			$res = new Response();
			$res->message = "This REST request currently do not support DELETE method";
			return $res->to_json();
		} else {
			Log::debug("Log: /remote/lib/controllers/picturesviews.php - destroy() - User not allowed to access 'pictures' page");			
		}
	}
}


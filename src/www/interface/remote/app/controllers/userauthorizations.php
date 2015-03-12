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
 * @class Userauthorizations
 * Return a JSON object containing all elements necessary to display pictures
 */
class Userauthorizations extends ApplicationController {
    /**
     * view
     */
	public function view() {
		Log::debug("Log: /remote/app/controller/authrizations.php - view() function");
		$res = new Response();
		$res->success = true;
		$res->message = "Loaded data";
		$res->data = Userauthorization::all();
		return $res->to_json();
	}
    /**
     * create
     */
	public function create() {
		Log::debug("Log: /remote/app/controller/authrizations.php - create() function");			
		$res = new Response();
		$res->message = "This REST request currently do not support POST method";	
		return $res->to_json();
	}
    /**
     * update
     */
	public function update() {
		Log::debug("Log: /remote/app/controller/authrizations.php - update() function");				
		$res = new Response();
		$res->message = "This REST request currently do not support PUT method";
		return $res->to_json();
	}
    /**
     * destroy
     */
	public function destroy() {
		Log::debug("Log: /remote/app/controller/authrizations.php - destroy() function");			
		$res = new Response();
		$res->message = "This REST request currently do not support DELETE method";
		return $res->to_json();
	}
}


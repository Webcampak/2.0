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
 * @class Response
 * A simple JSON Response class.
 */
class Response {
	public $success, $data, $message, $errors, $tid, $trace;

	public function __construct($params = array()) {
		Log::debug("Log: /remote/lib/response.php - __construct()");    	    	    	    	    	
		$this->success  = isset($params["success"]) ? $params["success"] : false;
		$this->message  = isset($params["message"]) ? $params["message"] : '';
		$this->data     = isset($params["data"])    ? $params["data"]    : array();
	}

	public function to_json() {
		Log::debug("Log: /remote/lib/response.php - to_json()"); 
		Log::debug("END -------------------------------------------------------------------------------------------------------");			   	    	    	    	    			
		return json_encode(array(
			'success'   => $this->success,
			'message'   => $this->message,
			'data'      => $this->data
		));
	}
}



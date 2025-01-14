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
 * @class Request
 */
class Request {
    public $restful, $method, $controller, $action, $id, $params;

	public function __construct($params) {
		Log::debug("Log: /remote/lib/request.php - __construct()");
		$this->restful = (isset($params["restful"])) ? $params["restful"] : false;
		$this->method = $_SERVER["REQUEST_METHOD"];
		$this->parseRequest();    	      
	}
	public function isRestful() {
		Log::debug("Log: /remote/lib/request.php - __isRestful()");
		return $this->restful;
	}
	protected function parseRequest() {
		Log::debug("Log: /remote/lib/request.php - __parseRequest()");
		if ($this->method == 'PUT') {   // <-- Have to jump through hoops to get PUT data
			$raw  = '';
			$httpContent = fopen('php://input', 'r');
			while ($kb = fread($httpContent, 1024)) {
				$raw .= $kb;
			}
			fclose($httpContent);
			$params = array();
			parse_str($raw, $params);

			if (isset($params['data'])) {
				$this->params =  json_decode(stripslashes($params['data']));
			} else {
				$params = json_decode(stripslashes($raw));
				$this->params = $params;
			}
		} else {
			// grab JSON data if there...

			$this->params = (isset($_REQUEST['data'])) ? json_decode(stripslashes($_REQUEST['data'])) : null;

			if (isset($_REQUEST['data'])) {
				$this->params =  json_decode(stripslashes($_REQUEST['data']));
			} else {
				$raw  = '';
				$httpContent = fopen('php://input', 'r');
				while ($kb = fread($httpContent, 1024)) {
					$raw .= $kb;
				}
				//$params = json_decode(stripslashes($raw));
				$params = json_decode($raw);				
				if ($params) {
					$this->params = $params;
				}
			}
		}
		// Quickndirty PATH_INFO parser
		if (isset($_SERVER["PATH_INFO"])){
			$cai = '/^\/([a-z]+\w)\/([a-z]+\w)\/([0-9]+)$/';  // /controller/action/id
			$ca =  '/^\/([a-z]+\w)\/([a-z]+)$/';              // /controller/action
			$ci = '/^\/([a-z]+\w)\/([0-9]+)$/';               // /controller/id
			$c =  '/^\/([a-z]+\w)$/';                         // /controller
			$i =  '/^\/([0-9]+)$/';                           // /id
			$matches = array();
			if (preg_match($cai, $_SERVER["PATH_INFO"], $matches)) {
				$this->controller = $matches[1];
				$this->action = $matches[2];
				$this->id = $matches[3];
			} else if (preg_match($ca, $_SERVER["PATH_INFO"], $matches)) {
				$this->controller = $matches[1];
				$this->action = $matches[2];
			} else if (preg_match($ci, $_SERVER["PATH_INFO"], $matches)) {
				$this->controller = $matches[1];
				$this->id = $matches[2];
			} else if (preg_match($c, $_SERVER["PATH_INFO"], $matches)) {
				$this->controller = $matches[1];
			} else if (preg_match($i, $_SERVER["PATH_INFO"], $matches)) {
				$this->id = $matches[1];
			} 
		}
	}
}


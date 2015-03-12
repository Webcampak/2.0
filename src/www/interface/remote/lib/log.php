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
 * @class Log
 * Contains all functions related to display debug messages
 */
class Log {	

	//Send a messge to Apache error log
	public function debug($debugmessage) {
		if (CFGLOG_DEBUGENABLE == "yes") {
			date_default_timezone_set(CFGSYS_TIMEZONE);
			$controllerlog = "";
			if (isset($_SERVER["PATH_INFO"])) {$controllerlog = $_SERVER["PATH_INFO"] . " - ";}
			if (isset($_SERVER['PHP_AUTH_USER'])) {$controllerlog = $controllerlog . "(" . $_SERVER['PHP_AUTH_USER'] . ") - ";}
			//error_log($controllerlog . "Debug: " . $debugmessage, 0);  
			$logline = date(DATE_RFC822) . " - " . $controllerlog . "Debug: " . $debugmessage . "\n";
			file_put_contents(CFGDIR_LOGDIR . "interface/debug-" . date("Y-m-d") . ".log", $logline, FILE_APPEND | LOCK_EX);				  		
		}
	}
	
	//Send a messge to Apache error log, generated when accessing a picture
	public function access($debugmessage) {
		date_default_timezone_set(CFGSYS_TIMEZONE);
		$controllerlog = "";
		if (isset($_SERVER["PATH_INFO"])) {$controllerlog = $_SERVER["PATH_INFO"] . " - ";}
		if (isset($_SERVER['PHP_AUTH_USER'])) {$controllerlog = $controllerlog . "(" . $_SERVER['PHP_AUTH_USER'] . ") - ";}
		//error_log($controllerlog . "Access: " . $debugmessage, 0);   
		$logline = date(DATE_RFC822) . " - " . $controllerlog . "Access: " . $debugmessage . "\n";
		file_put_contents(CFGDIR_LOGDIR . "interface/access-" . date("Y-m-d") . ".log", $logline, FILE_APPEND | LOCK_EX);			 		
	}	
	
	//Send a messge to Apache error log, generated when something is added/edited/removed
	public function activity($debugmessage) {
		date_default_timezone_set(CFGSYS_TIMEZONE);
		$controllerlog = "";
		if (isset($_SERVER["PATH_INFO"])) {$controllerlog = $_SERVER["PATH_INFO"] . " - ";}
		if (isset($_SERVER['PHP_AUTH_USER'])) {$controllerlog = $controllerlog . "(User: " . $_SERVER['PHP_AUTH_USER'] . ") - ";}
		//error_log($controllerlog . "Activity: " . $debugmessage, 0);    		
		$logline = date(DATE_RFC822) . " - " . $controllerlog . "Activity: " . $debugmessage . "\n";
		file_put_contents(CFGDIR_LOGDIR . "interface/activity-" . date("Y-m-d") . ".log", $logline, FILE_APPEND | LOCK_EX);			
	}	
	
	//Send a messge to Apache error log, generated when something is added/edited/removed
	public function printrhtml($debugmessage) {
		error_log(strtr(print_r($debugmessage, 1),array("\r\n" => "<br />", "\r" => "<br />","\n" => "<br />")), 0);		
	}	

	//Keep a track of all modifications made by users
	public function edit($file, $setting, $initvalue, $targetvalue) {
		date_default_timezone_set(CFGSYS_TIMEZONE);
		$controllerlog = "";
		if (isset($_SERVER["PATH_INFO"])) {$controllerlog = $_SERVER["PATH_INFO"] . " - ";}
		if (isset($_SERVER['PHP_AUTH_USER'])) {$controllerlog = $controllerlog . "(User: " . $_SERVER['PHP_AUTH_USER'] . ") - ";}
//		date_default_timezone_set('UTC');
		if (isset($_REQUEST["sourceid"])) {
				$sourceid = (int) strip_tags($_REQUEST["sourceid"]);
				$logfile = "edit-source" . $sourceid. "-";
		} 
		else {$logfile = "edit-general-";}
		$logline = date(DATE_RFC822) . " - " . $controllerlog . "In file: " . $file . " Changed : " . $setting . " from: '" . $initvalue . "' to: '" . $targetvalue . "'\n";
		file_put_contents(CFGDIR_LOGDIR . "interface/" . $logfile . date("Y-m-d") . ".log", $logline, FILE_APPEND | LOCK_EX);		
		//error_log($controllerlog . "In file: " . $file . " Changed : " . $setting . " from: '" . $initvalue . "' to: '" . $targetvalue . "'", 0);		
	}		
	
	
}



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
 * @class Loglogfile
 */
class Loglogfile  { 
	public $id, $attributes;	

	static function all() {
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true) {		
			Log::debug("Log: /remote/lib/models/loglogfile.php - all() function");

			if (isset($_REQUEST["logfile"])) {
				if (strip_tags($_REQUEST["logfile"]) == "capture") {$logfile = "capture-" . $sourceid . ".log";}
				else if (strip_tags($_REQUEST["logfile"]) == "dailyvid") {$logfile = "cronlog-" . $sourceid . "-dailyvid";}
				else if (strip_tags($_REQUEST["logfile"]) == "post") {$logfile = "cronlog-" . $sourceid . "-post";}
				else if (strip_tags($_REQUEST["logfile"]) == "customvid") {$logfile = "cronlog-" . $sourceid . "-customvid";}
				else if (strip_tags($_REQUEST["logfile"]) == "edit") {$logfile = "edit";}			
				if (isset($logfile) && is_file(CFGDIR_LOGDIR . $logfile)) {
					Log::debug("Log: /remote/lib/models/loglogfile.php - all() - Opening file: " . $logfile);					
					$outputlog = array();
					$content = file_get_contents(CFGDIR_LOGDIR . $logfile);
					$convert = explode("\n", $content);							
					for ($i=0;$i<count($convert);$i++) {
						$outputlogline = array();
						$outputlogline['line'] = $i + 1;
						$outputlogline['content'] = $convert[$i];
						if ($convert[$i] != "") {																								
							array_push($outputlog, $outputlogline);	
						}						
					}
					return $outputlog;
				}
				if ($logfile == "edit") {
					Log::debug("Log: /remote/lib/models/loglogfile.php - all() - Accessing latest configuration changes: ");
					$listlogfiles = array();
					if (is_dir(CFGDIR_LOGDIR . "interface/")) {
						if ($handle = opendir(CFGDIR_LOGDIR . "interface/")) {
							while (false !== ($currentlogfile = readdir($handle))) {
								$filetype = explode("-", $currentlogfile); //edit-source2-2012-08-30.log						
								//if (substr($currentlogfile, 0,11)== "edit-source") {
								if ($filetype[0] == "edit" && $filetype[1] == "source" . $sourceid) {	
									$path_parts = pathinfo(CFGDIR_LOGDIR . "interface/" . $currentlogfile);
									if ($path_parts['extension'] == "log") {					
										Log::debug("Log: /remote/lib/models/loglogfile.php - all() - currentstat log file: " . $currentlogfile);												
										array_push($listlogfiles, $currentlogfile);		
									}				
								}
							}
							closedir($handle);
						}
					}		
					rsort($listlogfiles);
					$outputlog = array();
					$cptline = 0;
					foreach($listlogfiles as $currentlogfile) {
						Log::debug("Log: /remote/lib/models/loglogfile.php - all() - Processing log file: " . CFGDIR_LOGDIR . "interface/" . $currentlogfile);																		
						$content = file_get_contents(CFGDIR_LOGDIR . "interface/" . $currentlogfile);
						$convert = explode("\n", $content);
						$convert = array_reverse($convert);	
						for ($i=0;$i<count($convert);$i++) {
							if ($cptline < 201) {
								$outputlogline = array();	
								$cptline++;							
								$outputlogline['line'] = $cptline;
								$outputlogline['content'] = $convert[$i];	
								Log::debug("Log: /remote/lib/models/loglogfile.php - all() - Log Line: " . $convert[$i]);		
								if ($convert[$i] != "") {																								
									array_push($outputlog, $outputlogline);	
								}												
							} else {
								break;
							}		
						}
						if ($cptline > 200) {break;}												
					}																											
					return $outputlog;									
				}
				//capture-1.log
				//cronlog-8-dailyvid
				//cronlog-6-post
				//cronlog-13-customvid
			} 

		}
	}

}

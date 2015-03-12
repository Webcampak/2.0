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
 * @class ConfigObj
 * 
 */
class ConfigObj {


   // Extract all config keys and associated comments
	public function getConfigFromFile() {
		error_log("Log: /remote/lib/configobj.php - getConfig() function", 0);
		$cfgdir_initconffiles = unserialize(CFGDIR_INITCONFFILES);
		//error_log("Log: /remote/lib/configobj.php - Init conf file (unserialize): " . http_build_query($cfgdir_initconffiles), 0);
		$wpakallsettings = array();
		for($i=0;$i<count($cfgdir_initconffiles);$i++) {
			//error_log("-----------------------------------------------------------------------------------------------------", 0);
			error_log("Log: /remote/lib/configobj.php - getConfig(): Parse config file: " . $cfgdir_initconffiles[$i], 0);
			$wpakfullconf = parse_ini_file(CFGDIR_INITCONF . $cfgdir_initconffiles[$i] . ".cfg", FALSE, $scanner_mode = INI_SCANNER_RAW);
			$inicommentfile = file(CFGDIR_INITCONF . $cfgdir_initconffiles[$i] . ".cfg");
			$j = 0;
			foreach($wpakfullconf as $key=>$value)
			{
				$value = trim(str_replace("\"", "", $value));
	    		$wpakfullconf[$key] = $value;
	    		$wpakallsettings[$cfgdir_initconffiles[$i]][$j]['key'] = $key;
	    		$comment = "";
	    		foreach($inicommentfile as $line){ #We look for a comment in the config file to extract description
	    			if($line[0] == "#" && strpos($line, $key) != false ) {
	    				list($trash, $comment) = split(":", $line);
	    			}
	    		}
	    		$wpakallsettings[$cfgdir_initconffiles[$i]][$j]['description'] = trim($comment);
	    		$j++;   		
	    	}
		}
		//error_log("Log: /remote/lib/configobj.php - getConfig(): Test: " . serialize($wpakallsettings), 0);
		return $wpakallsettings;		
	}
 
   // Extract all config keys and associated comments
	public function getSettings($configfile, $sourceid, $allowedSettings) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() function");
					
		if (!is_file(CFGDIR_CONF . $configfile) && $sourceid != NULL) {
				copy(CFGDIR_INITCONF . str_replace($sourceid, "", $configfile), CFGDIR_CONF . $configfile); // If file does not exit, copy file from init conf directory (i.e. create file if does not exist)
				chmod(CFGDIR_CONF . $configfile, 0777);  // octal; correct value of mode
				Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() - Configuration file created from init directory");					
		}
		if (is_file(CFGDIR_CONF . $configfile)) {
			Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() - Opening configuration file");
			$getconfig = parse_ini_file(CFGDIR_CONF . $configfile, FALSE, $scanner_mode = INI_SCANNER_RAW);
			foreach($getconfig as $key=>$value) {
//				if (isset($allowedSettings)) {Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() - Looking for:" . $key . " in: " . serialize($allowedSettings));	}
				if (!isset($allowedSettings) || in_array($key, $allowedSettings)) { // If a list of allowed settings have been sent, we look into this list to find the current key, if found, processing is activated, otherwise key is not processed
					//Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() - Found:" . $key);				
					$value = trim(str_replace("\"", "", $value));

					//START Specific configuration for some of the settings

					//Replace "yes" by "on" and "no" by "off" as required for sencha checkbox
					if ($value == "yes") {$value = "on";}
					if ($value == "no") {$value = "off";}
					//Split a cronday into multiple configuration settings
					if (substr($key, 0,10) == "cfgcronday") {
						$currentday = substr($key, 10,11);
						$srccfgcrondayraw = explode(",", $value);					
						if($srccfgcrondayraw[0][0] == " ") {$getconfig["cfgcapturedayenable" . $currentday] = substr($srccfgcrondayraw[0],1);} elseif ($srccfgcrondayraw[0] == "yes") {$getconfig["cfgcapturedayenable" . $currentday] = "on";} else {$getconfig["cfgcapturedayenable" . $currentday] = "off";}
						if($srccfgcrondayraw[1][0] == " ") {$getconfig["cfgcapturestarthour" . $currentday] = substr($srccfgcrondayraw[1],1);} else {$getconfig["cfgcapturestarthour" . $currentday] = $srccfgcrondayraw[1];}
						if($srccfgcrondayraw[2][0] == " ") {$getconfig["cfgcapturestartminute" . $currentday] = substr($srccfgcrondayraw[2],1);} else {$getconfig["cfgcapturestartminute" . $currentday] = $srccfgcrondayraw[2];}
						if($srccfgcrondayraw[3][0] == " ") {$getconfig["cfgcapturesendhour" . $currentday] = substr($srccfgcrondayraw[3],1);} else {$getconfig["cfgcapturesendhour" . $currentday] = $srccfgcrondayraw[3];}
						if($srccfgcrondayraw[4][0] == " ") {$getconfig["cfgcapturesendminute" . $currentday] = substr($srccfgcrondayraw[4],1);} else {$getconfig["cfgcapturesendminute" . $currentday] = $srccfgcrondayraw[4];}
					}
					
					//If parameter is a webcam, remove the % sign and replace "off" value with "0"
					if (substr($key, 0,15) == "cfgsourcewebcam") {
						$value = trim(str_replace("%", "", $value));
						if ($value == "off") {$value = 0;};
					}
					//If FTP Server disabled, replace "off" with "0" being the ID for disabled FTP Server
					if (substr($key, 0,6) == "cfgftp" && substr($key, -5,5) == "retry") {$value = trim(str_replace("off", "0", $value));}
					//If holtink disabled, replace off with an empty space 
					if (substr($key, 0,14) == "cfghotlinksize") {$value = trim(str_replace("off", "", $value));}				
					
					//If user is not allowed to write configuration, we replace all passwords by 'xxxxxxxxx', except if we try to send an email
					if (isset($_SERVER["PATH_INFO"])) {$controllerlog = $_SERVER["PATH_INFO"];} else {$controllerlog = "";}
					if (strpos($key,'pass') !== false && $controllerlog != "/picturessendemails") {
						$userAuth = new Authorizations();
						if ($userAuth->isAllowedToAccessPage("auth.config.cloud.write") != true && $userAuth->isAllowedToAccessPage("auth.config.sources.write") != true) {
							$value = 'xxxxxxxxx';
						}
					}					
					
					//auth.config.sources.write
					//auth.config.cloud.write					
					
					//END Specific configuration for some of the settings				
							
					$getconfig[$key] = $value;
					//Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() - " . $key . " = " . $getconfig[$key]);				
				} else {
					//Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() - Not Found:" . $key);									
					unset($getconfig[$key]);
				}
			}
			return $getconfig;
		} else {
			Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() - Not able to use configuration file");					
		}		
	}

   // Update configuration based upon an array
	public function writeSettings($configfile, $newsettings) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - writeSettings() function");										 		
		if (is_file(CFGDIR_CONF . $configfile)) {
			$content = file_get_contents(CFGDIR_CONF . $configfile);
			$convert = explode("\n", $content);			
			for ($i=0;$i<count($convert);$i++) {
				if (isset($convert[$i][0]) && $convert[$i][0] != "#") {
					foreach ($newsettings as $fcconfkey=>$fcconfvalue) {
						if (isset($convert[$i])) {
							//list($getwitoparam, $getwitojunk) = explode("=",$convert[$i]);
							$getwitoparam = explode("=",$convert[$i]);
							if (str_replace(' ', '', $getwitoparam[0]) == $fcconfkey) {
								if ($fcconfvalue == "off") {$fcconfvalue = "no";}
								if ($fcconfvalue == "on") {$fcconfvalue = "yes";}
								$convert[$i] = $fcconfkey . '="' . $fcconfvalue . '" ';
							}
						}
					}
				}
			}
			$f=fopen(CFGDIR_CONF . $configfile, "w");
			for ($i=0;$i<count($convert);$i++) {
				if ($convert[$i] != "") {
					fwrite($f, $convert[$i] . "\n");
				}
			}
			fclose($f);
			return true;
		} else {
			Log::debug("Log: /remote/lib/configuration/configobj.php - writeSettings() - Not able to use configuration file");								
		}
	}
	public function getFTPServers($sourceid) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getFTPServers() function");										 
		if (is_file(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg")) {
			$ftpserversconf = parse_ini_file(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg", FALSE, $scanner_mode = INI_SCANNER_RAW);
			foreach($ftpserversconf as $key=>$value) {
				$value = trim(str_replace("\"", "", $value));
				$ftpserversconf[$key] = $value;
			}
			$ftpservers = array();
			$tmpftpservers = array();	
			$tmpftpservers['id'] = 'off';	
			$tmpftpservers['name'] = _("Disabled");
			array_push($ftpservers, $tmpftpservers);
			//for ($i=1;$i<$ftpserversconf["cfgftpserverslistnb"] + 1; $i++) {
			$lastftpid = $this->getFTPServersNextId($sourceid);
			for ($i=1;$i<$lastftpid + 1; $i++) {
				if (isset($ftpserversconf["cfgftpserverslist" . $i]) && $ftpserversconf["cfgftpserverslist" . $i] != "") {
					$tmpftpservers = array();
					$srcfgparameters = explode(",", $ftpserversconf["cfgftpserverslist" . $i]);
					$tmpftpservers['id'] = $i;
					if($srcfgparameters[0][0] == " ") {$tmpftpservers['name'] = substr($srcfgparameters[0],1);} else {$tmpftpservers['name'] = $srcfgparameters[0];}
					if($srcfgparameters[1][0] == " ") {$tmpftpservers['host'] = substr($srcfgparameters[1],1);} else {$tmpftpservers['host'] = $srcfgparameters[1];}
					if($srcfgparameters[2][0] == " ") {$tmpftpservers['username'] = substr($srcfgparameters[2],1);} else {$tmpftpservers['username'] = $srcfgparameters[2];}
					if($srcfgparameters[3][0] == " ") {$tmpftpservers['password'] = substr($srcfgparameters[3],1);} else {$tmpftpservers['password'] = $srcfgparameters[3];}
					if($srcfgparameters[4][0] == " ") {$tmpftpservers['directory'] = substr($srcfgparameters[4],1);} else {$tmpftpservers['directory'] = $srcfgparameters[4];}			
					if($srcfgparameters[5][0] == " ") {$tmpftpservers['active'] = substr($srcfgparameters[5],1);} else {$tmpftpservers['active'] = $srcfgparameters[5];}
					if ($tmpftpservers['active'] == "yes") {$tmpftpservers['active'] == "yes";} else {$tmpftpservers['active'] = "no";}
					
					//If user is not allowed to write configuration, we replace all passwords by 'xxxxxxxxx' even for read access
					$userAuth = new Authorizations();
					if ($userAuth->isAllowedToAccessPage("auth.config.cloud.write") != true && $userAuth->isAllowedToAccessPage("auth.config.sources.write") != true) {
						$tmpftpservers['password'] = 'xxxxxxxxx';
					}					
					array_push($ftpservers, $tmpftpservers);
				}
			}		
			return $ftpservers;
		}
	}

	public function getFTPServersNextId($sourceid) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getFTPServersNextId() function");										 		 
		if (is_file(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg")) {
			$ftpserversconf = parse_ini_file(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg", FALSE, $scanner_mode = INI_SCANNER_RAW);
			$ftpserversid = array();
			foreach($ftpserversconf as $key=>$value) {
				if (substr($key, 0,17) == "cfgftpserverslist" && substr($key, 17) != "nb") {
					array_push($ftpserversid, (int) substr($key, 17));
					//Log::debug("Log: /remote/lib/configuration/configobj.php - getFTPServersNextId() - Curent ID: " . substr($key, 17));										 		 
				}
			}
			//Log::debug("Log: /remote/lib/configuration/configobj.php - getFTPServersNextId() - Biggest value is: " . max($ftpserversid));
			return max($ftpserversid) + 1;								 		 						
		}
	}
//cfgftpserverslist1="FTP Server", "DNS or IP", "Username", "Password", "Directory", "no"

	public function insertFTPServer($rec, $sourceid) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getFTPServersNextId() function");										 		 
		if (is_file(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg")) {
			$newserverid = (int) $rec['id'];
			$tmpftpserveradd["cfgftpserverslist" . $newserverid] = strip_tags($rec['name']) . "\",\"" . strip_tags($rec['host']) . "\",\"" . strip_tags($rec['username']) . "\",\"" . strip_tags($rec['password']) . "\",\"" . strip_tags($rec['directory']) . "\",\"" . strip_tags($rec['active']);
			
			//Write new FTP server to config file, added to the end of the file
			$f=fopen(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg", "a");
			fwrite($f, "cfgftpserverslist" . $newserverid . "=\"" . $tmpftpserveradd["cfgftpserverslist" . $newserverid] . "\"\n");
			fclose($f);

			$status['success'] = true;
			$status['message'] = 'FTP Server successfully added';				
			return $status;				
		}
	}

	//Destroy a FTP Server from file
	public function destroyFTPServer($sourceid, $id) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - destroyFTPServer() function");
		if (is_file(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg")) {		
			$content = file_get_contents(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg");
			$convert = explode("\n", $content);	
			$newfile = array();
			for ($i=0;$i<count($convert);$i++) {
				if (isset($convert[$i][0]) && $convert[$i][0] != "#") {
					list($confkey, $confvalue) = explode("=",$convert[$i]);
					if (str_replace(' ', '', $confkey) != "cfgftpserverslist" . $id) {
						array_push($newfile, $convert[$i]);						
					}
				} else {
					array_push($newfile, $convert[$i]);					
				}
			}
			$f=fopen(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg", "w");
			for ($i=0;$i<count($newfile);$i++) {
				if ($convert[$i] != "") {
					fwrite($f, $newfile[$i] . "\n");
				}
			}
			fclose($f);
		}
		return $this->getFTPServers($sourceid); 
	}

	//Update FTP Server record within database
	public function updateFTPServer($idx, $attributes, $sourceid) {       
		Log::debug("Log: /remote/lib/database/users.php - updateUser() function");
		Log::debug("Log: /remote/lib/database/users.php - updateUser() Update FTP Server: " . $attributes['id']);
		if (is_file(CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg")) {	
			$ftpserverid = (int) $attributes['id'];			
			$newsettings["cfgftpserverslist" . $ftpserverid] = strip_tags($attributes['name']) . "\",\"" . strip_tags($attributes['host']) . "\",\"" . strip_tags($attributes['username']) . "\",\"" . strip_tags($attributes['password']) . "\",\"" . strip_tags($attributes['directory']) . "\",\"" . strip_tags($attributes['active']);
			$this->writeSettings("config-source" . $sourceid . "-ftpservers.cfg", $newsettings);
			$status['success'] = true;
			$status['message'] = 'FTP Server successfully updated';				
			return $status;
		} else {
			$status['success'] = false;
			$status['message'] = 'Unable to open FTP Server configuration file';				
			return $status;	
		}
	}

	public function getPhidgets($sourceid) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getPhidgets() function");		
		if (!is_file(CFGDIR_CONF . "config-source" . $sourceid . ".cfg")) {
				copy(CFGDIR_INITCONF . "config-source.cfg", CFGDIR_CONF . "config-source" . $sourceid . ".cfg"); // If file does not exit, copy file from init conf directory (i.e. create file if does not exist)
				chmod(CFGDIR_CONF . "config-source" . $sourceid . ".cfg", 0777);  // octal; correct value of mode
				Log::debug("Log: /remote/lib/configuration/configobj.php - getSettings() - Configuration file created from init directory");
		}
		if (is_file(CFGDIR_CONF . "config-source" . $sourceid . ".cfg")) {
			$phidgetsensors = array();
			$getconfig = parse_ini_file(CFGDIR_CONF . "config-source" . $sourceid . ".cfg", FALSE, $scanner_mode = INI_SCANNER_RAW);
			foreach($getconfig as $key=>$value) {
				$value = trim(str_replace("\"", "", $value));
				if (substr($key, 0,16) == "cfgphidgetsensor" && $key != "cfgphidgetsensornb" && strlen($key) == 17) {
					$tmpphidgetsensors = array();					
					$tmpphidgetsensors['id'] = substr($key, 16,17);
					$srcfgparameters = explode(",", $value);
					if($srcfgparameters[0][0] == " ") {$tmpphidgetsensors['type'] = substr($srcfgparameters[0],1);} else {$tmpphidgetsensors['type'] = $srcfgparameters[0];}
					if($srcfgparameters[1][0] == " ") {$tmpphidgetsensors['port'] = substr($srcfgparameters[1],1);} else {$tmpphidgetsensors['port'] = $srcfgparameters[1];}
					if($srcfgparameters[2][0] == " ") {$tmpphidgetsensors['legend'] = substr($srcfgparameters[2],1);} else {$tmpphidgetsensors['legend'] = $srcfgparameters[2];}
					if($srcfgparameters[3][0] == " ") {$tmpphidgetsensors['color'] = substr($srcfgparameters[3],1);} else {$tmpphidgetsensors['color'] = $srcfgparameters[3];}						
					if ($tmpphidgetsensors['type'] == "no") {$tmpphidgetsensors['type'] = "disabled";}
					array_push($phidgetsensors, $tmpphidgetsensors);
				}			
			}
			return $phidgetsensors;			
		} else {
			Log::debug("Log: /remote/lib/configuration/configobj.php - getPhidgets() - Not able to use configuration file");					
		}				
	}	

	public function updatePhidgets($idx, $attributes, $sourceid) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - updatePhidgets() function");
		Log::debug("Log: /remote/lib/configuration/configobj.php - updatePhidgets() Update Phidget Sensor: " . $attributes['id']);		
		if (is_file(CFGDIR_CONF . "config-source" . $sourceid . ".cfg")) {
			$phidgetsensorid = (int) $attributes['id'];	
			if ($attributes['type'] == "disabled") {$attributes['type'] = "no";}
			//cfgphidgetsensorX: Phidget Sensor: Name, Sensor, Display Name, Display color (graph)
			//cfgphidgetsensor1="no", "no", "Température (DegC)", "FF0000"		
			$newsettings["cfgphidgetsensor" . $phidgetsensorid] = strip_tags($attributes['type']) . "\",\"" . strip_tags($attributes['port']) . "\",\"" . strip_tags($attributes['legend']) . "\",\"" . strip_tags($attributes['color']);
			$this->writeSettings("config-source" . $sourceid . ".cfg", $newsettings);
			$status['success'] = true;
			$status['message'] = 'Phidget Sensor successfully updated';				
			return $status;
		} else {
			$status['success'] = false;
			$status['message'] = 'Unable to update Phidget Sensor';	
			Log::debug("Log: /remote/lib/configuration/configobj.php - updatePhidgets() - Not able to use configuration file");											
			return $status;		
		}				
	}	



	public function getPhidgetSensors() {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getPhidgetSensors() function");		
		if (is_file(CFGDIR_CONF . "config-general.cfg")) {
			$phidgetsensors = array();
			$tmpphidgetsensors = array();
			$tmpphidgetsensors['id'] =	"disabled";
			$tmpphidgetsensors['name'] =	_("Disabled");	
			array_push($phidgetsensors, $tmpphidgetsensors);					
			$getconfig = parse_ini_file(CFGDIR_CONF . "config-general.cfg", FALSE, $scanner_mode = INI_SCANNER_RAW);
			foreach($getconfig as $key=>$value) {
				$value = trim(str_replace("\"", "", $value));
				if (substr($key, 0,20) == "cfgphidgetsensortype" && $key != "cfgphidgetsensortypenb") {
					$tmpphidgetsensors = array();					
					$tmpphidgetsensors['id'] = substr($key, 20,21);
					$srcfgparameters = explode(",", $value);
					if($srcfgparameters[0][0] == " ") {$tmpphidgetsensors['name'] = substr($srcfgparameters[0],1);} else {$tmpphidgetsensors['name'] = $srcfgparameters[0];}					
					array_push($phidgetsensors, $tmpphidgetsensors);
				}			
			}
			return $phidgetsensors;			
		} else {
			Log::debug("Log: /remote/lib/configuration/configobj.php - getPhidgetSensors() - Not able to use configuration file");					
		}				
	}	

	public function getSourceStats($sourceid) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() function");

		// Find latest source stats file
		$checkstat = array();
		if (is_dir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/")) {
			if ($handle = opendir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/")) {
				while (false !== ($currentstat = readdir($handle))) {
					if ($currentstat != "." && $currentstat != ".." && substr($currentstat, 0,2)== "20") {
						$path_parts = pathinfo(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $currentstat);
						if ($path_parts['extension'] == "txt") {					
							//Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - currentstat file: " . $currentstat);												
							array_push($checkstat, $currentstat);		
						}				
					}
				}
				closedir($handle);
			}
		}		
		rsort($checkstat);
		
		if (isset($checkstat[0]) && is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $checkstat[0])) {
			$sourcestats = array();
			$getconfig = parse_ini_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $checkstat[0], FALSE, $scanner_mode = INI_SCANNER_RAW);
			//date_default_timezone_set('UTC');
			foreach($getconfig as $key=>$value) {
				$value = trim(str_replace("\"", "", $value));
				if (substr($key, 0,10) == "ScannedDay") {
					$tmpsourcestats = array();					
					$tmpsourcestats['date'] = strtotime(substr($key,16,2) . '-' . substr($key,14,2) . '-' . substr($key,10,4)) * 1000;
					$value = str_replace(" ", "", $value);
					$srcfgparameters = explode(",", $value);
					$tmpsourcestats['nbpics'] = $srcfgparameters[0];
					$tmpsourcestats['sourceid'] = $sourceid;
//					$tmpsourcestats['source' . $sourceid] = $srcfgparameters[0];					
					$tmpsourcestats['sizepics'] = $srcfgparameters[1] / 1024 / 1024;
					array_push($sourcestats, $tmpsourcestats);
					//Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - Date: " . $tmpsourcestats['date'] . " NB: " . $tmpsourcestats['nbpics'] . " SIZE:" . $tmpsourcestats['sizepics']);															
				}			
			}
			return $sourcestats;			
		} else {
			Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - Not able to use stats file");					
		}				
	}	


	public function getSensors($sourceid, $zoomlevel) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getSensors() function");

		// Find latest source stats file
		$sensorvalues = array();
		if (is_dir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/")) {
			if ($handle = opendir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/")) {
				
				$listdirectories = array();
				while (false !== ($currentday = readdir($handle))) {
					if ($currentday != "." && $currentday != ".." && substr($currentday, 0,2) == "20") {					
						array_push($listdirectories, $currentday);	
					}	
				}
				sort($listdirectories);

				foreach($listdirectories as $currentday) {
					if (is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/" . $currentday . "/sensors.txt")) {
						$getsensorvalues = parse_ini_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/" . $currentday . "/sensors.txt", TRUE);
						$skipcpt = $zoomlevel;
						foreach($getsensorvalues as $sensortime) {
							if ($skipcpt == $zoomlevel || $skipcpt == 0) {
								$tmpsensorvalues= array();	
								$tmpsensorvalues['Timestamp'] = $sensortime['Timestamp'] * 1000;		
								$tmpsensorvalues['date'] = $tmpsensorvalues['Timestamp'];
								//$tmpsensorvalues['graphdata'] = $sensortime['TemperatureOut'];							
								//Log::debug("Log: /remote/lib/configuration/configobj.php - getSensors() - Timestamp: " . $tmpsensorvalues['Timestamp']);																		
								foreach($sensortime as $key=>$value) {
									$tmpsensorvalues[$key] = $value;
								}
								array_push($sensorvalues, $tmpsensorvalues);
								$skipcpt = $zoomlevel - 1;
							}	else {
								$skipcpt--;
							}	
						}				
					}			
				}
				closedir($handle);
			}
			Log::debug("Log: /remote/lib/configuration/configobj.php - getSensors() - Number or records: " . count($sensorvalues));					
			return $sensorvalues;				
		} else {
			Log::debug("Log: /remote/lib/configuration/configobj.php - getSensors() - Not able to find sensor file");					
		}				
	}



	public function getSourceDiskStats($sourceid, $range) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceDiskStats() function");
		Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceDiskStats() function - using range: " . $range);		
		date_default_timezone_set('UTC'); 
		
		// List all stats file in an array
		$checkstat = array();
		if (is_dir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/")) {
			if ($handle = opendir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/")) {
				while (false !== ($currentstat = readdir($handle))) {
					if ($currentstat != "." && $currentstat != ".." && substr($currentstat, 0,2)== "20") {
						$path_parts = pathinfo(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $currentstat);
						if ($path_parts['extension'] == "txt") {					
							//Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - currentstat file: " . $currentstat);												
							array_push($checkstat, $currentstat);		
						}				
					}
				}
				closedir($handle);
			}
		}		
		rsort($checkstat);
		if ($range == 'day') {
			if (isset($checkstat[0]) && is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $checkstat[0])) {
				$sourcestats = array();
				$getconfig = parse_ini_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $checkstat[0], TRUE);
				foreach($getconfig as $key=>$value) {
					$tmpsourcestats = array();	
					if (isset($value['Timestamp'])) 		{$tmpsourcestats['date'] 			=  round($value['Timestamp'] * 1000); 				}
					if (isset($value['PicturesSize'])) 	{$tmpsourcestats['picturesize'] 	= 	round($value['PicturesSize'] / 1024 / 1024);	}				
					if (isset($value['VideoSize'])) 		{$tmpsourcestats['videosize'] 	= 	round($value['VideoSize'] / 1024 / 1024);		}	
					if (isset($value['GlobalSize'])) 	{$tmpsourcestats['globalsize'] 	= 	round($value['GlobalSize'] / 1024 / 1024);  	}																																
					if (isset($tmpsourcestats['date']) && $tmpsourcestats['date'] != "" ) {
						array_push($sourcestats, $tmpsourcestats);
					}
				}
				return $sourcestats;			
			} else {
				Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - Not able to use stats file");					
			}	
		}
		if ($range == 'month' || $range == 'year') {	
			sort($checkstat);
			$sourcestats = array();		
			foreach($checkstat as $checkstatfile) {
				//if (is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $checkstatfile) && substr($checkstatfile, 4,2) == date("m")) {
				if (is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $checkstatfile)) {	
					if ($range == "year" || ($range == "month" && substr($checkstatfile, 4,2) == date("m"))) {
						Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - using file: " . $checkstatfile);	
						$getconfig = parse_ini_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats/" . $checkstatfile, TRUE);
						foreach($getconfig as $key=>$value) {
							$tmpsourcestats = array();	
							if (isset($value['Timestamp'])) 		{$tmpsourcestats['date'] 			=  round($value['Timestamp']); 				}
							if (isset($value['PicturesSize'])) 	{$tmpsourcestats['picturesize'] 	= 	round($value['PicturesSize'] / 1024 / 1024);	}				
							if (isset($value['VideoSize'])) 		{$tmpsourcestats['videosize'] 	= 	round($value['VideoSize'] / 1024 / 1024);		}	
							if (isset($value['GlobalSize'])) 	{$tmpsourcestats['globalsize'] 	= 	round($value['GlobalSize'] / 1024 / 1024);  	}																																
							if (isset($tmpsourcestats['date']) && $tmpsourcestats['date'] != "" ) {
								array_push($sourcestats, $tmpsourcestats);
							}
						}
					}																
				}
			}
			Log::printrhtml($sourcestats);					
			$newsourcestats = array();
			foreach($sourcestats as $key=>$value) {
				//get current timestamp
				$currentimestamp = $value['date'];
				if ($range == 'month') {$locktimestamp = mktime(date("H", $currentimestamp), 0, 0, date("n", $currentimestamp), date("j", $currentimestamp), date("Y", $currentimestamp)) * 1000;}
				if ($range == 'year') {$locktimestamp = mktime(0, 1, 0, date("n", $currentimestamp), date("j", $currentimestamp), date("Y", $currentimestamp)) * 1000;}				
				if (!isset($tmpnewsourcestats['date'])) {
					$tmpnewsourcestats = array();
					$tmpnewsourcestats['date'] 			= $locktimestamp;
					$tmpnewsourcestats['picturesize'] 	= $value['picturesize'];
					$tmpnewsourcestats['videosize'] 		= $value['videosize'];
					$tmpnewsourcestats['globalsize'] 	= $value['globalsize'];
					$tmpnewsourcestats['cpt'] 				= 1;					
				}
				else {
					if ($tmpnewsourcestats['date'] != $locktimestamp) {
						Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - Current timestamp: " . $currentimestamp . " Lock timestamp: " . $locktimestamp . " New Source Stats: " . $tmpnewsourcestats['date']);										
						array_push($newsourcestats, $tmpnewsourcestats);					
						$tmpnewsourcestats = array();
						$tmpnewsourcestats['date'] 			= $locktimestamp;
						$tmpnewsourcestats['picturesize'] 	= $value['picturesize'];
						$tmpnewsourcestats['videosize'] 		= $value['videosize'];
						$tmpnewsourcestats['globalsize'] 	= $value['globalsize'];
						$tmpnewsourcestats['cpt'] 				= 1;
					} else {
						$tmpnewsourcestats['picturesize'] 	= $tmpnewsourcestats['picturesize'] + $value['picturesize'];
						$tmpnewsourcestats['videosize'] 		= $tmpnewsourcestats['videosize'] 	+ $value['videosize'];
						$tmpnewsourcestats['globalsize'] 	= $tmpnewsourcestats['globalsize'] 	+ $value['globalsize'];
						$tmpnewsourcestats['cpt'] 				= $tmpnewsourcestats['cpt'] 			+ 1;	
					}	
				}	
			}
			foreach($newsourcestats as $key=>$value) {
				$newsourcestats[$key]['picturesize'] 	= round($newsourcestats[$key]['picturesize'] / $value['cpt']);
				$newsourcestats[$key]['videosize']		= round($newsourcestats[$key]['videosize'] / $value['cpt']);
				$newsourcestats[$key]['globalsize'] 	= round($newsourcestats[$key]['globalsize'] / $value['cpt']);					
			}		
			return $newsourcestats;				
		}
	}
	
	public function getSystemStats($range) {
		Log::debug("Log: /remote/lib/configuration/configobj.php - getSystemStats() function");
		Log::debug("Log: /remote/lib/configuration/configobj.php - getSystemStats() function - using range: " . $range);				
		date_default_timezone_set('UTC');

		// List all stats file in an array
		$checkstat = array();
		if (is_dir(CFGDIR_STATSDIR)) {
			if ($handle = opendir(CFGDIR_STATSDIR)) {
				while (false !== ($currentstat = readdir($handle))) {
					if ($currentstat != "." && $currentstat != ".." && substr($currentstat, 0,2)== "20") {
						$path_parts = pathinfo(CFGDIR_STATSDIR . $currentstat);
						if ($path_parts['extension'] == "txt") {					
							Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - currentstat file: " . $currentstat);												
							array_push($checkstat, $currentstat);		
						}				
					}
				}
				closedir($handle);
			}
		}		
		rsort($checkstat);
/*
Timestamp = 1346106901
BandwidthIn = 64.32
BandwidthOut = 23.45
BandwidthTotal = 87.77
MemoryUsageTotal = 16727937024
MemoryUsageUsed = 15166652416
MemoryUsageFree = 1561284608
MemoryUsagePercent = 6.5
DiskUsageTotal = 988419788800
DiskUsageUsed = 15856615424
DiskUsageFree = 923116949504
DiskUsagePercent = 1.6
CPUUsagePercent = 0.6
*/		
		
		if ($range == 'day') {
			if (isset($checkstat[0]) && is_file(CFGDIR_STATSDIR . $checkstat[0])) {
				$sourcestats = array();
				$getconfig = parse_ini_file(CFGDIR_STATSDIR . $checkstat[0], TRUE);
				foreach($getconfig as $key=>$value) {
					$tmpsourcestats = array();	
					if (isset($value['Timestamp'])) 				{$tmpsourcestats['Timestamp'] 			=  $value['Timestamp'] * 1000; 				}
					if (isset($value['BandwidthIn'])) 			{$tmpsourcestats['BandwidthIn'] 			= 	round($value['BandwidthIn']);	}				
					if (isset($value['BandwidthOut'])) 			{$tmpsourcestats['BandwidthOut'] 		= 	round($value['BandwidthOut']);	}				
					if (isset($value['BandwidthTotal'])) 		{$tmpsourcestats['BandwidthTotal'] 		= 	round($value['BandwidthTotal']);	}				
					if (isset($value['MemoryUsageTotal'])) 	{$tmpsourcestats['MemoryUsageTotal'] 	= 	round($value['MemoryUsageTotal'] / 1024 / 1024);		}	
					if (isset($value['MemoryUsageUsed'])) 		{$tmpsourcestats['MemoryUsageUsed'] 	= 	round($value['MemoryUsageUsed'] / 1024 / 1024);		}	
					if (isset($value['MemoryUsageFree'])) 		{$tmpsourcestats['MemoryUsageFree'] 	= 	round($value['MemoryUsageFree'] / 1024 / 1024);		}	
					if (isset($value['DiskUsageTotal'])) 		{$tmpsourcestats['DiskUsageTotal'] 		= 	round($value['DiskUsageTotal'] / 1024 / 1024);  	}																																
					if (isset($value['DiskUsageUsed'])) 		{$tmpsourcestats['DiskUsageUsed'] 		= 	round($value['DiskUsageUsed'] / 1024 / 1024);  	}																																
					if (isset($value['DiskUsageFree'])) 		{$tmpsourcestats['DiskUsageFree'] 		= 	round($value['DiskUsageFree'] / 1024 / 1024);  	}	
					if (isset($value['DiskUsagePercent'])) 	{$tmpsourcestats['DiskUsagePercent'] 	= 	round($value['DiskUsagePercent']);	}
					if (isset($value['MemoryUsagePercent'])) 	{$tmpsourcestats['MemoryUsagePercent'] = 	round($value['MemoryUsagePercent']);	}										
					if (isset($value['CPUUsagePercent'])) 		{$tmpsourcestats['CPUUsagePercent'] 	= 	round($value['CPUUsagePercent']);	}																																													
					if (isset($tmpsourcestats['Timestamp']) && $tmpsourcestats['Timestamp'] != "" ) {
						array_push($sourcestats, $tmpsourcestats);
					}
				}
				return $sourcestats;			
			} else {
				Log::debug("Log: /remote/lib/configuration/configobj.php - getSystemStats() - Not able to use stats file:");					
			}	
		}
		if ($range == 'month' || $range == 'year') {	
			sort($checkstat);
			$sourcestats = array();		
			foreach($checkstat as $checkstatfile) {
				//if (is_file(CFGDIR_STATSDIR . $checkstatfile) && substr($checkstatfile, 4,2)== date("m")) {
				if (is_file(CFGDIR_STATSDIR . $checkstatfile)) {		
					if ($range == "year" || ($range == "month" && substr($checkstatfile, 4,2) == date("m"))) {				
						Log::debug("Log: /remote/lib/configuration/configobj.php - getSystemStats() - using file: " . $checkstatfile);	
						$getconfig = parse_ini_file(CFGDIR_STATSDIR . $checkstatfile, TRUE);
						foreach($getconfig as $key=>$value) {
							$tmpsourcestats = array();	
						if (isset($value['Timestamp'])) 				{$tmpsourcestats['Timestamp'] 			=  $value['Timestamp']; 				}
						if (isset($value['BandwidthIn'])) 			{$tmpsourcestats['BandwidthIn'] 			= 	round($value['BandwidthIn']);	}				
						if (isset($value['BandwidthOut'])) 			{$tmpsourcestats['BandwidthOut'] 		= 	round($value['BandwidthOut']);	}				
						if (isset($value['BandwidthTotal'])) 		{$tmpsourcestats['BandwidthTotal'] 		= 	round($value['BandwidthTotal']);	}				
						if (isset($value['MemoryUsageTotal'])) 	{$tmpsourcestats['MemoryUsageTotal'] 	= 	round($value['MemoryUsageTotal'] / 1024 / 1024);		}	
						if (isset($value['MemoryUsageUsed'])) 		{$tmpsourcestats['MemoryUsageUsed'] 	= 	round($value['MemoryUsageUsed'] / 1024 / 1024);		}	
						if (isset($value['MemoryUsageFree'])) 		{$tmpsourcestats['MemoryUsageFree'] 	= 	round($value['MemoryUsageFree'] / 1024 / 1024);		}	
						if (isset($value['DiskUsageTotal'])) 		{$tmpsourcestats['DiskUsageTotal'] 		= 	round($value['DiskUsageTotal'] / 1024 / 1024);  	}																																
						if (isset($value['DiskUsageUsed'])) 		{$tmpsourcestats['DiskUsageUsed'] 		= 	round($value['DiskUsageUsed'] / 1024 / 1024);  	}																																
						if (isset($value['DiskUsageFree'])) 		{$tmpsourcestats['DiskUsageFree'] 		= 	round($value['DiskUsageFree'] / 1024 / 1024);  	}	
						if (isset($value['DiskUsagePercent'])) 	{$tmpsourcestats['DiskUsagePercent'] 	= 	round($value['DiskUsagePercent']);	}		
						if (isset($value['MemoryUsagePercent'])) 	{$tmpsourcestats['MemoryUsagePercent'] = 	round($value['MemoryUsagePercent']);	}					
						if (isset($value['CPUUsagePercent'])) 		{$tmpsourcestats['CPUUsagePercent'] 	= 	round($value['CPUUsagePercent']);	}																																
							if (isset($tmpsourcestats['Timestamp']) && $tmpsourcestats['Timestamp'] != "" ) {
								array_push($sourcestats, $tmpsourcestats);
							}
						}		
					}														
				}
			}
			Log::printrhtml($sourcestats);					
			$newsourcestats = array();
			foreach($sourcestats as $key=>$value) {
				//get current timestamp
				$currentimestamp = $value['Timestamp'];
				if ($range == 'month') {$locktimestamp = mktime(date("H", $currentimestamp), 0, 0, date("n", $currentimestamp), date("j", $currentimestamp), date("Y", $currentimestamp)) * 1000;}
				if ($range == 'year') {$locktimestamp = mktime(0, 1, 0, date("n", $currentimestamp), date("j", $currentimestamp), date("Y", $currentimestamp)) * 1000;}				
				if (!isset($tmpnewsourcestats['Timestamp'])) {
					$tmpnewsourcestats = array();
					$tmpnewsourcestats['Timestamp'] 				= $locktimestamp;
					$tmpnewsourcestats['BandwidthIn'] 			= $value['BandwidthIn'];
					$tmpnewsourcestats['BandwidthOut'] 			= $value['BandwidthOut'];
					$tmpnewsourcestats['BandwidthTotal'] 		= $value['BandwidthTotal'];
					$tmpnewsourcestats['MemoryUsageTotal'] 	= $value['MemoryUsageTotal'];
					$tmpnewsourcestats['MemoryUsageUsed'] 		= $value['MemoryUsageUsed'];
					$tmpnewsourcestats['MemoryUsageFree'] 		= $value['MemoryUsageFree'];
					$tmpnewsourcestats['MemoryUsagePercent'] 	= $value['MemoryUsagePercent'];					
					$tmpnewsourcestats['DiskUsageTotal'] 		= $value['DiskUsageTotal'];
					$tmpnewsourcestats['DiskUsageFree'] 		= $value['DiskUsageFree'];
					$tmpnewsourcestats['DiskUsagePercent'] 	= $value['DiskUsagePercent'];
					$tmpnewsourcestats['DiskUsageUsed'] 		= $value['DiskUsageUsed'];					
					$tmpnewsourcestats['CPUUsagePercent'] 		= $value['CPUUsagePercent'];
					$tmpnewsourcestats['cpt'] 				= 1;					
				}
				else {
					if ($tmpnewsourcestats['Timestamp'] != $locktimestamp) {
						//Log::debug("Log: /remote/lib/configuration/configobj.php - getSourceStats() - Current timestamp: " . $currentimestamp . " Lock timestamp: " . $locktimestamp . " New Source Stats: " . $tmpnewsourcestats['date']);										
						array_push($newsourcestats, $tmpnewsourcestats);					
						$tmpnewsourcestats = array();
						$tmpnewsourcestats['Timestamp'] 				= $locktimestamp;
						$tmpnewsourcestats['BandwidthIn'] 			= $value['BandwidthIn'];
						$tmpnewsourcestats['BandwidthOut'] 			= $value['BandwidthOut'];
						$tmpnewsourcestats['BandwidthTotal'] 		= $value['BandwidthTotal'];
						$tmpnewsourcestats['MemoryUsageTotal'] 	= $value['MemoryUsageTotal'];
						$tmpnewsourcestats['MemoryUsageUsed'] 		= $value['MemoryUsageUsed'];
						$tmpnewsourcestats['MemoryUsageFree'] 		= $value['MemoryUsageFree'];
						$tmpnewsourcestats['MemoryUsagePercent'] 	= $value['MemoryUsagePercent'];											
						$tmpnewsourcestats['DiskUsageTotal'] 		= $value['DiskUsageTotal'];
						$tmpnewsourcestats['DiskUsageFree'] 		= $value['DiskUsageFree'];
						$tmpnewsourcestats['DiskUsagePercent'] 	= $value['DiskUsagePercent'];
						$tmpnewsourcestats['DiskUsageUsed'] 		= $value['DiskUsageUsed'];											
						$tmpnewsourcestats['CPUUsagePercent'] 		= $value['CPUUsagePercent'];
						$tmpnewsourcestats['cpt'] 						= 1;	
					} else {
						$tmpnewsourcestats['BandwidthIn'] 			= $tmpnewsourcestats['BandwidthIn'] + $value['BandwidthIn'];
						$tmpnewsourcestats['BandwidthOut'] 			= $tmpnewsourcestats['BandwidthOut'] + $value['BandwidthOut'];
						$tmpnewsourcestats['BandwidthTotal'] 		= $tmpnewsourcestats['BandwidthTotal'] + $value['BandwidthTotal'];
						$tmpnewsourcestats['MemoryUsageTotal'] 	= $tmpnewsourcestats['MemoryUsageTotal'] + $value['MemoryUsageTotal'];
						$tmpnewsourcestats['MemoryUsageUsed'] 		= $tmpnewsourcestats['MemoryUsageUsed'] + $value['MemoryUsageUsed'];
						$tmpnewsourcestats['MemoryUsageFree'] 		= $tmpnewsourcestats['MemoryUsageFree'] + $value['MemoryUsageFree'];
						$tmpnewsourcestats['MemoryUsagePercent'] 	= $tmpnewsourcestats['MemoryUsagePercent'] + $value['MemoryUsagePercent'];						
						$tmpnewsourcestats['DiskUsageTotal'] 		= $tmpnewsourcestats['DiskUsageTotal'] + $value['DiskUsageTotal'];
						$tmpnewsourcestats['DiskUsageFree'] 		= $tmpnewsourcestats['DiskUsageFree'] + $value['DiskUsageFree'];
						$tmpnewsourcestats['DiskUsagePercent'] 	= $tmpnewsourcestats['DiskUsagePercent'] + $value['DiskUsagePercent'];
						$tmpnewsourcestats['DiskUsageUsed'] 		= $tmpnewsourcestats['DiskUsageUsed'] + $value['DiskUsageUsed'];															
						$tmpnewsourcestats['CPUUsagePercent'] 		= $tmpnewsourcestats['CPUUsagePercent'] + $value['CPUUsagePercent'];
						$tmpnewsourcestats['cpt'] 						= $tmpnewsourcestats['cpt'] + 1;
					}	
				}	
			}
			foreach($newsourcestats as $key=>$value) {
				$newsourcestats[$key]['BandwidthIn'] 			= round($newsourcestats[$key]['BandwidthIn'] / $value['cpt']);
				$newsourcestats[$key]['BandwidthOut'] 			= round($newsourcestats[$key]['BandwidthOut'] / $value['cpt']);
				$newsourcestats[$key]['BandwidthTotal'] 		= round($newsourcestats[$key]['BandwidthTotal'] / $value['cpt']);
				$newsourcestats[$key]['MemoryUsageTotal'] 	= round($newsourcestats[$key]['MemoryUsageTotal'] / $value['cpt']);
				$newsourcestats[$key]['MemoryUsageUsed'] 		= round($newsourcestats[$key]['MemoryUsageUsed'] / $value['cpt']);
				$newsourcestats[$key]['MemoryUsageFree'] 		= round($newsourcestats[$key]['MemoryUsageFree'] / $value['cpt']);
				$newsourcestats[$key]['MemoryUsagePercent'] 	= round($newsourcestats[$key]['MemoryUsagePercent'] / $value['cpt']);				
				$newsourcestats[$key]['DiskUsageTotal'] 		= round($newsourcestats[$key]['DiskUsageTotal'] / $value['cpt']);
				$newsourcestats[$key]['DiskUsageFree'] 		= round($newsourcestats[$key]['DiskUsageFree'] / $value['cpt']);
				$newsourcestats[$key]['DiskUsagePercent'] 	= round($newsourcestats[$key]['DiskUsagePercent'] / $value['cpt']);
				$newsourcestats[$key]['DiskUsageUsed'] 		= round($newsourcestats[$key]['DiskUsageUsed'] / $value['cpt']);				
				$newsourcestats[$key]['CPUUsagePercent'] 		= round($newsourcestats[$key]['CPUUsagePercent'] / $value['cpt']);
			}		
			return $newsourcestats;				
		}
	}
	
}


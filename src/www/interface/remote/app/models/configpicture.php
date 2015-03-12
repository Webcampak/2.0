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
 * @class Configpicture
 */
class Configpicture  { //extends Model {
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/configpicture.php - all() function");
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true) {
			$configObj = new ConfigObj();
			$configSettings = $configObj->getSettings("config-source" . $sourceid . ".cfg", $sourceid, NULL);
			return $configSettings;
		}
	}

	static function update($params) {
		Log::debug("Log: /remote/lib/models/configpicture.php - update() function");
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true && $userAuth->isAllowedToEditSource($sourceid) == true) {
			//Log::printrhtml($params);
			$configObj = new ConfigObj();
			$configSettingsInit = $configObj->getSettings("config-source" . $sourceid . ".cfg", $sourceid, NULL);
			$configSettingsNew = array();
			$configSettingsTmp = array();			
			foreach($params as $key=>$value) {
				$value = strval($value);
				if (isset($configSettingsInit[$key]) && $configSettingsInit[$key] != $value) {
					if (substr($key, 0,14) == "cfghotlinksize" && $value == "") {$value = "off";}	
					Log::edit("config-source" . $sourceid . ".cfg", $key, $configSettingsInit[$key], $value);
					$configSettingsNew[$key] = $value;
				}
				$configSettingsTmp[$key] = $value;
			}

			if (isset($configSettingsNew['cfgcopymainsourceid'])) {
				if ($configSettingsNew['cfgcopymainsourceid'] > 0) {
					if ($userAuth->isAllowedToAccessSource($sourceid) == true) {
						Log::debug("Log: /remote/lib/models/configcapture.php - update() - User is allowed to copy pictures from source id: " . $configSettingsNew['cfgcopymainsourceid']);											
					} else {
						Log::debug("Log: /remote/lib/models/configcapture.php - update() - User is NOT allowed to copy pictures from source id: " . $configSettingsNew['cfgcopymainsourceid']);																	
						$configSettingsNew['cfgcopymainsourceid'] = "no";						
					}
			  	} else {
						$configSettingsNew['cfgcopymainsourceid'] = "no";																							  		
			  	}
			}	
			
			if (isset($configSettingsNew['cfgcopysecondsourceid'])) {
				if ($configSettingsNew['cfgcopysecondsourceid'] > 0) {
					if ($userAuth->isAllowedToAccessSource($sourceid) == true) {
						Log::debug("Log: /remote/lib/models/configcapture.php - update() - User is allowed to copy pictures from source id: " . $configSettingsNew['cfgcopysecondsourceid']);											
					} else {
						Log::debug("Log: /remote/lib/models/configcapture.php - update() - User is NOT allowed to copy pictures from source id: " . $configSettingsNew['cfgcopysecondsourceid']);	
						$configSettingsNew['cfgcopysecondsourceid'] = "no";																							
					}
			  	} else {
						$configSettingsNew['cfgcopysecondsourceid'] = "no";																							  		
			  	}
			}				
					
			// Send new settings to configuration file		
			$configObj->writeSettings("config-source" . $sourceid . ".cfg", $configSettingsNew);
								
			$response->status['message'] = _("Configuration successfully updated");						
			$response->status['success'] = 1;
			return $response;
		} else {
			Log::debug("Log: /remote/lib/models/configpicture.php - update() - User not allowed to edit source");	
			return false;
		}
	}
}



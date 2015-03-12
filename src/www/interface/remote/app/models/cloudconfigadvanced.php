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
 * @class Cloudconfigadvanced
 */
class Cloudconfigadvanced  { //extends Model {
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/cloudconfigadvanced.php - all() function");
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true) {
			$configObj = new ConfigObj();
			$configSettings = $configObj->getSettings("config-source" . $sourceid . ".cfg", $sourceid, unserialize(CFGCLOUD_ADVANCED));
			return $configSettings;
		}
	}

	static function update($params) {
		Log::debug("Log: /remote/lib/models/cloudconfigadvanced.php - update() function");
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true && $userAuth->isAllowedToEditSource($sourceid) == true) {
			//Log::printrhtml($params);
			$configObj = new ConfigObj();
			$configSettingsInit = $configObj->getSettings("config-source" . $sourceid . ".cfg", $sourceid, unserialize(CFGCLOUD_ADVANCED));
			$configSettingsNew = array();
			$configSettingsTmp = array();			
			foreach($params as $key=>$value) {
				$value = strval($value);
				if (isset($configSettingsInit[$key]) && $configSettingsInit[$key] != $value) {
					if (in_array($key, unserialize(CFGCLOUD_ADVANCED))) { // we look into this list to find the current key, if found, key is added, otherwise key is discarded
						Log::edit("config-source" . $sourceid . ".cfg", $key, $configSettingsInit[$key], $value);
						$configSettingsNew[$key] = $value;
					}
				}
				$configSettingsTmp[$key] = $value;
			}
								
			// Send new settings to configuration file		
			$configObj->writeSettings("config-source" . $sourceid . ".cfg", $configSettingsNew);
			
			//Update cron because cron settings have been updated
			if (isset($configSettingsNew['cfgcroncapturevalue']) || isset($configSettingsNew['cfgcroncaptureinterval'])) {
				Log::debug("Log: /remote/lib/models/cloudconfigadvanced.php - update() - Update global cron");					
				passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updatecrontab");
			}	

			//Update cron because FTP settings have been updated
			if (isset($configSettingsNew['cfglocalftppass'])) {
				Log::debug("Log: /remote/lib/models/cloudconfigadvanced.php - update() - Update global FTP configuration");					
				passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updateftp");
			}
					
			$response->status['message'] = _("Configuration successfully updated");						
			$response->status['success'] = 1;
			return $response;
		} else {
			Log::debug("Log: /remote/lib/models/cloudconfigadvanced.php - update() - User not allowed to edit source");	
			return false;
		}
	}
}




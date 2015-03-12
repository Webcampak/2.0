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
 * @class Configsystem
 */
class Configsystem  { //extends Model {
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/configsystem.php - all() function");
		$configObj = new ConfigObj();
		$configSettings = $configObj->getSettings("config-general.cfg", NULL, NULL);
		return $configSettings;
	}

	static function update($params) {
		Log::debug("Log: /remote/lib/models/configsystem.php - update() function");
		//Log::printrhtml($params);
		$configObj = new ConfigObj();
		$configSettingsInit = $configObj->getSettings("config-general.cfg", NULL, NULL);
		$configSettingsNew = array();
		$configSettingsTmp = array();			
		foreach($params as $key=>$value) {
			$value = strval($value);
			if (isset($configSettingsInit[$key]) && $configSettingsInit[$key] != $value) {
				Log::edit("config-general.cfg", $key, $configSettingsInit[$key], $value);
				$configSettingsNew[$key] = $value;
			}
			$configSettingsTmp[$key] = $value;
		}
				
		// Send new settings to configuration file		
		$configObj->writeSettings("config-general.cfg", $configSettingsNew);
		
		//Update cron because cron settings have been updated
		if (isset($configSettingsNew['cfgftpresourcespassword'])) {
			Log::debug("Log: /remote/lib/models/configsystem.php - update() - Update global FTP configuration");					
			passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updateftp");
		}
				
		$response->status['message'] = _("Configuration successfully updated");						
		$response->status['success'] = 1;
		return $response;
	}
}




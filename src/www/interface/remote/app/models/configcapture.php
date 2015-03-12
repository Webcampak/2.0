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
class Configcapture  { 
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/configcapture.php - all() function");
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true) {
			$configObj = new ConfigObj();
			$configSettings = $configObj->getSettings("config-source" . $sourceid . ".cfg", $sourceid, NULL);
			return $configSettings;
		}
	}

	static function update($params) {
		Log::debug("Log: /remote/lib/models/configcapture.php - update() function");
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
					Log::edit("config-source" . $sourceid . ".cfg", $key, $configSettingsInit[$key], $value);
					$configSettingsNew[$key] = $value;
				}
				$configSettingsTmp[$key] = $value;
			}
			//We just test on the first one, if != "", update all records
			if (isset($configSettingsTmp['cfgcapturedayenable1']) && $configSettingsTmp['cfgcapturedayenable1'] != "") {
				for ($i=1;$i<8; $i++) {
					if (strip_tags($configSettingsTmp["cfgcapturedayenable" . $i]) == "off") { $subcfgcapturedayenable = "no";}
					else { $subcfgcapturedayenable = "yes";}
					$subcfgcapturestarthour = strip_tags($configSettingsTmp["cfgcapturestarthour" . $i]);
					$subcfgcapturestartminute = strip_tags($configSettingsTmp["cfgcapturestartminute" . $i]);
					$subcfgcapturesendhour = strip_tags($configSettingsTmp["cfgcapturesendhour" . $i]);
					$subcfgcapturesendminute = strip_tags($configSettingsTmp["cfgcapturesendminute" . $i]);
					if ($subcfgcapturestarthour < 10) {$subcfgcapturestarthour = '0' . $subcfgcapturestarthour;}
					if ($subcfgcapturestartminute < 10) {$subcfgcapturestartminute = '0' . $subcfgcapturestartminute;}
					if ($subcfgcapturesendhour < 10) {$subcfgcapturesendhour = '0' . $subcfgcapturesendhour;}
					if ($subcfgcapturesendminute < 10) {$subcfgcapturesendminute = '0' . $subcfgcapturesendminute;}					
					$configSettingsNew["cfgcronday" . $i] = $subcfgcapturedayenable . "\",\"" . $subcfgcapturestarthour . "\",\"" . $subcfgcapturestartminute . "\",\"" . $subcfgcapturesendhour . "\",\"" . $subcfgcapturesendminute;
				}				
			}	
			if (isset($configSettingsNew['cfgcroncapturevalue'])) {
				if (isset($configSettingsNew['cfgcroncaptureinterval'])) {$captureInterval = $configSettingsNew['cfgcroncaptureinterval'];}
				else {$captureInterval = $configSettingsInit['cfgcroncaptureinterval'];}
				if ($captureInterval == "seconds") {
					if(60 % (int) $configSettingsNew['cfgcroncapturevalue'] != 0) {
						Log::debug("Log: /remote/lib/models/configcapture.php - update() - ERROR: capture frequency(" . $configSettingsNew['cfgcroncapturevalue'] . ") should be either 5, 10, 15, 20, 30 when capturing under a minute");						
						$configSettingsNew['cfgcroncapturevalue'] = $configSettingsInit['cfgcroncapturevalue'];
					}
				}		
			}

			if (isset($configSettingsNew['cfgsourcewpakgetsourceid'])) {
				if ($configSettingsNew['cfgsourcewpakgetsourceid'] > 0) {
					if ($userAuth->isAllowedToAccessSource($sourceid) == true) {
						Log::debug("Log: /remote/lib/models/configcapture.php - update() - User is allowed to get pictures from source id: " . $configSettingsNew['cfgsourcewpakgetsourceid']);											
					} else {
						Log::debug("Log: /remote/lib/models/configcapture.php - update() - User is NOT allowed to get pictures from source id: " . $configSettingsNew['cfgsourcewpakgetsourceid']);																	
						$configSettingsNew['cfgsourcewpakgetsourceid'] = "no";								
					}
			  	} else {
					$configSettingsNew['cfgsourcewpakgetsourceid'] = "no";								  		
			  	}
			}			
					
			
			// Send new settings to configuration file		
			$configObj->writeSettings("config-source" . $sourceid . ".cfg", $configSettingsNew);
			
			//Update cron because settings may have been updated
			if (isset($configSettingsNew['cfgcroncapturevalue']) || isset($configSettingsNew['cfgcroncaptureinterval'])) {
				Log::debug("Log: /remote/lib/models/configcapture.php - update() - Update global cron");					
				passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updatecrontab");
			}	

			//Update ftp because settings may have been updated
			if (isset($configSettingsNew['cfglocalftppass'])) {
				Log::debug("Log: /remote/lib/models/configcapture.php - update() - Update global FTP configuration");					
				passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updateftp");
			}

			//Update gphoto owner if settings has changed
			if (isset($configSettingsNew['cfgsourcegphotoowner'])) {
				Log::debug("Log: /remote/lib/models/configcapture.php - update() - Update gphoto owner");					
				passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- updatecrontab " . $sourceid);
			}	
					
			$response->status['message'] = _("Configuration successfully updated");						
			$response->status['success'] = 1;
			return $response;
		} else {
			Log::debug("Log: /remote/lib/models/configcapture.php - update() - User not allowed to edit source");	
			return false;
		}
	}
}




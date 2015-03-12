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
 * @class Configinstantcapture
 */
class Configinstantcapture  { 
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/configinstantcapture.php - all() function");

		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true && $userAuth->isAllowedToEditSource($sourceid) == true) {
			if (isset($_REQUEST["capture"]) && $_REQUEST["capture"] == "true") {
				$instantcapture = array();
				//First, we block automated capture on the source by setting cfgnocapture="yes"
				$configObj = new ConfigObj();				
				$configSettingsInit = $configObj->getSettings("config-source" . $sourceid . ".cfg", $sourceid, NULL);	
				if ($configSettingsInit["cfgnocapture"] == "no") {
					$configSettingsNew = array();
					Log::edit("config-source" . $sourceid . ".cfg", "cfgnocapture", $configSettingsInit["cfgnocapture"], "yes");
					Log::debug("Log: /remote/lib/models/configinstantcapture.php - all() - Disabling automated capture");					
					$configSettingsNew["cfgnocapture"] = "yes";		
					$configObj->writeSettings("config-source" . $sourceid . ".cfg", $configSettingsNew);								
				}	

				//Automated capture is now blocked on the source, we can proceed with instant capture
				Log::debug("Log: /remote/lib/models/configinstantcapture.php - update() - Sleep 10s before capturing picture");	
				sleep(5); // Sleep the request during 5s to give time any previous capture process to complete		
				Log::debug("Log: /remote/lib/models/configinstantcapture.php - update() - Starting capture");				
				Log::debug("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- samplerecord " . $sourceid);							
				passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- samplerecord " . $sourceid);
				
				Log::debug("Log: /remote/lib/models/configinstantcapture.php - update() - Looking for latest captured picture");					
				$picsfs = new PicturesFS();
				$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/";
				$currentpicture = $picsfs->getPicture($targetdir, "last");			
				if (is_file($targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture)) {
					Log::debug("Log: /remote/lib/models/picturesview.php - all() - Check Picture: " . $targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture);								
					$instantcapture = array();
					$instantcapture['id'] = substr($currentpicture, 0,14);
					$instantcapture['sourceid'] = $sourceid;
					$instantcapture['picture'] = CFGDIR_TIMTHUMB . "?src=pictures/" . substr($currentpicture, 0,8) . "/" . $currentpicture . "&s=" . $sourceid . "&q=100";		
					list($picwidth, $picheight, $pictype, $attr) = getimagesize($targetdir . substr($currentpicture, 0,8) . "/" . $currentpicture);
					$instantcapture['picturewidth'] = $picwidth;			
					$instantcapture['pictureheight'] = $picheight;										
					$instantcapture['picturetime'] = substr($currentpicture, 0,14);	
					
					//array_push($instantcapture, $tmpresults);									
				}
		
				// We activate back automated capture by setting cfgnocapture="no"		
				if ($configSettingsInit["cfgnocapture"] == "no") {		
					Log::edit("config-source" . $sourceid . ".cfg", "cfgnocapture", $configSettingsInit["cfgnocapture"], "no");
					Log::debug("Log: /remote/lib/models/configinstantcapture.php - all() - Enabling automated capture");										
					$configSettingsNew = array();					
					$configSettingsNew["cfgnocapture"] = "no";		
					$configObj->writeSettings("config-source" . $sourceid . ".cfg", $configSettingsNew);							
				}				
				
				return $instantcapture;
				
			
			}
		}

	}

}

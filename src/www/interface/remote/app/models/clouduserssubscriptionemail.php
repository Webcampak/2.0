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
 * @class Clouduserssubscriptionemail
 */
class Clouduserssubscriptionemail  { 
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/cloudconfigwatermarkfile.php - all() function");

		$subscriptionemail = array();
		if (isset($_REQUEST["language"])) {	
			$tmpsubscriptionemail = array();		
			if(is_file(CFGDIR_ROOT . "locale/" . strip_tags($_REQUEST["language"]) . "/messages/subscriptionEmailContent.txt")) {		
				$tmpsubscriptionemail['content'] = file_get_contents(CFGDIR_ROOT . "locale/" . strip_tags($_REQUEST["language"]) . "/messages/subscriptionEmailContent.txt");
			}
			if(is_file(CFGDIR_ROOT . "locale/" . strip_tags($_REQUEST["language"]) . "/messages/subscriptionEmailSubject.txt")) {		
				$tmpsubscriptionemail['subject'] = file_get_contents(CFGDIR_ROOT . "locale/" . strip_tags($_REQUEST["language"]) . "/messages/subscriptionEmailSubject.txt");
			}		
			$configObj = new ConfigObj();
			$configServerSettings = $configObj->getSettings("config-general.cfg", NULL, NULL);
			if ($configServerSettings['cfgserverurl'] != '') {
				$tmpsubscriptionemail['serverurl'] = $configServerSettings['cfgserverurl'];	
			}
			array_push($subscriptionemail, $tmpsubscriptionemail);			
		}
		return $subscriptionemail;
		
	}

}

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
 * @class Configcameraport
 */
class Configcameraport  { //extends Model {
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/configcameraport.php - all() function");
		
		passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- 1  gphoto2usbports");
		if (is_file("/tmp/gphoto2ports")) {
			Log::debug("Log: /remote/lib/models/configcameraport.php - all() - List of gphoto ports collected, processing");
			$gphotoports = array();	
			$fd = @fopen("/tmp/gphoto2ports","r");	
			$tmpgphotoports = array();
			$tmpgphotoports['id'] = "automatic";
			$tmpgphotoports['name'] = "automatic";	
			array_push($gphotoports, $tmpgphotoports);			
	   	while (!feof($fd)) {	
				$ligne = fgets($fd, 1024);
		     	if (!feof($fd)) {
		     		if ($ligne != "") {
							$tmpgphotoports = array();
							$tmpgphotoports['id'] = trim($ligne);
							$tmpgphotoports['name'] = trim($ligne);
							array_push($gphotoports, $tmpgphotoports);
		       		}
		        }
			}
			fclose($fd);
			return $gphotoports;				
		} else {
			Log::debug("Log: /remote/lib/models/configcameraport.php - all() - ERROR, unable to get list of gphoto ports");						
		}
	}

}

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
 * @class Configwebcamport
 */
class Configwebcamport  { //extends Model {
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/app/models/configwebcamport.php - all() function");
					
		$usbbustxt = array();
		$tmpusbbustxt = array();
		$tmpusbbustxt['id'] = "disabled";
		$tmpusbbustxt['name'] = "disabled";	
		array_push($usbbustxt, $tmpusbbustxt);			
		passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- v4l");
		for ($i=0;$i<10;$i++) {
			if (is_file("/tmp/v4linfo" . $i)) {
				Log::debug("Log: /remote/lib/models/configwebcamport.php - all() - Processing /dev/video" . $i);					
				$convert = explode("\n", file_get_contents("/tmp/v4linfo" . $i)); //create array separate by new line
				for ($j=0;$j<count($convert);$j++)  {
					if (strpos($convert[$j], "bus_info") != False) {
						list($junk, $bus_info) = explode("usb", $convert[$j]);
						$bus_info = "usb" . $bus_info;
						$bus_info = substr_replace($bus_info ,"",-1);
						$tmpusbbustxt = array();
						$tmpusbbustxt['id'] = $bus_info;
						$tmpusbbustxt['name'] = $bus_info;	
						array_push($usbbustxt, $tmpusbbustxt);
						break;
					}	
				}
			}
		}
		return $usbbustxt;
	}

}

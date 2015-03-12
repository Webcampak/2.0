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
class Configconnecteddevice  { 
	public $id, $attributes;	

	static function all() {
		$connecteddevices = array();
		$connecteddevices['gphotolist'] = exec(CFGDIR_GPHOTO . 'gphoto2 --auto-detect > /tmp/gphotocam');
		$connecteddevices['gphotolist'] = file_get_contents("/tmp/gphotocam");

		$connecteddevices['gphotocapabilities'] = '';
		passthru("sudo -u " . CFGSYS_SYSTEMUSER . " /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- gphoto2usbports");
		if (is_file("/tmp/gphoto2ports")) {
			$fd = @fopen("/tmp/gphoto2ports","r");	
			$cptports=0;
	   	while (!feof($fd)) {	
				$ligne = fgets($fd, 1024);
		     	if (!feof($fd)) {
		     		if ($ligne != "") {
							$camcapabilities = exec(CFGDIR_GPHOTO . "gphoto2 --port " . trim($ligne) . " --abilities > /tmp/gphotoabilities");
							passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- getowner " . trim($ligne));							
		       			$connecteddevices['gphotocapabilities'] = $connecteddevices['gphotocapabilities'] . '' . file_get_contents("/tmp/gphotoabilities");
		       			unlink("/tmp/gphotoabilities");
		       			$cptports++;
		       		}
		        }
			}
			fclose($fd);		
		} 

		$connecteddevices['lsusb'] = exec('lsusb > /tmp/lsusb');
		$connecteddevices['lsusb'] = file_get_contents("/tmp/lsusb");

		passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- v4l");		
		//$camcapabilities = exec('v4l-info > /tmp/v4linfo');
		for ($i=0;$i<10;$i++) {
			if (is_file("/tmp/v4linfo" . $i)) {
				$connecteddevices['videostd' . $i] = file_get_contents("/tmp/v4linfo" . $i);
			}	
			if (is_file("/tmp/v4lctl" . $i)) {
				$connecteddevices['videoadv' . $i] = file_get_contents("/tmp/v4lctl" . $i);
			}			
		}
		return $connecteddevices;
	}
}

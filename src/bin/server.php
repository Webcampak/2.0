<?php
// Copyright 2010-2012 Infracom & Eurotechnia (support@webcampak.com)
// This file is part of the Webcampak project.
// Webcampak is free software: you can redistribute it and/or modify it 
// under the terms of the GNU General Public License as published by 
// the Free Software Foundation, either version 3 of the License, 
// or (at your option) any later version.

// WiTo is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
// even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
// See the GNU General Public License for more details.

// You should have received a copy of the GNU General Public License along with Webcampak. 
// If not, see http://www.gnu.org/licenses/.


require("/home/tmpusername/webcampak/etc/interface.config.php");


if (strip_tags($argv[1]) == "sourcecreatedir") {
	//Called from /remote/lib/database/sources.php - updateSource()
	$sourceid = $argv[2];	
	
	// Create directories
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/");
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/");
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/tmp/");
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/live/");
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/videos/");
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/");
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/stats");	
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/audio");
	exec("mkdir " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/watermark");
	error_log("PHP PASSTROUGH: Server.php: - sourcecreatedir - Source directories created", 0);	

	//Copy and prepare .htaccess file to restrict access to directories
	exec("cp " . CFGDIR_INITCONF . "../config/sourceshtaccess " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/.htaccess");
	exec("echo ' ' >> " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/.htaccess");
	exec("echo 'require group " . $sourceid . "' >> " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/.htaccess");	
	exec("echo ' ' >> " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/.htaccess");	
	error_log("PHP PASSTROUGH: Server.php: - sourcecreatedir - .htaccess file created", 0);	
}
else if (strip_tags($argv[1]) == "sourcecreateconf") {
	//Called from /remote/lib/database/sources.php - updateSource()
	$sourceid = $argv[2];	
	// Create configuration files
	exec("cp " . CFGDIR_INITCONF . "config-source.cfg" . " " . 					CFGDIR_CONF . "config-source" . $sourceid . ".cfg");	
	exec("cp " . CFGDIR_INITCONF . "config-source-video.cfg" . " " . 			CFGDIR_CONF . "config-source" . $sourceid . "-video.cfg");	
	exec("cp " . CFGDIR_INITCONF . "config-source-videocustom.cfg" . " " . 	CFGDIR_CONF . "config-source" . $sourceid . "-videocustom.cfg");	
	exec("cp " . CFGDIR_INITCONF . "config-source-videopost.cfg" . " " . 	CFGDIR_CONF . "config-source" . $sourceid . "-videopost.cfg");	
	exec("cp " . CFGDIR_INITCONF . "config-source-ftpservers.cfg" . " " .	CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg");		
	error_log("PHP PASSTROUGH: Server.php: - sourcecreateconf - Source configuration files created", 0);	
	
	//Change default passwword to a random generated one
	exec('sed -i "s/tmppassword/$(pwgen -1)/" ' . CFGDIR_CONF . "config-source" . $sourceid . ".cfg");
	error_log("PHP PASSTROUGH: Server.php: Temp password updated in config file", 0);	
	
	//Change permissions so that it can be edited by web server
	exec("chmod 777 " . CFGDIR_CONF . "config-source" . $sourceid . ".cfg");
	exec("chmod 777 " . CFGDIR_CONF . "config-source" . $sourceid . "-video.cfg");
	exec("chmod 777 " . CFGDIR_CONF . "config-source" . $sourceid . "-videocustom.cfg");
	exec("chmod 777 " . CFGDIR_CONF . "config-source" . $sourceid . "-videopost.cfg");
	exec("chmod 777 " . CFGDIR_CONF . "config-source" . $sourceid . "-ftpservers.cfg");	
	error_log("PHP PASSTROUGH: Server.php: - sourcecreateconf - Permission updated for source configuration files", 0);	
}
else if (strip_tags($argv[1]) == "updatecrontab") {
	//Re-generate crontab
	exec ("python " . CFGDIR_BINDIR . "wpak-cronupdatefile.py -g " . CFGDIR_CONF . "/config-general.cfg");
	error_log("PHP PASSTROUGH: Server.php: - sourcecreateconf - Crontab file refreshed", 0);	
}

else if (strip_tags($argv[1]) == "sourcecreateftp") {
	//Called from /remote/lib/database/sources.php - updateSource()
	$sourceid = $argv[2];		

	// Create FTP Configuration
	if (!is_file("/etc/vsftpd/vsftpd_user_conf/source" . $sourceid)) {
		exec('echo "local_root=/home/' . CFGSYS_SYSTEMUSER . '/webcampak/sources/source' . $sourceid . '/" > /etc/vsftpd/vsftpd_user_conf/source' . $sourceid);
		exec('echo " " >> /etc/vsftpd/vsftpd_user_conf/source' . $sourceid);	
		exec('cat ' . CFGDIR_INITCONF . '../config/vsftpd-source >> /etc/vsftpd/vsftpd_user_conf/source' . $sourceid);			
		error_log("PHP PASSTROUGH: Server.php: - sourcecreateftp - FTP configuration created", 0);	
	} else {
		error_log("PHP PASSTROUGH: Server.php: - sourcecreateftp - FTP configuration already exists", 0);		
	}
}

else if (strip_tags($argv[1]) == "updateftp") {
		// Refresh FTP configuration		
 		exec ("python " . CFGDIR_BINDIR . "wpak-createlocalftpaccounts.py -g " . CFGDIR_CONF . "config-general.cfg");
	error_log("PHP PASSTROUGH: Server.php: - updateftp - FTP configuration updated", 0);	
}



else if (strip_tags($argv[1]) == "sourcedeleteconf") {
	//Called from /remote/lib/database/sources.php - updateSource()
	$sourceid = $argv[2];		

	exec('rm ' . CFGDIR_CONF . 'config-source' . $sourceid . '.cfg');
	exec('rm ' . CFGDIR_CONF . 'config-source' . $sourceid . '-video.cfg');
	exec('rm ' . CFGDIR_CONF . 'config-source' . $sourceid . '-videocustom.cfg');
	exec('rm ' . CFGDIR_CONF . 'config-source' . $sourceid . '-videopost.cfg');
	exec('rm ' . CFGDIR_CONF . 'config-source' . $sourceid . '-ftpservers.cfg');

	error_log("PHP PASSTROUGH: Server.php: - sourcedelete - Source configuration files deleted", 0);
}

else if (strip_tags($argv[1]) == "sourcedeletecontent") {
	//Called from /remote/lib/database/sources.php - updateSource()
	$sourceid = $argv[2];		

	exec('mv ' . CFGDIR_SOURCESDIR . 'source' . $sourceid . ' ' . CFGDIR_SOURCESDIR . 'del-source' . $sourceid);
	error_log("PHP PASSTROUGH: Server.php: - sourcedelete - Source content deleted", 0);

}

else if (strip_tags($argv[1]) == "samplerecord") {
	//Called from /remote/lib/database/sources.php - updateSource()
	$sourceid = $argv[2];
 	exec ("python " . CFGDIR_BINDIR . "webcampak.py -t capturesample -s " . $sourceid);
	error_log("PHP PASSTROUGH: Server.php: - samplerecord - Capturing a sample picture for source:" . $sourceid, 0);
}

else if (strip_tags($argv[1]) == "reboot") {
	error_log("PHP PASSTROUGH: Server.php: - reboot", 0);
	exec ("reboot");
}

else if (strip_tags($argv[1]) == "gphotoassign") {
	error_log("PHP PASSTROUGH: Server.php: - Assign gphoto owner to camera", 0);
	$sourceid = $argv[2];
	
	require("/home/webcampak/webcampak/www/interface/remote/lib/configuration/configobj.php");
	
	$configObj = new ConfigObj();		
	$configSettings = $configObj->getSettings("config-source" . $sourceid . ".cfg", $sourceid);	
	//$cfgsourcegphotocameraportdetail = wito_getconfig($config_witoconfig, "cfgsourcegphotocameraportdetail");
	//$cfgsourcegphotoowner = wito_getconfig($config_witoconfig, "cfgsourcegphotoowner");	
	exec ("gphoto2 --port " . $configSettings["cfgsourcegphotocameraportdetail"] . " --set-config /main/settings/ownername=" . $configSettings["cfgsourcegphotoowner"] ." "); 
}


else if (strip_tags($argv[1]) == "gphoto2usbports") {
	error_log("PHP PASSTROUGH: Server.php: - Capture gphoto2 USB ports", 0);	
	exec ('gphoto2 --auto-detect |egrep -o "usb:...,..." > /tmp/gphoto2ports');
}

else if (strip_tags($argv[1]) == "getowner") {
	$usbport = $argv[2];
	error_log("PHP PASSTROUGH: Server.php: - Get camera owner from usb port: " . $usbport, 0);	
 	exec ("gphoto2 --port " . $usbport . " --get-config=/main/settings/ownername >> /tmp/gphotoabilities");
}

else if (strip_tags($argv[1]) == "v4l") {
	error_log("PHP PASSTROUGH: Server.php: - Get V4L details", 0);	
	exec ("rm /tmp/v4linfo*");
	exec ("rm /tmp/v4lctl*"); 
	exec ("v4l-info /dev/video0 > /tmp/v4linfo0");
	exec ("v4l-info /dev/video1 > /tmp/v4linfo1");
	exec ("v4l-info /dev/video2 > /tmp/v4linfo2");
	exec ("v4l-info /dev/video3 > /tmp/v4linfo3");
	exec ("v4l-info /dev/video4 > /tmp/v4linfo4");
	exec ("v4l-info /dev/video5 > /tmp/v4linfo5");
	exec ("v4l-info /dev/video6 > /tmp/v4linfo6");
	exec ("v4l-info /dev/video7 > /tmp/v4linfo7");
	exec ("v4l-info /dev/video8 > /tmp/v4linfo8");
	exec ("v4l-info /dev/video9 > /tmp/v4linfo9");

	if (filesize("/tmp/v4linfo0") > "10") { exec ("v4lctl -c /dev/video0 list > /tmp/v4lctl0");}
	if (filesize("/tmp/v4linfo1") > "10") { exec ("v4lctl -c /dev/video1 list > /tmp/v4lctl1");}
	if (filesize("/tmp/v4linfo2") > "10") { exec ("v4lctl -c /dev/video2 list > /tmp/v4lctl2");}
	if (filesize("/tmp/v4linfo3") > "10") { exec ("v4lctl -c /dev/video3 list > /tmp/v4lctl3");}
	if (filesize("/tmp/v4linfo4") > "10") { exec ("v4lctl -c /dev/video4 list > /tmp/v4lctl4");}
	if (filesize("/tmp/v4linfo5") > "10") { exec ("v4lctl -c /dev/video5 list > /tmp/v4lctl5");}
	if (filesize("/tmp/v4linfo6") > "10") { exec ("v4lctl -c /dev/video6 list > /tmp/v4lctl6");}
	if (filesize("/tmp/v4linfo7") > "10") { exec ("v4lctl -c /dev/video7 list > /tmp/v4lctl7");}
	if (filesize("/tmp/v4linfo8") > "10") { exec ("v4lctl -c /dev/video8 list > /tmp/v4lctl8");}
	if (filesize("/tmp/v4linfo9") > "10") { exec ("v4lctl -c /dev/video9 list > /tmp/v4lctl9");}
}

/*

$config_source = $argv[1];
require("/home/webcampak/webcampak/etc/admin.config.php");
exec ("echo $(date) ' --------------------------' >> " . $config_logdirectory . "passthru.log");

if (strip_tags($argv[2]) == "samplerecord") {
 exec ("echo $(date) ' - SAMPLE RECORD: python " . $config_bindirectory . "webcampak.py -t capturesample -s " . $argv[1] . "' >> " . $config_logdirectory . "passthru.log");
 exec ("python " . $config_bindirectory . "webcampak.py -t capturesample -s " . $argv[1]);
}

if (strip_tags($argv[2]) == "getowner") {
//echo "Port: " . $argv[1];
 exec ("echo $(date) ' - GETOWNER: gphoto2 --port $argv[1] --get-config=/main/settings/ownername >> /tmp/gphotoabilities' >> " . $config_logdirectory . "passthru.log");
 exec ("gphoto2 --port " . $argv[1] . " --get-config=/main/settings/ownername >> /tmp/gphotoabilities");
	//echo $test;
}

if (strip_tags($argv[2]) == "gphotoassign") {
	$cfgsourcegphotocameraportdetail = wito_getconfig($config_witoconfig, "cfgsourcegphotocameraportdetail");
	$cfgsourcegphotoowner = wito_getconfig($config_witoconfig, "cfgsourcegphotoowner");	
	//echo "GPHOTO USB: " . $cfgsourcegphotocameraportdetail . " - OWNER: " . $cfgsourcegphotoowner . " - " . $argv[2] . "<br />";
	 exec ("echo $(date) ' - GPHOTO ASSIGN: gphoto2 --port " . $cfgsourcegphotocameraportdetail . " --set-config /main/settings/ownername=" . $cfgsourcegphotoowner . "' >> " . $config_logdirectory . "passthru.log");
	 //exec ("bash " . $config_bindirectory . "/pictures-capture.sh " . $argv[1] . " sample");
	 exec ("gphoto2 --port " . $cfgsourcegphotocameraportdetail . " --set-config /main/settings/ownername=" . $cfgsourcegphotoowner ." "); 
}

if (strip_tags($argv[2]) == "gphoto2usbports") {
 exec ("echo $(date) ' - SAMPLE: gphoto2 --auto-detect |egrep -o usb:...,... > /tmp/gphoto2ports' >> " . $config_logdirectory . "passthru.log");
 exec ('gphoto2 --auto-detect |egrep -o "usb:...,..." > /tmp/gphoto2ports');
}

if (strip_tags($argv[2]) == "calibrateinit") {
 exec ("echo $(date) ' - CALIBRATE INIT: bash " . $config_bindirectory . "/pictures-gphoto-calibrate.sh " . $argv[1] . " init' >> " . $config_logdirectory . "passthru.log");
 exec ("bash " . $config_bindirectory . "/pictures-gphoto-calibrate.sh " . $argv[1] . " init");
}

if (strip_tags($argv[2]) == "calibrateinitapply") {
 exec ("echo $(date) ' - CALIBRATE INIT APPLY: rm " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoapply' >> " . $config_logdirectory . "passthru.log");
 exec ("rm " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoapply");
}

if (strip_tags($argv[2]) == "calibrateapply") {
 exec ("echo $(date) ' - CALIBRATE APPLY: echo '" . $argv[3] . "' >> " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoapply' >> " . $config_logdirectory . "passthru.log");
 exec ("echo " . $argv[3] . " >> " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoapply");
 exec ("echo $(date) ' - CALIBRATE INIT: bash " . $config_bindirectory . "/pictures-gphoto-calibrate.sh " . $argv[1] . " restartconf' >> " . $config_logdirectory . "passthru.log");
 exec ("bash " . $config_bindirectory . "/pictures-gphoto-calibrate.sh " . $argv[1] . " restartconf");
}

if (strip_tags($argv[2]) == "calibrateglobalinitapply") {
 exec ("echo $(date) ' - CALIBRATE GLOBAL INIT APPLY: rm " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoinitparameters' >> " . $config_logdirectory . "passthru.log");
 exec ("rm " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoinitparameters");
}

if (strip_tags($argv[2]) == "calibrateglobalapply") {
 exec ("echo $(date) ' - CALIBRATE GLOBAL APPLY: echo '" . $argv[3] . "' >> " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoinitparameters' >> " . $config_logdirectory . "passthru.log");
 exec ("echo " . $argv[3] . " >> " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoinitparameters");
}

if (strip_tags($argv[2]) == "calibraterestore") {
 exec ("echo $(date) ' - CALIBRATE RESTORE INIT CONF: cp " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoinitparameters " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoapply' >> " . $config_logdirectory . "passthru.log");
 exec ("cp " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoinitparameters " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoapply");
 exec ("echo $(date) ' - CALIBRATE INIT: bash " . $config_bindirectory . "/pictures-gphoto-calibrate.sh " . $argv[1] . " restartconf' >> " . $config_logdirectory . "passthru.log");
 exec ("bash " . $config_bindirectory . "/pictures-gphoto-calibrate.sh " . $argv[1] . " restartconf");
}

if (strip_tags($argv[2]) == "calibraterestoredel") {
 exec ("echo $(date) ' - CALIBRATE RESTORE INIT CONF: rm " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoapply ' >> " . $config_logdirectory . "passthru.log");
 exec ("rm " . $config_etcdirectory . "/source" . $argv[1] . "/gphotoapply ");
}

// Reinitialisation de la configuration des sources
if (strip_tags($argv[2]) == "initconfsources") {
 exec ("echo $(date) ' - INITCONFSOURCES: cp " . $config_initdirectory . "/etc/config-source.cfg " . $config_etcdirectory . "config-source" . $argv[1] . ".cfg ' >> " . $config_logdirectory . "passthru.log");
 exec ("echo $(date) ' - INITCONFSOURCES: cp " . $config_initdirectory . "/etc/config-source-video.cfg " . $config_etcdirectory . "config-source" . $argv[1] . "-video.cfg ' >> " . $config_logdirectory . "passthru.log");
 exec ("echo $(date) ' - INITCONFSOURCES: cp " . $config_initdirectory . "/etc/config-source-videocustom.cfg " . $config_etcdirectory . "config-source" . $argv[1] . "-videocustom.cfg ' >> " . $config_logdirectory . "passthru.log");
 exec ("echo $(date) ' - INITCONFSOURCES: cp " . $config_initdirectory . "/etc/config-source-videopost.cfg " . $config_etcdirectory . "config-source" . $argv[1] . "-videopost.cfg ' >> " . $config_logdirectory . "passthru.log");
 exec ("cp " . $config_initdirectory . "/etc/config-source.cfg " . $config_etcdirectory . "config-source" . $argv[1] . ".cfg");
 exec ("cp " . $config_initdirectory . "/etc/config-source-video.cfg " . $config_etcdirectory . "config-source" . $argv[1] . "-video.cfg");
 exec ("cp " . $config_initdirectory . "/etc/config-source-videocustom.cfg " . $config_etcdirectory . "config-source" . $argv[1] . "-videocustom.cfg");
 exec ("cp " . $config_initdirectory . "/etc/config-source-videopost.cfg " . $config_etcdirectory . "config-source" . $argv[1] . "-videopost.cfg"); 
}

if (strip_tags($argv[2]) == "calibraterefresh") {
 exec ("echo $(date) ' - CALIBRATE INIT: bash " . $config_bindirectory . "/pictures-gphoto-calibrate.sh " . $argv[1] . " init' >> " . $config_logdirectory . "passthru.log");
 exec ("bash " . $config_bindirectory . "/pictures-gphoto-calibrate.sh " . $argv[1] . " refresh");
}

// Reinitialisation de la configuration des sources
if (strip_tags($argv[2]) == "initcontent") {
 exec ("echo $(date) ' - INITCONTENT: rm " . $config_sourcesdirectory . "/source" . $argv[1] . "/* -r ' >> " . $config_logdirectory . "passthru.log");
 exec ("rm " . $config_sourcesdirectory . "/source" . $argv[1] . "/* -r ");
 exec ("echo $(date) ' - INITCONTENT: mkdir " . $config_sourcesdirectory . "/source" . $argv[1] . "/live ' >> " . $config_logdirectory . "passthru.log");
 exec ("mkdir " . $config_sourcesdirectory . "/source" . $argv[1] . "/live ");
 exec ("echo $(date) ' - INITCONTENT: mkdir " . $config_sourcesdirectory . "/source" . $argv[1] . "/pictures ' >> " . $config_logdirectory . "passthru.log");
 exec ("mkdir " . $config_sourcesdirectory . "/source" . $argv[1] . "/pictures "); 
 exec ("echo $(date) ' - INITCONTENT: mkdir " . $config_sourcesdirectory . "/source" . $argv[1] . "/videos ' >> " . $config_logdirectory . "passthru.log");
 exec ("mkdir " . $config_sourcesdirectory . "/source" . $argv[1] . "/videos ");
 exec ("echo $(date) ' - INITCONTENT: mkdir " . $config_sourcesdirectory . "/source" . $argv[1] . "/tmp ' >> " . $config_logdirectory . "passthru.log");
 exec ("mkdir " . $config_sourcesdirectory . "/source" . $argv[1] . "/tmp ");
 exec ("echo $(date) ' - INITCONTENT: cp " . $config_initdirectory . "/indexpictures.php " . $config_sourcesdirectory . "/source" . $argv[1] . "/pictures/index.php ' >> " . $config_logdirectory . "passthru.log");
 exec ("cp " . $config_initdirectory . "/indexpictures.php " . $config_sourcesdirectory . "/source" . $argv[1] . "/pictures/index.php "); 
 exec ("echo $(date) ' - INITCONTENT: cp " . $config_initdirectory . "/indexvideos.php " . $config_sourcesdirectory . "/source" . $argv[1] . "/videos/index.php ' >> " . $config_logdirectory . "passthru.log");
 exec ("cp " . $config_initdirectory . "/indexvideos.php " . $config_sourcesdirectory . "/source" . $argv[1] . "/videos/index.php "); 
 exec ("echo $(date) ' - INITCONTENT: chmod 777 " . $config_sourcesdirectory . "/source" . $argv[1] . "/* -r ' >> " . $config_logdirectory . "passthru.log");
 exec ("chmod 777 " . $config_sourcesdirectory . "/source" . $argv[1] . "/ -R ");
}

// Creation des utilisateurs pour le FTP
if (strip_tags($argv[2]) == "createftpaccounts") {
 exec ("echo $(date) ' - CREATE FTP ACCOUNTS: python " . $config_bindirectory . "wpak-createlocalftpaccounts.py -g ... config-general.cfg' >> " . $config_logdirectory . "passthru.log");
 exec ("python " . $config_bindirectory . "wpak-createlocalftpaccounts.py -g " . $config_etcdirectory . "/config-general.cfg");
}

// Modification du crontab
if (strip_tags($argv[2]) == "updatecron") {
 exec ("echo $(date) ' - UPDATE CRONTAB: python " . $config_bindirectory . "wpak-cronupdatefile.py -g ... config-general.cfg' >> " . $config_logdirectory . "passthru.log");
 exec ("python " . $config_bindirectory . "wpak-cronupdatefile.py -g " . $config_etcdirectory . "/config-general.cfg");
}


if (strip_tags($argv[2]) == "deletepic" && strip_tags($argv[3]) > 2000) {
 exec ("echo $(date) ' - DELETEPIC: rm " . $config_campictures . strip_tags($argv[3]) . "/*.jpg' >> " . $config_logdirectory . "passthru.log");
 exec ("echo $(date) ' - DELETEPIC: rmdir " . $config_campictures . strip_tags($argv[3]) . "/' >> " . $config_logdirectory . "passthru.log");
 exec ("rm " . $config_campictures . strip_tags($argv[3]) . "/*.jpg");
 exec ("rm " . $config_campictures . strip_tags($argv[3]) . "/sens*");
 exec ("rmdir " . $config_campictures . strip_tags($argv[3]) . "/"); 
 //$config_campictures
}

if (strip_tags($argv[2]) == "deletevid" && strip_tags($argv[3])!= "") {
 exec ("echo $(date) ' - DELETEVID: rm " . $config_camvideos . strip_tags($argv[3]) . "' >> " . $config_logdirectory . "passthru.log");
 exec ("rm " . $config_camvideos . $argv[3]);
 //$config_campictures
}

if (strip_tags($argv[2]) == "deletevidday" && strip_tags($argv[3])!= "") {
 exec ("echo $(date) ' - DELETEVID: rm " . $config_camvideos . strip_tags($argv[3]) . "' >> " . $config_logdirectory . "passthru.log");
 exec ("rm " . $config_camvideos . $argv[3] . "*");
 //$config_campictures
}


if (strip_tags($argv[2]) == "v4lunique") {
	$cfgsourcewebcamid = wito_getconfig($config_witoconfig, "cfgsourcewebcamcamid");
	$trans = array("video" => "", "dev" => "", "/" => "");
	$cfgsourcewebcamidnb = strtr($cfgsourcewebcamid, $trans);
	$cfgsourcewebcamidnb = $cfgsourcewebcamidnb * 1;
	exec ("echo $(date) ' - V4LUNIQUE: v4lctl -c " . $cfgsourcewebcamid . " list > /tmp/v4lctl" . $cfgsourcewebcamidnb . "' >> " . $config_logdirectory . "passthru.log");
	exec ("v4lctl -c " . $cfgsourcewebcamid . " list > /tmp/v4lctl" . $cfgsourcewebcamidnb);
}


if (strip_tags($argv[2]) == "sampleftpnopic") {
 // PRISE DE LA PHOTO 
 exec ("echo $(date) ' - SAMPLEFTPNOPIC: echo UPLOAD SUCCESSFUL > /tmp/ftpupload.txt' >> " . $config_logdirectory . "passthru.log");
 exec (" echo 'UPLOAD SUCCESSFUL' > /tmp/ftpupload.txt");
 // UPLOAD DE LA PHOTO EN FTP
 if (wito_getconfig($config_witoconfig, "cfgftpactive") == "yes") {
	$wputactive = "-p";
 }
 $testftpuser = wito_getconfig($config_witoconfig, "cfgftpuser");
 $testftppass = wito_getconfig($config_witoconfig, "cfgftppassword");
 $testftpserver = wito_getconfig($config_witoconfig, "cfgftpserver");
 $testftpdir = wito_getconfig($config_witoconfig, "cfgftpdir");		
 $testftpphotos = wito_getconfig($config_witoconfig, "cfgftpphotosdir");
 $testsourcedir = $config_base . "sources/source" . $argv[1]  . "/tmp/";
 exec ("echo $(date) ' - SAMPLEFTPNOPIC: cd /tmp ;/usr/bin/wput -t 10 -u " . $wputactive . " ftpupload.txt ftp://" . $testftpuser . ":" . $testftppass . "@" . $testftpserver . $testftpdir . $testftpphotos . " > /tmp/ftpcapture' >> " . $config_logdirectory . "passthru.log");
 exec ("cd /tmp ;/usr/bin/wput -t 10 -u " . $wputactive . " ftpupload.txt ftp://" . $testftpuser . ":" . $testftppass . "@" . $testftpserver . $testftpdir . $testftpphotos . " > /tmp/ftpcapture");
}

*/


?> 

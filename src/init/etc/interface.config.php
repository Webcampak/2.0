<?php
// Copyright 2010-2012 Infracom & Eurotechnia (support@webcampak.com)
// This file is part of the Webcampak project.
// Webcampak is free software: you can redistribute it and/or modify it 
// under the terms of the GNU General Public License as published by 
// the Free Software Foundation, either version 3 of the License, 
// or (at your option) any later version.

// Webcampak is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
// even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
// See the GNU General Public License for more details.

// You should have received a copy of the GNU General Public License along with Webcampak. 
// If not, see http://www.gnu.org/licenses/.

ini_set('memory_limit', '-1');
ini_set('max_execution_time', 300); 

define('CFGMYSQL_HOST', 'localhost'); 
define('CFGMYSQL_DATABASE', 'webcampak'); 
define('CFGMYSQL_LOGIN', 'mysqlwebcampak'); 
define('CFGMYSQL_PASSWORD', 'tmpmysqlpassword'); 

define('CFGDIR_ROOT', '/home/tmpusername/webcampak/'); 
define('CFGDIR_SOURCESDIR', CFGDIR_ROOT . 'sources/');
define('CFGDIR_WATERMARKDIR', CFGDIR_ROOT . 'resources/watermark/'); 
define('CFGDIR_AUDIODIR', CFGDIR_ROOT . 'resources/audio/'); 
define('CFGDIR_LOGDIR', CFGDIR_ROOT . 'resources/logs/'); 
define('CFGDIR_STATSDIR', CFGDIR_ROOT . 'resources/stats/'); 
define('CFGDIR_BINDIR', CFGDIR_ROOT . 'bin/'); 
define('CFGDIR_INITCONF', CFGDIR_ROOT . 'init/etc/');
define('CFGDIR_CONF', CFGDIR_ROOT . 'etc/');
define('CFGDIR_WEBSOURCESDIR', '/sources/');
define('CFGDIR_TIMTHUMB', '/interface/remote/lib/timthumb.php'); 
define('CFGDIR_TIMTHUMBUSE', 2); /* By default do we enable timthumb or not, 1=yes, 0=no, 2=yes and do not display button */
define('CFGDIR_LOCALEDIR', CFGDIR_ROOT . 'locale/'); 
define('CFGDIR_GPHOTO', '/usr/bin/'); 

define('CFGDIR_INITCONFFILES', serialize(array("config-source", "config-source-video", "config-source-videocustom", "config-source-videopost"))); 

define('CFGLOG_DEBUGENABLE', 'yes'); 

define('CFGSYS_SYSTEMUSER', 'webcampak');
//define('CFGSYS_FTPSERVERS', CFGDIR_ROOT . "etc/config-ftpservers.cfg"); 
define('CFGSYS_TIMEZONE', 'America/Toronto');

//List configuration settings allowed to be exchanged between with the GUI (read/write) 
define('CFGCLOUD_CAPTURE', serialize(array(
	"cfgsourceactive", 	"cfgcapturetimezone", 	"cfgcroncapturevalue", 		"cfgcroncaptureinterval", 	"cfgcroncalendar",
	"cfgcronday1",	"cfgcronday2",	"cfgcronday3",	"cfgcronday4",	"cfgcronday5",	"cfgcronday6",	"cfgcronday7"
	))); 
define('CFGCLOUD_PICTURES', serialize(array(
	"cfgcropactivate", "cfgcropsizewidth", "cfgcropsizeheight", "cfgcropxpos", "cfgcropypos",
	"cfgrotateactivate", "cfgrotateangle", 
	"cfgpicwatermarkactivate", "cfgpicwatermarkfile", "cfgpicwatermarkdissolve", "cfgpicwatermarkpositionx", "cfgpicwatermarkpositiony",
	"cfgimagemagicktxt", "cfgimgtext", "cfgimgdateformat", "cfgimgtextsize", "cfgimgtextgravity", "cfgimgtextfont", "cfgimgtextbasecolor", "cfgimgtextbaseposition", "cfgimgtextovercolor", "cfgimgtextoverposition",
	"cfghotlinksize1", "cfghotlinksize2", "cfghotlinksize3",
	"cfgftpmainserverid", "cfgftpmainserverretry", "cfgftphotlinkserverid", "cfgftphotlinkserverretry"
	))); 
define('CFGCLOUD_VIDEOS', serialize(array(
	"cfgvideocodecH2641080pcreate", "cfgvideocodecH2641080pcreateflv", "cfgvideocodecH2641080pfps", "cfgvideocodecH264720pcreate", "cfgvideocodecH264720pcreateflv",
	"cfgvideocodecH264720pfps", "cfgvideocodecH264480pcreate", "cfgvideocodecH264480pcreateflv", "cfgvideocodecH264480pfps",
	"cfgvideocodecH2641080pwidth", "cfgvideocodecH2641080pheight", "cfgvideocodecH2641080pbitrate", "cfgvideocodecH2641080pcropwidth", "cfgvideocodecH2641080pcropheight", 
	"cfgvideocodecH2641080pcropx", "cfgvideocodecH2641080pcropy",
	"cfgvideocodecH264720pwidth", "cfgvideocodecH264720pheight", "cfgvideocodecH264720pbitrate", "cfgvideocodecH264720pcropwidth", "cfgvideocodecH264720pcropheight",
	"cfgvideocodecH264720pcropx", "cfgvideocodecH264720pcropy",
	"cfgvideocodecH264480pwidth", "cfgvideocodecH264480pheight", "cfgvideocodecH264480pbitrate", "cfgvideocodecH264480pcropwidth", "cfgvideocodecH264480pcropheight",
	"cfgvideocodecH264480pcropx", "cfgvideocodecH264480pcropy",
	"cfgwatermarkactivate", "cfgwatermarkfile", "cfgwatermarkdissolve", "cfgwatermarkpositionx", "cfgwatermarkpositiony",
	"cfgvideopreimagemagicktxt", "cfgvideopreimgtext", "cfgvideopreimgdateformat", "cfgvideopreimgtextsize", "cfgvideopreimgtextgravity", "cfgvideopreimgtextfont",
	"cfgvideopreimgtextbasecolor", "cfgvideopreimgtextbaseposition", "cfgvideopreimgtextovercolor", "cfgvideopreimgtextoverposition",
	"cfgvideoaddaudio", "cfgvideoaudiofile",
	"cfgftpmainserveraviid", "cfgftpmainserveraviretry", "cfgftpmainservermp4id", "cfgftpmainservermp4retry", "cfgftphotlinkserveraviid",
	"cfgftphotlinkserveraviretry", "cfgftphotlinkservermp4id", "cfgftphotlinkservermp4retry"
	))); 
define('CFGCLOUD_VIDEOSCUSTOM', serialize(array(
	"cfgvideocodecH2641080pcreate", "cfgvideocodecH2641080pcreateflv", "cfgvideocodecH2641080pfps", "cfgvideocodecH264720pcreate", "cfgvideocodecH264720pcreateflv",
	"cfgvideocodecH264720pfps", "cfgvideocodecH264480pcreate", "cfgvideocodecH264480pcreateflv", "cfgvideocodecH264480pfps",
	"cfgvideocodecH2641080pwidth", "cfgvideocodecH2641080pheight", "cfgvideocodecH2641080pbitrate", "cfgvideocodecH2641080pcropwidth", "cfgvideocodecH2641080pcropheight", 
	"cfgvideocodecH2641080pcropx", "cfgvideocodecH2641080pcropy",
	"cfgvideocodecH264720pwidth", "cfgvideocodecH264720pheight", "cfgvideocodecH264720pbitrate", "cfgvideocodecH264720pcropwidth", "cfgvideocodecH264720pcropheight",
	"cfgvideocodecH264720pcropx", "cfgvideocodecH264720pcropy",
	"cfgvideocodecH264480pwidth", "cfgvideocodecH264480pheight", "cfgvideocodecH264480pbitrate", "cfgvideocodecH264480pcropwidth", "cfgvideocodecH264480pcropheight",
	"cfgvideocodecH264480pcropx", "cfgvideocodecH264480pcropy",
	"cfgwatermarkactivate", "cfgwatermarkfile", "cfgwatermarkdissolve", "cfgwatermarkpositionx", "cfgwatermarkpositiony",
	"cfgvideopreimagemagicktxt", "cfgvideopreimgtext", "cfgvideopreimgdateformat", "cfgvideopreimgtextsize", "cfgvideopreimgtextgravity", "cfgvideopreimgtextfont",
	"cfgvideopreimgtextbasecolor", "cfgvideopreimgtextbaseposition", "cfgvideopreimgtextovercolor", "cfgvideopreimgtextoverposition",
	"cfgvideoaddaudio", "cfgvideoaudiofile",
	"cfgcustomvidname", 
	"cfgcustomstarttimestamp", "cfgcustomstartday", "cfgcustomstartmonth", "cfgcustomstartyear", "cfgcustomstarthour", "cfgcustomstartminute", 
	"cfgcustomsendtimestamp", "cfgcustomendday", "cfgcustomendmonth", "cfgcustomendyear", "cfgcustomendhour", "cfgcustomendminute", 
	"cfgcustomkeepstarthour", "cfgcustomkeepstartminute", "cfgcustomkeependhour", "cfgcustomkeependminute", 
	"cfgvidminintervalvalue", "cfgvidmininterval", 
	"cfgcustomactive", 
	"cfgvideoemailactivate"
	))); 
define('CFGCLOUD_ADVANCED', serialize(array(
	"cfglocalftppass", 	"cfgemailsendto", 	"cfgemailsendfrom", 		"cfgemailalertfailure", 	"cfgemailalertreminder"
	))); 		


?>

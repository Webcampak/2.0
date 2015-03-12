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
    session_start();

	// base Webcampak configuration
	require(dirname(__FILE__).'/../../../etc/interface.config.php');
  	    	    	    	    
	// base framework
	require(dirname(__FILE__).'/lib/log.php');	
	
	Log::debug("START -----------------------------------------------------------------------------------------------------");	
	Log::debug("Log: /init.php - Directory" . CFGDIR_INITCONF);	

	require(dirname(__FILE__).'/lib/database/pictures.php');	
	require(dirname(__FILE__).'/lib/database/session_db.php');
	require(dirname(__FILE__).'/lib/database/users.php');	
	require(dirname(__FILE__).'/lib/database/sources.php');
	require(dirname(__FILE__).'/lib/database/groups.php');
	require(dirname(__FILE__).'/lib/database/companies.php');				
	require(dirname(__FILE__).'/lib/database/generic.php');		

	require(dirname(__FILE__).'/lib/filesystem/pictures.php');	
	require(dirname(__FILE__).'/lib/filesystem/videos.php');	
	
	require(dirname(__FILE__).'/lib/authorization/authorizations.php');	
	
	require(dirname(__FILE__).'/lib/configuration/configobj.php');

	//Load phpmailer, used to send email via remote STMP server
	require(dirname(__FILE__).'/lib/phpmailer/class.phpmailer.php');
	require(dirname(__FILE__).'/lib/phpmailer/class.smtp.php');	
	
	require(dirname(__FILE__).'/lib/application_controller.php');
	require(dirname(__FILE__).'/lib/model.php');
	require(dirname(__FILE__).'/lib/request.php');
	require(dirname(__FILE__).'/lib/response.php');

	// require /models (Should iterate app/models and auto-include all files there)
	require(dirname(__FILE__).'/app/models/userauthorization.php');
	require(dirname(__FILE__).'/app/models/user.php');
	require(dirname(__FILE__).'/app/models/useravailablesource.php');
	require(dirname(__FILE__).'/app/models/usersource.php');
	require(dirname(__FILE__).'/app/models/clouduser.php');	
	require(dirname(__FILE__).'/app/models/clouduserssubscriptionemail.php');		
	
	require(dirname(__FILE__).'/app/models/company.php');
    
	require(dirname(__FILE__).'/app/models/group.php'); 
	require(dirname(__FILE__).'/app/models/groupmember.php');
	require(dirname(__FILE__).'/app/models/grouppage.php');    
	require(dirname(__FILE__).'/app/models/groupavailableuser.php'); 
	require(dirname(__FILE__).'/app/models/groupavailablepage.php');   
      
	require(dirname(__FILE__).'/app/models/source.php');
	require(dirname(__FILE__).'/app/models/sourcemember.php');     
	require(dirname(__FILE__).'/app/models/sourceavailableuser.php'); 

	require(dirname(__FILE__).'/app/models/pictureshour.php');  
	require(dirname(__FILE__).'/app/models/picturesview.php');
	require(dirname(__FILE__).'/app/models/picturessendemail.php');	
	require(dirname(__FILE__).'/app/models/picturesinsertcomment.php');		
	
	require(dirname(__FILE__).'/app/models/videoslist.php');  	
	require(dirname(__FILE__).'/app/models/videosview.php');	

	require(dirname(__FILE__).'/app/models/configcapture.php'); 
	require(dirname(__FILE__).'/app/models/configpicture.php'); 
	require(dirname(__FILE__).'/app/models/configcameraport.php'); 	
	require(dirname(__FILE__).'/app/models/configwebcamport.php'); 	 
	require(dirname(__FILE__).'/app/models/configftpserver.php'); 	 
	require(dirname(__FILE__).'/app/models/configphidget.php'); 	 
 	require(dirname(__FILE__).'/app/models/configphidgetsensor.php');
  	require(dirname(__FILE__).'/app/models/configwatermarkfile.php');
   require(dirname(__FILE__).'/app/models/configtimezone.php'); 	
   require(dirname(__FILE__).'/app/models/configtextfont.php');	 	
	require(dirname(__FILE__).'/app/models/configaudiofile.php');
	require(dirname(__FILE__).'/app/models/configvideo.php'); 
	require(dirname(__FILE__).'/app/models/configcustomvideo.php'); 
	require(dirname(__FILE__).'/app/models/configpostprodvideo.php');  
	require(dirname(__FILE__).'/app/models/configadvanced.php'); 
	
	require(dirname(__FILE__).'/app/models/configinstantcapture.php');

	require(dirname(__FILE__).'/app/models/configconnecteddevice.php'); 

	require(dirname(__FILE__).'/app/models/configsystem.php');

	require(dirname(__FILE__).'/app/models/cloudconfigcapture.php');  
	require(dirname(__FILE__).'/app/models/cloudconfigpicture.php');  
	require(dirname(__FILE__).'/app/models/cloudconfigftpserver.php'); 	 
  	require(dirname(__FILE__).'/app/models/cloudconfigwatermarkfile.php');
   require(dirname(__FILE__).'/app/models/cloudconfigtimezone.php'); 	
   require(dirname(__FILE__).'/app/models/cloudconfigtextfont.php');	 	
	require(dirname(__FILE__).'/app/models/cloudconfigaudiofile.php');
	require(dirname(__FILE__).'/app/models/cloudconfigvideo.php'); 
	require(dirname(__FILE__).'/app/models/cloudconfigcustomvideo.php'); 
	require(dirname(__FILE__).'/app/models/cloudconfigadvanced.php');  	

	require(dirname(__FILE__).'/app/models/statssourcepicturefile.php'); 
	require(dirname(__FILE__).'/app/models/statssourcepicturesize.php'); 
	require(dirname(__FILE__).'/app/models/statssourcediskusage.php');  			
	require(dirname(__FILE__).'/app/models/statssystemstat.php');  	
						
	require(dirname(__FILE__).'/app/models/sensor.php');  						
	
	require(dirname(__FILE__).'/app/models/loglogfile.php'); 		
 	
	// Fake a database connection using _SESSION
	//$dbh = new SessionDB();
	$dbusers = new UsersDB();
	
	//Localization
	$userid = $dbusers->getUsersId(strip_tags($_SERVER['PHP_AUTH_USER']), strip_tags($_SERVER['PHP_AUTH_PW']));	
	$dblang = $dbusers->getLanguage($userid);
	if ($dblang == "en") {
		$lang = "en_GB.utf8";
	} elseif ($dblang == "fr") {
		$lang = "fr_FR.utf8";		
	} else {
		$lang = "en_GB.utf8";		
	}
	$domain = 'webcampak-php';
	Log::debug("Log: /init.php - Localization, loading: " . $lang . " , locale located in: " . CFGDIR_LOCALEDIR);
	putenv("LC_ALL=$lang");
	setlocale(LC_ALL, $lang);
	bindtextdomain($domain, CFGDIR_LOCALEDIR);
	Log::debug("Log: /init.php - Localization, Bindtextdomain: " . bindtextdomain($domain, CFGDIR_LOCALEDIR));
//	bind_textdomain_codeset($filename, "UTF-8");
	textdomain($domain);
	Log::debug("Log: /init.php - Localization, textdomain: " . textdomain($domain));		
	
	
	
?>





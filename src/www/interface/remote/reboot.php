<?php
	require(dirname(__FILE__).'/../../../etc/interface.config.php');
	require(dirname(__FILE__).'/lib/log.php');		
	require(dirname(__FILE__).'/lib/authorization/authorizations.php');	
	require(dirname(__FILE__).'/lib/database/users.php');	
	$dbusers = new UsersDB();
	$userAuth = new Authorizations();
	if ($userAuth->isAllowedToAccessPage("auth.config.admin.reboot") == true) {
		Log::debug("Log: /reboot.php - Webcampak reboot request received");	
		passthru("sudo /usr/bin/php -f " . CFGDIR_BINDIR . "server.php -- reboot");
	}


?>


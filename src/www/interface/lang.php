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
require(dirname(__FILE__).'/../../etc/interface.config.php');
require(dirname(__FILE__).'/remote/lib/log.php');
require(dirname(__FILE__).'/remote/lib/authorization/authorizations.php');	
require(dirname(__FILE__).'/remote/lib/database/users.php');	

$dbusers = new UsersDB();
$userid = $dbusers->getUsersId(strip_tags($_SERVER['PHP_AUTH_USER']), strip_tags($_SERVER['PHP_AUTH_PW']));	
echo $dbusers->getLanguage($userid);	


?>
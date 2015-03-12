<?php
session_start();
if ($_SESSION['logout']) {
	$_SESSION['logout'] = false;
	header('Location: ../index.html');
} else {
	header('HTTP/1.0 401 Unauthorised');
	// Change Realm to be the same as AuthName in .htaccess
	header("WWW-Authenticate: Basic realm='Webcampak'");
	$_SESSION['logout'] = true;
}
// Set "escape" (message when you hit escape) message here.
echo 'Logged out.'
?>
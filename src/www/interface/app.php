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
	require('remote/init.php');

	// Get Request
	$request = new Request(array('restful' => true));
	Log::debug("Log: /app.php: Request: " . http_build_query($request));	

    // Get Controller
	require('remote/app/controllers/' . strip_tags($request->controller) . '.php');
	$controller_name = ucfirst($request->controller);
	$controller = new $controller_name;

	Log::debug("Log: /app.php: Controller name " . $controller_name);	
	
	// Dispatch request
	echo $controller->dispatch($request);


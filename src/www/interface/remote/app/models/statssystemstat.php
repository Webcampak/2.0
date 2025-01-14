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
class Statssystemstat  { 
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/statssystemstat.php - all() function");

		if (isset($_REQUEST["range"]) && strip_tags($_REQUEST["range"]) == "day") 		{$range = "day";}
		if (isset($_REQUEST["range"]) && strip_tags($_REQUEST["range"]) == "month")	{$range = "month";}				
		if (isset($_REQUEST["range"]) && strip_tags($_REQUEST["range"]) == "year") 	{$range = "year";}				
		$configObj = new ConfigObj();				
		return $configObj->getSystemStats($range);

	}	
		
}

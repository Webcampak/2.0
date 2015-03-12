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
class Statssourcediskusage  { 
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/statssourcediskusage.php - all() function");

		$userAuth = new Authorizations();		
		
		if (isset($_REQUEST["sourceid"])) {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);} 
		else {$sourceid = 0;}
		Log::debug("Log: /remote/lib/models/statssourcediskusage.php - all() - sourceid: " . $sourceid );
		if ($sourceid == 0) {
			//If no source is defined by Sencha, send a request to get allowed sources, select the ID with smallest weight.
			Log::debug("Log: /remote/lib/models/statssourcediskusage.php - all() - No sources specified by Sencha, looking into database");
			$allowedsources = $userAuth->userAllowedSources();
			$sourceid = $allowedsources[0]['sourceid'];
			Log::debug("Log: /remote/lib/models/statssourcediskusage.php - all() - No sources specified by Sencha, using source: " . $sourceid);				
		}		
		if ($userAuth->isAllowedToAccessSource($sourceid) == true && $sourceid > 0 ) {
			if (isset($_REQUEST["range"]) && strip_tags($_REQUEST["range"]) == "day") 		{$range = "day";}
			if (isset($_REQUEST["range"]) && strip_tags($_REQUEST["range"]) == "month")	{$range = "month";}				
			if (isset($_REQUEST["range"]) && strip_tags($_REQUEST["range"]) == "year") 	{$range = "year";}				
			$configObj = new ConfigObj();				
			return $configObj->getSourceDiskStats($sourceid, $range);
		}	
	}	
		
		
/*		
		$statsvalues = array();
		$statsdays = array();
		$configObj = new ConfigObj();				
		global $dbusers;		
		$allowedSources = $dbusers->getUsersSources(strip_tags($_SERVER['PHP_AUTH_USER']));	
		foreach ($dbusers->getUsersSources(strip_tags($_SERVER['PHP_AUTH_USER'])) as $allowedSources) {
			Log::debug("Log: /remote/lib/models/statssourcepicture.php - all() - Source: " . $allowedSources['sourceid']);
			$tmpsourcevalues = array();
			$tmpsourcesvalues['values'] = $configObj->getSourceStats($allowedSources['sourceid']);
			$tmpsourcesvalues['sourceid'] = $allowedSources['sourceid'];	
			foreach($tmpsourcesvalues['values'] as $rootkey=>$rootvalue) {
				foreach($rootvalue as $key=>$value) {
					if ($key == 'date') {
						array_push($statsdays, $value);			
					}
				}
			}								
			array_push($statsvalues, $tmpsourcesvalues['values']);
		}	
		$statsdays = array_unique($statsdays);
		sort($statsdays);

		
		//We re-arrange values to return a properly formated JSON
		$statsseries = array();
		foreach($statsdays as $id=>$day) {
			$tmpstatsseries = array();
			$tmpstatsseries['date'] = $day;
			foreach($statsvalues as $key=>$value) {
				foreach($value as $subkey=>$subvalue) {
					if ($subvalue['date'] == $day) {
						$tmpsourceid = $subvalue['sourceid'];
						$tmpstatsseries['source' . $tmpsourceid] = $subvalue['nbpics'];
					}
				}
			}
			array_push($statsseries, $tmpstatsseries);						
		}
	
		return $statsseries;		
		
	}

*/

}

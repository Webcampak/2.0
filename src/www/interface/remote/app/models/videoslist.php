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
/**
 * @class Videoslist
 */
class Videoslist {
	public $id, $attributes;	
    
	static function all() {
		Log::debug("Log: /remote/lib/models/videoslist.php - all() function");

		$userAuth = new Authorizations();
		$dbsources = new SourcesDB();
		$vidsfs = new VideosFS();		
		
			
		//Get sourceid from Sencha store, if no set sourceid to 0
		if (isset($_REQUEST["sourceid"])) {
			if ($_REQUEST["sourceid"] == "0") {
				//If no source is defined by Sencha, send a request to get allowed sources, select the ID with smallest weight.
				Log::debug("Log: /remote/app/models/videoslist.php - all() - No sources specified by Sencha, looking into database to find default source");
				$allowedsources = $userAuth->userAllowedSources();
				$sourceid = $allowedsources[0]['sourceid'];
				Log::debug("Log: /remote/app/models/videoslist.php - all() - No sources specified by Sencha, using source: " . $sourceid);								
			} 
			else {$sourceid = (int) strip_tags($_REQUEST["sourceid"]);}
		}
		
		if ($userAuth->isAllowedToAccessSource($sourceid) == true) {		
			date_default_timezone_set(CFGSYS_TIMEZONE);
			$targetdir = CFGDIR_SOURCESDIR . "source" . $sourceid . "/videos/";			
	
			//Get timestamp from Sencha store, if no timestamp, set to 0
			if (isset($_REQUEST["currentdate"])) {$currentdate = strip_tags($_REQUEST["currentdate"]) * 1;}
			else {$currentdate = 0;}
			if ($currentdate == 0) {
				Log::debug("Log: /remote/lib/models/videoslist.php - all() - No date found, looking for latest picture");
				$currentvideo = $vidsfs->getVideo($targetdir, "last");
				$currentdate = mktime(12, 12, 12, substr($currentvideo, 4,2), substr($currentvideo, 6,2), substr($currentvideo, 0,4));	
			} //if not date defined by Sencha (currentdate == 0), get current time from server
			else {
				Log::debug("Log: /remote/lib/models/videoslist.php - all() - Using date sent by Sencha");
				$currentdate = round($currentdate / 1000); // 28800 to be removed, this is a trick
			} // if date has been defined by sencha, convert this date from microseconds to seconds

			if (isset($_REQUEST["mobile"])) {$mobile = strip_tags($_REQUEST["mobile"]) * 1;}
			else {$mobile = 0;}

			Log::debug("Log: /remote/lib/models/videoslist.php - all() - current timestamp: " . $currentdate);
			Log::debug("Log: /remote/lib/models/videoslist.php - all() - current timestamp (date): " . date("Ymd", $currentdate));
			Log::debug("Log: /remote/lib/models/videoslist.php - all() - current timestamp (date): " . date("l jS \of F Y h:i:s A", $currentdate));			
			Log::debug("Log: /remote/lib/models/videoslist.php - all() - target directory: " . $targetdir);

			Log::debug("Log: /remote/lib/models/videoslist.php - all() - Scan videos directory to extract videos");
			$checkvids = array();
			
			if ($mobile == 0) {
				$checkvids = $vidsfs->getVideosFiles($targetdir, date("Ymd", $currentdate));				
			} else {
				$checkvids = $vidsfs->getVideosFiles($targetdir, 0);
			}

			$results = array();
			foreach($checkvids as $idx=>$currentvid) {
				$tmpresults = array();
				if (is_file($targetdir . $currentvid)) {
					Log::debug("Log: /remote/lib/models/videoslist.php - all() - Processing file: " . $currentvid);	
					$tmpresult['filename'] = $currentvid;		
					if (substr($currentvid, 8) == ".1080p.avi" || substr($currentvid, 8) == ".720p.avi" || substr($currentvid, 8) == ".480p.avi" || substr($currentvid, 8) == ".custom.avi") {
						$tmpresult['name'] = $currentvid; // Video is an automated generated video
					} else {
						$tmpresult['name'] = substr($currentvid, 9); // Video is a custom generated video (location 9 to remove _)
					}
					$tmpresult['size'] = filesize($targetdir . $currentvid);
					$tmpresult['sizemobi'] = round(filesize($targetdir . $currentvid) / 1000000, 1);
					if (strpos($currentvid,"1080p.avi") !== false) {$tmpresult['format'] = "1080p";}	
					elseif (strpos($currentvid,"720p.avi") !== false) {$tmpresult['format'] = "720p";}						
					elseif (strpos($currentvid,"480p.avi") !== false) {$tmpresult['format'] = "480p";}						
					elseif (strpos($currentvid,"custom.avi") !== false) {$tmpresult['format'] = "custom";}						
					$tmpresult['date'] = $currentdate;
					$tmpresult['download'] = "/sources/" . "source" . $sourceid . "/videos/" . $currentvid;
					if (is_file($targetdir . $currentvid . ".mp4")) {$tmpresult['mp4'] = "/sources/" . "source" . $sourceid . "/videos/" . $currentvid . ".mp4";}		
					if (is_file($targetdir . $currentvid . ".jpg")) {$tmpresult['jpg'] = "/sources/" . "source" . $sourceid . "/videos/" . $currentvid . ".jpg";}	
					Log::debug("Log: /remote/lib/models/videoslist.php - all() - Pushing file: " . $tmpresult['filename']);
					array_push($results, $tmpresult); 
				}

			}
			return $results; 


/*
20120713.720p.avi
-rw-r--r-- 1 webcampak webcampak 8,3M 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.1080p.avi
-rw-r--r-- 1 webcampak webcampak 213K 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.1080p.avi.jpg
-rw-r--r-- 1 webcampak webcampak 1,7M 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.1080p.avi.mp4
-rw-r--r-- 1 webcampak webcampak 1,4M 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.480p.avi
-rw-r--r-- 1 webcampak webcampak  52K 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.480p.avi.jpg
-rw-r--r-- 1 webcampak webcampak 2,1M 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.480p.avi.mp4
-rw-r--r-- 1 webcampak webcampak 1,4M 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.720p.avi
-rw-r--r-- 1 webcampak webcampak    0 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.720p.avi.jpg
-rw-r--r-- 1 webcampak webcampak 640K 2012-06-27 22:41 20120627_19Juin-Full-0mn-5fps.720p.avi.mp4
-rw-r--r-- 1 webcampak webcampak 408M 2012-06-29 18:11 20120629_Full-15mn-10fps.1080p.avi
-rw-r--r-- 1 webcampak webcampak 158K 2012-06-29 18:11 20120629_Full-15mn-10fps.1080p.avi.jpg
-rw-r--r-- 1 webcampak webcampak  87M 2012-06-29 18:11 20120629_Full-15mn-10fps.1080p.avi.mp4
-rw-r--r-- 1 webcampak webcampak 1,2G 2012-06-30 01:46 20120629_Full-2mn-25fps.1080p.avi
-rw-r--r-- 1 webcampak webcampak 234M 2012-06-30 04:08 20120629_Full-2mn-25fps.1080p.avi.custom.avi
-rw-r--r-- 1 webcampak webcampak 136K 2012-06-30 04:09 20120629_Full-2mn-25fps.1080p.avi.custom.avi.jpg
-rw-r--r-- 1 webcampak webcampak 433M 2012-06-30 04:08 20120629_Full-2mn-25fps.1080p.avi.custom.avi.mp4
-rw-r--r-- 1 webcampak webcampak 163K 2012-06-30 01:47 20120629_Full-2mn-25fps.1080p.avi.jpg
*/		

		}
		else {
			Log::debug("Log: /remote/lib/models/videoslist.php - all() - User not allowed to access page, terminating ....");
			exit();
		}
	}
}

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
 * @class Cloudconfigwatermarkfile
 */
class Cloudconfigwatermarkfile  { 
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/cloudconfigwatermarkfile.php - all() function");
	
		$watermarkfiles = array();
		
		//First we look into source directory
		if (isset($_REQUEST["sourceid"])) {
			$sourceid = (int) strip_tags($_REQUEST["sourceid"]);
			if (is_dir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/watermark/")) {
				$watermarkdir = opendir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/watermark/");		
				while ($listwatermarkfile = readdir($watermarkdir)) {
				   if(is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/watermark/" . $listwatermarkfile) && (substr($listwatermarkfile, -4,4) == ".png" || substr($listwatermarkfile, -4,4) == ".jpg")) {
						$tmpwatermarkfiles = array();
						$tmpwatermarkfiles['id'] = $listwatermarkfile;
						$tmpwatermarkfiles['name'] = $listwatermarkfile;
						array_push($watermarkfiles, $tmpwatermarkfiles);
				   }
				} 						
			}
		}		
		
		//Then we look into global resources directory			
		$watermarkdir = opendir(CFGDIR_WATERMARKDIR);
		while ($listwatermarkfile = readdir($watermarkdir)) {
		   if(is_file(CFGDIR_WATERMARKDIR.$listwatermarkfile) && (substr($listwatermarkfile, -4,4) == ".png" || substr($listwatermarkfile, -4,4) == ".jpg")) {
				$tmpwatermarkfiles = array();
				$tmpwatermarkfiles['id'] = $listwatermarkfile;
				$tmpwatermarkfiles['name'] = $listwatermarkfile;
				array_push($watermarkfiles, $tmpwatermarkfiles);
		   }
		} 
		
		return $watermarkfiles;
	}

}

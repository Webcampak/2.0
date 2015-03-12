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
 * @class Configaudiofile
 */ 
class Configaudiofile  { 
	public $id, $attributes;	

	static function all() {
		Log::debug("Log: /remote/lib/models/configaudiofile.php - all() function");
	
		$audiofiles = array();
		
		//First we look into source directory
		if (isset($_REQUEST["sourceid"])) {
			$sourceid = (int) strip_tags($_REQUEST["sourceid"]);
			if (is_dir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/audio/")) {
				$audiodir = opendir(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/audio/");		
				while ($listaudiofile = readdir($audiodir)) {
				   if(is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/resources/audio/" . $listaudiofile)  && (substr($listaudiofile, -4,4) == ".mp3" || substr($listaudiofile, -4,4) == ".m3u")) {
						$tmpaudiofiles = array();
						$tmpaudiofiles['id'] = $listaudiofile;
						$tmpaudiofiles['name'] = $listaudiofile;
						array_push($audiofiles, $tmpaudiofiles);
				   }
				} 						
			}
		}				
		
		$audiodir = opendir(CFGDIR_AUDIODIR);
		while ($listaudiofile = readdir($audiodir)) {
		   if(is_file(CFGDIR_AUDIODIR.$listaudiofile) && (substr($listaudiofile, -4,4) == ".mp3" || substr($listaudiofile, -4,4) == ".m3u")) {
				$tmpaudiofiles = array();
				$tmpaudiofiles['id'] = $listaudiofile;
				$tmpaudiofiles['name'] = $listaudiofile;
				array_push($audiofiles, $tmpaudiofiles);
		   }
		} 
		return $audiofiles;
	}

}


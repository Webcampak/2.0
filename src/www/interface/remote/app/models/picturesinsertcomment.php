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
 * @class Configpicture
 */
class Picturesinsertcomment  {
	public $id, $attributes;	

	static function update($params) {
		Log::debug("Log: /remote/lib/models/picturesinsertcomment.php - update() function");
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = strip_tags($_REQUEST["sourceid"]) * 1;} 
		if (isset($_REQUEST["picture"])) {$picture = strip_tags($_REQUEST["picture"]) * 1;} 		
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true && $picture > 0) {			
			Log::debug("Log: /remote/lib/models/picturesinsertcomment.php - update() - User allowed to insert comment");			
			Log::debug("Log: /remote/lib/models/picturesinsertcomment.php - update() - Check if picture exists: " . CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/" . substr($picture, 0,8) . "/" . $picture . ".jpg");										
			if (is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/" . substr($picture, 0,8) . "/" . $picture . ".jpg")) {
				Log::debug("Log: /remote/lib/models/picturesinsertcomment.php - update() - Picture exists");									
				foreach($params as $key=>$value) {
					$value = strval($value);
					if ($key == "commentcontent") {$commentContent = strip_tags($value);}
				}					
				Log::debug("Log: /remote/lib/models/picturesinsertcomment.php - update() - Comment: " . $commentContent);													
				$picsdb = new PicturesDB();	
				$insertComment = $picsdb->insertPictureComment($sourceid, $picture, $commentContent);
				$response->status['success'] = 1;
				$response->status['message'] = sprintf(str_replace(array('#PICTURENAME#'), array($picture),  _("Comment successfully attached to: #PICTURENAME#")));	
				return $response;									
			}
		} else {
			Log::debug("Log: /remote/lib/models/picturesinsertcomment.php - update() - User not allowed to insert comment");	
			return false;
		}
	}
}




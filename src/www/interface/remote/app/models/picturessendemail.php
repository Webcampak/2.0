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
class Picturessendemail  {
	public $id, $attributes;	

	static function update($params) {
		Log::debug("Log: /remote/lib/models/picturessendemail.php - update() function");
		$userAuth = new Authorizations();
		if (isset($_REQUEST["sourceid"])) {$sourceid = strip_tags($_REQUEST["sourceid"]) * 1;} 
		if (isset($_REQUEST["picture"])) {$picture = strip_tags($_REQUEST["picture"]) * 1;} 		
		if ($sourceid > 0 && $userAuth->isAllowedToAccessSource($sourceid) == true && $picture > 0) {	
			if (is_file(CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/" . substr($picture, 0,8) . "/" . $picture . ".jpg")) {
				$emailPicture = CFGDIR_SOURCESDIR . "source" . $sourceid . "/pictures/" . substr($picture, 0,8) . "/" . $picture . ".jpg";
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Attach file to email: " . $emailPicture);								
			}		
			foreach($params as $key=>$value) {
				$value = strval($value);
				if ($key == "emailsendto" && $value!="") {$emailSendTo = strip_tags($value);}
				if ($key == "emailsubject" && $value!="") {$emailSubject = strip_tags($value);}
				if ($key == "emailcontent" && $value!="") {$emailContent = strip_tags($value);}
				if ($key == "emaildrawing" && $value!="") {$emailDrawing = strip_tags($value);}				
			}
			if (isset($emailDrawing) && $emailDrawing != "") {
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - A drawing has been sent");
				//Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Drawing: " . $emailDrawing);
				$emailDrawing = str_replace("data:image/png;base64,", "", $emailDrawing);
				$emailDrawing = base64_decode($emailDrawing);
				$img = imagecreatefromstring($emailDrawing);			
				if($img != false) {
					// Convert black background to transparent	
					imagealphablending($img, true);				
					$black = imagecolorallocate($img, 0, 0, 0);
					imagecolortransparent($img, $black);	
					
					/*
					//Resizing drawing to picture size
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Drawing is actually an image");	
					$drawingwidth = imagesx($img);
					$drawingheight = imagesy($img);					
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Drawing size is: " . $drawingwidth . "x" . $drawingheight);						
					list($picwidth, $picheight, $pictype, $attr) = getimagesize($emailPicture);	
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Picture size is: " . $picwidth . "x" . $picheight);		
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Resize image to target picture dimension");
					$imgresize = imagecreatetruecolor($picwidth, $picheight);		
									
					imagecopyresampled($imgresize, $img, 0, 0, 0, 0, $picwidth, $picheight, $drawingwidth, $drawingheight);					
					$drawingwidth = imagesx($imgresize);
					$drawingheight = imagesy($imgresize);		
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Drawing new size is: " . $drawingwidth . "x" . $drawingheight);															
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Adding drawing to initial picture");
					$imoutput = imagecreatefromjpeg($emailPicture);
					imagecopymerge($imoutput, $imgresize, 0, 0, 0, 0, $drawingwidth, $drawingheight, 70);		
					*/	
					
					//Resizing picture to drawing size
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Drawing is actually an image");	
					$drawingwidth = imagesx($img);
					$drawingheight = imagesy($img);					
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Drawing size is: " . $drawingwidth . "x" . $drawingheight);						
					list($picwidth, $picheight, $pictype, $attr) = getimagesize($emailPicture);	
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Picture size is: " . $picwidth . "x" . $picheight);		
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Resize picture to drawing dimensions");

					$imgresize = imagecreatetruecolor($drawingwidth, $drawingheight);		
					$imoutput = imagecreatefromjpeg($emailPicture);
					imagecopyresampled($imgresize, $imoutput, 0, 0, 0, 0, $drawingwidth, $drawingheight, $picwidth, $picheight);		
								
					$drawingwidth = imagesx($imgresize);
					$drawingheight = imagesy($imgresize);		
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Picture new size is: " . $drawingwidth . "x" . $drawingheight);														
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Adding drawing to initial picture");
					//imagecopymerge($imgresize, $img, 0, 0, 0, 0, $drawingwidth, $drawingheight, 90);	
					imagecopy($imgresize, $img, 0, 0, 0, 0, $drawingwidth, $drawingheight);
					$imoutput = $imgresize;	
					
				} else {
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Drawing is not an image");					
				}

			}
			if (isset($emailSendTo)) {			
				$configObj = new ConfigObj();
				$configServerSettings = $configObj->getSettings("config-general.cfg", $sourceid, NULL);
				$configSourceSettings = $configObj->getSettings("config-source" . $sourceid . ".cfg", $sourceid, NULL);
			
				//Define reply-to field, source configuration takes over server configuration
				if ($configServerSettings['cfgemailreplyto'] != '') {$emailReplyTo = $configServerSettings['cfgemailreplyto'];	}
				if ($configSourceSettings['cfgemailreplyto'] != '') {$emailReplyTo = $configSourceSettings['cfgemailreplyto'];	}
	
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: Host: ==" . $configServerSettings['cfgemailsmtpserver'] . "==");								
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: Port: ==" . $configServerSettings['cfgemailsmtpserverport'] . "==");	
				if ($configServerSettings['cfgemailsmtpauth'] == "on") {							
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: SMTP Auth Username: ==" . $configServerSettings['cfgemailsmtpauthusername'] . "==");								
					//Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: SMTP Auth Password: " . $configServerSettings['cfgemailsmtpauthpassword']);	
				}							
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: Start TLS: ==" . $configServerSettings['cfgemailsmtpstartttls'] . "==");								
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: AddAddress: ==" . $emailSendTo . "==");								
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: AddBCC: ==" . $configServerSettings['cfgemailsendbcc'] . "==");								
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: AddCC: ==" . $configSourceSettings['cfgemailsendcc'] . "==");								
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: AddReplyTo: ==" . $emailReplyTo . "==");
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: Subject: ==" . $emailSubject . "==");
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: Content: ==" . $emailContent . "==");
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: Attachement Filename: ==" . $emailPicture . "==");
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - EMail: Attachement Name: ==" . $picture . ".jpg==");
						
				$mail = new PHPMailer(true); // the true param means it will throw exceptions on errors, which we need to catch
				$mail->IsSMTP(); // telling the class to use SMTP
	
			//	try {
					$mail->Host       = $configServerSettings['cfgemailsmtpserver']; 				// SMTP server
					$mail->SMTPDebug  = 0;                     											// enables SMTP debug information (for testing) -> 2 to turn on debugging
					if ($configServerSettings['cfgemailsmtpauth'] == "on") {					
						$mail->SMTPAuth   = true;                  											// enable SMTP authentication
					}
					$mail->Port       = $configServerSettings['cfgemailsmtpserverport'];			// set the SMTP port for the GMAIL server
					if ($configServerSettings['cfgemailsmtpstartttls'] == "on") {			
						$mail->SMTPSecure = "tls";                 										// sets the prefix to the servier
					}
					if ($configServerSettings['cfgemailsmtpauth'] == "on") {
						$mail->Username   = $configServerSettings['cfgemailsmtpauthusername'];	// SMTP account username
						$mail->Password   = $configServerSettings['cfgemailsmtpauthpassword'];	// SMTP account password				
					}				
					$mail->AddAddress($emailSendTo);
					if ($configServerSettings['cfgemailsendbcc'] != "") {		
						$mail->AddBCC($configServerSettings['cfgemailsendbcc']);	
					}
					if ($configSourceSettings['cfgemailsendcc'] != "") {		
						$mail->AddCC($configSourceSettings['cfgemailsendcc']);	
					}			
					$mail->SetFrom($configServerSettings['cfgemailsendfrom'], 'Webcampak (' . $_SERVER['PHP_AUTH_USER'] . ')');
					if (isset($emailReplyTo) && $emailReplyTo != "") {
						$mail->AddReplyTo($emailReplyTo);
					}
					$mail->Subject = $emailSubject;
					//$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
					if (isset($emailContent) && $emailContent != "") {
						$mail->Body = $emailContent;	
					} else {
						$mail->Body = "Email body is empty";	
					}		
					//$mail->MsgHTML(file_get_contents('contents.html'));
					if ($emailPicture != "") {
						if (isset($emailDrawing) && $emailDrawing != "") {					
							ob_start();
							imagepng($imoutput);
							$data = ob_get_clean();
							$mail->AddStringAttachment($data, $picture . ".png", "base64", "image/png");      // attachment
						} else {
							$mail->AddAttachment($emailPicture, $picture . ".jpg");      // attachment
						}
					}
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Sending email ...");								
					$mail->Send();
					Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Email successfully sent");			
			//} catch (phpmailerException $e) {
		//		echo $e->errorMessage(); //Pretty error messages from PHPMailer
		//	error_log($e->errorMessage());
		//	} catch (Exception $e) {
		//	error_log($e->getMessage());
		//		echo $e->getMessage(); //Boring error messages from anything else!
		//	}
			}
					
			$tmpresults['emailsendto'] = $emailSendTo;
			$tmpresults['emailsubject'] = $emailSubject;
			$tmpresults['emailcontent'] = $emailContent;
			$tmpresults['emailpicture'] = $emailPicture;			
			$response->data = $tmpresults;
			$response->status['data'] = $tmpresults;		
			$response->status['success'] = 1;
			$response->status['message'] = sprintf(str_replace(array('#EMAILRECEIPIENT#'), array($emailSendTo),  _("Email successfully sent to: #EMAILRECEIPIENT#")));				
			return $response;
		} else {
			Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - User not allowed to edit source");	
			return false;
		}
	}
}




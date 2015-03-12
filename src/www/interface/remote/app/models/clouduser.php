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
 * @class Clouduser
 */
class Clouduser { //extends Model {
    public $id, $attributes;	

	static function create($params) {
		Log::debug("Log: /remote/lib/models/clouduser.php - create() function");
		$obj = new self(get_object_vars($params));
		$obj->status = $obj->save();
		return $obj;
	}

	static function find($id) {
		Log::debug("Log: /remote/lib/models/clouduser.php - find() function");
		global $dbusers;
		$found = null;
		foreach ($dbusers->getCloudusers() as $rec) {
			if ($rec['id'] == $id) {
				$found = new self($rec);
				break;
			}
		}
		return $found;
	}

	static function update($id, $params) {
		Log::debug("Log: /remote/lib/models/clouduser.php - update() function");
		global $dbusers;
 		$rec = self::find($id);
		if ($rec == null) {return $rec;}
		$rs = $dbusers->getCloudusers();
		foreach ($rs as $idx => $row) {
			if ($row['id'] == $id) {
				$rec->attributes = array_merge($rec->attributes, get_object_vars($params));
				$rec->status = $dbusers->updateClouduser($idx, $rec->attributes);
				
				$emailAttributes = $rec->attributes;				
				if ($emailAttributes['password'] != 'xxxxxx') {
					$dblang = $dbusers->getLanguage($row['id']);	
					if ($dblang == "en") {$lang = "en_GB.utf8";} 
					elseif ($dblang == "fr") {$lang = "fr_FR.utf8";} 
					else {$lang = "en_GB.utf8";}							
					
					if(is_file(CFGDIR_ROOT . "locale/" . $lang . "/messages/resetpasswordEmailContent.txt")) {		
						$emailContent = file_get_contents(CFGDIR_ROOT . "locale/" . $lang . "/messages/resetpasswordEmailContent.txt");
					}	else {
						Log::debug("Log: /remote/lib/models/cloususer.php - update() - Error - Unable to get email content");
						Log::debug("Log: /remote/lib/models/cloususer.php - update() - " . CFGDIR_ROOT . "locale/" . $lang . "/messages/resetpasswordEmailContent.txt");													
						break;
					}			
					if(is_file(CFGDIR_ROOT . "locale/" . $lang . "/messages/resetpasswordEmailSubject.txt")) {		
						$emailSubject = file_get_contents(CFGDIR_ROOT . "locale/" . $lang . "/messages/resetpasswordEmailSubject.txt");												
					}	else {
						Log::debug("Log: /remote/lib/models/cloususer.php - update() - Error - Unable to get email subject");		
						Log::debug("Log: /remote/lib/models/cloususer.php - update() - " . CFGDIR_ROOT . "locale/" . $lang . "/messages/resetpasswordEmailSubject.txt");																			
						break;							
					}
									
					//Send email if password has been changed
					$configObj = new ConfigObj();
					$configServerSettings = $configObj->getSettings("config-general.cfg", NULL, NULL);				
					
					$emailContent = str_replace("#CUSTOMERFIRSTNAME#", $emailAttributes['firstname'], $emailContent);
					$emailContent = str_replace("#SERVERURL#", $configServerSettings['cfgserverurl'], $emailContent);
					$emailContent = str_replace("#CUSTOMERUSERNAME#", $emailAttributes['username'], $emailContent);
					$emailContent = str_replace("#CUSTOMERPASSWORD#", $emailAttributes['password'], $emailContent);

					if ($configServerSettings['cfgemailreplyto'] != '') {$emailReplyTo = $configServerSettings['cfgemailreplyto'];	}
					Log::debug("Log: /remote/lib/models/cloususer.php - update() - EMail: Host: ==" . $configServerSettings['cfgemailsmtpserver'] . "==");								
					Log::debug("Log: /remote/lib/models/cloususer.php - update() - EMail: Port: ==" . $configServerSettings['cfgemailsmtpserverport'] . "==");	
					if ($configServerSettings['cfgemailsmtpauth'] == "on") {											
						Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: SMTP Auth Username: ==" . $configServerSettings['cfgemailsmtpauthusername'] . "==");												
					}											
					Log::debug("Log: /remote/lib/models/cloususer.php - update() - EMail: Start TLS: ==" . $configServerSettings['cfgemailsmtpstartttls'] . "==");												
					Log::debug("Log: /remote/lib/models/cloususer.php - update() - EMail: AddAddress: ==" . $emailAttributes['email'] . "==");												
					Log::debug("Log: /remote/lib/models/cloususer.php - update() - EMail: AddBCC: ==" . $configServerSettings['cfgemailsendbcc'] . "==");	
					Log::debug("Log: /remote/lib/models/cloususer.php - update() - EMail: AddReplyTo: ==" . $emailReplyTo . "==");
					Log::debug("Log: /remote/lib/models/cloususer.php - update() - EMail: Subject: ==" . $emailSubject . "==");
					Log::debug("Log: /remote/lib/models/cloususer.php - update() - EMail: Content: ==" . $emailContent . "==");

					$mail = new PHPMailer(true); // the true param means it will throw exceptions on errors, which we need to catch
					$mail->IsSMTP(); // telling the class to use SMTP
	
					//	try {
						$mail->Host       = $configServerSettings['cfgemailsmtpserver']; 						// SMTP server
						$mail->SMTPDebug  = 0;                     																	// enables SMTP debug information (for testing) -> 2 to turn on debugging
						if ($configServerSettings['cfgemailsmtpauth'] == "on") {							
							$mail->SMTPAuth   = true;                  																	// enable SMTP authentication
						}
						$mail->Port       = $configServerSettings['cfgemailsmtpserverport'];					// set the SMTP port for the GMAIL server
						if ($configServerSettings['cfgemailsmtpstartttls'] == "on") {					
							$mail->SMTPSecure = "tls";                 																// sets the prefix to the servier
						}
						if ($configServerSettings['cfgemailsmtpauth'] == "on") {
							$mail->Username   = $configServerSettings['cfgemailsmtpauthusername'];	// SMTP account username
							$mail->Password   = $configServerSettings['cfgemailsmtpauthpassword'];	// SMTP account password						
						}						
						$mail->AddAddress($emailAttributes['email']);
						if ($configServerSettings['cfgemailsendbcc'] != "") {		
							$mail->AddBCC($configServerSettings['cfgemailsendbcc']);	
						}	
						$mail->SetFrom($configServerSettings['cfgemailsendfrom'], 'Webcampak');
						if (isset($emailReplyTo) && $emailReplyTo != "") {
							$mail->AddReplyTo($emailReplyTo);
						}
						$mail->Subject = $emailSubject;						
						$mail->Body    = $emailContent;
						Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Sending email ...");												
						$mail->Send();
						Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Email successfully sent");	
				}
				
				break;
			}
		}
		return $rec;
	}
    
	static function destroy($id) {
		Log::debug("Log: /remote/lib/models/clouduser.php - destroy() function");
        global $dbusers;
        $rec = null;
        $rs = $dbusers->getCloudusers();
        foreach ($rs as $idx => $row) {
            if ($row['id'] == $id) {
                $rec = new self($dbusers->destroyClouduser($id));
                break;
            }
        }
        return $rec;
    }
    
	static function all() {
		Log::debug("Log: /remote/lib/models/clouduser.php - all() function");
		global $dbusers;
		return $dbusers->getCloudusers();
	}

	public function __construct($params) {
		Log::debug("Log: /remote/lib/models/clouduser.php - __construct() function");
		$this->id = isset($params['id']) ? $params['id'] : null;
		$this->attributes = $params;
	}

	public function save() {
		Log::debug("Log: /remote/lib/models/clouduser.php - save() function");
		global $dbusers;
		Log::debug("Log: /remote/lib/models/clouduser.php - save() - Insert new user within database");
		$dbgeneric = new GenericDB();
		$this->attributes['id'] = $dbgeneric->getNextTableKey("users");
		$newUserId = $this->attributes['id'];
		$insertCloudUser = $dbusers->insertClouduser($this->attributes);

		if ($insertCloudUser['success'] != false) {
			Log::debug("Log: /remote/lib/models/clouduser.php - save() - Insert new source within database");		
			$dbsources = new SourcesDB();
			$newsourceid = (int) $dbsources->findAvailableSourceId() + 1;
			$this->attributes['id'] = $dbgeneric->getNextTableKey("sources");
			$this->attributes['sourceid'] = $newsourceid;
			$this->attributes['name'] = $this->attributes['sourcename'];			
			$this->attributes['weight'] = 1000;		
			$saveoutput = $dbsources->insertSource($this->attributes);
	
			Log::debug("Log: /remote/lib/models/clouduser.php - save() - Attach new user to new source");		
			//Add current user to source
			$dbsources->addUserToSource($newsourceid, $this->attributes['username']);
			Log::debug("Log: /remote/lib/models/clouduser.php - save() - Attach root user to new source");				
			//Add root user to source
			$dbsources->addUserToSource($newsourceid, "root");

			Log::debug("Log: /remote/lib/models/clouduser.php - save() - Update source configuration (URL)");	
			$configSettingsNew = array();

			
			if ($this->attributes['accounttype'] == "mini") {
				$configSettingsNew['cfgcapturedeleteafterdays'] = "1";
			}
			
			$configSettingsNew['cfgsourcetype']	= $this->attributes['sourcetype'];
			$configSettingsNew['cfgsourcewebfileurl']	= $this->attributes['sourceurl'];
			$configSettingsNew['cfgsourcelanguage']	= $this->attributes['language'];			
			$configObj = new ConfigObj();
			$configObj->writeSettings("config-source" . $newsourceid . ".cfg", $configSettingsNew);		
			
			//Send email to user
			$configServerSettings = $configObj->getSettings("config-general.cfg", NULL, NULL);
			//Define reply-to field, source configuration takes over server configuration
			if ($configServerSettings['cfgemailreplyto'] != '') {$emailReplyTo = $configServerSettings['cfgemailreplyto'];	}
			Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: Host: ==" . $configServerSettings['cfgemailsmtpserver'] . "==");								
			Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: Port: ==" . $configServerSettings['cfgemailsmtpserverport'] . "==");	
			if ($configServerSettings['cfgemailsmtpauth'] == "on") {							
				Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: SMTP Auth Username: ==" . $configServerSettings['cfgemailsmtpauthusername'] . "==");								
			}							
			Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: Start TLS: ==" . $configServerSettings['cfgemailsmtpstartttls'] . "==");								
			Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: AddAddress: ==" . $this->attributes['email'] . "==");								
			Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: AddBCC: ==" . $configServerSettings['cfgemailsendbcc'] . "==");	
			Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: AddReplyTo: ==" . $emailReplyTo . "==");
			Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: Subject: ==" . $this->attributes['emailsubject'] . "==");
			Log::debug("Log: /remote/lib/models/cloususer.php - save() - EMail: Content: ==" . $this->attributes['emailcontent'] . "==");

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
				$mail->AddAddress($this->attributes['email']);
				if ($configServerSettings['cfgemailsendbcc'] != "") {		
					$mail->AddBCC($configServerSettings['cfgemailsendbcc']);	
				}	
				$mail->SetFrom($configServerSettings['cfgemailsendfrom'], 'Webcampak');
				if (isset($emailReplyTo) && $emailReplyTo != "") {
					$mail->AddReplyTo($emailReplyTo);
				}
				//$mail->Subject = utf8_encode($this->attributes['emailsubject']);
				$mail->Subject = $this->attributes['emailsubject'];				
				//$mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
				//$mail->Body    = utf8_encode($this->attributes['emailcontent']);
				$mail->Body    = $this->attributes['emailcontent'];
				//$mail->MsgHTML(file_get_contents('contents.html'));
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Sending email ...");								
				$mail->Send();
				Log::debug("Log: /remote/lib/models/picturessendemail.php - update() - Email successfully sent");										
		}
				
		return $insertCloudUser;
	}

	public function to_hash() {
		Log::debug("Log: /remote/lib/models/clouduser.php - to_hash() function");
		return $this->attributes;
	}

}

#!/usr/bin/python
# -*- coding: utf-8 -*-
# Copyright 2010-2012 Infracom & Eurotechnia (support@webcampak.com)
# This file is part of the Webcampak project.
# Webcampak is free software: you can redistribute it and/or modify it 
# under the terms of the GNU General Public License as published by 
# the Free Software Foundation, either version 3 of the License, 
# or (at your option) any later version.

# Webcampak is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
# without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
# See the GNU General Public License for more details.

# You should have received a copy of the GNU General Public License along with Webcampak. 
# If not, see http://www.gnu.org/licenses/


import os, sys, smtplib, datetime, tempfile, subprocess, datetime, shutil, time, ftplib
import getopt
import time
import smtplib
import zipfile
import socket
import urllib
import pwd
import locale
import gettext

from email.MIMEMultipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email.Utils import COMMASPACE, formatdate
from email import Encoders
from ctypes import *	

# This class is used to send an email
class EmailClass:
	def __init__(self, c, cfgcurrentsource, g, debug):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')

	# Function: SendEmail
	# Description; This function is used to send an email, most parameters are stored within source config file
	#	- It collects config values and fill main parameters (From, To, Server, Port, ...)
	#	- It checks if a file must be enclosed, if yes the file is zipped
	#	- It configures SMTP (auth, tls, ...)
	#	- It sends the message
	#	- It removes the zip file
	## Subject: Email subject
	## Text: Email content
	## FilePath: Path of the file to be enclosed
	## FileName: Filename to be enclosed with the email
	## FileManager: Instance of FileManager
	# Return: Nothing
	def SendEmail(self, Subject, Text, FilePath, FileName, FileManager):
		EmailFrom = self.G.getConfig('cfgemailsendfrom')
		EmailTo = self.C.getConfig('cfgemailsendto')
		EmailCC = self.C.getConfig('cfgemailsendcc')
		EmailBCC = self.G.getConfig('cfgemailsendbcc')
		ReplyTo = ""
		if self.G.getConfig('cfgemailreplyto') != "": # We look into global configuration to see if a reply-to field has been set 
			ReplyTo = self.G.getConfig('cfgemailreplyto')
		if self.C.getConfig('cfgemailreplyto') != "": # We look into source configuration to see if a reply-to field has been set, it overwrites the global reply-to setting
			ReplyTo = self.C.getConfig('cfgemailreplyto')		
				
		Server = self.G.getConfig('cfgemailsmtpserver')
		ServerPort = self.G.getConfig('cfgemailsmtpserverport')
		self.Debug.Display(_("Email: Preparing to send an email to: %(To)s from: %(From)s using Server:Port: %(Server)s:%(ServerPort)s") % {'To': EmailTo,'From': EmailFrom,'Server': Server,'ServerPort': ServerPort } )	
		self.Debug.Display(_("Email: Subject: %(Subject)s") % {'Subject': Subject} )	
		msg = MIMEMultipart()
		msg['From'] = EmailFrom
		msg['To'] = EmailTo
		msg['CC'] = EmailCC	
		msg['Date'] = formatdate(localtime=True)
		msg['Subject'] = Subject
		msg.attach( MIMEText(Text) )

		EmailCC = [EmailCC]
		EmailBCC = [EmailBCC]
		EmailTo = [EmailTo] + EmailCC + EmailBCC

		if ReplyTo != "":
			msg.add_header('reply-to', ReplyTo)

		if FileName != "":
			self.Debug.Display(_("Email: Adding enclosed file: %(FileName)s.zip") % {'FileName': FileName} )	
			try:
			    import zlib
			    compression = zipfile.ZIP_DEFLATED
			except:
			    compression = zipfile.ZIP_STORED
			
			FileManager.CheckDir(self.Cfgcachedir + FileName + '.zip')	
			zf = zipfile.ZipFile(self.Cfgcachedir + FileName + '.zip', mode='w')
			zf.write(FilePath + FileName, arcname=FileName, compress_type=compression)
			zf.close()
			part = MIMEBase('application', "octet-stream")
			part.set_payload( open(self.Cfgcachedir + FileName + '.zip',"rb").read() )
			Encoders.encode_base64(part)
			part.add_header('Content-Disposition', 'attachment; filename="%s"'
				% os.path.basename(FilePath + FileName + '.zip'))
			msg.attach(part)

		try:
			smtp = smtplib.SMTP(Server, ServerPort)
		except:
			self.Debug.Display(_("Email: STMP: Error creating SMTP object"))				
		try:
			smtp.set_debuglevel(False)
		except:
			self.Debug.Display(_("Email: STMP: Error setting debug level"))	
		try:
			if self.G.getConfig('cfgemailsmtpstartttls') == "yes":
				smtp.ehlo()
				smtp.starttls()
				smtp.ehlo()
		except:
			self.Debug.Display(_("Email: STMP: Error estblishing ttls"))	
		try:
			if self.G.getConfig('cfgemailsmtpauth') == "yes":
				smtp.login(self.G.getConfig('cfgemailsmtpauthusername'), self.G.getConfig('cfgemailsmtpauthpassword'))
		except:
			self.Debug.Display(_("Email: STMP: Error estblishing smtp auth"))	
		#smtp.sendmail(EmailFrom, EmailTo, msg.as_string() )
		try:
			smtp.sendmail(EmailFrom, EmailTo, msg.as_string() )
		except:
			self.Debug.Display(_("Email: STMP: Error senting email"))	
		try:
			smtp.close()
		except:
			self.Debug.Display(_("Email: STMP: Error closing SMTP"))	

#		try:
#			smtp = smtplib.SMTP(Server, ServerPort)
#			# Strat TLS		
#			smtp.set_debuglevel(True)
#			if self.G.getConfig('cfgemailsmtpstartttls') == "yes":
#				smtp.ehlo()
#				smtp.starttls()
#				smtp.ehlo()
#			if self.G.getConfig('cfgemailsmtpauth') == "yes":
#				smtp.login(self.G.getConfig('cfgemailsmtpauthusername'), self.G.getConfig('cfgemailsmtpauthpassword'))
#			# End TLS
#			smtp.sendmail(EmailFrom, EmailTo, msg.as_string() )
#			smtp.close()
#		except:
#			print("Error while sending the email")
		# Remove Zip file
		if os.path.isfile(self.Cfgcachedir + FileName + '.zip'): 
			os.remove(self.Cfgcachedir + FileName + '.zip')

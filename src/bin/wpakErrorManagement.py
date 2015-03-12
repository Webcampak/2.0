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
from datetime import timedelta 

# Class with various functions used in case of error
class ErrorManagement:
	def __init__(self, c, cfgcurrentsource, g, debug, cmdType, EmailClass):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')
		self.Cfginitdir = self.G.getConfig('cfgbasedir') +  g.getConfig('cfginitdir')
		self.Cfglogdir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfglogdir')
		self.Cfgpictdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgpictdir')		
		self.Cfglogfile = cmdType + "-" + self.Cfgcurrentsource + ".log"
		self.EmailClass = EmailClass
		self.Cfglocalemessagesdir = self.G.getConfig('cfgbasedir') + "locale/" + self.C.getConfig('cfgsourcelanguage') + "/messages/"		
		

	# Function: CameraLookup
	# Description; This function is used to find a camera and update configuration files accordingly. Only useful in a multi cameras environment
	#	- The function scan gphoto ports which stores results in a file
	#	- The file is analyzed to find cameras USB ports
	#	- If the system is configured to use different cameras (not the same model / brand)
	#		- If the model is found in the scan file, the USB port is updated in the global system configuration file
	#	- If the system is configured to use identical cameras (same model / brand)
	#		- The system will get the camera owner from the USB port of the scan file
	#		- It will try to see if the camera's owner matches owner of the configuration file, 
	#		- If yes the USB port is updated
	## Gphoto: Gphoto instance
	# Return: Nothing
	def CameraLookup(self, Gphoto):
		if self.G.getConfig('cfggphotoports') == "yes":
			import filecmp
			self.Debug.Display(_("Camera Lookup: Capture previously failed, checking USB port of the camera"))	
			Gphoto.ScanPorts() 
			if os.path.isfile(self.Cfgcachedir + 'gphotoports.cur'): 	
				CurrentScanFile = open(self.Cfgcachedir + 'gphotoports.cur' ,'r')
				import re
				for line in CurrentScanFile:
					regexusb = re.compile('usb:...,...')
					resultusb = regexusb.search(line)
					regexcamera = re.compile('.*usb:')
					resultcamera = regexcamera.search(line)
					self.Debug.Display(_("Camera Lookup: USB Port: %(USBPort)s") % {'USBPort': resultusb.group(0)} )	
					if self.G.getConfig('cfggphotoportscameras') == "different":
						if self.C.getConfig('cfgsourcegphotocameramodel') in resultcamera.group(0):
							self.Debug.Display(_("Camera Lookup: Camera: %(USBCamera)s") % {'USBCamera': resultcamera.group(0)} )	
							self.Debug.Display(_("Camera Lookup: Camera in config file: %(USBCameraConfig)s") % {'USBCameraConfig': self.C.getConfig('cfgsourcegphotocameramodel')} )	
							self.Debug.Display(_("Camera Lookup: USB Port configured: %(USBPortConfigured)s") % {'USBPortConfigured': self.C.getConfig('cfgsourcegphotocameraportdetail')} )	
							self.Debug.Display(_("Camera Lookup: USB Port detected: %(USBPordDetected)s") % {'USBPordDetected': resultusb.group(0)} )	
							try:
								self.Debug.Display(_("Camera Lookup: Modification of the configuration file"))
								self.C.setConfig('cfgsourcegphotocameraportdetail', resultusb.group(0))
								self.Debug.Display(_("Camera Lookup: New USB Port configured: %(USBPortConfigured)s") % {'USBPortConfigured': self.C.getConfig('cfgsourcegphotocameraportdetail')} )	
							except:
								self.Debug.Display(_("Camera Lookup: Unable to modify the configuration file"))
						else:
							self.Debug.Display(_("Camera Lookup: Unknown camera"))
					elif self.G.getConfig('cfggphotoportscameras') == "identical":
						CameraOwner = Gphoto.GetCameraOwner(resultusb.group(0))
						self.Debug.Display(_("Camera Lookup: Configured camera: Port: %(USBPortConfigured)s, Owner: %(OwnerConfigured)s") % {'USBPortConfigured': self.C.getConfig('cfgsourcegphotocameraportdetail'), 'OwnerConfigured': self.C.getConfig('cfgsourcegphotoowner')} )	
						self.Debug.Display(_("Camera Lookup: Detected Camera: Port: %(USBPortConfigured)s, Owner: %(OwnerConfigured)s") % {'USBPortConfigured': resultusb.group(0), 'OwnerConfigured': CameraOwner} )	
						if self.C.getConfig('cfgsourcegphotoowner') == CameraOwner and self.C.getConfig('cfgsourcegphotocameraportdetail') != resultusb.group(0):
							self.Debug.Display(_("Camera Lookup: Camera owner identified"))
							try:
								self.Debug.Display(_("Camera Lookup: Modification of the configuration file"))
								self.C.setConfig('cfgsourcegphotocameraportdetail', resultusb.group(0))
								self.Debug.Display(_("Camera Lookup: New USB Port configured: %(USBPortConfigured)s") % {'USBPortConfigured': self.C.getConfig('cfgsourcegphotocameraportdetail')} )	
							except:
								self.Debug.Display(_("Camera Lookup: Unable to modify the configuration file"))
				CurrentScanFile.close()			

	# Function: SendErrorEmail
	# Description; This function is used to send an email in case of capture error
	#	- The email is only sent once
	#	- If never sent and over the alert threshold an email is sent via the EmailClass
	## SendEmailErrorCount: Current number of capture errors
	## FileManager: FileManager instance
	# Return: Nothing
	def SendErrorEmail(self, SendEmailErrorCount, FileManager):
		if FileManager.SecondsSinceLastCapture(self.Cfgpictdir, self.C.getConfig('cfgcapturetimezone')) == None:
			timedifference = 0
		else: 
			timedifference = timedelta(seconds=FileManager.SecondsSinceLastCapture(self.Cfgpictdir, self.C.getConfig('cfgcapturetimezone')).seconds) 
		self.Debug.Display(_("Capture Error: Last capture %(LastCaptureAgo)s ago") % {'LastCaptureAgo': str(timedifference)})
		if os.path.isfile(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountemail"):
			CurrentEmailCounter = ErrorManagement.GetCustomCounter(self, "errorcountemail") + 1
			UpdateCounter = ErrorManagement.UpdateCustomCounter(self, "errorcountemail", CurrentEmailCounter)
			if int(self.C.getConfig('cfgemailalertreminder')) <= int(CurrentEmailCounter) and self.C.getConfig('cfgemailalertreminder') != "no": 
				self.Debug.Display(_("Capture Error: Error counter is: %(CurrentEmailCounter)s (Total: %(SendEmailErrorCount)s), sending a reminder (>= %(cfgemailalertreminder)s)") % {'CurrentEmailCounter': str(CurrentEmailCounter), 'SendEmailErrorCount': str(SendEmailErrorCount), 'cfgemailalertreminder': self.C.getConfig('cfgemailalertreminder')})
				UpdateCounter = ErrorManagement.UpdateCustomCounter(self, "errorcountemail", 0)
				#os.remove(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountemail")		
		if ErrorManagement.GetCustomCounter(self, "errorcountemail") >= 1:
			self.Debug.Display(_("Capture Error: Error email already sent, error counter since last email: %(CurrentEmailCounter)s, next email at: %(cfgemailalertreminder)s")% {'CurrentEmailCounter': str(CurrentEmailCounter), 'cfgemailalertreminder': self.C.getConfig('cfgemailalertreminder')})
		else:
			self.Debug.Display(_("Capture Error: Current error count: %(SendEmailErrorCount)s/%(EmailAlertFailure)s") % {'SendEmailErrorCount': str(SendEmailErrorCount), 'EmailAlertFailure': self.C.getConfig('cfgemailalertfailure')} )
			if int(SendEmailErrorCount) >= int(self.C.getConfig('cfgemailalertfailure')):
				#g = open(self.Cfglocalemessagesdir + "email_error.txt", 'r')
				#self.EmailClass.SendEmail(_("%(CurrentHostname)s: Error while capturing source: %(CurrentSourceID)s - Time since last capture: %(TimeSinceLastCapture)s") % {'CurrentHostname': str(socket.gethostname()), 'CurrentSourceID': self.Cfgcurrentsource,  'TimeSinceLastCapture': str(timedifference)}, g.read(), self.Cfglogdir, self.Cfglogfile, FileManager)
				#g.close()	
				self.Debug.Display(_("Capture Error: Preparation of an email alert about the error"))				
				if os.path.isfile(self.Cfglocalemessagesdir + "emailErrorContent.txt") and os.path.isfile(self.Cfglocalemessagesdir + "emailErrorSubject.txt"):
					emailContentFile = open(self.Cfglocalemessagesdir + "emailErrorContent.txt", 'r')
					emailContent = emailContentFile.read()
					emailContentFile.close()
					emailSubjectFile = open(self.Cfglocalemessagesdir + "emailErrorSubject.txt", 'r')
					emailSubject = emailSubjectFile.read()
					emailSubjectFile.close()
					emailSubject = emailSubject.replace("#CURRENTHOSTNAME#", socket.gethostname())
					emailSubject = emailSubject.replace("#CURRENTSOURCE#", self.Cfgcurrentsource)
					emailSubject = emailSubject.replace("#TIMESINCELASTCAPTURE#", str(timedifference))
					self.EmailClass.SendEmail(emailSubject, emailContent, self.Cfglogdir, self.Cfglogfile, FileManager)					
				f = open(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountemail", 'w')
				f.write('1')
				f.close()

	# Function: SendSuccessEmail
	# Description; This function is used to send an email if a capture is successful after a number of capture issues
	#	Objective is to let the user know that the system is back online.
	#	The error count is then removed
	## SendEmailErrorCount: Current number of capture errors
	## FileManager: FileManager instance
	# Return: Nothing
	def SendSuccessEmail(self):
		if os.path.isfile(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcount"): 			# On verifie si le fichier compteur d'erreurs existe
			#if ErrorManagement.CurrentStatus(self) > 0 and self.C.getConfig('cfgemailalwaysnotify') == "yes":
			if (ErrorManagement.CurrentStatus(self) >= int(self.C.getConfig('cfgemailalertfailure')) or self.C.getConfig('cfgemailalwaysnotify') == "yes") and self.C.getConfig('cfgemailerroractivate') == "yes":				
				#if self.C.getConfig('cfgemailalwaysnotify') == "yes":
				#g = open(self.Cfglocalemessagesdir + "email_online.txt", 'r')
				#self.EmailClass.SendEmail(socket.gethostname() + ": Source " + self.Cfgcurrentsource + " en ligne apres " + str(ErrorManagement.CurrentStatus(self)) + " echecs", g.read(), self.Cfglogdir, "", "")
				#g.close()
				self.Debug.Display("Capture Success: Preparation of an email to inform that the system is back")				
				if os.path.isfile(self.Cfglocalemessagesdir + "emailOnlineContent.txt") and os.path.isfile(self.Cfglocalemessagesdir + "emailOnlineSubject.txt"):
					emailContentFile = open(self.Cfglocalemessagesdir + "emailOnlineContent.txt", 'r')
					emailContent = emailContentFile.read()
					emailContentFile.close()
					emailSubjectFile = open(self.Cfglocalemessagesdir + "emailOnlineSubject.txt", 'r')
					emailSubject = emailSubjectFile.read()
					emailSubjectFile.close()
					emailSubject = emailSubject.replace("#CURRENTHOSTNAME#", socket.gethostname())
					emailSubject = emailSubject.replace("#CURRENTSOURCE#", self.Cfgcurrentsource)
					emailSubject = emailSubject.replace("#NBFAILURES#", str(ErrorManagement.CurrentStatus(self)))
					self.EmailClass.SendEmail(emailSubject, emailContent, self.Cfglogdir, "", "")					
			else:
				self.Debug.Display("Capture Success: Not sending 'back online' email as the error count was not sufficient")
				
			self.Debug.Display("Capture Success: Deleting 'errorcount' file (to reset error counter)")																				
			os.remove(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcount")
			

	# Function: GetCustomCounter
	# Description; This function Read and return current value of a custom counter, 
	#		This value is stored within a file per source in "webcampak/resources/cache" directory
	# Return: Current Status (error count)
	def GetCustomCounter(self, CustomFile):
		if os.path.isfile(str(self.Cfgcachedir) + "source" + str(self.Cfgcurrentsource) + "-" + CustomFile): 
			f = open(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-" + CustomFile, 'r')		
			try:
				return int(f.read())
			except:
				return 0
			f.close()
		else:
			return 0

	# Function: UpdateCustomCounter
	# Description; Write current error count to a file
	#		This value is stored within a file per source in "webcampak/resources/cache" directory
	# Return: Nothing
	def UpdateCustomCounter(self, CustomFile, ErrorCount):
		f = open(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-" + CustomFile, 'w')
		f.write(str(ErrorCount))
		f.close()

	# Function: CurrentStatus
	# Description; This function Read and return current capture error count from file, 
	#		This value is stored within a file per source in "webcampak/resources/cache" directory
	# Return: Current Status (error count)
	def CurrentStatus(self):
		if os.path.isfile(str(self.Cfgcachedir) + "source" + str(self.Cfgcurrentsource) + "-errorcount"): 			# On verifie si le fichier compteur d'erreurs existe
			f = open(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcount", 'r')		# Ouverture du fichier compteur en lecture pour recupere le compteur
			try:
				return int(f.read())
			except:
				return 0
			f.close()
		else:
			return 0

	# Function: UpdateStatus
	# Description; Write current error count to a file
	#		This value is stored within a file per source in "webcampak/resources/cache" directory
	# Return: Nothing
	def UpdateStatus(self, ErrorCount):
		f = open(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcount", 'w')
		f.write(str(ErrorCount))
		f.close()

	# Function: LatestCaptureTime
	# Description; Read and return last capture timestamp from file
	#		This value is stored within a file per source in "webcampak/resources/cache" directory
	#		Only used for Phidget
	# Return: Last capture duration
	def LatestCaptureTime(self):
		if os.path.isfile(str(self.Cfgcachedir) + "source" + str(self.Cfgcurrentsource) + "-capturetime"):
			f = open(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-capturetime", 'r')
			try:
				return int(f.read())
			except:
				return 0				
			f.close()
		else:
			return 0

	# MOVED TO ANOTHER CLASS
	# Function: RestartCamera
	# Description; Restart the camera (Phidget only)
	#	- The function checks if the camera has already been restarted
	# Return: Nothing
	#def RestartCamera(self, SendEmailErrorCount):
	#	if os.path.isfile(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountphidget"):
	#		self.Debug.Display(_("Capture Error: The camera has already been restarted... no additionnal restarts planned"))
	#	else:
	#		self.Debug.Display(_("Capture Error: Error count %(SendEmailErrorCount)s/%(EmailPhidgetFailure)s") % {'SendEmailErrorCount': str(SendEmailErrorCount), 'EmailPhidgetFailure': self.C.getConfig('cfgphidgetfailure')} )
	#		self.Phidget.CameraRestart()
	#		f = open(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountphidget", 'w')
	#		f.write('1')
	#		f.close()
	
	# MOVED TO ANOTHER CLASS
	# Function: CaptureFailure
	# Description; This function is used when capture failed
	#	- It checks if it is necessary to send an email to inform about the issue
	#	- It checks if it is necessary to restart the camera (Phidget only)
	## FileManager: FileManager instance
	# Return: Nothing
	#def CaptureFailure(self, FileManager):
	#	CurrentErrorCount = ErrorManagement.CurrentStatus(self)
	#	self.Debug.Display(_("Capture Error: Current error count: %(CurrentErrorCount)s") % {'CurrentErrorCount': str(CurrentErrorCount)} )
	#	if int(CurrentErrorCount) >= int(self.C.getConfig('cfgemailalertfailure')) and self.C.getConfig('cfgemailerroractivate') == "yes":
	#		ErrorManagement.SendErrorEmail(self,CurrentErrorCount, FileManager)	  
	#	if int(CurrentErrorCount) >= int(self.C.getConfig('cfgphidgetfailure')) and self.C.getConfig('cfgphidgeterroractivate') == "yes":
	#		ErrorManagement.RestartCamera(self,CurrentErrorCount)

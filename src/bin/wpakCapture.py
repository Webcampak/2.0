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
from math import *
from dateutil import tz

from wpakPhidget import Phidget
from wpakCaptureManagement import CaptureManagement
from wpakGphoto import Gphoto
from wpakIPCam import IPCam
from wpakRtsp import Rtsp
from wpakWebcam import Webcam
from wpakWebFile import WebFile
from wpakWpakGet import WpakGet
from wpakImageMagick import ImageMagick
from wpakDateFormat import DateFormat
from wpakGraph import Graph
from wpakConfig import Config
from wpakFTPClass import FTPClass

# This class is the main class used to capture a picture
class Capture:
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, FileManager, ErrorManagement, EmailClass, CmdMotion):
		self.G = g
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.ErrorManagement = ErrorManagement
		self.EmailClass = EmailClass
		self.FileManager = FileManager
		self.CmdMotion = CmdMotion
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')
		self.Cfglivedir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfglivedir')
		self.Cfgvideodir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgvideodir')
		self.Cfgpictdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgpictdir')
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.Cfgstatsdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgstatsdir')
		self.Cfgdispdate = self.Cfgnow.strftime("%Y%m%d%H%M%S")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"
		self.Cfginitdir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfginitdir')
		self.Cfgnowtimestamp = cfgnow.strftime("%s")
		self.Cfgwatermarkdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgwatermarkdir')
		self.Cfglocalemessagesdir = self.G.getConfig('cfgbasedir') + "locale/" + self.G.getConfig('cfgsystemlang') + "/messages/"
		self.DateFormat = DateFormat(self.C)
		self.Phidget = Phidget(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.ErrorManagement)
		self.Graph = Graph(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.FileManager)
		self.CaptureManagement = CaptureManagement(c, self.Cfgcurrentsource, g, debug, cfgnow, self.Phidget, self.DateFormat, self.FileManager, self.CmdMotion, self.ErrorManagement, self.Graph, cmdType, EmailClass)
		self.Gphoto = Gphoto(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.FileManager)
		self.IPCam = IPCam(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.FileManager, self.ErrorManagement, self.CaptureManagement)
		self.Rtsp = Rtsp(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.FileManager)
		self.Webcam = Webcam(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.FileManager)
		self.WebFile = WebFile(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.FileManager)
		self.WpakGet = WpakGet(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.FileManager)		
		

	# Function: SetTimestamp
	# Description; Record capture's timestamp in a specific file within cache directory
	# File format: txt, Filename: capture-X where X is a source number
	# Return: Nothing, only write a timestamp to a file
	def SetTimestamp(self):
		self.FileManager.CheckDir(self.Cfgcachedir + "capture-" + self.Cfgcurrentsource)
		f = open(self.Cfgcachedir + "capture-" + self.Cfgcurrentsource, 'w')
		f.write(self.Cfgnow.strftime("%s")) 
		f.close()

	# Function: ProcessFailedCapture
	# Description; Set of functions to be called if a capture fail.
	#	- The function apply a specific legend to a pre-defined failed picture "i.e. picture saying capture failed"
	#	- The function create appropriate hotlinks and upload them via FTP if applicable
	## i: Image object containing the source file
	## cfgnow: Timestamp of the capture
	## CreateHotlink: True or False, activate hotlink creation
	# Return: Nothing
	def ProcessFailedCapture(self, i, cfgnow, CreateHotlink):
		cfgdispday = cfgnow.strftime("%Y%m%d")
		cfgdispdate = cfgnow.strftime("%Y%m%d%H%M%S")
		cfgfilename = cfgdispdate + ".jpg"
		i.Text('Helvetica', '10', 'southwest', 'black', '14,10', _("Capture Error - "), self.DateFormat.DateFormat(self.Cfgnow), 'black', '14,10', self.Cfgtmpdir + self.Cfgfilename)		
		if CreateHotlink == True and self.C.getConfig('cfghotlinkerrorcreate') == "yes":
			for j in range(1, 5):
				if self.C.getConfig('cfghotlinksize' + str(j)) != "no":
					self.Debug.Display(_("Failed Capture: ImageMagick: Hotlink: %(Hotlinkfile)s") % {'Hotlinkfile': str(j)} )
					self.Phidget.Display(0, _("IM> Hotlink ") + str(j))
					i.Resize(self.C.getConfig('cfghotlinksize' + str(j)), self.Cfglivedir, "webcam-" + self.C.getConfig('cfghotlinksize' + str(j)) + ".jpg")
					os.chmod(self.Cfglivedir + "webcam-" + self.C.getConfig('cfghotlinksize' + str(j)) + ".jpg", 0775) 			
					if self.C.getConfig('cfgftphotlinkserverid') != "no":
						from wpakFTPClass import FTPClass
						self.Phidget.Display(0, _("FTP> Hotlink ") + str(j))	
						self.Debug.Display(_("Failed Capture: ImageMagick: Upload hotlink file: %(Hotlinkfile)s") % {'Hotlinkfile': str(j)} )
						FTPClass.FTPUpload(self.Cfgcurrentsource, self.C.getConfig('cfgftphotlinkserverid'), "", self.Cfglivedir,  "webcam-" + self.C.getConfig('cfghotlinksize' + str(j)) + ".jpg", self.Debug, self.C.getConfig('cfgftphotlinkserverretry'))						
				else:
					self.Debug.Display(_("Failed Capture: ImageMagick: Hotlink: %(Hotlinkfile)s disabled") % {'Hotlinkfile': str(j)} )

	# Function: Sensors (with Phidget board only)
	# Description; Capture sensor values and stores it in a file, using configobj parsing functions
	#	During capture, backlight is disabled to get more accurate results.
	#	- The function first check if sensor capture is activated
	#	- It then create a configobj instance (which create a file within pictures directory)
	#	- Values captured from sensors are then stored within this file.
	## cfgnow: Timestamp of the capture
	# Return: Nothing
	def Sensors(self, cfgnow):
		cfgdispday = cfgnow.strftime("%Y%m%d")
		cfgdispdate = cfgnow.strftime("%Y%m%d%H%M%S")
		cfgfilename = cfgdispdate + ".txt"
		self.FileManager.CheckDir(self.Cfgpictdir + cfgdispday + "/" + self.G.getConfig('cfgphidgetcapturefile'))			
		Sensors = Config(self.Cfgpictdir + cfgdispday + "/" + self.G.getConfig('cfgphidgetcapturefile'))
		Sensors.setSensor(cfgdispdate, "", "")
		Sensors.setSensor(cfgdispdate, 'Timestamp', cfgnow.strftime("%s"))
		if self.G.getConfig('cfgphidgetactivate') == "yes":
			self.Phidget.SetBackLight(0)
			for ListSourceSensors in range(1,int(self.C.getConfig('cfgphidgetsensornb')) + 1):
				if self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] != "no":
					for ListPhidgetSensors in range(1,int(self.G.getConfig('cfgphidgetsensortypenb')) + 1):
						if self.G.getConfig('cfgphidgetsensortype' + str(ListPhidgetSensors))[0] == self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] and self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] != "no":
							try:							
								SensorValue = int(self.Phidget.GetSensor(self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[1]))
								PhidgetResult = round(eval(self.G.getConfig('cfgphidgetsensortype' + str(ListPhidgetSensors))[3]),1)
								Sensors.setSensor(cfgdispdate, str(self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0]), str(PhidgetResult))
								self.Debug.Display(_("Sensors: %(SensorType)s = %(PhidgetResult)s (source: %(SensorValue)s)") % {'SensorType': str(self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[2]), 'PhidgetResult': str(PhidgetResult), 'SensorValue': str(SensorValue)} )
							except:
								self.Debug.Display(_("Sensors: Capture error"))
			self.Phidget.SetBackLight(1)
			if self.C.getConfig('cfgftpphidgetserverid') != "no" and os.path.isfile(self.Cfgpictdir + cfgdispday + "/" + self.G.getConfig('cfgphidgetcapturefile')): 
				FTPResult = FTPClass.FTPUpload(self.Cfgcurrentsource, self.C.getConfig('cfgftpphidgetserverid'), cfgdispday + "/", self.Cfgpictdir + cfgdispday + "/",  self.G.getConfig('cfgphidgetcapturefile'), self.Debug, self.C.getConfig('cfgftpphidgetserverretry'))


	# Function: Main 
	# Description; Main function of the class, fully manage the capture process, see comments within the function
	# Return: Nothing
	def Main(self):
		#APP_NAME = self.G.getConfig('cfggettextdomain')
		#LOCALE_DIR = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfglocaledir')
		#CURRENT_LOCALE = self.G.getConfig('cfgsystemlang')		
		#t = gettext.translation(APP_NAME, LOCALE_DIR)
		#_ = t.ugettext
		#t.install()
		t = gettext.translation(self.G.getConfig('cfggettextdomain'), self.G.getConfig('cfgbasedir') + self.G.getConfig('cfglocaledir'), fallback=True)
		_ = t.ugettext
		self.Phidget.SetBackLight(1)																												# Turn on Phidget backlight
		self.Debug.Purge() 																															# Purge old log files (if necessary)
		global CurrentErrorStatus
		CurrentErrorStatus = self.ErrorManagement.CurrentStatus() 																		# Get current error status
		if self.C.getConfig('cfgsourceactive') == "yes": 																					# Check if the source if activated
			if self.CaptureManagement.IsCaptureAllowed() == True: 																		# Check if capture on this source is allowed
				self.Debug.Display(_("Capture: Starting the capture process"))
				Capture.SetTimestamp(self) 																										# Record capture timestamp						
				if self.C.getConfig('cfgsourcetype') == "gphoto":																			# If the source is a gphoto camera
					if self.ErrorManagement.CurrentStatus() > 0 : 																			# If there was an error with previous capture we will try to look for a camera
						self.Debug.Display(_("Capture: Previous capture failed, looking for a camera"))
						self.ErrorManagement.CameraLookup(self.Gphoto)																		# Function used to look (search USB port) for a Gphoto camera
					self.Phidget.Display(0, _("> Capt. Photo"))																				# Display text on Phidget board
					CaptureSuccess = self.Gphoto.Capture()																						# Start Gphoto capture function, return True or False 
				if self.C.getConfig('cfgsourcetype') == "webcam":																			# If the source is a webcam
					self.Phidget.Display(0, _("> Capt. Webcam"))																				# Display text on Phidget board
					CaptureSuccess = self.Webcam.Capture(CurrentErrorStatus)																# Start Webcam capture function, return True or False
				if self.C.getConfig('cfgsourcetype') == "ipcam" or (self.C.getConfig('cfgsourcetype') == "wpak" and self.C.getConfig('cfgsourcewpaktype') == "rec"):	# If the source is an IP Camera
					self.Phidget.Display(0, _("> Capt. IPCam"))																				# Display text on Phidget board
					CaptureSuccess = self.IPCam.Capture()																						# Start IPCam capture function, return True or False
				if self.C.getConfig('cfgsourcetype') == "webfile":																			# If the source is a Web File
					self.Phidget.Display(0, _("> Capt. WebFile"))																			# Display text on Phidget board
					CaptureSuccess = self.WebFile.Capture()																					# Start Webfile capture function, return True or False	
				if self.C.getConfig('cfgsourcetype') == "wpak" and self.C.getConfig('cfgsourcewpaktype') == "get":			# If the source is another source of the same Webcampak
					self.Phidget.Display(0, _("> Capt. Wpak"))																				# Display text on Phidget board
					CaptureSuccess = self.WpakGet.Capture()																					# Start Webfile capture function, return True or False										
				if self.C.getConfig('cfgsourcetype') == "rtsp":																				# If the source is a RTSP stream
					self.Phidget.Display(0, "> Capt. RTSP")																					# Display text on Phidget board
					CaptureSuccess = self.Rtsp.Capture()																						# Start Rtsp capture function, return True or False				
				if self.C.getConfig('cfgsourcetype') == "sensor":																			# If the source is a RTSP stream
					self.Phidget.Display(0, "> Capt. Sensor")																					# Display text on Phidget board
					CaptureSuccess = True

				if self.C.getConfig('cfgsourcetype') != "ipcam":
					# We record capture stats (number of capture request, failure, success, ...)
					cfgcurrentday = self.Cfgnow.strftime("%Y%m%d")
					cfgcurrentdaytime = self.Cfgnow.strftime("%Y%m%d%H%M%S")						
					self.FileManager.CheckDir(self.Cfgstatsdir + "capture-" + cfgcurrentday + ".txt")					
					captureStatsFile = Config(self.Cfgstatsdir + "capture-" + cfgcurrentday + ".txt")
					captureStatsFile.setStat('LatestCapture', cfgcurrentdaytime)					
					captureStatsFile.setStat('CaptureRequest', int(captureStatsFile.getStat('CaptureRequest')) + 1)
					captureStatsFile.setStat('CaptureSuccess', captureStatsFile.getStat('CaptureSuccess')) # This line sets "CaptureSuccess" to 0 if this tag does not exists						
					captureStatsFile.setStat('CaptureFailure', captureStatsFile.getStat('CaptureFailure')) # This line sets "CaptureFailure" to 0 if this tag does not exists
					if CaptureSuccess == False:
						captureStatsFile.setStat('CaptureFailure', int(captureStatsFile.getStat('CaptureFailure')) + 1)					
					elif CaptureSuccess == True:
						captureStatsFile.setStat('CaptureSuccess', int(captureStatsFile.getStat('CaptureSuccess')) + 1)					
												
				Capture.Sensors(self, self.Cfgnow)					# Capture Phidget Sensors
					
				if CaptureSuccess == False and self.C.getConfig('cfgsourcetype') != "sensor":						# If capture failed
					if self.C.getConfig('cfgsourcetype') == "ipcam" and self.C.getConfig('cfgsourcecamiphotlinkerror') == "no":
						self.Debug.Display(_("Capture: Capture failed, no actions will be taken (no error thumbnails, no emails, ...)"))
					else:
						self.Debug.Display(_("Capture: Capture failed: 4 seconds break"))
						self.Phidget.Display(_("[__ERROR__]"), _("> Capture Failed"))	# Display text on Phidget board
						time.sleep(2) 							# Wait 2 seconds to let text to be read on Phidget board
						self.Phidget.Display(_("[__ERROR__]"), _("> Crea. Fail. Pic."))	# Display text on Phidget board
						time.sleep(2) 							# Wait 2 seconds to let text to be read on Phidget board
						self.Debug.Display(_("Capture: Creation failed"))
						shutil.copy(self.Cfglocalemessagesdir + "capture-failed.jpg", self.Cfgtmpdir + self.Cfgfilename)	# Copy specific failed picture to tmp directory to be processed similar to a successful capture
						i = ImageMagick(self.Cfgtmpdir + self.Cfgfilename, self.G, self.Debug)	# Create ImageMagick object with source filename
						Capture.ProcessFailedCapture(self, i, self.Cfgnow, True)	# Process failed capture (picture process only)
						self.CaptureManagement.CaptureFailure()		# Actions to be started after a failed capture (send an email and/or restart camera)
						self.CaptureManagement.Purge(self.Cfgnow)			# Purge tmp directory, delete old pictures after X days or over XX MB global size
				elif CaptureSuccess == True and self.C.getConfig('cfgsourcetype') != "ipcam" and self.C.getConfig('cfgsourcetype') != "sensor":	# If capture is successful and capture is not an ipcam (specific processing)
					i = ImageMagick(self.Cfgtmpdir + self.Cfgfilename, self.G, self.Debug)	# Create ImageMagick object with source filename
					self.CaptureManagement.ProcessImages(i, self.Cfgnow, True) 		# Process pictures (crop, resize, watermark, legend, ...)
					self.CaptureManagement.Archive(self.Cfgnow) 				# Archive pictures
					self.CaptureManagement.Hotlink(i, self.Cfgnow, True, captureStatsFile) 			# Create Hotlink, if applicable send via FTP
					self.CaptureManagement.FTP(self.Cfgnow, captureStatsFile)							# Send pictures via FTP
					self.CaptureManagement.SecondFTP(self.Cfgnow, captureStatsFile)					# Send pictures via FTP to another FTP server
					self.CaptureManagement.SourceCopy(self.Cfgnow)											# Copy pictures to other internal source
					self.CaptureManagement.SecondSourceCopy(self.Cfgnow)									# Copy pictures to other internal source				
					self.CaptureManagement.Purge(self.Cfgnow)													# Purge tmp directory, delete old pictures after X days or over XX MB global size


				self.CaptureManagement.StatsProgram()	

				self.CaptureManagement.EmailCaptureStats()	

				cfgend = datetime.datetime.utcnow()
				if self.C.getConfig('cfgcapturetimezone') != "": # Update the timezone from UTC to the source's timezone
					sourceTimezone = tz.gettz(self.C.getConfig('cfgcapturetimezone'))
					cfgend = cfgend.replace(tzinfo=tz.gettz('UTC'))				
					cfgend = cfgend.astimezone(sourceTimezone)					
				cfgendtimestamp = cfgend.strftime("%s")					# End of processing timestamp
				TotalCaptureTime = int(cfgendtimestamp) - int(self.Cfgnowtimestamp)	# Calculate global capture time since beginning
	
				# Capture time is only stored to display a progession bar on phidget device, otherwise it is not necessary
				if os.path.isfile(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-capturetime"):
					os.remove(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-capturetime")
				f = open(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-capturetime", 'w')
				f.write(str(TotalCaptureTime))
				f.close()
				
				self.Debug.Display(_("Capture: Overall capture time: %(TotalCaptureTime)s seconds") % {'TotalCaptureTime': str(TotalCaptureTime)} )
				self.Phidget.SetBackLight(0)						# Turn off backlight
				self.Debug.Display(_("-----------------------------------------------------------------------"))
		else:
			self.Debug.Display(_("Authorization: Capture not allowed"))
			

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

from wpakImageMagick import ImageMagick
from wpakFileManager import FileManager
from wpakConfig import Config
from PIL import Image
from PIL.ExifTags import TAGS

# Class used to manipulate pictures from IP Cameras
class IPCam: 
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, FileManager, ErrorManagement, CaptureManagement):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cmdtype = cmdType
		self.Cfgnow = cfgnow
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.Cfgpictdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgpictdir')
		self.Cfgstatsdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgstatsdir')		
		self.FileManager = FileManager
		self.ErrorManagement = ErrorManagement
		self.CaptureManagement = CaptureManagement
		#self.Capture = Capture(c, cfgcurrentsource, g, Debug, cfgnow, CmdType, FileManager, ErrorManagement, EmailClass)


	# Function: GetExifDate 
	# Description; Extract date from EXIF Metada and convert it into datetime
	# Return: timestamp 
	def GetExifDate(self, picture):
		try:
			img = Image.open(picture)
			if hasattr( img, '_getexif' ):
				exifinfo = img._getexif()
			if exifinfo != None:
				for tag, value in exifinfo.items():
					decoded = TAGS.get(tag, tag)
					if decoded == "DateTimeDigitized":
						#print "DECODED:" + str(decoded) + "VALUE" + str(value)
						#2012:05:20 10:46:37
						cfgnow = datetime.datetime(*time.strptime(value, "%Y:%m:%d %H:%M:%S")[0:6])
						return cfgnow
						break;
		except:
			return 0
		#return ret
		

	# Function: Capture 
	# Description; You don't really captures images from an IP Cam but you configure this IP Cam to send pictures to tmp directory of your source
	#	Another webcampak can be considered as an IPCam
	#	This function can handle multiple pictures at once so the process is a bit different.
	# Return: Nothing
	def Capture(self):
		self.Debug.Display(_("Catpure: IPCam: Entering the process, template: %(Template)s") % {'Template': self.C.getConfig('cfgsourcecamiptemplate')} )
		
		# We record capture stats (number of capture request, failure, success, ...)
		cfgcurrentday = self.Cfgnow.strftime("%Y%m%d")
		cfgcurrentdaytime = self.Cfgnow.strftime("%Y%m%d%H%M%S")								
		self.FileManager.CheckDir(self.Cfgstatsdir + "capture-" + cfgcurrentday + ".txt")					
		captureStatsFile = Config(self.Cfgstatsdir + "capture-" + cfgcurrentday + ".txt")	
		captureStatsFile.setStat('LatestCapture', cfgcurrentdaytime)								
		
		cpt = 0
		if self.C.getConfig('cfgsourcecamiptemplate') == "webcampak" or (self.C.getConfig('cfgsourcewpaktype') == "rec" and self.C.getConfig('cfgsourcetype') == "wpak"):
			for scandir in sorted(os.listdir(self.Cfgtmpdir), reverse=True):
				if os.path.isdir(self.Cfgtmpdir + scandir) and scandir[:2] == "20":
					cfgdispday = scandir[:8]
					for f in sorted(os.listdir(self.Cfgtmpdir + scandir), reverse=True):  
						if os.path.isfile(self.Cfgtmpdir + scandir + "/" + f) and os.path.splitext(self.Cfgtmpdir + scandir + "/" + f)[1] == ".jpg":
							#FileDate = (int(f[0] + f[1] + f[2] + f[3]), int(f[4] + f[5]), int(f[6] + f[7]), int(f[8] + f[9]), int(f[10] + f[11]), int(f[12] + f[13]), 0, 0, 0)
							#FileTimeStamp = int(time.mktime(FileDate))
							#cfgnow = datetime.datetime.fromtimestamp(FileTimeStamp)
							cfgnow = datetime.datetime(*time.strptime(f[0] + f[1] + f[2] + f[3] + "/" + f[4] + f[5] + "/" + f[6] + f[7] + "/" + f[8] + f[9] + "/" + f[10] + f[11] + "/" + f[12] + f[13], "%Y/%m/%d/%H/%M/%S")[0:6])
							cfgcurrentdate = cfgnow.strftime("%d %B %Y - %k:%M")
							cfgdispday = cfgnow.strftime("%Y%m%d")
							cfgdispdate = cfgnow.strftime("%Y%m%d%H%M%S")
							cfgfilename = cfgdispdate + ".jpg"
							self.FileManager = FileManager(self.C, self.Cfgcurrentsource, self.G, self.Debug, cfgnow, self.Cmdtype, self.ErrorManagement)
							if self.FileManager.CheckCapturedFile(self.Cfgtmpdir + scandir + "/" + f, self.Cfgtmpdir + cfgfilename):					
								self.Debug.Display(_("Catpure: IPCam: Processing %(File)s file Date: %(Date)s") % {'File': f, 'Date': cfgcurrentdate} )
								captureStatsFile.setStat('CaptureSuccess', int(captureStatsFile.getStat('CaptureSuccess')) + 1)	
								i = ImageMagick(self.Cfgtmpdir + cfgfilename, self.G, self.Debug)
								if cpt == 0 and self.C.getConfig('cfgsourcecamiplimiterotation') == "yes":
									self.CaptureManagement.ProcessImages(i, cfgnow, True)	
								elif cpt != 0 and self.C.getConfig('cfgsourcecamiplimiterotation') == "yes":
									self.CaptureManagement.ProcessImages(i, cfgnow, False)
								else:
									self.CaptureManagement.ProcessImages(i, cfgnow, True)
								self.CaptureManagement.Archive(cfgnow)
								self.CaptureManagement.Hotlink(i, cfgnow, True, captureStatsFile) 			# Create Hotlink, if applicable send via FTP
								self.CaptureManagement.FTP(cfgnow, captureStatsFile)
								self.CaptureManagement.SecondFTP(cfgnow, captureStatsFile)	
								self.CaptureManagement.SourceCopy(cfgnow)											
								self.CaptureManagement.SecondSourceCopy(cfgnow)			
								self.CaptureManagement.Purge(cfgnow)	
							cpt = cpt + 1
					self.FileManager.CheckDir(self.Cfgpictdir + cfgdispday + "/")					
					if os.path.isfile(self.Cfgtmpdir + scandir + "/" + self.G.getConfig('cfgphidgetcapturefile')):
						shutil.copy(self.Cfgtmpdir + scandir + "/" + self.G.getConfig('cfgphidgetcapturefile'), self.Cfgpictdir + cfgdispday + "/" + self.G.getConfig('cfgphidgetcapturefile'))
					if os.path.isfile(self.Cfgtmpdir + scandir + "/" + self.G.getConfig('cfgphidgetcapturefile') + ".png"):
						shutil.copy(self.Cfgtmpdir + scandir + "/" + self.G.getConfig('cfgphidgetcapturefile'), self.Cfgpictdir + cfgdispday + "/" + self.G.getConfig('cfgphidgetcapturefile') + ".png")

		# Canon IP camera file format 20121218031553687.jpg
		elif self.C.getConfig('cfgsourcecamiptemplate') == "canonipcamera":
			for f in sorted(os.listdir(self.Cfgtmpdir), reverse=True):  
				if os.path.isfile(self.Cfgtmpdir + "/" + f) and os.path.splitext(self.Cfgtmpdir + "/" + f)[1] == ".jpg":
					#FileDate = (int(f[0] + f[1] + f[2] + f[3]), int(f[4] + f[5]), int(f[6] + f[7]), int(f[8] + f[9]), int(f[10] + f[11]), int(f[12] + f[13]), 0, 0, 0)
					#FileTimeStamp = int(time.mktime(FileDate))
					#cfgnow = datetime.datetime.fromtimestamp(FileTimeStamp)
					cfgnow = datetime.datetime(*time.strptime(f[0] + f[1] + f[2] + f[3] + "/" + f[4] + f[5] + "/" + f[6] + f[7] + "/" + f[8] + f[9] + "/" + f[10] + f[11] + "/" + f[12] + f[13], "%Y/%m/%d/%H/%M/%S")[0:6])
					cfgcurrentdate = cfgnow.strftime("%d %B %Y - %k:%M")
					cfgdispday = cfgnow.strftime("%Y%m%d")
					cfgdispdate = cfgnow.strftime("%Y%m%d%H%M%S")
					cfgfilename = cfgdispdate + ".jpg"
					self.FileManager = FileManager(self.C, self.Cfgcurrentsource, self.G, self.Debug, cfgnow, self.Cmdtype, self.ErrorManagement)
					if self.FileManager.CheckCapturedFile(self.Cfgtmpdir + "/" + f, self.Cfgtmpdir + cfgfilename):					
						self.Debug.Display(_("Catpure: IPCam: Processing %(File)s file Date: %(Date)s") % {'File': f, 'Date': cfgcurrentdate} )
						captureStatsFile.setStat('CaptureSuccess', int(captureStatsFile.getStat('CaptureSuccess')) + 1)	
						i = ImageMagick(self.Cfgtmpdir + cfgfilename, self.G, self.Debug)
						if cpt == 0 and self.C.getConfig('cfgsourcecamiplimiterotation') == "yes":
							self.CaptureManagement.ProcessImages(i, cfgnow, True)	
						elif cpt != 0 and self.C.getConfig('cfgsourcecamiplimiterotation') == "yes":
							self.CaptureManagement.ProcessImages(i, cfgnow, False)
						else:
							self.CaptureManagement.ProcessImages(i, cfgnow, True)
						self.CaptureManagement.Archive(cfgnow)
						self.CaptureManagement.Hotlink(i, cfgnow, True, captureStatsFile) 			# Create Hotlink, if applicable send via FTP
						self.CaptureManagement.FTP(cfgnow, captureStatsFile)
						self.CaptureManagement.SecondFTP(cfgnow, captureStatsFile)		
						self.CaptureManagement.SourceCopy(cfgnow)											
						self.CaptureManagement.SecondSourceCopy(cfgnow)									
						self.CaptureManagement.Purge(cfgnow)	
					cpt = cpt + 1
			if os.path.isfile(self.Cfgtmpdir + scandir + "/" + self.G.getConfig('cfgphidgetcapturefile')):
				shutil.copy(self.Cfgtmpdir + scandir + "/" + self.G.getConfig('cfgphidgetcapturefile'), self.Cfgpictdir + cfgdispday + "/" + self.G.getConfig('cfgphidgetcapturefile'))
			if os.path.isfile(self.Cfgtmpdir + scandir + "/" + self.G.getConfig('cfgphidgetcapturefile') + ".png"):
				shutil.copy(self.Cfgtmpdir + scandir + "/" + self.G.getConfig('cfgphidgetcapturefile'), self.Cfgpictdir + cfgdispday + "/" + self.G.getConfig('cfgphidgetcapturefile') + ".png")

		else:
			for f in sorted(os.listdir(self.Cfgtmpdir), reverse=True):
				if os.path.isfile(self.Cfgtmpdir + f) and os.path.splitext(self.Cfgtmpdir + f)[1] == ".jpg":
					if self.C.getConfig('cfgsourcecamiptemplate') == "exif":
						FileTimeStamp = self.GetExifDate(self.Cfgtmpdir + f)
						if FileTimeStamp == 0:
							FileTimeStamp = int(os.path.getmtime(self.Cfgtmpdir + f))
							cfgnow = datetime.datetime.fromtimestamp(FileTimeStamp)
						else:
							cfgnow = FileTimeStamp	
					else:
						FileTimeStamp = int(os.path.getmtime(self.Cfgtmpdir + f))
						cfgnow = datetime.datetime.fromtimestamp(FileTimeStamp)
					cfgcurrentdate = cfgnow.strftime("%d %B %Y - %k:%M")
					cfgdispday = cfgnow.strftime("%Y%m%d")
					cfgdispdate = cfgnow.strftime("%Y%m%d%H%M%S")
					cfgfilename = cfgdispdate + ".jpg"
					self.FileManager = FileManager(self.C, self.Cfgcurrentsource, self.G, self.Debug, cfgnow, self.Cmdtype, self.ErrorManagement)
					if self.FileManager.CheckCapturedFile(self.Cfgtmpdir + f, self.Cfgtmpdir + cfgfilename):
						self.Debug.Display(_("Catpure: IPCam: Processing %(File)s file Date: %(Date)s") % {'File': f, 'Date': cfgcurrentdate} )
						captureStatsFile.setStat('CaptureSuccess', int(captureStatsFile.getStat('CaptureSuccess')) + 1)							
						i = ImageMagick(self.Cfgtmpdir + cfgfilename, self.G, self.Debug)
						if cpt == 0 and self.C.getConfig('cfgsourcecamiplimiterotation') == "yes":
							self.CaptureManagement.ProcessImages(i, cfgnow, True)	
						elif cpt != 0 and self.C.getConfig('cfgsourcecamiplimiterotation') == "yes":
							self.CaptureManagement.ProcessImages(i, cfgnow, False)
						else:
							self.CaptureManagement.ProcessImages(i, cfgnow, True)
						self.CaptureManagement.Archive(cfgnow) 	
						self.CaptureManagement.FTP(cfgnow, captureStatsFile)
						self.CaptureManagement.SecondFTP(self.Cfgnow, captureStatsFile)
						self.CaptureManagement.SourceCopy(cfgnow)											
						self.CaptureManagement.SecondSourceCopy(cfgnow)							
						self.CaptureManagement.Purge(cfgnow)	
					cpt = cpt + 1

		#Look for last captured picture
		self.Debug.Display(_("Catpure: IPCam: CheckTime: Checking time between last captured file and current time"))	
		timedifference = self.FileManager.SecondsSinceLastCapture(self.Cfgpictdir, self.C.getConfig('cfgcapturetimezone'))
		if timedifference != None :
			#print "none"
			self.Debug.Display(_("Capture: IPCam: CheckTime: Time since last capture: %(TimeSinceLastCapture)s seconds") % {'TimeSinceLastCapture': str(timedifference.seconds)} )		
			if self.C.getConfig('cfgcroncaptureinterval') == "minutes":
				expectedcapturefrequency = int(self.C.getConfig('cfgcroncapturevalue')) * 60
			else:
				expectedcapturefrequency = int(self.C.getConfig('cfgcroncapturevalue'))
			self.Debug.Display(_("Catpure: IPCam: CheckTime: Expected capture frequency: %(expectedcapturefrequency)s seconds") % {'expectedcapturefrequency': str(expectedcapturefrequency)} )
			cfgemailalertfailure = self.C.getConfig('cfgemailalertfailure')
			if cfgemailalertfailure == "no":
				cfgemailalertfailure = 0;
			if timedifference.seconds > int(cfgemailalertfailure) * expectedcapturefrequency:
				self.Debug.Display(_("Catpure: IPCam: CheckTime: No pictures have been received for %(TimeSinceLastCapture)s seconds (over %(cfgemailalertfailure)s * %(expectedcapturefrequency)s seconds)  ") % {'TimeSinceLastCapture': str(timedifference.seconds), 'cfgemailalertfailure': str(self.C.getConfig('cfgemailalertfailure')), 'expectedcapturefrequency': str(expectedcapturefrequency)} )
				self.Debug.Display(_("Catpure: IPCam: CheckTime: Preparing to send email alert (if activated)"))
				CurrentError = int(timedifference.seconds / expectedcapturefrequency)
				self.ErrorManagement.UpdateStatus(CurrentError)
				return False
			else:
				self.Debug.Display(_("Catpure: IPCam: CheckTime: There is an error but limit to send emails have not been reached"))
				self.Debug.Display(_("Capture: IPCam: CheckTime: There is an error but limit is: %(cfgemailalertfailure)s * %(expectedcapturefrequency)s seconds (Nb failures * Capture frequency)") % {'cfgemailalertfailure': str(self.C.getConfig('cfgemailalertfailure')), 'expectedcapturefrequency': str(expectedcapturefrequency)} )						
	
			if cpt == 0:
				self.Debug.Display(_("Catpure: IPCam: Error: No pictures available in tmp directory"))
				captureStatsFile.setStat('CaptureFailure', int(captureStatsFile.getStat('CaptureFailure')) + 1)	
		else :
			self.Debug.Display(_("Catpure: IPCam: This is a new source, no pictures were previously taken"))			
			#CurrentError = self.ErrorManagement.CurrentStatus() + 1
			#self.ErrorManagement.UpdateStatus(CurrentError)
			#return False

	
					






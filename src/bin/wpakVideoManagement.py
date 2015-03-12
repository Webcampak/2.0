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
import random
from dateutil import tz

# Small class for video management
class VideoManagement: 
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, DateFormat, FileManager, CmdType):
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.DateFormat = DateFormat
		self.FileManager = FileManager
		self.CmdType = CmdType
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')				
		self.Cfgdispdate = self.Cfgnow.strftime("%Y%m%d%H%M%S")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"
		self.Cfglivedir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfglivedir')
		self.Cfgpictdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgpictdir')
		self.Cfgvideodir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgvideodir')


	# Function: IsCreationAllowed
	# Description; Check if video creation is allowed, mainly for custom videos
	# Return: True or False
	def IsCreationAllowed(self, v):
		AllowCreation = False
		if self.C.getConfig('cfgsourceactive') == "yes" and self.CmdType == "video":
			AllowCreation = True	
			if v.getConfig('cfgvideocodecH2641080pcreate') == "no" and v.getConfig('cfgvideocodecH264720pcreate') == "no" and v.getConfig('cfgvideocodecH264480pcreate') == "no" and v.getConfig('cfgvideocodecH264customcreate') == "no" and self.CmdType != "videopost":	
				AllowCreation = False
				self.Debug.Display(_("Video: Error: No video format selected ... Cancelling ..."))				
		elif self.CmdType == "videocustom":
			cfgnow = datetime.datetime.utcnow()
			if self.G.getConfig('cfgservertimezone') != "": # Update the timezone from UTC to the source's timezone
				sourceTimezone = tz.gettz(self.G.getConfig('cfgservertimezone'))
				cfgnow = cfgnow.replace(tzinfo=tz.gettz('UTC'))				
				cfgnow = cfgnow.astimezone(sourceTimezone)				
			currenthour = cfgnow.strftime("%H")
			currentday = cfgnow.strftime("%Y%m%d")
			videoName = v.getConfig('cfgcustomvidname')
			randomVideoName = videoName +  str(random.randint(1, 1000))
			if v.getConfig('cfgcustomactive') == "plan04" and currenthour == "04":
				AllowCreation = True
			if os.path.isfile(self.Cfgvideodir + currentday + "_" + v.getConfig('cfgcustomvidname') + ".1080p.avi"):
				AllowCreation = True
				v.setConfig('cfgcustomvidname', randomVideoName)
				self.Debug.Display(_("Video: Error: File exists: %(File)s - Creating a random filename ") % {'File': self.Cfgvideodir + currentday + "_" + v.getConfig('cfgcustomvidname') + ".1080p.avi"} )
			elif os.path.isfile(self.Cfgvideodir + currentday + "_" + v.getConfig('cfgcustomvidname') + ".720p.avi"):
				AllowCreation = True
				v.setConfig('cfgcustomvidname', randomVideoName)
				self.Debug.Display(_("Video: Error: File exists: %(File)s - Creating a random filename ") % {'File': self.Cfgvideodir + currentday + "_" + v.getConfig('cfgcustomvidname') + ".720p.avi"} )
			elif os.path.isfile(self.Cfgvideodir + currentday + "_" + v.getConfig('cfgcustomvidname') + ".480p.avi"):
				AllowCreation = True
				v.setConfig('cfgcustomvidname', randomVideoName)
				self.Debug.Display(_("Video: Error: File exists: %(File)s - Creating a random filename ") % {'File': self.Cfgvideodir + currentday + "_" + v.getConfig('cfgcustomvidname') + ".480p.avi"} )
			elif os.path.isfile(self.Cfgvideodir + currentday + "_" + v.getConfig('cfgcustomvidname') + ".H264-custom.avi"):
				AllowCreation = True
				v.setConfig('cfgcustomvidname', randomVideoName)
				self.Debug.Display(_("Video: Error: File exists: %(File)s - Creating a random filename ") % {'File': self.Cfgvideodir + currentday + "_" + v.getConfig('cfgcustomvidname') + ".H264-custom.avi"} )
			else:
				AllowCreation = True
			if  v.getConfig('cfgcustomactive') == "no":
				AllowCreation = False
				self.Debug.Display(_("Video: Creation manually disabled ... Cancelling ..."))
		elif self.CmdType == "videopost":
			cfgnow = datetime.datetime.utcnow()
			currenthour = cfgnow.strftime("%H")
			currentday = cfgnow.strftime("%Y%m%d")
			if v.getConfig('cfgcustomactive') == "plan04" and currenthour == "04":
				AllowCreation = True
			elif  v.getConfig('cfgcustomactive') == "planon":
				AllowCreation = True
			else:
				AllowCreation = False
				self.Debug.Display(_("Video: Creation manually disabled ... Cancelling ..."))
		else:
			AllowCreation = False 
			self.Debug.Display(_("Video: Source disabled ... Cancelling ..."))
		return AllowCreation

	# Function: DoesVideoFileExist
	# Description; Check if video exists
	# Return: True
	def DoesVideoFileExist(self, Filename):
		for listviddir in sorted(os.listdir(self.Cfgvideodir)):
			if Filename[:8] == listviddir[:8] and listviddir[8] != "_":
				return True



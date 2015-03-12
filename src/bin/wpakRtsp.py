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

#This class is used to capture pictures from RTSP stream
class Rtsp: 
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, FileManager):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.Cfgdispdate = self.Cfgnow.strftime("%Y%m%d%H%M%S")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"		
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.FileManager = FileManager

	# Function: Capture
	# Description; This function is used to capture a picture from a RTSP stream
	# Return: True or False
	def Capture(self):
		self.Debug.Display(_("Catpure: RTSP: Starting capture process, URL: %(URL)s ") % {'URL': self.C.getConfig('cfgsourcewebfileurl')} )
#		Command = "cvlc -I dummy " + c.getConfig('cfgsourcewebfileurl') + " --run-time=2 --video-filter=scene --scene-path=" + self.Cfgtmpdir + " --scene-format=jpg --scene-ratio=1 --scene-prefix=capture vlc://quit"
		Command = "ffmpeg -i " + self.C.getConfig('cfgsourcewebfileurl') + " -y -f image2 -sameq -t 0.001 " + self.Cfgtmpdir + "capture00001.jpg"
		os.system(Command)
		if os.path.isfile(self.Cfgtmpdir + "capture00001.jpg"):
			FileSourceSize = os.path.getsize(self.Cfgtmpdir + "capture00001.jpg")
		else:
			FileSourceSize = 0
		if FileSourceSize > int(self.C.getConfig('cfgcaptureminisize')):
			return self.FileManager.CheckCapturedFile(self.Cfgtmpdir + "capture00001.jpg", self.Cfgtmpdir + self.Cfgfilename)
		else :
			self.Debug.Display(_("Catpure: RTSP: Starting capture process, URL: %(URL)s  - Second try") % {'URL': self.C.getConfig('cfgsourcewebfileurl')} )
			Command = "ffmpeg -i " + self.C.getConfig('cfgsourcewebfileurl') + " -y -f image2 -sameq -t 0.001 " + self.Cfgtmpdir + "capture00001.jpg"
			os.system(Command)			
			return self.FileManager.CheckCapturedFile(self.Cfgtmpdir + "capture00001.jpg", self.Cfgtmpdir + self.Cfgfilename)						

#ffmpeg -i rtsp://username:password@10.0.0.1/live/ch00_0 -y -f image2 -sameq -t 0.001 /path/to/warehouse.jpg
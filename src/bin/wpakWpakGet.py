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
import socket

from wpakFileManager import FileManager


class WpakGet: 
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, FileManager):
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
	# Description; This function is used to download a picture from internet and consider it as a source
	# Return: True or False
	def Capture(self):
		getFromSourceID = self.C.getConfig('cfgsourcewpakgetsourceid')
		try:
			getFromSourceID = int(getFromSourceID)
		except ValueError:
			getFromSourceID = 0		
		if (getFromSourceID > 0):
			self.Debug.Display(_("Capture: WpakGet: Looking for JPG file into source %(getFromSourceID)s live directory") % {'getFromSourceID': str(getFromSourceID)})
			sourceLiveDirectory = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + str(getFromSourceID) + "/live/"			
			if os.path.isfile(sourceLiveDirectory + "last-capture.jpg"):
				self.Debug.Display(_("Capture: WpakGet: Copying file last-capture.jpg  from %(sourceLiveDirectory)s to %(Cfgtmpdir)s") % {'sourceLiveDirectory': sourceLiveDirectory, 'Cfgtmpdir': self.Cfgtmpdir })																
				shutil.copy(sourceLiveDirectory + "last-capture.jpg", self.Cfgtmpdir + self.Cfgfilename)
				if os.path.isfile(sourceLiveDirectory + "last-capture.raw") and self.C.getConfig('cfgsourcewpakprocessraw') == "yes":
					self.Debug.Display(_("Capture: WpakGet: Copying file last-capture.raw  from %(sourceLiveDirectory)s to %(Cfgtmpdir)s") % {'sourceLiveDirectory': sourceLiveDirectory, 'Cfgtmpdir': self.Cfgtmpdir })																					
					shutil.copy(sourceLiveDirectory + "last-capture.raw", self.Cfgtmpdir + self.Cfgdispdate + ".raw")	
				else:
					self.Debug.Display(_("Capture: WpakGet: Raw processing is either disabled or last-capture.raw to not exist in  %(sourceLiveDirectory)s live directory") % {'sourceLiveDirectory': sourceLiveDirectory})								
			else:
				self.Debug.Display(_("Capture: WpakGet: Error: last-capture.jpg file is missing in %(sourceLiveDirectory)s directory") % {'sourceLiveDirectory': sourceLiveDirectory})												
		else:
			self.Debug.Display(_("Capture: WpakGet: Source %(getFromSourceID)s is not a valid source") % {'getFromSourceID': str(getFromSourceID)})		
			
		return self.FileManager.CheckCapturedFile(self.Cfgtmpdir + self.Cfgfilename, "")			
			
		

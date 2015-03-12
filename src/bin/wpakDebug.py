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
from dateutil import tz
from wpakFileManager import FileManager

# Class used to display and record webcampak logs
class Debug: 
	def __init__(self, c, cfgcurrentsource, g, cmdType):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Cfglogdir = g.getConfig('cfgbasedir') +  g.getConfig('cfglogdir')		
		if cmdType == "video":
			self.Cfglogfile = "video-" + cfgcurrentsource + "-daily.log"
		elif cmdType == "videocustom":
			self.Cfglogfile = "video-" + cfgcurrentsource + "-custom.log"
		elif cmdType == "videopost":
			self.Cfglogfile = "video-" + cfgcurrentsource + "-post.log"				
		elif cmdType == "capture" or cmdType == "capturesample":
			self.Cfglogfile = cmdType + "-" + cfgcurrentsource + ".log"
		elif cmdType == "rrdgraph":
			self.Cfglogfile = cmdType + "-" + cfgcurrentsource + ".log"

	# Function: Display
	# Description; This is the main function of the class
	#	- It receives as an imput a log line to be processed
	#	- The log line is formated (addition of: timestamp, source type, source ID, PID)
	#	- The log line is displayed to terminal (useful is the software is started manually)
	#	- The formated line is then sent to Debug.Write to be recorded
	## Log: Log line
	# Return: Nothing
	def Display(self,Log):
		if Log != "":
			now = datetime.datetime.utcnow()
			if self.G.getConfig('cfgservertimezone') != "":
				serverTimezone = tz.gettz(self.G.getConfig('cfgservertimezone'))
				now = now.replace(tzinfo=tz.gettz('UTC'))				
				now = now.astimezone(serverTimezone)
			print(now.strftime("%d %B %Y - %k:%M:%S") + " - " + self.C.getConfig('cfgsourcetype') + "(" + self.Cfgcurrentsource + "-" + str(os.getpid()) + "): " + Log)
			Debug.Write(self, now.strftime("%d %B %Y - %k:%M:%S") + " - " + self.C.getConfig('cfgsourcetype') + "(" + self.Cfgcurrentsource + "-" + str(os.getpid()) + "): " + Log)
		
	# Function: Write
	# Description; It record a formated log line into a log file
	## Log: Formated Log line
	# Return: Nothing
	def Write(self,Log):	
		FileManager.CheckDir(self.Cfglogdir + self.Cfglogfile)
		f = open(self.Cfglogdir + self.Cfglogfile, 'a')
		f.write(Log + "\n")
		f.close()

	# Function: Purge
	# Description; It purges log file (delete) 
	#	- If long lasting debug is not activated log file gets deleted
	#	- If log file is too big it gets deleted
	## Log: Formated Log line
	# Return: Nothing
	def Purge(self):
		if os.path.isfile(self.Cfglogdir + self.Cfglogfile): 
			if self.C.getConfig('cfgsourcedebug') == "no":
				os.remove(self.Cfglogdir + self.Cfglogfile)
				Debug.Display(self, _("Debug: Purge: Deletion previous log file, long lasting debug disabled"))
		if os.path.isfile(self.Cfglogdir + self.Cfglogfile): 		
			if os.path.getsize(self.Cfglogdir + self.Cfglogfile) > int(self.G.getConfig('cfglogmaxsize')): 
				os.remove(self.Cfglogdir + self.Cfglogfile)
				Debug.Display(self, _("Debug: Purge: Deletion previous log file, max size allowed is %(MaxLogFileSize)s bytes") % {'MaxLogFileSize': self.G.getConfig('cfglogmaxsize')} )	


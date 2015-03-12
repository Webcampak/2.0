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
from __future__ import print_function

"""Webcampak Core Tool

Command Line tool to manage and synchronise all Webcampak core functions

Usage: python webcampak.py [options] [source]

Options:
  -t ..., --type= ...                                              Main action: capture, video, videocustom, graph
  -s, --source=	                                                   Source to be used
  -g /home/user/webcampak/etc/config-general.cfg,   --global=...   Global configuration file (optional), will create it if it does not exist.
  -c /home/user/webcampak/etc/config-source....cfg, --config=...   Source configuration file (optional), will create it if it does not exist.
  -v /home/user/webcampak/etc/config-source....cfg, --config=...   Source video (daily or custom) configuration file (optional), will create it if it does not exist.
  -m, --motion                                                     Used with motion detection, only capture when there is something moving
  -h, --help                                                       Show this help


Examples:
  webcampak.py -t capture -s 10                      Capture using source 10 and default configuration files
  webcampak.py --type=capture --source=10            Capture using source 10 and default configuration files
  webcampak.py --type=video --source=10              Create daily video of source 10
  webcampak.py --type=videocustom --source=10        Create custom video for source 10

This program is part of Webcampk tools. For more details please visit
http://www.webcampak.com
"""

__author__ = "Eurotechnia & Infracom"
__version__ = "$Revision: 0.9 $"
__copyright__ = "Copyright (c) 2011 Eurotechnia & Infracom"
__license__ = "GPLv3"

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
from wpakDebug import Debug
from wpakFileManager import FileManager
from wpakConfig import Config
from wpakCapture import Capture
from wpakRRDGraph import RRDGraph
from wpakErrorManagement import ErrorManagement
from wpakEmailClass import EmailClass
from wpakVideo import Video

from dateutil import tz
from time import sleep

########################################################################
########################################################################
########################################################################  

def usage():
    print(__doc__)

def main(argv):
	try:
		opts, args = getopt.getopt(argv, "ht:s:g:c:m:v", ["help", "type=", "source=", "global=", "config=", "motion", "video="])
	except getopt.GetoptError:
		usage()
		sys.exit(2)
	global g
	global c
	global cfgcurrentsource
	global cfgnowsource
	global CmdMotion
	global CmdSource
	global CmdGlobalConfig
	global CmdType
	global CmdVideoConfig
	global Debug
	global FileManager
	global Capture
	global RRDGraph
	global ErrorManagement
	global EmailClass
	global Video

	CmdSource = ""
	CmdGlobalConfig = ""
	CmdSourceConfig = ""
	CmdVideoConfig = ""
	CmdType = ""
	CmdMotion = ""

	# Get command line parameters
	for opt, arg in opts:
		if opt in ("-h", "--help"):
			usage()
			sys.exit()
		elif opt in ("-t", "--type"):
			if arg == "video":
				CmdType = arg
			elif arg == "videocustom":
				CmdType = arg
			elif arg == "videopost":
				CmdType = arg
			elif arg == "capture":
				CmdType = arg
			elif arg == "capturesample":
				CmdType = arg
			elif arg == "rrdgraph":
				CmdType = arg
			else:
				print("Error: python webcampak.py -t %(arg)s" % {'arg': arg})
				print("Error: Unknown parameter")
				usage()
				sys.exit()				
		elif opt in ("-s", "--source"):
			CmdSource = arg
		elif opt in ("-g", "--global"):
			CmdGlobalConfig = arg
		elif opt in ("-c", "--config"):
			CmdSourceConfig = arg
		elif opt in ("-m", "--motion"):
			CmdMotion = "motion"
		elif opt in ("-v", "--video"):
			CmdVideoConfig = arg			

	if CmdSource != "":
		cfgcurrentsource = str(CmdSource)
		
		# Global config or "g" is a set of configuration parameters shared between all sources
		if CmdGlobalConfig != "" and os.path.isfile(CmdGlobalConfig):
				g = Config(CmdGlobalConfig)
		elif os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-general.cfg"):
				g = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-general.cfg")
		else:
			if os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-general.cfg"):
				FileManager.CheckDir("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-general.cfg")
				shutil.copy("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-general.cfg", "/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-general.cfg")
				g = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-general.cfg")
			else:
				print("Error: Unable to identify source configuration file")
				usage()
				sys.exit()
		
		# Loading gettext translation functions
		try:
			languages = []
			languages.append(g.getConfig('cfgsystemlang'))
			t = gettext.translation(g.getConfig('cfggettextdomain'), g.getConfig('cfgbasedir') + g.getConfig('cfglocaledir'), languages, fallback=True)
			_ = t.ugettext
			t.install()
		except:
			print("No translation file available for your language")
			#languages = []
			#languages.append("en_US")
			#t = gettext.translation(g.getConfig('cfggettextdomain'), g.getConfig('cfgbasedir') + g.getConfig('cfglocaledir'), languages)
			#_ = t.ugettext
			#t.install()
		
		# Source config or "c" is a set of configuration parameters specific to one single source
		if CmdSourceConfig != "" and os.path.isfile(CmdSourceConfig):
			c = Config(CmdSourceConfig)
		elif os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + cfgcurrentsource + ".cfg"):
			c = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + cfgcurrentsource + ".cfg")
		else:
			if os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-source.cfg"):
				FileManager.CheckDir("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source.cfg")
				shutil.copy("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-source.cfg", "/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + cfgcurrentsource + ".cfg")
				c = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + cfgcurrentsource + ".cfg")
			else:
				print("Error: Unable to identify source configuration file")
				usage()
				sys.exit()	

		# We load standard classes, necessary within the whole software.
		Debug = Debug(c, cfgcurrentsource, g, CmdType)
		EmailClass = EmailClass(c, cfgcurrentsource, g, Debug)
		ErrorManagement = ErrorManagement(c, cfgcurrentsource, g, Debug, CmdType, EmailClass)
		
		# We capture the current date and time, this value is used through the whole software
		# If capture is configured to be delayed there are two option, use script start date or capture date
		cfgnowsource = datetime.datetime.utcnow()
		if c.getConfig('cfgcapturetimezone') != "": # Update the timezone from UTC to the source's timezone
			sourceTimezone = tz.gettz(c.getConfig('cfgcapturetimezone'))
			cfgnowsource = cfgnowsource.replace(tzinfo=tz.gettz('UTC'))				
			cfgnowsource = cfgnowsource.astimezone(sourceTimezone)		

		if c.getConfig('cfgcapturedelay') != "0" and CmdType == "capture":
			Debug.Display(_("Delaying the capture by %(CaptureDelay)s seconds.") % {'CaptureDelay': str(c.getConfig('cfgcapturedelay'))} )
			time.sleep(int(c.getConfig('cfgcapturedelay')))
			if c.getConfig('cfgcapturedelaydate') != "script": 
				cfgnowsource = datetime.datetime.utcnow()
				if c.getConfig('cfgcapturetimezone') != "": # Update the timezone from UTC to the source's timezone
					sourceTimezone = tz.gettz(c.getConfig('cfgcapturetimezone'))
					cfgnowsource = cfgnowsource.replace(tzinfo=tz.gettz('UTC'))				
					cfgnowsource = cfgnowsource.astimezone(sourceTimezone)					

		sourceLiveDirectory = g.getConfig('cfgbasedir') + g.getConfig('cfgsourcesdir') + "source" + c.getConfig('cfgsourcewpakgetsourceid') + "/live/"			
		if c.getConfig('cfgsourcetype') == "wpak" and c.getConfig('cfgsourcewpaktype') == "get" and os.path.isfile(sourceLiveDirectory + "last-capture.txt"):
			Debug.Display(_("Using last-capture.txt from source %(cfgsourcewpakgetsourceid)s as a date") % {'cfgsourcewpakgetsourceid': str(c.getConfig('cfgsourcewpakgetsourceid'))})
			captureLastFile = Config(sourceLiveDirectory + "last-capture.txt")	
			f = captureLastFile.getStat('LastCapture')
			cfgnowsource = datetime.datetime(*time.strptime(f[0] + f[1] + f[2] + f[3] + "/" + f[4] + f[5] + "/" + f[6] + f[7] + "/" + f[8] + f[9] + "/" + f[10] + f[11] + "/" + f[12] + f[13], "%Y/%m/%d/%H/%M/%S")[0:6])
			sourceTimezone = tz.gettz(c.getConfig('cfgcapturetimezone'))
			Debug.Display(_("Using new date set to: %(cfgnowsource)s") % {'cfgnowsource': str(cfgnowsource)})

		
		FileManager = FileManager(c, cfgcurrentsource, g, Debug, cfgnowsource, CmdType, ErrorManagement)

		# Two main classes are available:
		# - "Video" to generate daily or customs videos
		# - "Capture" to capture pictures from a source
		if CmdType == "video":
			# We start the process three times in a row to catch up missed creations
			Video = Video(c, cfgcurrentsource, g, Debug, cfgnowsource, CmdType, FileManager, ErrorManagement, EmailClass, CmdVideoConfig)
			Video.Main()
			Video.Main()
			Video.Main()
		elif CmdType == "videocustom":
			Video = Video(c, cfgcurrentsource, g, Debug, cfgnowsource, CmdType, FileManager, ErrorManagement, EmailClass, CmdVideoConfig)
			Video.Main()
		elif CmdType == "videopost":
			Video = Video(c, cfgcurrentsource, g, Debug, cfgnowsource, CmdType, FileManager, ErrorManagement, EmailClass, CmdVideoConfig)
			Video.Main()
		elif CmdType == "capture" or CmdType == "capturesample":
			Capture = Capture(c, cfgcurrentsource, g, Debug, cfgnowsource, CmdType, FileManager, ErrorManagement, EmailClass, CmdMotion)
			Capture.Main()  # Start capture process
		elif CmdType == "rrdgraph":
			RRDGraph = RRDGraph(c, cfgcurrentsource, g, Debug, cfgnowsource, CmdType, FileManager, ErrorManagement, EmailClass)
			RRDGraph.Main()  # Start RRD Graph process

	else:
		print("Error: Missing source number")
		usage()
		sys.exit()	
	
if __name__ == "__main__":
	main(sys.argv[1:])


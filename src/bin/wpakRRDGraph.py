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
#from rrd.dom.minidom import Document
import rrdtool

from wpakDateFormat import DateFormat
from wpakConfig import Config
from wpakFTPClass import FTPClass

# This class is the main class used to capture a picture
class RRDGraph:
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, FileManager, ErrorManagement, EmailClass):
		self.G = g
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.ErrorManagement = ErrorManagement
		self.EmailClass = EmailClass
		self.FileManager = FileManager
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')
		self.Cfglivedir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfglivedir')
		self.Cfgvideodir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgvideodir')
		self.Cfgpictdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgpictdir')
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.Cfgdispdate = self.Cfgnow.strftime("%Y%m%d%H%M%S")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"
		self.Cfginitdir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfginitdir')
		self.Cfgnowtimestamp = cfgnow.strftime("%s")
		self.Cfglocalemessagesdir = self.G.getConfig('cfgbasedir') + "locale/" + self.G.getConfig('cfgsystemlang') + "/messages/"
		self.DateFormat = DateFormat(self.C)



	# Function: CreatRRDFiles
	# Description; Create RRD Files based upon sensors.txt files. 
	#	One file per day, per sensor type
	# Return: Nothing
	def CreateRRDFiles(self):
		cptdir = 0
		for listpictdir in sorted(os.listdir(self.Cfgpictdir), reverse=True): # Browse all directories
			if listpictdir[:2] == "20" and os.path.isdir(self.Cfgpictdir + listpictdir):
				cptdir = cptdir + 1
				self.Debug.Display(_("Graph: RRD: Processing %(CurrentDirectory)s directory") % {'CurrentDirectory': str(listpictdir)} )
				if os.path.isfile(self.Cfgpictdir + listpictdir + "/" + self.G.getConfig('cfgphidgetcapturefile')):
					self.Debug.Display(_("Graph: RRD: %(SensorFile)s found") % {'SensorFile': self.G.getConfig('cfgphidgetcapturefile')} )
					for ListSourceSensors in range(1,int(self.C.getConfig('cfgphidgetsensornb')) + 1):
						if self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] != "no":
							if os.path.isfile(self.Cfgpictdir + listpictdir + "/" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".rrd") == False or cptdir <= 1:
								print("Graph: RRD: RRD file: Start parsing values")
								ValueTable = {}
								#ValueKeys = []
								ValueTableKeys = []
								ValueKeysDiff = []
								ValueInsertTable = {}
								if self.C.getConfig('cfgcroncaptureinterval') == "minutes":
									DefinedInterval = int(self.C.getConfig('cfgcroncapturevalue')) * 60
								elif self.C.getConfig('cfgcroncaptureinterval') == "seconds":
									DefinedInterval = int(self.C.getConfig('cfgcroncapturevalue'))
									
								Sensors = Config(self.Cfgpictdir + listpictdir + "/" + self.G.getConfig('cfgphidgetcapturefile'))
								for capturetime in Sensors.getFullConfig():
									if Sensors.getSensor(capturetime, self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0]) == False:
										ValueTable[Sensors.getSensor(capturetime, "Timestamp")] = "NaN"
									else:
										ValueTable[Sensors.getSensor(capturetime, "Timestamp")] = Sensors.getSensor(capturetime, self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0])
								NumberOfValues = len(ValueTable)
								print("Number of Values source: " + str(NumberOfValues))
								#print ValueTable.keys()
								cpt = 0
								ValueTableKeys = ValueTable.keys()
								ValueTableKeys.sort()
								#print ValueTableKeys
								cpt = 0

								self.Debug.Display(_("Graph: RRD: RRD file: begninning creation of %(SensorRRDFile)s file ...") % {'SensorRRDFile': self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".rrd"} )

								rrdstart = str(int(min(ValueTableKeys)))
								#rrdstart = str(int(min(ValueTableKeys)))
								rrdend = str(max(ValueTableKeys))
								ret = rrdtool.create(self.Cfgpictdir + listpictdir + "/" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".rrd", "--step", str(DefinedInterval), "--start", rrdstart,
								"DS:"+ self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ":GAUGE:600:U:U",
								"RRA:AVERAGE:0.5:1:" + str(len(Sensors.getFullConfig())))								
								if ret:
									print(rrdtool.error())
								
								for i in xrange(len(ValueTableKeys)):
									#print "Timestamp: " +  ValueTableKeys[i] + " - Value: " + ValueTable[ValueTableKeys[i]]
									if i == 0:
										CurrentTimestamp = int(ValueTableKeys[i])
									else:
										CurrentTimestamp = CurrentTimestamp + DefinedInterval
										ret = rrdtool.update(self.Cfgpictdir + listpictdir + "/" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".rrd", str(int(CurrentTimestamp)) + ':' + ValueTable[ValueTableKeys[i]])
										#print "Timestamp:" + str(i) + "/" + str(len(Sensors.getFullConfig())) + ":" + str(CurrentTimestamp) + ":" + str(rrdtool.error())
									#print "Timestamp: " +  str(CurrentTimestamp) + " - Value: " + ValueTable[ValueTableKeys[i]]

								ret = rrdtool.graph(self.Cfgpictdir + listpictdir + "/Sensor-" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".png", "--start", rrdstart, "--end", rrdend, "--vertical-label="+ self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[2],
								 "DEF:" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + "=" + self.Cfgpictdir + listpictdir + "/" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".rrd" + ":" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ":AVERAGE",
								 "AREA:" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + "#" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[3]+ ":" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[2],
								 )
								if ret:
									print(rrdtool.error())

								cfgdispday = self.Cfgnow.strftime("%Y%m%d")
								
								if self.C.getConfig('cfgftpphidgetserverid') != "no" and os.path.isfile(self.Cfgpictdir + listpictdir + "/Sensor-" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".png") and cfgdispday == listpictdir:
									FTPResult = FTPClass.FTPUpload(self.Cfgcurrentsource, self.C.getConfig('cfgftpphidgetserverid'), listpictdir + "/", self.Cfgpictdir + listpictdir + "/", "Sensor-" + self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".png", self.Debug, self.C.getConfig('cfgftpphidgetserverretry'))
							else:
								self.Debug.Display(_("Graph: RRD: RRD file: %(SensorRRDFile)s found, cancelling ...") % {'SensorRRDFile': self.C.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] + ".rrd"} )
				else:
					self.Debug.Display(_("Graph: RRD: %(SensorFile)s not found, moving to next directory") % {'SensorFile': self.G.getConfig('cfgphidgetcapturefile')} )

	# Function: Main 
	# Description; Main function of the class, fully manage the RRD Graph process, see comments within the function
	# Return: Nothing
	def Main(self):
		if self.C.getConfig('cfgphidgetsensorsgraph') == "yes":
			self.Debug.Display(_("Graph: Starting graph creation function"))
			RRDGraph.CreateRRDFiles(self)	
		else:
			self.Debug.Display(_("Graph: Graph creation disabled in config"))


			

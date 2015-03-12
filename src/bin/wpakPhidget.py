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

from wpakErrorManagement import ErrorManagement

# The class contains functions used to manipulate phidget
class Phidget:
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, ErrorManagement):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgphidgetbin = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgbindir') + self.G.getConfig('cfgphidgetbin')
		self.Cfgnowtimestamp = cfgnow.strftime("%s")
		self.ErrorManagement = ErrorManagement

	# Function: Display 
	# Description; This function receives test to be displayed on the phidget, it will format it and send it to SetDisplay
	# Return: Nothing
	def Display(self, FirstLine, SecondLine): # Prepare le texte a envoyer au Phidget
		if self.G.getConfig('cfgphidgetactivate') == "yes":
			if FirstLine == 0: # On souhaite afficher le temps ecoule et une barre de progression.
				cfgtmp = datetime.datetime.utcnow()
				if self.C.getConfig('cfgcapturetimezone') != "": # Update the timezone from UTC to the source's timezone
					sourceTimezone = tz.gettz(self.C.getConfig('cfgcapturetimezone'))
					cfgtmp = cfgtmp.replace(tzinfo=tz.gettz('UTC'))				
					cfgtmp = cfgtmp.astimezone(sourceTimezone)					
				cfgtmptimestamp = cfgtmp.strftime("%s")
				CaptureInterTime = int(cfgtmptimestamp) - int(self.Cfgnowtimestamp)
				CaptureInterGlobalTime = int(self.ErrorManagement.LatestCaptureTime())
				if CaptureInterGlobalTime > 0:
					CaptureProgress = int(CaptureInterTime * 12 / CaptureInterGlobalTime)
				else:
					CaptureProgress = int(CaptureInterTime * 12 / 45)
				StatusBar = "["  #   [##########__]
				for j in range(1, 13):
					if j <= round(CaptureProgress):
						StatusBar = StatusBar + "#"
					else:
					  	StatusBar = StatusBar + "_"
				StatusBar = StatusBar + "]"
				if CaptureInterGlobalTime <= 0:
					StatusBar = _("[_CALIBRAGE_]")
				FirstLine = str(CaptureInterTime) + "s " + StatusBar
			Phidget.SetDisplay(self, FirstLine, SecondLine)

	# Function: SetDisplay 
	# Description; This function send text to be displayed on the phidget
	## FirstLine: Text to display on the first line
	## SecondLine: Text to display on the second line
	# Return: Nothing
	def SetDisplay(self, DispFirstLine, DispSecondLine): 
		#global PhidgetError
		if os.path.isfile(self.Cfgphidgetbin): # and PhidgetError == False:
			if self.G.getConfig('cfgphidgetdisplaysource') == self.Cfgcurrentsource:
				if DispFirstLine != "":
					cfgtmp = datetime.datetime.utcnow()
					if self.C.getConfig('cfgcapturetimezone') != "": # Update the timezone from UTC to the source's timezone
						sourceTimezone = tz.gettz(self.C.getConfig('cfgcapturetimezone'))
						cfgtmp = cfgtmp.replace(tzinfo=tz.gettz('UTC'))				
						cfgtmp = cfgtmp.astimezone(sourceTimezone)						
					cfgtmptimestamp = cfgtmp.strftime("%s")
					CaptureInterTime = int(cfgtmptimestamp) - int(self.Cfgnowtimestamp)
					try:
						Command = "sudo " + self.Cfgphidgetbin + " LCD_1 '" + str(DispFirstLine) + "' "						
						import shlex, subprocess
						args = shlex.split(Command)
						p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
						output, errors = p.communicate()
						if "ERREUR" in output:
							 PhidgetError = True	
					except:
						self.Debug.Display(_("Phidget: First Line: Missing device"))
				if DispSecondLine != "":
					try:
						Command = "sudo " + self.Cfgphidgetbin + " LCD_2 '" + str(DispSecondLine) + "' "						
						import shlex, subprocess
						args = shlex.split(Command)
						p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
						output, errors = p.communicate()
						if "ERREUR" in output:
							 PhidgetError = True					  
					except:
						self.Debug.Display(_("Phidget: Second Line: Missing device"))

	# Function: SetBackLight 
	# Description; This function activate or not the backlight
	# Return: Nothing
	def SetBackLight(self, Set):
		if self.G.getConfig('cfgphidgetactivate') == "yes":
			#global PhidgetError
			if os.path.isfile(self.Cfgphidgetbin): # and PhidgetError == False:
				if self.G.getConfig('cfgphidgetdisplaysource') == self.Cfgcurrentsource:
					try:
						Command = "sudo " + self.Cfgphidgetbin + ' LCD_backlight ' + str(Set)
						import shlex, subprocess
						args = shlex.split(Command)
						p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
						output, errors = p.communicate()
						if "ERREUR" in output:
							  PhidgetError = True						
					except:
						self.Debug.Display(_("Phidget: Backlight: Missing device"))

	# Function: GetSensor 
	# Description; This function get a sensor value
	# Return: Sensor value
	def GetSensor(self, Sensor):
		if self.G.getConfig('cfgphidgetactivate') == "yes":
			#global PhidgetError
			#if os.path.isfile(self.Cfgphidgetbin) and PhidgetError == False:
			#print self.Cfgphidgetbin
			if os.path.isfile(self.Cfgphidgetbin):
				#try:
				Command = "sudo " + self.Cfgphidgetbin + ' getanalog ' + str(Sensor)
				import shlex, subprocess
				args = shlex.split(Command)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				if "ERREUR" in output:
					PhidgetError = True
				#self.Debug.Display(output)
				self.Debug.Display(errors)
				SensorValue = output.strip()
				return SensorValue
				#except:
				#	self.Debug.Display(_("Phidget: Missing device"))

	# Function: CameraRestart 
	# Description; This function restart the camera via a phidget relay
	# Return: Nothing
	def CameraRestart(self):
		if self.G.getConfig('cfgphidgetactivate') == "yes":
			PhidgetPort = self.C.getConfig('cfgphidgetcameraport')
			self.Debug.Display(_("Phidget: Shutting down the camera (power socket cut)"))
			Phidget.Display(self, _("-- Camera Error --"), _("5 sec. Pwr cut"))
			Command = "sudo " + self.Cfgphidgetbin + ' setout ' + str(PhidgetPort)
			os.system(Command)		
			self.Debug.Display(_("Phidget: 5 seconds break"))
			time.sleep(5)
			Phidget.Display(self, _("-- Camera Error --"), _("Restart Camera"))
			Command = "sudo " + self.Cfgphidgetbin + ' clrout ' + str(PhidgetPort)
			os.system(Command)		
			self.Debug.Display(_("Phidget: Powering on the Camera (power socket uncut)"))




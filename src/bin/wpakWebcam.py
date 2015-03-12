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
from subprocess import check_output as qx
from PIL import Image, ImageStat, ImageDraw
import cv

# This class is used to manipulate a USB webcam
class Webcam: 
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, FileManager):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.Cfglogdir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfglogdir')
		self.Cfglogfile = cmdType + "-" + self.Cfgcurrentsource + ".log"
		self.Cfgdispdate = self.Cfgnow.strftime("%Y%m%d%H%M%S")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"		
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.FileManager = FileManager


	# Function: runProcess
	# Description; Run a process and return output
	# Taken from: http://stackoverflow.com/questions/4760215/running-shell-command-from-python-and-capturing-the-output
	# Return: Output of the command line
	def runProcess(self, exe):    
		p = subprocess.Popen(exe, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
		while(True):
			retcode = p.poll() #returns None while subprocess is running
			line = p.stdout.readline()
			yield line
			if(retcode is not None):
				break
				
	# Function: Capture
	# Description; This function is used to capture a picture from a USB webcam
	# Return: True or False
	def Capture(self, CurrentErrorStatus):

		#cfgsourcewebcamcamid = "usb-0000:00:10.3-6"
		cfgsourcewebcamcamid = self.C.getConfig('cfgsourcewebcamcamid')
		self.Debug.Display(_("Catpure: USB Webcam Lookup: Looking for camera connected to USB port: %(cfgsourcewebcamcamid)s") % {'cfgsourcewebcamcamid': str(cfgsourcewebcamcamid)} )
		sourceWebcamID = ""
		for i in range(0, 10):
			if sourceWebcamID != "":
				break
			for line in self.runProcess(['v4l-info', '/dev/video' + str(i)]):
				if line.find(cfgsourcewebcamcamid) > 0:
					sourceWebcamID = i
					self.Debug.Display(_("Catpure: USB Webcam Lookup: USB port %(cfgsourcewebcamcamid)s attached to camera /dev/video%(sourceWebcamID)s") % {'cfgsourcewebcamcamid': str(cfgsourcewebcamcamid), 'sourceWebcamID': str(sourceWebcamID)} )					
					break

		if sourceWebcamID != "":
			cfgsourcewebcamsize = str(self.C.getConfig('cfgsourcewebcamsize')).split("x")
	
			capture = cv.CaptureFromCAM(sourceWebcamID)
			
			cv.SetCaptureProperty(capture, cv.CV_CAP_PROP_FRAME_WIDTH, int(cfgsourcewebcamsize[0]))
			cv.SetCaptureProperty(capture, cv.CV_CAP_PROP_FRAME_HEIGHT, int(cfgsourcewebcamsize[1]))	
			if self.C.getConfig('cfgsourcewebcambright') != "no":
				print("Assign Brightness value:" + str(float(self.C.getConfig('cfgsourcewebcambright')) / 100))
				cv.SetCaptureProperty(capture, cv.CV_CAP_PROP_BRIGHTNESS, float(self.C.getConfig('cfgsourcewebcambright')) / 100)
			if self.C.getConfig('cfgsourcewebcamcontrast') != "no":			
				print("Assign Constrast value:" + str(float(self.C.getConfig('cfgsourcewebcamcontrast')) / 100))
				cv.SetCaptureProperty(capture, cv.CV_CAP_PROP_CONTRAST, float(self.C.getConfig('cfgsourcewebcamcontrast')) / 100)
			if self.C.getConfig('cfgsourcewebcamsaturation') != "no":
				print("Assign Saturation value:" + str(float(self.C.getConfig('cfgsourcewebcamsaturation')) / 100))
				cv.SetCaptureProperty(capture, cv.CV_CAP_PROP_SATURATION, float(self.C.getConfig('cfgsourcewebcamsaturation')) / 100)
			if self.C.getConfig('cfgsourcewebcamgain') != "no":
				print("Assign Gain value:" + str(float(self.C.getConfig('cfgsourcewebcamgain')) / 100))
				cv.SetCaptureProperty(capture, cv.CV_CAP_PROP_GAIN, float(self.C.getConfig('cfgsourcewebcamgain')) / 100)
			
			self.Debug.Display(_("Catpure: USB Webcam Setting: Capture from /dev/video%(sourceWebcamID)s") % {'sourceWebcamID': str(sourceWebcamID)} )
			self.Debug.Display(_("Catpure: USB Webcam Setting: Resolution %(cfgsourcewidth)s x %(cfgsourceheight)s") % {'cfgsourcewidth': str(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_FRAME_WIDTH)), 'cfgsourceheight': str(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_FRAME_HEIGHT))} )		
			self.Debug.Display(_("Catpure: USB Webcam Setting: Brightness: %(cfgsourcesetting)s (%(cfgsourcesettingprct)s%%)") % {'cfgsourcesetting': str(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_BRIGHTNESS)), 'cfgsourcesettingprct': str(int(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_BRIGHTNESS)*100))} )
			self.Debug.Display(_("Catpure: USB Webcam Setting: Contrast: %(cfgsourcesetting)s (%(cfgsourcesettingprct)s%%)") % {'cfgsourcesetting': str(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_CONTRAST)), 'cfgsourcesettingprct': str(int(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_CONTRAST)*100))} )
			self.Debug.Display(_("Catpure: USB Webcam Setting: Saturation: %(cfgsourcesetting)s (%(cfgsourcesettingprct)s%%)") % {'cfgsourcesetting': str(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_SATURATION)), 'cfgsourcesettingprct': str(int(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_SATURATION)*100))} )
			self.Debug.Display(_("Catpure: USB Webcam Setting: Gain: %(cfgsourcesetting)s (%(cfgsourcesettingprct)s%%)") % {'cfgsourcesetting': str(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_GAIN)), 'cfgsourcesettingprct': str(int(cv.GetCaptureProperty(capture, cv.CV_CAP_PROP_GAIN)*100))} )				
			
			time.sleep(5)
			cv.GrabFrame(capture)
			image = cv.RetrieveFrame(capture)
			cv.SaveImage(self.Cfgtmpdir + self.Cfgfilename, image)
	
			return self.FileManager.CheckCapturedFile(self.Cfgtmpdir + self.Cfgfilename, self.Cfgtmpdir + self.Cfgfilename)	

		else: 
			self.Debug.Display(_("Catpure: USB Webcam Lookup: Camera %(cfgsourcewebcamcamid)s not found") % {'cfgsourcewebcamcamid': str(cfgsourcewebcamcamid)} )
			return False			
			

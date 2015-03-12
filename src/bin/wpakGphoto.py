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

# Class used to manipulate cameras using gphoto2
class Gphoto:
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, FileManager):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.FileManager = FileManager
		self.Cfglogdir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfglogdir')
		self.Cfglogfile = cmdType + "-" + self.Cfgcurrentsource + ".log"
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')
		self.Cfglivedir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfglivedir')
		self.Cfgvideodir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgvideodir')
		self.Cfgpictdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgpictdir')
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.Cfgdispdate = self.Cfgnow.strftime("%Y%m%d%H%M%S")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"

	# Function: Capture
	# Description; This function is used to capture a picture with gphoto
	# Return: Nothing
	def Capture(self):
		#if self.C.getConfig('cfgsourcegphotocameramodel') != "no":
		#	GphotoCameraCommand = '--camera="' + self.C.getConfig('cfgsourcegphotocameramodel') + '"'
		#	Debug.Display("Capture: Gphoto: Precision modele appareil:" + self.C.getConfig('cfgsourcegphotocameramodel'))									
		#else:
		GphotoCameraCommand = ''

		if self.C.getConfig('cfgsourcegphotocameraportdetail') != "automatic" and self.C.getConfig('cfgsourcegphotocameraportdetail') != "" and self.G.getConfig('cfggphotoports') == "yes":
			GphotoPortCommand = '--port=' + self.C.getConfig('cfgsourcegphotocameraportdetail')
			self.Debug.Display(_("Capture: Gphoto: Precision camera port: %(CameraPort)s") % {'CameraPort': self.C.getConfig('cfgsourcegphotocameraportdetail')} )
		else:
			GphotoPortCommand = ''

		if self.C.getConfig('cfgsourcedebug') == "yes":
			GphotoDebugCommand = "--debug --debug-logfile=" + self.Cfglogdir + self.Cfglogfile
			self.Debug.Display(_("Capture: Gphoto: Debug mode activation"))
		else:
			GphotoDebugCommand = ''

		self.Debug.Display(_("Capture: Gphoto: Start Capture"))
		self.FileManager.CheckDir(self.Cfgtmpdir + self.Cfgfilename)
		if os.path.isfile(self.G.getConfig('cfggphotodir') + "gphoto2"):
			if self.C.getConfig('cfgsourcegphotohdractivate') != "yes":
				import shlex, subprocess
				GphotoCommand = self.G.getConfig('cfggphotodir') + "gphoto2 --capture-image-and-download " + GphotoDebugCommand + " " + GphotoCameraCommand + " " + GphotoPortCommand + " --filename " + self.Cfgtmpdir + self.Cfgdispdate + ".%C"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)
				if os.path.isfile(self.Cfgtmpdir + self.Cfgdispdate + ".JPG"):					
					self.Debug.Display(_("Capture: Gphoto: Renaming raw picture from .JPG to .jpg"))
					os.rename(self.Cfgtmpdir + self.Cfgdispdate + ".JPG", self.Cfgtmpdir + self.Cfgdispdate + ".jpg")	
								
				#We rename vendor specific extension to .raw, objective being to have a standard name for raw files
				if os.path.isfile(self.Cfgtmpdir + self.Cfgdispdate + ".CR2"):	
					self.Debug.Display(_("Capture: Gphoto: Renaming raw picture from .CR2 to .raw"))
					os.rename(self.Cfgtmpdir + self.Cfgdispdate + ".CR2", self.Cfgtmpdir + self.Cfgdispdate + ".raw")
					
				if os.path.isfile(self.Cfgtmpdir + self.Cfgdispdate + ".cr2"):	
					self.Debug.Display(_("Capture: Gphoto: Renaming raw picture from .cr2 to .raw"))
					os.rename(self.Cfgtmpdir + self.Cfgdispdate + ".cr2", self.Cfgtmpdir + self.Cfgdispdate + ".raw")
					
				if os.path.isfile(self.Cfgtmpdir + self.Cfgdispdate + ".nef"):	
					self.Debug.Display(_("Capture: Gphoto: Renaming raw picture from .nef to .raw"))				
					os.rename(self.Cfgtmpdir + self.Cfgdispdate + ".nef", self.Cfgtmpdir + self.Cfgdispdate + ".raw")		

				if os.path.isfile(self.Cfgtmpdir + self.Cfgdispdate + ".nrw"):	
					self.Debug.Display(_("Capture: Gphoto: Renaming raw picture from .nrw to .raw"))								
					os.rename(self.Cfgtmpdir + self.Cfgdispdate + ".nrw", self.Cfgtmpdir + self.Cfgdispdate + ".raw")	
				
				#If raw is not configured, we remove the file		
				if self.C.getConfig('cfgsourcegphotoraw') != "yes" and os.path.isfile(self.Cfgtmpdir + self.Cfgdispdate + ".raw"):
					self.Debug.Display(_("Capture: Gphoto: Raw file not allowed, deleting file"))													
					os.remove(self.Cfgtmpdir + self.Cfgdispdate + ".raw")		

				#If there is only a raw file (i.e. no jpg), we convert raw file to jpg
				if not os.path.isfile(self.Cfgtmpdir + self.Cfgdispdate + ".jpg") and os.path.isfile(self.Cfgtmpdir + self.Cfgdispdate + ".raw"):
					self.Debug.Display(_("Capture: Gphoto: No jpg file captured, converting raw file to jpg"))
					import shlex, subprocess
					#dcraw -c 20121030192802.raw | cjpeg -quality 100 -optimize -progressive > 20121030193004.jpg
					#ufraw-batch --out-type=jpeg 20121030193907.raw
					GphotoCommand = "ufraw-batch --out-type=jpeg " + self.Cfgtmpdir + self.Cfgdispdate + ".raw"
					args = shlex.split(GphotoCommand)
					p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
					output, errors = p.communicate()
					self.Debug.Display(_("Capture: Gphoto: Conversion to jpg completed"))																											
						
			else:
				# This part is experimental, calling various tools
				# It should create an HDR image using three captures with different exposures.
				# Adapted from a script available here: http://linuxdarkroom.tassy.net, credits to: Vincent Tassy <photo@tassy.net>
				self.Debug.Display(_("Capture: Gphoto: HDR: Activate HDR capture"))
				import shlex, subprocess
				self.Debug.Display(_("Capture: Gphoto: HDR: Capture low exposure"))
				GphotoCommand = self.G.getConfig('cfggphotodir') + "gphoto2 --set-config " + self.C.getConfig('cfgsourcegphotohdrexposureconfig') + "=" + self.C.getConfig('cfgsourcegphotohdrexposurelow') + " --capture-image-and-download " + GphotoDebugCommand + " " + GphotoCameraCommand + " " + GphotoPortCommand + " --filename " + self.Cfgtmpdir + self.Cfgdispdate + "-low.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)
				
				self.Debug.Display(_("Capture: Gphoto: HDR: Capture medium exposure"))
				GphotoCommand = self.G.getConfig('cfggphotodir') + "gphoto2 --set-config " + self.C.getConfig('cfgsourcegphotohdrexposureconfig') + "=" + self.C.getConfig('cfgsourcegphotohdrexposuremedium') + " --capture-image-and-download " + GphotoDebugCommand + " " + GphotoCameraCommand + " " + GphotoPortCommand + " --filename " + self.Cfgtmpdir + self.Cfgdispdate + "-medium.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)

				self.Debug.Display(_("Capture: Gphoto: HDR: Capture high exposure"))
				GphotoCommand = self.G.getConfig('cfggphotodir') + "gphoto2 --set-config " + self.C.getConfig('cfgsourcegphotohdrexposureconfig') + "=" + self.C.getConfig('cfgsourcegphotohdrexposurehigh') + " --capture-image-and-download " + GphotoDebugCommand + " " + GphotoCameraCommand + " " + GphotoPortCommand + " --filename " + self.Cfgtmpdir + self.Cfgdispdate + "-high.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)

				self.Debug.Display(_("Capture: Gphoto: HDR: Setting camera back to medium exposure"))
				GphotoCommand = self.G.getConfig('cfggphotodir') + "gphoto2 --set-config " + self.C.getConfig('cfgsourcegphotohdrexposureconfig') + "=" + self.C.getConfig('cfgsourcegphotohdrexposuremedium') + " " + GphotoDebugCommand + " " + GphotoCameraCommand + " " + GphotoPortCommand
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)
				
				self.Debug.Display(_("Capture: Gphoto: HDR: Processing captured images with jpeg2hdrgen"))
				GphotoCommand = "jpeg2hdrgen " + self.Cfgtmpdir + self.Cfgdispdate + "-low.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)
				HDRGENFile = open(self.Cfgtmpdir + self.Cfgdispdate + '-pfs.hdrgen' ,'a')
				HDRGENFile.write(output)
				HDRGENFile.close()
				GphotoCommand = "jpeg2hdrgen " + self.Cfgtmpdir + self.Cfgdispdate + "-medium.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)
				HDRGENFile = open(self.Cfgtmpdir + self.Cfgdispdate + '-pfs.hdrgen' ,'a')
				HDRGENFile.write(output)
				HDRGENFile.close()				
				GphotoCommand = "jpeg2hdrgen " + self.Cfgtmpdir + self.Cfgdispdate + "-high.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)
				HDRGENFile = open(self.Cfgtmpdir + self.Cfgdispdate + '-pfs.hdrgen' ,'a')
				HDRGENFile.write(output)
				HDRGENFile.close()

				CurrentHDRFile = open(self.Cfgtmpdir + self.Cfgdispdate + '-pfs.hdrgen' ,'r')
				NewHDRFile = open(self.Cfgtmpdir + self.Cfgdispdate + '-pfs_updated.hdrgen' ,'w')
				for line in CurrentHDRFile:
					NewHDRLine = line.replace(self.Cfgdispdate, self.Cfgdispdate + "-AIS")
					NewHDRLine = NewHDRLine.replace("low.jpg", "0000.tif")
					NewHDRLine = NewHDRLine.replace("medium.jpg", "0001.tif")
					NewHDRLine = NewHDRLine.replace("high.jpg", "0002.tif")
					NewHDRFile.write(NewHDRLine)	
				CurrentHDRFile.close()
				NewHDRFile.close()

				self.Debug.Display(_("Capture: Gphoto: HDR: Aligning pictures with align_image_stack"))
				GphotoCommand = "align_image_stack -v -a " + self.Cfgtmpdir + self.Cfgdispdate + "-AIS- " + self.Cfgtmpdir + self.Cfgdispdate + "-low.jpg " + self.Cfgtmpdir + self.Cfgdispdate + "-medium.jpg " + self.Cfgtmpdir + self.Cfgdispdate + "-high.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(GphotoCommand)
				self.Debug.Display(output)
				self.Debug.Display(errors)
				
				self.Debug.Display(_("Capture: Gphoto: HDR: Generating enfused images"))
				GphotoCommand = "enfuse -o " + self.Cfgtmpdir + self.Cfgdispdate + "-enfuse.tif " + self.Cfgtmpdir + self.Cfgdispdate + "-AIS-0000.tif " + self.Cfgtmpdir + self.Cfgdispdate + "-AIS-0001.tif " + self.Cfgtmpdir + self.Cfgdispdate + "-AIS-0002.tif"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(errors)
								
				self.Debug.Display(_("Capture: Gphoto: HDR: Processing with pfsinhdrgen"))
				GphotoCommand = "pfsinhdrgen " + self.Cfgtmpdir + self.Cfgdispdate + "-pfs_updated.hdrgen | pfshdrcalibrate -c none -r gamma | pfsclamp --rgb | pfsout " + self.Cfgtmpdir + self.Cfgdispdate + "-pfs.hdr"
				os.system(GphotoCommand)
				
				self.Debug.Display(_("Capture: Gphoto: HDR: Tonemap using mantiuk06"))
				GphotoCommand = "pfsin " + self.Cfgtmpdir + self.Cfgdispdate + "-pfs.hdr | pfstmo_mantiuk06 -e 1 -s 1 | pfsgamma --gamma 2.2 | pfsoutimgmagick " + self.Cfgtmpdir + self.Cfgdispdate + "-hdr_mantiuk06.tif"
				os.system(GphotoCommand)
				
				self.Debug.Display(_("Capture: Gphoto: HDR: Tonemap using fattal02"))
				GphotoCommand = "pfsin " + self.Cfgtmpdir + self.Cfgdispdate + "-pfs.hdr | pfstmo_fattal02 -s 1 | pfsgamma --gamma 2.2 | pfsoutimgmagick " + self.Cfgtmpdir + self.Cfgdispdate + "-hdr_fattal02.tif"
				os.system(GphotoCommand)

				self.Debug.Display(_("Capture: Gphoto: HDR: Convert fattal02 to JPG"))
				GphotoCommand = "convert " + self.Cfgtmpdir + self.Cfgdispdate + "-hdr_fattal02.tif " + self.Cfgtmpdir + self.Cfgdispdate + "-fattal02.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)

				self.Debug.Display(_("Capture: Gphoto: HDR: Convert mantiuk06 to JPG"))
				GphotoCommand = "convert " + self.Cfgtmpdir + self.Cfgdispdate + "-hdr_mantiuk06.tif " + self.Cfgtmpdir + self.Cfgdispdate + "-mantiuk06.jpg"
				args = shlex.split(GphotoCommand)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)

				self.Debug.Display(_("Capture: Gphoto: HDR: Creating layered picture 1/3"))
				GphotoCommand = "convert " + self.Cfgtmpdir + self.Cfgdispdate + "-enfuse.tif \( " + self.Cfgtmpdir + self.Cfgdispdate + "-hdr_mantiuk06.tif -alpha set -channel A -fx '0.5' -compose softlight \) -composite " + self.Cfgtmpdir + self.Cfgdispdate + "-composite.tif"
				os.system(GphotoCommand)
				
				self.Debug.Display(_("Capture: Gphoto: HDR: Creating layered picture 2/3"))
				GphotoCommand = "convert " + self.Cfgtmpdir + self.Cfgdispdate + "-composite.tif \( " + self.Cfgtmpdir + self.Cfgdispdate + "-hdr_fattal02.tif -alpha set -channel A -fx '0.7' -compose overlay \) " + self.Cfgtmpdir + self.Cfgdispdate + "-composite.tif"
				os.system(GphotoCommand)
				
				self.Debug.Display(_("Capture: Gphoto: HDR: Creating layered picture 3/3"))
				GphotoCommand = "convert " + self.Cfgtmpdir + self.Cfgdispdate + "-composite.tif " + self.Cfgtmpdir + self.Cfgdispdate + ".jpg"
				os.system(GphotoCommand)
				
				self.Debug.Display(_("Capture: Gphoto: HDR: Deleting temporary files"))
				GphotoCommand = "rm " + self.Cfgtmpdir + self.Cfgdispdate + "-*"
				os.system(GphotoCommand)

		else:
			self.Debug.Display(_("Error: Unable to locate gphoto2 binary"))
			sys.exit()
		return self.FileManager.CheckCapturedFile(self.Cfgtmpdir + self.Cfgfilename, "")

	# Function: ScanPorts
	# Description; This function is used to scan cameras detected by gphoto and write results to a file
	# Return: Nothing
	def ScanPorts(self):
		try:
			CmdGphotoScanPorts = self.G.getConfig('cfggphotodir') + "gphoto2 --auto-detect | grep usb: > " + self.Cfgcachedir + "gphotoports.cur"
			os.system(CmdGphotoScanPorts)
		except:
			self.Debug.Display(_("Port Scanning: Gphoto busy"))

	# Function: GetCameraOwner
	# Description; This function is used to get camera owner of a specific camera
	#	Camera Owner is a setting stored in the camera and available via PTP
	# Return: Camera owner
	def GetCameraOwner(self, usbport):
		CmdGphotoSearchOwner = self.G.getConfig('cfggphotodir') + "gphoto2 --port=" + usbport + " --get-config=/main/settings/ownername"
		import shlex, subprocess
		args = shlex.split(CmdGphotoSearchOwner)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		head, sep, CameraOwner = output.partition('Current: ')
		CameraOwner = CameraOwner.strip()
		return CameraOwner


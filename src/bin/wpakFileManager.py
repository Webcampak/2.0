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

class FileManager: 
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, ErrorManagement):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.ErrorManagement = ErrorManagement
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')		
		
	# Function: CheckDir
	# Description; This function is used to check if a directory/file exists, if not it create it (with appropriate path)
	## f: File 
	# Return: Nothing
	@staticmethod	
	def CheckDir(f):
	    d = os.path.dirname(f)
	    if not os.path.exists(d):
	        os.makedirs(d)

	# Function: CheckDirSize
	# Description; This function is used to get the size of a directory and its subdirectories in MB
	## Directory: Directory 
	# Return: Directory size
	@staticmethod
	def CheckDirSize(Directory):
		size = 0
		for (current, subDirs, files) in os.walk(Directory):
			size = size + sum( os.path.getsize( os.path.join(current, files) ) for files in files )
		return size/(1024*1024)

	# Function: CheckJpegFile
	# Description; This function is used to check if a file is a JPEG picture (not only by extension) and does not contains errors
	## Filename: Filename 
	# Return: True or False
	@staticmethod
	def CheckJpegFile(Filename):
		Command = "jpeginfo " + Filename
		import shlex, subprocess
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		if "ERROR" in output:
			return False
		else:
			return True

	# Function: ReturnTimestampFromFile
	# Description; This function is used to return a datetime from a jpg file using Webcampak naming convention
	## Filename: Filename 
	# Return: timestamp
	@staticmethod
	def ReturnTimestampFromFile(Filename):
		f = Filename
		cfgnow = datetime.datetime(*time.strptime(f[0] + f[1] + f[2] + f[3] + "/" + f[4] + f[5] + "/" + f[6] + f[7] + "/" + f[8] + f[9] + "/" + f[10] + f[11] + "/" + f[12] + f[13], "%Y/%m/%d/%H/%M/%S")[0:6])
		return cfgnow

	# Function: SecondsSinceLastCapture
	# Description; This function is used to return the number of seconds since last picture captured from a source
	## Directory: Directory where pictures are located 
	# Return: datetime
	@staticmethod
	def SecondsSinceLastCapture(Directory, Timezone):
		for listpictdir in sorted(os.listdir(Directory), reverse=True):
			if listpictdir[:2] == "20" and os.path.isdir(Directory + listpictdir):
				for listpictfiles in sorted(os.listdir(Directory + listpictdir), reverse=True):
					if listpictfiles[:2] == "20" and FileManager.CheckJpegFile(Directory + listpictdir + "/" + listpictfiles) == True:
						print("Last picture: " + Directory + listpictdir + "/" + listpictfiles)
						initDateTime = datetime.datetime.utcnow()
						if Timezone != "": # Update the timezone from UTC to the source's timezone
							sourceTimezone = tz.gettz(Timezone)
							initDateTime = initDateTime.replace(tzinfo=tz.gettz('UTC'))				
							initDateTime = initDateTime.astimezone(sourceTimezone)
							fileDateTime =  FileManager.ReturnTimestampFromFile(listpictfiles)
							fileDateTime = fileDateTime.replace(tzinfo=sourceTimezone)									
							#print "Filedate:" + str(fileDateTime) 
							#fileDateTime = initDateTime.replace(tzinfo=sourceTimezone)	
							#print "Filedate:" + str(fileDateTime) 													
						timedifference = initDateTime - fileDateTime
						return timedifference
						break;
				break;

	# Function: SecondsBetweenPictures
	# Description; This function is used to return the number of seconds between last picture of a directory and a specified picture file
	## Directory: Directory where pictures are located 
	## CurrentFile: Filename to be tested against	
	# Return: seconds
	@staticmethod
	def SecondsBetweenPictures(Directory, CurrentFile):
		for listpictfiles in sorted(os.listdir(Directory), reverse=False):
			if listpictfiles[:2] == "20" and FileManager.CheckJpegFile(Directory + "/" + listpictfiles) == True:
				#print "Last picture: " + Directory + "/" + listpictfiles
				#print "Timestamp" + str(FileManager.ReturnTimestampFromFile(CurrentFile))
				timedifference = FileManager.ReturnTimestampFromFile(listpictfiles) - FileManager.ReturnTimestampFromFile(CurrentFile)
				#print "TimeDifference" + str(timedifference.seconds)
				return timedifference.seconds
				break;

	# Function: DeleteLatestPicture
	# Description; This function is used to delete the latest picture of a directory
	## Directory: Directory where pictures are located 
	# Return: seconds
	@staticmethod
	def DeleteLatestPicture(Directory):
		for listpictfiles in sorted(os.listdir(Directory), reverse=False):
			if listpictfiles[:2] == "20" and FileManager.CheckJpegFile(Directory + "/" + listpictfiles) == True:
				os.remove(Directory + "/" + listpictfiles)
				#print "Delete picture picture: " + Directory + "/" + listpictfiles
				break;

	# Function: DeleteOldPictures
	# Description; This function is used to delete old pictures
	#	If it detect an old picture, all pictures taken this day will be deleted.
	## PicturesDirectory: Directory containing pictures
	## Days: Number of days
	# Return: True or False
	def DeleteOldPictures(self, PicturesDirectory, Days):
		currenttimestamp = int(self.Cfgnow.strftime("%s"))
		self.Debug.Display(_("Disk Management: Automatically deleting pictures in %(PicturesDirectory)s directory after %(Days)s days") % {'PicturesDirectory': str(PicturesDirectory), 'Days': str(Days)} )
		for f in os.listdir(PicturesDirectory):
			if os.path.isdir(os.path.join(PicturesDirectory, f)) and f[0] + f[1] == "20":
				dirdate = (int(f[0] + f[1] + f[2] + f[3]), int(f[4] + f[5]), int(f[6] + f[7]), 0, 0, 0, 0, 0, 0)
				timestamp = int(time.mktime(dirdate))
				if (currenttimestamp - timestamp) / 86400 > Days:
					self.Debug.Display(_("Disk Management: Directory %(PicturesDirectory)s is %(PicturesDirectoryAge)s days old") % {'PicturesDirectory': str(PicturesDirectory + f), 'PicturesDirectoryAge': str((currenttimestamp - timestamp) / 86400)} )
					if len(f) == 8:
						shutil.rmtree(PicturesDirectory + f)
						# Section to delete raw files
						if os.path.isdir(os.path.join(PicturesDirectory + "raw/", f)):
							shutil.rmtree(PicturesDirectory + "raw/" + f)

	# Function: DeleteOverSize
	# Description; This function is used to free disk space by deleting old pictures
	#	This function will delete a whole day of pictures in a go.
	## PicturesDirectory: Directory containing pictures
	## Size: Maximum size of the directory
	# Return: True or False
	def DeleteOverSize(self, PicturesDirectory, Size):
		self.Debug.Display(_("Disk Management: Automatically deleting pictures in %(PicturesDirectory)s directory if global size is greater than %(PicturesDirectorySize)s Mo") % {'PicturesDirectory': str(PicturesDirectory), 'PicturesDirectorySize': str(Size)} )
		self.Debug.Display(_("Disk Management: Global size of %(PicturesDirectory)s directory is %(PicturesDirectorySize)s Mo") % {'PicturesDirectory': str(PicturesDirectory), 'PicturesDirectorySize':  str(FileManager.CheckDirSize(PicturesDirectory))} )
		if FileManager.CheckDirSize(PicturesDirectory) > Size:
			for f in sorted(os.listdir(PicturesDirectory)):
				if os.path.isdir(os.path.join(PicturesDirectory, f)):
					if len(f) == 8:
						if FileManager.CheckDirSize(PicturesDirectory) > Size:
							self.Debug.Display(_("Disk Management: %(PicturesDirectory)s directory size is %(PicturesDirectorySize)s Mo, deleting ...") % {'PicturesDirectory': str(PicturesDirectory + f), 'PicturesDirectorySize': str(FileManager.CheckDirSize(PicturesDirectory + f))} )
							shutil.rmtree(PicturesDirectory + f)
							self.Debug.Display(_("Disk Management: %(PicturesDirectory)s directory size is %(PicturesDirectorySize)s Mo") % {'PicturesDirectory': str(PicturesDirectory), 'PicturesDirectorySize': str(FileManager.CheckDirSize(PicturesDirectory))} )
							# Section to delete raw files
							if os.path.isdir(os.path.join(PicturesDirectory + "raw/", f)):
								shutil.rmtree(PicturesDirectory + "raw/" + f)


	# Function: CheckCapturedFile
	# Description; Check if a captured file exists and has a proper size (greater than cfgcaptureminisize). 
	#	If yes: 
	#		- If FileDestination != "", the function moves FileSource to FileDestination
	#		- The function calls self.ErrorManagement.SendSuccessEmail() to send an email where appropriate
	#		- The function clears all error counters
	#		- The function returns True
	#	If no:
	#		- The function increments error counts
	#		- The function return False
	## FileSource: Source file 
	## FileDestination: Destination file, A destination file is set to rename picture on the fly
	# Return: True or False
	def CheckCapturedFile(self, FileSource, FileDestination):
		if os.path.isfile(FileSource):
			FileSourceSize = os.path.getsize(FileSource)
		else:
			FileSourceSize = 0
		if FileSourceSize > int(self.C.getConfig('cfgcaptureminisize')):
			if FileDestination != "": 
				shutil.move(FileSource, FileDestination)
				tmpfilepath = os.path.splitext(FileSource)[0]
				tmpfilename = tmpfilepath[-14:]
				tmpfileday = tmpfilename[:8]
				#print "From: " + self.Cfgtmpdir + "raw/" + tmpfileday + "/" + tmpfilename + ".raw"
				#print "To: " + os.path.splitext(FileDestination)[0] + ".raw"				
				if os.path.isfile(self.Cfgtmpdir + "raw/" + tmpfileday + "/" + tmpfilename + ".raw"):
					shutil.move(self.Cfgtmpdir + "raw/" + tmpfileday + "/" + tmpfilename + ".raw", os.path.splitext(FileDestination)[0] + ".raw")		

			self.Debug.Display("Capture: Check File: Successful")
			self.ErrorManagement.SendSuccessEmail()
			if os.path.isfile(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcount"): 
				os.remove(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcount")
			if os.path.isfile(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountemail"): 
				os.remove(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountemail")
			if os.path.isfile(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountphidget"): 
				os.remove(self.Cfgcachedir + "source" + self.Cfgcurrentsource + "-errorcountphidget")					
			return True									
		else:
			self.Debug.Display(_("Capture: Check File: capture failed, incorrecte size: %(IncorrectSize)s/%(TargetSize)s") % {'IncorrectSize': str(FileSourceSize), 'TargetSize': self.C.getConfig('cfgcaptureminisize') } )  
			CurrentError = self.ErrorManagement.CurrentStatus() + 1
			self.ErrorManagement.UpdateStatus(CurrentError)
			return False


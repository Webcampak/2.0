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

from ftplib import FTP
from wpakDebug import Debug
from wpakConfig import Config

class FTPClass:
	# Function: FTPCreateDirs
	# Description; This function is used to create FTP directories if they do not exist
	## ftp: FTP instance 	
	## FTPDirectory: Directory to be created 
	## Debug: Debug instance 
	# Return: Nothing
	@staticmethod
	def FTPCreateDirs(ftp, FTPDirectory, Debug):
		#gettext.install('webcampak')
		ftpdirectories = FTPDirectory.split("/")
		cpt = 0
		currentdir = ""
		for j in ftpdirectories:
			if j != "":
				currentdir = currentdir + "/" + ftpdirectories[cpt]
				try:
					ftp.cwd(currentdir)
					ftp.cwd('..')
				except:
					Debug.Display(_("FTP: %(currentdir)s directory does not exist, creation ...") % {'currentdir': str(currentdir)} )
					ftp.mkd(currentdir)
			cpt = cpt + 1

	# Function: FTPUpload
	# Description; This function is used to upload files via FTP
	## FTPxxxxx: FTP parameters 	
	## Debug: Debug instance 
	# Return: Nothing
	@staticmethod
	#def FTPUpload(FTPServerID, FTPServer, FTPUsername, FTPPassword, FTPDirectory, DirFilename, FTPFilename, FTPActive, Debug, Retry):
	def FTPUpload(SourceID, FTPServerID, FTPDirectory, DirFilename, FTPFilename, Debug, Retry):
		#We load the FTP configuration file
		if os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + SourceID + "-ftpservers.cfg"):
			f = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + SourceID + "-ftpservers.cfg")
			FTPServer = f.getConfig('cfgftpserverslist' + str(FTPServerID))[1]
			FTPUsername = f.getConfig('cfgftpserverslist' + str(FTPServerID))[2]
			FTPPassword = f.getConfig('cfgftpserverslist' + str(FTPServerID))[3]
			FTPDirectory = f.getConfig('cfgftpserverslist' + str(FTPServerID))[4] + FTPDirectory
			FTPActive = f.getConfig('cfgftpserverslist' + str(FTPServerID))[5]
					
		#gettext.install('webcampak')
		Debug.Display(_("FTP: Server: %(FTPServer)s Directory:  %(FTPDirectory)s Filename: %(FTPFilename)s Active: %(FTPActive)s Login: %(FTPUsername)s ") % {'FTPServer': str(FTPServer),'FTPDirectory': str(FTPDirectory),'FTPFilename': str(FTPFilename),'FTPActive': str(FTPActive), 'FTPUsername': str(FTPUsername)} )
		if Retry == False or Retry == "no":
			Retry = 1
		if int(Retry) < 1 or int(Retry) > 15:
			Retry = 2
		else:
			Retry = int(Retry) + 1
		TmpDirName = str(time.time())
		try:
			ftp = FTP(FTPServer)
		except:
			Debug.Display(_("Error: FTP: Connection creation failed, exiting ..."))
			Debug.Display(_("Error: FTP: Internet connection is not working, there will be no other try for this file ..."))
			FTPError = 1
			#sys.exit()
		try:														
			ftp.login(FTPUsername, FTPPassword)
		except:
			Debug.Display(_("Error: FTP: Connection to the server (login/password issue) failed"))
		try:
			ftp.set_debuglevel(0)
		except:
			Debug.Display(_("Error: FTP: Set Debug Level"))
		try:
			if FTPActive == "yes":
				ftp.set_pasv(False)
			else:
				ftp.set_pasv(True)
		except:
			Debug.Display(_("Error: FTP: Activation Active/Passive mode"))

		try:
			FTPClass.FTPCreateDirs(ftp, FTPDirectory, Debug)
			Debug.Display(_("FTP: Creation of  %(FTPDirectory)s directory") % {'FTPDirectory': str(FTPDirectory)} )
		except:
			Debug.Display(_("Error: FTP: Creation of  %(FTPDirectory)s directory") % {'FTPDirectory': str(FTPDirectory)} )
		try:
			ftp.mkd(FTPDirectory + TmpDirName + "/") 
			ftp.cwd(FTPDirectory + TmpDirName + "/")
			Debug.Display(_("FTP: Creation of  %(FTPDirectory)s directory") % {'FTPDirectory': str(FTPDirectory + TmpDirName + "/")} )
		except:
			Debug.Display(_("Error: FTP: Creation of  %(FTPDirectory)s directory") % {'FTPDirectory': str(FTPDirectory + TmpDirName + "/")} )

		f=file(DirFilename + FTPFilename,'rb')
		TransferSuccess = False
		for j in range(1, Retry):
			if TransferSuccess == False:		
				Debug.Display(_("FTP: Transfering file, Try:(%(CurrentTry)s/%(TotalTry)s)") % {'CurrentTry': str(j), 'TotalTry': str(Retry)})
				try:
					ftp.storbinary('STOR ' + os.path.basename(DirFilename + FTPFilename),f)
					Debug.Display(_("FTP: STOR  %(FTPDirectory)s ") % {'FTPDirectory': str(os.path.basename(DirFilename + FTPFilename))} )
				except:
					Debug.Display(_("Error: FTP: FTP Command failed (STOR) %(FTPDirectory)s") % {'FTPDirectory': str(os.path.basename(DirFilename + FTPFilename))})
				
				try:				
					Transferedfilesize = ftp.size(os.path.basename(FTPDirectory + TmpDirName + "/" + FTPFilename))
				except:
					Debug.Display(_("Error: Unable to get remove file size"))
					Transferedfilesize = 0
				Localfilesize = os.path.getsize(DirFilename + FTPFilename)
				Debug.Display(_("FTP: Remote size: %(RemoteFileSize)s / Local size: %(LocalFileSize)s") % {'RemoteFileSize': str(Transferedfilesize), 'LocalFileSize': str(Localfilesize)})				
				if Transferedfilesize == Localfilesize:
					TransferSuccess = True
					Debug.Display(_("FTP: File successfully sent to remote FTP"))
					try:
						ftp.rename(FTPDirectory + TmpDirName + "/" + FTPFilename, FTPDirectory + FTPFilename)
					except:
						Debug.Display(_("Error: FTP: FTP Command failed (RENAME)"))
		try:
			ftp.rmd(FTPDirectory + TmpDirName + "/")
		except:
			Debug.Display(_("Error: FTP: FTP Command failed (RMD)"))
		try:
			ftp.close()
		except:
			Debug.Display(_("Error: FTP: FTP Command failed (CLOSE)"))
			
		return TransferSuccess
		#except:
		#	Debug.Display(_("Error: FTP: File transfer failed"))


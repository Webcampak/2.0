#!/usr/bin/python
# -*- coding: utf-8 -*-

# Copyright (c) 2010-2012 Infracom & Eurotechnia (support@webcampak.com)
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

"""Webcampak Gather System and sources stats

Command Line tool to gather webcampak statistics

Usage: python wpak-gatherstats.py -g /path/to/config-general.cfg

Options:
  -g /home/user/webcampak/etc/config-general.cfg,   --global=...   Global configuration file (optional), will create it if it does not exist.
  -h, --help                                                       Show this help

Examples:
  python wpak-createlocalftpaccounts.py              Create local FTP accounts for vsftpd

This program is part of Webcampk tools. For more details please visit
http://www.webcampak.com
"""

__author__ = "Eurotechnia & Infracom"
__version__ = "$Revision: 2.x $"
__copyright__ = "Copyright (c) 2011 Eurotechnia & Infracom"
__license__ = "GPLv3"

import os, sys, smtplib, datetime, tempfile, subprocess, datetime, shutil, time, ftplib
import pwd
import getopt
import re
import shlex, subprocess
import psutil
import glob
from dateutil import tz

from wpakConfig import Config

class FileManager: 
	@staticmethod
	def CheckDir(f):
	    d = os.path.dirname(f)
	    if not os.path.exists(d):
	        os.makedirs(d)
	@staticmethod
	def DirectorySize(source):
		DuCommand = "du -sb " + source
		args = shlex.split(DuCommand)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()	
		return str(re.findall("\d+", output)[0])			

class Debug: 
	@staticmethod
	def Display(Log, g):	  
		now = datetime.datetime.utcnow()
		if g.getConfig('cfgservertimezone') != "":
			serverTimezone = tz.gettz(g.getConfig('cfgservertimezone'))
			now = now.replace(tzinfo=tz.gettz('UTC'))				
			now = now.astimezone(serverTimezone)		
		print(now.strftime("%d %B %Y - %k:%M:%S") + " : " + Log)
		Debug.Write(now.strftime("%d %B %Y - %k:%M:%S") + " : " + Log)

	@staticmethod
	def Write(Log):
		FileManager.CheckDir(cfglogdir + cfglogfile)
		f = open(cfglogdir + cfglogfile, 'a')
		f.write(Log + "\n")
		f.close()

	@staticmethod
	def Purge():
		if os.path.isfile(cfglogdir + cfglogfile): 	# On verifie si le fichier de logs existe existe
			if os.path.getsize(cfglogdir + cfglogfile) > int(g.getConfig('cfglogmaxsize')): # Si la taille est superieure a la valeur du fichier de configuration, suppression
				os.remove(cfglogdir + cfglogfile)
				Debug.Display("Debug: Purge: Deletion previous log file, max size allowed is %(MaxLogFileSize)s bytes" % {'MaxLogFileSize': g.getConfig('cfglogmaxsize')} )	

def usage():
    print(__doc__)

def main(argv):
	try:
		opts, args = getopt.getopt(argv, "hg:g", ["help", "global="])
	except getopt.GetoptError:
		usage()
		sys.exit(2)
		
	global CmdGlobalConfig	
	global cfglogdir
	global cfglogfile
	
	CmdGlobalConfig = ""

	for opt, arg in opts:
		if opt in ("-h", "--help"):
			usage()
			sys.exit()
		elif opt in ("-g", "--global"):
			CmdGlobalConfig = arg

	if CmdGlobalConfig != "" and os.path.isfile(CmdGlobalConfig):
			g = Config(CmdGlobalConfig)
	else:
		print("Error: Unable to identify global configuration file")
		usage()
		sys.exit()

	cfglogfile = "gatherstats.log"

	cfgbasedir = g.getConfig('cfgbasedir')
	cfglogdir = cfgbasedir +  g.getConfig('cfglogdir')
	cfgetcdir = cfgbasedir + g.getConfig('cfgetcdir')
	cfgstatsdir = cfgbasedir + g.getConfig('cfgstatsdir')
	cfgsourcesdir = cfgbasedir + g.getConfig('cfgsourcesdir')	

	cfgnow = datetime.datetime.utcnow()	
	if g.getConfig('cfgservertimezone') != "":
		serverTimezone = tz.gettz(g.getConfig('cfgservertimezone'))
		cfgnow = cfgnow.replace(tzinfo=tz.gettz('UTC'))				
		cfgnow = cfgnow.astimezone(serverTimezone)
						
	cfgcurrentday = cfgnow.strftime("%Y%m%d")
	cfgcurrenttimestamp = cfgnow.strftime("%s")
	cfgcurrentdaytime = cfgnow.strftime("%Y%m%d%H%M%S")	

	cfgnetif = g.getConfig('cfgnetif')

	Debug.Display("Gather Stats: Set timestamp into file:" + cfgstatsdir + cfgcurrentday + ".txt", g)
	FileManager.CheckDir(cfgstatsdir + cfgcurrentday + ".txt")				
	StatsFile = Config(cfgstatsdir + cfgcurrentday + ".txt")
	StatsFile.setSensor(cfgcurrentdaytime, "", "")
	StatsFile.setSensor(cfgcurrentdaytime, 'Timestamp', cfgnow.strftime("%s"))

	if os.path.isfile("/usr/bin/ifstat"):
		Debug.Display("Gather Stats: Gathering bandwidth stats over 10 seconds", g)
		IfstatCommand = "sudo /usr/bin/ifstat -i " + cfgnetif + " 10 1"
		args = shlex.split(IfstatCommand)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()	
		StatsFile.setSensor(cfgcurrentdaytime, 'BandwidthIn', str(re.findall("\d+.\d+", output)[0]))
		StatsFile.setSensor(cfgcurrentdaytime, 'BandwidthOut', str(re.findall("\d+.\d+", output)[1]))				
		StatsFile.setSensor(cfgcurrentdaytime, 'BandwidthTotal', str(float(re.findall("\d+.\d+", output)[0]) + float(re.findall("\d+.\d+", output)[1])))				
	
	Debug.Display("Gather Stats: Gathering memory usage", g)
	memoryusage = psutil.phymem_usage()
	StatsFile.setSensor(cfgcurrentdaytime, 'MemoryUsageTotal', str(memoryusage.total))
	StatsFile.setSensor(cfgcurrentdaytime, 'MemoryUsageUsed', str(memoryusage.used))		
	StatsFile.setSensor(cfgcurrentdaytime, 'MemoryUsageFree', str(memoryusage.free))		
	StatsFile.setSensor(cfgcurrentdaytime, 'MemoryUsagePercent', str(memoryusage.percent))		

	Debug.Display("Gather Stats: Gathering Disk usage", g)
	diskusage = psutil.disk_usage('/home/')
	StatsFile.setSensor(cfgcurrentdaytime, 'DiskUsageTotal', str(diskusage.total))
	StatsFile.setSensor(cfgcurrentdaytime, 'DiskUsageUsed', str(diskusage.used))		
	StatsFile.setSensor(cfgcurrentdaytime, 'DiskUsageFree', str(diskusage.free))		
	StatsFile.setSensor(cfgcurrentdaytime, 'DiskUsagePercent', str(diskusage.percent))		

	Debug.Display("Gather Stats: Gathering CPU usage", g)
	cpuusage = psutil.cpu_percent(interval=10)
	StatsFile.setSensor(cfgcurrentdaytime, 'CPUUsagePercent', str(cpuusage))

	Debug.Display("Gather Stats: Gathering Per-Sources usage", g)
	# We list all files from configuration directory
	for scanfile in sorted(os.listdir(cfgetcdir), reverse=True):
		if re.findall('config-source[0-9]+.cfg', scanfile):
			sourceid = str(re.findall('\d+', scanfile)[0])
			if os.path.isdir(cfgsourcesdir + "source" + sourceid + "/"):			
				Debug.Display("Gather Stats: Getting details for source: " + sourceid, g)			
				FileManager.CheckDir(cfgsourcesdir + "source" + sourceid + "/resources/stats/" + cfgcurrentday + ".txt")	
				StatsFile = Config(cfgsourcesdir + "source" + sourceid + "/resources/stats/" + cfgcurrentday + ".txt")
				if os.path.isdir(cfgsourcesdir + "source" + sourceid + "/pictures/"):			
					StatsFile.setSensor('PicDirScan', "", "")								
					for listpictdir in sorted(os.listdir(cfgsourcesdir + "source" + sourceid + "/pictures/"), reverse=False):
						if listpictdir[:2] == "20" and os.path.isdir(cfgsourcesdir + "source" + sourceid + "/pictures/" + listpictdir):
							Debug.Display("Gather Stats: Scanning directory:" + cfgsourcesdir + "source" + sourceid + "/pictures/" + listpictdir, g)
							StatsFile.setSensor('PicDirScan', 'ScannedDay' + listpictdir, [len(glob.glob(cfgsourcesdir + "source" + sourceid + "/pictures/" + listpictdir + "/*.jpg")), FileManager.DirectorySize(cfgsourcesdir + "source" + sourceid + "/pictures/" + listpictdir + "/")])
				StatsFile.setSensor(cfgcurrentdaytime, "", "")
				StatsFile.setSensor(cfgcurrentdaytime, 'Timestamp', cfgnow.strftime("%s"))
				if os.path.isdir(cfgsourcesdir + "source" + sourceid + "/pictures/"):
					StatsFile.setSensor(cfgcurrentdaytime, 'PicturesSize', FileManager.DirectorySize(cfgsourcesdir + "source" + sourceid + "/pictures/"))										
				if os.path.isdir(cfgsourcesdir + "source" + sourceid + "/videos/"):
					StatsFile.setSensor(cfgcurrentdaytime, 'VideoSize', FileManager.DirectorySize(cfgsourcesdir + "source" + sourceid + "/videos/"))
				if os.path.isdir(cfgsourcesdir + "source" + sourceid + "/"):
					StatsFile.setSensor(cfgcurrentdaytime, 'GlobalSize', FileManager.DirectorySize(cfgsourcesdir + "source" + sourceid + "/"))				

			else:
				Debug.Display("Gather Stats: Error, there is no directory for source:" + sourceid, g)					

if __name__ == "__main__":
	main(sys.argv[1:])




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

"""Webcampak automated configuration of motion tool

Usage: python wpak-createlocalftpaccounts.py

Options:
  -a, --action=                                                    Action to perform: setup, start, stop                    
  -g /home/user/webcampak/etc/config-general.cfg,   --global=...   Global configuration file (optional), will create it if it does not exist.
  -h, --help                                                       Show this help

Examples:
  python wpak-motionsetup.py              Configure motion tool automatically

This program is part of Webcampk tools. For more details please visit
http://www.webcampak.com
"""

__author__ = "Eurotechnia & Infracom"
__version__ = "$Revision: 0.9 $"
__copyright__ = "Copyright (c) 2011 Eurotechnia & Infracom"
__license__ = "GPLv3"

import os, sys, smtplib, datetime, tempfile, subprocess, datetime, shutil, time, ftplib
import pwd
import getopt

class FileManager: 
	@staticmethod
	def CheckDir(f):
	    d = os.path.dirname(f)
	    if not os.path.exists(d):
	        os.makedirs(d)

	@staticmethod
	def ReplaceTextInFile(File, Source, Destination):
		import re
		o = open(File + ".new","w")
		data = open(File).read()
		o.write( re.sub(Source,Destination,data) )
		o.close()
		os.remove(File)
		shutil.copy(File + ".new", File)
		os.remove(File + ".new")
				

class Config:
	def __init__(self, path):
		self.Path = path
		from configobj import ConfigObj
		self.Config = ConfigObj(self.Path)

	def getConfig(self, key):
		return self.Config[key]
class Debug: 
	@staticmethod
	def Display(Log):	  
		now = datetime.datetime.utcnow()
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
		opts, args = getopt.getopt(argv, "ha:g:a", ["help", "global=", "action="])
	except getopt.GetoptError:
		usage()
		sys.exit(2)
		
	global CmdGlobalConfig	
	global CmdGlobalAction	
	global cfglogdir
	global cfglogfile
	
	CmdGlobalConfig = ""
	CmdGlobalAction = ""
	
	for opt, arg in opts:
		if opt in ("-h", "--help"):
			usage()
			sys.exit()
		elif opt in ("-a", "--action"):
			CmdGlobalAction = arg
		elif opt in ("-g", "--global"):
			CmdGlobalConfig = arg
			print("Global: " + CmdGlobalConfig)

	if CmdGlobalConfig != "" and os.path.isfile(CmdGlobalConfig):
			g = Config(CmdGlobalConfig)
	else:
		print("Error: Unable to identify configuration file")
		usage()
		sys.exit()

	cfgbasedir = g.getConfig('cfgbasedir')
	cfglogdir = cfgbasedir +  g.getConfig('cfglogdir')
	cfglogfile = "passthru.log"
	cfgetcdir = cfgbasedir + g.getConfig('cfgetcdir')
	cfginitdir = cfgbasedir +  g.getConfig('cfginitdir')
	cfgbindir = cfgbasedir + g.getConfig('cfgbindir')


	if CmdGlobalAction == "setup":
		Debug.Display("Motion: Replacing motion global configuration file")
		if os.path.isfile(cfgetcdir + "motion.global.conf"):
			os.remove(cfgetcdir + "motion.global.conf")
		shutil.copy(cfginitdir + "config/motion.global.conf", cfgetcdir + "motion.global.conf")

		Debug.Display("Motion: Sources analysis")
		for sources in range(1, int(g.getConfig('cfgnbsources')) + 1):
			if os.path.isfile(cfgetcdir + "motion.run.source" + str(sources) + ".conf"):
				os.remove(cfgetcdir + "motion.run.source" + str(sources) + ".conf")  
			if os.path.isfile(cfgetcdir + "config-source" + str(sources) + ".cfg"):
				c = Config(cfgetcdir + "config-source" + str(sources) + ".cfg")
				Debug.Display("Motion: Processing source %(Sourcenb)s" % {'Sourcenb': str(sources)})
				if c.getConfig('cfgmotiondetectionactivate') == "yes":
					Debug.Display("Motion: Motion detection activated, copying default configuration file")
					shutil.copy(cfginitdir + "config/motion.thread.conf", cfgetcdir + "motion.run.source" + str(sources) + ".conf")
					FileManager.ReplaceTextInFile(cfgetcdir + "motion.run.source" + str(sources) + ".conf", "tmpcfgmotionvideodevice", c.getConfig('cfgmotiondetectiondevice'))
					FileManager.ReplaceTextInFile(cfgetcdir + "motion.run.source" + str(sources) + ".conf", "tmpcfgmotionwidth", c.getConfig('cfgmotiondetectiondevicewidth'))
					FileManager.ReplaceTextInFile(cfgetcdir + "motion.run.source" + str(sources) + ".conf", "tmpcfgmotionheight", c.getConfig('cfgmotiondetectiondeviceheight'))
					FileManager.ReplaceTextInFile(cfgetcdir + "motion.run.source" + str(sources) + ".conf", "tmpcfgmotionthreshold", c.getConfig('cfgmotiondetectionthreshold'))
					FileManager.ReplaceTextInFile(cfgetcdir + "motion.run.source" + str(sources) + ".conf", "tmpcfgmotiongap", c.getConfig('cfgmotiondetectionendevent'))
					FileManager.ReplaceTextInFile(cfgetcdir + "motion.run.source" + str(sources) + ".conf", "tmpcfgusername", g.getConfig('cfgsysuser'))
					FileManager.ReplaceTextInFile(cfgetcdir + "motion.run.source" + str(sources) + ".conf", "tmpcfgmotionsource", str(sources))
					if c.getConfig('cfgmotiondetectionmask') == "yes":
						f = open(cfgetcdir + "motion.run.source" + str(sources) + ".conf", 'a')
						f.write("mask_file " + c.getConfig('cfgwatermarkdir') + c.getConfig('cfgmotiondetectionmask') + "\n")
						f.write(" " + "\n")
						f.close()
					f = open(cfgetcdir + "motion.global.conf", 'a')
					f.write("thread " + cfgetcdir + "motion.run.source" + str(sources) + ".conf" + "\n")
					f.close()
		FileManager.ReplaceTextInFile(cfgetcdir + "motion.global.conf", "tmpcfgusername", g.getConfig('cfgsysuser'))
		shutil.copy(cfgetcdir + "motion.global.conf", cfgetcdir + "motion.run.global.conf")			

	elif CmdGlobalAction == "start":
		Debug.Display("Motion: Starting motion daemon")
		import shlex, subprocess
		Command = "/etc/init.d/motion stop"
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		Debug.Display(output)
		Debug.Display(errors)
		
		if os.path.isfile(cfgbindir + "motionstart.sh"):
			os.remove(cfgbindir + "motionstart.sh")
		#LD_PRELOAD=/usr/lib/libv4l/v4l1compat.so motion -c " + cfgetcdir + "motion.run.global.conf
		f = open(cfgbindir + "motionstart.sh", 'w')
		f.write("#!/bin/bash" + "\n")
		f.write("LD_PRELOAD=/usr/lib/libv4l/v4l1compat.so motion -c " + cfgetcdir + "motion.run.global.conf" + "\n")
		f.close()
		
		Command = "bash " + cfgbindir + "motionstart.sh"
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		Debug.Display(output)
		Debug.Display(errors)		

	elif CmdGlobalAction == "stop":
		Debug.Display("Motion: Stopping motion daemon")
		import shlex, subprocess
		Command = "/etc/init.d/motion stop"
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		Debug.Display(output)
		Debug.Display(errors)
		
if __name__ == "__main__":
	main(sys.argv[1:])






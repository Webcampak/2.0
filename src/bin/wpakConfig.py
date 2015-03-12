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

# This class is used to set or get values from configobj functions
class Config:
	def __init__(self, path):
		self.Path = path
		from configobj import ConfigObj
		self.Config = ConfigObj(self.Path)
		#print self.Path
#		try:
#			self.Config = ConfigObj(self.Path)
#			print "Chargement: Chargement fichier de configuration: " + CmdSourceConfig
#		except:
#			print "Erreur: Erreur lors du chargement du fichier de configuration: " + self.Path
#			sys.exit()

	# Function: getFullConfig
	# Description; Function used to get full configuration file
	# Return: configfile
	def getFullConfig(self):
		return self.Config

	# Function: getConfig
	# Description; Function used to get configuration settings
	## key: configuration key
	# Return: configuration value
	def getConfig(self, key):
		try:
			return self.Config[key]
		except:
			from configobj import ConfigObj
			ConfigPath, ConfigFile = self.Path.split('config')
			DefaultConfigFile = "../init/etc/config" + ConfigFile
			#print "Default Config File" + DefaultConfigFile		
			DefaultConfigFile = ''.join([letter for letter in DefaultConfigFile if not letter.isdigit()]) # It removes source number from config file name
			DefaultConfig = ConfigObj(DefaultConfigFile)
			try:
				self.Config[key] = DefaultConfig[key]
				self.Config.write()
			except:
				print("Error: Unable to add: " + key + " as new setting within config file")
			try:
				return DefaultConfig[key]	
			except:
				return "no"
		
	# Function: setConfig
	# Description; Function used to set configuration settings
	## key: configuration key
	## value: configuration value
	# Return: Nothing
	def setConfig(self, key, value):
		self.Config[key] = value
		#print "Ecriture desactivee: " + key + " = " + value
		self.Config.write()

	# Function: setSensor
	# Description; Function used to record sensor value, it differs from configuration settings by using subsections
	## section: sensors section (correspond to a capture)
	## key: sensor key (Temperature, Luminosity)
	## value: configuration value 
	# Return: Nothing
	def setSensor(self, section, key, value):
		if value == "" and key == "":
			self.Config[section] = {}
		else:
			self.Config[section][key] = value
		self.Config.write()

	# Function: getSensor
	# Description; Function used to get sensor value, it differs from configuration settings by using subsections
	## section: sensors section (correspond to a capture)
	## key: sensor key (Temperature, Luminosity)
	# Return: Nothing
	def getSensor(self, section, key):
		try:
			return self.Config[section][key]
		except: 
			return False

	# Function: getSensorFile
	# Description; Get all values of a sensor file
	# Return: An object containing all values
	def getSensorFile(self):
		try:
			return self.Config
		except: 
			return False
			
	# Function: setStat
	# Description; Function used to set stat values
	## key: configuration key
	## value: configuration value
	# Return: Nothing
	def setStat(self, key, value):
		self.Config[key] = value
		#print "Ecriture desactivee: " + key + " = " + value
		self.Config.write()
		
	# Function: getStat
	# Description; Function used to get stat values
	## key: configuration key
	# Return: configuration value
	def getStat(self, key):
		try:
			return self.Config[key]	
		except:
			return 0				


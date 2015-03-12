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

# Small class used to format date to be displayed by the system
class DateFormat:
	def __init__(self, c):
		self.C = c

	# Function: DateFormat
	# Description; Function used format a date to be displayed (i.e. inserted as a legend)
	## Cfgnow: Timestamp to be formatted
	# Return: Formated timestamp
	def DateFormat(self, Cfgnow):
		if self.C.getConfig('cfgimgdateformat') == "1":
			return " " + Cfgnow.strftime("%d/%m/%Y - %Hh%M")
		elif self.C.getConfig('cfgimgdateformat') == "2":
			return " " + Cfgnow.strftime("%d/%m/%Y")
		elif self.C.getConfig('cfgimgdateformat') == "3":
			return " " + Cfgnow.strftime("%Hh%M")
		elif self.C.getConfig('cfgimgdateformat') == "4":
			return " " + Cfgnow.strftime("%A %d %B %Y - %Hh%M")
		elif self.C.getConfig('cfgimgdateformat') == "5":
			return " " + Cfgnow.strftime("%d %B %Y - %Hh%M")
		elif self.C.getConfig('cfgimgdateformat') == "6": # US, 12h format
			return " " + Cfgnow.strftime("%m/%d/%Y - %Ih%M %p")
		elif self.C.getConfig('cfgimgdateformat') == "7": # US, 24h format
			return " " + Cfgnow.strftime("%m/%d/%Y - %Hh%M")			
		else:
			return ""

	def DateFormatVideo(self, Cfgnow, v):
		if v.getConfig('cfgvideopreimgdateformat') == "1":
			return " " + Cfgnow.strftime("%d/%m/%Y - %Hh%M")
		elif v.getConfig('cfgvideopreimgdateformat') == "2":
			return " " + Cfgnow.strftime("%d/%m/%Y")
		elif v.getConfig('cfgvideopreimgdateformat') == "3":
			return " " + Cfgnow.strftime("%Hh%M")
		elif v.getConfig('cfgvideopreimgdateformat') == "4":
			return " " + Cfgnow.strftime("%A %d %B %Y - %Hh%M")
		elif v.getConfig('cfgvideopreimgdateformat') == "5":
			return " " + Cfgnow.strftime("%d %B %Y - %Hh%M")
		elif v.getConfig('cfgvideopreimgdateformat') == "6": # US, 12h format
			return " " + Cfgnow.strftime("%m/%d/%Y - %Ih%M %p")
		elif v.getConfig('cfgvideopreimgdateformat') == "7": # US, 24h format
			return " " + Cfgnow.strftime("%m/%d/%Y - %Hh%M")				
		else:
			return ""


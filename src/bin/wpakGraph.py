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
from wpakConfig import Config

#This class is used to create graphs from Phidget sensors
class Graph:
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
		self.Cfgdispday = self.Cfgnow.strftime("%Y%m%d")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"
		
	# Function: CreateSensorBar
	# Description; This function is used to create a sensor bar to be added to a picture
	#	The function will create and store a template within cache directory,
	#		If this template exists it will be used
	#		If this template does not exist it is created from scratch (using lines and coordinates)
	# Return: Nothing, only create a graph file
	def CreateSensorBar(self, CurrentTemp, CurrentSensor, TargetDir, v):
		import shlex, subprocess
		if TargetDir == "":
			TargetDir = self.Cfgtmpdir
	
		if v != "":
			self.C = v

		for ListPhidgetSensors in range(1,int(self.G.getConfig('cfgphidgetsensortypenb')) + 1):
			if self.G.getConfig('cfgphidgetsensortype' + str(ListPhidgetSensors))[0] == self.C.getConfig('cfgphidgetsensor' + str(CurrentSensor))[0]:
				LegendStartValue = self.G.getConfig('cfgphidgetsensortype' + str(ListPhidgetSensors))[1]
				LegendEndValue = self.G.getConfig('cfgphidgetsensortype' + str(ListPhidgetSensors))[2]
				LegendDifference = float(LegendEndValue) - float(LegendStartValue)
				LegendStep = LegendDifference / 10
		

		if os.path.isfile(self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png") == False:
			self.FileManager.CheckDir(self.Cfgcachedir)
			
			# Creation of the background
			Command = "convert -size 652x100 xc:wheat " + self.Cfgcachedir + "canvas_init.png"
			args = shlex.split(Command)
			p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
			output, errors = p.communicate()

			# Applying a color to the background
			Command = "convert " + self.Cfgcachedir + "canvas_init.png  +level 60%,60%  +matte -bordercolor black -border 1x1 " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png"
			args = shlex.split(Command)
			p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
			output, errors = p.communicate()
			
			# Creation of a temporary background
			Command = "convert " + self.Cfgcachedir + "canvas_init.png -resize 602x50! +level 20%,20%  +matte -bordercolor black -border 1x1 " + self.Cfgcachedir + "canvas_tmp.png"
			args = shlex.split(Command)
			p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
			output, errors = p.communicate()
			
			# Creation of a thermometer to be added to the background
			Command = "composite -geometry +25+25 " + self.Cfgcachedir + "canvas_tmp.png " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png"
			args = shlex.split(Command)
			p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
			output, errors = p.communicate()

			# Positionnement des marqueurs
			Command = "composite -geometry +25+25 " + self.Cfgcachedir + "canvas_tmp.png " + self.Cfgcachedir + "canvas.png " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png"
			args = shlex.split(Command)
			p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
			output, errors = p.communicate()

			# Creation of a line for each degree
			for j in range(0, 100):
				xpos = (j * 6) + 25
				Command = "convert -stroke black -draw 'line " + str(xpos) + ",75 " + str(xpos) + ",80' " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png"
				args = shlex.split(Command)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()

			# Creation of a line for each 5 degrees
			for j in range(0, 21):
				xpos = (j * 6 * 5) + 25
				Command = "convert -stroke black -draw 'line " + str(xpos) + ",75 " + str(xpos) + ",85' " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png"
				args = shlex.split(Command)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
						
			# Adding degrees on the template
			for j in range(0, 11):
				#text = -30 + (j * 5)
				#xpos = 10 + (j * 6 * 5)
				text = float(LegendStartValue) + (j * float(LegendStep))
				xpos = 10 + (j * 6 * 5 * 2)
				if j > 5:
					xpos = xpos + 5
				if j > 4 and j < 8:
					xpos = xpos + 5
				mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "15", "-draw", "gravity " + "northwest" + " fill " + "white" + " text " + str(xpos) +",87" + " '" + str(text) + "'", self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png",  self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png"])
				mogrify_results = str(mogrify)

			mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "20", "-draw", "gravity " + "northwest" + " fill " + "white" + " text 5,5" + " '" + self.C.getConfig('cfgphidgetsensor' + str(CurrentSensor))[1] + "'", self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png",  self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png"])
			mogrify_results = str(mogrify)

		TempXPos = (float(CurrentTemp) - float(LegendStartValue)) * 602 / float(LegendDifference)
		Command = "convert " + self.Cfgcachedir + "canvas_init.png -resize " + str(TempXPos) + "x50! +matte -fx Green " + TargetDir + "canvas_ter.png"
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()	
		
		# Placing the thermometer in front of the template
		Command = "composite -geometry +26+26 " + TargetDir + "canvas_ter.png " + self.Cfgcachedir + "Sensor" + str(CurrentSensor) + "-S" + str(self.Cfgcurrentsource) +".png " + TargetDir + "Sensor" + str(CurrentSensor) + ".png"
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()

		mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "25", "-draw", "gravity " + "northwest" + " fill " + "white" + " text 30,40" + " '" + str(CurrentTemp) + "'", TargetDir + "Sensor" + str(CurrentSensor) + ".png",  TargetDir + "Sensor" + str(CurrentSensor) + ".png"])
		mogrify_results = str(mogrify)





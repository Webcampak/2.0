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

from wpakFileManager import FileManager

# Class used to manipulate pictures via ImageMagick tools
class ImageMagick:
	def __init__(self, path, g, debug):
		#gettext.install('webcampak')
		self.Path = path
		self.G = g
		self.Debug = debug

	# Function: Resize 
	# Description; Resize a picture
	## NewSize: New picture size
	## NewPath: Path of the modified picture
	## NewFilename: Filename of the modified picture
	# Return: Nothing
	def Resize(self, NewSize, NewPath, NewFilename):
		if NewSize != "no":
			if os.path.isfile(self.G.getConfig('cfgmagickdir') + "convert"):
				TmpDirName = str(time.time())			
				FileManager.CheckDir(NewPath + TmpDirName + "/")
				self.Debug.Display(_("Imagemagick: Resize: %(NewSize)s to file: %(NewSizeFile)s") % {'NewSize': NewSize, 'NewSizeFile': NewPath + NewFilename} )
				convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", self.Path, "-scale", NewSize + '!', NewPath + TmpDirName + "/" + NewFilename])
				convert_results = str(convert)
				shutil.move(NewPath + TmpDirName + "/" + NewFilename, NewPath + NewFilename)
				shutil.rmtree(NewPath + TmpDirName + "/")
			else:
				self.Debug.Display(_("Error: Convert binary (ImageMagick) not found"))
				sys.exit()

	# Function: Crop 
	# Description; Crop a picture
	## Width: Width of the area to be kept
	## Height: Height of the area to be kept
	## XPos: X coordinate of the top-left corner of the cropped area from the top-left corner of the picture
	## YPos: Y coordinate of the top-left corner of the cropped area from the top-left corner of the picture
	## NewPath: New File
	# Return: Nothing
	def Crop(self, Width, Height, XPos, YPos, NewPath):
		if os.path.isfile(self.G.getConfig('cfgmagickdir') + "convert"):
			FileManager.CheckDir(NewPath)
			self.Debug.Display(_("Imagemagick: Crop: Zone size: %(Width)sx%(Height)s Position: x: %(XPos)s y: %(YPos)s") % {'Width': Width, 'Height': Height, 'XPos': XPos, 'YPos': YPos} )
			convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", self.Path, "-crop", Width + 'x' + Height + '+' + XPos + '+' + YPos + '!', NewPath])
			convert_results = str(convert)
		else:
			self.Debug.Display(_("Error: Convert binary (ImageMagick) not found"))
			sys.exit()

	# Function: Rotate 
	# Description; Rotate a picture
	## Angle: Angle of the rotation
	## NewPath: New File
	# Return: Nothing
	def Rotate(self, Angle, NewPath):
		if os.path.isfile(self.G.getConfig('cfgmagickdir') + "convert"):
			FileManager.CheckDir(NewPath)
			self.Debug.Display(_("Imagemagick: Rotate: Angle: %(Angle)s degrees") % {'Angle': Angle} )
			convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", self.Path, "-rotate", Angle, NewPath])
			convert_results = str(convert)
		else:
			self.Debug.Display(_("Error: Convert binary (ImageMagick) not found"))
			sys.exit()

	# Function: Border 
	# Description; Add a border to an image
	# convert rose: -bordercolor #ffffff -border 10%x10%  border_percent.jpg
	## Color: Color of the border
	## HBorder: Horizontal border width (in px or %)
	## VBorder: Vertical border width (in px or %)
	## NewPath: New File
	# Return: Nothing
	def Border(self, Color, HBorder, VBorder, NewPath):
		if os.path.isfile(self.G.getConfig('cfgmagickdir') + "convert"):
			FileManager.CheckDir(NewPath)
			self.Debug.Display(_("Imagemagick: Add border: Color: %(Color)s Width: %(BorderWidth)s") % {'Color': Color, 'BorderWidth': HBorder + ":" + VBorder} )
			convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", self.Path, "-bordercolor", Color, "-border", HBorder + 'x' + VBorder, NewPath])
			convert_results = str(convert)
		else:
			self.Debug.Display(_("Error: Convert binary (ImageMagick) not found"))
			sys.exit()
			
	# Function: Watermark 
	# Description; Add a watermark to a picture
	## XPos: X coordinate of the top-left corner of the watermark from the top-left corner of the picture
	## YPos: Y coordinate of the top-left corner of the cropped area from the top-left corner of the picture
	## Watermarkfile: Watermark file
	## NewPath: New File
	# Return: Nothing
	def Watermark(self, XPos, YPos, Dissolve, Watermarkfile, NewPath):
		if os.path.isfile(self.G.getConfig('cfgmagickdir') + "composite"):
			FileManager.CheckDir(NewPath)
			self.Debug.Display(_("Imagemagick: Watermark: %(Watermarkfile)s Position: x: %(XPos)s y: %(YPos)s Transparency: %(Dissolve)s percent") % {'Watermarkfile': Watermarkfile, 'XPos': XPos, 'YPos': YPos, 'Dissolve': Dissolve} )
			composite = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "composite", "-dissolve", Dissolve + '%', "-geometry", '+' + XPos + '+' + YPos, Watermarkfile, self.Path, NewPath])
			composite_results = str(composite)
		else:
			self.Debug.Display(_("Error: Composite binary (ImageMagick) not found"))
			sys.exit()

	# Function: Text 
	# Description; Add some text to a picture
	# Return: Nothing
	def Text(self, Cfgimgtextfont, Cfgimgtextsize, Cfgimgtextgravity, Cfgimgtextbasecolor, Cfgimgtextbaseposition, Cfgimgtext, Cfgdisplaydate, Cfgimgtextovercolor, Cfgimgtextoverposition, NewPath):
		if os.path.isfile(self.G.getConfig('cfgmagickdir') + "convert"):
			FileManager.CheckDir(NewPath)
			self.Debug.Display(_("Imagemagick: Text: %(Text)s Font: %(Cfgimgtextfont)s Gravity: %(Cfgimgtextgravity)s") % {'Text': Cfgimgtext + Cfgdisplaydate, 'Cfgimgtextfont': Cfgimgtextfont, 'Cfgimgtextgravity': Cfgimgtextgravity} )
			mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", Cfgimgtextfont, "-pointsize", Cfgimgtextsize, "-draw", "gravity " + Cfgimgtextgravity + " fill " + Cfgimgtextbasecolor + " text " + Cfgimgtextbaseposition + " '" + Cfgimgtext + Cfgdisplaydate + "' fill " + Cfgimgtextovercolor + " text " + Cfgimgtextoverposition + " '" + Cfgimgtext + Cfgdisplaydate + "' ", self.Path,  NewPath])
			mogrify_results = str(mogrify)
		else:
			self.Debug.Display(_("Error: Composite binary (ImageMagick) not found"))
			sys.exit()

	# Function: Sketch 
	# Description; Add a sketch effect to a picture
	# Return: Nothing			
	def Sketch(self, TargetDir, TargetFile):
		if os.path.isfile(TargetDir + "pencil_tile.gif") == False:
			Command = self.G.getConfig('cfgmagickdir') + "convert -size 640x480 xc: +noise Random  -virtual-pixel tile -motion-blur 0x20+135 -charcoal 1 -resize 50% " + TargetDir + "pencil_tile.gif"
			import shlex, subprocess
			args = shlex.split(Command)
			p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
			output, errors = p.communicate()		  
		Command = self.G.getConfig('cfgmagickdir') + "convert " + self.Path + " -colorspace gray \( +clone -tile " + TargetDir + "pencil_tile.gif -draw \"color 0,0 reset\" +clone +swap -compose color_dodge -composite \) -fx 'u*.2+v*.8' " + TargetDir + TargetFile
		import shlex, subprocess
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()	

	# Function: TiltShift 
	# Description; Add a tiltshift effect to a picture
	# Return: Nothing	
	def TiltShift(self, TargetDir, TargetFile):    
		Command = self.G.getConfig('cfgmagickdir') + "convert " + self.Path + " -sigmoidal-contrast 15x30% ( +clone -sparse-color Barycentric '0,0 black 0,%[fx:h-1] gray80' -solarize 50% -level 50%,0 )  -compose Blur -set option:compose:args 15 -composite " + TargetDir + TargetFile
		import shlex, subprocess
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()

	# Function: Charcoal 
	# Description; Add a charcoal effect to a picture
	# Return: Nothing
	def Charcoal(self, TargetDir, TargetFile):    
		Command = self.G.getConfig('cfgmagickdir') + "convert " + self.Path + " -charcoal 5 " + TargetDir + TargetFile
		import shlex, subprocess
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()

	# Function: ColorIn 
	# Description; Add a colorin effect to a picture
	# Return: Nothing
	def ColorIn(self, TargetDir, TargetFile):    
		Command = self.G.getConfig('cfgmagickdir') + "convert " + self.Path + " -edge 1 -negate -normalize -colorspace Gray -blur 0x.5 -contrast-stretch 0x50% " + TargetDir + TargetFile
		import shlex, subprocess
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()


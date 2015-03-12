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
import numpy as np
import math
import collections

from wpakDateFormat import DateFormat
from wpakConfig import Config
from wpakVideoManagement import VideoManagement
from wpakVideoDeflicker import VideoDeflicker
from wpakImageMagick import ImageMagick
from wpakFTPClass import FTPClass
from wpakGraph import Graph

from PIL import Image, ImageStat
from itertools import tee, islice, chain, izip

class Video: 
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, cmdType, FileManager, ErrorManagement, EmailClass, CmdVideoConfig):
		#gettext.install('webcampak')
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.ErrorManagement = ErrorManagement
		self.EmailClass = EmailClass
		self.FileManager = FileManager
		self.CmdType = cmdType
		self.CmdVideoConfig = CmdVideoConfig
		self.Cfglogdir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfglogdir')
		self.Cfglogfile = cmdType + "-" + self.Cfgcurrentsource + ".log"		
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')
		self.Cfglivedir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfglivedir')
		self.Cfgvideodir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgvideodir')
		self.Cfgpictdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgpictdir')
		self.Cfgselfaudiodir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/resources/audio/"
		self.Cfgselfwatermarkdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/resources/watermark/"		
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.Cfgwatermarkdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgwatermarkdir')
		self.Cfgaudiodir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgaudiodir')
		self.Cfgdispdate = self.Cfgnow.strftime("%Y%m%d%H%M%S")
		self.Cfgdispday = self.Cfgnow.strftime("%Y%m%d")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"
		self.Cfginitdir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfginitdir')
		self.Cfgnowtimestamp = cfgnow.strftime("%s")
		self.DateFormat = DateFormat(c)
		self.VideoManagement = VideoManagement(c, self.Cfgcurrentsource, g, debug, cfgnow, self.DateFormat, self.FileManager, self.CmdType)
		self.VideoDeflicker = VideoDeflicker(c, self.Cfgcurrentsource, g, debug, cfgnow, self.DateFormat, self.FileManager, self.CmdType)		
		self.Graph = Graph(c, self.Cfgcurrentsource, g, debug, cfgnow, cmdType, self.FileManager)
		self.Cfglocalemessagesdir = self.G.getConfig('cfgbasedir') + "locale/" + self.C.getConfig('cfgsourcelanguage') + "/messages/"

	# Function: SensorFindNearest
	# Description; Wihin sensors.txt file, find the closest date in sensor values
	# array: array of dates
	# value: current date
	# Return: closest date
	def SensorFindNearest(self, array,value):
		idx=(np.abs(array-value)).argmin()
		return array[idx]

	# Function: PreviousAndNext
	# Description; In an itertable (list of pictures), return previous, current and next values
	# itertable: an itertable
	# Return: previous, current and next
	def PreviousAndNext(self, itertable):
		prevs, items, nexts = tee(itertable, 3)
		prevs = chain([None], prevs)
		nexts = chain(islice(nexts, 1, None), [None])
		return izip(prevs, items, nexts)			

	# Function: CompareImages
	# Description; This function is used to compare a picture with the previously copied picture, if both pictures are too similar the new picture is not copied.
	# - 1: if pictures are different
	# - 0: if pictures are too similar
	def CompareImages(self, cfgnow, SourcePictureDir, TargetDir, TargetFile):
		if v.getConfig('cfgfilterwatermarkfile') != "":
			import shlex, subprocess
			#composite -gravity center libpuzzle-mask.png 20120123165602.jpg 20120123165602-puz.jpg
			if os.path.isfile(self.Cfgselfwatermarkdir + v.getConfig("cfgfilterwatermarkfile")):
				composite = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "composite", "-gravity", "center", self.Cfgselfwatermarkdir + v.getConfig('cfgfilterwatermarkfile'), SourcePictureDir + TargetFile, TargetDir + "filterB.jpg"])
				composite_results = str(composite)				
			elif os.path.isfile(self.Cfgwatermarkdir + v.getConfig("cfgfilterwatermarkfile")):
				composite = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "composite", "-gravity", "center", self.Cfgwatermarkdir + v.getConfig('cfgfilterwatermarkfile'), SourcePictureDir + TargetFile, TargetDir + "filterB.jpg"])
				composite_results = str(composite)
		else:
			shutil.copy(SourcePictureDir + TargetFile, TargetDir + "filterB.jpg")
		if os.path.isfile(TargetDir + "filterA.jpg"):
			#puzzle-diff 20120123073003-puz.jpg 20120123073202-puz.jpg
			Command = "puzzle-diff " + TargetDir + "filterA.jpg " + TargetDir + "filterB.jpg"
			import shlex, subprocess
			args = shlex.split(Command)
			p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
			output, errors = p.communicate()
			self.Debug.Display(errors)
			PuzzleDiff = output.strip()
			if float(PuzzleDiff) < float(v.getConfig('cfgfiltervalue')):
				self.Debug.Display(_("Video: Filter: Difference with previous file: %(PuzzleDiff)s - Config: %(MaxDiff)s -- Skipping file") % {'PuzzleDiff': PuzzleDiff, 'MaxDiff': v.getConfig('cfgfiltervalue')} )				
				os.remove(TargetDir + "filterB.jpg")
				return 0
			else:
				self.Debug.Display(_("Video: Filter: Difference with previous file: %(PuzzleDiff)s - Config: %(MaxDiff)s") % {'PuzzleDiff': PuzzleDiff, 'MaxDiff': v.getConfig('cfgfiltervalue')} )								
				shutil.copy(TargetDir + "filterB.jpg", TargetDir + "filterA.jpg")
				os.remove(TargetDir + "filterB.jpg")
				return 1							
		else:
			shutil.copy(TargetDir + "filterB.jpg", TargetDir + "filterA.jpg")
			os.remove(TargetDir + "filterB.jpg")
			return 1
		
	# Function: ProcessImages
	# Description; This function is used to prepare picture before the video creation
	#	- Apply or not an effect
	#	- Add a watermark to the picture
	#	- Add text
	#	- Add temperature and/or luminosity
	#	- Resize picture
	# Return: Nothing
	def ProcessImages(self, i, cfgnow, TargetDir, TargetFile):
		f = TargetFile
		#FileDate = (int(f[0] + f[1] + f[2] + f[3]), int(f[4] + f[5]), int(f[6] + f[7]), int(f[8] + f[9]), int(f[10] + f[11]), int(f[12] + f[13]), 0, 0, 0)
		#FileTimeStamp = int(time.mktime(FileDate))
		cfgnow = datetime.datetime(*time.strptime(f[0] + f[1] + f[2] + f[3] + "/" + f[4] + f[5] + "/" + f[6] + f[7] + "/" + f[8] + f[9] + "/" + f[10] + f[11] + "/" + f[12] + f[13], "%Y/%m/%d/%H/%M/%S")[0:5])
		#cfgnow = datetime.datetime.fromtimestamp(FileTimeStamp)
		cfgdispday = cfgnow.strftime("%Y%m%d")
		cfgdispdate = cfgnow.strftime("%Y%m%d%H%M%S")
		cfgfilename = cfgdispdate + ".jpg"

		if v.getConfig('cfgvideoeffect') == "sketch":
			self.Debug.Display(_("Video: ImageMagick: Adding sketch effect to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Sketch(TargetDir, TargetFile)	
		elif v.getConfig('cfgvideoeffect') == "tiltshift":
			self.Debug.Display(_("Video: ImageMagick: Adding tiltshift effect to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.TiltShift(TargetDir, TargetFile)	
		elif v.getConfig('cfgvideoeffect') == "charcoal":
			self.Debug.Display(_("Video: ImageMagick: Adding charcoal effect to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Charcoal(TargetDir, TargetFile)	
		elif v.getConfig('cfgvideoeffect') == "colorin":
			self.Debug.Display(_("Video: ImageMagick: Adding colorin effect to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.ColorIn(TargetDir, TargetFile)	

		if v.getConfig('cfgwatermarkactivate') == "yes":
			self.Debug.Display(_("Video: ImageMagick: Adding Watermark to: %(File)s ") % {'File': TargetDir + TargetFile} )
			if os.path.isfile(self.Cfgselfwatermarkdir + v.getConfig("cfgwatermarkfile")):
				i.Watermark(v.getConfig('cfgwatermarkpositionx'), v.getConfig('cfgwatermarkpositiony'), v.getConfig('cfgwatermarkdissolve'), self.Cfgselfwatermarkdir + v.getConfig('cfgwatermarkfile'), TargetDir + TargetFile)				
			elif os.path.isfile(self.Cfgwatermarkdir + v.getConfig("cfgwatermarkfile")):
				i.Watermark(v.getConfig('cfgwatermarkpositionx'), v.getConfig('cfgwatermarkpositiony'), v.getConfig('cfgwatermarkdissolve'), self.Cfgwatermarkdir + v.getConfig('cfgwatermarkfile'), TargetDir + TargetFile)	

		if v.getConfig('cfgvideopreimagemagicktxt') == "yes":	
			self.Debug.Display(_("Video: ImageMagick: Adding Legend to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Text(v.getConfig('cfgvideopreimgtextfont'), v.getConfig('cfgvideopreimgtextsize'), v.getConfig('cfgvideopreimgtextgravity'), v.getConfig('cfgvideopreimgtextbasecolor'), v.getConfig('cfgvideopreimgtextbaseposition'), v.getConfig('cfgvideopreimgtext'), self.DateFormat.DateFormatVideo(cfgnow, v), v.getConfig('cfgvideopreimgtextovercolor'), v.getConfig('cfgvideopreimgtextoverposition'), TargetDir + TargetFile)


		# NEW SECTION TO MANAGE GRAPHS
#		for ListSourceSensors in range(1,int(v.getConfig('cfgphidgetsensornb')) + 1):
#			if v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0] != "no" and v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[3] != "no":
#				self.Debug.Display(_("ImageMagick: Processing Sensor %(SensorNb)s") % {'SensorNb': ListSourceSensors})
#				SensorsHistory = Config(self.Cfgpictdir + cfgdispday + "/" + self.G.getConfig('cfgphidgetcapturefile'))
#				CurrentValue = SensorsHistory.getSensor(cfgdispdate, v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0])
#				if CurrentValue == False:
#					SensorTable = []
#					for capturetime in SensorsHistory.getFullConfig():
#						SensorTable.append(int(capturetime))
#					SensorTable = np.array(SensorTable) # Convert Python array to Numpy array
#					if len(SensorTable) > 0:
#						SensorNearestValue = self.SensorFindNearest(SensorTable,int(cfgdispdate))
#						self.Debug.Display(_("ImageMagick: Sensor: Date %(cfgdispdate)s not found in sensor file, closest date is %(SensorNearestValue)s") % {'cfgdispdate': cfgdispdate, 'SensorNearestValue': str(SensorNearestValue)})					
						#print "Value:" + str(cfgdispdate) + " - closest:" + str(SensorNearestValue)
#						CurrentValue = SensorsHistory.getSensor(str(SensorNearestValue), v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0])
#				if CurrentValue != False:
#					self.Debug.Display(_("ImageMagick: Sensor: Insert %(SensorType)s - Value: %(CurrentValue)s") % {'SensorType': v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[0], 'CurrentValue': str(CurrentValue)})
#					self.Graph.CreateSensorBar(CurrentValue, ListSourceSensors, "", v)
#					if v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[3] != "no":
#						import shlex, subprocess
#						Command = "convert " + self.Cfgtmpdir + "Sensor" + str(ListSourceSensors) + ".png -resize " + v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[4] + " " + self.Cfgtmpdir + "Sensor" + str(ListSourceSensors) + ".png"
#						args = shlex.split(Command)
#						p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
#						output, errors = p.communicate()
					#i.Watermark(v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[6], v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[7], v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[5], self.Cfgtmpdir + "Sensor" + str(ListSourceSensors) + ".png", self.Cfgtmpdir + cfgfilename)			  
#					i.Watermark(v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[6], v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[7], v.getConfig('cfgphidgetsensor' + str(ListSourceSensors))[5], self.Cfgtmpdir + "Sensor" + str(ListSourceSensors) + ".png", TargetDir + TargetFile)			  
			#else:
			#	self.Debug.Display(_("ImageMagick: Sensor %(SensorNb)s disabled") % {'SensorNb': ListSourceSensors})


		if v.getConfig('cfgvideopreresize') != "no":
			self.Debug.Display(_("Video: ImageMagick: Resizing: %(File)s to %(Size)s") % {'File': TargetDir + TargetFile, 'Size': v.getConfig('cfgvideopreresizeres')} )
			i.Resize(v.getConfig('cfgvideopreresizeres'), TargetDir, TargetFile)


	# Function: ProcessImagesPost
	# Description; This function is used to prepare picture for post production
	#	- Prepare thumbnail and insert it just before applying watermark
	#	- Crop picture
	#	- Resize picture
	#	- Insert video effect (sketch, tiltshift, charcoal, colorin
	#	- Add watermark
	#	- Add text
	#	- Resize picture
	# Return: Nothing
	def ProcessImagesPost(self, i, cfgnow, TargetDir, TargetFile):
		f = TargetFile
		cfgnow = datetime.datetime(*time.strptime(f[0] + f[1] + f[2] + f[3] + "/" + f[4] + f[5] + "/" + f[6] + f[7] + "/" + f[8] + f[9] + "/" + f[10] + f[11] + "/" + f[12] + f[13], "%Y/%m/%d/%H/%M/%S")[0:5])
		cfgdispday = cfgnow.strftime("%Y%m%d")
		cfgdispdate = cfgnow.strftime("%Y%m%d%H%M%S")
		cfgfilename = cfgdispdate + ".jpg"

		if v.getConfig('cfgrotateactivate') == "yes":	
			self.Debug.Display(_("Video: ImageMagick: Rotating picture: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Rotate(v.getConfig('cfgrotateangle'), TargetDir + TargetFile)

		if v.getConfig('cfgthumbnailactivate') == "yes" and v.getConfig('cfgtransitionactivate') != "yes":	
			self.Debug.Display(_("Video: Thumbnail: Create thumbnail of picture: %(File)s ") % {'File': TargetDir + TargetFile} )
			# Extraction of a thumbnail
			i.Crop(v.getConfig('cfgthumbnailsrccropsizewidth'), v.getConfig('cfgthumbnailsrccropsizeheight'), v.getConfig('cfgthumbnailsrccropxpos'), v.getConfig('cfgthumbnailsrccropypos'), TargetDir + "thumbnail.jpg")
			thumb = ImageMagick(TargetDir + "thumbnail.jpg", self.G, self.Debug)
			thumb.Resize(v.getConfig('cfgthumbnaildstsizewidth') + "x" + v.getConfig('cfgthumbnaildstsizeheight'), TargetDir, "thumbnail.jpg")
			if v.getConfig('cfgthumbnailborder') == "yes":	
				thumb.Border("#909090", "5", "5", TargetDir + "thumbnail.jpg")
			
		if v.getConfig('cfgtransitionactivate') != "yes" and v.getConfig('cfgcropactivate') == "yes":	
			self.Debug.Display(_("Video: ImageMagick: Croping picture: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Crop(v.getConfig('cfgcropsizewidth'), v.getConfig('cfgcropsizeheight'), v.getConfig('cfgcropxpos'), v.getConfig('cfgcropypos'), TargetDir + TargetFile)

		if v.getConfig('cfgvideosizeactivate') == "yes":	
			self.Debug.Display(_("Video: ImageMagick: Resizing: %(File)s to %(Size)s") % {'File': TargetDir + TargetFile, 'Size': v.getConfig('cfgvideopreresizeres')} )
			i.Resize(v.getConfig('cfgvideosizewidth') + "x" + v.getConfig('cfgvideosizeheight'), TargetDir, TargetFile)

		if v.getConfig('cfgvideoeffect') == "sketch":
			self.Debug.Display(_("Video: ImageMagick: Adding sketch effect to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Sketch(TargetDir, TargetFile)	
		elif v.getConfig('cfgvideoeffect') == "tiltshift":
			self.Debug.Display(_("Video: ImageMagick: Adding tiltshift effect to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.TiltShift(TargetDir, TargetFile)	
		elif v.getConfig('cfgvideoeffect') == "charcoal":
			self.Debug.Display(_("Video: ImageMagick: Adding charcoal effect to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Charcoal(TargetDir, TargetFile)	
		elif v.getConfig('cfgvideoeffect') == "colorin":
			self.Debug.Display(_("Video: ImageMagick: Adding colorin effect to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.ColorIn(TargetDir, TargetFile)	

		if v.getConfig('cfgthumbnailactivate') == "yes":
			self.Debug.Display(_("Video: Thumbnail: Insert thumbnail into picture: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Watermark(v.getConfig('cfgthumbnaildstxpos'), v.getConfig('cfgthumbnaildstypos'), "100", TargetDir + "thumbnail.jpg", TargetDir + TargetFile)	
			os.remove(TargetDir + "thumbnail.jpg")			

		if v.getConfig('cfgwatermarkactivate') == "yes":
			self.Debug.Display(_("Video: ImageMagick: Adding Watermark to: %(File)s ") % {'File': TargetDir + TargetFile} )
			if os.path.isfile(self.Cfgselfwatermarkdir + v.getConfig("cfgwatermarkfile")):
				i.Watermark(v.getConfig('cfgwatermarkpositionx'), v.getConfig('cfgwatermarkpositiony'), v.getConfig('cfgwatermarkdissolve'), self.Cfgselfwatermarkdir + v.getConfig('cfgwatermarkfile'), TargetDir + TargetFile)	
			elif os.path.isfile(self.Cfgwatermarkdir + v.getConfig("cfgwatermarkfile")):
				i.Watermark(v.getConfig('cfgwatermarkpositionx'), v.getConfig('cfgwatermarkpositiony'), v.getConfig('cfgwatermarkdissolve'), self.Cfgwatermarkdir + v.getConfig('cfgwatermarkfile'), TargetDir + TargetFile)	
					
		if v.getConfig('cfgvideopreimagemagicktxt') == "yes":	
			self.Debug.Display(_("Video: ImageMagick: Adding Legend to: %(File)s ") % {'File': TargetDir + TargetFile} )
			i.Text(v.getConfig('cfgvideopreimgtextfont'), v.getConfig('cfgvideopreimgtextsize'), v.getConfig('cfgvideopreimgtextgravity'), v.getConfig('cfgvideopreimgtextbasecolor'), v.getConfig('cfgvideopreimgtextbaseposition'), v.getConfig('cfgvideopreimgtext'), self.DateFormat.DateFormatVideo(cfgnow, v), v.getConfig('cfgvideopreimgtextovercolor'), v.getConfig('cfgvideopreimgtextoverposition'), TargetDir + TargetFile)

	# Function: CreateVideo
	# Description; This function create the video using mencoder
	# Return: Nothing
	def CreateVideo(self, VideoSourceFiles, VideoDestinationFile, VideoLogFile, VideoFPS, VideoCropScaleOptions, VideoPass, VideoBitrate):
		self.Debug.Display(_("Mencoder: Video compression, pass: %(Pass)s") % {'Pass': VideoPass} )
		self.Debug.Display(_("Mencoder: Source: %(VideoSourceFiles)s") % {'VideoSourceFiles': VideoSourceFiles} )
		self.Debug.Display(_("Mencoder: Destination: %(VideoDestinationFile)s") % {'VideoDestinationFile': VideoDestinationFile} )
		import shlex, subprocess
		Command = 'mencoder "mf://' + VideoSourceFiles + '" -mf fps=' + VideoFPS + ' ' + VideoCropScaleOptions + ' -ovc x264 -x264encopts pass=' + VideoPass + ':bitrate=' + VideoBitrate + ':subq=6:partitions=all:8x8dct:me=umh:frameref=5:bframes=3:b_pyramid=normal:weight_b -passlogfile ' + VideoLogFile + ' -o ' + VideoDestinationFile
		self.Debug.Display(Command)
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		self.Debug.Display(output)
		self.Debug.Display(errors)

	# Function: YoutubeUpload
	# Description; This function upload the video to Youtube
	# Return: Nothing
	def YoutubeUpload(self, TargetVideoDir, TargetVideoFilename, TargetCategory):
		import shlex, subprocess
		Command = "google youtube post --category " + TargetCategory + " " +  TargetVideoDir + TargetVideoFilename
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		self.Debug.Display(output)
		self.Debug.Display(errors)		

	# Function: CreateMP4
	# Description; This function created a MP4 video from the larger video encoded and create a JPG thumbnail from this video
	#	Thumbnail is useful for flash player preview
	# Return: Nothing
	def CreateMP4(self, TargetVideoDir, TargetVideoFilename):
		import shlex, subprocess
		self.Debug.Display(_("Video: Flash: Creation of the MP4 video file: %(FlashFile)s") % {'FlashFile': TargetVideoDir + TargetVideoFilename + ".mp4"} )

#> ffmpeg -i input -pass 1 -c:v libx264 -preset medium -profile:v \
#> baseline -b:v 300k -r 30000/1001 -vf scale=480:-1 -f mp4 -y /dev/null \
#> && ffmpeg -i input -pass 2 -c:v libx264 -preset medium -profile:v \
#> baseline -b:v 300k -r 30000/1001 -vf scale=480:-1 -c:a aac -strict \
#> experimental -b:a 192k -ar 48000 output.mp4		
		
#		Command = "ffmpeg -y -i " + TargetVideoDir + TargetVideoFilename + " -vcodec libx264 -b 2000k -g 300 -bf 3 -refs 6 -b_strategy 1 -coder 1 -qmin 10 -qmax 51 -sc_threshold 40 -flags +loop -cmp +chroma -me_range 16 -me_method umh -subq 7 -i_qfactor 0.71 -qcomp 0.6 -qdiff 4 -directpred 3 -flags2 +dct8x8+wpred+bpyramid+mixed_refs -trellis 1 -partitions +parti8x8+parti4x4+partp8x8+partp4x4+partb8x8 -acodec copy " + TargetVideoDir + TargetVideoFilename + ".mp4 "
		Command = "avconv -y -i " + TargetVideoDir + TargetVideoFilename + " -c:v libx264 -preset medium -c:a copy " + TargetVideoDir + TargetVideoFilename + ".mp4 "
#		Command = "avconv -y -i " + TargetVideoDir + TargetVideoFilename + " -c:v h264 -preset medium -c:a copy " + TargetVideoDir + TargetVideoFilename + ".mp4 "
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		self.Debug.Display(output)
		self.Debug.Display(errors)
		
		shutil.copy(TargetVideoDir + TargetVideoFilename + ".mp4", TargetVideoDir + TargetVideoFilename + ".mp4.bak")
		
		self.Debug.Display(_("Video: Flash: Inserting markers on MP4 video file: %(FlashFile)s") % {'FlashFile': TargetVideoDir + TargetVideoFilename + ".mp4"} )
		Command = "MP4Box -inter 500 " + TargetVideoDir + TargetVideoFilename + ".mp4 "
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		self.Debug.Display(output)
		self.Debug.Display(errors)
		if os.path.isfile(TargetVideoDir + TargetVideoFilename + ".mp4"):	
			if os.path.getsize(TargetVideoDir + TargetVideoFilename + ".mp4") > 500000:
				self.Debug.Display(_("Video: Flash: Proper file size: %(FlashFile)s") % {'FlashFile': TargetVideoDir + TargetVideoFilename + ".mp4"} )
				os.remove(TargetVideoDir + TargetVideoFilename + ".mp4.bak")
		else :
			self.Debug.Display(_("Video: Flash: Invalid file size: %(FlashFile)s") % {'FlashFile': TargetVideoDir + TargetVideoFilename + ".mp4"} )
			shutil.move(TargetVideoDir + TargetVideoFilename + ".mp4.bak", TargetVideoDir + TargetVideoFilename + ".mp4")
		
		self.Debug.Display(_("Video: Flash: Creation of a preview pictures, located 2 seconds from the beginning of the video"))
		Command = "ffmpeg -itsoffset -2 -i " + TargetVideoDir + TargetVideoFilename + " -vcodec mjpeg -vframes 1 -an -f rawvideo " + TargetVideoDir + TargetVideoFilename + ".jpg "
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()
		self.Debug.Display(output)
		self.Debug.Display(errors)		
		if os.path.getsize(TargetVideoDir + TargetVideoFilename + ".jpg") > 20000:		
			self.Debug.Display(_("Video: Flash: Preview successfully created"))
		else:
			self.Debug.Display(_("Video: Flash: Preview failed to be created, trying to create a new one located 2 seconds from the beginning of the video"))
			if os.path.isfile(TargetVideoDir + TargetVideoFilename + ".jpg"):
				os.remove(TargetVideoDir + TargetVideoFilename + ".jpg")
			Command = "ffmpeg -itsoffset -7 -i " + TargetVideoDir + TargetVideoFilename + " -vcodec mjpeg -vframes 1 -an -f rawvideo " + TargetVideoDir + TargetVideoFilename + ".jpg " 
			args = shlex.split(Command)
			p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
			output, errors = p.communicate()
			self.Debug.Display(output)
			self.Debug.Display(errors)			


	# Function: AddAudio
	# Description; This function add an audio stream to a video file
	#	This function is also able to manage playlists containing a list of mp3 files (one per line)
	# Return: Nothing
	def AddAudio(self, AudioDir, AudioFile, TargetVideoDir, TargetVideoFilename):
		import shlex, subprocess
		if AudioFile == "playlist.m3u":
			self.Debug.Display(_("Video: Audio: Analyzing the playlist"))
			JoinMP3Files = ""
			PlaylistScan = open(AudioDir + AudioFile,'r')
			for lines in PlaylistScan:
				JoinMP3Files = JoinMP3Files + " " + AudioDir + lines

					
			if JoinMP3Files != "":
				self.Debug.Display(_("Video: Audio: Creation of the audio file"))
				Command = "mpgjoin -f --force " + JoinMP3Files + " -o " + AudioDir + "playlist.mp3 "
				print(Command)
				args = shlex.split(Command)
				p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
				output, errors = p.communicate()
				self.Debug.Display(output)
				self.Debug.Display(errors)					
				if os.path.isfile(AudioDir + "playlist.mp3"):
					self.Debug.Display(_("Video: Audio: Audiofile successfully created"))
					AudioFile = "playlist.mp3"
				else:
					self.Debug.Display(_("Video: Audio: Failed to create the audio file"))  
		self.Debug.Display(_("Video: Audio: Inserting the audio track onto the video"))  
		Command = "mencoder -oac copy -ovc copy -audiofile " + AudioDir + AudioFile + " " +  TargetVideoDir + TargetVideoFilename + " -o " + TargetVideoDir + TargetVideoFilename + ".tmp >> " + self.Cfglogdir + self.Cfglogfile
		args = shlex.split(Command)
		p = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
		output, errors = p.communicate()		
		shutil.move(TargetVideoDir + TargetVideoFilename + ".tmp", TargetVideoDir + TargetVideoFilename)

	# Function: Main
	# Description; This the main function used to create video
	#	This function will:
	#	- Copy files to a temporary directory (different name if it's a custom or daily video creation
	#	- Apply effects to each pictures
	#	- Prepare and create video
	#	- Add audio
	#	- Create MP4
	# 	- Upload via FTP
	#	- Upload to Youtube
	# Return: Nothing
	def Main(self):
		global v
		CreationError = True
		InitTagetVideoFilename = ""
		if self.CmdType == "video":
			self.Debug.Display(_("Video: Loading video configuration file"))
			if self.CmdVideoConfig != "" and os.path.isfile(self.CmdVideoConfig):
				v = Config(self.CmdVideoConfig)
			elif os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-video.cfg"):
				v = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-video.cfg")
			else:
				if os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-source-video.cfg"):
					self.FileManager.CheckDir("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source-video.cfg")
					shutil.copy("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-source-video.cfg", "/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-video.cfg")
					v = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-video.cfg")
				else:
					print("Error: Not able to locate configuration file")
					usage()
					sys.exit()
		elif self.CmdType == "videocustom":
			self.Debug.Display(_("Video: Loading custom video configuration file"))
			if self.CmdVideoConfig != "" and os.path.isfile(self.CmdVideoConfig):
				v = Config(CmdSourceConfig)
			elif os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-videocustom.cfg"):
				v = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-videocustom.cfg")
			else:
				if os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-source-videocustom.cfg"):
					self.FileManager.CheckDir("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source-videocustom.cfg")
					shutil.copy("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-source-videocustom.cfg", "/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-videocustom.cfg")
					v = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-videocustom.cfg")
				else:
					print("Error: Not able to locate configuration file")
					usage()
					sys.exit()
		elif self.CmdType == "videopost":
			self.Debug.Display(_("Video: Loading post-prod. video configuration file"))
			if self.CmdVideoConfig != "" and os.path.isfile(self.CmdVideoConfig):
				v = Config(CmdSourceConfig)
			elif os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-videopost.cfg"):
				v = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-videopost.cfg")
			else:
				if os.path.isfile("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-source-videopost.cfg"):
					self.FileManager.CheckDir("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source-videopost.cfg")
					shutil.copy("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/init/etc/config-source-videopost.cfg", "/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-videopost.cfg")
					v = Config("/home/" + pwd.getpwuid(os.getuid())[0] + "/webcampak/etc/config-source" + self.Cfgcurrentsource + "-videopost.cfg")
				else:
					print("Error: Not able to locate configuration file")
					sys.exit()
		self.Debug.Purge() 
		if self.VideoManagement.IsCreationAllowed(v) == True:
			self.Debug.Display(_("Video: Source active, entering video creation process"))
			if self.CmdType == "videocustom" or self.CmdType == "videopost":
				v.setConfig('cfgcustomactive', 'no')			  
				customstart = v.getConfig('cfgcustomstartyear') + v.getConfig('cfgcustomstartmonth') + v.getConfig('cfgcustomstartday') + v.getConfig('cfgcustomstarthour') + v.getConfig('cfgcustomstartminute') + "00"
				customend = v.getConfig('cfgcustomendyear') + v.getConfig('cfgcustomendmonth') + v.getConfig('cfgcustomendday') + v.getConfig('cfgcustomendhour') +  v.getConfig('cfgcustomendminute') + "59"		
				TargetVideoFilename = self.Cfgdispday + "_" + v.getConfig('cfgcustomvidname')
				# Precaution in case start/end dates were not configured properly
				if (int(v.getConfig('cfgcustomkeepstarthour')) < 10): 
					cfgcustomkeepstarthour = "0" + str(int(v.getConfig('cfgcustomkeepstarthour')))
				else :
					cfgcustomkeepstarthour = v.getConfig('cfgcustomkeepstarthour')
				if (int(v.getConfig('cfgcustomkeepstartminute')) < 10):
					cfgcustomkeepstartminute = "0" + str(int(v.getConfig('cfgcustomkeepstartminute')))
				else :
					cfgcustomkeepstartminute = v.getConfig('cfgcustomkeepstartminute')
				if (int(v.getConfig('cfgcustomkeependhour')) < 10):
					cfgcustomkeependhour = "0" + str(int(v.getConfig('cfgcustomkeependhour')))
				else :
					cfgcustomkeependhour = v.getConfig('cfgcustomkeependhour')
				if (int(v.getConfig('cfgcustomkeependminute')) < 10):
					cfgcustomkeependminute = "0" + str(int(v.getConfig('cfgcustomkeependminute')))
				else :
					cfgcustomkeependminute = v.getConfig('cfgcustomkeependminute')

				keepstart = int(cfgcustomkeepstarthour + cfgcustomkeepstartminute)
				keepend = int(cfgcustomkeependhour + cfgcustomkeependminute)
#				keepstart = int(v.getConfig('cfgcustomkeepstarthour') + v.getConfig('cfgcustomkeepstartminute'))
#				keepend = int(v.getConfig('cfgcustomkeependhour') + v.getConfig('cfgcustomkeependminute'))
				self.Debug.Display(_("Video: Creation from: %(customstart)s to: %(customend)s") % {'customstart': customstart, 'customend': customend} )
				if keepstart != 0 or keepend != 0:
					self.Debug.Display(_("Video: Keeping only pictures between: %(keepstart)s and %(keepend)s") % {'keepstart': str(keepstart), 'keepend': str(keepend)} )
				
			TargetVideoDir = self.Cfgpictdir + "process-" + self.CmdType + "/"
			TargetSourceFiles = self.Cfgpictdir + "process-" + self.CmdType + "/20*.jpg"
			YoutubeUploaded = False
			self.FileManager.CheckDir(TargetVideoDir)
			shutil.rmtree(TargetVideoDir)
			self.FileManager.CheckDir(TargetVideoDir)
			VideoTag = False
			self.Debug.Display(_("Video: %(VideoType)s: Copying files into temporary directory") % {'VideoType': self.CmdType} )
			for listpictdir in sorted(os.listdir(self.Cfgpictdir), reverse=True):			
				if listpictdir[:2] == "20" and os.path.isdir(self.Cfgpictdir + listpictdir): 
					extensions = collections.defaultdict(int)
					for path, dirs, files in os.walk(self.Cfgpictdir + listpictdir):
						for filename in files:
							extensions[os.path.splitext(filename)[1].lower()] += 1
									
					if listpictdir[:8] == self.Cfgdispday and self.CmdType == "video" and VideoTag == False:
						self.Debug.Display(_("Video: %(VideoType)s: Date: %(cfgdispday)s: Error, you are trying to create a daily video of the current day, try creating a custom video instead") % {'VideoType': self.CmdType, 'cfgdispday': self.Cfgdispday} )
					elif self.VideoManagement.DoesVideoFileExist(listpictdir[:8]) == True and self.CmdType == "video" and VideoTag == False:
						self.Debug.Display(_("Video: %(VideoType)s: Error, video file exists for the date: %(cfgdispday)s") % {'VideoType': self.CmdType, 'cfgdispday': listpictdir[:8]} )
					elif extensions['.jpg'] < 10:
						self.Debug.Display(_("Video: %(VideoType)s: Error, not enough jpg files for date: %(cfgdispday)s (only %(nbjpgfiles)s files)") % {'VideoType': self.CmdType, 'cfgdispday': listpictdir[:8], 'nbjpgfiles': extensions['.jpg']} )
					else:
						if self.CmdType == "video" and VideoTag == False:
							customstart = listpictdir[:8] + "000000"
							customend = listpictdir[:8] + "235959"
							TargetVideoFilename = listpictdir[:8]
							VideoTag = True
							self.Debug.Display(_("Video: %(VideoType)s: Creation from: %(customstart)s to: %(customend)s ") % {'VideoType': self.CmdType, 'customstart': customstart, 'customend': customend } )
						for listpictfiles in sorted(os.listdir(self.Cfgpictdir + listpictdir), reverse=True):
							if os.path.splitext(listpictfiles)[0].isdigit() == True:
								if int(os.path.splitext(listpictfiles)[0]) > int(customstart) and int(os.path.splitext(listpictfiles)[0]) < int(customend): # Applying date restrictions where necessary
									CopyFile = 0
									#self.Debug.Display(_("---------------------------------------------------------------------------------"))
									if (self.CmdType == "videocustom" or self.CmdType == "videopost") and (keepstart != 0 or keepend != 0):
										currentfilestamp  = int(listpictfiles[8] + listpictfiles[9] + listpictfiles[10] + listpictfiles[11])
										if currentfilestamp >= keepstart and currentfilestamp <= keepend:
											if v.getConfig("cfgfilteractivate") == "yes": # Activate filter to diff files
												CopyFile = Video.CompareImages(self, self.Cfgnow, self.Cfgpictdir + listpictdir + "/", TargetVideoDir, listpictfiles)
											else:
												CopyFile = 1
									else:
										if v.getConfig("cfgfilteractivate") == "yes": # Activate filter to diff files
											CopyFile = Video.CompareImages(self, self.Cfgnow, self.Cfgpictdir + listpictdir + "/", TargetVideoDir, listpictfiles)
										else:
											CopyFile = 1
											
									if self.CmdType == "videocustom" or self.CmdType == "videopost":
										if v.getConfig("cfgvidminintervalvalue") != "0": # check time between two pictures
											#self.Debug.Display(_("Video: %(VideoType)s: Minimum interval between two pictures: %(cfgvidminintervalvalue)s %(cfgvidmininterval)s ") % {'VideoType': self.CmdType, 'cfgvidminintervalvalue': v.getConfig("cfgvidminintervalvalue"), 'cfgvidmininterval': v.getConfig("cfgvidmininterval") } )												
											SecondsBetweenPictures = self.FileManager.SecondsBetweenPictures(TargetVideoDir, listpictfiles)
											ReferenceInterval = int(v.getConfig("cfgvidminintervalvalue"))
											if SecondsBetweenPictures != None: 
												if v.getConfig("cfgvidmininterval") == "minutes":
													ReferenceInterval = ReferenceInterval * 60
													if SecondsBetweenPictures < ReferenceInterval - 10:
														CopyFile = 0	
												else:
													if SecondsBetweenPictures < ReferenceInterval:
														CopyFile = 0				
												if CopyFile == 0:
													self.Debug.Display(_("Video: %(VideoType)s: Discarding picture, minimum interval:  %(ReferenceInterval)s s - Current Difference: %(SecondsBetweenPictures)s, Current file: %(listpictfiles)s ") % {'VideoType': self.CmdType, 'ReferenceInterval': str(ReferenceInterval), 'SecondsBetweenPictures': str(SecondsBetweenPictures), 'listpictfiles': str(listpictfiles) } )	
													#print "Discarding picture, Minimum Interval: " + str(ReferenceInterval) + "s - Current Difference: " + str(SecondsBetweenPictures) + "s"
										#if self.CmdType == "videopost" and CopyFile == 1 and v.getConfig('cfgtransitionactivate') != "yes": #Delete latest picture in temporary directory to save disk space.
											#self.FileManager.DeleteLatestPicture(TargetVideoDir)
										#	print("OK")

									if CopyFile == 1: # Copy files to temporary directory to be processed for video creation
										shutil.copy(self.Cfgpictdir + listpictdir + "/" + listpictfiles, TargetVideoDir + listpictfiles)
										self.Debug.Display(_("Video: %(VideoType)s: Copy picture to temporary directory: %(listpictfiles)s") % {'VideoType': self.CmdType, 'listpictfiles': str(listpictfiles) } )	
													

			cfgdeflickeractivate = "no"
			cfgdeflickerdebug = "yes"
			if v.getConfig('cfgdeflickeractivate') == "yes":
				self.VideoDeflicker.Main(TargetVideoDir, v)

			for listpictfiles in sorted(os.listdir(TargetVideoDir), reverse=True):															
				if self.FileManager.CheckJpegFile(TargetVideoDir + listpictfiles) == True:
					self.Debug.Display(_("---------------------------------------------------------------------------------"))
					if self.CmdType == "videopost" and v.getConfig('cfgtransitionactivate') != "yes":
						if v.getConfig('cfgrotateactivate') == "yes" or v.getConfig('cfgcropactivate') == "yes" or v.getConfig('cfgvideosizeactivate') == "yes" or v.getConfig('cfgwatermarkactivate') == "yes" or v.getConfig('cfgvideopreimagemagicktxt') == "yes" or v.getConfig('cfgvideoeffect') != "no" or v.getConfig('cfgthumbnailactivate') != "no":
							i = ImageMagick(TargetVideoDir + listpictfiles, self.G, self.Debug)	# Creation de l'objet ImageMagick
							Video.ProcessImagesPost(self, i, self.Cfgnow, TargetVideoDir, listpictfiles)
						if v.getConfig("cfgmovefilestosource") != "no":
							# Verifier si une autre image existe, si oui, ne pas remplacer
							self.FileManager.CheckDir(self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/")
							if os.path.exists(self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/" + listpictfiles):
								self.Debug.Display(_("Video: %(VideoType)s: Error: File already exists %(DestinationFile)s") % {'VideoType': self.CmdType, 'DestinationFile': self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/" + listpictfiles} )
							else:
								self.Debug.Display(_("Video: %(VideoType)s: Copy file to: %(DestinationFile)s") % {'VideoType': self.CmdType, 'DestinationFile': self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/" + listpictfiles} )
								shutil.copy(TargetVideoDir + listpictfiles, self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/" + listpictfiles)
								if v.getConfig("cfgvidminintervalvalue") == "0":
									os.remove(TargetVideoDir + listpictfiles)
					elif self.CmdType == "videocustom" or self.CmdType == "video": 
						i = ImageMagick(TargetVideoDir + listpictfiles, self.G, self.Debug)	# Creation de l'objet ImageMagick
						Video.ProcessImages(self, i, self.Cfgnow, TargetVideoDir, listpictfiles)
						CreationError = False					
				else:
					self.Debug.Display(_("Video: %(VideoType)s: Picture format incorrect, deleting ....") % {'VideoType': self.CmdType} )
					if os.path.isfile(TargetVideoDir + listpictfiles):
						os.remove(TargetVideoDir + listpictfiles)				

			#Start Apply transition effect (if enabled)
			if self.CmdType == "videopost" and v.getConfig('cfgtransitionactivate') == "yes":
				TransitionNbFiles = len(os.listdir(TargetVideoDir))
				TrStartWidth = float(v.getConfig('cfgcropsizewidth'))
				TrStartHeight = float(v.getConfig('cfgcropsizeheight'))
				TrStartX = float(v.getConfig('cfgcropxpos'))
				TrStartY = float(v.getConfig('cfgcropypos'))
				TrEndWidth = float(v.getConfig('cfgtransitioncropsizewidth'))
				TrEndHeight = float(v.getConfig('cfgtransitioncropsizeheight'))
				TrEndX = float(v.getConfig('cfgtransitioncropxpos'))
				TrEndY = float(v.getConfig('cfgtransitioncropypos'))
				TrDiffWidth = TrStartWidth - TrEndWidth
				TrDiffHeight = TrStartHeight - TrEndHeight
				TrDiffX = TrStartX - TrEndX
				TrDiffY = TrStartY - TrEndY
				TrDiffStepWidth = TrDiffWidth / TransitionNbFiles
				TrDiffStepHeight = TrDiffHeight / TransitionNbFiles
				TrDiffStepX = TrDiffX / TransitionNbFiles
				TrDiffStepY = TrDiffY / TransitionNbFiles
				UpdatedCropWidth = TrStartWidth
				UpdatedCropHeight = TrStartHeight
				UpdatedCropX = TrStartX
				UpdatedCropY = TrStartY
				self.Debug.Display(_("Video: Transition: Processing %(TransitionNbFiles)s pictures: W diff:%(TrDiffStepWidth)s H diff:%(TrDiffStepHeight)s X diff:%(TrDiffStepX)s Y diff:%(TrDiffStepY)s") % {'TransitionNbFiles': str(TransitionNbFiles), 'TrDiffStepWidth': str(round(TrDiffStepWidth,2)), 'TrDiffStepHeight': str(round(TrDiffStepHeight,2)), 'TrDiffStepX': str(round(TrDiffStepX,2)), 'TrDiffStepY': str(round(TrDiffStepY,2))} )						
				for listpictfiles in sorted(os.listdir(TargetVideoDir)):
					UpdatedCropWidth = UpdatedCropWidth - TrDiffStepWidth
					if TrDiffStepWidth < 0 and UpdatedCropWidth > TrEndWidth:
						UpdatedCropWidth = TrEndWidth
					if TrDiffStepWidth > 0 and UpdatedCropWidth < TrEndWidth:
						UpdatedCropWidth = TrEndWidth
					UpdatedCropHeight = UpdatedCropHeight - TrDiffStepHeight
					if TrDiffStepHeight < 0 and UpdatedCropHeight > TrEndHeight:
						UpdatedCropHeight = TrEndWidth
					if TrDiffStepHeight > 0 and UpdatedCropHeight < TrEndHeight:
						UpdatedCropHeight = TrEndWidth
					UpdatedCropX = UpdatedCropX - TrDiffStepX
					if TrDiffStepX < 0 and UpdatedCropX > TrEndX:
						UpdatedCropX = TrEndX
					if TrDiffStepX > 0 and UpdatedCropX < TrEndX:
						UpdatedCropX = TrEndX
					UpdatedCropY = UpdatedCropY - TrDiffStepY
					if TrDiffStepY < 0 and UpdatedCropY > TrEndY:
						UpdatedCropY = TrEndY
					if TrDiffStepY > 0 and UpdatedCropY < TrEndY:
						UpdatedCropY = TrEndY
					i = ImageMagick(TargetVideoDir + listpictfiles, self.G, self.Debug)	# Creation de l'objet ImageMagick
					if v.getConfig('cfgthumbnailactivate') == "yes":	
						self.Debug.Display(_("Video: Thumbnail: Create thumbnail of picture: %(File)s ") % {'File': TargetVideoDir + listpictfiles} )
						# Start Extraction of a thumbnail
						i.Crop(v.getConfig('cfgthumbnailsrccropsizewidth'), v.getConfig('cfgthumbnailsrccropsizeheight'), v.getConfig('cfgthumbnailsrccropxpos'), v.getConfig('cfgthumbnailsrccropypos'), TargetVideoDir + "thumbnail.jpg")
						thumb = ImageMagick(TargetVideoDir + "thumbnail.jpg", self.G, self.Debug)
						thumb.Resize(v.getConfig('cfgthumbnaildstsizewidth') + "x" + v.getConfig('cfgthumbnaildstsizeheight'), TargetVideoDir, "thumbnail.jpg")
						if v.getConfig('cfgthumbnailborder') == "yes":	
							thumb.Border("#909090", "5", "5", TargetVideoDir + "thumbnail.jpg")
						# End Extraction of a thumbnail
					self.Debug.Display(_("Video: Transition: Processing picture: %(File)s W:%(UpdatedCropWidth)s H:%(UpdatedCropHeight)s X:%(UpdatedCropX)s Y:%(UpdatedCropY)s") % {'File': TargetVideoDir + listpictfiles, 'UpdatedCropWidth': str(int(UpdatedCropWidth)), 'UpdatedCropHeight': str(int(UpdatedCropHeight)), 'UpdatedCropX': str(int(UpdatedCropX)), 'UpdatedCropY': str(int(UpdatedCropY))} )
					i.Crop(str(int(UpdatedCropWidth)), str(int(UpdatedCropHeight)), str(int(UpdatedCropX)), str(int(UpdatedCropY)), TargetVideoDir + listpictfiles)
					Video.ProcessImagesPost(self, i, self.Cfgnow, TargetVideoDir, listpictfiles)
					if v.getConfig("cfgmovefilestosource") != "no":
						self.FileManager.CheckDir(self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/")
						if os.path.exists(self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/" + listpictfiles):
							self.Debug.Display(_("Video: %(VideoType)s: Error: File already exists %(DestinationFile)s") % {'VideoType': self.CmdType, 'DestinationFile': self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/" + listpictfiles} )
						else:
							self.Debug.Display(_("Video: %(VideoType)s: Move file to: %(DestinationFile)s") % {'VideoType': self.CmdType, 'DestinationFile': self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/" + listpictfiles} )
							shutil.copy(TargetVideoDir + listpictfiles, self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + v.getConfig("cfgmovefilestosource")+ "/" + self.G.getConfig('cfgpictdir') + listpictfiles[0:8] + "/" + listpictfiles)
							os.remove(TargetVideoDir + listpictfiles)
			#End Apply transition effect (if enabled)

			self.Debug.Display(_("Video: %(VideoType)s: All pictures have been copied to target directory") % {'VideoType': self.CmdType} )
			print "Creation Error: " + str(CreationError)
			for videoformats in self.G.getConfig('cfgvideoformats'):
				if v.getConfig("cfgvideocodecH264" + videoformats + "create") == "yes" and CreationError == False and self.CmdType != "videopost":
					if InitTagetVideoFilename == "":
						InitTagetVideoFilename = TargetVideoFilename
					TargetVideoFilename = InitTagetVideoFilename + "." + videoformats + ".avi"
					TargetLiveVideoFilename = "live." + videoformats + ".avi"
					self.Debug.Display(_("Video: %(VideoType)s: Processing format: %(videoformats)s ") % {'VideoType': self.CmdType, 'videoformats': videoformats } )
					self.Debug.Display(_("Video: %(VideoType)s: Processing format: %(videoformats)s - preparing parameters ") % {'VideoType': self.CmdType, 'videoformats': videoformats } )
					CropOptions=""
					ScaleOptions=""
					CropScaleOptions=""
					if v.getConfig("cfgvideocodecH264" + videoformats + "width") != "" and v.getConfig("cfgvideocodecH264" + videoformats + "height") == "":
						ScaleOptions = "scale=" + v.getConfig("cfgvideocodecH264" + videoformats + "width") + ":-3"
					elif v.getConfig("cfgvideocodecH264" + videoformats + "width") == "" and v.getConfig("cfgvideocodecH264" + videoformats + "height") != "":
						ScaleOptions = "scale=-3:" + v.getConfig("cfgvideocodecH264" + videoformats + "height")
					elif v.getConfig("cfgvideocodecH264" + videoformats + "width") != "" and v.getConfig("cfgvideocodecH264" + videoformats + "height") != "":
						ScaleOptions = "scale=" + v.getConfig("cfgvideocodecH264" + videoformats + "width") + ":" + v.getConfig("cfgvideocodecH264" + videoformats + "height")
					if v.getConfig("cfgvideocodecH264" + videoformats + "cropwidth") != "" and v.getConfig("cfgvideocodecH264" + videoformats + "cropheight") != "":
						CropOptions = "crop=" + v.getConfig("cfgvideocodecH264" + videoformats + "cropwidth") + ":" + v.getConfig("cfgvideocodecH264" + videoformats + "cropheight") + ":" + v.getConfig("cfgvideocodecH264" + videoformats + "cropx") + ":" + v.getConfig("cfgvideocodecH264" + videoformats + "cropy")
					if ScaleOptions != "" and CropOptions == "":
						CropScaleOptions = "-vf " + ScaleOptions
					elif ScaleOptions == "" and CropOptions != "":
						CropScaleOptions = "-vf " + CropOptions
					elif ScaleOptions != "" and CropOptions != "":
						CropScaleOptions = "-vf " + ScaleOptions + "," + CropOptions

					self.Debug.Display(_("Video: %(VideoType)s: Format: %(videoformats)s - Compression of the first pass with mencoder") % {'VideoType': self.CmdType, 'videoformats': videoformats} )
					Video.CreateVideo(self, TargetSourceFiles, TargetVideoDir + TargetVideoFilename, TargetVideoDir + "currentvid.log", v.getConfig("cfgvideocodecH264" + videoformats + "fps"), CropScaleOptions, "1", v.getConfig("cfgvideocodecH264" + videoformats + "bitrate"))
					if v.getConfig("cfgvideocodecH264" + videoformats + "2pass") == "yes":
						self.Debug.Display(_("Video: %(VideoType)s: Format: %(videoformats)s - Compression of the second pass with mencoder") % {'VideoType': self.CmdType, 'videoformats': videoformats} )
						Video.CreateVideo(self, TargetSourceFiles, TargetVideoDir + TargetVideoFilename, TargetVideoDir + "currentvid.log", v.getConfig("cfgvideocodecH264" + videoformats + "fps"), CropScaleOptions, "2", v.getConfig("cfgvideocodecH264" + videoformats + "bitrate"))

					if os.path.getsize(TargetVideoDir + TargetVideoFilename) > 50000:
						self.Debug.Display(_("Mencoder: Video creation completed: %(VideoFile)s") % {'VideoFile': TargetVideoDir + TargetVideoFilename } )
						if v.getConfig("cfgvideoaddaudio") == "yes" and v.getConfig("cfgvideoaudiofile") != "":
							if os.path.isfile(self.Cfgselfaudiodir + v.getConfig("cfgvideoaudiofile")):
								Video.AddAudio(self, self.Cfgselfaudiodir, v.getConfig("cfgvideoaudiofile"), TargetVideoDir, TargetVideoFilename)
							elif os.path.isfile(self.Cfgaudiodir + v.getConfig("cfgvideoaudiofile")):
								Video.AddAudio(self, self.Cfgaudiodir, v.getConfig("cfgvideoaudiofile"), TargetVideoDir, TargetVideoFilename)
						if v.getConfig("cfgvideocodecH264" + videoformats + "createflv") == "yes":
							Video.CreateMP4(self, TargetVideoDir, TargetVideoFilename)
						
						if os.path.isfile(TargetVideoDir + TargetVideoFilename):
							self.Debug.Display(_("Video: %(VideoType)s: Copy of the video file into archives") % {'VideoType': self.CmdType} )
							shutil.copy(TargetVideoDir + TargetVideoFilename, self.Cfgvideodir + TargetVideoFilename)
							self.Debug.Display(_("Video: %(VideoType)s: Copy of the video file into live directory") % {'VideoType': self.CmdType} )
							shutil.copy(TargetVideoDir + TargetVideoFilename, self.Cfglivedir + TargetLiveVideoFilename)
							os.remove(TargetVideoDir + TargetVideoFilename)
						if os.path.isfile(TargetVideoDir + TargetVideoFilename + ".mp4"):
							self.Debug.Display(_("Video: %(VideoType)s: Copy of the MP4 video file into archives") % {'VideoType': self.CmdType} )
							shutil.copy(TargetVideoDir + TargetVideoFilename + ".mp4", self.Cfgvideodir + TargetVideoFilename + ".mp4")
							self.Debug.Display(_("Video: %(VideoType)s: Copy of the MP4 video file into live directory") % {'VideoType': self.CmdType} )
							shutil.copy(TargetVideoDir + TargetVideoFilename + ".mp4", self.Cfglivedir + TargetLiveVideoFilename + ".mp4")
							os.remove(TargetVideoDir + TargetVideoFilename + ".mp4")
						if os.path.isfile(TargetVideoDir + TargetVideoFilename + ".jpg"):
							self.Debug.Display(_("Video: %(VideoType)s: Copy of the JPG preview file into archives") % {'VideoType': self.CmdType} )
							shutil.copy(TargetVideoDir + TargetVideoFilename + ".jpg", self.Cfgvideodir + TargetVideoFilename + ".jpg")
							self.Debug.Display(_("Video: %(VideoType)s: Copy of the JPG preview file into live directory") % {'VideoType': self.CmdType} )
							shutil.copy(TargetVideoDir + TargetVideoFilename + ".jpg", self.Cfglivedir + TargetLiveVideoFilename + ".jpg")
							os.remove(TargetVideoDir + TargetVideoFilename + ".jpg")

						if v.getConfig("cfgftpmainserveraviid") != "no":
							self.Debug.Display(_("Video: %(VideoType)s: Sending file via FTP: %(FTPFile)s") % {'VideoType': self.CmdType, 'FTPFile': self.Cfgvideodir + TargetVideoFilename} )
							FTPResult = FTPClass.FTPUpload(self.Cfgcurrentsource, v.getConfig('cfgftpmainserveraviid'), "", self.Cfgvideodir, TargetVideoFilename, self.Debug, v.getConfig('cfgftpmainserveraviretry'))
						if v.getConfig("cfgftpmainservermp4id") != "no":
							self.Debug.Display(_("Video: %(VideoType)s: Sending file via FTP: %(FTPFile)s") % {'VideoType': self.CmdType, 'FTPFile': self.Cfgvideodir + TargetVideoFilename + ".mp4"} )
							FTPResult = FTPClass.FTPUpload(self.Cfgcurrentsource, v.getConfig('cfgftpmainservermp4id'), "", self.Cfgvideodir, TargetVideoFilename + ".mp4", self.Debug, v.getConfig('cfgftpmainservermp4retry'))
							self.Debug.Display(_("Video: %(VideoType)s: Sending file via FTP: %(FTPFile)s") % {'VideoType': self.CmdType, 'FTPFile': self.Cfgvideodir + TargetVideoFilename + ".jpg"} )
							FTPResult = FTPClass.FTPUpload(self.Cfgcurrentsource, v.getConfig('cfgftpmainservermp4id'), "", self.Cfgvideodir, TargetVideoFilename + ".jpg", self.Debug, v.getConfig('cfgftpmainservermp4retry'))

						if v.getConfig("cfgftphotlinkserveraviid") != "no":
							self.Debug.Display(_("Video: %(VideoType)s: Sending file via FTP: %(FTPFile)s") % {'VideoType': self.CmdType, 'FTPFile': self.Cfgvideodir + TargetVideoFilename} )
							FTPResult = FTPClass.FTPUpload(self.Cfgcurrentsource, v.getConfig('cfgftphotlinkserveraviid'), "", self.Cfglivedir, TargetLiveVideoFilename, self.Debug, v.getConfig('cfgftphotlinkserveraviretry'))
						if v.getConfig("cfgftphotlinkservermp4id") != "no":
							self.Debug.Display(_("Video: %(VideoType)s: Sending file via FTP: %(FTPFile)s") % {'VideoType': self.CmdType, 'FTPFile': self.Cfgvideodir + TargetVideoFilename + ".mp4"} )
							FTPResult = FTPClass.FTPUpload(self.Cfgcurrentsource, v.getConfig('cfgftphotlinkservermp4id'), "", self.Cfglivedir, TargetLiveVideoFilename + ".mp4", self.Debug, v.getConfig('cfgftphotlinkservermp4retry'))
							self.Debug.Display(_("Video: %(VideoType)s: Sending file via FTP: %(FTPFile)s") % {'VideoType': self.CmdType, 'FTPFile': self.Cfgvideodir + TargetVideoFilename + ".jpg"} )
							FTPResult = FTPClass.FTPUpload(self.Cfgcurrentsource, v.getConfig('cfgftphotlinkservermp4id'), "", self.Cfglivedir, TargetLiveVideoFilename + ".jpg", self.Debug, v.getConfig('cfgftphotlinkservermp4retry'))

						if v.getConfig("cfgvideoyoutubeupload") == "yes" and YoutubeUploaded != True:
							self.Debug.Display(_("Video: %(VideoType)s: Youtube Upload: %(Youtubefile)s") % {'VideoType': self.CmdType, 'Youtubefile': self.Cfgvideodir + TargetVideoFilename} )
							Video.YoutubeUpload(self, self.Cfgvideodir, TargetVideoFilename, v.getConfig("cfgvideoyoutubecategory"))  
							YoutubeUploaded == True
							
						if self.CmdType == "videocustom" and v.getConfig("cfgvideoemailactivate") == "yes":
							#g = open(self.Cfglocalemessagesdir + "email_video.txt", 'r')
							#self.Debug.Display(_("Video: Sending an email to inform successful video creation"))
							#self.EmailClass.SendEmail(socket.gethostname() + ": Source " + self.Cfgcurrentsource + " video crée: " + TargetVideoFilename, g.read(), self.Cfglogdir, "", self.FileManager)
							#self.EmailClass.SendEmail(_("%(CurrentHostname)s: Source %(CurrentSource)s: Video created: %(VideoFileName)s") % {'CurrentHostname': socket.gethostname(), 'CurrentSource': self.Cfgcurrentsource, 'VideoFileName': TargetVideoFilename}, g.read(), self.Cfglogdir, "", self.FileManager)
							#g.close()
							if os.path.isfile(self.Cfglocalemessagesdir + "emailVideoContent.txt") and os.path.isfile(self.Cfglocalemessagesdir + "emailVideoSubject.txt"):
								emailContentFile = open(self.Cfglocalemessagesdir + "emailVideoContent.txt", 'r')
								emailContent = emailContentFile.read()
								emailContentFile.close()
								emailSubjectFile = open(self.Cfglocalemessagesdir + "emailVideoSubject.txt", 'r')
								emailSubject = emailSubjectFile.read()
								emailSubjectFile.close()
								emailSubject = emailSubject.replace("#CURRENTHOSTNAME#", socket.gethostname())
								emailSubject = emailSubject.replace("#CURRENTSOURCE#", self.Cfgcurrentsource)
								emailSubject = emailSubject.replace("#VIDEOFILENAME#", TargetVideoFilename)
								self.EmailClass.SendEmail(emailSubject, emailContent, self.Cfglogdir, "cronlog-" + self.Cfgcurrentsource + "-customvid", self.FileManager)																			
							
					else:
						self.Debug.Display(_("Video: %(VideoType)s: Error while creating video: %(VideoFile)s") % {'VideoType': self.CmdType, 'VideoFile': TargetVideoDir + TargetVideoFilename} )

			if self.CmdType == "videopost" and v.getConfig('cfgvideoemailactivate') == "yes":
				#g = open(self.Cfglocalemessagesdir + "email_videopost.txt", 'r')
				#self.Debug.Display(_("Video: Sending an email to inform about completion"))
				#self.EmailClass.SendEmail(_("%(CurrentHostname)s: Source %(CurrentSource)s: Post-prod. completed") % {'CurrentHostname': socket.gethostname(), 'CurrentSource': self.Cfgcurrentsource}, g.read(), self.Cfglogdir, "", self.FileManager)
				#g.close()
				if os.path.isfile(self.Cfglocalemessagesdir + "emailVideopostContent.txt") and os.path.isfile(self.Cfglocalemessagesdir + "emailVideopostSubject.txt"):
					emailContentFile = open(self.Cfglocalemessagesdir + "emailVideopostContent.txt", 'r')
					emailContent = emailContentFile.read()
					emailContentFile.close()
					emailSubjectFile = open(self.Cfglocalemessagesdir + "emailVideopostSubject.txt", 'r')
					emailSubject = emailSubjectFile.read()
					emailSubjectFile.close()
					emailSubject = emailSubject.replace("#CURRENTHOSTNAME#", socket.gethostname())
					emailSubject = emailSubject.replace("#CURRENTSOURCE#", self.Cfgcurrentsource)
					self.EmailClass.SendEmail(emailSubject, emailContent, self.Cfglogdir, "cronlog-" + self.Cfgcurrentsource + "-post", self.FileManager)					


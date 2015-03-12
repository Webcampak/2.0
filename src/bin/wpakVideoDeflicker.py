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


from PIL import Image, ImageStat, ImageDraw
from itertools import tee, islice, chain, izip
from collections import deque

# Small class for video management
class VideoDeflicker: 
	def __init__(self, c, cfgcurrentsource, g, debug, cfgnow, DateFormat, FileManager, CmdType):
		self.C = c
		self.Cfgcurrentsource = cfgcurrentsource
		self.G = g
		self.Debug = debug
		self.Cfgnow = cfgnow
		self.DateFormat = DateFormat
		self.FileManager = FileManager
		self.CmdType = CmdType
		self.Cfgtmpdir =  self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgtmpdir')
		self.Cfgcachedir = self.G.getConfig('cfgbasedir') +  self.G.getConfig('cfgcachedir')				
		self.Cfgdispdate = self.Cfgnow.strftime("%Y%m%d%H%M%S")
		self.Cfgfilename = self.Cfgdispdate + ".jpg"
		self.Cfglivedir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfglivedir')
		self.Cfgpictdir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgpictdir')
		self.Cfgvideodir = self.G.getConfig('cfgbasedir') + self.G.getConfig('cfgsourcesdir') + "source" + self.Cfgcurrentsource + "/" + self.G.getConfig('cfgvideodir')


	# Function: FindNearestValue
	# Description; Find nearest value in a numpy table
	# array: array 
	# value: value to search for
	# Return: closest value
	def FindNearestValue(self, array,value):
		idx=(np.abs(array-value)).argmin()
		return array[idx]


	# Function: SearchBeforeAfter
	# Description; Returns values before and after a specific value in a list
	# array: array 
	# value: value to search for
	# Return: closest value
	def SearchBeforeAfter(self, predicate, seq, before=0, after=0):
		q = deque(maxlen=before)
		it = iter(seq)
	
		for s in it:
			if predicate(s):
				return list(q) + [s] + [x for _,x in zip(range(after), it)]
			q.append(s)


	# Function: PreviousAndNext
	# Description: In an itertable (list of pictures), return previous, current and next values
	# itertable: an itertable
	# Return: previous, current and next
	def PreviousAndNext(self, itertable):
		prevs, items, nexts = tee(itertable, 3)
		prevs = chain([None], prevs)
		nexts = chain(islice(nexts, 1, None), [None])
		return izip(prevs, items, nexts)		

	# Function: GetPictBrightness
	# Description: Calculate Image Brightness and return result
	# picture: Picture file (with full path)
	# Return: Picture Brightness
	def GetPictBrightness(self, picture):
		if os.path.isfile(picture):
			im = Image.open(picture)
			stat = ImageStat.Stat(im)
			r,g,b = stat.mean
			AvgBrightness = math.sqrt(0.241*(r**2) + 0.691*(g**2) + 0.068*(b**2))
			return round(AvgBrightness, 4)

	# Function: ChangePictureBrightness
	# Description: Change picture brightness and return its new brightness value
	# source: Source picture (full path)
	# destination: Destination picture (full path)	
	# brightness: Brightness value, between -100 and +100
	# Return: New brightness value
	def ChangePictureBrightness(self, source, destination, brightness):
		if os.path.isfile(source) == False:
			print("Error: Source File does not exist")
			return "ERROR"
		convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", source, "-brightness-contrast", str(brightness), destination])			
		if os.path.isfile(destination):
			return self.GetPictBrightness(destination)
		else:
			print("Error: File does not exist")
			return "ERROR"

	# Function: TestBrightness
	# Description: Modify the picture to find the brightness value closest to targetbrightness
	# start, end: Test values within this range
	# step: Within the range, increment using this value	
	# level: Current level (number of steps)
	# operand: Do we go negative or positive	
	# targetbrightness: Brightness objective	
	# Return: List of brightness values and brightness results
	def TestBrightness(self, start, end, step, level, operand, targetbrightness, TargetVideoDir):
		returntable = []
		if level < len(step):
			#print "=== Step: " + str(step[level]) + " - level:" + str(level)
			#for pre, cur, nex in self.PreviousAndNext(range(start, end, step[level] * operand)):
			BuildTable = []
			BuildTable = range(start, end, step[level] * operand)
			#print "BuildTable L" + str(level) + " " + str(BuildTable)
			for cur,nex in zip(BuildTable,BuildTable[1::]):
				#print "Cur:" + str(cur)
				#print "Nex:" + str(nex)
				if nex != None:
					ThumbBrightnessCurrent = self.ChangePictureBrightness(self.Cfgtmpdir + "/deflicker/deflicker-initfile.jpg", self.Cfgtmpdir + "/deflicker/deflicker-testfile.jpg", str(cur))
					ThumbBrightnessNext = self.ChangePictureBrightness(self.Cfgtmpdir + "/deflicker/deflicker-initfile.jpg", self.Cfgtmpdir + "/deflicker/deflicker-testfile.jpg", str(nex))					
					returntable.append(str(nex) + "x" + str(ThumbBrightnessNext))
					returntable.append(str(cur) + "x" + str(ThumbBrightnessCurrent))
					if (step[level] * operand > 0 and (ThumbBrightnessCurrent < targetbrightness and ThumbBrightnessNext > targetbrightness)) or (step[level] * operand < 0 and (ThumbBrightnessCurrent > targetbrightness and ThumbBrightnessNext < targetbrightness)):
						print("=== Range identified, between " + str(cur) + "(" + str(ThumbBrightnessCurrent) + ") and " + str(nex) + "(" +  str(ThumbBrightnessNext) + ")")
						if level + 1 < len(step):
							try:
								returntable.extend(self.TestBrightness(cur, nex, step, level + 1, operand, targetbrightness, TargetVideoDir))
							except:
								print("Error when testing brightness")						
						return returntable;
						break;					

	# Function: IdentifyBrightness
	# Description; Identify brightness value to be applied to picture in order to match targetbrightness
	# picture: Picture file (with full path)
	# picture: Brightness level to match	
	# Return: Picture Brightness
	def IdentifyBrightness(self, picture, targetbrightness, currentbrightness, TargetVideoDir):	
		convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", picture, "-scale", "1024x768", self.Cfgtmpdir + "/deflicker/deflicker-initfile.jpg"])
		if os.path.isfile(self.Cfgtmpdir + "/deflicker/deflicker-initfile.jpg") == False:
			print("Error: Source File does not exist IdentifyBrightness")
		currentbrightness = self.GetPictBrightness(self.Cfgtmpdir + "/deflicker/deflicker-initfile.jpg")
#		if targetbrightness > currentbrightness:
#			ManipType = "INCREASE"
#		else:
#			ManipType = "DECREASE"
#		print "Identify Brightness of " + picture + " - should be: " + str(targetbrightness) + " current:" + str(currentbrightness) + " - " + ManipType

		if currentbrightness >= targetbrightness:
			operand = -1
		else:
			operand = 1

		step = [10, 5, 2, 1]	
		returnbrightness = []
		returnbrightness = self.TestBrightness(0, 100 * operand, step, 0, operand, targetbrightness, TargetVideoDir)
		returnelementbright = []
		returnelementim = []	
		if returnbrightness != None:  
			for returnelements in returnbrightness:
				returnelementt = returnelements.split("x");
				returnelementim.append(returnelementt[0])			
				returnelementbright.append(float(returnelementt[1]))
		returnelementim.append("0")			
		returnelementbright.append(float(currentbrightness))
		returnelementbright = np.array(returnelementbright) # Convert Python array to Numpy array
		FindNearestValue = str(self.FindNearestValue(returnelementbright,int(targetbrightness)))

		if FindNearestValue == str(currentbrightness):
			return "0"
		else:
			i=0
			for x in returnelementbright:
				if str(x) == str(FindNearestValue):
					return str(returnelementim[i])
				i = i + 1

	# Function: Main
	# Description; sssssssssssss
	# Return: True or False
	def Main(self, TargetVideoDir, v):
		self.FileManager.CheckDir(self.Cfgtmpdir + "/deflicker/")
		if os.path.isfile(self.Cfgtmpdir + "/deflicker/deflicker-brightness.log"):
			os.remove(self.Cfgtmpdir + "/deflicker/deflicker-brightness.log")
		err = open(self.Cfgtmpdir + "/deflicker/deflicker-brightness.log","a+")
		err.write("Picture,Initial Brightness,Obtained Brightness\n" )			
		err.close()			


		#NewListTempPictures = []
		#ListTempPictures = sorted(os.listdir(TargetVideoDir), reverse=True)
		#for currentpict in ListTempPictures:
		#	NewListTempPictures.append(int(currentpict.replace('.jpg', '')))

#			print("Current Value" + str(currentpict))
			#ListTempPictures = [1,2,3,4,5,6]	
			#currentpict = 3
			#ResultTmp = self.SearchBeforeAfter(currentpict, ListTempPictures, 2, 2)
			#ResultTmp = self.SearchBeforeAfter(lambda x: x == 3, [1,2,3,4,5,6], 1, 1)
			#ResultTmp = self.SearchBeforeAfter(lambda x: x == "3", ["1","2","3","4","5","6"], 1, 1)
#			ResultTmp = self.SearchBeforeAfter(lambda x: x == str(currentpict), ListTempPictures, 5, 5)
#			print(str(ResultTmp))
#			print("-----------------")

# RGB Hitogram
# This script will create a histogram image based on the RGB content of
# an image. It uses PIL to do most of the donkey work but then we just
# draw a pretty graph out of it.
#
# May 2009,  Scott McDonough, www.scottmcdonough.co.uk
#
		histHeight = 120            # Height of the histogram
		histWidth = 256             # Width of the histogram
		multiplerValue = 1        # The multiplier value basically increases
		                            # the histogram height so that love values
		                            # are easier to see, this in effect chops off
		                            # the top of the histogram.
		showFstopLines = True       # True/False to hide outline
		fStopLines = 5
		# Colours to be used
		backgroundColor = (51,51,51)    # Background color
		lineColor = (102,102,102)       # Line color of fStop Markers 
		red = (255,60,60)               # Color for the red lines
		green = (51,204,51)             # Color for the green lines
		blue = (0,102,255)              # Color for the blue lines
		white = (145,145,145)              # Color for the blue lines

		ListTempPictures = sorted(os.listdir(TargetVideoDir), reverse=False)
		for currentpict in ListTempPictures:
			img = Image.open(TargetVideoDir + currentpict)
			img = img.convert("L")
			hist = img.histogram()
			histMax = max(hist)                                     #comon color
			xScale = float(histWidth)/len(hist)                     # xScaling
			yScale = float((histHeight)*multiplerValue)/histMax     # yScaling 
				
			im = Image.new("RGBA", (histWidth, histHeight), backgroundColor)   
			draw = ImageDraw.Draw(im)

			# Draw Outline is required
			if showFstopLines:    
				xmarker = histWidth/fStopLines
				x =0
				for i in range(1,fStopLines+1):
					draw.line((x, 0, x, histHeight), fill=lineColor)
					x+=xmarker
				draw.line((histWidth-1, 0, histWidth-1, 200), fill=lineColor)
				draw.line((0, 0, 0, histHeight), fill=lineColor)

			# Draw the RGB histogram lines
			x=0; c=0;
			for i in hist:
				if int(i)==0: pass
				else:
					color = white
					if c>255: color = green
					if c>511: color = blue
					draw.line((x, histHeight, x, histHeight-(i*yScale)), fill=color)        
				if x>255: x=0
				else: x+=1
				c+=1

			# Now save and show the histogram    
			im.save(TargetVideoDir + "hist" + currentpict)

			if v.getConfig('cfgdeflickerdebug') == "yes":			
				print("Insert histogram inside" + currentpict)
				composite = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, TargetVideoDir + "hist" + currentpict,"-compose", "over", "-composite",  TargetVideoDir + currentpict])
				if os.path.isfile(TargetVideoDir + "hist" + currentpict):
					os.remove(TargetVideoDir + "hist" + currentpict)
			else:		
				if os.path.isfile(TargetVideoDir + "hist" + currentpict):
					os.remove(TargetVideoDir + "hist" + currentpict)















#from PIL import Image 
#image_file = Image.open("convert_image.png") # open colour image
#image_file = image_file.convert('1') # convert image to black and white
#image_file.save('result.png')
		
		
"""		i = 0
		ListTempPictures = sorted(os.listdir(TargetVideoDir), reverse=False)
		for currentpict in ListTempPictures:
			print("Current:" + currentpict)
			if i < len(ListTempPictures) - 1:
				print("Next:" + ListTempPictures[i + 1])
				nextpict = ListTempPictures[i + 1]
			else:
				nextpict = currentpict			
			i = i + 1					
			if nextpict != currentpict:
				OpenCurrentPic = Image.open(TargetVideoDir + currentpict)
				picWidth, picHeight = OpenCurrentPic.size
				LoadCurrentPic = OpenCurrentPic.load()	
				OpenNextPic = Image.open(TargetVideoDir + nextpict)
				LoadNextPic = OpenNextPic.load()	
				OpenMaskPic = Image.open(TargetVideoDir + currentpict)			
				LoadMaskPic = OpenMaskPic.load()	
				j = 0
				LoadScanPic = []
				for scanpic in self.SearchBeforeAfter(lambda x: x == str(currentpict), ListTempPictures, 5, 5):
					OpenScanPic = Image.open(TargetVideoDir + scanpic)
					LoadScanPic.append(OpenScanPic.load())
					print("Load Picture:" + str(scanpic))
					j = j + 1									
				for x in range(0,picWidth):
					for y in range(0,picHeight):
						CurrentGrayScale = math.sqrt(0.241*(LoadCurrentPic[x,y][0]**2) + 0.691*(LoadCurrentPic[x,y][1]**2) + 0.068*(LoadCurrentPic[x,y][2]**2))
						AvgR = 0
						AvgG = 0
						AvgB = 0
						PixelInsertMeanAverage = True
						#print ("------")
						for k in range(0, j):
							AvgR = AvgR + LoadScanPic[k][x,y][0]
							AvgG = AvgG + LoadScanPic[k][x,y][1]
							AvgB = AvgB + LoadScanPic[k][x,y][2]
							if PixelInsertMeanAverage == True:
								ScanGrayScale = math.sqrt(0.241*(LoadScanPic[k][x,y][0]**2) + 0.691*(LoadScanPic[k][x,y][1]**2) + 0.068*(LoadScanPic[k][x,y][2]**2))
								GreyScaleDiff = CurrentGrayScale - ScanGrayScale
								if GreyScaleDiff < 0:
									GreyScaleDiff = GreyScaleDiff * (-1)
								#print ("GreyScaleDiff" + str(GreyScaleDiff) + " - Current:" + str(CurrentGrayScale) + " - Test:" + str(ScanGrayScale))									
								if GreyScaleDiff > cfgdeflickerthreshold:
									PixelInsertMeanAverage = False
						if PixelInsertMeanAverage == True:
							AvgR = int(AvgR / j)
							AvgG = int(AvgG / j)
							AvgB = int(AvgB / j)	
							LoadCurrentPic[x, y] = (AvgR, AvgG, AvgB)	
							LoadMaskPic[x, y] = (255, 255, 255)								
						else:
							LoadMaskPic[x, y] = (0, 0, 0)								

				self.Debug.Display(_("Video: %(VideoType)s: Deflicker, changing brightness of file %(currentpict)s ") % {'VideoType': self.CmdType, 'currentpict': currentpict} )	
				if v.getConfig('cfgdeflickerdebug') == "yes":		
					if os.path.isfile(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"):
						os.remove(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg")
					print("Deflicker comparison: Cut Source File in half")
					convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, "-crop",  "50%x100%+0+0", self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"])														
					#PicNewBrightness = self.ChangePictureBrightness(TargetVideoDir + currentpict, TargetVideoDir + currentpict, str(TargetBrightness))		
					OpenCurrentPic.save(TargetVideoDir + currentpict)		
					print("Deflicker comparison: Add Picture on top of another")
					composite = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg","-compose", "over", "-composite",  TargetVideoDir + currentpict])
					print("Deflicker comparison: Add Legend")
					mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northwest fill black text 0,0 'Original' fill yellow text 3,0 'Original' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
					mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northeast fill black text 0,0 'Deflicker' fill yellow text 3,0 'Deflicker' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
				else:		
					OpenCurrentPic.save(TargetVideoDir + currentpict)
				PicEndBrightness = self.GetPictBrightness(TargetVideoDir + currentpict)				
				#err = open(self.Cfgtmpdir + "/deflicker/deflicker-brightness.log","a+")
				#err.write(str(currentpict) + "," + str(PicOriBrightness) + "," + str(PicEndBrightness) + "\n" )			
				#err.close()

"""

				#OpenCurrentPic.save(TargetVideoDir + currentpict)																		
				#OpenMaskPic.save(TargetVideoDir + "mask-" + currentpict)
							
"""						NextGrayScale = math.sqrt(0.241*(LoadNextPic[x,y][0]**2) + 0.691*(LoadNextPic[x,y][1]**2) + 0.068*(LoadNextPic[x,y][2]**2))
						GreyScaleDiff = CurrentGrayScale - NextGrayScale
						if GreyScaleDiff < 0:
							GreyScaleDiff = GreyScaleDiff * (-1)							
						if GreyScaleDiff < cfgdeflickerthreshold:
							# There is not much difference between shots, we replace pixel by average
							LoadMaskPic[x, y] = (255, 255, 255)	
							AvgR = 0
							AvgG = 0
							AvgB = 0
							for j in range(0, i):
								AvgR = AvgR + LoadScanPic[j][x,y][0]
								AvgG = AvgG + LoadScanPic[j][x,y][1]
								AvgB = AvgB + LoadScanPic[j][x,y][2]	
							AvgR = int(AvgR / i)
							AvgG = int(AvgG / i)
							AvgB = int(AvgB / i)		
							LoadCurrentPic[x, y] = (AvgR, AvgG, AvgB)						
						else:
							# There is actually a difference between shots, we do not calculate average
							LoadMaskPic[x, y] = (0, 0, 0)	
				OpenCurrentPic.save(TargetVideoDir + currentpict)																		
				OpenMaskPic.save(TargetVideoDir + "mask-" + currentpict)
"""



"""				
		ListTempPictures = sorted(os.listdir(TargetVideoDir), reverse=False)
		for currentpict in ListTempPictures:
			PicOriBrightness = self.GetPictBrightness(TargetVideoDir + currentpict)			
			im = Image.open(TargetVideoDir + currentpict)
			picWidth, picHeight = im.size
			currentPictLoad = im.load()
			i = 0
			LoadScanPic = []
			for scanpic in self.SearchBeforeAfter(lambda x: x == str(currentpict), ListTempPictures, 5, 5):
				OpenScanPic = Image.open(TargetVideoDir + scanpic)
				LoadScanPic.append(OpenScanPic.load())
				print("Load Picture:" + str(scanpic))
				i = i + 1
			for x in range(0,picWidth):
				for y in range(0,picHeight):		
					AvgR = 0
					AvgG = 0
					AvgB = 0
					AvgBrightness = 0
					SrcBrightness = math.sqrt(0.241*(currentPictLoad[x,y][0]**2) + 0.691*(currentPictLoad[x,y][1]**2) + 0.068*(currentPictLoad[x,y][2]**2))
					for j in range(0, i):
						AvgR = AvgR + LoadScanPic[j][x,y][0]
						AvgG = AvgG + LoadScanPic[j][x,y][1]
						AvgB = AvgB + LoadScanPic[j][x,y][2]
						AvgBrightness = AvgBrightness + math.sqrt(0.241*(LoadScanPic[j][x,y][0]**2) + 0.691*(LoadScanPic[j][x,y][1]**2) + 0.068*(LoadScanPic[j][x,y][2]**2))
					AvgBrightness = int((AvgBrightness - SrcBrightness) / ( i - 1))
					BrightnessDiff = SrcBrightness - AvgBrightness
					if BrightnessDiff < 0:
						BrightnessDiff = BrightnessDiff * (-1)
					currentPictLoad[x, y] = (int(BrightnessDiff), int(BrightnessDiff), int(BrightnessDiff))	

#					if BrightnessDiff < 20 and BrightnessDiff > 2: # Peu de differences, on utilise la moyenne des pixels
#						AvgR = int(AvgR / i)
#						AvgG = int(AvgG / i)
#						AvgB = int(AvgB / i)
#					else: #Il y a une difference, on remplace par un pixel noir
#						AvgR = currentPictLoad[x,y][0]
#						AvgG = currentPictLoad[x,y][1]
#						AvgB = currentPictLoad[x,y][2]				
#					currentPictLoad[x, y] = (AvgR, AvgG, AvgB)
					
			self.Debug.Display(_("Video: %(VideoType)s: Deflicker, changing brightness of file %(currentpict)s ") % {'VideoType': self.CmdType, 'currentpict': currentpict} )	
			if v.getConfig('cfgdeflickerdebug') == "yesss":		
				if os.path.isfile(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"):
					os.remove(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg")
				print("Deflicker comparison: Cut Source File in half")
				convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, "-crop",  "50%x100%+0+0", self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"])														
				#PicNewBrightness = self.ChangePictureBrightness(TargetVideoDir + currentpict, TargetVideoDir + currentpict, str(TargetBrightness))		
				im.save(TargetVideoDir + currentpict)		
				print("Deflicker comparison: Add Picture on top of another")
				composite = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg","-compose", "over", "-composite",  TargetVideoDir + currentpict])
				print("Deflicker comparison: Add Legend")
				mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northwest fill black text 0,0 'Original' fill yellow text 3,0 'Original' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
				mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northeast fill black text 0,0 'Deflicker' fill yellow text 3,0 'Deflicker' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
			else:		
				im.save(TargetVideoDir + currentpict)
			PicEndBrightness = self.GetPictBrightness(TargetVideoDir + currentpict)				
			err = open(self.Cfgtmpdir + "/deflicker/deflicker-brightness.log","a+")
			err.write(str(currentpict) + "," + str(PicOriBrightness) + "," + str(PicEndBrightness) + "\n" )			
			err.close()

"""
					
"""					
					
		ListTempPictures = sorted(os.listdir(TargetVideoDir), reverse=True)
		for previouspict, currentpict, nextpict in self.PreviousAndNext(ListTempPictures):
			im = Image.open(TargetVideoDir + currentpict)
			picWidth, picHeight = im.size
			currentPictLoad = im.load()
			if previouspict != None:
				previousIm = Image.open(TargetVideoDir + previouspict)
				previousPictLoad = previousIm.load()
			if nextpict != None:
				nextIm = Image.open(TargetVideoDir + nextpict)
				nextPictLoad = nextIm.load()				
			for x in range(0,picWidth):
				for y in range(0,picHeight):
					xy = (x, y)
					#print("X: " + str(x) + " - Y: " + str(y))
					previousrgb = [0, 0, 0]
					nextrgb = [0, 0, 0]
					#currentrgb = currentPictLoad.getpixel(xy)	
					currentrgb = currentPictLoad[x, y]
					if previouspict != None:
						#previousrgb = previousPictLoad.getpixel(xy)
						previousrgb = previousPictLoad[x, y]
					if nextpict != None:
						#nextrgb = nextPictLoad.getpixel(xy)
						nextrgb = nextPictLoad[x, y]
					if nextpict == None or previouspict == None:
						AvgR = int((previousrgb[0] + currentrgb[0] + nextrgb[0]) / 2)
						AvgG = int((previousrgb[1] + currentrgb[1] + nextrgb[1]) / 2)
						AvgB = int((previousrgb[2] + currentrgb[2] + nextrgb[1]) / 2)
					else:
						AvgR = int((previousrgb[0] + currentrgb[0] + nextrgb[0]) / 3)
						AvgG = int((previousrgb[1] + currentrgb[1] + nextrgb[1]) / 3)
						AvgB = int((previousrgb[2] + currentrgb[2] + nextrgb[1]) / 3)
					
					currentPictLoad[x, y] = (AvgR, AvgG, AvgB)
			self.Debug.Display(_("Video: %(VideoType)s: Deflicker, changing brightness of file %(currentpict)s ") % {'VideoType': self.CmdType, 'currentpict': currentpict} )	
			if v.getConfig('cfgdeflickerdebug') == "yes":		
				if os.path.isfile(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"):
					os.remove(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg")
				print("Deflicker comparison: Cut Source File in half")
				convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, "-crop",  "50%x100%+0+0", self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"])														
				#PicNewBrightness = self.ChangePictureBrightness(TargetVideoDir + currentpict, TargetVideoDir + currentpict, str(TargetBrightness))		
				im.save(TargetVideoDir + currentpict)		
				print("Deflicker comparison: Add Picture on top of another")
				composite = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg","-compose", "over", "-composite",  TargetVideoDir + currentpict])
				print("Deflicker comparison: Add Legend")
				mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northwest fill black text 0,0 'Original' fill yellow text 3,0 'Original' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
				mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northeast fill black text 0,0 'Deflicker' fill yellow text 3,0 'Deflicker' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
			else:		
				im.save(TargetVideoDir + currentpict)
					
"""
#		for listpictfiles in sorted(os.listdir(TargetVideoDir), reverse=True):
#			im = Image.open(TargetVideoDir + listpictfiles)
#			picWidth, picHeight = img.size
#			for x in range(0,picWidth):
#				for y in range(0,picHeight):




"""
		data = []
		WINDOW = 10
		for listpictfiles in sorted(os.listdir(TargetVideoDir), reverse=True):
			data.append(self.GetPictBrightness(TargetVideoDir + listpictfiles))

		for dataloop in range(1,10):
			extended_data = np.hstack([[data[0]] * (WINDOW- 1), data])
			weightings = np.repeat(1.0, WINDOW) / WINDOW
			data = np.convolve(extended_data, weightings)[WINDOW-1:-(WINDOW-1)]				
		
#WINDOW = 10
#data = [1,2,3,4,5,5,5,5,5,5,5,5,5,5,5]
#extended_data = numpy.hstack([[data[0]] * (WINDOW- 1), data])
#weightings = numpy.repeat(1.0, WINDOW) / WINDOW
#numpy.convolve(extended_data, weightings)[WINDOW-1:-(WINDOW-1)]
		i=0
		ListTempPictures = sorted(os.listdir(TargetVideoDir), reverse=True)
		for previouspict, currentpict, nextpict in self.PreviousAndNext(ListTempPictures):
			#print "Item is now", currentpict, "next is", nextpict, "previous is", previouspict
			#if previouspict != None:
			#	PreviousPictBrightness = self.GetPictBrightness(TargetVideoDir + previouspict)
			#	print "Brightness: Previous: " + str(PreviousPictBrightness)
			#else:
			#	PreviousPictBrightness = 0
			CurrentPictBrightness = self.GetPictBrightness(TargetVideoDir + currentpict)
			#print "Brightness: Current: " + str(CurrentPictBrightness)
			#if nextpict != None:
			#	NextPictBrightness = self.GetPictBrightness(TargetVideoDir + nextpict)
			#	print "Brightness: Next: " + str(NextPictBrightness)
			#else:
			#	NextPictBrightness = 0
			#if nextpict == None or previouspict == None:
			#	AvgBrightness = round((PreviousPictBrightness + CurrentPictBrightness + NextPictBrightness) / 2, 4)
			#else:
			#	AvgBrightness = round((PreviousPictBrightness + CurrentPictBrightness + NextPictBrightness) / 3, 4)
			#print("Average Brightness = " + str(AvgBrightness))		

			AvgBrightness = round(data[i], 4)
			print("Average Brightness (numpy) = " + str(data[i]))

			i = i + 1
			if CurrentPictBrightness > AvgBrightness:
				Manip = "DECREASE"
			else:
				Manip = "INCREASE"
			
			#Identify Brightness value to be used
			TargetBrightness = self.IdentifyBrightness(TargetVideoDir + currentpict, AvgBrightness, CurrentPictBrightness, TargetVideoDir)
			PicNewBrightness = CurrentPictBrightness
			if TargetBrightness != "0":
				if v.getConfig('cfgdeflickerdebug') == "yes":
					if os.path.isfile(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"):
						os.remove(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg")
					print("Deflicker comparison: Cut Source File in half")
					convert = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, "-crop",  "50%x100%+0+0", self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"])														
					PicNewBrightness = self.ChangePictureBrightness(TargetVideoDir + currentpict, TargetVideoDir + currentpict, str(TargetBrightness))				
					self.Debug.Display(_("Video: %(VideoType)s: Deflicker, changing brightness of file %(currentpict)s from: %(CurrentPictBrightness)s to: %(PicNewBrightness)s (best: %(AvgBrightness)s)") % {'VideoType': self.CmdType, 'currentpict': currentpict, 'CurrentPictBrightness': CurrentPictBrightness, 'PicNewBrightness': PicNewBrightness, 'AvgBrightness': AvgBrightness} )
					print("Deflicker comparison: Add Picture on top of another")
					composite = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", TargetVideoDir + currentpict, self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg","-compose", "over", "-composite",  TargetVideoDir + currentpict])
					print("Deflicker comparison: Add Legend")
					mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northwest fill black text 0,0 'Original' fill yellow text 3,0 'Original' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
					mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northeast fill black text 0,0 'Deflicker' fill yellow text 3,0 'Deflicker' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])

					if os.path.isfile(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg"):
						os.remove(self.Cfgtmpdir + "/deflicker/deflicker-halforiginal.jpg")
				else:
					PicNewBrightness = self.ChangePictureBrightness(TargetVideoDir + currentpict, TargetVideoDir + currentpict, str(TargetBrightness))				
					self.Debug.Display(_("Video: %(VideoType)s: Deflicker, changing brightness of file %(currentpict)s from: %(CurrentPictBrightness)s to: %(PicNewBrightness)s (best: %(AvgBrightness)s)") % {'VideoType': self.CmdType, 'currentpict': currentpict, 'CurrentPictBrightness': CurrentPictBrightness, 'PicNewBrightness': PicNewBrightness, 'AvgBrightness': AvgBrightness} )
			else:
				if v.getConfig('cfgdeflickerdebug') == "yes":
					print("Deflicker comparison: Add Legend")
					mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northwest fill black text 0,0 'Original' fill yellow text 3,0 'Original' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
					mogrify = subprocess.check_call([self.G.getConfig('cfgmagickdir') + "convert", "-font", "Helvetica", "-pointsize", "50", "-draw", "gravity northeast fill black text 0,0 'Deflicker' fill yellow text 3,0 'Deflicker' ", TargetVideoDir + currentpict,  TargetVideoDir + currentpict])
				
						

			PicNewBrightness = self.GetPictBrightness(TargetVideoDir + currentpict)
			err = open(self.Cfgtmpdir + "/deflicker/deflicker-brightness.log","a+")
			err.write(str(currentpict) + "," + str(CurrentPictBrightness) + "," + str(AvgBrightness) + "," + str(Manip) + "," + str(PicNewBrightness) + "\n" )			
			err.close()
"""



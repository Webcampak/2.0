#!/usr/bin/env python

__author__ = 'WebCamPak'
__version__ = '0.01'
__date__ = '01/2011'

# dictionnaire des commandes disponibles
cmd_set_output = "setout" # set une sortie (1 logique)
cmd_get_output = "getout" # retourne l'etat de la sortie
cmd_clr_output = "clrout" # reset une sortie (0 logique)
cmd_get_intput = "getin"  # retourne l'etat de l'entree
cmd_get_ana = "getanalog"  # retourne la valeur analogique brute de l'entree analogique choisie
cmd_LCD_line1 = "LCD_1"   # ecrire sur la ligne 1 de l'afficheur LCD
cmd_LCD_line2 = "LCD_2"   # ecrire sur la ligne 2 de l'afficheur LCD
cmd_LCD_bcklight = "LCD_backlight"   # retro eclairage LCD on/off
cmd_LCD_contrast = "LCD_contrast"   # retro eclairage LCD on/off

#Famille de codes d'erreurs
#E00 a E29 : erreurs internes
#E30 a E49 : erreurs de commande des entrees sorties
#E50 a E69 : erreurs LCD


#Basic imports
from ctypes import *
import sys
from time import sleep
#Phidget specific imports
from Phidgets.PhidgetException import PhidgetErrorCodes, PhidgetException
from Phidgets.Events.Events import AttachEventArgs, DetachEventArgs, ErrorEventArgs
from Phidgets.Devices.TextLCD import TextLCD

#libraire pour les IO
from Phidgets.Devices.InterfaceKit import InterfaceKit

#Information Display Function
def DisplayLCDDeviceInfo():
	try:
		isAttached = textLCD.isAttached()
		name = textLCD.getDeviceName()
		serialNo = textLCD.getSerialNum()
		version = textLCD.getDeviceVersion()
		rowCount = textLCD.getRowCount()
		columnCount = textLCD.getColumnCount()
	except PhidgetException as e:
		print("Phidget Exception %i: %s" % (e.code, e.details))
		return 1
	print("--|------------|----------------------------------|--------------|------------|")
	print("--|- Attached -|-               Type             -|- Serial No. -|-  Version -|")
	print("--|------------|----------------------------------|--------------|------------|")
	print("--|- %8s -|- %30s -|- %10d -|- %8d -|" % (isAttached, name, serialNo, version))
	print("--|------------|----------------------------------|--------------|------------|")
	print("--Number of Rows: %i -- Number of Columns: %i" % (rowCount, columnCount))

#Event Handler Callback Functions
def TextLCDAttached(e):
	attached = e.device

def TextLCDDetached(e):
	detached = e.device

def TextLCDError(e):
	source = e.device
	print("ERREUR 12 : LCD %i: Phidget Error %i: %s" % (source.getSerialNum(), e.eCode, e.description))
# revoir la gestion des erreurs


#Information Display Function
def displayItDeviceInfo():
	print("--|------------|----------------------------------|--------------|------------|")
	print("--|- Attached -|-               Type             -|- Serial No. -|-  Version -|")
	print("--|------------|----------------------------------|--------------|------------|")
	print("--|- %8s -|- %30s -|- %10d -|- %8d -|" % (interfaceKit.isAttached(), interfaceKit.getDeviceName(), interfaceKit.getSerialNum(), interfaceKit.getDeviceVersion()))
	print("--|------------|----------------------------------|--------------|------------|")
	print("--Number of Digital Inputs: %i" % (interfaceKit.getInputCount()))
	print("--Number of Digital Outputs: %i" % (interfaceKit.getOutputCount()))
	print("--Number of Sensor Inputs: %i" % (interfaceKit.getSensorCount()))

#Event Handler Callback Functions
def inferfaceKitAttached(e):
	attached = e.device
	print("InterfaceKit %i Attached!" % (attached.getSerialNum()))

def interfaceKitDetached(e):
	detached = e.device
	print("InterfaceKit %i Detached!" % (detached.getSerialNum()))

def interfaceKitError(e):
	source = e.device
	print("InterfaceKit %i: Phidget Error %i: %s" % (source.getSerialNum(), e.eCode, e.description))

def interfaceKitInputChanged(e):
	source = e.device
	print("InterfaceKit %i: Input %i: %s" % (source.getSerialNum(), e.index, e.state))

def interfaceKitSensorChanged(e):
	source = e.device
	print("InterfaceKit %i: Sensor %i: %i" % (source.getSerialNum(), e.index, e.value))

def interfaceKitOutputChanged(e):
	source = e.device
	print("InterfaceKit %i: Output %i: %s" % (source.getSerialNum(), e.index, e.state))

#Main Program Code
nargs = len(sys.argv)

#verification du nombre d'arguments
if nargs <= 1:
	print("ERREUR 00 : usage : %s [-v] commande parametre1 [parametre2 ...]" % sys.argv[0])
	exit(1)

#determination de l'activation du debug
debug = 0
if sys.argv[1] == "-v":
	debug = 1
	if nargs <= 2:
		print("ERREUR 00 : usage : %s [-v] commande parametre1 [parametre2 ...]" % sys.argv[0])
		exit(1)

#capture des parametres
cmd = sys.argv[debug + 1]
if nargs>2+debug:
	param1 = sys.argv[debug + 2]

#test si commande d'activation d'une sortie logique
if cmd == cmd_set_output or cmd == cmd_clr_output or cmd == cmd_get_output or cmd == cmd_get_intput or cmd == cmd_get_ana :

	if nargs != 3+debug :
		print("ERREUR 01 : parametre manquant")
		exit(1)

	if debug == 1:
		if cmd == cmd_set_output :
			print("-- commande d'activation de sortie logique")
		elif cmd == cmd_clr_output :
			print("-- commande de desactivation de sortie logique")
		elif cmd == cmd_get_output :
			print("-- commande d'information de la sortie logique")
		elif cmd == cmd_get_intput :
			print("-- commande d'information de l'entree logique")
		elif cmd == cmd_get_ana:
			print("-- commande d'information sur l'entree analogique")

		if cmd == cmd_get_intput or cmd == cmd_get_ana :
			print("-- parametre du numero d'entree : %s" % param1)
		else :
			print("-- parametre du numero de sortie : %s" % param1)

	#Create an interfacekit object
	try:
		if debug == 1:
			print("-- creation de l'objet kit d'interface")
		interfaceKit = InterfaceKit()
	except RuntimeError as e:
		print("ERREUR 30 : impossible de creer l'objet kit d'interface (code %i, %s)" % (e.code, e.details))
		exit(1)

	try:
		if debug == 1:
			print("-- ouverture du kit d'interface")
		interfaceKit.openPhidget()
	except PhidgetException as e:
		print("ERREUR 31 : impossible d'ouvrir le kit d'interface (code %i, %s)" % (e.code, e.details))
		exit(1)

	try:
		if debug == 1:
			print("-- attachement au kit d'interface")
		interfaceKit.waitForAttach(10000)
	except PhidgetException as e:
		print("ERREUR 32 : impossible de se connecter au kit d'interface (code %i, %s)" % (e.code, e.details))
		try:
			if debug == 1:
				print("-- fermeture du kit d'interface")
			interfaceKit.closePhidget()
		except PhidgetException as e:
			print("ERREUR 33 : impossible de fermer le kit d'interface (code %i, %s)" % (e.code, e.details))
		exit(1)
	else:
		if debug == 1:
			displayItDeviceInfo()

	if cmd != cmd_get_intput and cmd != cmd_get_ana:
		noutput = 0
		try:
			noutput = interfaceKit.getOutputCount()
			if debug == 1:
				print("-- %d sorties disponibles" % noutput)
		except PhidgetException as e:
			print("ERREUR 34 : impossible de determiner le nombre de sorties du kit d'interface (code %i, %s)" % (e.code, e.details))
			exit(1)

		#verification de la validite du numero de sortie selectionnee (le parametre est un entier)
		try:
			output = int(param1)
		except:
			print("ERREUR 02 : numero entier de sortie attendu (%s)" % param1)
			if debug == 1:
				print("-- impossible de convertir le numero de sortie %s en entier" % param1)
			exit(1)
			
		#verification de la validite du numero de sortie selectionnee (l'entier doit etre entre 0 et noutput)
		if output >= 0 and output < noutput:
			if cmd != cmd_get_output:
				try:
					if cmd == cmd_set_output:
						if debug == 1:
							print("-- set sortie %i" % output)
						interfaceKit.setOutputState(output, 1)
					else:
						if debug == 1:
							print("-- raz sortie %i" % output)
						interfaceKit.setOutputState(output, 0)
				except PhidgetException as e:
					print("ERREUR 35 : impossible d'affecter l'etat a la sortie (code %i, %s)" % (e.code, e.details))
					exit(1)
			else :
				try:
					outputlevel = interfaceKit.getOutputState(output)
					print("etat:%d" % outputlevel)
				except PhidgetException as e:
					print("ERREUR 36 : impossible d'obtenir l'etat de la sortie (code %i, %s)" % (e.code, e.details))
					exit(1)
		else:
			print("ERREUR 37 : sortie %i non disponible" % output)
			exit(1)
	else:
		if cmd == cmd_get_intput:
			ninput = 0
			try:
				ninput = interfaceKit.getInputCount()
				if debug == 1:
					print("-- %d entrees disponibles" % ninput)
			except PhidgetException as e:
				print("ERREUR 38 : impossible de determiner le nombre d'entrees du kit d'interface (code %i, %s)" % (e.code, e.details))
				exit(1)

			#verification de la validite du numero d'entree selectionnee (le parametre est un entier)
			try:
				input = int(param1)
			except:
				print("ERREUR 02 : numero entier d'entree attendu (%s)" % param1)
				if debug == 1:
					print("-- impossible de convertir le numero d'entree %s en entier" % param1)
				exit(1)
				
			#verification de la validite du numero de sortie selectionnee (l'entier doit etre entre 0 et ninput)
			if input >= 0 and input < ninput:
				try:
					inputlevel = interfaceKit.getInputState(input)
					print("etat:%d" % inputlevel)
				except PhidgetException as e:
					print("ERREUR 39 : impossible d'obtenir l'etat de l'entree (code %i, %s)" % (e.code, e.details))
					exit(1)
			else:
				print("ERREUR 40 : entree %i non disponible" % input)
				exit(1)
		else:
			ninput = 0
			try:
				ninput = interfaceKit.getSensorCount()
				if debug == 1:
					print("-- %d entrees analogiques disponibles" % ninput)
			except PhidgetException as e:
				print("ERREUR 42 : impossible de determiner le nombre d'entrees du kit d'interface (code %i, %s)" % (e.code, e.details))
				exit(1)

			#verification de la validite du numero d'entree selectionnee (le parametre est un entier)
			try:
				input = int(param1)
			except:
				print("ERREUR 02 : numero entier d'entree attendu (%s)" % param1)
				if debug == 1:
					print("-- impossible de convertir le numero d'entree %s en entier" % param1)
				exit(1)
				
			#verification de la validite du numero de sortie selectionnee (l'entier doit etre entre 0 et ninput)
			if input >= 0 and input < ninput:
				try:
					inputlevel = interfaceKit.getSensorRawValue(input)
					print("%d" % inputlevel)
				except PhidgetException as e:
					print("ERREUR 43 : impossible d'obtenir l'etat de l'entree analogique (code %i, %s)" % (e.code, e.details))
					exit(1)
			else:
				print("ERREUR 44 : entree %i non disponible" % input)
				exit(1)
	#fermeture du phidget
	try:
		if debug == 1:
			print("-- detachement du phidget")
		interfaceKit.closePhidget()
	except PhidgetException as e:
		print("ERREUR 41 : impossible de fermer le phidget (code %i, %s)" % (e.code, e.details))

##test si commande LCD
elif cmd == cmd_LCD_line1 or cmd == cmd_LCD_line2 or cmd == cmd_LCD_bcklight or cmd == cmd_LCD_contrast :

	if nargs != 3+debug :
		print("ERREUR 01 : parametre manquant")
		exit(1)

	#creation d'un objet LCD
	try:
		if debug == 1:
			print("-- creation de l'objet LCD")
		textLCD = TextLCD()
	except RuntimeError as e:
		print("ERREUR 50 : impossible de creer l'objet LCD (%s)" % e.details)
		exit(1)

	#enregistrement des handlers
	# try:
		# if debug == 1:
			# print("-- connection des handlers pour le LCD")
		# textLCD.setOnAttachHandler(TextLCDAttached)
		# textLCD.setOnDetachHandler(TextLCDDetached)
		# textLCD.setOnErrorhandler(TextLCDError)
	# except PhidgetException as e:
		# print("ERREUR 05 impossible d'attaches les handler (code %i, %s)" % (e.code, e.details))
		# exit(1)	

	#ouverture du LCD
	try:
		if debug == 1:
			print("-- ouverture du phidget")
		textLCD.openPhidget()
	except PhidgetException as e:
		print("ERREUR 51 : impossible d'ouvrir la connection avec le LCD (code %i, %s)" % (e.code, e.details))
		exit(1)

	#attachement au phidget
	try:
		if debug == 1:
			print("-- attachement au phidget")
		textLCD.waitForAttach(10000)
	except PhidgetException as e:
		print("ERREUR 52 : impossible de s'attacher avec le LCD (code %i, %s)" % (e.code, e.details))
		try:
			if debug == 1:
				print("-- detachement du phidget")
			textLCD.closePhidget()
		except PhidgetException as e:
			print("ERREUR 53 : impossible de fermer le phidget (code %i, %s)" % (e.code, e.details))
		exit(1)
	else:
		if debug == 1:
			DisplayLCDDeviceInfo()

	#interpretation de la commande
	if cmd == cmd_LCD_line1:			
		try:
			if debug == 1:
				print("-- ecriture sur ligne 1 du LCD de : %s" % param1)
			textLCD.setDisplayString(0, param1)
		except PhidgetException as e:
			print("ERREUR 54 : impossible d'ecrire sur le LCD (code %i, %s)" % (e.code, e.details))
			exit(1)
	elif cmd == cmd_LCD_line2:
		try:
			if debug == 1:
				print("-- ecriture sur ligne 2 du LCD de : %s" % param1)
			textLCD.setDisplayString(1, param1)
		except PhidgetException as e:
			print("ERREUR 55 : impossible d'ecrire sur le LCD (code %i, %s)" % (e.code, e.details))
			exit(1)
	elif cmd == cmd_LCD_bcklight:
		#verification de la validite de l'etat du parametre de retroeclairage (le parametre est un entier)
		try:
			bckState = int(param1)
		except:
			print("ERREUR 02 : entier attendu (%s)" % param1)
			if debug == 1:
				print("-- impossible de convertir la commande de retroeclairage %s en entier" % param1)
			exit(1)
			
		#verification de la valeur
		if bckState == 0 :
			try:
				if debug == 1:
					print("-- extinction du retroeclarairage")
				textLCD.setBacklight(False)
			except PhidgetException as e:
				print("ERREUR 56 : impossible d'eteindre le retroeclairage (code %i, %s)" % (e.code, e.details))
				exit(1)
		elif bckState == 1:
			try:
				if debug == 1:
					print("-- allumage du retroeclarairage")
				textLCD.setBacklight(True)
			except PhidgetException as e:
				print("ERREUR 57 : impossible d'allumer le retroeclairage (code %i, %s)" % (e.code, e.details))
				exit(1)
		else:
			print ("ERREUR 58 : parametre de commande du retroeclairage invalide (attendu 0 ou 1)")
	else: 
		#contraste
		#verification de la validite de l'etat du parametre de retroeclairage (le parametre est un entier)
		try:
			contrast = int(param1)
		except:
			print("ERREUR 02 : entier attendu (%s)" % contrast)
			if debug == 1:
				print("-- impossible de convertir la commande de contraste %s en entier" % param1)
			exit(1)
			
		#verification de la valeur
		if contrast >= 0 and contrast <= 255:
			try:
				if debug == 1:
					print("-- mise a jour du contrast : %d" % contrast)
				textLCD.setContrast(contrast)
			except PhidgetException as e:
				print("ERREUR 59 : impossible d'ajuster le contraste (code %i, %s)" % (e.code, e.details))
				exit(1)
		else:
			print("ERREUR 60 : valeur de contraste %d invalide (attentdu dans [0;255])" % contrast)
			
		

	#fermeture du phidget
	try:
		if debug == 1:
			print("-- detachement du phidget")
		textLCD.closePhidget()
	except PhidgetException as e:
		print("ERREUR 61 : impossible de fermer le phidget (code %i, %s)" % (e.code, e.details))
else:
	print("ERREUR 03 : commande %s inconnue" % cmd)
	exit(1)


exit(0)
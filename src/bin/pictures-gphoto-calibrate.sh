#!/bin/bash
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
 

cfgbasedir="/home/tmpusername/webcampak/";	# Configuration du répertoire de base du script

#Chargement de la configuration generale
. ${cfgbasedir}etc/config-general.cfg
#Chargement de la configuration specifique a la source 
. ${cfgetcdir}config-source${cfgsourceid}.cfg

#logtag=${logdate}" - "${cfgsourcetype}"("${cfgsourceid}"):"
logtag=" - "${cfgsourcetype}"("${cfgsourceid}"):"

echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto - Calibrate: Creation du répertoire de stockage des parametres" >> ${cfglogdir}${logcapturename}.log
mkdir ${cfgetcdir}source${cfgsourceid}

# Si c'est un sample, désactive le stockage et l'upload de la photo.
parameter=${2}
if [ "$parameter" = "init" ] || [ "$parameter" = "refresh" ] ; then
	echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto - Calibrate: Suppression des valeurs précédentes" >> ${cfglogdir}${logcapturename}.log
	mkdir ${cfgetcdir}source${cfgsourceid}/old
	mv ${cfgetcdir}source${cfgsourceid}/_* ${cfgetcdir}source${cfgsourceid}/old/
	mv ${cfgetcdir}source${cfgsourceid}/cameraparameters ${cfgetcdir}source${cfgsourceid}/old/
	mv ${cfgetcdir}source${cfgsourceid}/gphotoapply ${cfgetcdir}source${cfgsourceid}/old/
	rm ${cfgetcdir}source${cfgsourceid}/_*
	rm ${cfgetcdir}source${cfgsourceid}/cameraparameters
	rm ${cfgetcdir}source${cfgsourceid}/gphotoapply
	rm ${cfgetcdir}source${cfgsourceid}/tmpresult	
	echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto - Calibrate: Obtention de la liste des paramètres et de leurs valeurs" >> ${cfglogdir}${logcapturename}.log
	# Si on specifie le modele d appareil photo
   if [ "$cfgcfgsourcegphotocameramodel" != "no" ] ; then
		gphotocameracommand="--camera="\"${cfgcfgsourcegphotocameramodel}\"
	#"	   
   fi
   if [ "$cfgsourcegphotocameraportdetail" != "automatic" ] ; then
		#gphotoportcommand="--port="\"${cfgsourcegphotocameraportdetail}\"
		gphotoportcommand="--port ${cfgsourcegphotocameraportdetail} "
   fi
   #"	
	if [ "$cfgsourcedebug" = "yes" ] ; then
		gphoto2 ${gphotocameracommand} ${gphotoportcommand} --debug --debug-logfile=${cfglogdir}${logcapturename}.log --list-config > ${cfgetcdir}source${cfgsourceid}/cameraparameters
	else
		gphoto2 ${gphotocameracommand} ${gphotoportcommand} --list-config > ${cfgetcdir}source${cfgsourceid}/cameraparameters	
	fi
	exec 3<${cfgetcdir}source${cfgsourceid}/cameraparameters
	while read j 0<&3
	do
		echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto - Calibrate: Parametre ${j}" >> ${cfglogdir}${logcapturename}.log
		echo ${j//\//_}
		if [ "$cfgsourcedebug" = "yes" ] ; then		
			gphoto2 ${gphotocameracommand} ${gphotoportcommand} --debug --debug-logfile=${cfglogdir}${logcapturename}.log --get-config ${j} > ${cfgetcdir}source${cfgsourceid}/${j//\//_}
		else
			gphoto2 ${gphotocameracommand} ${gphotoportcommand} --get-config ${j} > ${cfgetcdir}source${cfgsourceid}/${j//\//_}		
		fi
		echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto - Calibrate: Enregistre dans: ${cfgetcdir}source${cfgsourceid}/${j//\//_}" >> ${cfglogdir}${logcapturename}.log
	done
	#VERIFICATION DU SUCCES DU PROCESS
	scanfilesize=$(stat -c%s "${cfgetcdir}source${cfgsourceid}/cameraparameters")
	scannblignes=$(sed -n '$=' ${cfgetcdir}source${cfgsourceid}/cameraparameters)
	cd ${cfgetcdir}source${cfgsourceid}/
	ls _* > ${cfgetcdir}source${cfgsourceid}/tmpresult
	scannbfiles=$(sed -n '$=' ${cfgetcdir}source${cfgsourceid}/tmpresult)
	if [ "$scannblignes" = "$scannbfiles" ] ; then
		echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto - Calibrate: Téléchargement réussit ${scannblignes} = ${scannbfiles}" >> ${cfglogdir}${logcapturename}.log
		cd ..
		rm ${cfgetcdir}source${cfgsourceid}/old/*
		rmdir ${cfgetcdir}source${cfgsourceid}/old/ 
	else
		echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto - Calibrate: Echec Téléchargement: Mismatch entre ${scannblignes} et ${scannbfiles}" >> ${cfglogdir}${logcapturename}.log
	 	cd ..
		rm ${cfgetcdir}source${cfgsourceid}/_*
		rm ${cfgetcdir}source${cfgsourceid}/cameraparameters
		rm ${cfgetcdir}source${cfgsourceid}/gphotoapply
		rm ${cfgetcdir}source${cfgsourceid}/tmpresult	
		mv ${cfgetcdir}source${cfgsourceid}/old/_* ${cfgetcdir}source${cfgsourceid}/
		mv ${cfgetcdir}source${cfgsourceid}/old/cameraparameters ${cfgetcdir}source${cfgsourceid}/
		mv ${cfgetcdir}source${cfgsourceid}/old/gphotoapply ${cfgetcdir}source${cfgsourceid}/	
	fi
fi
if [ "$parameter" = "restartconf" ] ; then
	   echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto ---> Démarrage Calibrage initial" >> ${cfglogdir}${logcapturename}.log
		# Si on specifie le modele d appareil photo
	   if [ "$cfgsourcegphotocamera" = "yes" ] ; then
			gphotocameracommand="--camera="\"${cfgcfgsourcegphotocameramodel}\"
		#"	   
	   fi
	   if [ "$cfgsourcegphotocameraport" = "yes" ] ; then
			gphotoportcommand="--port="\"${cfgsourcegphotocameraportdetail}\"
	   fi
	   #"	
	   if [ "$cfgsourcegphotocalibration" = "yes" ] ; then
	   	if [ -f ${cfgetcdir}source${cfgsourceid}/gphotoapply ]; then
	  			exec 3<${cfgetcdir}source${cfgsourceid}/gphotoapply
	  			#gphotocalibration="--set-config "
				while read gcal 0<&3
				do
					gphotocalibration=${gphotocalibration}" --set-config "${gcal//_/\/}
				done
	   		echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto ---> Parametres additionels: ${gphotocalibration}" >> ${cfglogdir}${logcapturename}.log
			fi
	   fi 
	   if [ "$cfgsourcedebug" = "yes" ] ; then
	   	/usr/bin/gphoto2 --capture-image-and-download --debug --debug-logfile=${cfglogdir}${logcapturename}.log ${gphotocameracommand} ${gphotoportcommand} ${gphotocalibration} --filename /tmp/calibrageinit.jpg
	   else
	   	/usr/bin/gphoto2 --capture-image-and-download ${gphotocameracommand} ${gphotoportcommand} ${gphotocalibration} --filename /tmp/calibrageinit.jpg
	   fi	    
fi
if [ "$parameter" = "rebootconf" ] || [ "$cfgsourcegphotocalibration" = "yes" ] ; then
	   echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto ---> Démarrage Calibrage initial" >> ${cfglogdir}${logcapturename}.log
		# Si on specifie le modele d appareil photo
	   if [ "$cfgsourcegphotocamera" = "yes" ] ; then
			gphotocameracommand="--camera="\"${cfgcfgsourcegphotocameramodel}\"
		#"	   
	   fi
	   if [ "$cfgsourcegphotocameraport" = "yes" ] ; then
			gphotoportcommand="--port="\"${cfgsourcegphotocameraportdetail}\"
	   fi
	   #"	
	   if [ "$cfgsourcegphotocalibration" = "yes" ] ; then
	   	if [ -f ${cfgetcdir}source${cfgsourceid}/gphotoapply ]; then
	  			exec 3<${cfgetcdir}source${cfgsourceid}/gphotoapply
	  			#gphotocalibration="--set-config "
				while read gcal 0<&3
				do
					gphotocalibration=${gphotocalibration}" --set-config "${gcal//_/\/}
				done
	   		echo "$(date +'%d %B %Y - %k:%M')${logtag} Gphoto ---> Parametres additionels: ${gphotocalibration}" >> ${cfglogdir}${logcapturename}.log
			fi
	   fi 
	   if [ "$cfgsourcedebug" = "yes" ] ; then
	   	/usr/bin/gphoto2 --capture-image-and-download --debug --debug-logfile=${cfglogdir}${logcapturename}.log ${gphotocameracommand} ${gphotoportcommand} ${gphotocalibration} --filename /tmp/calibrageinit.jpg
	   else
	   	/usr/bin/gphoto2 --capture-image-and-download ${gphotocameracommand} ${gphotoportcommand} ${gphotocalibration} --filename /tmp/calibrageinit.jpg
	   fi	    
fi
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

# Script used to package webcampak for release.
scriptdirectory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${scriptdirectory}/../../../
basepath="/usr/lib/lightdm/lightdm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games"
sencha2dir="$(pwd)/SenchaSDK3/Sencha/Cmd/2.0.0b3"
sencha3dir="$(pwd)/SenchaSDK3/Sencha/Cmd/3.0.2.288"
cd ${scriptdirectory}/../../
webcampakbasedir=$(pwd)/

echo "$(date +'%d %B %Y - %k:%M') xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo "$(date +'%d %B %Y - %k:%M') |             Welcome to Webcampak 2.0 Packaging Script               |"
echo "$(date +'%d %B %Y - %k:%M') xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo "$(date +'%d %B %Y - %k:%M') |                                                                     |"
echo "$(date +'%d %B %Y - %k:%M') | - You will need to install Sencha SDK manually (www.sencha.com)     |"
echo "$(date +'%d %B %Y - %k:%M') | - v2.0.0 beta 3 for extjs, v3 for touch2                            |"
echo "$(date +'%d %B %Y - %k:%M') |                                                                     |"
echo "$(date +'%d %B %Y - %k:%M') xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo "$(date +'%d %B %Y - %k:%M') Actual script directory: ${scriptdirectory}"
echo "$(date +'%d %B %Y - %k:%M') Webcampak base directory: ${webcampakbasedir}"

echo "$(date +'%d %B %Y - %k:%M') Locales: PHP: Starting process"
echo "$(date +'%d %B %Y - %k:%M') Locales: PHP: Finding PHP gettext lines"
find ${webcampakbasedir}www/interface/ -name *.php > ./webcampak-remote.txt
echo "$(date +'%d %B %Y - %k:%M') Locales: PHP: Building PHP gettext POT file"
xgettext -f ./webcampak-remote.txt -o ${webcampakbasedir}locale/webcampak-remote.pot
rm ./webcampak-remote.txt
echo "$(date +'%d %B %Y - %k:%M') Locales: PHP: done ...."

echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Starting process"
echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Finding Javascript gettext lines"
find ${webcampakbasedir}www/interface/dev/app/ -name *.js > ./webcampak-interface.txt
find ${webcampakbasedir}www/mobile/dev/app/ -name *.js > ./webcampak-mobile.txt
echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Building Javascript gettext POT file (using Python parser)"
xgettext -L Python --from-code UTF-8 -f ./webcampak-interface.txt -o ${webcampakbasedir}locale/webcampak-interface.pot #We use Python parser to parse javascript
xgettext -L Python --from-code UTF-8 -f ./webcampak-mobile.txt -o ${webcampakbasedir}locale/webcampak-mobile.pot #We use Python parser to parse javascript
rm ./webcampak-mobile.txt
rm ./webcampak-interface.txt
echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Ensure you updated your po files  (i.e. with poedit)..."
read localesvalidation
echo "$(date +'%d %B %Y - %k:%M') Locales: Would you like to replace JSON local files (only if new text has been added) ?"
echo "$(date +'%d %B %Y - %k:%M') Locales: [X]-Exit [N]-No [Y]-Yes"
read rebuildjson
if [ "$rebuildjson" = "X" ] ; then
	exit;
elif [ "$rebuildjson" = "Y" ] ; then
	cd ${scriptdirectory}
	echo -n "var json_locale_data = " > ${webcampakbasedir}locale/fr_FR.utf8/LC_MESSAGES/webcampak-interface.json
	./po2json -p ${webcampakbasedir}locale/fr_FR.utf8/LC_MESSAGES/webcampak-interface.po >> ${webcampakbasedir}locale/fr_FR.utf8/LC_MESSAGES/webcampak-interface.json
	echo ";" >> ${webcampakbasedir}locale/fr_FR.utf8/LC_MESSAGES/webcampak-interface.json
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Building Javascript JSON file based upon .po file: FRENCH interface done ...."
	echo -n "var json_locale_data = " > ${webcampakbasedir}locale/fr_FR.utf8/LC_MESSAGES/webcampak-mobile.json
	./po2json -p ${webcampakbasedir}locale/fr_FR.utf8/LC_MESSAGES/webcampak-mobile.po >> ${webcampakbasedir}locale/fr_FR.utf8/LC_MESSAGES/webcampak-mobile.json
	echo ";" >> ${webcampakbasedir}locale/fr_FR.utf8/LC_MESSAGES/webcampak-mobile.json
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Building Javascript JSON file based upon .po file: FRENCH mobile done ...."

	echo -n "var json_locale_data = " > ${webcampakbasedir}locale/pt_BR.utf8/LC_MESSAGES/webcampak-interface.json
	./po2json -p ${webcampakbasedir}locale/pt_BR.utf8/LC_MESSAGES/webcampak-interface.po >> ${webcampakbasedir}locale/pt_BR.utf8/LC_MESSAGES/webcampak-interface.json
	echo ";" >> ${webcampakbasedir}locale/pt_BR.utf8/LC_MESSAGES/webcampak-interface.json
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Building Javascript JSON file based upon .po file: PORTUGUESE interface done ...."
	echo -n "var json_locale_data = " > ${webcampakbasedir}locale/pt_BR.utf8/LC_MESSAGES/webcampak-mobile.json
	./po2json -p ${webcampakbasedir}locale/pt_BR.utf8/LC_MESSAGES/webcampak-mobile.po >> ${webcampakbasedir}locale/pt_BR.utf8/LC_MESSAGES/webcampak-mobile.json
	echo ";" >> ${webcampakbasedir}locale/pt_BR.utf8/LC_MESSAGES/webcampak-mobile.json
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Building Javascript JSON file based upon .po file: PORTUGUESE mobile done ...."
	
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: done ...."
	
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: Generated JSON files are not properly generated, and a manual action is required"
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: 1/ Open locale/fr_FR.utf8/LC_MESSAGES/webcampak-interface.json with a text editor"
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: 2/ Remove the second line (\"webcampak-interface\" : {)"
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: 3/ Remove the third to last line (})"		
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: 4/ Save"
	echo "$(date +'%d %B %Y - %k:%M') Locales: JS: 5/ Repeat the same operation for webcampak-mobile.json"				
	read rebuildjson
fi


echo "$(date +'%d %B %Y - %k:%M') Cleaning: Starting cleaning process"
echo "$(date +'%d %B %Y - %k:%M') Cleaning: Removing all backup files (~)"
find ${webcampakbasedir} -name '*~' | xargs rm
echo "$(date +'%d %B %Y - %k:%M') Cleaning: Removing all temporary files (*.php.* *.php-* *.js.* *.js-* *.sh.* *.sh-*)"
find ${webcampakbasedir} -name '*.php.*' | xargs rm
find ${webcampakbasedir} -name '*.php-*' | xargs rm
find ${webcampakbasedir} -name '*.js.*' | xargs rm
find ${webcampakbasedir} -name '*.js-*' | xargs rm
find ${webcampakbasedir} -name '*.sh.*' | xargs rm
find ${webcampakbasedir} -name '*.sh-*' | xargs rm
find ${webcampakbasedir} -name '*.goutputstream-*' | xargs rm
echo "$(date +'%d %B %Y - %k:%M') Cleaning: Done ..."

echo "$(date +'%d %B %Y - %k:%M') Web interface: Starting process"
echo "$(date +'%d %B %Y - %k:%M') Web interface: Would you like to rebuild WEB apps ?"
echo "$(date +'%d %B %Y - %k:%M') Web interface: [X]-Exit [N]-No [Y]-Yes"
read rebuildapps
if [ "$rebuildapps" = "X" ] ; then
	exit;
elif [ "$rebuildapps" = "Y" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') Web interface: Preparing environment ..."
	echo "$(date +'%d %B %Y - %k:%M') Web interface: The system need to connect to Webcampak's web server"
	echo "$(date +'%d %B %Y - %k:%M') Web interface: Enter username, password and IP address using this exact syntax: username:password@IPADDRESS"
	echo "$(date +'%d %B %Y - %k:%M') Example: root:webcampak@192.168.1.50"
	read wpakdevdirectory
	sed -i "s/wpakdevdirectory/${wpakdevdirectory}/" ${webcampakbasedir}www/mobile/dev/app.json
	cd ${webcampakbasedir}
	ln -sfn www ${wpakdevdirectory}

	echo "$(date +'%d %B %Y - %k:%M') Web interface: Desktop: Preparing environment ..."
	echo "$(date +'%d %B %Y - %k:%M') Web interface: Desktop: Would you like to build the DESKTOP application ?"
	echo "$(date +'%d %B %Y - %k:%M') Web interface: Desktop: [X]-Exit [N]-No [Y]-Yes"	
	read replaceprod
	if [ "$replaceprod" = "X" ] ; then
		exit;
	elif [ "$replaceprod" = "Y" ] ; then	
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Resetting PATH ..."	
		PATH=${basepath}	
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Adding Sencha SDK v2 to PATH ..."	
		PATH=$PATH:${sencha2dir}		
		cd ${webcampakbasedir}www/interface/dev/
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Desktop: Would you like to re-build jsb3 file ?"
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Desktop: [X]-Exit [N]-No [Y]-Yes"		
		read rebuildjsb		
		if [ "$replaceprod" = "X" ] ; then
			exit;
		elif [ "$replaceprod" = "Y" ] ; then						
			rm app.jsb3	
			sencha create jsb -a http://${wpakdevdirectory}/interface/dev/index.html -p app.jsb3
		fi
		sencha build -p app.jsb3 -d .
	fi
	echo "$(date +'%d %B %Y - %k:%M') Web interface: Desktop: You can now test Webcampak application using index-val.html ..."
	echo "$(date +'%d %B %Y - %k:%M') Web interface: Desktop: Would you like to replace prod files with val files (i.e. publish latest modifications)"
	echo "$(date +'%d %B %Y - %k:%M') Web interface: [X]-Exit [N]-No [Y]-Yes"
	read replaceprod
	if [ "$replaceprod" = "X" ] ; then
		exit;
	elif [ "$replaceprod" = "Y" ] ; then	
		cp ${webcampakbasedir}www/interface/dev/app-all.js ${webcampakbasedir}www/interface/
	fi

	echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Would you like to build the MOBILE application ?"
	echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: [X]-Exit [N]-No [Y]-Yes"	
	read replaceprod
	if [ "$replaceprod" = "X" ] ; then
		exit;
	elif [ "$replaceprod" = "Y" ] ; then	
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Resetting PATH ..."	
		PATH=${basepath}	
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Adding Sencha SDK v3 to PATH ..."	
		PATH=$PATH:${sencha3dir}		
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Preparing environment ...done"
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Recompiling SASS files ..."
		cd ${webcampakbasedir}www/mobile/dev/resources/sass/
		compass compile
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Recompiling SASS files ...done"
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Building testing app ..."
		cd ${webcampakbasedir}www/mobile/dev/
		sencha app build testing
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Building testing app ...done"
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Building production app ..."
		cd ${webcampakbasedir}www/mobile/dev/
		sencha app build production
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Building production app ...done"
		cd ${webcampakbasedir}
		rm ${wpakdevdirectory}
		sed -i "s/${wpakdevdirectory}/wpakdevdirectory/" ${webcampakbasedir}www/mobile/dev/app.json		
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Would you like to replace the current running version with production app ?"
		echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: [X]-Exit [N]-No [Y]-Yes"
		read replaceprod
		if [ "$replaceprod" = "X" ] ; then
			exit;
		elif [ "$replaceprod" = "Y" ] ; then
			echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Installation of newly compiled app ..."
			echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Removing previous installation ..."	
			rm ${webcampakbasedir}www/mobile/*.js
			rm ${webcampakbasedir}www/mobile/*.json
			rm ${webcampakbasedir}www/mobile/cache.manifest
			rm ${webcampakbasedir}www/mobile/cache.manifest
			rm ${webcampakbasedir}www/mobile/*.html
			rm ${webcampakbasedir}www/mobile/*.css
			rm ${webcampakbasedir}www/mobile/sdk/ -r
			rm ${webcampakbasedir}www/mobile/deltas/ -r
			rm ${webcampakbasedir}www/mobile/images/ -r	
			rm ${webcampakbasedir}www/mobile/resources/ -r
			echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Removing previous installation ... done"		
			echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Installing new production app  ..."		
			cp ${webcampakbasedir}www/mobile/dev/build/WebcampakMobile/production/* ${webcampakbasedir}www/mobile/ -R
			cp ${webcampakbasedir}www/mobile/dev/images ${webcampakbasedir}www/mobile/ -R	
			echo "$(date +'%d %B %Y - %k:%M') Web interface: Mobile: Installing new production app  ... done"			
		fi
	fi
	cd ${webcampakbasedir}	
	rm ${wpakdevdirectory}
	rm ${webcampakbasedir}www/interface/dev/app.jsb3
fi



echo "$(date +'%d %B %Y - %k:%M') Package: What is the software version ? (for example: 2.0-b01)"
echo "$(date +'%d %B %Y - %k:%M') Package: Date will be appended automatically"
read softwareversion
currentdate=$(date +'%Y%m%d%H%M')
if [ "$softwareversion" != "" ] ; then
	echo "${softwareversion}-${currentdate}" > ${webcampakbasedir}version
	echo "$(date +'%d %B %Y - %k:%M') Package: Remove all unnecessary files"
	echo "$(date +'%d %B %Y - %k:%M') Package: Press enter when ready"			
	read tarwebcampak	
	tar -pvczf ${webcampakbasedir}../webcampak-v${softwareversion}-${currentdate}.tar.gz ${webcampakbasedir}../webcampak2
fi


# TO DO
# - Add instructions to configure locales, otherwise app will not be translated
# - Do not forget to implement slideshow.php and fullscreen.php


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

echo "$(date +'%d %B %Y - %k:%M') xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo "$(date +'%d %B %Y - %k:%M') |            Welcome to Webcampak 2.0 Installation Script             |"
echo "$(date +'%d %B %Y - %k:%M') xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo "$(date +'%d %B %Y - %k:%M') /!\             Do not start this script as root                   /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\             --------------------------------                   /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\                                                                /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\     This script has been created to run on a fresh             /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\     Ubuntu server installation.                                /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\                                                                /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\ Some manual actions will be required during execution          /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\ Action ==> Action to be done                                   /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\  corresponds to a manual action to be done                     /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\ Action: #> command                                             /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\  corresponds to a command to be manually entered in a terminal /!\ "
echo "$(date +'%d %B %Y - %k:%M') /!\                                                                /!\ "
echo "$(date +'%d %B %Y - %k:%M') xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
echo "$(date +'%d %B %Y - %k:%M') "
scriptdirectory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
nbsources=1
if [ "$(whoami)" = "root" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') Warning: Do not run installation script as root, exiting ...."
	exit 0
else
	sysusername=$(whoami)
	echo "$(date +'%d %B %Y - %k:%M') You are currently connected as: $(whoami)"	
	cd /home/${sysusername}/
fi

echo "$(date +'%d %B %Y - %k:%M') System: Installation of a command line text editor (jed)"
sudo apt-get install jed

echo "$(date +'%d %B %Y - %k:%M') System: Action ==> Open /etc/apt/sources.list file (as root, or with sudo)"
echo "$(date +'%d %B %Y - %k:%M') System: Action ==> Uncomment backports and partners repositories"
read 

echo "$(date +'%d %B %Y - %k:%M') System: Distribution upgrade"
echo "$(date +'%d %B %Y - %k:%M') Systeme: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "s" ] ; then	
	echo "$(date +'%d %B %Y - %k:%M') Skipping stage ..."
else
	echo "$(date +'%d %B %Y - %k:%M') #> sudo apt-get update"	
	sudo apt-get update --assume-yes
	echo "$(date +'%d %B %Y - %k:%M') #> sudo apt-get dist-upgrade"	
	sudo apt-get dist-upgrade --assume-yes
fi

echo "$(date +'%d %B %Y - %k:%M') System: Software and dependencies installation"
echo "$(date +'%d %B %Y - %k:%M') System: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	sudo apt-get update
	echo "$(date +'%d %B %Y - %k:%M') #> sudo apt-get install python-imaging python-opencv libpuzzle-bin rrdtool python-rrdtool mpgtx wget wput xawtv gphoto2 vsftpd vlc imagemagick apache2 php5 openvpn openssl php5-cli libapache2-mod-php5 lftp mencoder ffmpeg x264 db4.7-util openvpn wput heirloom-mailx python-gdata links vsftpd unzip h264enc php5-gd libavcodec-unstripped-52 libavcodec-extra-52 atomicparsley php5-mysql mysql-server jpeginfo libapache2-mod-auth-mysql pwgen"	
	echo "$(date +'%d %B %Y - %k:%M') System: You will have to define Mysql root password"
	read
	echo "$(date +'%d %B %Y - %k:%M') System: Installation of python and dependancies"	
	sudo apt-get install --assume-yes python-imaging python-opencv libpuzzle-bin rrdtool python-rrdtool python-matplotlib python-configobj python-setuptools python-gdata python-psutil
	echo "$(date +'%d %B %Y - %k:%M') System: Installation of capture related tools"	
	sudo apt-get install --assume-yes xawtv gphoto2 vlc streamer wget libjpeg-progs dcraw ufraw-batch
	echo "$(date +'%d %B %Y - %k:%M') System: Installation of picture processing related tools"	
	sudo apt-get install --assume-yes imagemagick jpeginfo 
	echo "$(date +'%d %B %Y - %k:%M') System: Installation of video processing related tools"	
	sudo apt-get install --assume-yes mpgtx mencoder ffmpeg x264 h264enc libavcodec-extra-53 atomicparsley
	echo "$(date +'%d %B %Y - %k:%M') System: Installation of admin interface related tools"	
	sudo apt-get install --assume-yes apache2 php5 openssl php5-cli libapache2-mod-php5 php5-gd php5-mysql mysql-server libapache2-mod-auth-mysql php-gettext
	echo "$(date +'%d %B %Y - %k:%M') System: Installation of misc tools"	
	sudo apt-get install --assume-yes wget wput vsftpd openvpn lftp db4.7-util heirloom-mailx links ncftp unzip pwgen ifstat libjson-perl liblocale-po-perl
	echo "$(date +'%d %B %Y - %k:%M') System: Installation of build-specific tools"	
	sudo apt-get install --assume-yes rubygems	
	sudo gem install compass	
fi

echo "$(date +'%d %B %Y - %k:%M') System: Permissions and system modifications"
echo "$(date +'%d %B %Y - %k:%M') System: [x]-Exit [s]-Skip [o]-OK"
read action
confmysqlpassword=$(pwgen -1 16)
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: Open a separate terminal and write down below commands:"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: #> sudo su"
	read
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: Define 'root' password"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: #> passwd"
	read
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: Add ${sysusername} user to www-data group"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: #> jed /etc/group"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: Edit the following line: www-data:x:33:${sysusername}"	
	read	
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: Modification of sudoers file"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: #> visudo"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:    Add the following line at the end of the file: "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       www-data    ALL=(ALL) NOPASSWD: /usr/bin/php -f /home/${sysusername}/webcampak/bin/server.php* "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       ${sysusername}    ALL=(ALL) NOPASSWD: /home/${sysusername}/webcampak/bin/webcampak.phidget.py "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:    Add a blank line, save and exit"
	read	
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: Modification of udev file"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: #> jed /lib/udev/rules.d/50-udev-default.rules"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:    Replace: "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       # libusb device nodes "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       SUBSYSTEM==\"usb\", ENV{DEVTYPE}==\"usb_device\", MODE=\"0664\""
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:    With: "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       # libusb device nodes "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       SUBSYSTEM==\"usb\", ENV{DEVTYPE}==\"usb_device\", MODE=\"0664\", GROUP=\"plugdev\""
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:    Save and exit"
	read
	sudo /etc/init.d/udev restart
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: Modification of grub error timeout"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action: #> jed /etc/grub.d/00_header"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:    Replace: "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       if [ \${recordfail} = 1 ]; then"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       set timeout=-1"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       else"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       set timeout=\${GRUB_TIMEOUT}"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       fi"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:    With: "
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       if [ \${recordfail} = 1 ]; then"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       set timeout=5"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       else"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       set timeout=\${GRUB_TIMEOUT}"
	echo "$(date +'%d %B %Y - %k:%M') System: ==> Action:       fi"
	read
	sudo update-grub2
fi
echo "$(date +'%d %B %Y - %k:%M') Webcampak: Installation of Webcampak software"
echo "$(date +'%d %B %Y - %k:%M') Webcampak: [x]-Exit [S]-skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
		cp ${scriptdirectory}/../../../webcampak2 /home/${sysusername}/webcampak -R
		sed -i "s/tmpusername/${sysusername}/" /home/${sysusername}/webcampak/bin/*
		sed -i "s/tmpusername/${sysusername}/" /home/${sysusername}/webcampak/init/config/*
		sed -i "s/tmpusername/${sysusername}/" /home/${sysusername}/webcampak/init/config/*		
		sed -i "s/tmpusername/${sysusername}/" /home/${sysusername}/webcampak/init/etc/*
		sed -i "s/tmpmysqlpassword/${confmysqlpassword}/" /home/${sysusername}/webcampak/init/config/*
		sed -i "s/tmpmysqlpassword/${confmysqlpassword}/" /home/${sysusername}/webcampak/init/etc/*		
fi
echo "$(date +'%d %B %Y - %k:%M') Webcampak: Software preparation"
echo "$(date +'%d %B %Y - %k:%M') Webcampak: Setting software permissions "
echo "$(date +'%d %B %Y - %k:%M') #> chmod +x /home/${sysusername}/webcampak/bin/server.php"
echo "$(date +'%d %B %Y - %k:%M') #> chmod +x /home/${sysusername}/webcampak/bin/*.py"
echo "$(date +'%d %B %Y - %k:%M') Webcampak: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	chmod 777 /home/${sysusername}/webcampak/www/interface/remote/lib/timthumb/cache/ -R
	chmod +x /home/${sysusername}/webcampak/bin/server.php
	chmod +x /home/${sysusername}/webcampak/bin/*.py
fi

echo "$(date +'%d %B %Y - %k:%M') Webcampak: Crontab creation"
echo "$(date +'%d %B %Y - %k:%M') Webcampak: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	for ((i = 1; i <= ${nbsources}; i += 1))	
	do	
		echo "# Taches CRON source: $i" >> /home/${sysusername}/webcampak/init/config/crontab.new
		echo "*/5 * * * * python /home/${sysusername}/webcampak/bin/webcampak.py -t capture -s $i" >> /home/${sysusername}/webcampak/init/config/crontab.new
		echo "0 $i * * * python /home/${sysusername}/webcampak/bin/webcampak.py -t video -s $i" >> /home/${sysusername}/webcampak/init/config/crontab.new
		echo "*/2 * * * * flock -xn /home/${sysusername}/webcampak/resources/cache/createcustom$i.lock python /home/${sysusername}/webcampak/bin/webcampak.py -t videocustom -s $i > /tmp/custom$i.log " >> /home/${sysusername}/webcampak/init/config/crontab.new
		echo "*/5 * * * * python /home/${sysusername}/webcampak/bin/webcampak.py -t rrdgraph -s $i" >> /home/${sysusername}/webcampak/init/config/crontab.new
		echo " " >> /home/${sysusername}/webcampak/init/config/crontab.new
	done 
	echo "$(date +'%d %B %Y - %k:%M') ------------------------------------"	
	cat /home/${sysusername}/webcampak/init/config/crontab.new
	echo "$(date +'%d %B %Y - %k:%M') ------------------------------------"		
	echo "$(date +'%d %B %Y - %k:%M') Install above crontab file: [n]-No [y]-Yes"
	read implement
	if [ "$implement" = "n" ] ; then
		exit;
	elif [ "$implement" = "y" ] ; then
		echo "$(date +'%d %B %Y - %k:%M') #> crontab /home/${sysusername}/webcampak/init/config/crontab.new"	
		crontab /home/${sysusername}/webcampak/init/config/crontab.new
		sudo crontab /home/${sysusername}/webcampak/init/config/crontab.root
	fi	
fi

echo "$(date +'%d %B %Y - %k:%M') Apache: Software configuration"
echo "$(date +'%d %B %Y - %k:%M') Apache: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') Apache: Generation of ssl certificates"
	sudo make-ssl-cert generate-default-snakeoil --force-overwrite
	sudo mkdir /etc/apache2/certs/
	sudo mv /etc/ssl/certs/ssl-cert-snakeoil.pem /etc/apache2/certs/cert.pem
	sudo mv /etc/ssl/private/ssl-cert-snakeoil.key /etc/apache2/certs/cert.key
	sudo cp /home/${sysusername}/webcampak/init/config/webcampak.apache /etc/apache2/sites-available/webcampak
	sudo cp /home/${sysusername}/webcampak/init/config/auth_mysql.conf /etc/apache2/mods-available/	
	sudo cp /home/${sysusername}/webcampak/init/config/webcampak.php5 /etc/apache2/mods-available/php5.conf	
	sudo a2enmod ssl	
	sudo a2ensite webcampak
	sudo a2dissite 000-default
	sudo a2enmod auth_mysql
	sudo /etc/init.d/apache2 reload
	echo "$(date +'%d %B %Y - %k:%M') Apache: Configuration completed"
fi

echo "$(date +'%d %B %Y - %k:%M') Mysql: Database Installation"
echo "$(date +'%d %B %Y - %k:%M') Mysql: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') Database installation"
	echo "$(date +'%d %B %Y - %k:%M') Please indicate MYSQL root password"
	echo "$(date +'%d %B %Y - %k:%M') #> mysql -u root -p < /home/${sysusername}/webcampak/init/config/webcampak.drop.sql"	
	mysql -u root -p < /home/${sysusername}/webcampak/init/config/webcampak.drop.sql
	echo "$(date +'%d %B %Y - %k:%M') #> mysql -u root -p < /home/${sysusername}/webcampak/init/config/webcampak.drop.user.sql"	
	mysql -u root -p < /home/${sysusername}/webcampak/init/config/webcampak.drop.user.sql
	echo "$(date +'%d %B %Y - %k:%M') #> mysql -u root -p < /home/${sysusername}/webcampak/init/config/webcampak.sql"	
	mysql -u root -p < /home/${sysusername}/webcampak/init/config/webcampak.sql
	echo "$(date +'%d %B %Y - %k:%M') #> mysql -u root -p < /home/${sysusername}/webcampak/init/config/webcampak.user.sql"	
	mysql -u root -p < /home/${sysusername}/webcampak/init/config/webcampak.user.sql
fi

echo "$(date +'%d %B %Y - %k:%M') Webcampak: Directory creation (sources, resources ...)"
echo "$(date +'%d %B %Y - %k:%M') Webcampak: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit; 
elif [ "$action" = "o" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/ "	
	mkdir /home/${sysusername}/webcampak/sources/
	for ((i = ${nbsources}; i >= 1; i -= 1))
	do
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i "
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i/live "
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i/pictures "
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i/tmp "
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i/videos "
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i/resources "		
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i/resources/audio "
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i/resources/watermark "
		echo "$(date +'%d %B %Y - %k:%M') #> mkdir /home/${sysusername}/webcampak/sources/source$i/resources/stats "						
		mkdir /home/${sysusername}/webcampak/sources/source$i
		mkdir /home/${sysusername}/webcampak/sources/source$i/live
		mkdir /home/${sysusername}/webcampak/sources/source$i/pictures
		mkdir /home/${sysusername}/webcampak/sources/source$i/tmp
		mkdir /home/${sysusername}/webcampak/sources/source$i/videos
		mkdir /home/${sysusername}/webcampak/sources/source$i/resources
		mkdir /home/${sysusername}/webcampak/sources/source$i/resources/audio
		mkdir /home/${sysusername}/webcampak/sources/source$i/resources/watermark
		mkdir /home/${sysusername}/webcampak/sources/source$i/resources/stats					
		echo "$(date +'%d %B %Y - %k:%M') #> cp /home/${sysusername}/webcampak/init/etc/config-source.cfg /home/${sysusername}/webcampak/etc/config-source$i.cfg "		
		echo "$(date +'%d %B %Y - %k:%M') #> cp /home/${sysusername}/webcampak/init/etc/config-source-video.cfg /home/${sysusername}/webcampak/etc/config-source$i-video.cfg "		
		echo "$(date +'%d %B %Y - %k:%M') #> cp /home/${sysusername}/webcampak/init/etc/config-source-videocustom.cfg /home/${sysusername}/webcampak/etc/config-source$i-video.cfg "	
		echo "$(date +'%d %B %Y - %k:%M') #> cp /home/${sysusername}/webcampak/init/etc/config-source-videopost.cfg /home/${sysusername}/webcampak/etc/config-source$i-videopost.cfg "
		echo "$(date +'%d %B %Y - %k:%M') #> cp /home/${sysusername}/webcampak/init/etc/config-source-ftpservers.cfg /home/${sysusername}/webcampak/etc/config-source$i-ftpservers.cfg "						
		cp /home/${sysusername}/webcampak/init/etc/config-source.cfg /home/${sysusername}/webcampak/etc/config-source$i.cfg
		cp /home/${sysusername}/webcampak/init/etc/config-source-video.cfg /home/${sysusername}/webcampak/etc/config-source$i-video.cfg
		cp /home/${sysusername}/webcampak/init/etc/config-source-videocustom.cfg /home/${sysusername}/webcampak/etc/config-source$i-videocustom.cfg
		cp /home/${sysusername}/webcampak/init/etc/config-source-videopost.cfg /home/${sysusername}/webcampak/etc/config-source$i-videopost.cfg
		cp /home/${sysusername}/webcampak/init/etc/config-source-ftpservers.cfg /home/${sysusername}/webcampak/etc/config-source$i-ftpservers.cfg		
		cp /home/${sysusername}/webcampak/init/config/sourceshtaccess /home/${sysusername}/webcampak/sources/source$i/.htaccess
		echo " " >> /home/${sysusername}/webcampak/sources/source$i/.htaccess
		echo "require group $i" >> /home/${sysusername}/webcampak/sources/source$i/.htaccess
		echo " " >> /home/${sysusername}/webcampak/sources/source$i/.htaccess
		echo "$(date +'%d %B %Y - %k:%M') #> sed -i (s/tmppassword/$(pwgen -1)/ /home/${sysusername}/webcampak/etc/config-source$i.cfg"		
		sed -i "s/tmppassword/$(pwgen -1)/" /home/${sysusername}/webcampak/etc/config-source$i.cfg		
	done 
	mkdir /home/${sysusername}/webcampak/resources
	mkdir /home/${sysusername}/webcampak/resources/audio
	mkdir /home/${sysusername}/webcampak/resources/cache
	mkdir /home/${sysusername}/webcampak/resources/logs
	mkdir /home/${sysusername}/webcampak/resources/logs/interface	
	mkdir /home/${sysusername}/webcampak/resources/watermark
	echo "$(date +'%d %B %Y - %k:%M') #> cp /home/${sysusername}/webcampak/init/etc/config-general.cfg /home/${sysusername}/webcampak/etc/config-general.cfg"
	echo "$(date +'%d %B %Y - %k:%M') #> cp /home/${sysusername}/webcampak/init/etc/config-ftpservers.cfg /home/${sysusername}/webcampak/etc/config-ftpservers.cfg"	
	echo "$(date +'%d %B %Y - %k:%M') #> sed -i s/tmppassword/$(pwgen -1)/ /home/${sysusername}/webcampak/etc/config-general.cfg"	
	cp /home/${sysusername}/webcampak/init/etc/config-general.cfg /home/${sysusername}/webcampak/etc/config-general.cfg
	cp /home/${sysusername}/webcampak/init/etc/config-ftpservers.cfg /home/${sysusername}/webcampak/etc/config-ftpservers.cfg	
	sed -i "s/tmppassword/$(pwgen -1)/" /home/${sysusername}/webcampak/etc/config-general.cfg
	echo "$(date +'%d %B %Y - %k:%M') #> sed -i s/tmpnbsources/$nbsources/ /home/${sysusername}/webcampak/etc/config-general.cfg"	
	sed -i "s/tmpnbsources/$nbsources/" /home/${sysusername}/webcampak/etc/config-general.cfg
	echo "$(date +'%d %B %Y - %k:%M') #> cp /home/${sysusername}/webcampak/init/etc/interface.config.php /home/${sysusername}/webcampak/etc/interface.config.php"
	cp /home/${sysusername}/webcampak/init/etc/interface.config.php /home/${sysusername}/webcampak/etc/interface.config.php		
	echo "$(date +'%d %B %Y - %k:%M') #> sudo chown www-data /home/${sysusername}/webcampak/etc/*.cfg"
	echo "$(date +'%d %B %Y - %k:%M') #> sudo chgrp www-data /home/${sysusername}/webcampak/etc/*.cfg"
	sudo chown www-data /home/${sysusername}/webcampak/etc/*.cfg
	sudo chgrp www-data /home/${sysusername}/webcampak/etc/*.cfg
	sudo chmod 777 /home/${sysusername}/webcampak/etc/*.cfg
	sudo chown www-data /home/${sysusername}/webcampak/resources/logs/interface
	cp /home/${sysusername}/webcampak/init/config/sourceshtaccess /home/${sysusername}/webcampak/www/interface/.htaccess	
	echo " " >> /home/${sysusername}/webcampak/www/interface/.htaccess
	echo "require group admin" >> /home/${sysusername}/webcampak/www/interface/.htaccess
	echo " " >> /home/${sysusername}/webcampak/www/interface/.htaccess
fi


echo "$(date +'%d %B %Y - %k:%M') Vsftpd: Configuration de vsftpd"
echo "$(date +'%d %B %Y - %k:%M') Vsftpd: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit; 
elif [ "$action" = "o" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') #> sudo mkdir /etc/vsftpd"
	echo "$(date +'%d %B %Y - %k:%M') #> sudo mkdir /etc/vsftpd/vsftpd_user_conf"
	echo "$(date +'%d %B %Y - %k:%M') #> sudo cp /home/${sysusername}/webcampak/init/config/vsftpd.conf /etc/vsftpd.conf"
	sudo mkdir /etc/vsftpd
	sudo mkdir /etc/vsftpd/vsftpd_user_conf
	sudo cp /home/${sysusername}/webcampak/init/config/vsftpd.conf /etc/vsftpd.conf
	sudo cp /home/${sysusername}/webcampak/init/config/vsftpd.pamd /etc/pam.d/vsftpd	
	sudo cp /home/${sysusername}/webcampak/init/config/vsftpd-wpresources /etc/vsftpd/vsftpd_user_conf/wpresources	
	for ((i = 1; i <= ${nbsources}; i += 1))	
	do
		echo "$(date +'%d %B %Y - %k:%M') #> sudo echo local_root=/home/${sysusername}/webcampak/sources/source$i/ > /etc/vsftpd/vsftpd_user_conf/source$i "
		echo "$(date +'%d %B %Y - %k:%M') #> sudo cat /home/${sysusername}/webcampak/init/config/vsftpd-source > /etc/vsftpd/vsftpd_user_conf/source$i "
		echo "local_root=/home/${sysusername}/webcampak/sources/source$i/" > /home/${sysusername}/webcampak/init/vsftpdsource$i
		echo " " >> /home/${sysusername}/webcampak/init/vsftpdsource$i
		cat /home/${sysusername}/webcampak/init/config/vsftpd-source >> /home/${sysusername}/webcampak/init/vsftpdsource$i	
		sudo cp /home/${sysusername}/webcampak/init/vsftpdsource$i /etc/vsftpd/vsftpd_user_conf/source$i
	done
	echo "$(date +'%d %B %Y - %k:%M') #> sudo /etc/init.d/vsftpd restart"
	sudo /etc/init.d/vsftpd restart
	if [ -f /lib/x86_64-linux-gnu/security/pam_userdb.so ]; then
		sudo mkdir /lib/security
		sudo ln /lib/x86_64-linux-gnu/security/pam_userdb.so /lib/security/pam_userdb.so
	fi
	if [ -f /lib/i386-linux-gnu/security/pam_userdb.so ]; then
		sudo mkdir /lib/security
		sudo ln /lib/i386-linux-gnu/security/pam_userdb.so /lib/security/pam_userdb.so
	fi
fi

echo "$(date +'%d %B %Y - %k:%M') Google: Installation of GoogleCL (for Youtube uploads)"
echo "$(date +'%d %B %Y - %k:%M') Google: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') Google: Download and install GoogleCL version 0.9.11-1"
	echo "$(date +'%d %B %Y - %k:%M') #> cd /home/${sysusername}/ "	
	cd /home/${sysusername}/
	echo "$(date +'%d %B %Y - %k:%M') #> wget http://googlecl.googlecode.com/files/googlecl_0.9.11-1_all.deb "
	wget -c http://googlecl.googlecode.com/files/googlecl_0.9.11-1_all.deb
	echo "$(date +'%d %B %Y - %k:%M') #> sudo dpkg -i googlecl_0.9.11-1_all.deb"
	sudo dpkg -i /home/${sysusername}/googlecl_0.9.11-1_all.deb
	mkdir /home/${sysusername}/.config/
	mkdir /home/${sysusername}/.local
	mkdir /home/${sysusername}/.local/share
	echo "$(date +'%d %B %Y - %k:%M') Google: Enter your Google/Youtube username and password"
	echo "$(date +'%d %B %Y - %k:%M') Google: A URL will be displayed, copy/paste it within your web browser to allow the webcampak to post content using the appropriate Youtube account"
	google youtube list
fi	

echo "$(date +'%d %B %Y - %k:%M') Serial: Configure serial port (for debugging)"
echo "$(date +'%d %B %Y - %k:%M') Serial: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	echo "$(date +'%d %B %Y - %k:%M') Serial: Create /etc/init/ttyS0.conf"
	sudo cp /home/${sysusername}/webcampak/init/config/ttyS0.conf /etc/init/ttyS0.conf
	echo "$(date +'%d %B %Y - %k:%M') Serial: sudo start ttyS0"
	sudo start ttyS0
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action: Modification of grub config"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action: #> jed /etc/default/grub"
	read	
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action: Match the following configuration: "
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    GRUB_DEFAULT=0"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    GRUB_TIMEOUT=1"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    GRUB_DISTRIBUTOR='lsb_release -i -s 2> /dev/null || echo Debian'"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    GRUB_CMDLINE_LINUX=\"console=tty0 console=ttyS0,115200n8\""
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:  "
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action: # Uncomment to disable graphical terminal (grub-pc only)"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    GRUB_TERMINAL=serial"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    GRUB_SERIAL_COMMAND=\"serial --speed=115200 --unit=0 --word=8 --parity=no --stop=1\""
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    "
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    # The resolution used on graphical terminal"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    # note that you can use only modes which your graphic card supports via VBE"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    # you can see them in real GRUB with the command 'vbeinfo'"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    #GRUB_GFXMODE=640x480"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:  "
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    # Uncomment if you don't want GRUB to pass \"root=UUID=xxx\" parameter to Linux"
	echo "$(date +'%d %B %Y - %k:%M') Serial: ==> Action:    #GRUB_DISABLE_LINUX_UUID=true"
	read
	echo "$(date +'%d %B %Y - %k:%M') Serial: sudo update-grub2"
	sudo update-grub2
fi	

echo "$(date +'%d %B %Y - %k:%M') Webcampak: Saving version"
version="$(cat /home/${sysusername}/webcampak2/version )"
wget http://stats.webcampak.com/stats.install.html?v=${version}
read action

echo "$(date +'%d %B %Y - %k:%M') Phidget: Drivers Installation (only if phidget board is installed)"
echo "$(date +'%d %B %Y - %k:%M') Phidget: [x]-Exit [s]-Skip [o]-OK"
read action
if [ "$action" = "x" ] ; then
	exit;
elif [ "$action" = "o" ] ; then
	mkdir /home/${sysusername}/softs/
	cd /home/${sysusername}/softs/
	sudo apt-get install build-essential make libusb-dev
	wget http://www.phidgets.com/downloads/libraries/libphidget_2.1.8.20110615.tar.gz
	tar xfvz libphidget_2.1.8.20110615.tar.gz
	cd libphidget-2.1.8.20110615
	./configure; make; 
	sudo make install
	cd /home/${sysusername}/softs/
	wget http://www.phidgets.com/downloads/libraries/PhidgetsPython_2.1.8.20110804.zip
	unzip PhidgetsPython_2.1.8.20110804.zip
	cd PhidgetsPython
	python setup.py build
	sudo python setup.py install
	cd /home/${sysusername}/
	sudo rm /home/${sysusername}/softs/ -r
fi

echo "$(date +'%d %B %Y - %k:%M') Cleaning: Deleting installation directory"
cd ${scriptdirectory}
cd ../../../
rm webcampak2 -R

echo "$(date +'%d %B %Y - %k:%M') Installation completed, Default User/Password are: root/webcampak please change those elements via the interface ASAP"	
echo "$(date +'%d %B %Y - %k:%M') Open your web browser and connect to https://WECAMPAK-IP/"
echo "$(date +'%d %B %Y - %k:%M') Exiting ....."


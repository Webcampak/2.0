##Introduction:
This software has been created to assist people in capturing pictures over a long period of time by creating an "appliance" with a set of pre-configured softwares and scripts.
More details are available on sourceforge http://sourceforge.net/projects/webcampak/
A full documentation is available at:
 - Francais: http://www.webcampak.com/fr/doc/
 - English: http://www.webcampak.com/en/doc/
To get a pre-configured and ready to use system visit http://www.webcampak.com

If you want to participate in the project please get in touch via sourceforge or webcampak.com

Installation of the software should provide you with an operational photography appliance. 
It has been created to be installed on a dedicated device (although you should be able to run it on your everyday latop running Ubuntu desktop).
By device it could be almost anything running Ubuntu Server (PC, laptop, PS3, nettop, embedded computer, ...).

##License:
Webcampak is free software: you can redistribute it and/or modify it 
under the terms of the GNU General Public License as published by 
the Free Software Foundation, either version 3 of the License, 
or (at your option) any later version.

Webcampak is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
See the GNU General Public License for more details (http://www.gnu.org/licenses/).

##Prerequisites:
The following elements are necessary:
- A dedicated computer (or any compatible device) running GNU/Linux Ubuntu Server 12.04 (Debian SID should work).
- One or more sources (DSLR Camera, Compact Camera, Webcam, IP Camera ...).
- An internet connection (not mandatory but useful for remote control).

##Target Usages:
- Remote capture/monitoring (i.e. Building site monitoring),
- Capture pictures for Timelapse projects,
- Regurlarly send pictures to Internet (behave like a "webcam"),
- ...

##Installation:
- Install Ubuntu Server 12.04 with SSH Server and no extra packages
- Download latest webcampak-v2.x-xxxxxxx.tar.gz file from Sourceforge
- Untaf file: tar xfvz webcampak-v2.x-xxxxxxx.tar.gz
- Execute the install script located in webcampak2/init/install/: bash ./webcampak2/init/install/install.Ubuntu12.04.sh
- Follow script indications precisely

##Technical details:
- Webcampak core system is started automatically by means of cron jobs (crontab).
- Viewer and administration panel are using Apache2, PHP5, MySQL, Sencha Extjs Framework ...
- Core Python software make use of Gphoto2, ImageMagick, Mencoder, ...
- Web interface is used to modify configuration files. Configuration files are then read by Webcampak core.
- The system can be used with multiple sources running simultaneously.
- Reliability and consistency has been a top priority during development. Configuration settings are stored within system files to avoid risk of issues related to MySQL database.

##Participate:
If you want to participate in the project, join us at Sourceforge http://sourceforge.net/projects/webcampak/ or get in touch via www.webcampak.com

##To-Do List:
List of features, functions or modifications to be implemented in coming version:
 - Interface: File management module (to ease deletion of pictures and videos)
 - Interface: Implement zoom and pan in graphs (stats) 
 - Interface: Add weather graphs
 - Core: Youtube upload on a per-source basis (and not system-wide as it is today)
 - Core: User with an account about to expire will receive an email a few days before, account will be disabled two days after expiration (and another email will be sent), account & data will be automatically deleted X days after latest reminder
 

##Changelog:
v2.0-b94
 - Picture rotation
 - Other minor improvements 

v2.0-b93
 - Easier way to configure internal sources processing
 - Raw files support when used in conjunction with internal sources processing (get) and variable capture rate
 - Few other U/I improvements

v2.0-b91
 - Completely revamped Webcampak Mobile web interface

v2.0-b83
 - Small improvement in the way configuration settings were loaded/saved for high latency links
 
v2.0-b82
 - Display link to both AVI and MP4 in the videos window
 - Various other improvements

v2.0-b70
 - Added DSLR RAW pictures support
 - Send stats by email daily
 - Some web interfaces modifications (mobile and desktop)
 - Critical bug corrections (compared to b61)

v2.0-b61 (experimental release)
 - New web interface based upon Sencha Extjs Framework (Javascript / Ajax)
 - Gather and display stats.
 - Better permissions and user rights management.
 - Audio & watermark moved to source + global level (instead of global only), this makes those files private.
 - FTP Servers configuration moved to source level (instead of global level).
 - ...

v1.7-b04-20120618:
 - Removal of some php notice in the viewer/admin panel, code cleaning.

v1.7-b03-20120613:
 - viewer/photos.php photos.tpl: improved interface when viewing small pictures (width below 1024).
 - wpakWebcam.py: Updated webcam capture module to assign a physical USB port to a specific source, therefore if multiple webcams are use they cannot move between sources.

v1.7-a02-20120611:
 - Updated the USB webcam capture module.
 This is an alpha intermediate release.
 
v1.7-a01-20120607:
 - Corrected a few bugs and started to work on a deflicker feature.
 This is an alpha intermediate release.

v1.6-b03-20120525:
New: Extract date from exif metadata for "ipcam" source (any files uploaded to /tmp/ directory get renamed like this YYYYMMDDHHMMSS.jpg)

v1.6-b02-20120525:
 - wpakVideo.py: Correction of a bug in transition feature, caused by new "minimum time" feature

v1.6-b01-20120524:
New: 	- Set a minimum time between two pictures when generating a custom video or post-prod batch

v1.5-b06-20120516:
wpakVideo.py: Modification in the way phidget sensors can be inserted into picture
wpakCaptureManagement.py: Modification in the way phidget sensors can be inserted into picture

v1.5-b05-20120515:
Few updates in a lot of files (mostly translation and look & feel).

v1.5-b04-20120511:
Few updates in a lot of files.

v1.5-b03-20120506:
wpakVideo.py: Correction of a bug.

v1.5-b02-20120504:
New: - Calendar to select days of the week and timeslots to capture
New: - Stats module, to collect details about running webcampak
Other modifications include:
 - Removal of source planner, planning integrated within source configuration
 - viewer/photos: corrected a bug when moving between months

v1.5-b01-20120425:
New version, multiple modifications
 - Sensors are now considered a source
 - FTP servers are configured from a single page, ease things when multiple sources must send pictures to same FTP server
 - FTP section has been removed (replaced by FTP servers)
 - code update and various other modifications

v1.4-b04-20120402:
Updated:	- Updated to latest version of jqzoom.

v1.4-b03-20120330:
New:	- Added setting not to generate error hotlink pictures if capture failed (keep the last captured picture as hotlink).

v1.4-b02-20120323:
 - wpakRRDGraph.py: Correction of a bug when sending sensors measurements to a remote host
 - wpakIPCam.py: Correction of a few bugs
 - wpakCaptureManagement.py: Few improvements and corrections
 - config-photos.php: Correction of a bug when disabling pictures storage.
 - config-avance.php (locale): Change to make things more understandable.
 
v1.4-b01-20120314:
 - wpakErrorManagement.py: Improved email alerts, the system can send a reminder when a source is offline, frequency of the reminder to be chosen during configuration
 - admin/index: Added a dashboard to overview sources (time since last capture, disk usage, ...)

v1.3-b07-20120312:
 - wpakIPCam.py (and others): Define if there is an error based upon the time spent since last picture saved within pictures directory
 - Added time since last successful capture within error email subject 

v1.3-b06-20120301:
New: Added means to skip similar pictures when creating videos (to remove portions with no activity)  

v1.3-b05-20120224:
New: Capability to insert a thumbnail within a picture in post-production (i.e. a focus on a specific area)

v1.3-b04-20120221:
- wpakRRDGraph.py: Correction of a bug in RRD graph creations

v1.3-b0x-201xxxxx:
 - Intermediate versions

v1.3-a01-20111107:
This is an alpha release, likely to contains bugs.
New:	- Added a section to prepare shots for post-production.
		- Including effects (camera tracking, zooming, ...)
New: 	- Ability to move shots between sources
Those new modifications are mostly targetting central servers with large storage space, CPU and memory.

v1.2-b05-20111030:
- wpakFTPClass.py: There was a missing try/except
- wpakRRDGraph.py: Wrong maniuplation caused the whole capture to fail

v1.2-b04-20111016:
New: - wpakVideo.py , config-videocustom.*: Added an option to create custom videos unsing only some of the pictures (i.e.: from 8:00am to 4:00pm)
- viewer/../skeleton.tpl: Small modification of the viewer panel, an "empty" source was displayed in some occasions
- viewer/photos.php: Next/Previous was moving by +5 instead of +1, corrected.

v1.2-b03-20111010:
New:	- slideshow: Added a slideshow using jquery supersized. Can be used to display fullscreen pictures.
New:	- fullscreen: Added fullscreen capabilities using jquery supersized.

v1.2-b02-20111004:
- wpakVideo.py: Correction of a typo bug for 2 pass video encoding.

v1.2-b01-20110911:
New:	- RRDTool: Added RRDTool to graph sensors values instead of a custom build functions. Much more reliable.

v1.1-b11-20110829:
- viewer/photos.php photos.tpl: added 6 thumbnails below pictures (3 previous/following pictures)

v1.1-b10-20110823:
- admin/*.php *.tpl: added hidden form to ensure nothing gets submitted when restoring tabs from web browsers

v1.1-b09-20110820:
- wpakCapture.py, config-source.cfg, config-source.php, config-source.tpl: New option for IP Camera (FTP), no actions to be taken if no new pictures available

v1.1-b08-20110818:
- config-videocustom.php: Email parameter was not properly taken into consideration
- wpakVideo.py: Correction of a bug when generating a MP4 file.

v1.1-b07-20110817:
- wpakCapture.py: Corrected a bug with FTP upload of images in case capture failed.

v1.1-b06-20110809:
- viewer/photos.php: Display an error message when there is an empty pictures directory for the current source
New: 
	- Multi-sensor configuration for video creation (regular and custom) (config-video.php/tpl, config-videocustom.php/tpl, locales, wpakVideo.py)

v1.1-b05-20110803:
- wpakImageMagick.py: Inserted a missing parameter in color-in function

v1.1-b04-20110731:
- viewer/videos.php: Using filename and not filedate to determine video creation date (was causing inconsitency if video file was transfered at a later stage)
- wpakDateFormat.py: Added a space in front of the date when adding a legend
- viewer/videos.php/.tpl: Modification of the way video link are displayed (made it easier to understand)

V1.1-b03-20110724:
- wpakIPCam.py: Taking seconds in consideration in the filename
- webcampak.py: Adding a constraint to get capture delay parameter only for captures (and not videos or sample)

V1.1-b02-20110722:
- config-photos.tpl/.php: Removed deprecated portions of code
- wpakIPCam.py: Implementing email alerting if no pictures have been uploaded via FTP to the Webcampak.
- config-source.tpl/.php (locales): Added more precise instructions
New: 
	- Check if file has been properly uploaded and allow multiple retry (files: wpakFTPClass.py, config-sourceX.cfg, ...)
	- Send phidget measurements via FTP to main FTP server (still in progress)

V1.1-b01-20110705 (major release):
 - /viewer/: Correction of a security issue in the viewer panel allowing authenticated viewers to see pictures from other sources by guessing filenames.
 - wpakGraph.py: Removed hard coding, can support up to 4 different sensor per source.
New: Support for various phidget sensors


V1.0-b34-20110630:
 - wpakDateFormat.py: Added possibility not to insert a date with a legend during video creation
 - wpakVideo.py: Added possibility not to insert a date with a legend during video creation
 - wpakIPCam.py: If source is a Webcampak, added a check to ensure temporary directories are not processed (only process directory starting with 20)
New: Added upload archives to an additional FTP server (for example to save pictures to a NAS and send pictures to a Webcampak for remote processing)

V1.0-b33-20110629:
 - admin/../config-videocustom.tpl: Typo mistake creating issues with pre-processing.
 - admin/../config-video.tpl: Typo mistake creating issues with pre-processing.
 - wpakVideo.py: Changed timestamp calculation method for inserting time & date within videos in pre-processing.

V1.0-b32-20110628:
 - wpakPhidget.py: Addition phidget activation check.

V1.0-b31-20110624:
 - wpakWebFile.py: Added a 10s timeout to webfile download function.
 - Changed default capture minimum size, from 300B to 3KB.
 

<?php 
$smarty->assign('LANG_SOURCE_SOURCE', "Source");
$smarty->assign('LANG_SOURCE_TITLE', ": Configuration du type de source");
$smarty->assign('LANG_SOURCE_TIP', "Astuce:");

$smarty->assign('LANG_SOURCE_TYPE_TITLE', "Configuration de la source");
$smarty->assign('LANG_SOURCE_TYPE_ACTIVATE', "Activer la source:");
$smarty->assign('LANG_SOURCE_TYPE_SOURCETYPE', "Type de source:");
$smarty->assign('LANG_SOURCE_TYPE_SOURCEGPHOTO', "Appareil Photo USB (Gphoto2 mode PTP)");
$smarty->assign('LANG_SOURCE_TYPE_SOURCEWEBCAM', "Webcam USB");
$smarty->assign('LANG_SOURCE_TYPE_SOURCECAMIP', "Camera IP (FTP)");
$smarty->assign('LANG_SOURCE_TYPE_SOURCEWEB', "Image Internet (HTTP ou FTP)");
$smarty->assign('LANG_SOURCE_TYPE_SOURCESTREAMING', "Flux Streaming (RTSP)");
$smarty->assign('LANG_SOURCE_TYPE_SOURCESENSOR', "Capteur environmental (Phidget)");
$smarty->assign('LANG_SOURCE_TYPE_INTERVAL', "Intervalle minimum:");
$smarty->assign('LANG_SOURCE_TYPE_SECONDS', "Secondes");
$smarty->assign('LANG_SOURCE_TYPE_MINUTES', "Minutes");
$smarty->assign('LANG_SOURCE_TYPE_CAPTUREDELAY', "Retard capture (secondes):");
$smarty->assign('LANG_SOURCE_TYPE_DEBUG', "Activer mode diagnostique:");
$smarty->assign('LANG_SOURCE_TYPE_EMAILALERT', "Activer alerte email:");
$smarty->assign('LANG_SOURCE_TYPE_BLOCK', "Bloquer la capture automatique:");
$smarty->assign('LANG_SOURCE_TYPE_BUTTON', "Enregistrer");
$smarty->assign('LANG_SOURCE_TYPE_TIP', "Utilisez l'option 'Bloquer la capture automatique' pendant la configuration d'une source, vous aurez accès à des fonctionalités complémentaires de l'interface.<br />
<b>Intervalle minimum:</b> Cette option permet de définir l'intervalle minimum autorisé entre chaque cliché. Toute demande de cliché ne respectant pas cette valeur sera refusée.<br />
* hors source webcampak, dans ce cas la date du cliché est le nom du fichier");

$smarty->assign('LANG_SOURCE_CAPTURE_CAPTUREPICTURE', "Capturer une image");
$smarty->assign('LANG_SOURCE_CAPTURE_CAPTURESAVEPICTURE', "Capture Manuelle");
$smarty->assign('LANG_SOURCE_CAPTURE_CAPTUREPICTUREDISABLED', "Fonctionalités désactivées, utilisez l'option 'Bloquer la capture automatique'.");

$smarty->assign('LANG_CRON_SOURCE_STARTCAPTURE', "Déclencher la capture toutes les");
$smarty->assign('LANG_CRON_SOURCE_SECONDS', "Secondes");
$smarty->assign('LANG_CRON_SOURCE_MINUTES', "Minutes");
$smarty->assign('LANG_CRON_SOURCE_HOURS', "Heures");

$smarty->assign('LANG_CRON_TYPE_CAPTUREDELAYDATE', "Date du cliché*:");
$smarty->assign('LANG_CRON_TYPE_CAPTUREDELAYDATECAPTURE', "Déclenchement Capture");
$smarty->assign('LANG_CRON_TYPE_CAPTUREDELAYDATESCRIPT', "Déclenchement Script");

$lang_cron_day[1] = "Lundi";
$lang_cron_day[2] = "Mardi";
$lang_cron_day[3] = "Mercredi";
$lang_cron_day[4] = "Jeudi";
$lang_cron_day[5] = "Vendredi";
$lang_cron_day[6] = "Samedi";
$lang_cron_day[7] = "Dimanche";
$smarty->assign('LANG_CRON_DAYS', $lang_cron_day);

$smarty->assign('LANG_CRON_CALENDAR_TITLE', "Calendrier des captures");
$smarty->assign('LANG_CRON_CALENDAR_ENABLE', "Activer le calendrier");
$smarty->assign('LANG_CRON_CALENDAR_ENABLE_MORE', "Si non activé, capture 24/7");
$smarty->assign('LANG_CRON_CALENDAR_TIME_START', "Entre ");
$smarty->assign('LANG_CRON_CALENDAR_TIME_END', " et ");


$smarty->assign('LANG_SOURCE_GPHOTO_TITLE', "Configuration de la source '<u>Appareil Photo USB (mode PTP)</u>'");
$smarty->assign('LANG_SOURCE_GPHOTO_CAMERAMODEL', "Modèle d'appareil:<br /><i>Contexte multi-appareils</i>");
$smarty->assign('LANG_SOURCE_GPHOTO_CAMERAPORT', "Port Appareil:<br /><i>Contexte multi-appareils</i>");
$smarty->assign('LANG_SOURCE_GPHOTO_CURRENTCONF', "Actuellement: ");
$smarty->assign('LANG_SOURCE_GPHOTO_AUTO', "Automatique");
$smarty->assign('LANG_SOURCE_GPHOTO_CAMERAOWNER', "'Owner' de l'appareil:<br /><i>Contexte multi-appareils uniquement</i>");
$smarty->assign('LANG_SOURCE_GPHOTO_CAMERAOWNERAPPLIED', "Paramètre Appliqué");
$smarty->assign('LANG_SOURCE_GPHOTO_CAMERAOWNERASSIGN', "Assigner (Enregistrez avant)");
$smarty->assign('LANG_SOURCE_GPHOTO_NOSPACES', "Sans espaces ni caractères spéciaux.");
$smarty->assign('LANG_SOURCE_GPHOTO_APPLYCALIBRATION', "Appliquer calibrage au démarrage (expérimental):");
$smarty->assign('LANG_SOURCE_GPHOTO_CALIBRATE', "Calibrer et Paramétrer l'appareil photo (Expérimental)");
$smarty->assign('LANG_SOURCE_GPHOTO_DISABLED', "Fonctionalité désactivée, utilisez l'option 'Bloquer la capture automatique'.");
$smarty->assign('LANG_SOURCE_GPHOTO_SUPPORTED', "<i>Une liste des appareils supportés est <a href='http://www.gphoto.org/doc/remote/' target='_blank'>disponible ici</a></i>");
$smarty->assign('LANG_SOURCE_GPHOTO_TIP', "Lors de la configuration d'un appareil photo USB, si plusieurs appareils photo sont connectés il est nécessaire de préciser le modèle d'appareil.<br />Il peut être nécessaire de préciser le port USB sur lequel est connecté l'appareil photo, attention ce dernier peut changer si l'appareil photo est redémarré.<br />Reportez-vous à la section 'Système / Appareils' pour consulter les paramètres des appareils détectés.");

$smarty->assign('LANG_SOURCE_USBWEBCAM_TITLE', "Configuration de la source '<u>Webcam USB</u>'");
$smarty->assign('LANG_SOURCE_USBWEBCAM_NATIVESIZE', "Résolution native de la webcam:");
$smarty->assign('LANG_SOURCE_USBWEBCAM_OTHERSIZE', "Autre Résolution");
$smarty->assign('LANG_SOURCE_USBWEBCAM_IFOTHER', " Si autre, précisez: ");
$smarty->assign('LANG_SOURCE_USBWEBCAM_DEVICE', "Périphérique (bus_info):");
$smarty->assign('LANG_SOURCE_USBWEBCAM_ADVANCED', "Configuration avancée");
$smarty->assign('LANG_SOURCE_USBWEBCAM_ATTRIBUTE', "Attribut");
$smarty->assign('LANG_SOURCE_USBWEBCAM_NEW', "Nouveau");
$smarty->assign('LANG_SOURCE_USBWEBCAM_CURRENT', "Actuel");
$smarty->assign('LANG_SOURCE_USBWEBCAM_RESOLUTION', "(par exemple: 1024x768)");
$smarty->assign('LANG_SOURCE_USBWEBCAM_DEFAULT', "Défaut");
$smarty->assign('LANG_SOURCE_USBWEBCAM_DETAILS', "Détails");
$smarty->assign('LANG_SOURCE_USBWEBCAM_BRIGHTNESS', "Brightness:");
$smarty->assign('LANG_SOURCE_USBWEBCAM_CONTRAST', "Contrast:");
$smarty->assign('LANG_SOURCE_USBWEBCAM_SATURATION', "Saturation:");
$smarty->assign('LANG_SOURCE_USBWEBCAM_GAIN', "Gain:");
$smarty->assign('LANG_SOURCE_USBWEBCAM_INSTRUCTIONS', "Valeurs en %, pour les valeurs par défaut, reportez vous aux logs juste après un redémarrage");

$smarty->assign('LANG_SOURCE_CAMERAIP_TITLE', "Configuration de la source '<u>Camera IP</u>'");
$smarty->assign('LANG_SOURCE_CAMERAIP_LIMITROTATION', "Limiter le traitement hotlink à une image par rotation:");
$smarty->assign('LANG_SOURCE_CAMERAIP_HOTLINKERROR', "Déclenche des actions (email, image erreur) si aucune image n'est présente dans le répertoire tmp/ lors d'une rotation.");
$smarty->assign('LANG_SOURCE_CAMERAIP_SOURCETYPE', "Définition de la date du cliché:");
$smarty->assign('LANG_SOURCE_CAMERAIP_ANYTYPES', "Date d'enregistrement du cliché dans /tmp/");
$smarty->assign('LANG_SOURCE_CAMERAIP_WEBCAMPAK', "Nom du cliché (Webcampak) - format: YYYYMMDDHHMMSS.jpg");
$smarty->assign('LANG_SOURCE_CAMERAIP_EXIF', "Meta-donnees EXIF");
$smarty->assign('LANG_SOURCE_CAMERAIP_TIP', "En limitant l'upload FTP à une image par rotation vous évitez de saturer votre serveur FTP dans le cas ou votre Caméra IP est configurée pour envoyer de très nombreux clichés. <br /> Les images restantes sont archivées localement et peuvent êtres utilisées pour la création des vidéos.<br /><br />	Activer l'option 'Source Webcampak' indique que les images sont déposées en FTP par un autre Webcampak.");

$smarty->assign('LANG_SOURCE_PHIDGET_TITLE', "Configuration de la source '<u>Capteur environmental (Phidget)</u>'");
$smarty->assign('LANG_SOURCE_GRAPH_ACTIVATE', "Créer le graphique journalier");
$smarty->assign('LANG_SOURCE_ERROR_DISABLED', "Désactivé");
$smarty->assign('LANG_SOURCE_PHIDGET_SENSOR', "Capteur");
$smarty->assign('LANG_SOURCE_PHIDGET_TYPE', "Type");
$smarty->assign('LANG_SOURCE_PHIDGET_PORT', "Port");
$smarty->assign('LANG_SOURCE_PHIDGET_TEXT', "Désignation");
$smarty->assign('LANG_SOURCE_PHIDGET_COLOR', "Couleur<br />(ex: #FF0000)");
$smarty->assign('LANG_SOURCE_PHIDGET_FTP', "Envoyer les mesures phidget par FTP");
$smarty->assign('LANG_SOURCE_FTP_MAINFTPRETRY', "Nombre d'essais en cas d'erreur:");
$smarty->assign('LANG_SOURCE_FTP_DISABLED', "Désactivé");
$smarty->assign('LANG_SOURCE_FTP_NORETRY', "Pas de nouvelle tentative");


$smarty->assign('LANG_SOURCE_SOURCEWEB_TITLE', "Configuration de la source '<u>Image Internet</u>' ou '<u>Flux Streaming (RTSP)</u>'");
$smarty->assign('LANG_SOURCE_SOURCEWEB_URL', "URL Fichier/Flux:");
$smarty->assign('LANG_SOURCE_SOURCEWEB_TIP', "Le logiciel est compatible avec des sources HTTP, FTP, RTSP <br />	
Si vous souhtaitez utiliser une image située sur un serveur FTP utilisez l'url suivante: ftp://Utilisateur:MotDePasse@Serveur/repertoire/fichier.jpg <br />	
Note: Seul le format JPG est supporté.<br /> Exemple de flux RTSP: rtsp://192.168.1.21/mpeg4");
$smarty->assign('LANG_SOURCE_BUTTON', "Enregistrer les modifications");



?>

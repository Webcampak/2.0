<?php 
$smarty->assign('LANG_CONFIGAVANCE_SOURCE', "Source");
$smarty->assign('LANG_CONFIGAVANCE_TITLE', ": Configuration Avancée");

$smarty->assign('LANG_CONFIGAVANCE_CONFIGURATIONFILE_TITLE', "Fichier de configuration");
$smarty->assign('LANG_CONFIGAVANCE_CONFIGURATIONFILE_IMPORT', "Importer fichier configuration:");
$smarty->assign('LANG_CONFIGAVANCE_CONFIGURATIONFILE_BUTTON', "Envoyer");
$smarty->assign('LANG_CONFIGAVANCE_CONFIGURATIONFILE_UPLOADSUCCESS', "Remplacement du fichier de configuration réalisé.");
$smarty->assign('LANG_CONFIGAVANCE_CONFIGURATIONFILE_WARNING', "<strong><font color='red'>Attention:</font></strong> l'import de fichier de configuration écrasera la configuration actuelle.	<br/>");
$smarty->assign('LANG_CONFIGAVANCE_CONFIGURATIONFILE_BUTTONDOWNLOAD', "Télécharger le fichier de configuration");
$smarty->assign('LANG_CONFIGAVANCE_CONFIGURATIONFILE_BUTTONDISPLAY', "Afficher le fichier de configuration");

$smarty->assign('LANG_CONFIGFTP_LOCALFTP_TITLE', "Serveur FTP Local");
$smarty->assign('LANG_CONFIGFTP_LOCALFTP_USERNAME', "Nom d'utilisateur:");
$smarty->assign('LANG_CONFIGFTP_LOCALFTP_PASSWORD', "Mot de passe:");
$smarty->assign('LANG_CONFIGFTP_LOCALFTP_BUTTON', "Créer/Modifier utilisateur");
$smarty->assign('LANG_CONFIGFTP_LOCALFTP_TIP', "Le FTP local est utilisé pour accéder aux images stockées localement ainsi que pour permettre aux caméras IP de placer des images dans le répertoire tmp/.<br />
Attention, par défaut les comptes FTP du Webcampak ne sont pas configurés, veillez à cliquer sur 'Créer/Modifier Utilisateur' pour activer la fonctionalité.");

$smarty->assign('LANG_CONFIGAVANCE_EMAIL_TITLE', "Configuration alerte email");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_SENDTO', "Adresse email destinataire alerte:");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_SENDCOPYTO', "Envoyer une copie de l'alerte à (@ email):");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_EMAILSOURCE', "Source de l'email (@ email):");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_NBFAILURES', "Nombre d'échecs avant envoi:");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_REMINDER', "Rappel tous les ");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_REMINDER_FAILURE', "échecs (0 = jamais)");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_SMTPSERVER', "Serveur SMTP:Port");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_SMTPTTLS', "SMTP Start TTLS:");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_SMTPAUTH', "SMTP Auth:");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_SMTPAUTHUSERNAME', "SMTP Auth Username:");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_SMTPAUTHPASSWORD', "SMTP Auth Password:");
$smarty->assign('LANG_CONFIGAVANCE_EMAIL_BUTTON', "Sauvegarder");

$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_TITLE', "Configuration platine Phidget pour la source");
$smarty->assign('LANG_CONFIGAVANCE_ERROR_ACTIVATE', "Activer le redémarrage électrique");
$smarty->assign('LANG_CONFIGAVANCE_GRAPH_ACTIVATE', "Créer le graphique journalier");
$smarty->assign('LANG_CONFIGAVANCE_ERROR_NBERRORS', "Nombre d'erreurs de capture avant redémarrage:");
$smarty->assign('LANG_CONFIGAVANCE_ERROR_PORT', "Port sur lequel est connecté le relais:");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_TEMPERATURE', "Port sur lequel est connecté la sonde de température:");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_LIGHT', "Port sur lequel est connecté la sonde de luminosité:");
$smarty->assign('LANG_CONFIGAVANCE_ERROR_DISABLED', "Désactivé");

$smarty->assign('LANG_CONFIGAVANCE_INIT_TITLEINIT', "Réinitialiser (source ");
$smarty->assign('LANG_CONFIGAVANCE_INIT_TITLEEND', " uniquement):"); 
$smarty->assign('LANG_CONFIGAVANCE_INIT_INITSOURCE', "Réinitialiser la configuration pour la source ");
$smarty->assign('LANG_CONFIGAVANCE_INIT_INITSOURCEBUTTON', "Réinitialiser source "); 
$smarty->assign('LANG_CONFIGAVANCE_INIT_INITVIDEO', "Etes vous sur de vouloir effacer l'ensemble des photos et videos:"); 
$smarty->assign('LANG_CONFIGAVANCE_INIT_INITVIDEOBUTTON', "Effacer l'ensemble des images et vidéos source "); 
$smarty->assign('LANG_CONFIGAVANCE_INIT_WARNING', "<strong><font color='red'>Attention:</strong> toute action est définitive	</font><br/>"); 

$smarty->assign('LANG_CONFIGAVANCE_MOTION_TITLE', "Détection de mouvements (Expérimental)");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_ACTIVATE', "Activer détection de mouvements");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_ONLY', "Enregistrer uniquement les clichés liées à la détection de mouvements");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_DEVICE', "Source Video");

$smarty->assign('LANG_CONFIGAVANCE_MOTION_DEVICEWIDTH', "Largeur source (pixel width)");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_DEVICEHEIGHT', "Hauteur source (pixel height)");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_THRESHOLD', "Seuil déclenchement (en pixels modifiés)");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_ENDEVENT', "Nombre de secondes avant de considérer l'évenement comme clos");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_BUTTON', "Sauvegarder");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_TIP', "Attention:");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_WARNING', "Cette fonctionalité a été prévue pour être utilisée avec une source de type appareil photo réflex. Une webcam sera utilisée conjointement comme détecteur de mouvement.");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_INTERVAL', "Intervalle minimum:");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_SECONDS', "Secondes");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_MINUTES', "Minutes");

$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_INSERTIMAGE', "Incrustation image");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_SENSOR', "Capteur");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_TYPE', "Type");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_PORT', "Port");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_TEXT', "Désignation");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_COLOR', "Couleur<br />(ex: #FF0000)");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_INSERT', "Incruster");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_RESOLUTION', "Résolution");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_TRANSPARENCY', "Transparence");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_XLOCATION', "Position (x)");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_YLOCATION', "Position (y)");

$smarty->assign('LANG_CONFIGAVANCE_FTPADVANCED', "Paramètres FTP avancés");
$smarty->assign('LANG_CONFIGAVANCE_FTPRETRY', "Nombre de tentatives en cas d'échec de l'envoi:");
$smarty->assign('LANG_CONFIGAVANCE_FTPPRIMARY', "FTP Principal");
$smarty->assign('LANG_CONFIGAVANCE_FTPSECONDARY', "FTP Secondaire");
$smarty->assign('LANG_CONFIGAVANCE_FTPHOTLINK', "FTP Hotlink");
$smarty->assign('LANG_CONFIGAVANCE_FTPNORETRY', "Pas de nouvelle tentative");
$smarty->assign('LANG_CONFIGAVANCE_FTPSENDPIC', "Photo");
$smarty->assign('LANG_CONFIGAVANCE_FTPSENDAVI', "Vidéo (avi)");
$smarty->assign('LANG_CONFIGAVANCE_FTPSENDFLV', "Vidéo (mp4)");
$smarty->assign('LANG_CONFIGAVANCE_PHIDGET_FTP', "Envoyer les mesures phidget par FTP");

$smarty->assign('LANG_CONFIGAVANCE_FTP_MAINFTPRETRY', "Nombre d'essais en cas d'erreur:");
$smarty->assign('LANG_CONFIGAVANCE_FTP_DISABLED', "Désactivé");
$smarty->assign('LANG_CONFIGAVANCE_FTP_NORETRY', "Pas de nouvelle tentative");



?>

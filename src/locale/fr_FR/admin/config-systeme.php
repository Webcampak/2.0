<?php 
$smarty->assign('LANG_SYSTEME_TITLE', "Configuration Système");
$smarty->assign('LANG_SYSTEME_TIP', "Astuce:");

$smarty->assign('LANG_SYSTEME_PRESENTATION_TITLE', "Présentation");
$smarty->assign('LANG_SYSTEME_PRESENTATION_TITLEDESCRIPTION', "Vous êtes actuellement connecté à l'interface d'administration du Webcampak.<br />Utilisez les menus dans la partie gauche de l'écran pour vous déplacer dans les différentes sections de configuration.");

$smarty->assign('LANG_SYSTEME_VPN_STARTED', "Démarré");
$smarty->assign('LANG_SYSTEME_VPN_STOPPED', "Arrêté");

$smarty->assign('LANG_SYSTEME_ASSISTANCE_TITLE', "Assistance à distance");
$smarty->assign('LANG_SYSTEME_ASSISTANCE_STATUS', "Etat du client VPN:");
$smarty->assign('LANG_SYSTEME_ASSISTANCE_START', "Démarrer l'assistance");
$smarty->assign('LANG_SYSTEME_ASSISTANCE_STOP', "Arréter l'assistance");
$smarty->assign('LANG_SYSTEME_ASSISTANCE_TIP', "L'assistance à distance prends la forme d'un tunnel VPN sécurisé établit entre le Webcampak et nos locaux. Par le biais de ce tunnel nous avons accès à l'interface d'administration du webcampak.");

$smarty->assign('LANG_SYSTEME_MULTI_TITLE', "Multi-Appareils (compacts et reflex)");
$smarty->assign('LANG_SYSTEME_MULTI_AUTODETECT', "Activer la détection automatique du port USB:");
$smarty->assign('LANG_SYSTEME_MULTI_TYPES', "Type d'appareils:");
$smarty->assign('LANG_SYSTEME_MULTI_CURRENT', "Actuellement: ");
$smarty->assign('LANG_SYSTEME_MULTI_DIFFERENT', "Appareils différents");
$smarty->assign('LANG_SYSTEME_MULTI_IDENTICAL', "Appareils identiques");
$smarty->assign('LANG_SYSTEME_MULTI_BUTTON', "Enregistrer les modifications");
$smarty->assign('LANG_SYSTEME_MULTI_TIP', "Ces fonctionalités ne sont utiles que lorsque plusieurs appareils photo USB sont utilisés.");

$smarty->assign('LANG_SYSTEME_PHIDGET_TITLE', "Carte électronique Phidget");
$smarty->assign('LANG_SYSTEME_PHIDGET_ACTIVATE', "Activer Phidget");
$smarty->assign('LANG_SYSTEME_PHIDGET_SCREEN', "Affichage écran pour la source: ");
$smarty->assign('LANG_SYSTEME_PHIDGET_SCREEN_DISABLED', "Désactivé");
$smarty->assign('LANG_SYSTEME_PHIDGET_SCREEN_SOURCE', "Source");

$smarty->assign('LANG_SYSTEME_FTP_TITLE', "Compte FTP global");
$smarty->assign('LANG_SYSTEME_FTP_USERNAME', "Nom d'utilisateur:");
$smarty->assign('LANG_SYSTEME_FTP_PASSWORD', "Mot de passe:");
$smarty->assign('LANG_SYSTEME_FTP_BUTTON', "Créer/Modifier utilisateur");
$smarty->assign('LANG_SYSTEME_FTP_TIP', "Ces identifiants sont utilisés pour vous connecter au webcampak pour ajouter ou télécharger des fichiers (watermark, musique, logs).");

$smarty->assign('LANG_SYSTEME_STATS_TITLE', "Statistiques");
$smarty->assign('LANG_SYSTEME_STATS_ACTIVATE', "Activer la collecte de statistiques");

$smarty->assign('LANG_SYSTEME_GPHOTO_TITLE', "Version Gphoto2");
$smarty->assign('LANG_SYSTEME_UPTIME_TITLE', "Uptime & Disk");
$smarty->assign('LANG_SYSTEME_PS_TITLE', "Processus Système (ps aux)");

?>
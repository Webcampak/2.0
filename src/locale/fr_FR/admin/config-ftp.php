<?php 
$smarty->assign('LANG_CONFIGFTP_SOURCE', "Source");
$smarty->assign('LANG_CONFIGFTP_TITLE', ": Configuration FTP");
$smarty->assign('LANG_CONFIGFTP_TIP', "Astuce:");


$smarty->assign('LANG_CONFIGFTP_FTPTEST_TITLE', "Tester les paramètres FTP");
$smarty->assign('LANG_CONFIGFTP_FTPTEST_TYPE', "Type de test:");
$smarty->assign('LANG_CONFIGFTP_FTPTEST_TYPESIMPLE', "Test simple");
$smarty->assign('LANG_CONFIGFTP_FTPTEST_TYPEPIC', "Test avec prise de photo");
$smarty->assign('LANG_CONFIGFTP_FTPTEST_TYPEPICDISABLED', "Test avec prise de photo - Fonctionalité désactivée");
$smarty->assign('LANG_CONFIGFTP_FTPTEST_BUTTON', "Tester les paramètres FTP");
$smarty->assign('LANG_CONFIGFTP_FTPTEST_LOG', "Log FTP:");
$smarty->assign('LANG_CONFIGFTP_FTPTEST_TIP', "Le test des paramètres FTP entraine la mise en ligne, dans le répertoire photos, d'un fichier 'ftpupload.txt'.");

$smarty->assign('LANG_CONFIGFTP_ARCHIVES_TITLE', "Paramètres FTP - Archives Photos et Videos");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_PICUPLOAD', "Archiver les photos sur le FTP:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_VIDUPLOAD', "Mettre en ligne les videos AVI archivées:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_WEBVIDUPLOAD', "Mettre en ligne les videos FLV archivées:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_FTPSERVER', "Serveur FTP:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_FTPUSERNAME', "Utilisateur:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_FTPPASSWORD', "Mot de passe:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_FTPBASEDIR', "Répertoire de base:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_FTPPICDIR', "Répertoire Photos:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_FTPVIDDIR', "Répertoire Videos:");
$smarty->assign('LANG_CONFIGFTP_ARCHIVES_FTPACTIVE', "FTP Mode Actif (Port Mode):");

$smarty->assign('LANG_CONFIGFTP_SECONDFTP_TITLE', "Paramètres FTP - Second serveur FTP");
$smarty->assign('LANG_CONFIGFTP_SECONDFTP_PICUPLOAD', "Archiver les photos sur le FTP:");
$smarty->assign('LANG_CONFIGFTP_SECONDFTP_FTPSERVER', "Serveur FTP:");
$smarty->assign('LANG_CONFIGFTP_SECONDFTP_FTPUSERNAME', "Utilisateur:");
$smarty->assign('LANG_CONFIGFTP_SECONDFTP_FTPPASSWORD', "Mot de passe:");
$smarty->assign('LANG_CONFIGFTP_SECONDFTP_FTPPICDIR', "Répertoire Photos:");
$smarty->assign('LANG_CONFIGFTP_SECONDFTP_FTPACTIVE', "FTP Mode Actif (Port Mode):");

$smarty->assign('LANG_CONFIGFTP_HOTLINK_TITLE', "Paramètres FTP - Fichiers Statiques (Hotlink)");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_PICUPLOAD', "Mettre en ligne les photos statiques*:");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_VIDUPLOAD', "Mettre en ligne les vidéos téléchargeables statiques* (AVI):");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_WEBVIDUPLOAD', "Mettre en ligne les vidéos streaming statiques* (FLV):");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_FTPSERVER', "Serveur FTP:");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_FTPUSERNAME', "Utilisateur:");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_FTPPASSWORD', "Mot de passe:");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_FTPDIR', "Répertoire Hotlink*:");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_FTPACTIVE', "FTP Mode Actif (Port Mode):");
$smarty->assign('LANG_CONFIGFTP_HOTLINK_TIP', "Les fichiers 'hotlink' sont des fichiers qui conservent un même nom et url quelque soit leur contenu, il est donc possible de faire pointer un site web vers ces fichiers.<br />
Les fichiers 'hotlink' peuvent êtres mis en ligne sur le même emplacement que les archives, ces sections ont étés séparées pour plus de souplesse dans la configuration.
");
$smarty->assign('LANG_CONFIGFTP_BUTTON', "Enregistrer les modifications");

?>

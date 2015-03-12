<?php 
$smarty->assign('LANG_PHOTOS_SOURCE', "Source");
$smarty->assign('LANG_PHOTOS_TITLE', ": Configuration photos");
$smarty->assign('LANG_PHOTOS_TIP', "Astuce:");

$smarty->assign('LANG_PHOTOS_TIME_TITLE', "Prise de vue");
$smarty->assign('LANG_PHOTOS_TIME_NORESTRICTIONS', "Pas de restriction horaire:");
$smarty->assign('LANG_PHOTOS_TIME_START', "Démarrer la prise de vue à:");
$smarty->assign('LANG_PHOTOS_TIME_END', "Terminer la prise de vue à:");
$smarty->assign('LANG_PHOTOS_TYPE_CAPTUREDELAYDATE', "Date du cliché:");
$smarty->assign('LANG_PHOTOS_TYPE_CAPTUREDELAYDATECAPTURE', "Déclenchement Capture");
$smarty->assign('LANG_PHOTOS_TYPE_CAPTUREDELAYDATESCRIPT', "Déclenchement Script");

$smarty->assign('LANG_PHOTOS_CROP_TITLE', "Recadrer");
$smarty->assign('LANG_PHOTOS_CROP_ACTIVATE', "Recadrer les images:");
$smarty->assign('LANG_PHOTOS_CROP_SIZE', "Taille de la zone à découper:");
$smarty->assign('LANG_PHOTOS_CROP_LOCATION', "Positionnement:");

$smarty->assign('LANG_PHOTOS_LEGEND_TITLE', "Légende");
$smarty->assign('LANG_PHOTOS_LEGEND_ACTIVATE', "Intégrer une légende dans l'image:");
$smarty->assign('LANG_PHOTOS_LEGEND_LEGEND', "Légende:");
$smarty->assign('LANG_PHOTOS_LEGEND_FORMAT', "Format date:");
$smarty->assign('LANG_PHOTOS_LEGEND_NODATE', "Ne pas intégrer la date");
$smarty->assign('LANG_PHOTOS_LEGEND_FORMAT4', "Thursday 25 January 2010 - 09h30");
$smarty->assign('LANG_PHOTOS_LEGEND_FORMAT5', "25 January 2010 - 09h30");
$smarty->assign('LANG_PHOTOS_LEGEND_ADVANCED', "Configuration avancée du texte:");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTSIZE', "Taille du texte:");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTLOCATION', "Position du texte:");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTSOUTHWEST', "En bas à gauche (southwest)");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTSOUTH', "En bas au milieu (south)");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTSOUTHEAST', "En bas à droite (southeast)");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTEAST', "Au milieu à droite (east)");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTNORTHEAST', "En haut à droite (northeast)");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTNORTH', "En haute au milieu (north)");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTNORTWEST', "En haut à gauche (northwest)");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTWEST', "Au milieu à gauche (west)");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTNAME', "Police de caractères:");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTSHADOWCOLOR', "Couleur de l'ombre:");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTSHADOWCOORDINATES', "Position de l'ombre:");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTCOLOR', "Couleur du texte:");
$smarty->assign('LANG_PHOTOS_LEGEND_FONTCOORDINATES', "Position du texte:");

$smarty->assign('LANG_PHOTOS_WATERMARK_TITLE', "Ajout d'un watermark (incruster une image)");
$smarty->assign('LANG_PHOTOS_WATERMARK_ACTIVATE', "Ajouter un watermark à l'image:");
$smarty->assign('LANG_PHOTOS_WATERMARK_SOURCE', "Source Watermark:");
$smarty->assign('LANG_PHOTOS_WATERMARK_TRANSPARENCY', "Transparence:");
$smarty->assign('LANG_PHOTOS_WATERMARK_XCOORDINATE', "Position horizontale (X):");
$smarty->assign('LANG_PHOTOS_WATERMARK_YCOORDINATE', "Position verticale (Y):");
$smarty->assign('LANG_PHOTOS_WATERMARK_TIP', "Placez les images au format png dans le répertoire /watermark/ disponible en FTP ce répertoire est commun à toutes les sources. <br />	Le coin supérieur gauche de la photo source est utilisé comme point de référence pour le positionnement <br /><strong>Attention:</strong> Les noms de fichiers doivent être sans espace et caractères spéciaux.");

$smarty->assign('LANG_PHOTOS_PHIDGET_TITLE', "Incrustations mesures Phidget");
$smarty->assign('LANG_PHOTOS_PHIDGET_TEMPERATURE_ACTIVATE', "Ajouter la température à l'image");
$smarty->assign('LANG_PHOTOS_PHIDGET_TEMPERATURE_SIZE', "Taille de l'incrustation (par exemple: 320x240)");
$smarty->assign('LANG_PHOTOS_PHIDGET_TEMPERATURE_DISSOLVE', "Transparence:");
$smarty->assign('LANG_PHOTOS_PHIDGET_TEMPERATURE_XCOORDINATE', "Position horizontale (X):");
$smarty->assign('LANG_PHOTOS_PHIDGET_TEMPERATURE_YCOORDINATE', "Position verticale (Y):");
$smarty->assign('LANG_PHOTOS_PHIDGET_LUMINOSITY_ACTIVATE', "Ajouter la luminosité à l'image");
$smarty->assign('LANG_PHOTOS_PHIDGET_LUMINOSITY_SIZE', "Taille de l'incrustation (par exemple: 320x240)");
$smarty->assign('LANG_PHOTOS_PHIDGET_LUMINOSITY_DISSOLVE', "Transparence:");
$smarty->assign('LANG_PHOTOS_PHIDGET_LUMINOSITY_XCOORDINATE', "Position horizontale (X):");
$smarty->assign('LANG_PHOTOS_PHIDGET_LUMINOSITY_YCOORDINATE', "Position verticale (Y):");

$smarty->assign('LANG_PHOTOS_ARCHIVES_TITLE', "Archivage");
$smarty->assign('LANG_PHOTOS_ARCHIVES_ACTIVATE', "Archiver les photos:");
$smarty->assign('LANG_PHOTOS_ARCHIVES_WARNING', "Attention, si l'archivage est désactivé la génération de vidéo est impossible.");
$smarty->assign('LANG_PHOTOS_ARCHIVES_RESIZEACTIVATE', "Redimensionner la photo avant archivage:");
$smarty->assign('LANG_PHOTOS_ARCHIVES_RESIZESIZE', "Résolution redimensionnement (par exemple: 1024x768):");
$smarty->assign('LANG_PHOTOS_ARCHIVES_PICSIZE', "Taille minimale des photos:");
$smarty->assign('LANG_PHOTOS_ARCHIVES_PICDELETE', "Les photos en dessous de cette taille seront supprimées.");
$smarty->assign('LANG_PHOTOS_ARCHIVES_DELETEPICAFTER', "Supprimer les photos après:");
$smarty->assign('LANG_PHOTOS_ARCHIVES_DAYS', "jours");
$smarty->assign('LANG_PHOTOS_ARCHIVES_DELETEPICAFTERDELETE', "0 = pas de limite. Il ne sera plus possible de générer les vidéos correspondant aux images supprimées.");
$smarty->assign('LANG_PHOTOS_ARCHIVES_MAXSIZE', "Taille maximale de l'ensemble des photos:");
$smarty->assign('LANG_PHOTOS_ARCHIVES_MB', "Mbytes");
$smarty->assign('LANG_PHOTOS_ARCHIVES_MAXSIZEDELETE', "0 = pas de limite. Il ne sera plus possible de générer les vidéos correspondant aux images supprimées. Au dela de cette valeur la journée de capture la plus ancienne sera supprimée.");

$smarty->assign('LANG_PHOTOS_HOTLINK_TITLE', "Images statiques (hotlink)");
$smarty->assign('LANG_PHOTOS_HOTLINK_RESIZE', "Redimensionner les photos:");
$smarty->assign('LANG_PHOTOS_HOTLINK_IFOTHER', "Si autre, précisez:");
$smarty->assign('LANG_PHOTOS_HOTLINK_OTHERSIZES', "Autre Résolution");
$smarty->assign('LANG_PHOTOS_HOTLINK_DISABLED', "Désactivé");
$smarty->assign('LANG_PHOTOS_HOTLINK_FORMAT1', "Format 1:");
$smarty->assign('LANG_PHOTOS_HOTLINK_FORMAT2', "Format 2:");
$smarty->assign('LANG_PHOTOS_HOTLINK_FORMAT3', "Format 3:");
$smarty->assign('LANG_PHOTOS_HOTLINK_FORMAT4', "Format 4:");
$smarty->assign('LANG_PHOTOS_HOTLINK_EXAMPLE', "(par exemple: 1024x768)");
$smarty->assign('LANG_PHOTOS_HOTLINKERROR_ACTIVATE', "Générer une image hotlink en cas d'erreur de capture:");

$smarty->assign('LANG_PHOTOS_HOTLINK_TIP', "Une image ou une vidéo statique est un élément dont le contenu change mais le nom reste identique. <br />Ces éléments peuvent êtres consultés directement par le biais de liens Internet, aussi appelés 'hotlink'. <br />");

$smarty->assign('LANG_PHOTOS_FTP_TITLE', "Envoi des photos par FTP");
$smarty->assign('LANG_PHOTOS_FTP_MAINFTP', "Envoi des clichés vers:");
$smarty->assign('LANG_PHOTOS_FTP_MAINFTPRETRY', "Nombre d'essais en cas d'erreur:");
$smarty->assign('LANG_PHOTOS_FTP_SECONDFTP', "Envoi une copie des clichés vers:");
$smarty->assign('LANG_PHOTOS_FTP_SECONDFTPRETRY', "Nombre d'essais en cas d'erreur:");
$smarty->assign('LANG_PHOTOS_FTP_HOTLINKFTP', "Envoi des fichiers hotlink vers:");
$smarty->assign('LANG_PHOTOS_FTP_HOTLINKRETRY', "Nombre d'essais en cas d'erreur:");
$smarty->assign('LANG_PHOTOS_FTP_DISABLED', "Désactivé");
$smarty->assign('LANG_PHOTOS_FTP_NORETRY', "Pas de nouvelle tentative");

$smarty->assign('LANG_PHOTOS_BUTTON', "Enregistrer les modifications");

?>
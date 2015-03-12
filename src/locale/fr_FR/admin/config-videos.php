<?php 
$smarty->assign('LANG_VIDEOS_SOURCE', "Source");
$smarty->assign('LANG_VIDEOS_TITLE', ": Configuration des vidéos");
$smarty->assign('LANG_VIDEOS_TIP', "Astuce:");

$smarty->assign('LANG_VIDEOS_DAILY_TITLE', "Création des fichiers vidéo quotidiens");
$smarty->assign('LANG_VIDEOS_DAILY_FORMAT', "Format");
$smarty->assign('LANG_VIDEOS_DAILY_WEB', "Web<br />(MP4)");
$smarty->assign('LANG_VIDEOS_DAILY_DESCRIPTION', "Description");
$smarty->assign('LANG_VIDEOS_DAILY_EFFECT', "Effet Visuel*<br /><i>Expérimental</i>");
$smarty->assign('LANG_VIDEOS_DAILY_MINSIZE', "Taille Min. <br /><i>(Ko)</i>");
$smarty->assign('LANG_VIDEOS_DAILY_SPEED', "Vitesse<br /><i>création</i>");
$smarty->assign('LANG_VIDEOS_DAILY_HD', "- Haute Définition (HD) - H.264:");
$smarty->assign('LANG_VIDEOS_DAILY_HDMAX', "Format HD, affichage de qualité maximale.");
$smarty->assign('LANG_VIDEOS_DAILY_HDGOOD', "Format HD, affichage de très bonne qualité.");
$smarty->assign('LANG_VIDEOS_DAILY_SD', "- Moyenne Définition:");
$smarty->assign('LANG_VIDEOS_DAILY_SDDVD', "Qualité similaire DVD.");
$smarty->assign('LANG_VIDEOS_DAILY_CUSTOM', "H. 264 (Personnalisé):");
$smarty->assign('LANG_VIDEOS_DAILY_CUSTOMTXT', "Compression H.264, résolution personnalisable.");
$smarty->assign('LANG_VIDEOS_DAILY_NO', "Non");
$smarty->assign('LANG_VIDEOS_DAILY_WARNING', "<strong><span class='blue'>Attention:</span></strong><br /> - *La fonction effet visuel, proposée à titre <u>expérimental</u>, est très consommatrice en ressources. Attendez vous à un temps de création de vidéo multiplié par deux au minimum. <br /> - La modification de formats n'est pas rétro-actif. Les  vidéos pour les jours précédents ne seront pas re-crées.");

$smarty->assign('LANG_VIDEOS_ADVANCED_TITLE', "Paramètres avancés - Compression vidéo");
$smarty->assign('LANG_VIDEOS_ADVANCED_FORMAT', "Format");
$smarty->assign('LANG_VIDEOS_ADVANCED_FPS', "FPS");
$smarty->assign('LANG_VIDEOS_ADVANCED_BITRATE', "Bitrate");
$smarty->assign('LANG_VIDEOS_ADVANCED_RESOLUTION', "Résolution");
$smarty->assign('LANG_VIDEOS_ADVANCED_CUT', "Découpe");
$smarty->assign('LANG_VIDEOS_ADVANCED_PASSES', "2 Passes");
$smarty->assign('LANG_VIDEOS_ADVANCED_HD', "- Haute Définition (HD) - H.264:");
$smarty->assign('LANG_VIDEOS_ADVANCED_SD', "- Moyenne Définition:");
$smarty->assign('LANG_VIDEOS_ADVANCED_CUSTOM', "H. 264 (Personnalisé):");

$smarty->assign('LANG_VIDEOS_PREPROCESS_TITLE', "Paramètres avancés - Manipulations pré-traitement");
$smarty->assign('LANG_VIDEOS_PREPROCESS_TEXT', "Ces options correspondent à des fonctionalités avancées et permettent de manipuler les images juste avant la création de la vidéo. Attention ces fonctionalités sont très gourmandes en ressources système.<br />");
$smarty->assign('LANG_VIDEOS_PREPROCESS_LEGEND', "Légende");
$smarty->assign('LANG_VIDEOS_PREPROCESS_LEGENDTXT', "Intégrer une légende dans l'image avant création de la vidéo:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_LEGENDVALUE', "Légende:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FORMAT', "Format date:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_NODATE', "Ne pas intégrer la date");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FORMAT4', "Thursday 25 January 2010 - 09h30");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FORMAT5', "25 January 2010 - 09h30");
$smarty->assign('LANG_VIDEOS_PREPROCESS_ADVANCED', "Configuration avancée du texte:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTSIZE', "Taille du texte:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTLOCATION', "Position du texte:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTSOUTHWEST', "En bas à gauche (southwest)");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTSOUTH', "En bas au milieu (south)");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTSOUTHEAST', "En bas à droite (southeast)");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTEAST', "Au milieu à droite (east)");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTNORTHEAST', "En haut à droite (northeast)");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTNORTH', "En haute au milieu (north)");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTNORTWEST', "En haut à gauche (northwest)");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTWEST', "Au milieu à gauche (west)");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTNAME', "Police de caractères:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTSHADOWCOLOR', "Couleur de l'ombre:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTSHADOWCOORDINATES', "Position de l'ombre:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTCOLOR', "Couleur du texte:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_FONTCOORDINATES', "Position du texte:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_RESIZE', "Redimensionnement");
$smarty->assign('LANG_VIDEOS_PREPROCESS_RESIZETXT', "Redimensionner la photo avant création vidéo:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_RESIZETXTVALUE', "Résolution redimensionnement (par exemple: 2272x1704):");
$smarty->assign('LANG_VIDEOS_PREPROCESS_TIP', "La fonctionalité de redimensionnement pre-traitement est utile si les sources ont une résolution très importante.");

$smarty->assign('LANG_VIDEOS_AUDIO_TITLE', "Ajout d'une piste audio aux vidéos quotidiennes");
$smarty->assign('LANG_VIDEOS_AUDIO_ADDTRACK', "Ajouter une piste audio:");
$smarty->assign('LANG_VIDEOS_AUDIO_AUDIOFILE', "Fichier Audio:");
$smarty->assign('LANG_VIDEOS_AUDIO_TIP', "Placez les fichiers audio dans le répertoire /audio/ disponible en FTP ce répertoire est commun à toutes les sources. <br /><strong>Attention:</strong> Les noms de fichiers doivent être sans espace et caractères spéciaux.");

$smarty->assign('LANG_VIDEOS_WATERMARK_TITLE', "Ajout d'un watermark (image incrustée à la vidéo)");
$smarty->assign('LANG_VIDEOS_WATERMARK_ADDWATERMARK', "Ajouter un watermark à la vidéo:");
$smarty->assign('LANG_VIDEOS_WATERMARK_WATERMARKFILE', "Source Watermark:");
$smarty->assign('LANG_VIDEOS_WATERMARK_TRANSPARENCY', "Transparance:");
$smarty->assign('LANG_VIDEOS_WATERMARK_XCOORDINATE', "Position horizontale (X):");
$smarty->assign('LANG_VIDEOS_WATERMARK_YCOORDINATE', "Position verticale (Y):");
$smarty->assign('LANG_VIDEOS_WATERMARK_TIP', "	Placez les images au format png dans le répertoire /watermark/ disponible en FTP ce répertoire est commun à toutes les sources. <br />	Le coin supérieur gauche de la photo source est utilisé comme point de référence pour le positionnement <br /> <strong>Attention:</strong> Les noms de fichiers doivent être sans espace et caractères spéciaux.");

$smarty->assign('LANG_VIDEOS_FILTER_TITLE', "Paramètres avancés - Filtrer images similaires");
$smarty->assign('LANG_VIDEOS_FILTER_ACTIVATE', "Activer le filtre images similaires");
$smarty->assign('LANG_VIDEOS_FILTER_TIP', "Cette fonction vous permet de comparer deux images consécutives et de ne pas utiliser les images si il y a trop peu de différences.<br />
Vous pouvez de plus appliquer un masque aux images pour ne prendre en compte qu'une partie d'une image (la zone correspondant au sujet du timelapse)<br /> 
Placez les images au format png dans le répertoire /watermark/ disponible en FTP ce répertoire est commun à toutes les sources.<br />
Cette option n'est pas compatible en cas de transition (zoom, deplacement, ...)");
$smarty->assign('LANG_VIDEOS_FILTER_WATERMARKFILE', "Ajouter un masque:");
$smarty->assign('LANG_VIDEOS_FILTER_VALUE', "Seuil maximum:");

$smarty->assign('LANG_PHOTOS_PHIDGET_TITLE', "Paramètres avancés - Incrustations mesures Phidget");
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

$smarty->assign('LANG_VIDEOS_PHIDGET_TITLE', "Incrustations mesures Phidget");
$smarty->assign('LANG_VIDEOS_PHIDGET_INSERTIMAGE', "Incrustation image");
$smarty->assign('LANG_VIDEOS_PHIDGET_SENSOR', "Capteur");
$smarty->assign('LANG_VIDEOS_PHIDGET_TYPE', "Type");
$smarty->assign('LANG_VIDEOS_PHIDGET_PORT', "Port");
$smarty->assign('LANG_VIDEOS_PHIDGET_TEXT', "Désignation");
$smarty->assign('LANG_VIDEOS_PHIDGET_COLOR', "Couleur");
$smarty->assign('LANG_VIDEOS_PHIDGET_INSERT', "Incruster");
$smarty->assign('LANG_VIDEOS_PHIDGET_RESOLUTION', "Résolution");
$smarty->assign('LANG_VIDEOS_PHIDGET_TRANSPARENCY', "Transparence");
$smarty->assign('LANG_VIDEOS_PHIDGET_XLOCATION', "Position (x)");
$smarty->assign('LANG_VIDEOS_PHIDGET_YLOCATION', "Position (y)");
$smarty->assign('LANG_VIDEOS_ERROR_DISABLED', "Désactivé");

$smarty->assign('LANG_VIDEOS_YOUTUBE_TITLE', "Upload Youtube");
$smarty->assign('LANG_VIDEOS_YOUTUBE_ACTIVATE', "Activer l'upload vers Youtube:");
$smarty->assign('LANG_VIDEOS_YOUTUBE_CATEGORY', "Catégorie Vidéo:");
$smarty->assign('LANG_VIDEOS_YOUTUBE_TIP', "Pour uploader vers Youtube une clef d'authentification doit être stockée sur le webcampak avec vos identifiants de connexion. Cette procédure a déjà été réalisée par nos soins.<br /> 	La vidéo avec la plus forte qualité sera uploadée vers Youtube<br />");

$smarty->assign('LANG_VIDEOS_FTP_TITLE', "Envoi des vidéos par FTP");
$smarty->assign('LANG_VIDEOS_FTP_MAINAVI', "Envoi des fichiers vidéo AVI vers:");
$smarty->assign('LANG_VIDEOS_FTP_MAINMP4', "Envoi des fichiers vidéo MP4 vers:");
$smarty->assign('LANG_VIDEOS_FTP_HOTLINKAVI', "Envoi des fichiers vidéo hotlink AVI vers:");
$smarty->assign('LANG_VIDEOS_FTP_HOTLINKMP4', "Envoi des fichiers vidéo hotlink MP4 vers:");
$smarty->assign('LANG_VIDEOS_FTP_FTPRETRY', "Nombre d'essais en cas d'erreur:");
$smarty->assign('LANG_VIDEOS_FTP_DISABLED', "Désactivé");
$smarty->assign('LANG_VIDEOS_FTP_NORETRY', "Pas de nouvelle tentative");

$smarty->assign('LANG_VIDEOS_BUTTON', "Enregistrer les modifications");

?>

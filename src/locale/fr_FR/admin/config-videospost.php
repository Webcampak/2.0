<?php 
$smarty->assign('LANG_VIDEOS_SOURCE', "Source");
$smarty->assign('LANG_VIDEOS_TITLE', ": Préparation Post-Production (Expérimental)");
$smarty->assign('LANG_VIDEOS_TIP', "Astuce:");


$smarty->assign('LANG_VIDEOS_DIMENSIONS_TITLE', "Sélection de la zone dans l'image source");
$smarty->assign('LANG_VIDEOS_DIMENSIONS_ACTIVATE', "Activer la découpe de l'image:");
$smarty->assign('LANG_VIDEOS_DIMENSIONS_CROPZONE', "Taille de la zone à découper:");
$smarty->assign('LANG_VIDEOS_DIMENSIONS_CROPLOCATION', "Positionnement:");
$smarty->assign('LANG_VIDEOS_DIMENSIONS_TIP', "Indiquez, dans votre image source pleine taille, la zone à découper. Aidez-vous d'un logiciel de traitement d'image pour identifer précisément la zone souhaitée.<br />
Veillez à <b>conserver la même échelle</b> que votre résolution vidéo cible");

$smarty->assign('LANG_VIDEOS_TRANSITION_TITLE', "Insérer une transition (travelling)");
$smarty->assign('LANG_VIDEOS_TRANSITION_ACTIVATE', "Activer la transition:");
$smarty->assign('LANG_VIDEOS_TRANSITION_CROPZONE', "Taille de la zone à découper (cible):");
$smarty->assign('LANG_VIDEOS_TRANSITION_CROPLOCATION', "Positionnement (cible):");
$smarty->assign('LANG_VIDEOS_TRANSITION_TIP', "Lorsque vous activez une transition, le système calculera automatiquement comment réaliser un déplacement depuis les coordonnées source (premier menu) vers les coordonées de transition (ci-dessus).");

$smarty->assign('LANG_VIDEOS_THUMBNAIL_TITLE', "Insérer une vignette dans l'image");
$smarty->assign('LANG_VIDEOS_THUMBNAIL_BORDER', "Ajouter une bordure autour de la vignette");
$smarty->assign('LANG_VIDEOS_THUMBNAIL_TIP', "Cette fonction vous permet d'insérer une vignette dans l'image. L'image brute sera utilisée pour créer la vignette, pensez 
à l'utiliser pour déterminer les coordonnées. La vignette est ensuite intégrée à l'image redimensionnée (Image Destination).");
$smarty->assign('LANG_VIDEOS_THUMBNAIL_ACTIVATE', "Activer la création de vignette:");
$smarty->assign('LANG_VIDEOS_THUMBNAIL_TITLE', "Insérer une vignette dans l'image");
$smarty->assign('LANG_VIDEOS_THUMBNAIL_SRCCROPZONE', "<b>Image Source</b>: Taille de la zone à découper");
$smarty->assign('LANG_VIDEOS_THUMBNAIL_SRCCROPLOCATION', "<b>Image Source</b>: Emplacement de la zone à découper");
$smarty->assign('LANG_VIDEOS_THUMBNAIL_DSTZONE', "<b>Image Destination</b>: Taille de la vignette");
$smarty->assign('LANG_VIDEOS_THUMBNAIL_DSTLOCATION', "<b>Image Destination</b>: Emplacement de la vignette");


$smarty->assign('LANG_VIDEOS_SIZE_TITLE', "Résolution de votre vidéo");
$smarty->assign('LANG_VIDEOS_SIZE_ACTIVATE', "Activer le redimensionnement de l'image:");
$smarty->assign('LANG_VIDEOS_SIZE_SIZE', "Résolution de votre vidéo:");
$smarty->assign('LANG_VIDEOS_SIZE_TIP', "Renseignez ici la taille souhaitée pour votre vidéo, l'image découpée (section précédente) sera redimensionnée à cette résolution.");

$smarty->assign('LANG_VIDEOS_EFFECT_TITLE', "Appliquer un effet à vos images (Experimental)");
$smarty->assign('LANG_VIDEOS_EFFECT_EFFECT', "Sélectionnez un effet:");
$smarty->assign('LANG_VIDEOS_EFFECT_TIP', "Cette fonction est expérimentale, sélectionnez ici le type d'effet souhaité.");
$smarty->assign('LANG_VIDEOS_EFFECT_NONE', "Aucun");

$smarty->assign('LANG_VIDEOS_WATERMARK_TITLE', "Insertion d'un watermark (image incrustée)");
$smarty->assign('LANG_VIDEOS_WATERMARK_ADDWATERMARK', "Ajouter un watermark:");
$smarty->assign('LANG_VIDEOS_WATERMARK_WATERMARKFILE', "Source Watermark:");
$smarty->assign('LANG_VIDEOS_WATERMARK_TRANSPARENCY', "Transparance:");
$smarty->assign('LANG_VIDEOS_WATERMARK_XCOORDINATE', "Position horizontale (X):");
$smarty->assign('LANG_VIDEOS_WATERMARK_YCOORDINATE', "Position verticale (Y):");
$smarty->assign('LANG_VIDEOS_WATERMARK_TIP', "Placez les images au format png dans le répertoire /watermark/ disponible en FTP ce répertoire est commun à toutes les sources. <br /> Le coin supérieur gauche de l'image redimensionnée est utilisé comme point de référence pour le positionnement <br /> <strong>Attention:</strong> Les noms de fichiers doivent être sans espace et caractères spéciaux.");

$smarty->assign('LANG_VIDEOS_FILTER_TITLE', "Filtrer images similaires");
$smarty->assign('LANG_VIDEOS_FILTER_ACTIVATE', "Activer le filtre images similaires");
$smarty->assign('LANG_VIDEOS_FILTER_TIP', "Cette fonction vous permet de comparer deux images consécutives et de ne pas utiliser les images si il y a trop peu de différences.<br />
Vous pouvez de plus appliquer un masque aux images pour ne prendre en compte qu'une partie d'une image (la zone correspondant au sujet du timelapse)<br /> 
Placez les images au format png dans le répertoire /watermark/ disponible en FTP ce répertoire est commun à toutes les sources.<br />
Cette option n'est pas compatible en cas de transition (zoom, deplacement, ...)");
$smarty->assign('LANG_VIDEOS_FILTER_WATERMARKFILE', "Ajouter un masque:");
$smarty->assign('LANG_VIDEOS_FILTER_VALUE', "Seuil maximum:");

$smarty->assign('LANG_VIDEOS_PREPROCESS_TITLE', "Insérer une légende");
$smarty->assign('LANG_VIDEOS_PREPROCESS_LEGENDTXT', "Intégrer une légende dans l'image:");
$smarty->assign('LANG_VIDEOS_PREPROCESS_LEGENDVALUE', "Texte:");
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

$smarty->assign('LANG_VIDEOS_BUTTON', "Enregistrer les modifications");

$smarty->assign('LANG_VIDEOS_CUSTOM_TITLE', "Préparer les images");
$smarty->assign('LANG_VIDEOS_CUSTOM_FILENAME', "Nom du fichier (sans espaces): ");
$smarty->assign('LANG_VIDEOS_CUSTOM_FROM', "Du:");
$smarty->assign('LANG_VIDEOS_CUSTOM_AT', "à");
$smarty->assign('LANG_VIDEOS_CUSTOM_JANUARY', "Janvier");
$smarty->assign('LANG_VIDEOS_CUSTOM_FEBRUARY', "Février");
$smarty->assign('LANG_VIDEOS_CUSTOM_MARCH', "Mars");
$smarty->assign('LANG_VIDEOS_CUSTOM_APRIL', "Avril");
$smarty->assign('LANG_VIDEOS_CUSTOM_MAY', "Mai");
$smarty->assign('LANG_VIDEOS_CUSTOM_JUNE', "Juin");
$smarty->assign('LANG_VIDEOS_CUSTOM_JULY', "Juillet");
$smarty->assign('LANG_VIDEOS_CUSTOM_AUGUST', "Août");
$smarty->assign('LANG_VIDEOS_CUSTOM_SEPTEMBER', "Septembre");
$smarty->assign('LANG_VIDEOS_CUSTOM_OCTOBER', "Octobre");
$smarty->assign('LANG_VIDEOS_CUSTOM_NOVEMBER', "Novembre");
$smarty->assign('LANG_VIDEOS_CUSTOM_DECEMBER', "Décembre");
$smarty->assign('LANG_VIDEOS_CUSTOM_TO', "Au:");
$smarty->assign('LANG_VIDEOS_CUSTOM_KEEPPICTURES', "Conserver les images entre:");
$smarty->assign('LANG_VIDEOS_CUSTOM_AND', "et");
$smarty->assign('LANG_VIDEOS_CUSTOM_START', "Démarrer la création:");
$smarty->assign('LANG_VIDEOS_CUSTOM_DISABLED', "Désactivé");
$smarty->assign('LANG_VIDEOS_CUSTOM_ASAP', "Dès que possible");
$smarty->assign('LANG_VIDEOS_CUSTOM_NIGHT', "Entre 4h00 et 5h00 du matin");
$smarty->assign('LANG_VIDEOS_CUSTOM_MININTERVAL', "Intervalle minimum entre deux clichés:");
$smarty->assign('LANG_VIDEOS_CUSTOM_MININTERVAL_MINUTES', "Minutes");
$smarty->assign('LANG_VIDEOS_CUSTOM_MININTERVAL_SECONDS', "Secondes");
$smarty->assign('LANG_VIDEOS_CUSTOM_ADDAUDIO', "Ajouter une piste audio:");
$smarty->assign('LANG_VIDEOS_CUSTOM_AUDIOFILE', "Fichier Audio:");
$smarty->assign('LANG_VIDEOS_CUSTOM_EMAIL', "Avertir par email:");
$smarty->assign('LANG_VIDEOS_CUSTOM_COPYTOSOURCE', "Déplacer les images vers une autre source:");
$smarty->assign('LANG_VIDEOS_CUSTOM_TIP', "<br />Attention aux ressources consommées qui pourraient impacter la bonne capture et le traitement des autres sources. <br />Préférez un démarrage de nuit si la quantité de photos est importante et la qualité de vidéo élevée.");

?>

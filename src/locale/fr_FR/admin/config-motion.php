<?php 
$smarty->assign('LANG_CONFIGAVANCE_SOURCE', "Source");
$smarty->assign('LANG_CONFIGAVANCE_TITLE', ": Configuration Détection de Mouvements");

$smarty->assign('LANG_MOTION_OVERVIEW_TITLE', "Présentation");
$smarty->assign('LANG_MOTION_OVERVIEW_EXPLANATION', "La détection de mouvements a été conçue pour être activée sur un Webcampak équipé d'un appareil photo numérique Reflex. <br /> La détection passe par l'utilisation d'une Webcam USB (détection de mouvements) et d'un appareil photo numérique (prise de clichés).<br />
Les modes de captures suivants sont disponibles:<br />
- <b>Capture régulière</b>: Le Webcampak capture régulièrement des clichés, la détection de mouvements est désactivée<br/>
- <b>Capture régulière + Détection de mouvements</b>: Le Webcampak capture régulièrement des clichés, si un mouvement est détecté des clichés complémentaires seront réalisés. Il est nécessaire de définir deux paramètres, l'intervalle minimale de capture (voir section ''Source'') qui indique le temps qui doit s'écouler entre deux prise de clichés et l'intervalle minimale de détection de mouvements, qui indique le temps qui doit s'écouler entre deux mouvements avant de déclencher une prise de clichés.<br/>
- <b>Détection de mouvements uniquement</b>: Le Webcampak ne capture des clichés que lorsqu'il y a un mouvement. Il est nécessaire de définir l'intervalle minimale de détection de mouvements.<br/>

");

$smarty->assign('LANG_CONFIGAVANCE_MOTION_TITLE', "Détection de mouvements");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_ACTIVATE', "Activer détection de mouvements");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_ONLY', "Enregistrer uniquement les clichés liées à la détection de mouvements");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_DEVICE', "Source Video");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_DEVICEWIDTH', "Largeur source (pixel width)");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_DEVICEHEIGHT', "Hauteur source (pixel height)");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_THRESHOLD', "Seuil déclenchement (en pixels modifiés)");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_ENDEVENT', "Nombre de secondes avant de considérer l'évènement comme clos");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_BUTTON', "Sauvegarder");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_TIP', "Précision sur les paramètres:");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_WARNING', "- <u>Enregistrer uniquement les clichés liées à la détection de mouvements:</u> La capture régulière de clichés est désactivée. <br/>
- <u>Intervalle minimum:</u> La capture régulière de clichés reste activée, entre deux rotations (plannification), si un mouvement est détecté un cliché est capturé. <br/>");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_INTERVAL', "Intervalle minimum:");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_SECONDS', "Secondes");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_MINUTES', "Minutes");

$smarty->assign('LANG_MOTION_DEVICE_TITLE', "Webcam USB (détection de mouvements)");

$smarty->assign('LANG_MOTION_STATUS_TITLE', "Etat du logiciel de capture de mouvements");
$smarty->assign('LANG_MOTION_STATUS_DESCRIPTION', "Webcam USB (détection de mouvements)");

$smarty->assign('LANG_CONFIGAVANCE_MOTION_MASK', "Appliquer un masque de détection");
$smarty->assign('LANG_CONFIGAVANCE_MOTION_NOMASK', "Pas de masque");

$smarty->assign('LANG_MOTION_START', "Démarrer");
$smarty->assign('LANG_MOTION_STOP', "Arrêter");

?>
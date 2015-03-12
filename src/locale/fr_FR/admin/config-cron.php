<?php 
$smarty->assign('LANG_CRON_TITLE', "Planificateur Webcampak");
$smarty->assign('LANG_CRON_TIP', "Astuce:");
$smarty->assign('LANG_CRON_TIPTEXT', "L'intervale minimum pour la capture d'image est de 20 secondes.");
$smarty->assign('LANG_CRON_BUTTON', "Enregistrer");

$smarty->assign('LANG_CRON_SOURCE', "Source");
$smarty->assign('LANG_CRON_SOURCETITLE', "Capture Source");

$smarty->assign('LANG_CRON_SOURCE_STARTCAPTURE', "Déclencher la capture toutes les");
$smarty->assign('LANG_CRON_SOURCE_SECONDS', "Secondes");
$smarty->assign('LANG_CRON_SOURCE_MINUTES', "Minutes");
$smarty->assign('LANG_CRON_SOURCE_HOURS', "Heures");

$smarty->assign('LANG_CRON_SOURCE_DAILYVIDTITLE', "Vidéo Journalière");
$smarty->assign('LANG_CRON_SOURCE_DAILYSTART', "Déclencher la création de la vidéo journalière à");
$smarty->assign('LANG_CRON_SOURCE_DAILYHOUR', "h");
$smarty->assign('LANG_CRON_SOURCE_DAILYDAYS', "tous les jours.");

$smarty->assign('LANG_CRON_SOURCE_CUSTOMTITLE', "Vidéo Personnalisée et Post-Prod.");
$smarty->assign('LANG_CRON_SOURCE_CUSTOMSTART', "Déclencher la création de la vidéo personnalisée et du traitement post-prod. toutes les");

$smarty->assign('LANG_CRON_CAPTURE_FREQUENCY', "Fréquence");
$smarty->assign('LANG_CRON_CAPTURE_TIME', "Horaires");
$smarty->assign('LANG_CRON_CAPTURE_DAYS', "Jours");
$smarty->assign('LANG_CRON_CAPTURE_ALL', "Tous");
$smarty->assign('LANG_CRON_CAPTURE_FROM', "De");
$smarty->assign('LANG_CRON_CAPTURE_TO', "A");
$smarty->assign('LANG_CRON_CAPTURE_FROMB', "Du");
$smarty->assign('LANG_CRON_CAPTURE_TOB', "Au");

$lang_cron_day[1] = "Lundi";
$lang_cron_day[2] = "Mardi";
$lang_cron_day[3] = "Mercredi";
$lang_cron_day[4] = "Jeudi";
$lang_cron_day[5] = "Vendredi";
$lang_cron_day[6] = "Samedi";
$lang_cron_day[7] = "Dimanche";
$smarty->assign('LANG_CRON_DAYS', $lang_cron_day);

$smarty->assign('LANG_CRON_SOURCE_MONDAY', "Lundi");
$smarty->assign('LANG_CRON_SOURCE_TUESDAY', "Mardi");
$smarty->assign('LANG_CRON_SOURCE_WEDNESDAY', "Mercredi");
$smarty->assign('LANG_CRON_SOURCE_THURSDAY', "Jeudi");
$smarty->assign('LANG_CRON_SOURCE_FRIDAY', "Vendredi");
$smarty->assign('LANG_CRON_SOURCE_SATURDAY', "Samedi");
$smarty->assign('LANG_CRON_SOURCE_SUNDAY', "Dimanche");

$smarty->assign('LANG_CRON_TYPE_CAPTUREDELAYDATE', "Date du cliché:");
$smarty->assign('LANG_CRON_TYPE_CAPTUREDELAYDATECAPTURE', "Déclenchement Capture");
$smarty->assign('LANG_CRON_TYPE_CAPTUREDELAYDATESCRIPT', "Déclenchement Script");

$smarty->assign('LANG_CRON_CALENDAR_TITLE', "Calendrier des captures");
$smarty->assign('LANG_CRON_CALENDAR_ENABLE', "Activer le calendrier");
$smarty->assign('LANG_CRON_CALENDAR_ENABLE_MORE', "Si non activé, capture 24/7");
$smarty->assign('LANG_CRON_CALENDAR_TIME_START', "Entre ");
$smarty->assign('LANG_CRON_CALENDAR_TIME_END', " et ");


?>

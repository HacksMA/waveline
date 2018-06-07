<?php
require_once("dbconn.php");
/////////////////////////////////////////////////////////////
$req1 = "SELECT `views` FROM `main` WHERE `id` = ".$_GET["id"];
$req3 = "SELECT `like` FROM `main` WHERE `id` = ".$_GET["id"];


if (!$result = $mysqli->query($req1)) {
    echo "Извините, возникла проблема в работе сайта.";
    exit;
}else {
    $outdb1 = $result->fetch_all();
}

$req2 = "UPDATE `main` SET `views` =  ".($outdb1[0][0]+1)." WHERE `id` = ".$_GET["id"];

if (!$result = $mysqli->query($req2)) {
    echo "Извините, возникла проблема в работе сайта.";
    exit;
}


if (isset ($_GET['like'])){

    if (!$result = $mysqli->query($req3)) {
        echo "|Извините, возникла проблема в работе сайта.";
        exit;
    }else {
        $outdb2 = $result->fetch_all();
        $req4 = "UPDATE `main` SET `like` =  ".($outdb2[0][0]+1)." WHERE `id` = ".$_GET["id"];
    }
    if (!$result = $mysqli->query($req4)) {
        echo "Извините, возникла проблема в работе сайта.";
        exit;
    }
}
?>
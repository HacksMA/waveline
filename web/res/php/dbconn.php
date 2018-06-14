<?php
$hostdb = "sql308.byethost14.com";
$userdb = "b14_19817562";
$passdb = "91289943";
$tabledb = "b14_19817562_news";

$mysqli = new mysqli($hostdb,$userdb, $passdb, $tabledb);

if ($mysqli->connect_errno) {

    echo "Извините, возникла проблема на сайте. Ошибка: ".$mysqli->connect_errno;
    exit();
}

else {
    $mysqli->set_charset("utf8");
}
?>
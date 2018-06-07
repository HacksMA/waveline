<?php
session_start();

function isValidJson($inJson) {
    json_decode($inJson);
    return (json_last_error() === JSON_ERROR_NONE);
}
/////////////////////////////////////////////////////////////
require_once("dbconn.php");
/////////////////////////////////////////////////////////////


    if (isset($_SESSION['logined'])&&($_SESSION['logined']==1)){
        if (isset($_GET['id'])){
            $req = "SELECT * FROM `main` WHERE `id`=" . $_GET['id'];
        } elseif (isset($_GET['main'])&&($_GET['main']==1)){
            $req = "SELECT `id`,`title`,`date`,`author`,`desc`,`mainimg`,`ext`,`like`,`views` FROM `main` WHERE `check` = '1' ORDER BY `date` DESC";
        } else {
            $req = "SELECT `id`,`title`,`date`,`author`,`desc`,`mainimg` FROM `main` WHERE `check` = '0' ORDER BY `date`  DESC";
        }
    } else {
        if (isset($_GET['id'])){
            $req = "SELECT * FROM `main` WHERE `id`=" . $_GET['id']." AND `check` = '1'";
        } else {
            $req = "SELECT `id`,`title`,`date`,`author`,`desc`,`mainimg`,`ext`,`like`,`views` FROM `main` WHERE `check` = '1' ORDER BY `date`  DESC";
        }
    }




if (!$result = $mysqli->query($req)) {
    echo "Извините, возникла проблема в работе сайта.";
    exit;
}else {
    $outdb = $result->fetch_all();
    $outdbfields = $result->fetch_fields();
}


if (count($outdb) == 0) {
    $outdb["Answer"] = "Мы не смогли найти совпадения для вашего запроса. Пожалуйста, попробуйте еще раз.";
} else {
    $fields = [];
    foreach ($outdbfields as $key => $tmp){
        array_push($fields,$tmp->orgname);
    }
    foreach ($outdb as $key => $tmp){
        $outdb[$key] = array_combine($fields, $outdb[$key]);
    }
}

$sendinfo = json_encode($outdb, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
echo $sendinfo;
$result->free();
$mysqli->close();
?>
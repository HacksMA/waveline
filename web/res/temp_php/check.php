<?php

$hostdb = "sql110.byethost3.com";
$userdb = "b3_19542765";
$passdb = "7Q5x54w8984g3tO";
$tabledb = "b3_19542765_news";

$mysqli = new mysqli($hostdb, $userdb, $passdb, $tabledb);

if ($mysqli->connect_errno) {

    echo "Извините, возникла проблема на сайте. Ошибка: " . $mysqli->connect_errno;
    exit();

}else {
    $mysqli->set_charset("cp1251");
}

if (isset($_COOKIE['id']) and isset($_COOKIE['hash'])) {
    If (!$result = $mysqli->query("SELECT * INET_NTOA(`user_ip`) FROM `users` WHERE `user_id` = `" . intval($_COOKIE['id']) . "` LIMIT 1")) {
        echo "Извините, возникла проблема в работе сайта.";
        exit();
    }
    $userdata  = $result->fetch_assoc();

    if (($userdata['user_hash'] !== $_COOKIE['hash']) or ($userdata['user_id'] !== $_COOKIE['id']) or (($userdata['user_ip'] !== $_SERVER['REMOTE_ADDR']) and ($userdata['user_ip'] !== "0"))) {
        if (($userdata['user_hash'] !== $_COOKIE['hash']) or ($userdata['user_id'] !== $_COOKIE['id']) or (($userdata['user_ip'] !== $_SERVER['REMOTE_ADDR']) and ($userdata['user_ip'] !== "0"))) {

            setcookie("id", "", time() - 3600 * 24 * 30 * 12, "/");

            setcookie("hash", "", time() - 3600 * 24 * 30 * 12, "/");

            print "Хм, что-то не получилось";
        } else {
            print "Привет, " . $userdata['user_login'] . ". ALL WORKS FINE!";
        }
    } else {
        print "Включите cookies";
    }
}
?>

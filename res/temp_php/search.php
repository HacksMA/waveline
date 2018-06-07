<?php

require_once('protection.php');

function Search ($requery){
$requery = trim($requery);
$requery = Protection($requery);
$requery = mysqli_real_escape_string($mysqli,$requery);

    if (isset($requery))
    {
        if (strlen($requery) < 3) {
            $text = '<p>Слишком короткий поисковый запрос.</p>';
        } else if (strlen($requery) > 128) {
            $text = '<p>Слишком длинный поисковый запрос.</p>';
        } else {
            $req = "SELECT `desc`,`title`,`author`,`id`,`like`,`views`,`date` FROM `main` WHERE `text` LIKE '%$requery%' OR `title` LIKE '%$requery%' OR `ext` LIKE '%$requery%' OR `author` LIKE '%$requery%'";
        if (!$result = $mysqli->query($req)) {
            echo "Извините, возникла проблема в работе сайта.";
            exit;
        }else{
            if ($mysqli->affected_rows() > 0) {
                $row = $result->fetch_assoc();
                $num = $result->num_rows();

                $text = 'По запросу' . $requery . ' найдено совпадений: ' . $num . '';

                do {

                    $text .= '<a href="post.html?id=' . $row['id'] . '">'. $row['title'] .'</a>';

                }while ($row = $result->fetch_assoc());
            }else{
                $text = 'По вашему запросу ничего не найдено.';
                }
            }
        }
    } else {
        $text = 'Задан пустой поисковый запрос.';
    }

return $text;
}

$hostdb = "sql110.byethost3.com";
$userdb = "b3_19542765";
$passdb = "7Q5x54w8984g3tO";
$tabledb = "b3_19542765_news";

$mysqli = new mysqli($hostdb, $userdb, $passdb, $tabledb);

if ($mysqli->connect_errno) {

    echo "Извините, возникла проблема на сайте. Ошибка: " . $mysqli->connect_errno;
    exit();

}else {
    $mysqli->set_charset("utf8");
}

if (isset($_POST['searchquery'])) {
    $search_result = Search($_POST['searchquery']);
    echo $search_result;
}
?>
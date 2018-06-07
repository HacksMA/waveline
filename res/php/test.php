<?php

require_once('protection.php');
/////////////////////////////////////////////////////////////
require_once('dbconn.php');
/////////////////////////////////////////////////////////////

function parse_bb_code($text)	{
    $text = preg_replace('/\[(\/?)(b|i|u|s|p|ul|li|ol)\s*\]/', "<$1$2>", $text);

	$text = preg_replace('/\[code\]/', '<pre><code>', $text);
	$text = preg_replace('/\[\/code\]/', '</code></pre>', $text);

	$text = preg_replace('/\[(\/?)quote\]/', "<$1blockquote>", $text);
	$text = preg_replace('/\[(\/?)quote(\s*=\s*([\'"]?)([^\'"]+)\3\s*)?\]/', "<$1blockquote>Цитата $4:<br>", $text);

	$text = preg_replace('/\[url\](?:http:\/\/)?([a-z0-9-.]+\.\w{2,4})\[\/url\]/', "<a href=\"http://$1\">$1</a>", $text);
	$text = preg_replace('/\[url\s?=\s?([\'"]?)(?:http:\/\/)?([a-z0-9-.]+\.\w{2,4})\1\](.*?)\[\/url\]/', "<a href=\"http://$2\">$3</a>", $text);

	$text = preg_replace('/\[img\s*\]([^\]\[]+)\[\/img\]/', "<img src='$1'/>", $text);
	$text = preg_replace('/\[img\s*=\s*([\'"]?)([^\'"\]]+)\1\]/', "<img src='$2'/>", $text);

    $text = preg_replace('/\[youtube\](?:http:\/\/)(www\.youtube\.com\/watch\?v\=([a-zA-Z0-9_-]?)\[\/youtube\]/',"<iframe src=\"https://www.youtube.com/embed/$1?wmode=opaque&fs=1&theme=dark&amp\" width=\"640\" height=\"390\" frameborder=\"0\" scrolling=\"no\"  allowfullscreen=\"1\"></iframe>",$text);
    $text = preg_replace('/\[youtube\s?=\s?([\'"])(?:http:\/\/)www\.youtube\.com\/watch\?v\=([a-zA-Z0-9_-]?)\]\[\/youtube\]/',"<iframe src=\"https://www.youtube.com/embed/$1?wmode=opaque&fs=1&theme=dark&amp\" width=\"640\" height=\"390\" frameborder=\"0\" scrolling=\"no\"  allowfullscreen=\"1\"></iframe>",$text);

	return $text;
}

$today = date("Y-m-d H:i:s");

$newsdata = array('title' => $_POST['title'],'mainimg' => $_POST['mainimg'],'author' => $_POST['author'],'desc' => $_POST['desc'],'lead' => $_POST['lead'],'text' => $_POST['text'],'date' => $today);

foreach($newsdata as $key => $value){
		$value = Protection($value);
		$value = $mysqli->real_escape_string($value);
		$parsedata[$key] = $value;
        //$parsedata[$key] = parse_bb_code($value);
}

//$req = "INSERT into `main` (`title`,`mainimg`,`author`,`desc`,`lead`,`text`,`date`) VALUES ('".$newsdata['title']."', '".$newsdata['mainimg']."', '".$newsdata['author']."', '".$newsdata['desc']."', '".$newsdata['lead']."', '".$newsdata['text']."', '".$newsdata['date']."' )";


if (isset($_GET['preview'])){
    $outPreview = json_encode($parsedata, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    echo ($outPreview);
} elseif (isset($_GET['sendPost'])) {
    foreach ($parsedata as &$value){
        if (strlen($value) < 3) {
            $err = true;
        }
    }
    if ($err == true){
        echo "Вы должны заполнить все поля информацией в количестве больше 3-ёх символов, прежде чем добавить материал";
    }else {
        if (!$result = $mysqli->query($req)) {
            echo "Извините, возникла проблема в работе сайта.";
            echo $mysqli->error;
            exit();
        } else { echo "Все хорошо"; }
    }
}
?>
<?php

require_once('protection.php');
/////////////////////////////////////////////////////////////
require_once('dbconn.php');
/////////////////////////////////////////////////////////////

function parse_bb_code($text)	{
    $text = preg_replace('/\[(\/?)(b|h1|h2|h3|h4|h5|h6|i|u|s|p|ul|br|li|ol)\s*\]/', "<$1$2>", $text);

	$text = preg_replace('/\[code\]/', '<pre><code>', $text);
	$text = preg_replace('/\[\/code\]/', '</code></pre>', $text);

	$text = preg_replace('/\[(\/?)quote\]/', "<$1blockquote>", $text);

	$text = preg_replace('#\[url=((?:ftp|https?)://.*?)\](.*?)\[/url\]#i', "<a href=\'$1\'>$2</a>", $text);
    $text = preg_replace('#\[url\]((?:ftp|https?)://.*?)\[/url\]#i', "<a href=\'$1\'>$1</a>", $text);

	$text = preg_replace('/\[img\s*\]([^\]\[]+)\[\/img\]/', '<img src="$1"/>', $text);
	$text = preg_replace("/\[img\s*=\s*([\']?)([^\'\]]+)\1\]/", '<img src="$2"/>', $text);

    $text = str_replace('[pl]','<p style="text-align: left; width: 100%;">', $text);
    $text = str_replace('[/pl]',"</p>", $text);

    $text = str_replace('[pr]','<p style="text-align: right; width: 100%;">', $text);
    $text = str_replace('[/pr]',"</p>", $text);


    $text = str_replace('[pc]','<p style="text-align: center; width: 100%;">', $text);
    $text = str_replace('[/pc]',"</p>", $text);


    $text = str_replace('[youtube]https://www.youtube.com/watch?v=','<iframe style="height:38vw; width: 80vw" src="https://www.youtube.com/embed/',$text);
    $text = str_replace('[/youtube]','" frameborder="0" allowfullscreen></iframe>',$text);

    //$text = preg_replace('/\[youtube\](?:http:\/\/)(www\.youtube\.com\/watch\?v\=([a-zA-Z0-9_-]?)\[\/youtube\]/',"<iframe src=\"https://www.youtube.com/embed/$1?wmode=opaque&fs=1&theme=dark&amp\" width=\"640\" height=\"390\" frameborder=\"0\" scrolling=\"no\"  allowfullscreen=\"1\"></iframe>",$text);
    //$text = preg_replace('/\[youtube\s?=\s?([\'"])(?:http:\/\/)www\.youtube\.com\/watch\?v\=([a-zA-Z0-9_-]?)\]\[\/youtube\]/',"<iframe src=\"https://www.youtube.com/embed/$1?wmode=opaque&fs=1&theme=dark&amp\" width=\"640\" height=\"390\" frameborder=\"0\" scrolling=\"no\"  allowfullscreen=\"1\"></iframe>",$text);

	return $text;
}

$today = date("Y-m-d H:i:s");

$newsdata = array('title' => $_POST['title'],'mainimg' => $_POST['mainimg'],'author' => $_POST['author'],'desc' => $_POST['desc'],'lead' => $_POST['lead'],'text' => $_POST['text'],'date' => $today);

$parsedata = [];

foreach($newsdata as $key => $value){
		$value = Protection($value);
		$value = $mysqli->real_escape_string($value);
		//$parsedata[$key] = $value;
        $parsedata[$key] = str_replace("\\r\\n","<br/>",parse_bb_code($value));
}

$req = "INSERT into `main` (`title`,`mainimg`,`author`,`desc`,`lead`,`text`,`date`) VALUES ('".$parsedata['title']."', '".$parsedata['mainimg']."', '".$parsedata['author']."', '".$parsedata['desc']."', '".$parsedata['lead']."', '".$parsedata['text']."', '".$parsedata['date']."' )";

if (isset($_GET['preview'])){
    $outPreview = json_encode($parsedata, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo ($outPreview);
} elseif (isset($_GET['sendPost'])) {
    foreach ($parsedata as &$value){
        if (strlen($value) < 3) {
            $err = true;
        }
    }
    if ($err == true){
        echo "Поля информации не могут иметь меньше 3-х симоволов!";
    }else {
        if (!$result = $mysqli->query($req)) {
            echo "Извините, возникла проблема в работе сайта";
            echo $mysqli->error;
            exit();
        } else { echo "Материал отправлен на модерацию!"; }
    }
}
?>
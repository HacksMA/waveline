<?php

$data = array();

/////////////////////////Translit Function///////////////////////////////////////
function translit($s) {
  $s = (string) $s; // преобразуем в строковое значение
  $s = strip_tags($s); // убираем HTML-теги
  $s = str_replace(array("\n", "\r"), " ", $s); // убираем перевод каретки
  $s = preg_replace("/\s+/", ' ', $s); // удаляем повторяющие пробелы
  $s = trim($s); // убираем пробелы в начале и конце строки
  $s = function_exists('mb_strtolower') ? mb_strtolower($s) : strtolower($s); // переводим строку в нижний регистр (иногда надо задать локаль)
  $s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>''));
  $s = preg_replace("/[^0-9a-z-_ ]/i", "", $s); // очищаем строку от недопустимых символов
  $s = str_replace(" ", "-", $s); // заменяем пробелы знаком минус
  return $s; // возвращаем результат
}
//////////////////////////////////////////////////////////////////////////////////


if(isset($_GET['files']))
{
    $error = false;
    $files = array();
    $typeImg = array('image/png', 'image/gif', 'image/jpeg','image/svg+xml');
    $typeAudio = array('audio/mpeg', 'audio/ogg', 'audio/aac','audio/mp3');
    $typeApp = array('application/pdf', 'application/zip', 'application/gzip');
    $typeVideo = array('video/mpeg', 'video/webm', 'video/mp4');


    foreach($_FILES as $file) {

        if ($file["size"]>1024*1024*8){
        $data = array('error' => 'Произошла ошибка при загрузке файлов. Максимальный размер файла: 10Мб');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
        exit;
        }

        $dotterPos = mb_strripos($file['name'],".",0,'UTF-8');
        $name = translit(mb_substr($file['name'],0,$dotterPos,'UTF-8')) . mb_substr($file['name'],$dotterPos, NULL ,'UTF-8');

        if(in_array($file['type'], $typeImg )) {
            $uploaddir = '../../media/picture/';
            if (move_uploaded_file($file['tmp_name'], $uploaddir . $name)) {
                $files[] = $uploaddir . $name;
            } else {
                $error = true;
            }
        }elseif (in_array($file['type'], $typeAudio)) {
            $uploaddir = '../../media/audio/';
            if (move_uploaded_file($file['tmp_name'], $uploaddir . $name)) {
                $files[] = $uploaddir . $name;
            } else {
                $error = true;
            }
        }elseif (in_array($file['type'], $typeApp)) {
            $uploaddir = '../../media/app/';
            if (move_uploaded_file($file['tmp_name'], $uploaddir . $name)) {
                $files[] = $uploaddir  . $name;
            } else {
                $error = true;
            }
        }elseif (in_array($file['type'], $typeVideo)) {
            $uploaddir = '../../media/video/';
            if (move_uploaded_file($file['tmp_name'], $uploaddir . $name)) {
                $files[] = $uploaddir . $name;
            } else {
                $error = true;
            }
        }else {
            $error = true;
        }
    }
    $data = ($error) ? array('error' => 'Произошла ошибка при загрузке файлов') : array('files' => ($_SERVER['HTTP_HOST'].substr($uploaddir, 5).$name));
}
else
{
    $data = array('success' => 'Form was submitted', 'formData' => $_POST);
}

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );

?>
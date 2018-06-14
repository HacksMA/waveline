<?php

/////////////////////////////////////////////////////////////
require_once("dbconn.php");
/////////////////////////////////////////////////////////////

function generateCode($length = 6)
{
    $code = "";
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";
    $clen = strlen($chars) - 1;
    while (strlen($code) < $length) {
        
        $code .= $chars[mt_rand(0,$clen)];
    }

    return $code;

}

if (isset($_POST['submit'])) {

    # Вытаскиваем из БД логин и сравниваем с введенным
    $req = "SELECT `user_id`,`user_password` FROM `users` WHERE `user_login` = `" . $mysqli -> real_escape_string($_POST['login']) . "` LIMIT 1";

    If (!$result  = $mysqli->query($req)){
        echo "Извините, возникла проблема в работе сайта.";
        exit();

    }

    $data = $result->fetch_assoc();


    # Сравниваем пароли

    if ($data['user_password'] === md5(md5($_POST['password']))) {

    # Генерируем случайное число и шифруем его

        $hash  = md5(generateCode(10));

        if (!@$_POST['not_attach_ip']) {

        # Если пользователя выбрал привязку к IP

        # Переводим IP в строку

            $insip  = ", user_ip=INET_ATON('" . $_SERVER['REMOTE_ADDR'] . "')";

        }


        # Записываем в БД новый хеш авторизации и IP

        $mysqli->query("UPDATE `users` SET `user_hash` = " . $hash . " " . $insip . " WHERE `user_id`=" . $data['user_id'] . "");

        # Ставим куки

        setcookie("id", $data['user_id'], time() + 60 * 60 * 24 * 30);

        setcookie("hash", $hash, time() + 60 * 60 * 24 * 30);


        # Переадресовываем браузер на страницу проверки нашего скрипта

        header("Location: check.php");
        exit();

} else {

        echo "Вы ввели неправильный логин/пароль";
    }

}
?>
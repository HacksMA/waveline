<?php

require_once('protection.php');
/////////////////////////////////////////////////////////////
require_once("dbconn.php");
/////////////////////////////////////////////////////////////


if (isset($_POST['submit'])){

    $err  = array();

    # проверям логин

    If(!preg_match("/^[a-zA-Z0-9]+$/", $_POST['login'])){
    $err[] = "Логин может состоять только из букв английского алфавита и цифр";
}



    if (strlen($_POST['login']) < 3 or strlen($_POST['login']) > 30){

        $err[] = "Логин должен быть не меньше 3-х символов и не больше 30";

    }


    # Присваиваем Логин и  проверяем, не сущестует ли такого же логина
    $login = Protection($_POST['login']);

$req = "SELECT COUNT(user_id) FROM `users` WHERE user_login= " . $mysqli->real_escape_string($login). "";

if (!$result = $mysqli->query($req)){

    $err[] = "Пользователь с таким логином уже существует в базе данных.";
    exit();
}

    # Если нет ошибок, то добавляем в БД нового пользователя

    if ($result->num_rows === 0) {
        # Убераем лишние пробелы и делаем двойное шифрование md5(Можно и sha256)
        $password = md5(md5(trim($_POST['password'])));

        $req1 = "INSERT INTO `users` (`user_login`,`user_password`) VALUES ($login,$password)";

        $mysqli->query($req1);

        #Редирект на логин

        header("Location: login.php");
        exit;

    }else{
        # Выводим ошибки
        print "<b>При регистрации произошли следующие ошибки:</b><br>";
        foreach ($err AS $error) {
              print $error . "<br>";
        }
      }
}

?>
<?php session_start();
require_once("protection.php");
require_once("dbconn.php");


if (isset($_POST['login'])) {
    $login = protection($_POST['login']);
    $password = protection($_POST['password']);

    $req = "SELECT `user_hash` FROM `users` WHERE `user_login` ='".$login."'";

    if (!$result = $mysqli->query($req)) {
    echo "Извините, возникла проблема в работе сайта.";
    exit;
	} else {
    	$outdb = $result->fetch_all();
    	if (count($outdb) != 0){
    		if (md5(md5(sha1($password))) == $outdb[0][0]){
    			$_SESSION['logined'] = 1;
    		}
    	} 
	}
}



if (isset($_SESSION['logined']) && $_SESSION['logined']==1){
    echo '1';
    } else {
    echo '{"Answer":"Неправильный логин и/или пароль!"}';
    }
?>
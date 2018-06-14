<?php session_start();
require_once("dbconn.php");
require_once("protection.php");


if (isset($_SESSION['logined'])&&($_SESSION['logined']==1)){


if (isset($_GET['confirm'])){
	$confirm = Protection($_GET['confirm']);
	$req = ("UPDATE  `b14_19817562_news`.`main` SET `check` =  '1' WHERE  `main`.`id` = " . $confirm);
	$mysqli->query($req);
}
if (isset($_GET['reject'])){
	$reject = Protection($_GET['reject']);
	$req = ("DELETE FROM `b14_19817562_news`.`main` WHERE `main`.`id` = " . $reject);
	$mysqli->query($req);
}}
?>
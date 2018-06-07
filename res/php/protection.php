<?php

function Protection($str){
    $sqlword = array("SELECT", "FROM", "ID", "`", "WHILE", "WHERE", "select", "from", "drop","delete","insert","DELETE","INSERT","'");
    $str = trim($str);
    $str = strip_tags($str);
    $str = stripslashes($str);
    foreach ($sqlword as $value){
    $str = str_replace($value,'',$str);}

    return $str;
}

?>
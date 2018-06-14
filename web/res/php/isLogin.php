<?php session_start();
if (isset($_SESSION['logined'])&&($_SESSION['logined']==1)){echo '1';} else { echo '0';}
?>
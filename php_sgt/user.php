<?php
echo"<script type=\"text/javascript\" src=\"user.js\"></script>";

    session_start();
if(isset($_SESSION['user'])){
    $userName= $_SESSION['user'];
echo "<script type=\"text/javascript\">
         u('{$userName}');
       </script>";
}
?>
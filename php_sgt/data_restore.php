<?php
 header("Access-Control-Allow-Origin: *");
define('fromData',true);

require 'mysql_connect.php';
//require the mysql_connect.php file.  Make sure your properly configured it!
$sql="INSERT IGNORE INTO `student_data` (`id`, `name`, `grade`, `course`) VALUES
(22, 'Martin', 95, 'anatomy'),
(25, 'Jorge', 74, 'graphic design'),
(26, 'Mario', 98, 'adobe photoshop'),
(27, 'Sandra', 46, 'excell'),
(28, 'Jacob', 68, 'php'),
(30, 'Sarah', 87, 'math'),
(31, 'Wilson', 74, 'biology'),
(32, 'Cody', 68, 'Wordpress'),
(33, 'paul', 97, 'physics'),
(34, 'Michelle', 57, 'Arts-2B'),
(37, 'Andy', 87, 'Postman'),
(41, 'Martin', 84, 'Modern Art');";
$result = mysqli_query($conn,$sql);
?>
<?php
  
session_start();
$output['session']=$_SESSION;
$email=$_POST['email'];
$password=hash("sha256",$_POST['password']);
$password=hash("md5",$password);
$password=hash("sha256",$password);
$password=hash("sha256",$password);


if(isset($email) && isset($password)){
    $sql="SELECT * FROM `user` WHERE `user_email`='{$email}'";
    $result = mysqli_query($conn,$sql);
   if(empty($result)){
	   $output['errors'][]='database errors';
   }elseif(mysqli_num_rows($result)>0){
   
    while($row=mysqli_fetch_assoc($result)){
        $output['row']=$row;
        $output['password']=$password;
     if($row['password']===$password){
        $output['success']=true;
        $_SESSION['user']=$email;
        $output['session']=$_SESSION;
        
    }else{
        $output['success']=false;
        $output['invalid']='Invalid Email/Password';
        }
    }
   
   }else{
    $output['invalid']='Invalid Email/Password';
   }
}

    
    




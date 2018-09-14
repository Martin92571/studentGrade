<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous">
    </script>

<?php
require './php_sgt/user.php';
?>  
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="animate.css">
<link rel="stylesheet" href="style.css">
<?php

echo "<script type=\"text/javascript\">
    /* Sample function that returns boolean in case the browser is Internet Explorer*/
    function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf(\"MSIE \") > -1 || ua.indexOf(\"Trident/\") > -1;
    if (is_ie){
        
        var es5 = document.createElement(\"script\");
        es5.type = \"text/javascript\";
        es5.src = \"scriptEs5.js\";
        $(\"head\").append(es5);
    }else{
        var es6 = document.createElement(\"script\");
        es6.type = \"text/javascript\";
        es6.src = \"script.js\";
        $(\"head\").append(es6);
    };
    }
    isIE();
        </script>";
        ?>

<meta name="viewport" content="initial-scale=1, user-scalable=no">
</head>
<body>

<div class="loginModal hide">
        
        <div class="loginPopUP login-form">
            
        <div class="main-div">
            <div class="cancel"><button><i class="fas fa-times"></i></button></div>
            <div class="panel">
            <h2 class="loginHeader">Login</h2>
            <p>Please enter your email and password</p>
            </div>
            <form id="Login">
        
                <div class="form-group">
                   
                     <label for="inputEmail">Email <span class="inputEmailError"></span></label>
                    <input type="email" class="form-control inputEmail" id="inputEmail" placeholder="Email Address">
        
                </div>
        
                <div class="form-group">
                        <label for="inputPassword">Password <span class="inputPassError"></span></label>
                    <input type="password" class="form-control inputPassword" id="inputPassword" placeholder="Password">
        
                </div>
                <div class="forgot">
                <a href="reset.html">Forgot password?</a>
        </div>
                <button type="button" class="btn btn-primary loginEnter">Enter</button>
        
            </form>
            </div>
        
        </div></div>
        
<div class="signup-form hide ">
    <div class="signupPopUp form-container">
        <form class="form-container">
            <div class="cancelSignUp"><i class="fas fa-times"></i></div>
            <h2>Sign Up</h2>
            
            
            <div class="form-group">
                <label>Username <span class="usernameError"></span></label>
                <input type="text" class="form-control username" name="username" required="required">
            </div>
            <div class="form-group">
                <label>Email Address <span class="Error emailError"></span></label>
                <input type="email" class="form-control email" name="email" required="required">
            </div>
            <div class="form-group">
                <label>Password <span class="Error passwordError"></span></label>
                <input type="password" class="form-control password" name="password" required="required">
            </div>
            <div class="form-group">
                <label>Confirm Password <span class="Error confirm_passwordError"></span></label>
                <input type="password" class="form-control confirm_password" name="confirm_password" required="required">
            </div>
            <div class="form-group">
                    
                <button type="button" class="btn btn-primary btn-block btn-lg signUpBtn">Sign Up</button>
            </div>
            <div class="text-center">Already have an account? <span class="loginRedirect" >Login here</span></div>
        </form>
        </div>
    </div>	
<div class="deleteModal hide">
    <div class="deleteModalContainer">
        <div class="formUpdate">
            <form  class="modal-form">
                <label for="DeleteName" >Student Name</label>
                <div class="input-group form-group">
                   <span class="input-group-addon">
                        <span class="glyphicon glyphicon-user"></span>
                    </span>
                    <input type="text" class="form-control DeleteName" id="DeleteName" placeholder="Student Name" readonly>
                </div>
                <label for="DeleteCourse" >Course</label>
                <div class="input-group form-group">
                   <span class="input-group-addon">
                        <span class="glyphicon glyphicon-list-alt"></span>
                    </span>
                    <input type="text" class="form-control DeleteCourse" id="DeleteCourse" placeholder="Course" readonly>
                </div>
                <label for="DeleteGrade" >Grade</label>
                <div class="input-group form-group">
                   <span class="input-group-addon">
                        <span class="glyphicon glyphicon-education"></span>
                    </span>
                    <input type="text" class="form-control DeleteGrade" id="DeleteGrade" placeholder="Grade" readonly>
                </div>  
                 <p>Are you sure you want to delete?</p>
                <button type="button" class="DeleteAjax btn btn-danger">Confirm</button>
                <button type="button" class="btn btn-default cancelDelete">Cancel</button>
            </form>
            
        </div>
    </div>
</div>
<div class="container">
    <div class="modal hide">
                <div class="modal-container">
                    <div class="formUpdate">
                        <form  class="modal-form">
                            <label for="updateName" >Student Name</label>
                            <div class="input-group form-group">
                               <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-user"></span>
                                </span>
                                <input type="text" class="form-control updateName" id="updateName" placeholder="Student Name">
                            </div>
                            <label for="updateCourse" >Course</label>
                            <div class="input-group form-group">
                               <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-list-alt"></span>
                                </span>
                                <input type="text" class="form-control updateCourse" id="updateCourse" placeholder="Course">
                            </div>
                            <label for="updateGrade" >Grade</label>
                            <div class="input-group form-group">
                               <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-education"></span>
                                </span>
                                <input type="number" class="form-control updateGrade" id="updateGrade" placeholder="Grade">
                            </div>  
                    
                            <button type="button" class="updateAjax btn btn-success">Submit</button>
                            <button type="button" class="btn btn-default cancelModal">Cancel</button>
                        </form>
                        
                    </div>
                </div>
    </div>
    <div class="">
        <!-- only show this element when it isnt on mobile -->
        <h1 class="hidden-xs hidden-sm page-header ">Student Grade Table
            <?php 
            if(isset($_SESSION['user'])){
               echo "<button type=\"button\" class=\" Logout col-md-offset-6 btn btn-primary\">Logout</button>";
            }else{
               echo "<button type=\"button\" class=\" login col-md-offset-5 btn btn-primary\">Login</button>
                <button type=\"button\" class=\" signUp btn btn-success\">Sign Up</button>";
            }
            ?>
            <small class="hidden-xs hidden-sm col-md-offset-1">Grade Average : <span class="avgGrade label label-default">0</span></small>
        </h1>
        
        <!-- only show this element when the user gets to a mobile version -->
        <h3 class="visible-xs visible-sm col-xs-12 page-header ">Student Grade Table
                <button type="button" class="login userBtn col-xs-offset-3 btn btn-primary">Login</button>
                <button type="button" class="signUp userBtn  btn btn-success">Sign Up</button>
            <small class="visible-xs visible-sm col-xs-12">Grade Average : <span class="avgGrade label label-default">0</span></small>
        </h3>
    </div>
    <div class="student-add-form col-md-4 pull-right">
        <h4 class="col-md-offset- 8">Add Student</h4>
        <div class="input-group form-group">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-user"></span>
            </span>
            <input type="text" class="form-control" name="studentName" id="studentName" placeholder="Student Name">
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-list-alt"></span>
            </span>
            <input type="text" class="form-control" name="course" id="course"
                   placeholder="Student Course">
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-education"></span>
            </span>
            <input type="number" class="form-control" name="studentGrade" id="studentGrade"
                   placeholder="Student Grade">
        </div>
        <button type="button" class="btn btn-success" id="add" onclick="">Add</button>
        <button type="button" class="btn btn-default" id="cancel" onclick="">Cancel</button>
        
    </div>
    <div class="student-list-container col-md-8 col-xs-12">
        <table class="student-list table">
            <thead>
            <tr>
                <th>Student Name</th>
                <th>Student Course</th>
                <th>Student Grade</th>
                <th>Operations</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>

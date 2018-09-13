document.addEventListener("DOMContentLoaded",initializeApp);var student_array=[];function initializeApp(){if(addClickHandlersToElements(),window.userLoggedIn){serverCall({crudName:"userLoggedIn"})}else serverCall("serverCall");login(),signUp(),logout()}function addClickHandlersToElements(){document.getElementById("add").addEventListener("click",handleAddClicked),document.getElementById("cancel").addEventListener("click",handleCancelClick)}function handleAddClicked(e){var t=void 0;t=window.userLoggedIn?window.userLoggedIn:"default";var a=getStudentFormValue();addStudent(t,a.student.value,a.course.value,parseFloat(a.grade.value),null,!0)}function handleCancelClick(){var e=getStudentFormValue();for(a in e)e[a].classList.remove("error");clearAddStudentFormInputs()}function getStudentFormValue(){return{student:document.getElementById("studentName"),course:document.getElementById("course"),grade:document.getElementById("studentGrade")}}function addStudent(e,t,n,d,o,r){var s=getStudentFormValue();if(""==t.trim()||""==n.trim()||""==d||isNaN(d)){for(a in s)s[a].classList.remove("error");for(a in s)""==s[a].value.trim()&&s[a].classList.add("error")}else{for(a in s)s[a].classList.remove("error");var l={user:e,name:t,course:n,grade:d,id:o},u={crudName:"createStudent",newstudent:l};student_array.push(l),r?serverCall(u):(updateStudentList(l),clearAddStudentFormInputs())}}function clearAddStudentFormInputs(){document.getElementById("studentName").value="",document.getElementById("course").value="",document.getElementById("studentGrade").value=""}function renderStudentOnDom(e){var t=document.createElement("tr"),a=document.createElement("td"),n=document.createTextNode(e.name);a.appendChild(n);var d=document.createElement("td"),o=document.createTextNode(e.course);d.appendChild(o);var r=document.createElement("td"),s=document.createTextNode(e.grade);r.appendChild(s);var l=document.createElement("td"),u=document.createElement("button");u.className="btn btn-success update";var i=document.createTextNode("Update");u.appendChild(i),l.appendChild(u);var c=document.createElement("button");c.className="btn btn-danger delete";var m=document.createTextNode("Delete");c.appendChild(m),l.appendChild(c),t.appendChild(a),t.appendChild(d),t.appendChild(r),t.appendChild(l),document.querySelector(".student-list tbody").appendChild(t),updateButton(u,e),deleteButton(c,e)}function updateStudentList(e){renderStudentOnDom(e),renderGradeAverage(calculateGradeAverage(student_array))}function calculateGradeAverage(e){var t=null;return e.map(function(e){t+=parseFloat(e.grade)}),parseFloat(t/e.length)}function renderGradeAverage(e){for(var t=document.getElementsByClassName("avgGrade"),a=0;a<t.length;a++)t[a].innerText=e.toFixed(2)}function deleteButton(e,t){e.addEventListener("click",function(){var e=document.querySelector(".deleteModal");document.querySelector(".DeleteName").value=t.name,document.querySelector(".DeleteCourse").value=t.course,document.querySelector(".DeleteGrade").value=t.grade;e.classList.remove("hide"),e.classList.add("show"),confirmDeleteModal(this,t)})}function confirmDeleteModal(e,t){document.querySelector(".DeleteAjax").addEventListener("click",function(){var a={deleteStudent:t,crudName:"deleteStudent"};removeStudent(t,e),serverCall(a),deleteModalHide()}),document.querySelector(".cancelDelete").addEventListener("click",function(){deleteModalHide()})}function deleteModalHide(){var e=document.querySelector(".deleteModal");e.classList.add("hide"),e.classList.remove("show")}function cancelModal(){var e=document.getElementsByClassName("modal")[0];e.classList.add("hide"),e.classList.remove("show")}function updateButton(e,t){e.addEventListener("click",function(){document.querySelector(".updateName").value=t.name,document.querySelector(".updateCourse").value=t.course,document.querySelector(".updateGrade").value=t.grade;var e=document.getElementsByClassName("modal")[0];e.classList.remove("hide"),e.classList.add("show");var a=document.querySelector(".updateAjax");a.addEventListener("click",function e(){updateStudent(t),a.removeEventListener("click",e)}),document.querySelector(".cancelModal").addEventListener("click",function(){cancelModal()})})}function updateStudent(e){var t={name:document.querySelector(".updateName").value,course:document.querySelector(".updateCourse").value,grade:document.querySelector(".updateGrade").value,id:e.id,crudName:"updateStudent"},a=document.getElementsByClassName("modal")[0];a.classList.remove("show"),a.classList.add("hide"),serverCall(t)}function removeStudent(e,t){var a=student_array.indexOf(e);student_array.splice(a,1),t.parentNode.parentNode.remove()}function serverCall(e){switch(e.crudName){case"deleteStudent":ajaxCall({url:"http://localhost/studentGrade/php_sgt/data.php?action=delete",method:"POST",dataType:"json",data:"api_key=ToxPuUbzst&student_id="+e.deleteStudent.id,success:deleteStudent});break;case"createStudent":ajaxCall({url:"http://localhost/studentGrade/php_sgt/data.php?action=insert",method:"POST",dataType:"json",data:"user="+e.newstudent.user+"&name="+e.newstudent.name+"&course="+e.newstudent.course+"&grade="+e.newstudent.grade,success:createStudent});break;case"updateStudent":ajaxCall({url:"http://localhost/studentGrade/php_sgt/data.php?action=update",method:"POST",dataType:"json",data:"api_key=ToxPuUbzst&name="+e.name+"&course="+e.course+"&grade="+e.grade+"&student_id="+e.id,success:createStudent});break;case"userLoggedIn":ajaxCall({url:"http://localhost/studentGrade/php_sgt/data.php?action=userRead",method:"POST",dataType:"json",data:"api_key=ToxPuUbzst",success:dataCapture});break;default:ajaxCall({url:"http://localhost/studentGrade/php_sgt/data.php?action=readAll",method:"POST",dataType:"json",data:"api_key=ToxPuUbzst",success:dataCapture})}}function ajaxCall(e){var t=new XMLHttpRequest;t.onload=function(){if(4==this.readyState&&200==this.status)return""==this.response?void 0:e.success(JSON.parse(this.response))},t.open("POST",e.url),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t.send(e.data)}function dataCapture(e){if(e.success){document.querySelector(".student-list>tbody").innerHTML="",student_array=[];e.data.map(function(e){addStudent(e.user,e.name,e.course,e.grade,e.id,!1)})}else console.log(e)}function createStudent(e){serverCall(window.userLoggedIn?{crudName:"userLoggedIn"}:{crudName:"undefined"})}function deleteStudent(e){serverCall(window.userLoggedIn?{crudName:"userLoggedIn"}:{crudName:"undefined"})}function login(){$(".login").on("click",function(){loginPopUp()})}function signUp(){$(".signUp").on("click",function(){signupPopUp()})}function signupPopUp(){$(".signup-form").removeClass("hide"),$(".signupPopUp").addClass("animated bounceIn"),setTimeout(function(){$(".signupPopUp").removeClass("animated bounceIn")},1e3),$(".cancelSignUp").on("click",function(e){$(".signupPopUp").addClass("animated bounceOut"),setTimeout(function(){$(".signup-form").addClass("hide"),$(".signupPopUp").removeClass("animated bounceOut"),clearForms()},1e3),$(".cancelSignUp").off(),$(".signUpBtn").off()}),$(".loginRedirect").on("click",function(e){loginRedirect()}),$(".signUpBtn").on("click",function(){var e=signUpForm();$(".emailError").text(""),e.validation&&signupAjax(e)})}function clearForms(){$(".username").val(""),$(".email").val(""),$(".password").val(""),$(".confirm_password").val("")}function loginRedirect(e){$(".signupPopUp").addClass("animated bounceOut"),setTimeout(function(){$(".signupPopUp").removeClass("animated bounceOut"),$(".signup-form").addClass("hide"),$(".cancelSignUp").off(),$(".signUpBtn").off(),clearForms()},700),setTimeout(function(){loginPopUp(e)},1150)}function signupAjax(e){e.password="tHodAoaSpp"+e.password+"627846",$.ajax({url:"http://localhost/studentGrade/php_sgt/data.php?action=signUp",type:"POST",data:{username:e.username,email:e.email,password:e.password},dataType:"json",success:function(e){e.success?loginRedirect(e):e.success||($(".emailError").text("- Already in use"),$(".emailError").addClass("animated flash"),setTimeout(function(){$(".emailError").removeClass("animated flash")},1200))},error:function(e,t){console.log(e),console.log(t)}})}function signUpForm(){var e=emailAndPasswordVerification("signup"),t=e.validate,a=$(".username").val().trim(),n=$(".confirm_password").val().trim();return""==a&&($(".usernameError").text("- Username required").addClass("Error animated flash"),t=!1),""==e.password&&""!=n&&($(".passwordError").text("- password required").addClass("Error animated flash"),t=!1),""==n&&""!=e.password?($(".confirm_passwordError").text("- confirmation password required").addClass("Error animated flash"),t=!1):e.password!==n&&""!=e.password&&($(".confirm_passwordError").text("- password doesn't match!").addClass("Error animated flash"),t=!1),setTimeout(function(){$(".Error").removeClass("animated flash")},1200),{username:a,email:e.email,password:e.password,validation:t}}function emailAndPasswordVerification(e){var t=!0,a=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;switch($(".Error").text(""),e){case"signup":var n=$(".email").val().trim(),d=$(".password").val().trim();return""!=n&&a.test(n.trim())||($(".emailError").text("- Invalid Email").addClass("Error animated flash"),t=!1),""==d&&($(".passwordError").text("- password required").addClass("Error animated flash"),t=!1),userCredentials={validate:t,email:n,password:d};case"login":n=$(".inputEmail").val().trim(),d=$(".inputPassword").val().trim();return""!=n&&a.test(n.trim())||($(".inputEmailError").text("- Invalid Email").addClass("Error animated flash"),t=!1),""==d&&($(".inputPassError").text("- password required").addClass("Error animated flash"),t=!1),userCredentials={validate:t,email:n,password:d}}}function loginPopUp(e){e?($(".loginHeader").text("Sign Up Successful, Login?").addClass("SuccessTrue"),$("#inputEmail").val(e.data)):($(".loginHeader").text("Login").css("color","#000"),$("#inputEmail").val("")),$(".loginModal").removeClass("hide"),$(".loginPopUP").addClass("animated bounceIn"),setTimeout(function(){$(".loginPopUP").removeClass("animated bounceIn")},1e3),$(".cancel").on("click",function(){$(".loginPopUP").addClass("animated bounceOut"),setTimeout(function(){$(".loginPopUP").removeClass("animated bounceOut"),$(".loginModal").addClass("hide")},1e3),$(".cancel").off()}),$(".loginEnter").on("click",function(){loginForm()})}function loginForm(){var e=emailAndPasswordVerification("login");e.validate&&loginAjax(e)}function loginAjax(e){e.password="tHodAoaSpp"+e.password+"627846",$.ajax({url:"http://localhost/studentGrade/php_sgt/data.php?action=login",type:"POST",data:{email:e.email,password:e.password},dataType:"json",success:function(e){e.success?($(".loginHeader").removeClass("Error"),$(".loginHeader").text("Successful Login!"),$(".loginHeader").addClass("SuccessTrue animated tada"),setTimeout(function(){window.location.reload()},1e3)):e.success||($(".loginHeader").text(e.invalid),$(".loginHeader").addClass("Error animated flash"),setTimeout(function(){$(".loginHeader").removeClass("animated flash")},1e3))},error:function(e,t){console.log(e),console.log(t)}})}function logout(){$(".Logout").on("click",function(){$.ajax({url:"http://localhost/studentGrade/php_sgt/data.php?action=logout",type:"POST",dataType:"json",success:function(e){e.success&&window.location.reload()},error:function(e,t){console.log("error"),console.log(e),console.log(t)}})})}
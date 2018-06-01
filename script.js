/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 * 
 
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array=[];

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
addClickHandlersToElements();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){

      document.getElementById("add").addEventListener("click",handleAddClicked);
      document.getElementById("cancel").addEventListener("click",handleCancelClick);
      document.getElementById("server").addEventListener("click",function(){
            serverCall("serverCall");
      });

      
      // $("#server").on("click" ,{crud:"serverCall"} ,serverCall);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(event){
   
      var studentName= document.getElementById("studentName").value;
      var course =document.getElementById("course").value;
      var studentGrade=parseFloat(document.getElementById("studentGrade").value);
      var createStudent=true;
      addStudent(studentName,course,studentGrade,null,createStudent);

}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
      clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(studentName,courseType,studentGrade,idNumber,createStudent){
    
    var student ={ name: studentName, course: courseType, grade: studentGrade,id:idNumber };
    
    var crud={crudName:"createStudent",newstudent:student};
    student_array.push(student);
    
    if(createStudent){
      serverCall(crud);
    }
    updateStudentList(student);
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
      var studentName= document.getElementById("studentName").value="";
      var course =document.getElementById("course").value="";
      var studentGrade=document.getElementById("studentGrade").value="";
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(newStudent){

      var outer_tr = $('<tr>');
      var inner_td_name = $('<td>', {
            text: newStudent.name,
      });
      var inner_td_course = $('<td>', {
            text: newStudent.course,
      });
      var inner_td_grade = $('<td>', {
            text: newStudent.grade,
      })
      var inner_td_button = $('<td>');
      var button = $('<button>', {
            text: 'Delete',
            class: 'btn btn-danger delete',
      })
      
      $(inner_td_button).append(button);
      $(outer_tr).append(inner_td_name, inner_td_course, inner_td_grade, inner_td_button);
      $('.student-list tbody').append(outer_tr);
      deleteButton(button,newStudent)
     
}


/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(student){
      renderStudentOnDom(student);
      renderGradeAverage(calculateGradeAverage(student_array));

  
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(array){

var studentGradeSum= null;
for(var x =0;x<array.length;x++){
   studentGradeSum+= parseFloat(array[x].grade);
 }
 var studentGradeAverage = parseFloat(studentGradeSum/x);
 return studentGradeAverage;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(number){
      var avgGrade= document.getElementsByClassName("avgGrade");
      for(var x=0;x<avgGrade.length;x++){
            avgGrade[x].innerText=number;
      }
     
    
}
function deleteButton(button,student){
      $(button).on("click",function(){
            var element=this;

            removeStudent(student,element);
            var crud={deleteStudent:student,crudName:"deleteStudent"};
            serverCall(crud);

      });
}
function removeStudent(studentDeleted,element){
  var location=student_array.indexOf(studentDeleted);
  student_array.splice(location,1);
  $(element).parent().parent().empty();
}

function serverCall(crud){
      
      switch(crud.crudName){

      case "deleteStudent":
            var dataPull={url:"http://s-apis.learningfuze.com/sgt/delete",
                  method:'POST',
                  dataType:'json',
                  data:{"api_key":"ToxPuUbzst",
                        "student_id":crud.deleteStudent.id},
                  success:deleteStudent
            }
            break;

      case "createStudent":
            var dataPull={url:"http://s-apis.learningfuze.com/sgt/create",
                  method:'POST',
                  dataType:'json',
                  data:{"api_key":"ToxPuUbzst",
                         "name":crud.newstudent.name,
                           "course":crud.newstudent.course,
                            "grade":crud.newstudent.grade
                        },
                  success:createStudent
            }
            break;
      default :
    
            var dataPull={url:"http://s-apis.learningfuze.com/sgt/get",
                  method:'POST',
                  dataType:'json',
                  data:{"api_key":"ToxPuUbzst"},
                  success:dataCapture
            }
      }
    
      $.ajax(dataPull);
      
}

function dataCapture(response){
      console.log(response);
      $(".student-list>tbody").empty()
      student_array=[];
      var createStudent=false;
      for(var x=0;x<response.data.length;x++){
            addStudent(response.data[x].name,response.data[x].course,response.data[x].grade,response.data[x].id,createStudent); 
      }
     
}

function createStudent(response){

var crud={crudName:"undefine"};

serverCall(crud);
}

function deleteStudent(response){

var crud={crudName:"undefine"};
serverCall(crud);
}







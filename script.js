/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
document.addEventListener('DOMContentLoaded', initializeApp);

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
let student_array=[];

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
      document.getElementById("server").addEventListener("click",()=>{
            serverCall("serverCall");
      });

      
      
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(event){
   
      let studentName= document.getElementById("studentName").value;
      let course =document.getElementById("course").value;
      let studentGrade=parseFloat(document.getElementById("studentGrade").value);
      const createStudent=true;
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
    
    const student ={ name: studentName, course: courseType, grade: studentGrade,id:idNumber };
    
    const crud={crudName:"createStudent",newstudent:student};
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
      let studentName= document.getElementById("studentName").value="";
      let course =document.getElementById("course").value="";
      let studentGrade=document.getElementById("studentGrade").value="";
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(newStudent){

      const outer_tr =document.createElement("tr");
      const inner_td_name =document.createElement("td");
      let inner_td_text=document.createTextNode(newStudent.name);
      inner_td_name.appendChild(inner_td_text);

      const inner_td_course = document.createElement("td");
      let inner_td_course_text= document.createTextNode(newStudent.course);
      inner_td_course.appendChild(inner_td_course_text);

      const inner_td_grade = document.createElement("td");
      let inner_td_grade_text= document.createTextNode(newStudent.grade);
      inner_td_grade.appendChild(inner_td_grade_text);

      const inner_td_button =document.createElement("td");
      const button =document.createElement("button");
      button.className='btn btn-danger delete';
      const button_text=document.createTextNode('Delete');
      button.appendChild(button_text);
      inner_td_button.appendChild(button);
      

      outer_tr.appendChild(inner_td_name);
      outer_tr.appendChild(inner_td_course);
      outer_tr.appendChild(inner_td_grade);
      outer_tr.appendChild(inner_td_button);

      document.querySelector(".student-list tbody").appendChild(outer_tr);
     
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

let studentGradeSum= null;
for(var x =0;x<array.length;x++){
   studentGradeSum+= parseFloat(array[x].grade);
 }
 let studentGradeAverage = parseFloat(studentGradeSum/x);
 return studentGradeAverage;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(number){
      const avgGrade= document.getElementsByClassName("avgGrade");
      for(let x=0;x<avgGrade.length;x++){
            avgGrade[x].innerText=number.toFixed(2);
      }
     
    
}
function deleteButton(button,student){
      button.addEventListener("click",function(){
            const element=this;

            removeStudent(student,element);
            const crud={deleteStudent:student,crudName:"deleteStudent"};
            serverCall(crud);

      });
}
function removeStudent(studentDeleted,element){
  let location=student_array.indexOf(studentDeleted);
  student_array.splice(location,1);
  element.parentNode.parentNode.remove();
  
}

function serverCall(crud){
      let dataPull;
      switch(crud.crudName){

      case "deleteStudent":
            dataPull={
                  url:"http://s-apis.learningfuze.com/sgt/delete",
                  method:'POST',
                  dataType:'json',
                  data:`api_key=ToxPuUbzst&student_id=${crud.deleteStudent.id}`,
                      
                  success:deleteStudent
            }
            ajaxCall(dataPull)
            break;

      case "createStudent":
             dataPull={
                  url:"http://s-apis.learningfuze.com/sgt/create",
                  method:'POST',
                  dataType:'json',
                  data:`api_key=ToxPuUbzst&name=${crud.newstudent.name}&course=${crud.newstudent.course}&grade=${crud.newstudent.grade}`,
                        
                        
                  success:createStudent
            }
            ajaxCall(dataPull)
            break;
      default :
    
             dataPull={
                  url:"http://s-apis.learningfuze.com/sgt/get",
                  method:'POST',
                  dataType:'json',
                  data:"api_key=ToxPuUbzst",
                  success:dataCapture
            }
            ajaxCall(dataPull)
      }
    
     
      
}

function ajaxCall(dataPull){
        
      const xhttp = new XMLHttpRequest();
   
      xhttp.onreadystatechange =function() {
        if (this.readyState == 4 && this.status == 200) {
        return dataPull.success(JSON.parse(this.response));
        }
      };
      xhttp.open("POST", dataPull.url);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.send(dataPull.data);


    }
      


function dataCapture(response){
      console.log(response);
      document.querySelector(".student-list>tbody").innerHTML="";
      student_array=[];
      const createStudent=false;
      for(let x=0;x<response.data.length;x++){
            addStudent(response.data[x].name,response.data[x].course,response.data[x].grade,response.data[x].id,createStudent); 
      }
     
}

function createStudent(response){

const crud={crudName:"undefined"};

serverCall(crud);
}

function deleteStudent(response){

const crud={crudName:"undefined"};
serverCall(crud);
}







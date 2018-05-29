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
    
      $("#add").on("click",handleAddClicked);

      $("#cancel").on("click",handleCancelClick);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(event){

      var studentName=$("#studentName").val();
      var course =$("#course").val();
      var studentGrade=$("#studentGrade").val();
      addStudent(studentName,course,studentGrade);

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
function addStudent(studentName,courseType,studentGrade){

    var student ={ name: studentName, course: courseType, grade: studentGrade };
    console.log(student);
    student_array.push(student);
    updateStudentList(student);
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
      var studentName=$("#studentName").val("");
      var course =$("#course").val("");
      var studentGrade=$("#studentGrade").val("");
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
      $(".avgGrade").text(number);
}







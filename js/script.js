/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerPage = 9; // global constant should be accessible in all my functions

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;
  
  const studentList = document.querySelector('ul.student-list');
  studentList.innerHTML = '';
  
  // build tag quickly: may want to move this function to global scope later!
  function createElement(tagName, className, textContent = '') {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = textContent;
    
    return element;
  }
  
  function createListItem(student) {
    // create the outer li
    const li = createElement('li', 'student-item cf')
    
    //create the first <div> for student details
    const studentDiv = createElement('div', 'student-details');
    
    // create inner elements of the student-details <div>
    const avatar = createElement('img', 'avatar');
    avatar.src = student.picture.thumbnail; 
    const nameH3 = createElement('h3', '', `${student.name.first} ${student.name.last}`);
    const emailSpan = createElement('span', 'email', student.email);
    
    // stick the inner elements into the first <div>
    studentDiv.appendChild(avatar);
    studentDiv.appendChild(nameH3);
    studentDiv.appendChild(emailSpan);
    
    // create second <div>
    const joinedDiv = document.createElement('div', 'joined-details');
    
    // create the <span> inside it
    const dateSpan = createElement('span', 'date', `Joined ${student.registered.date}`);
    
    // put the <span> in the <div>
    joinedDiv.appendChild(dateSpan);
    
    // append the <div>s to the <li>
    li.appendChild(studentDiv);
    li.appendChild(joinedDiv);
    
    return li;
  }
  
  for (let i = 0; i < list.length; i++ ) {
    if ( i >= startIndex && i < endIndex ) {
      // create the <li> and append it to the list all in one go
      studentList.appendChild(createListItem(list[i]));
    }
  }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  // initialization: figure out number of pages, clear the <ul>
	const numPages = Math.ceil(list.length / itemsPerPage); 
	const linkList = document.querySelector('ul.link-list');
	linkList.innerHTML = '';
	
  for (let i = 1; i <= numPages; i++ ) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = i;
    li.appendChild(button);
    linkList.appendChild(li);
  }
  
  const activeButton = document.querySelector('ul.link-list li button'); //first button in an li in the correct list
  activeButton.className = 'active';
  
  linkList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      console.log(`You clicked button ${event.target.textContent}!`)
    }
  });
}


// Call functions
showPage(data, 1);
addPagination(data);
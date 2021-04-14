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

// use this function to create an element with a class and text content in one line
function createElement(tagName, className ='', textContent = '') {
	const element = document.createElement(tagName);
	if (className) { 
		element.className = className;
	}
	element.textContent = textContent;
	
	return element;
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;
  
  const studentList = document.querySelector('ul.student-list');
  studentList.innerHTML = '';
    
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
  
  // okay you actually don't need page buttons if there's one page!
  if (numPages <= 1) {
    return;
  }
  
  for (let i = 1; i <= numPages; i++ ) {
    const li = createElement('li');
    const button = createElement('button', '', i);
    li.appendChild(button);
    linkList.appendChild(li);
  }
  
  // get a collection of all pagination <button> elements
  const pageButtons = document.querySelectorAll('ul.link-list li button');
  
  // we're only here if there are at least 2 pages worth of results
  // so the pageButtons array will have at least 2 elements and indexing will work!
  pageButtons[0].className = 'active'; // add the "active" class to the first one
  
  linkList.addEventListener('click', (event) => { // one handler will listen for clicks anywhere in the list
    if (event.target.tagName === 'BUTTON') { // only do anything if the click target was a <button>
      for (pageButton of pageButtons) {
        pageButton.className = ''; // remove active class from everyone
      }
      
      const selectedPage = parseInt(event.target.textContent); // use the textContent to determine button #
      pageButtons[selectedPage - 1].className = 'active'; // collections are zero-indexed, so subtract 1
      
      // call our showPage function on the newly selected page!
      showPage(data, selectedPage); // can use either variable, data or list, here. They point to the same object in memory, I think?
    }
  });
}

function addSearchBar() {
  // create the DOM elements
  const searchBar = createElement('label', 'student-search'); // create outer <label>
  searchBar.htmlFor = 'search';
  
  const span = createElement('span', '', 'Search by name'); // create inner <span>  
  
  const input = createElement('input'); // create actual form field
  input.id = 'search';
  input.placeholder = 'Search by name...';
  
  const submit = createElement('button'); // create submit button
  submit.type = 'button';
  
  const searchIcon = createElement('img'); // create the icon <img> element
  searchIcon.src = 'img/icn-search.svg';
  searchIcon.alt = 'Search icon';
  
  submit.appendChild(searchIcon); // put the icon onto the button
  
  // put the other elements inside the <label> in order
  searchBar.appendChild(span);
  searchBar.appendChild(input);
  searchBar.appendChild(submit);
  
  const header = document.querySelector('div.page header.header'); // select the header we're appending the form to
  header.appendChild(searchBar);
  
  // searchNames: takes search input and the original data, makes a new list of matches, then calls showPage() and addPagination()
  function searchNames(searchInput, studentList) {
    const searchFor = searchInput.toLowerCase();
    let matches = [];
    
    for (let i = 0; i < studentList.length; i++) {
      name = `${studentList[i].name.first} ${studentList[i].name.last}`.toLowerCase();
      if (name.includes(searchFor)) {
        matches.push(studentList[i]);
      }
    }
    
    showPage(matches, 1);
    addPagination(matches);
  
  }
  
  // add Event Listeners for keyup and submit
  input.addEventListener('keyup', () => {
  	searchNames(input.value, data);
  });
  
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    searchNames(input.value, data);
  });
  
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar();

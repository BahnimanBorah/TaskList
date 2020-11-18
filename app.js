/**
 * 
 * Main app
 */

// defining the UI variables

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// creating a method to handle all events
loadEventListeners();

function loadEventListeners(){
    
    // add task event
    form.addEventListener('submit', addTask);

    function addTask(e){

        if(taskInput.value === ''){
            alert('Please write a task');
        }else{

        //create new element to add
        const li = document.createElement('li');
        li.className = 'collection-item';
        //create text node and append
        const text = document.createTextNode(taskInput.value);
        li.appendChild(text);
        //create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'; //secondary content means go to right side 
        // add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        //adding to the task list

        tasklist.appendChild(li);

        //clear Input
        taskInput.value = '';

        }

        e.preventDefault();
    }

}
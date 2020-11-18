/**
 * 
 * Main app
 */

// defining the UI variables

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// creating a method to handle all events
loadEventListeners();

function loadEventListeners(){
    
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    tasklist.addEventListener('click', removeTask);
    // clear all tasks
    clearBtn.addEventListener('click', clearAllTasks);
    // filter through the tasks
    filter.addEventListener('keyup', filterTasks);
}

// function to add the new task
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

function removeTask(e){

    if( e.target.parentElement.classList.contains('delete-item') ){
        if(confirm('Are you sure ?')){
            const deleteTask = e.target.parentElement.parentElement.remove();
        }
    }
}

//function to clear all the tasks
function clearAllTasks(e){
    // removeChild is faster than innerHTML=''

    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
}

//filter the tasks
function filterTasks(e){
    
    const text = e.target.value.toLowerCase();
    //querySelectorAll always returns a node list so we can use forEach()
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}
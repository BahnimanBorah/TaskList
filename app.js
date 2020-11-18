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
    
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

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

    //storing in local storage
    storeTaskinLocalStorage(taskInput.value);

    //clear Input
    taskInput.value = '';

    }

    e.preventDefault();
}

// store the task
function storeTaskinLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // storing in loca
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));


}

// get tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create new element to add
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append
    const text = document.createTextNode(task);
    li.appendChild(text);
    //create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; //secondary content means go to right side 
    // add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    //adding to the task list

    tasklist.appendChild(li);

    });
}

function removeTask(e){

    if( e.target.parentElement.classList.contains('delete-item') ){
        if(confirm('Are you sure ?')){
            const deleteTask = e.target.parentElement.parentElement.remove();

            //removing from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//removing local storage data
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if( localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function to clear all the tasks
function clearAllTasks(e){
    // removeChild is faster than innerHTML=''

    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }

    //clear from local storage
    clearTasksFromLocalStorage();
}

// clear all tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
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
const addTask = document.getElementById('add-task');
const inputTask = document.getElementById('task-input');
const allTasks = document.querySelector('.all-tasks');
const delAll = document.getElementById('delete-all-tasks');


let tasks = [];
let todoTasks = [];


    if (!localStorage.tasks) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }


function Task(description) {
    this.description = description;
    this.completed = false;
}


function createTask(task, index) {
    return `
        <div class="create-task ${task.completed ? 'checked' : ''}">
             <div class="task">${task.description}</div>
             <div class="action">           
                  <input onclick="completedTask(${index})" class="complete" type="checkbox" 
                        ${task.completed ? 'checked' : ''}>
                  <span onclick="editTask(${index})" class="edit"><i class="fa-solid fa-pen-to-square"></i></span>
                  <span onclick="deletedTask(${index})" class="delete"><i class="fa-solid fa-trash"></i></span>
             </div>
        </div>            
    `
}


function filterTasks() {
    tasks.sort((previous, next) => previous.completed - next.completed)
    
    // const activeTask = tasks.length && tasks.filter(item => item.completed === false);
    // const completedTask = tasks.length && tasks.filter(item => item.completed === true);
    // tasks = [...activeTask, ...completedTask];
}


function showTasks() {
    allTasks.innerHTML = "";
    if (tasks.length === 0) {
        delAll.classList.add("hide");
    } else {
        delAll.classList.remove("hide");
    }
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            allTasks.innerHTML += createTask(item, index);
        });
        todoTasks = document.querySelectorAll('.create-task');
        
    }
}

showTasks();


function storage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function completedTask(index) {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoTasks[index].classList.add('checked')
        setTimeout(() => {
            alertify.success('Task done!')
            },150)
    } else {
        todoTasks[index].classList.remove('checked')
        setTimeout(() => {
            alertify.warning('Task not done!')
            },150)
    }
    storage();
    showTasks();
}


function deletedTask(index) {
    todoTasks[index].classList.add('deleted')
    setTimeout(() => {
        tasks.splice(index, 1);
        storage();
        showTasks();
    }, 500)
    setTimeout(() => {
        alertify.success('Task deleted!')
        }, 700)

}


    function editTask(index) {
        let currTask = todoTasks[index]; 
        if (!currTask.classList.contains('edit')) { 
          currTask.classList.add('edit'); 
          currTask.querySelector('.task').innerHTML = `<input type="txt" value="${tasks[index].description}">`; 
        } else {
          let newTask = currTask.querySelector('.task > input').value;
          tasks[index].description = newTask;
          currTask.querySelector('.task').innerText = newTask;
          setTimeout(() => {
            alertify.success('Task edited!')
            }, 100)
          storage();
          showTasks();
        }
      }


addTask.addEventListener("click", () => {
    if (inputTask.value === '') {
        alertify.error('Enter a task!')
    } else {
        setTimeout(() => {
        alertify.success('Task added!')
        }, 100)
        tasks.push(new Task(inputTask.value));
    }
    storage();
    showTasks();
    inputTask.value = '';

});


delAll.addEventListener("click", () => {
        setTimeout(() => {
            alertify.success('All tasks deleted!')
            }, 100)
        tasks = [];
        storage();
        showTasks();       
});

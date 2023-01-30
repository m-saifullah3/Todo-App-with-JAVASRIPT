
showTasks();

const form = document.getElementById('add-task-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskInputElement = document.getElementById('task-input');
    const taskInputValue = taskInputElement.value;
    const error = document.getElementById('error-msg');

    taskInputElement.classList.remove('invalid-input');
    error.innerText = '';

    if (taskInputValue == '' || taskInputValue === undefined) {
        taskInputElement.classList.add('invalid-input');
        error.innerText = 'Please input task';
    } else {
        taskInputElement.value = '';
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        let tasksList = [];
        if (localTasks) {
            tasksList = localTasks;
        } else {
            tasksList = [];
        }
        tasksList.push(taskInputValue);
        localStorage.setItem('tasks', JSON.stringify(tasksList));

        showTasks();
    }
})

    function showTasks() {
        const tasksContainer = document.getElementById('tasks-container');
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        let taskOutputElement = '';
        if (localTasks) {
            localTasks.forEach(function (value, index) {
                taskOutputElement += `<div class="task-container" id="task-${index}"><input type="text" class="task-text" id="input-${index}" value="${value}"readonly><button class="btn" onclick="editTask(${index})" id="edit-${index}">Edit</button><button class="btn" onclick="deleteTask(${index})" id="delete-${index}">Delete</button></div>`;
                }
            )
            tasksContainer.innerHTML = taskOutputElement;
        }
    }

    function editTask(index) {
            const inputElement = document.getElementById('input-' + index);
            const btnEditElement = document.getElementById('edit-' + index);
            if (btnEditElement.innerText.toLowerCase() == 'edit') {
                inputElement.removeAttribute('readonly');
                inputElement.style.border = '1px solid black';
                btnEditElement.innerText = 'Save';
            } else {
                if (inputElement.value == '' || inputElement.value === undefined) {
                    inputElement.style.border = '1px solid red';
                } else {
                    inputElement.setAttribute('readonly', 'readonly');
                    inputElement.style.border = 'none';
                    btnEditElement.innerText = 'Edit';
                }
            }
            let localTasks = JSON.parse(localStorage.getItem('tasks'));
            localTasks[index] = inputElement.value;
            localStorage.setItem('tasks', JSON.stringify(localTasks));
    }

    function deleteTask(index) {
            let localTasks = JSON.parse(localStorage.getItem('tasks'));
            localTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(localTasks));
            showTasks();
    }
 


    
// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const taskList = document.getElementById('taskList');
const filter = document.getElementById('filter');
const search = document.getElementById('search');

// Update date and time dynamically
function updateDateTime() {
    const now = new Date();
    document.getElementById('dateTime').textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Enable/disable Add Task button
function toggleAddTaskButton() {
    addTaskBtn.disabled = taskInput.value.trim() === "";
}
taskInput.addEventListener('input', toggleAddTaskButton);

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        createTaskElement(taskText);
        taskInput.value = "";
        toggleAddTaskButton();
        saveTasks();
    }
});

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
    taskList.innerHTML = "";
    localStorage.removeItem('tasks');
});

// Clear completed tasks
clearCompletedBtn.addEventListener('click', () => {
    document.querySelectorAll('.completed').forEach(task => {
        task.remove();
    });
    saveTasks();
});

// Filter tasks
filter.addEventListener('change', () => {
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach(task => {
        switch (filter.value) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'pending':
                task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
});

// Search tasks
search.addEventListener('input', () => {
    const query = search.value.toLowerCase();
    document.querySelectorAll('#taskList li').forEach(task => {
        const text = task.textContent.replace("Delete", "").toLowerCase().trim();
        task.style.display = text.includes(query) ? 'flex' : 'none';
    });
});

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        tasks.push({
            text: task.textContent.replace("Delete", "").trim(),
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Create a task element
function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    if (isCompleted) {
        li.classList.add('completed');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.addEventListener('click', (e) => {
        if (e.target !== deleteBtn) {
            li.classList.toggle('completed');
            saveTasks();
        }
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Initialize tasks on page load
window.onload = loadTasks;

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = "";
    }
});

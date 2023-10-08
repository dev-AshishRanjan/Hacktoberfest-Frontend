// Load tasks from localStorage when the page is loaded
window.onload = function() {
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        document.getElementById('taskList').innerHTML = savedTasks;
    }

    // Set up event delegation for task deletion
    document.getElementById('taskList').addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            e.target.parentNode.removeChild(e.target);
            // Update tasks in localStorage after deletion
            localStorage.setItem('tasks', taskList.innerHTML);
        }
    });
};

function addTask() {
    var taskInput = document.getElementById("task");
    var taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    var taskList = document.getElementById("taskList");
    var taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);

    // Save tasks to localStorage
    localStorage.setItem('tasks', taskList.innerHTML);

    // Clear input after adding task
    taskInput.value = "";
}

let submitBtn = document.querySelector(".add");
let input = document.querySelector(".input");
let tasks = document.querySelector(".tasks");

// Load tasks from Local Storage
let eachTask = JSON.parse(localStorage.getItem("tasks")) || [];

// Show tasks container if there are saved tasks
if (eachTask.length > 0) {
  tasks.style.display = "flex";
}

// Function to create a task
function createTask(taskObj) {
  tasks.style.display = "flex";

  let task = document.createElement("div");
  task.classList.add("task");
  task.dataset.id = taskObj.id; // Set unique ID
  task.innerHTML = `
    <p class="content">${taskObj.text}</p>
    <input type="button" class="btn" value="Delete"/>
  `;

  // Delete task on button click
  task.querySelector(".btn").addEventListener("click", function () {
    removeTask(taskObj.id);
  });

  tasks.appendChild(task);
}

// Function to remove task
function removeTask(taskId) {
  let taskIndex = eachTask.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    eachTask.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(eachTask));

    let taskElement = document.querySelector(`.task[data-id="${taskId}"]`);
    if (taskElement) {
      tasks.removeChild(taskElement);
    }
  }

  if (eachTask.length === 0) tasks.style.display = "none";
}

// Add task event
submitBtn.addEventListener("click", function () {
  let taskText = input.value.trim();
  if (taskText === "") return;

  let taskObj = { id: Date.now(), text: taskText }; // Unique ID
  createTask(taskObj);
  eachTask.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(eachTask));

  input.value = "";
  input.focus();
});

// Load existing tasks on page load
eachTask.forEach((task) => createTask(task));

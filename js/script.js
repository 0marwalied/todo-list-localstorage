let submitBtn = document.querySelector(".add");
let input = document.querySelector(".input");
let tasks = document.querySelector(".tasks");
tasks.style.display = "none";
let eachTask = JSON.parse(localStorage.getItem("tasks")) || [];

submitBtn.addEventListener("click", function () {
  if (input.value === "") return;
  createTask(input.value);
  eachTask.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(eachTask));
  input.value = "";
});

function removeTask(idx) {
  let task = tasks.children[idx];
  if (task) {
    tasks.removeChild(task);
    eachTask.splice(idx, 1);
    localStorage.setItem("tasks", JSON.stringify(eachTask));
  }
  if (eachTask.length == 0) tasks.style.display = "none";
}

function createTask(content) {
  tasks.style.display = "flex";
  console.log("hello");
  let task = document.createElement("div");
  task.classList.add("task");
  task.innerHTML = `
  <p class="content">${content}</p>
  <input type="button" class="btn" value="Delete"/>
  `;
  task.querySelector(".btn").addEventListener("click", function () {
    removeTask(Array.from(tasks.children).indexOf(task));
  });
  tasks.appendChild(task);
}

eachTask.forEach((task) => createTask(task));

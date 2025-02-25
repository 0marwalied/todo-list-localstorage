let submitBtn = document.querySelector(`input[type="submit"]`);
let localStorageList = JSON.parse(localStorage.getItem(`tasks`)) || [];
let task = document.querySelector(`input[type="text"]`);
let tasksDiv = document.querySelector(`.tasks`);
let clearBtn = document.querySelector(`input[value="clear"]`);

clearBtn.addEventListener(
  "click",
  () => ((localStorageList = []), showTasks())
);

function addTask(content) {
  if (content === ``) return;
  localStorageList.push({ task: content });
  localStorage.setItem(`tasks`, JSON.stringify(localStorageList));
}

function createTask(content) {
  let task = document.createElement(`div`);
  task.className = `task`;
  task.innerHTML += `<p class="content">${content}</p>`;
  task.innerHTML += `<input type="button" value="Delete" class="btn"/>`;
  task
    .querySelector(`.btn`)
    .addEventListener("click", () =>
      removeTask(Array.from(tasksDiv.children).indexOf(task))
    );
  return task;
}

function showTasks() {
  if (localStorageList.length) tasksDiv.style.display = `flex`;
  else tasksDiv.style.display = `none`;
  tasksDiv.innerHTML = ``;
  localStorage.setItem(`tasks`, JSON.stringify(localStorageList));
  localStorageList.forEach((element) => {
    tasksDiv.appendChild(createTask(element.task));
  });
}

function removeTask(idx) {
  localStorageList = localStorageList.filter((item, index) => index !== idx);
  localStorage.setItem(`tasks`, JSON.stringify(localStorageList));
  showTasks();
}

submitBtn.addEventListener("click", function () {
  addTask(task.value);
  task.value = ``;
  showTasks();
});

showTasks();

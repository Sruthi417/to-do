const addbutton = document.getElementById("add");
const taskinput = document.getElementById("to-do");
const tasklist = document.getElementById("list");

// Add task
function addtask() {
  const task = taskinput.value.trim();
  if (task) {
    const newTask = { text: task, completed: false };
    createtaskElement(newTask);
    saveTask(newTask);
    taskinput.value = "";
  } else {
    alert("Please enter a task");
  }
}
addbutton.addEventListener("click", addtask);

// Create task element (applies inline line-through when completed)
function createtaskElement(taskObj) {
  const lists = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = taskObj.text;
  if (taskObj.completed) {
    taskText.style.textDecoration = "line-through";
  }

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.addEventListener("click", () => {
    const isDone = taskText.style.textDecoration === "line-through";
    taskText.style.textDecoration = isDone ? "none" : "line-through";
    updateTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.addEventListener("click", () => {
    lists.remove();
    updateTasks();
  });

  lists.appendChild(taskText);
  lists.appendChild(completeBtn);
  lists.appendChild(deleteBtn);
  tasklist.appendChild(lists);
}

// Save a single new task
function saveTask(taskObj) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Rebuild storage from current DOM (after complete/delete)
function updateTasks() {
  const tasks = [];
  tasklist.querySelectorAll("li").forEach((li) => {
    const span = li.querySelector("span");
    const text = span.textContent.trim();
    const completed = span.style.textDecoration === "line-through";
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on page start
function loadtasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(createtaskElement);
}
loadtasks();

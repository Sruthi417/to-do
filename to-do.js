 const addbutton=document.getElementById("add");
            const taskinput=document.getElementById("to-do");
            const tasklist=document.getElementById("list");
           

            function addtask(){
                const task= taskinput.value.trim();
                if(task){
                    createtaskElement(task);
                    taskinput.value="";
                    savetasks();
                }
                else{
                    alert("Please enter a task");
                }

                
            }
           
            addbutton.addEventListener("click",addtask);

            const createtaskElement=(task) => {
            const lists= document.createElement('li');
           

            // text span
  const taskText = document.createElement("span");
  taskText.textContent = task;

  //  complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.style.marginLeft = "10px";
  completeBtn.addEventListener("click", () => {
    taskText.style.textDecoration =
      taskText.style.textDecoration === "line-through" ? "none" : "line-through";
  });

  //  delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", () => {
    lists.remove();
  });

  lists.appendChild(taskText);
  lists.appendChild(completeBtn);
  lists.appendChild(deleteBtn);


            tasklist.appendChild(lists);
}


function savetasks(){
    let tasks=[];
    tasklist.querySelectorAll("li span").forEach (function(item) {
        tasks.push(item.textContent.trim());
});

localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadtasks(){
    const tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.forEach(createtaskElement);}

     loadtasks();
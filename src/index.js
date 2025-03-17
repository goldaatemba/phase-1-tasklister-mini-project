document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  
  const taskForm = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  
  // Create Sort Button
  const sortButton = document.createElement("button");
  sortButton.textContent = "Sort by Priority";
  sortButton.style.marginTop = "10px";
  taskForm.parentNode.insertBefore(sortButton, taskList);
  
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const taskInput = document.getElementById("new-task-description");
    const taskUser = document.getElementById("task-user");
    const taskDueDate = document.getElementById("task-due-date");
    const taskPriority = document.getElementById("task-priority");
    
    const taskText = taskInput.value.trim();
    const userText = taskUser ? taskUser.value.trim() : "Unassigned";
    const dueDateText = taskDueDate ? taskDueDate.value : "No due date";
    const priorityValue = taskPriority ? taskPriority.value : "low";
    
    if (!taskText) return;
    
    const taskItem = document.createElement("li");
    taskItem.textContent = `${taskText} (Assigned to: ${userText}, Due: ${dueDateText})`;
    taskItem.dataset.priority = priorityValue;
    
    switch (priorityValue) {
      case "high":
        taskItem.style.color = "red";
        break;
      case "medium":
        taskItem.style.color = "orange";
        break;
      case "low":
        taskItem.style.color = "green";
        break;
    }
    
    // Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.style.marginLeft = "10px";
    editButton.addEventListener("click", () => {
      const newTaskText = prompt("Edit task:", taskText);
      if (newTaskText) {
        taskItem.firstChild.textContent = `${newTaskText} (Assigned to: ${userText}, Due: ${dueDateText})`;
      }
    });
    
    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
    });
    
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    
    console.log("Task Added:", { taskText, userText, dueDateText, priorityValue });
    taskForm.reset();
  });
  
  // Sort tasks by priority
  sortButton.addEventListener("click", () => {
    console.log("Sorting tasks by priority");
    const tasksArray = Array.from(taskList.children);
    tasksArray.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
    });
    taskList.innerHTML = "";
    tasksArray.forEach(task => taskList.appendChild(task));
  });

  // Additional Form Handling
  document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      buildToDo(e.target.new_todo.value);
      form.reset();
    });
  });

  function buildToDo(todo) {
    let p = document.createElement('p');
    let btn = document.createElement('button');
    
    btn.addEventListener('click', handleDelete);
    btn.textContent = 'x';
    
    p.textContent = `${todo}`;
    p.appendChild(btn);
    
    console.log(p);
    document.querySelector('#todo_container').appendChild(p);
  }

  function handleDelete(event) {
    event.target.parentElement.remove();
  }
});


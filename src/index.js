document.addEventListener("DOMContentLoaded", () => {
  // your code here
  dEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    
    const form = document.getElementById("create-task-form");
    const taskList = document.getElementById("tasks");
    const sortButton = document.createElement("button");
    sortButton.textContent = "Sort by Priority";
    document.body.insertBefore(sortButton, taskList);
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const taskInput = document.getElementById("new-task-description");
        const userInput = document.getElementById("task-user");
        const dueDateInput = document.getElementById("task-due-date");
        const priorityInput = document.getElementById("task-priority");
        
        const taskText = taskInput.value.trim();
        const userText = userInput.value.trim();
        const dueDateText = dueDateInput.value;
        const priorityValue = priorityInput.value;
        
        console.log("Form submitted with values:", { taskText, userText, dueDateText, priorityValue });
        
        if (taskText !== "") {
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
            
            console.log("Task added:", taskItem.textContent);
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.style.marginLeft = "10px";
            deleteButton.addEventListener("click", () => {
                console.log("Task deleted:", taskItem.textContent);
                taskItem.remove();
            });
            
            const editButton = document.createElement("button");
            editButton.textContent = "✏️";
            editButton.style.marginLeft = "10px";
            editButton.addEventListener("click", () => {
                const newText = prompt("Edit task:", taskText);
                if (newText !== null) {
                    console.log("Task edited:", { oldText: taskText, newText });
                    taskItem.textContent = `${newText} (Assigned to: ${userText}, Due: ${dueDateText})`;
                    taskItem.appendChild(editButton);
                    taskItem.appendChild(deleteButton);
                }
            });
            
            taskItem.appendChild(editButton);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
            
            taskInput.value = "";
            userInput.value = "";
            dueDateInput.value = "";
        }
    });
    
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
    
    const form2 = document.querySelector("form");
    form2.addEventListener("submit", (e) => {
        e.preventDefault();
        buildToDo(e.target.new_todo.value);
        form2.reset();
    });
    
    function buildToDo(todo) {
        let p = document.createElement("p");
        let btn = document.createElement("button");
        btn.addEventListener("click", handleDelete);
        btn.textContent = "x";
        p.textContent = todo;
        p.appendChild(btn);
        console.log(p);
        document.querySelector("#todo_container").appendChild(p);
    }
    
    function handleDelete(e) {
        e.target.parentNode.remove();
    }
    
    console.log("Before DOM loads");
    console.log(document.querySelector("div"));
});
})
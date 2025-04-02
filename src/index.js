document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("create-task-form");
    const taskList = document.getElementById("tasks");
    const sortButton = document.getElementById("sort-button"); // Use existing button

    if (!form || !taskList || !sortButton) {
        console.error("Required elements not found.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        const taskInput = document.getElementById("new-task-description");
        const userInput = document.getElementById("task-user");
        const dueDateInput = document.getElementById("task-due-date");
        const priorityInput = document.getElementById("task-priority");

        if (!taskInput || !userInput || !dueDateInput || !priorityInput) {
            console.error("One or more input fields are missing.");
            return;
        }

        const taskText = taskInput.value.trim();
        const userText = userInput.value.trim();
        const dueDateText = dueDateInput.value;
        const priorityValue = priorityInput.value;

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

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.style.marginLeft = "10px";
            deleteButton.addEventListener("click", () => taskItem.remove());

            // Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "✏️";
            editButton.style.marginLeft = "10px";
            editButton.addEventListener("click", () => {
                const newText = prompt("Edit task:", taskText);
                if (newText !== null) {
                    taskItem.textContent = `${newText} (Assigned to: ${userText}, Due: ${dueDateText})`;
                    taskItem.appendChild(editButton);
                    taskItem.appendChild(deleteButton);
                }
            });

            taskItem.appendChild(editButton);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);

            // Clear input fields
            taskInput.value = "";
            userInput.value = "";
            dueDateInput.value = "";
        } else {
            alert("Task description cannot be empty!");
        }
    });

    // Sorting functionality
    sortButton.addEventListener("click", () => {
        const tasksArray = Array.from(taskList.children);
        tasksArray.sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
        });
        taskList.innerHTML = "";
        tasksArray.forEach(task => taskList.appendChild(task));
    });
});

form.addEventListener('submit', (e) => {
  try {
    e.preventDefault();
    const name = input.value.trim(); // Trim to avoid whitespace issues
    if (!name) return; // Prevent adding empty tasks

    let val = priority.value === 'low' ? 1 : priority.value === 'medium' ? 2 : 3;
    const task = new Task(name, priority.value, val);

    tasksArray.unshift(task);
    localStorage.setItem('tasks', JSON.stringify(tasksArray)); // Save to local storage
    updateDOMTasks(); // Update the UI

    input.value = ''; // Clear input after submission
  } catch (error) {
    console.error(error);
  }
});

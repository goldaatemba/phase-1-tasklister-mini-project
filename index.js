document.addEventListener("DOMContentLoaded",() => {
  document.getElementById('create-task-form').addEventListener('submit',function(event){
    event.preventDefault();

    const taskDescription = document.getElementById('new-task-description').value;

    const li = document.createElement('li');li.textContent =taskDescription;

    const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'delete-task';

          deleteButton.addEventListener('click', function(){
            li.remove();
          });

    li.appendChild(deleteButton);      

    document.getElementById('tasks').appendChild(li);

    document.getElementById('new-task-description').value ='';
  });
});
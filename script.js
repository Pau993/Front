const apiUrl = 'http://localhost:8080/api/tasks'; // Cambia esta URL según la configuración de tu backend.

const taskForm = document.getElementById('taskForm');
const newTaskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');

// Cargar las tareas cuando la página se carga
document.addEventListener('DOMContentLoaded', loadTasks);

// Evento para agregar una nueva tarea
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskDescription = newTaskInput.value.trim();
  if (taskDescription !== '') {
    addTask(taskDescription);
  }
  newTaskInput.value = '';
});

// Función para cargar las tareas desde el backend
function loadTasks() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(tasks => {
      taskList.innerHTML = '';
      tasks.forEach(task => {
        renderTask(task);
      });
    })
    .catch(error => console.error('Error al cargar las tareas:', error));
}

// Función para agregar una tarea
function addTask(description) {
  const task = {
    description: description,
    completed: false
  };
  
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  .then(response => response.json())
  .then(newTask => {
    renderTask(newTask);
  })
  .catch(error => console.error('Error al agregar tarea:', error));
}

// Función para renderizar una tarea en la lista
function renderTask(task) {
  const li = document.createElement('li');
  li.id = `task-${task.id}`;
  li.classList.toggle('completed', task.completed);

  li.innerHTML = `
    <span>${task.description}</span>
    <div>
      <button onclick="toggleTaskCompletion(${task.id}, ${task.completed})">${task.completed ? 'Desmarcar' : 'Completar'}</button>
      <button onclick="deleteTask(${task.id})">Eliminar</button>
    </div>
  `;
  taskList.appendChild(li);
}

// Función para cambiar el estado de completado de una tarea
function toggleTaskCompletion(taskId, completed) {
  fetch(`${apiUrl}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed: !completed })
  })
  .then(() => {
    const taskElement = document.getElementById(`task-${taskId}`);
    taskElement.classList.toggle('completed', !completed);
    taskElement.querySelector('button').textContent = !completed ? 'Desmarcar' : 'Completar';
  })
  .catch(error => console.error('Error al cambiar estado de la tarea:', error));
}

// Función para eliminar una tarea
function deleteTask(taskId) {
  fetch(`${apiUrl}/${taskId}`, {
    method: 'DELETE'
  })
  .then(() => {
    const taskElement = document.getElementById(`task-${taskId}`);
    taskList.removeChild(taskElement);
  })
  .catch(error => console.error('Error al eliminar tarea:', error));
}

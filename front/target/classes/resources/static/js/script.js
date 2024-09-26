const apiUrl = 'http://localhost:8080/tasks';

// Elementos del DOM
const taskForm = document.getElementById('taskForm');
const newTaskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');
const taskIdComplete = document.getElementById('taskIdComplete');
const taskIdDelete = document.getElementById('taskIdDelete');

// Función para manejar la selección de acciones del menú
function selectAction() {
  const action = document.getElementById('actionSelect').value;
  hideAllForms();

  switch(action) {
    case 'addTask':
      taskForm.style.display = 'block';
      break;
    case 'viewTasks':
      loadTasks();
      document.getElementById('taskTable').style.display = 'block';
      break;
    case 'completeTask':
      document.getElementById('completeTaskForm').style.display = 'block';
      break;
    case 'deleteTask':
      document.getElementById('deleteTaskForm').style.display = 'block';
      break;
  }
}

// Ocultar todos los formularios y tablas
function hideAllForms() {
  taskForm.style.display = 'none';
  document.getElementById('taskTable').style.display = 'none';
  document.getElementById('completeTaskForm').style.display = 'none';
  document.getElementById('deleteTaskForm').style.display = 'none';
}

// Cargar las tareas desde el backend
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

// Agregar una nueva tarea
function addTask() {
  const description = newTaskInput.value.trim();
  if (description === '') {
    alert('La descripción de la tarea no puede estar vacía.');
    return;
  }

  const newTask = {
    description: description,
    completed: false
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
    .then(response => response.json())
    .then(task => {
      renderTask(task);
      alert(`Tarea creada con éxito: ID ${task.id}`);
      newTaskInput.value = '';
    })
    .catch(error => console.error('Error al agregar la tarea:', error));
}

// Renderizar una tarea en la tabla
function renderTask(task) {
  const row = document.createElement('tr');
  row.id = `task-${task.id}`;
  row.innerHTML = `
    <td>${task.id}</td>
    <td>${task.description.charAt(0).toUpperCase() + task.description.slice(1)}</td> <!-- Formato de la primera letra en mayúscula -->
    <td>${task.completed ? 'Completada' : 'Pendiente'}</td>
  `;
  taskList.appendChild(row);
}

// Marcar una tarea como completada
function completeTask() {
  const taskId = parseInt(taskIdComplete.value.trim());
  if (isNaN(taskId)) {
    alert('Debes ingresar un ID válido.');
    return;
  }

  fetch(`${apiUrl}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed: true })
  })
    .then(() => {
      alert(`Tarea con ID ${taskId} marcada como completada.`);
      loadTasks();
    })
    .catch(error => console.error('Error al completar la tarea:', error));
}

// Eliminar una tarea
function deleteTask() {
  const taskId = parseInt(taskIdDelete.value.trim());
  if (isNaN(taskId)) {
    alert('Debes ingresar un ID válido.');
    return;
  }

  fetch(`${apiUrl}/${taskId}`, {
    method: 'DELETE'
  })
    .then(() => {
      alert(`Tarea con ID ${taskId} eliminada.`);
      loadTasks();
    })
    .catch(error => console.error('Error al eliminar la tarea:', error));
}

// Inicializar los eventos
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('menu').style.display = 'block';
});

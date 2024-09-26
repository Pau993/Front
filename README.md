![image](https://github.com/user-attachments/assets/ae1ea461-2e76-4116-9a26-e38d0ffc626d)

Este proyecto es una solución práctica para la gestión de tareas, ofreciendo una interfaz simple y efectiva 
para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre tareas. Su arquitectura permite la 
extensión y mejora, como la adición de características como la edición de tareas o la implementación de usuarios.

Funcionalidades
Agregar Tareas: Los usuarios pueden ingresar una nueva tarea a través de un formulario. Las tareas se envían a 
un servidor backend (en este caso, corriendo en localhost:8080), donde se almacenan.
![image](https://github.com/user-attachments/assets/38e8e2d1-a142-4345-afa9-88811bb9504c)

Ver Tareas: Al seleccionar la opción de ver tareas, la aplicación hace una solicitud al backend para recuperar
la lista de tareas almacenadas y las muestra en una tabla. Cada tarea incluye un ID, una descripción 
y un estado (completada o pendiente).

Completar Tareas: Los usuarios pueden marcar tareas como completadas ingresando el ID de la tarea.
Esto envía una solicitud al backend para actualizar el estado de la tarea.

Eliminar Tareas: De manera similar, los usuarios pueden eliminar tareas ingresando el ID de la tarea
que desean eliminar, lo que envía una solicitud de eliminación al servidor.

Uso de la Aplicación
Acceso: Abrir la aplicación en un navegador (por ejemplo, http://localhost:8080).

Seleccionar Acción: Elegir entre agregar, ver, completar o eliminar tareas en el menú.

Agregar Tarea:

Seleccionar "Agregar Tarea".
Ingresar la descripción y enviar.
Ver Tareas:

Seleccionar "Ver Tareas" para cargar y mostrar la lista de tareas.
Completar Tarea:

Seleccionar "Completar Tarea".
Ingresar el ID de la tarea y confirmar.
Eliminar Tarea:

Seleccionar "Eliminar Tarea".
Ingresar el ID de la tarea y confirmar.
Mensajes de Alerta
La aplicación proporciona mensajes de alerta para asegurar entradas válidas y confirmar acciones.

Andres Felipe Rodriguez Chaparro
Santiago Penagos
Paula Natalia Paez Vega
Marco Antonio Alvarez 
Manuela Felipe Barrera Barrera

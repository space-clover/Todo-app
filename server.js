const express = require('express');
const cors = require('cors'); // Importa el paquete 'cors'

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const data = { 
  "tasks": [
    {
      "text": "Walk the dog and buy some groceries.",
      "completed": true,
      "id": 13,
      "important":false,
    },
    {
      "text": "Read a chapter of a book.",
      "completed": true,
      "id": 14,
      "important": true ,
    },
    {
      "text": "Prepare a presentation for the meeting.",
      "completed": false,
      "id": 18,
      "important": true ,
    },
    {
      "text": "Call the client and schedule a follow-up meeting.",
      "completed": true,
      "id": 19,
      "important": false,
    },
    {
      "text": "Review and test the important feature.",
      "completed": false,
      "id": 21,
      "important":  false,
    },
    {
      "text": "Create a detailed report for the new task.",
      "completed": false,
      "id": 22,
      "important": false,
    },
    {
      "text": "Write an important test note for the project.",
      "completed": true,
      "id": 23,
      "important": false,
    },
    {
      "text": "Complete the important test task in the project.",
      "completed": true,
      "id": 24,
      "important": true,
    }
  ],
  "Notes": [
    {
      "text": "Take the dog for an extended walk and buy editing supplies.",
      "id": 4
    },
    {
      "text": "Go shopping for groceries.",
      "id": 5
    },
    {
      "text": "Finish the report by EOD.",
      "id": 6
    },
    {
      "text": "Complete the extra assignment for class.",
      "id": 7
    },
    {
      "text": "Prepare for the upcoming exams.",
      "id": 8
    },
    {
      "text": "Review and finalize the presentation.",
      "id": 9
    },
    {
      "text": "Create a new to-do list.",
      "completed": false,
      "id": 10
    },
    {
      "text": "Write a summary of the book.",
      "completed": false,
      "id": 11
    },
    {
      "text": "Schedule a meeting with the team.",
      "completed": false,
      "id": 12
    },
    {
      "text": "Set goals for the week.",
      "completed": false,
      "id": 13
    }
  ]
}
function generateNewId() {
  // Lógica para generar un ID único (por ejemplo, basado en el tiempo actual)
  return Date.now(); // Este es solo un ejemplo, puedes utilizar una lógica más sofisticada.
}

app.get('/tasks', (req, res) => {
  res.json(data.tasks);
});
app.post('/tasks', (req, res) => {
  // Obtén los datos de la nueva tarea del cuerpo de la solicitud (req.body)
  const newTaskData = req.body;
  console.log("data de la nueva tarea" ,newTaskData)

  // Genera un nuevo ID para la tarea (puedes usar alguna lógica para asignar un ID único)
  const newTaskId = generateNewId(); // Implementa esta función para generar un ID único.

  // Crea la nueva tarea con los datos proporcionados y el ID generado.
  const newTask = {
    id: newTaskId,
    text: newTaskData.text,
    completed: newTaskData.completed || false, // Si no se proporciona, establece como false.
    important: newTaskData.important || false, // Si no se proporciona, establece como false.
  };
  console.log("data de la nueva tarea compleja: ", newTask)
  // Agrega la nueva tarea a la lista de tareas en tus datos.
  data.tasks.push(newTask);

  // Responde con la tarea creada en formato JSON.
  res.status(201).json(newTask); // El código 201 indica que se creó la tarea con éxito.
});

app.post('/Notes', (req, res) => {
  // Obtén los datos de la nueva nota del cuerpo de la solicitud (req.body)
  const newNoteData = req.body;
  // Genera un nuevo ID para la nota (puedes usar alguna lógica para asignar un ID único)
  const newNoteId = generateNewId(); // Implementa esta función para generar un ID único para notas.
  // Crea la nueva nota con los datos proporcionados y el ID generado.
  const newNote = {
    id: newNoteId,
    text: newNoteData.text,
    completed: newNoteData.completed || false, // Si no se proporciona, establece como false.
  };
  // Agrega la nueva nota a la lista de notas en tus datos.
  data.Notes.push(newNote);
  // Responde con la nota creada en formato JSON.
  res.status(201).json(newNote); // El código 201 indica que se creó la nota con éxito.
});;

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = data.tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    // Obtén los datos actualizados de la tarea del cuerpo de la solicitud (req.body).
    const updatedTaskData = req.body;

    // Actualiza la tarea existente con los nuevos datos.
    data.tasks[taskIndex] = {
      ...data.tasks[taskIndex],
      ...updatedTaskData,
    };

    res.json(data.tasks[taskIndex]);
  }
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    res.json(task);
  }
});
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = data.tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    // Elimina la tarea encontrada del array de tareas.
    data.tasks.splice(taskIndex, 1);
    res.status(204).send(); // El código 204 indica que la tarea se eliminó con éxito y no hay contenido en la respuesta.
  }
});

app.get('/Notes', (req, res) => {
  res.json(data.Notes);
});

app.get('/Notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = data.Notes.find((n) => n.id === noteId);
  if (!note) {
    res.status(404).json({ error: 'Nota no encontrada' });
  } else {
    res.json(note);
  }
});
app.delete('/Notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = data.Notes.findIndex((n) => n.id === noteId);

  if (noteIndex === -1) {
    res.status(404).json({ error: 'Nota no encontrada' });
  } else {
    // Elimina la nota encontrada del array de notas.
    data.Notes.splice(noteIndex, 1);
    res.status(204).send(); // El código 204 indica que la nota se eliminó con éxito y no hay contenido en la respuesta.
  }
});
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = data.tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    // Obtén los datos actualizados de la tarea del cuerpo de la solicitud (req.body).
    const updatedTaskData = req.body;

    // Actualiza la tarea existente con los nuevos datos.
    data.tasks[taskIndex] = {
      ...data.tasks[taskIndex],
      ...updatedTaskData,
    };

    res.json(data.tasks[taskIndex]);
  }
});


app.listen(port, () => {
  console.log(`Servidor API en ejecución en http://localhost:${port}`);
});
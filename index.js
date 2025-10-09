// 1. Importa Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Datos de ejemplo (simulando una base de datos)
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Middleware para parsear JSON en las peticiones (para POST, PUT, etc.)
app.use(express.json());

// 2. Define las rutas (Endpoints)

// GET /users - Obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users); // Responde con la lista de usuarios en formato JSON
});

// GET /users/:id - Obtener un usuario por su ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // Obtiene el ID de la URL
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user); // Devuelve el usuario encontrado
  } else {
    res.status(404).send({ error: 'Usuario no encontrado' }); // Devuelve un error 404
  }
});

// POST /users - Crear un nuevo usuario
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1, // Genera un nuevo ID simple
    name: req.body.name // Obtiene el nombre del cuerpo de la petición
  };
  users.push(newUser);
  res.status(201).json(newUser); // Devuelve el usuario creado y un estado 201
});

// PUT /users/:id - Actualizar un usuario
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    users[userIndex].name = req.body.name || users[userIndex].name; // Actualiza el nombre
    res.json(users[userIndex]);
  } else {
    res.status(404).send({ error: 'Usuario no encontrado para actualizar' });
  }
});

// DELETE /users/:id - Eliminar un usuario
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const initialLength = users.length;
  users = users.filter(u => u.id !== userId); // Filtra el usuario a eliminar

  if (users.length < initialLength) {
    res.status(204).send(); // Respuesta exitosa sin contenido (204 No Content)
  } else {
    res.status(404).send({ error: 'Usuario no encontrado para eliminar' });
  }
});


// 3. Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor API REST escuchando en http://localhost:${PORT}`);

});

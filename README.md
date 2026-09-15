# Lab 2 - Patron Repository

API simple de tareas construida con TypeScript y Express.

## Instalacion

```
npm install
npm run build
npm run dev
```

## Endpoints

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

## Objetivo del laboratorio

El controller (`src/controllers/task.controller.ts`) accede directamente al arreglo de tareas en memoria. El ejercicio consiste en aplicar el patron Repository:

1. Crear una interfaz `TaskRepository`.
2. Implementar `InMemoryTaskRepository`.
3. Inyectar el repositorio en el controller en lugar de manipular el arreglo directamente.
4. (Opcional) Crear una segunda implementacion, por ejemplo con una base de datos, sin modificar el controller.
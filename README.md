# codoacodo-node-back
Proyecto Final con NodeJS , Express, React &amp; MySql para el programa codo a codo 4.0, seccion backend.

# Sistema de Gestión de Empleados

Este proyecto es un sistema backend para la gestión de empleados, departamentos y roles. Proporciona una API completa para la administración de estos recursos, 
facilitando la creación, lectura, actualización y eliminación (CRUD) de datos de empleados, proyectos y departamentos.


# Tecnologías Utilizadas

- **Node.js**: Para construir el servidor backend.
- **Express**: Un framework para Node.js que simplifica la creación de aplicaciones web.
- **JWT**: Para la autenticación basada en tokens.
- **bcryptjs**: Para el hashing de contraseñas.
- **Postman**: Para probar la API durante el desarrollo.
- **Vercel**: Para el despliegue del servidor. https://sistema-gestion-de-empleados-backend-2024.vercel.app/


# Prueba de rutas en postman


1. Debe registrar un usuario

POST      https://sistema-gestion-de-empleados-backend-2024.vercel.app/usuarios/register
{ "username": "ejemplo@mail.com",
  "password": "ejemplo123" }


2. Logear

POST      https://sistema-gestion-de-empleados-backend-2024.vercel.app/usuarios/login
{ "username": "ejemplo@mail.com",
  "password": "ejemplo123" }

## Postman devolvera un token el cual debe utilizar en header. En key colocal authorization y en value el token recibido sin comillas.

{
    "status": "success",
    "message": "Inicio de sesion exitoso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhbmFAbWFpbC5jb20iLCJpYXQiOjE3MjA3MzMwNjQsImV4cCI6MTcyMDczNjY2NH0.eiRR1r8oUWzGgxIlSgipKUe0Ame_JB1i3_Yd147y1b8"
}

##  Con este token podras ingresar a las siguientes rutas:


-----------------
|  # EMPLEADOS  |
-----------------

 - GET     https://sistema-gestion-de-empleados-backend-2024.vercel.app/empleados (Lista todos los empleados)
 - GET     https://sistema-gestion-de-empleados-backend-2024.vercel.app/empleados/dni (Te devuelve un empleado por dni)
 - POST    https://sistema-gestion-de-empleados-backend-2024.vercel.app/empleados (Añade un nuevo empleado)
   {
  "nombre": "Juan",
  "apellido": "Perez",
  "dni": "12345678",
  "fecha_contratacion": "2023-07-01",
  "salario": 50000,
  "departamento_id": 1,
  "pais": "Argentina",
  "cargo": "Desarrollador"
}
- PUT     https://sistema-gestion-de-empleados-backend-2024.vercel.app/empleados/dni (Actualiza un empleado por su dni)
  
 {
  "nombre": "Pepito",
  "apellido": "Perez",
  "dni": "12345678",
  "fecha_contratacion": "2023-07-01",
  "salario": 50000,
  "departamento_id": 1,
  "pais": "Argentina",
  "cargo": "Desarrollador"
}

- DELETE     https://sistema-gestion-de-empleados-backend-2024.vercel.app/empleados/dni (Elimina un empleado por su dni)



-----------------
|  # PROYECTOS  |
-----------------

 - GET     https://sistema-gestion-de-empleados-backend-2024.vercel.app/proyectos (Lista todos los proyectos)
 - GET     https://sistema-gestion-de-empleados-backend-2024.vercel.app/proyectos/id (Te devuelve un empleado por id)
 - POST    https://sistema-gestion-de-empleados-backend-2024.vercel.app/proyectos (Añade un nuevo proyecto)
   {
  "nombre": "Nuevo Proyecto",
  "fecha_inicio": "2024-01-01",
  "presupuesto": 100000
}


- PUT     https://sistema-gestion-de-empleados-backend-2024.vercel.app/empleados/dni (Actualiza un proyecto por su id)
  
{
  "nombre": "Nuevo Proyecto actualizado",
  "fecha_inicio": "2024-01-01",
  "presupuesto": 1564876
}

- DELETE     https://sistema-gestion-de-empleados-backend-2024.vercel.app/empleados/dni (Elimina un proyecto por su id)

--------------------
|  # DEPARTAMENTOS  |
--------------------

 - GET     https://sistema-gestion-de-empleados-backend-2024.vercel.app/departamentos (Lista todos los departamentos)
 - GET     https://sistema-gestion-de-empleados-backend-2024.vercel.app/departamentos/id (Te devuelve un departamento por id)
 - POST    https://sistema-gestion-de-empleados-backend-2024.vercel.app/departamentos (Añade un nuevo departamento)
  {
  "nombre": "Recursos Humanos",
  "ubicacion": "Edificio Central, Piso 2"
}


- PUT     https://sistema-gestion-de-empleados-backend-2024.vercel.app/departamentos/id (Actualiza un departamento por su id)
  
{
  "nombre": "Recursos Humanos",
  "ubicacion": "Buenos Aires, Argentina"
}


- DELETE     https://sistema-gestion-de-empleados-backend-2024.vercel.app/departamentos/id (Elimina un departamentos por su id)



--------------------
|  # ASIGNACIONES  |
--------------------

 - GET     https://sistema-gestion-de-empleados-backend-2024.vercel.app/asignaciones (Lista todos las asignaciones)
 - GET     https://sistema-gestion-de-empleados-backend-2024.vercel.app/asignaciones/id (Te devuelve las asignaciones por id)
 - POST    https://sistema-gestion-de-empleados-backend-2024.vercel.app/asignaciones (Añade una nueva asignacion)
{
  "empleado_id": 1,
  "proyecto_id": 2,
  "fecha_asignacion": "2024-07-01",
  "horas_trabajadas": 40
}


- PUT     https://sistema-gestion-de-empleados-backend-2024.vercel.app/asignaciones/id (Actualiza una asignacion por su id)
  
{
  "empleado_id": 19,
  "proyecto_id": 6,
  "fecha_asignacion": "2024-07-01",
  "horas_trabajadas": 40
}
- DELETE     https://sistema-gestion-de-empleados-backend-2024.vercel.app/asignaciones/id (Elimina una asignacion por su id)

































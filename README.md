# Proyecto Students 

Este proyecto es una API REST para gestionar estudiantes, desarrollada con **Node.js** y **Express.js**, utilizando **PostgreSQL** como base de datos y Docker Compose para la orquestación.

## Instalación

1. Clonar el repositorio:

git clone https://github.com/tu-usuario/tu-repositorio.git

2. Ubiquese en la carpeta del proyecto clonado

cd ~/students

(~ significa el resto de la ruta que tendras que poner en dado caso que lo alojes en una ruta especifica de tu pc)

3. Asegurese que los puertos por defecto esten libres (Appi en 5000 y postgress en 5432) Si alguno de estos puertos está en uso, consulte la siguiente sección para cambiarlos.

## Configuracion  de puertos

Si los puertos están ocupados, edite los siguientes archivos:

### Puerto de la Api
Edita docker-compose.yml y cambia la línea de ports en backend:

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"  

Cambie 5000 por un puerto libre. Ejemplo 5002:5000

### Puerto de PostgreSQL
Edite docker-compose.yml y cambie la línea de ports en db:

db:
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: students
    ports:
      - "5432:5432"

Cambie 5432 por un puerto libre. Ejemplo 5444:5432

## Correr la API

1. Ubiquese en la carpeta del proyecto clonado

cd ~/students

(~ significa el resto de la ruta que tendras que poner en dado caso que lo alojes en una ruta especifica de tu pc)

2. Construir y levantar los contenedores con el comando:

docker compose up -d --build

3. Verifique que los contenedores están corriendo con:

docker ps

## Usar la API
Recuerde que si cambio el puerto de la API la curl debe reflejar el cambio

### Obtener estudiantes (Get)
curl http://localhost:5001/students

### Obtener un estudiante por su id (Get)
curl -X GET http://localhost:5000/students/34

(en /34 ingrese el id deseado)

### Agregar estudiante (Post)
curl -X POST http://localhost:5000/students \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Carlos López",
    "edad": 23,
    "carrera": "Derecho"
  }'

(modifique el nombre, edad y carrera a su gusto, el id es autoincremental)

### Eliminar un estudiante por id (Delete)
curl -X DELETE http://localhost:5000/students/35

(en /35 ingrese el id deseado)

### Eliminar todos los estudiantes (Delete)
curl -X DELETE http://localhost:5000/students

## Detener Appi

### Detener los contenedores sin eliminarlos:
docker compose stop

### Detener y eliminar los contenedores, **pero conservar la base de datos**:
docker compose down

### Eliminar todo (contenedores, red y datos de la base de datos):
docker compose down -v
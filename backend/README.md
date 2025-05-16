# 📝 Backend de la Aplicación To-Do

Este es el backend de la aplicación To-Do, construido con **Node.js** y **Express**. Proporciona una API REST robusta para la gestión de usuarios, listas de tareas y tareas individuales.

---

## ✨ Características Principales

- 🔐 **Autenticación y Autorización Seguras**

  - Registro de usuarios con encriptación de contraseñas.
  - Inicio de sesión.
  - JWT para proteger rutas privadas.

- 🗂️ **Gestión de Listas de Tareas**

  - Crear, ver, editar y eliminar listas de tareas.

- ✅ **Gestión de Tareas**

  - Crear, consultar, modificar y eliminar tareas dentro de listas.

- 📘 **Documentación de API**
  - Swagger UI para probar y explorar los endpoints de forma interactiva.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología     | Descripción                                          |
| -------------- | ---------------------------------------------------- |
| **Node.js**    | Entorno de ejecución en JavaScript para el servidor. |
| **Express.js** | Framework web para construir APIs REST.              |
| **Sequelize**  | ORM para bases de datos relacionales (como MySQL).   |
| **MySQL**      | Base de datos relacional.                            |
| **JWT**        | Autenticación segura mediante tokens.                |
| **Swagger**    | Documentación de APIs RESTful.                       |

---

## 📂 Estructura del Proyecto

```bash
backend/
├── .env                    # Variables de entorno
├── docker-compose.yml      # Configuración Docker
├── index.js                # Punto de entrada principal
├── package.json            # Dependencias y scripts
└── src/
    ├── config/             # Configuración (DB, etc.)
    ├── docs/               # Swagger
    ├── middleware/         # Middlewares personalizados
    ├── models/             # Modelos de Sequelize
    ├── routes/             # Rutas de la API
    └── ...                 # Lógica adicional
```

---

## ⚙️ Guía de Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/RomanOrtega89/To-Do.git
cd to-do/backend
```

### 2️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con tus propios valores. Los siguientes son solo ejemplos y `*NO DEBEN USARSE EN EL PROYECTO REAL*` :

```env
API_HOST=localhost
API_PORT=3000
MYSQL_DATABASE=nombre_base_datos
MYSQL_USER=usuario
MYSQL_PASSWORD=contraseña
DB_HOST=localhost
JWT_SECRET=clave_secreta
MYSQL_LOCAL_PORT=3306
MYSQL_ROOT_PASSWORD=contraseña_root
```

### 3️⃣ Instalar Dependencias

```bash
npm install
```

### 4️⃣ Iniciar el Servidor en Modo Desarrollo

```bash
npm run dev
```

---

## 🐳 Desarrollo con Docker (Opcional)

### 🔹 Iniciar Servicios con Docker Compose

Asegúrate de tener **Docker** y **Docker Compose** instalados:

```bash
docker-compose up -d
```

Esto iniciará los contenedores en segundo plano.

### 🔹 Acceso al Backend

La API estará disponible en:

```
http://<API_HOST>:<API_PORT>
```

Reemplaza con los valores de tu archivo `.env`.

---

## 📚 Documentación de la API

Disponible en:

```
http://<API_HOST>:<API_PORT>/api-docs
```

Por ejemplo:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧪 Scripts Disponibles

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

- `npm run dev`: Ejecuta el servidor en modo desarrollo con reinicio automático.
- `npm start`: Ejecuta en modo producción.

# 🎓 EduWeb - Plataforma Educativa

EduWeb es una plataforma educativa moderna y robusta desarrollada con Next.js 14 para ofrecer una experiencia de aprendizaje en línea integral. Cuenta con un sistema de certificaciones digitales, gráficas interactivas para visualizar estadísticas de progreso y una interfaz intuitiva para la creación sencilla de cursos.

![Course Screenshot](/docs/screenshots/courses.png)

## 📑 Tabla de contenido

-   [Stack Tecnológico](#-stack-tecnológico)
-   [Características](#-características-principales)
-   [Arquitectura](#%EF%B8%8F-arquitectura)
-   [Instalación y Uso](#%EF%B8%8F-instalación-y-desarrollo)
-   [Estructura del Proyecto](#-estructura-del-proyecto)
-   [Contribución](#-contribución)
-   [Flujos de Usuario](#-flujos-funcionales)
-   [API REST](#-api-documentada)

## 🚀 Stack Tecnológico

-   **Frontend**:

    -   Next.js 14 (App Router)
    -   React 19
    -   Tailwind CSS V4
    -   DaisyUI
    -   Chart.js para visualizaciones
    -   React Beautiful DnD
    -   Plyr para reproductores de video
    -   Valibot para validación de formularios

-   **Backend**:
    -   MySQL con Sequelize-cli ORM
    -   NextAuth para la auntenticacion

## 📚 Características Principales

### Autenticación y Usuarios

-   Sistema de registro y login con múltiples proveedores (Google, GitHub)
-   Perfiles de usuario personalizables
-   Roles de usuario (Estudiante, Profesor, Administrador)
-   Gestión de permisos y accesos

![Auth Screenshot](/docs/screenshots/login.png)

### Cursos y Aprendizaje

-   Creación y gestión de cursos
-   Sistema de lecciones y módulos
-   Contenido multimedia (videos, documentos, imágenes)
-   Progreso de aprendizaje y seguimiento
-   Sistema de calificaciones y evaluaciones

![Exams Screenshot](/docs/screenshots/exams.png)

### Certificados

-   Generación automática de certificados
-   Validación de certificados
-   Historial de certificados por usuario

![Certificates Screenshot](/docs/screenshots/certificates.png)

### Análisis y Reportes

-   Dashboard con gráficos interactivos
-   Estadísticas de progreso
-   Visualización de datos con Chart.js

![ Screenshot](/docs/screenshots/progress.png)

### Interfaz de Usuario

-   Diseño responsivo y moderno
-   Funcionalidades de arrastrar y soltar
-   Navegación intuitiva

## 🏗️ Arquitectura

![Arquitectura](/docs/arquitecture.png)

-   El cliente (Next.js) se comunica con la API REST
-   La API maneja la lógica y realiza consultas mediante el ORM Sequelize a la base de datos MySQL

## 🛠️ Instalación y Desarrollo

1. Desacargar el zip y descomprimirlo:

2. Instalar dependencias:

```bash
npm install
```

3. Crear la base de datos en PHPMyAdmin:

```SQL
CREATE DATABASE `eduweb`;
```

4. Copiar el archivo .env.example a .env y configurar las variables de entorno:

```bash
cp .env.example .env
```

5. Ejecutar migraciones sequelize:

```bash
npm run db:migrate && npm run db:seed
```

6. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## 📊 Estructura del Proyecto

```
eduweb/
├── src/
│   ├── app/                 # APP Router
│   │   ├── api/             # API Endpoints
│   │   ├── api-docs/        # API Documentation
│   ├── components/          # React Components
│   ├── hooks/               # Custom Hooks
│   ├── lib/                 # Utilities and Configurations
│   ├── layouts/             # Application Layouts
│   ├── database/
│   │   ├── models/          # Sequelize Models
│   │   ├── migrations/      # Sequelize Migrations
│   │   ├── seeds/           # Sequelize Seeds
├── public/                  # Static Files
```

## 🤝 Contribución

1. Fork
2. Crea tu rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit: `git commit -m "Agrega X"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 🔄 Flujos funcionales

### 🧑‍🍳 Usuario

-   Registro y autenticación
-   Visualización de cursos disponibles
-   Desarrollo del curso
-   Descarga de certificado
-   Validación de certificado
-   Edición de perfil

### 👨‍🏫 Profesor

-   Acceso al panel de cursos
-   Gestión de cursos

### 👨‍💼 Admin

-   Acceso al panel de administración
-   Gestión de información de usuarios

## 📝 API Documentada

La API de EduWeb está completamente documentada con Swagger y sigue las mejores prácticas REST. Incluye:

### Endpoints Principales

#### Usuarios (`/api`)

-   `GET /users` - Listar usuarios (paginado)
-   `GET /users/:id` - Detalles del usuario
-   `PUT /users/:id` - Actualizar usuario
-   `DELETE /users/:id` - Eliminar usuario
-   `GET /users/:id/courses` - Cursos del usuario
-   `GET /users/:id/courses/:courseId` - Detalles de un curso específico del usuario

#### Cursos (`/api`)

-   `GET /courses` - Listar cursos (con filtros)
-   `GET /courses/:id` - Detalles del curso
-   `GET /courses/:id/exam` - Obtener examen del curso

#### Progreso de Cursos (`/api`)

-   `GET /users/:id/courses/:courseId/exams/start` - Iniciar examen del curso
-   `GET /users/:id/courses/:courseId/exams/:examId` - Obtener detalles del examen
-   `POST /users/:id/courses/:courseId/exams/:examId` - Enviar respuestas del examen
-   `GET /users/:id/courses/:courseId/certificate` - Obtener certificado del curso

#### Certificados (`/api`)

-   `GET /certificates/:id` - Verificar certificado

#### Información (`/api`)

-   `GET /info` - Información general del sistema

## 🗄️ Modelos de Base de Datos

La aplicación utiliza Sequelize ORM con los siguientes modelos principales:

-   `User` - Gestión de usuarios y perfiles
-   `Role` - Roles y permisos
-   `Course` - Cursos y contenido educativo
-   `Lesson` - Lecciones y módulos
-   `Exam` - Evaluaciones y exámenes
-   `Question` - Preguntas de evaluación
-   `Answer` - Respuestas y calificaciones
-   `UserCourse` - Relación usuarios-cursos
-   `UserLesson` - Progreso de lecciones
-   `UserExam` - Resultados de exámenes
-   `UserAnswer` - Respuestas de usuarios
-   `Block` - Bloques de lecciones
-   `Category` - Categorías de cursos
-   `Certificate` - Certificados y validaciones

## 📞 Contacto

Para soporte o consultas, por favor contacta a:

-   Email: andres52885241@gmail.com
-   Telefono: 3209202177

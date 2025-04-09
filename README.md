# EduWeb - Plataforma Educativa

EduWeb es una plataforma educativa moderna y robusta desarrollada con tecnologías de vanguardia para ofrecer una experiencia de aprendizaje en línea excepcional.

## 🚀 Tecnologías Principales

- **Frontend**: 
  - Next.js 14 (App Router)
  - React 19
  - Tailwind CSS V4
  - DaisyUI
  - Chart.js para visualizaciones
  - React DnD para funcionalidades de arrastrar y soltar

- **Backend**:
  - MySQL con Sequelize-cli ORM
  - NEXT AUTH para la auntenticacion

## 📚 Características Principales

### Autenticación y Usuarios
- Sistema de registro y login con múltiples proveedores (Google, GitHub)
- Perfiles de usuario personalizables
- Roles de usuario (Estudiante, Profesor, Administrador)
- Gestión de permisos y accesos

### Cursos y Aprendizaje
- Creación y gestión de cursos
- Sistema de lecciones y módulos
- Contenido multimedia (videos, documentos, imágenes)
- Progreso de aprendizaje y seguimiento
- Sistema de calificaciones y evaluaciones

### Certificados
- Generación automática de certificados
- Validación de certificados
- Historial de certificados por usuario

### Análisis y Reportes
- Dashboard con gráficos interactivos
- Estadísticas de progreso
- Reportes de rendimiento
- Visualización de datos con Chart.js

### Interfaz de Usuario
- Diseño responsivo y moderno
- Temas personalizables
- Funcionalidades de arrastrar y soltar
- Navegación intuitiva

## 📝 API Documentada

La API de EduWeb está completamente documentada con Swagger y sigue las mejores prácticas REST. Incluye:

### Endpoints Principales

#### Usuarios (`/api`)
- `GET /users` - Listar usuarios (paginado)
  - Parámetros: `page`, `limit`
- `GET /users/:id` - Detalles del usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario
- `GET /users/:id/courses` - Cursos del usuario
- `GET /users/:id/courses/:courseId` - Detalles de un curso específico del usuario

#### Cursos (`/api`)
- `GET /courses` - Listar cursos (con filtros)
  - Parámetros: `category`, `order`, `search`, `page`, `limit`
- `GET /courses/:id` - Detalles del curso
- `GET /courses/:id/exam` - Obtener examen del curso

#### Progreso de Cursos (`/api`)
- `GET /users/:id/courses/:courseId/exams/start` - Iniciar examen del curso
- `GET /users/:id/courses/:courseId/exams/:examId` - Obtener detalles del examen
- `POST /users/:id/courses/:courseId/exams/:examId` - Enviar respuestas del examen
- `GET /users/:id/courses/:courseId/certificate` - Obtener certificado del curso

#### Certificados (`/api`)
- `GET /certificates/:id` - Verificar certificado

#### Información (`/api`)
- `GET /info` - Información general del sistema

## 🗄️ Modelos de Base de Datos

La aplicación utiliza Sequelize ORM con los siguientes modelos principales:

- `User` - Gestión de usuarios y perfiles
- `Role` - Roles y permisos
- `Course` - Cursos y contenido educativo
- `Lesson` - Lecciones y módulos
- `Exam` - Evaluaciones y exámenes
- `Question` - Preguntas de evaluación
- `Answer` - Respuestas y calificaciones
- `UserCourse` - Relación usuarios-cursos
- `UserLesson` - Progreso de lecciones
- `UserExam` - Resultados de exámenes
- `UserAnswer` - Respuestas de usuarios
- `Block` - Bloques de contenido
- `Category` - Categorías de cursos
- `Certificate` - Certificados y validaciones

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

4. Ejecutar migraciones sequelize:
```bash
npm run db:migrate && npm run db:seed
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## 📊 Estructura del Proyecto

```
eduweb/
├── src/
│   ├── app/
│   │   ├── api/              # Endpoints de la API
│   │   │   ├── auth/         # Autenticación
│   │   │   ├── courses/      # Cursos
│   │   │   ├── users/        # Usuarios
│   │   │   ├── certificates/ # Certificados
│   │   │   └── info/         # Información general
│   │   ├── api-docs/         # Documentación de la API
│   │   └── (auth)/           # Rutas de autenticación
│   ├── components/           # Componentes React
│   ├── hooks/               # Hooks personalizados
│   ├── lib/                 # Utilidades y configuraciones
│   ├── layouts/             # Layouts de la aplicación
│   ├── database/
│   │   └── models/          # Modelos de Sequelize
├── public/                  # Archivos estáticos
└── tests/                  # Pruebas unitarias
```

## 📞 Contacto

Para soporte o consultas, por favor contacta a:
- Email: andres52885241@gmail.com
- Telefono: 3209202177

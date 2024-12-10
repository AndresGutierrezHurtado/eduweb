DROP DATABASE IF EXISTS `eduweb`;
CREATE DATABASE `eduweb`;
USE `eduweb`;

-- ------------------------------------------------------------------
--
-- Tabla de Detalles de recuperación de cuentas
CREATE TABLE `recoveries` (
    `recovery_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `recovery_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
--
-- Tabla de Detalles de sesiones
CREATE TABLE `sessions` (
    `sid` VARCHAR(60) NOT NULL PRIMARY KEY,
    `expires` DATETIME DEFAULT NULL,
    `data` TEXT DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
--
-- Tabla de usuarios
CREATE TABLE `users` (
    `user_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `user_name` VARCHAR(100) NOT NULL,
    `user_lastname` VARCHAR(100) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL UNIQUE,
    `user_phone` DECIMAL(10, 0) DEFAULT NULL,
    `user_address` VARCHAR(255) DEFAULT NULL,
    `user_password` TEXT NOT NULL,
    `role_id` INT NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
--
-- Tabla de roles
CREATE TABLE `roles` (
    `role_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role_name` VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` VALUES
(1, 'estudiante'),
(2, 'docente'),
(3, 'administrador');

-- ------------------------------------------------------------------
--
-- Tabla de cursos
CREATE TABLE `courses` (
    `course_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `course_name` VARCHAR(255) NOT NULL UNIQUE,
    `course_description` TEXT,
    `course_image_url` TEXT,
    `user_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
-- Tabla de lecciones
CREATE TABLE `lessons` (
    `lesson_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lesson_title` VARCHAR(255) NOT NULL,
    `lesson_content` TEXT,
    `video_url` TEXT,
    `course_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
-- Tabla de certificados
CREATE TABLE `certificates` (
    `certificate_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `course_id` VARCHAR(60) NOT NULL,
    `issue_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `certificate_url` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
-- Tabla de evaluaciones
CREATE TABLE `assessments` (
    `assessment_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `course_id` VARCHAR(60) NOT NULL,
    `question` TEXT NOT NULL,
    `correct_answer` TEXT NOT NULL,
    `options` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
-- Tabla de inscripciones
CREATE TABLE `enrollments` (
    `enrollment_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `course_id` VARCHAR(60) NOT NULL,
    `enrolled_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
-- Tabla de progreso
CREATE TABLE `progress` (
    `progress_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `course_id` VARCHAR(60) NOT NULL,
    `lesson_id` INT DEFAULT NULL,
    `completed_at` DATETIME DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
-- Relaciones (Constraints)
-- ------------------------------------------------------------------

-- Relación entre usuarios y roles
ALTER TABLE `users`
ADD CONSTRAINT `fk_user_role`
FOREIGN KEY (`role_id`)
REFERENCES `roles` (`role_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre cursos y usuarios
ALTER TABLE `courses`
ADD CONSTRAINT `fk_course_user`
FOREIGN KEY (`user_id`)
REFERENCES `users` (`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre lecciones y cursos
ALTER TABLE `lessons`
ADD CONSTRAINT `fk_lesson_course`
FOREIGN KEY (`course_id`)
REFERENCES `courses` (`course_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre certificados y usuarios
ALTER TABLE `certificates`
ADD CONSTRAINT `fk_certificate_user`
FOREIGN KEY (`user_id`)
REFERENCES `users` (`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre certificados y cursos
ALTER TABLE `certificates`
ADD CONSTRAINT `fk_certificate_course`
FOREIGN KEY (`course_id`)
REFERENCES `courses` (`course_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre evaluaciones y cursos
ALTER TABLE `assessments`
ADD CONSTRAINT `fk_assessment_course`
FOREIGN KEY (`course_id`)
REFERENCES `courses` (`course_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre inscripciones y usuarios
ALTER TABLE `enrollments`
ADD CONSTRAINT `fk_enrollment_user`
FOREIGN KEY (`user_id`)
REFERENCES `users` (`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre inscripciones y cursos
ALTER TABLE `enrollments`
ADD CONSTRAINT `fk_enrollment_course`
FOREIGN KEY (`course_id`)
REFERENCES `courses` (`course_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre progreso y usuarios
ALTER TABLE `progress`
ADD CONSTRAINT `fk_progress_user`
FOREIGN KEY (`user_id`)
REFERENCES `users` (`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre progreso y cursos
ALTER TABLE `progress`
ADD CONSTRAINT `fk_progress_course`
FOREIGN KEY (`course_id`)
REFERENCES `courses` (`course_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Relación entre progreso y lecciones
ALTER TABLE `progress`
ADD CONSTRAINT `fk_progress_lesson`
FOREIGN KEY (`lesson_id`)
REFERENCES `lessons` (`lesson_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

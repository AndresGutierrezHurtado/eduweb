DROP DATABASE IF EXISTS `eduweb`;
CREATE DATABASE `eduweb`;
USE `eduweb`;

-- ------------------------------------------------------------------
--
-- Tabla de Detalles de recuperacion de cuentas
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
--
-- Tabla de bloques de cursos
CREATE TABLE `blocks` (
    `block_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `block_order` INT NOT NULL,
    `course_id` VARCHAR(60) NOT NULL,
    `block_info` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------
--
-- Relaciones
ALTER TABLE `users` 
ADD CONSTRAINT `fk_user_role` 
FOREIGN KEY (`role_id`)
REFERENCES `roles` (`role_id`) 
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `courses` 
ADD CONSTRAINT `fk_course_user` 
FOREIGN KEY (`user_id`)
REFERENCES `users` (`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `blocks` 
ADD CONSTRAINT `fk_block_course`
FOREIGN KEY (`course_id`)
REFERENCES `courses` (`course_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

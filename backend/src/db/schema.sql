-- Database Schema for Bank Indonesia Malang Learning Center
CREATE DATABASE IF NOT EXISTS `bi_learning_center` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bi_learning_center`;

-- Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `nim` VARCHAR(50) DEFAULT NULL,
  `university` VARCHAR(255) DEFAULT NULL,
  `faculty` VARCHAR(255) DEFAULT NULL,
  `major` VARCHAR(255) DEFAULT NULL,
  `semester` VARCHAR(20) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Program Magang Malabar Table
CREATE TABLE IF NOT EXISTS `malabar_programs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `requirements` TEXT DEFAULT NULL,
  `registration_start` DATE DEFAULT NULL,
  `registration_end` DATE DEFAULT NULL,
  `internship_start` DATE DEFAULT NULL,
  `internship_end` DATE DEFAULT NULL,
  `quota` INT DEFAULT 14,
  `status` ENUM('active', 'inactive', 'draft') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Internship Applications Table
CREATE TABLE IF NOT EXISTS `internship_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `registration_code` VARCHAR(50) NOT NULL UNIQUE,
  `program_type` ENUM('regular', 'malabar') NOT NULL,
  `division` ENUM('uikspur', 'uippur', 'umi', 'humas', 'fppu', 'fdsek', 'malabar') DEFAULT NULL,
  `status` ENUM('waiting', 'review', 'accepted', 'rejected') NOT NULL DEFAULT 'waiting',
  `recommendation_number` VARCHAR(100) DEFAULT NULL,
  `start_date` DATE DEFAULT NULL,
  `end_date` DATE DEFAULT NULL,
  `period` VARCHAR(100) DEFAULT NULL,
  `skills` TEXT DEFAULT NULL,
  `tools` TEXT DEFAULT NULL,
  `documents` TEXT DEFAULT NULL,
  `admin_notes` TEXT DEFAULT NULL,
  `registered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_internship_applications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

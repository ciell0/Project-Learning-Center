# Project Learning Center 🏦

This Learning Center Platform is an integrated web platform designed to centralize and digitize services at **PT. ABC**, including Library, Internship, Scholarship, and Reading Corner.

## 📌 Overview

Previously, services and administrative processes were handled through separate and partially manual workflows, making information and service management less centralized.

This project aims to provide a **single digital platform** that improves accessibility for users while making administrative processes more organized and efficient.

## ✨ Features

* 📚 Library service
* 🎓 Internship registration and management
* 👥 Scholarship information and services
* 🏛️ Reading Corner information
* 🔐 User authentication and authorization
* 📄 Document upload and management
* 📋 Application tracking
* 📧 Email notifications
* 🖥️ Administrative dashboard
* 👤 User and profile management

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* CSS

### Backend

* Node.js
* Express.js
* REST API

### Database

* MySQL

### Authentication

* JWT (JSON Web Token)

### Development Tools

* Git
* GitHub
* VS Code
* Postman

## 🏗️ System Architecture

```text
                  ┌──────────────────────┐
                  │      React.js        │
                  │   User Interface     │
                  └──────────┬───────────┘
                             │
                         REST API
                             │
                  ┌──────────▼───────────┐
                  │    Node.js +         │
                  │    Express.js        │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │        MySQL         │
                  │       Database       │
                  └──────────────────────┘
```

## 🎯 Project Objectives

* Centralize multiple Bank Indonesia Malang services into one platform.
* Digitize previously manual administrative processes.
* Improve accessibility and user experience.
* Streamline internship registration and application management.
* Provide administrators with a centralized dashboard for managing services and users.

## 🚀 Getting Started

### Frontend

```bash
git clone https://github.com/ciell0/Project-Learning-Center.git
cd Project-Learning-Center/frontend-user
npm install
npm run dev
```

For the admin application:

```bash
cd frontend-admin
npm install
npm run dev
```

### Backend

Backend development is planned using Node.js and Express.js with MySQL as the primary database.

## 📂 Project Structure

```text
Project-Learning-Center/
├── frontend-user/
│   └── User-facing application
├── frontend-admin/
│   └── Admin dashboard
├── backend/
│   └── Node.js + Express.js API
└── README.md
```

## 🔮 Future Development

* Complete backend REST API integration.
* Implement JWT-based authentication and role-based authorization.
* Connect frontend applications with MySQL.
* Implement document management and file storage.
* Add email notification services.
* Expand administrative dashboard and reporting features.

## 👩‍💻 Author

**Ciello Belleza Zukhrufi Susilantoro**

Bachelor of Information Technology
Brawijaya University

# 💰 Where Did My Money Go?

**Where Did My Money Go?** is a full-stack personal finance tracker designed to help users record, categorize, and understand their spending.

This project was created primarily as a **learning project to understand how real-world applications are built from the ground up**. Rather than focusing only on the final product, the project focuses on learning the development process — from planning and database design to building REST APIs, connecting a backend to a database, testing endpoints, using Git, and eventually building a frontend.

The project is being developed in multiple versions, with each version introducing new concepts and functionality.

---

## 🎯 Project Goal

The main goal of this project is to gain practical experience building a complete application.

Throughout the development process, I am learning how to:

* Design and structure an application
* Design and work with relational databases
* Build REST APIs using Flask
* Connect Python applications to MySQL
* Create and test API endpoints
* Organize a backend using a modular structure
* Use Git and GitHub for version control
* Work with tools such as Postman
* Build a frontend that communicates with a backend
* Gradually introduce more advanced application features

The goal is not simply to make the application work, but to understand **why each part of the application is needed and how the different components work together**.

---

## 📌 Current Version

### Version 1 — Backend

The current version focuses on building the application's backend.

At this stage, the application provides a Flask REST API that communicates with a MySQL database and allows transactions to be stored and retrieved.

The frontend will be introduced in **Version 2**.

---

## ✨ Features

### Currently Implemented

* Add expense transactions
* Retrieve stored transactions
* Store transaction data in MySQL
* Categorize transactions
* Relational database structure
* Flask REST API
* Modular backend structure
* Postman API testing
* Git & GitHub version control

### Planned Features

* Update transactions
* Delete transactions
* Spending statistics
* Monthly spending analytics
* Budget tracking
* React frontend
* Interactive dashboard
* User authentication
* User accounts

---

## 🛠️ Tech Stack

| Technology          | Purpose                             |
| ------------------- | ----------------------------------- |
| **Python**          | Backend programming language        |
| **Flask**           | REST API framework                  |
| **MySQL**           | Relational database                 |
| **MySQL Connector** | Python-to-MySQL database connection |
| **Postman**         | API development and testing         |
| **Git**             | Version control                     |
| **GitHub**          | Repository and project management   |
| **React**           | Planned frontend framework          |

---

## 🏗️ Project Structure

```text
where-did-my-money-go/
│
├── backend/
│   ├── routes/
│   │   └── transactions.py
│   ├── app.py
│   ├── config.py
│   └── database.py
│
├── postman/
│
├── requirements.txt
├── .gitignore
└── README.md
```

### Backend

The `backend` directory contains the server-side application.

* **`app.py`** — Main Flask application and API configuration
* **`config.py`** — Database configuration and application settings
* **`database.py`** — Handles the connection to MySQL
* **`transactions.py`** — Handles transaction-related API endpoints

### Postman

The `postman` directory contains resources used to test the REST API endpoints.

---

## 🗄️ Database Design

The application currently uses three relational tables:

### Relationships

```text
User
  │
  │ 1
  │
  │
  │ Many
  ▼
Transaction
  ▲
  │ Many
  │
  │ 1
  │
Category
```

* One **User** can have many transactions.
* One **Category** can be associated with many transactions.
* Each **Transaction** belongs to one user and one category.

---

## 🧪 API Testing

The API is tested using **Postman**.

Postman is being used to learn how to:

* Send HTTP requests
* Test GET and POST endpoints
* Send JSON request bodies
* Inspect API responses
* Identify and troubleshoot backend errors
* Verify that data is correctly stored in MySQL

This allows the backend to be tested independently before the frontend is developed.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/where-did-my-money-go.git
```

### 2. Navigate into the Project

```bash
cd where-did-my-money-go
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

On Windows:

```bash
venv\Scripts\activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Configure MySQL

Create the required MySQL database and tables.

Update the database credentials in:

```text
backend/config.py
```

Make sure your MySQL server is running before starting the Flask application.

### 7. Start the Flask Server

Navigate into the backend directory:

```bash
cd backend
```

Then run:

```bash
python app.py
```

The API will run locally at:

```text
http://127.0.0.1:5000
```

---

## 📈 Development Progress

### Version 1 — Backend

* [ ] Project planning
* [ ] Application structure
* [ ] Database design
* [ ] MySQL database setup
* [ ] Flask application setup
* [ ] MySQL integration
* [ ] GET transactions endpoint
* [ ] POST transactions endpoint
* [ ] Postman testing
* [ ] UPDATE transactions endpoint
* [ ] DELETE transactions endpoint
* [ ] Statistics API

### Version 2 — Frontend & Application Features

* [ ] React frontend
* [ ] Dashboard
* [ ] Transaction management interface
* [ ] Spending charts
* [ ] Monthly spending analytics
* [ ] Budget tracking
* [ ] User authentication
* [ ] User accounts

---

## 🗺️ Roadmap

### Version 1 — Backend Foundation

Build the core backend of the application.

**Focus:**

* Python
* Flask
* REST APIs
* MySQL
* Database relationships
* API testing
* Git & GitHub

---

### Version 2 — Frontend

Connect the backend to a user interface using React.

**Planned features:**

* Dashboard
* Transaction forms
* Transaction history
* Spending categories
* Charts and visualizations
* Monthly spending overview

---

### Future Development

As the project progresses, additional features may be introduced, including:

* Authentication
* Multiple user accounts
* Personal budgets
* Financial summaries
* Advanced spending analytics
* Improved validation and error handling
* Deployment

The roadmap may change as new concepts are learned and new ideas are introduced during development.

---

## 📚 What I'm Learning

This project is being developed as a practical way to learn software development by building something from scratch.

Some of the key concepts being explored include:

* Backend development
* REST API design
* CRUD operations
* Relational database design
* SQL
* Database relationships
* Python application structure
* Flask
* HTTP requests and responses
* API testing
* Git workflows
* Full-stack application architecture

The project will continue to evolve as new concepts are learned.

---

## 👨‍💻 Author

**Rhema Miller**

Computer Systems Engineering Student
Aspiring Full-Stack Developer

---

## ⭐ Project

This project is continuously being developed as part of my journey toward becoming a better software developer.

If you find the project interesting, feel free to ⭐ the repository on GitHub.

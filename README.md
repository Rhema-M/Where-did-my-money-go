# Where Did My Money Go?

Where Did My Money Go? is a full-stack personal finance tracker built with **Flask, MySQL, HTML, CSS, and JavaScript**.

This project was created as a practical way to learn how real-world applications are designed, built, tested, and maintained. Every feature is developed from scratch—from database design and REST APIs to frontend integration, authentication, analytics, and version control with Git.

The goal is not simply to build a budgeting application, but to understand how each component of a full-stack system works together.

---

## Project Goal

The purpose of this project is to gain hands-on experience building a complete web application using modern development practices.

Throughout the project, I am learning how to:

* Design relational databases
* Build REST APIs with Flask
* Connect Python applications to MySQL
* Implement full CRUD functionality
* Create secure authentication using JWT
* Build a responsive frontend with HTML, CSS, and JavaScript
* Display financial analytics using charts and summaries
* Test APIs with Postman
* Use Git and GitHub for version control

The emphasis is on understanding the architecture and development process rather than only producing the final product.

---

## Current Version

### Version 2 — Full-Stack Application

The project now includes both a functional backend and a connected frontend.

Users can authenticate, manage transactions, and view spending analytics through a responsive dashboard that communicates with a Flask REST API.

---

## Features

### Authentication

* User registration
* User login
* JWT authentication
* Protected API routes

### Transaction Management

* Create income and expense transactions
* Edit existing transactions
* Delete transactions
* View complete transaction history
* Categorize transactions
* Add optional notes
* Select transaction dates

### Dashboard & Analytics

* Current balance
* Total income
* Total expenses
* Spending by category
* Daily spending trend
* Dynamic analytics cards

### User Experience

* Responsive interface
* Custom delete confirmation modal
* Dynamic category loading
* Client-side form validation
* Backend error handling

---

## Tech Stack

| Technology       | Purpose                       |
| ---------------- | ----------------------------- |
| Python           | Backend programming language  |
| Flask            | REST API framework            |
| MySQL            | Relational database           |
| MySQL Connector  | Database connectivity         |
| HTML5            | Frontend structure            |
| CSS3             | Styling and responsive design |
| JavaScript (ES6) | Frontend functionality        |
| JWT              | User authentication           |
| Postman          | API testing                   |
| Git              | Version control               |
| GitHub           | Repository hosting            |

---

## Project Structure

```text
where-did-my-money-go/
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── transactions.py
│   │   └── analytics.py
│   │
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── postman/
├── .gitignore
└── README.md
```

### Backend

The backend is responsible for authentication, database communication, business logic, and analytics.

* **app.py** — Flask application entry point
* **config.py** — Configuration and environment settings
* **database.py** — MySQL connection management
* **auth.py** — User registration and login
* **transactions.py** — Transaction CRUD endpoints
* **analytics.py** — Financial analytics endpoints

### Frontend

The frontend communicates directly with the REST API using the Fetch API.

* **index.html** — Dashboard layout
* **style.css** — Responsive styling
* **app.js** — API communication and UI logic

---

## Database Design

The application uses a relational database with three primary tables.

```text
Users
  │
  │ 1
  ▼
Transactions
  ▲
  │
  │ Many
  │
Categories
```

### Relationships

* One user can have many transactions.
* One category can contain many transactions.
* Every transaction belongs to one user and one category.

This structure supports secure multi-user financial tracking.

---

## REST API

### Authentication

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Create a new user   |
| POST   | `/login`    | Authenticate a user |

### Transactions

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| GET    | `/transactions`      | Retrieve all transactions |
| POST   | `/transactions`      | Create a transaction      |
| PUT    | `/transactions/<id>` | Update a transaction      |
| DELETE | `/transactions/<id>` | Delete a transaction      |

### Analytics

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| GET    | `/analytics/summary`    | Balance, income, and expenses |
| GET    | `/analytics/categories` | Spending grouped by category  |
| GET    | `/analytics/trend`      | Daily spending totals         |

All transaction and analytics endpoints require a valid JWT access token.

---

## API Testing

The backend is tested using Postman before frontend integration.

Testing includes:

* User registration and login
* JWT authentication
* Protected routes
* CRUD operations
* Analytics endpoints
* Request validation
* Error handling

This ensures the backend functions correctly as an independent service.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/where-did-my-money-go.git
cd where-did-my-money-go
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the environment

**Windows**

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 5. Configure MySQL

Create the required MySQL database and update your database credentials in:

```text
backend/config.py
```

Ensure your MySQL server is running before starting the application.

### 6. Start the Flask server

```bash
cd backend
python app.py
```

The API runs locally at:

```text
http://127.0.0.1:5000
```

### 7. Launch the frontend

Open `frontend/index.html` in your browser while the Flask server is running.

---

## Development Progress

### Backend

* [x] Project planning
* [x] Database design
* [x] MySQL integration
* [x] Flask application setup
* [x] JWT authentication
* [x] User registration and login
* [x] Create transactions
* [x] Retrieve transactions
* [x] Update transactions
* [x] Delete transactions
* [x] Analytics endpoints
* [x] Input validation
* [x] Error handling

### Frontend

* [x] Responsive dashboard
* [x] Balance summary cards
* [x] Add transaction form
* [x] Transaction history table
* [x] Edit transactions
* [x] Delete confirmation modal
* [x] Dynamic category loading
* [x] Analytics integration
* [x] Transaction filtering

---

## Roadmap

### Completed

* Full CRUD transaction management
* User authentication
* Financial dashboard
* Spending analytics
* Responsive frontend
* REST API integration

### Planned

* Budget tracking
* Savings goals
* Recurring transactions
* Advanced search and filters
* CSV/PDF export
* Dark mode
* Cloud deployment

---

## What I'm Learning

This project serves as my practical introduction to full-stack software development.

Topics explored include:

* REST API architecture
* CRUD operations
* JWT authentication
* Relational database design
* SQL and foreign keys
* Flask Blueprints
* Frontend API integration
* Asynchronous JavaScript
* Git and GitHub workflows
* Debugging with Postman

Each feature is implemented incrementally to mirror a real software development process.

---

## Author

**Rhema Miller**

Computer Systems Engineering Student

Aspiring Full-Stack Developer

---

## Project Status

This project is actively being developed and will continue to expand as I learn new technologies and software engineering concepts. It forms part of my personal development portfolio and demonstrates my progression toward becoming a full-stack developer.


# 💰 Where Did My Money Go?

A full-stack personal finance tracker built with **Flask** and **MySQL** that helps users record expenses, categorize spending, and understand where their money goes.

This project is part of my software engineering portfolio and is being developed using real-world backend practices including REST APIs, database design, version control, and Postman testing.

---

## Preview

> Frontend coming in Version 2.

Current version focuses on building a production-style backend API.

---

## Features

- Add new expense transactions
- Store transactions in a MySQL database
- Categorize spending (Food, Transport, Savings, etc.)
- REST API built with Flask
- Postman collection for endpoint testing
- Modular project structure

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Python | Backend language |
| Flask | REST API framework |
| MySQL | Database |
| MySQL Connector | Database connection |
| Postman | API testing |
| Git & GitHub | Version control |

---

## Project Structure

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
├── requirements.txt
├── .gitignore
└── README.md

---

## Database

The project uses three relational tables:

### User
- id
- name
- email

### Category
- id
- name

### Transaction
- id
- user_id
- category_id
- amount
- description
- transaction_date
- created_at

Relationships:

- One User → Many Transactions
- One Category → Many Transactions

---

## API Endpoints

### Get all transactions

GET /transactions

Returns every stored transaction.

### Create a transaction

POST /transactions

Example JSON:

{
  "user_id": 1,
  "category_id": 2,
  "amount": 150.00,
  "description": "Groceries",
  "transaction_date": "2026-08-31"
}

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/where-did-my-money-go.git

### 2. Navigate into the project

cd where-did-my-money-go

### 3. Create a virtual environment

python -m venv venv

### 4. Activate it

Windows:

venv\Scripts\activate

### 5. Install dependencies

pip install -r requirements.txt

### 6. Configure MySQL

Create a MySQL database and update your database credentials inside `config.py`.

### 7. Run the server

cd backend

python app.py

The API will start on:

http://127.0.0.1:5000

---

## Current Progress

- [x] Project planning
- [x] Database design
- [x] Flask project structure
- [x] MySQL integration
- [x] GET endpoint
- [x] POST endpoint
- [x] Postman testing
- [ ] UPDATE endpoint
- [ ] DELETE endpoint
- [ ] Statistics API
- [ ] React frontend
- [ ] User authentication

---

## Version Roadmap

### Version 1 (Current)
Backend REST API with MySQL and transaction management.

### Version 2
- React frontend
- Dashboard with charts
- Monthly spending analytics
- Budget tracking
- Authentication & user accounts

---

## Author

**Rhema Miller**

Computer Systems Engineering Student | Aspiring Full-Stack Developer

If you enjoyed this project, consider giving it a ⭐ on GitHub.
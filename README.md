# Where Did My Money Go?

**Where Did My Money Go?** is a full-stack personal finance tracker built with **Python, Flask, MySQL, HTML, CSS, and JavaScript**.

This project was created as a practical learning project to understand how real-world applications are planned, developed, tested, and maintained. The application has been built incrementally, starting with database design and REST API development before progressing to authentication, frontend integration, analytics, user experience, and version control with Git and GitHub.

The main goal is not simply to build a finance tracker, but to understand how the different components of a full-stack application work together.

---

## Project Goal

The purpose of this project is to gain hands-on experience building and maintaining a complete web application.

Throughout the project, I am learning how to:

* Design relational databases
* Build REST APIs with Flask
* Connect Python applications to MySQL
* Implement CRUD functionality
* Implement JWT-based authentication
* Protect user-specific data
* Build a responsive frontend with HTML, CSS, and JavaScript
* Integrate a frontend with a REST API
* Build dynamic dashboards and analytics
* Handle loading, error, and empty states
* Test APIs with Postman
* Use Git and GitHub for version control
* Structure a project into maintainable frontend and backend modules

The emphasis is on understanding the development process rather than only producing the final application.

---

## Current Version

### Version 2 — Full-Stack Application

The project currently consists of a Flask backend, MySQL database, and connected frontend.

Users can register and log in, manage their financial transactions, filter their transaction history, and view financial information through a responsive dashboard.

The application uses JWT authentication to protect user data and ensure that users can only access their own transactions.

---

## Features

### Authentication

* User registration
* User login
* Password hashing
* JWT authentication
* Protected API routes
* Session management
* Logout functionality
* Automatic handling of expired sessions

### Transaction Management

* Create income and expense transactions
* Edit existing transactions
* Delete transactions
* View transaction history
* Categorize transactions
* Add optional notes
* Select transaction dates
* Input validation
* User-specific transaction access

### Transaction Filtering

* Search transactions by title
* Filter by transaction type
* Filter by category
* Clear filters
* Dynamic transaction count based on filtered results

### Dashboard & Analytics

* Current balance
* Total income
* Total expenses
* Transaction count
* Spending by category
* Daily spending trend
* Dynamic summary calculations
* Analytics that update according to the active filters
* Positive, negative, and neutral balance states

### User Experience

* Responsive dashboard
* Loading states
* Empty states
* Error states
* Success and error notifications
* Custom delete confirmation modal
* Edit and cancel-edit functionality
* Form validation
* Income and expense visual distinction
* Responsive layout for different screen sizes

---

## Tech Stack

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| Python             | Backend programming language  |
| Flask              | REST API framework            |
| MySQL              | Relational database           |
| mysql.connector    | MySQL database connectivity   |
| HTML5              | Frontend structure            |
| CSS3               | Styling and responsive design |
| JavaScript (ES6)   | Frontend functionality        |
| Flask-JWT-Extended | JWT authentication            |
| Werkzeug           | Password hashing              |
| Postman            | API testing                   |
| Git                | Version control               |
| GitHub             | Repository hosting            |

---

## Project Structure

```text
Where did my money go/
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── transactions.py
│   │   └── analytics.py
│   │
│   ├── app.py
│   └── database.py
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── app.js
│       ├── auth.js
│       ├── login.js
│       ├── analytics.js
│       ├── transactions.js
│       ├── filters.js
│       ├── modal.js
│       └── notifications.js
│
├── .gitignore
└── README.md
```

### Backend

The backend is responsible for authentication, database communication, transaction management, and analytics.

* **app.py** — Flask application entry point, JWT configuration, CORS, and blueprint registration
* **database.py** — MySQL connection management
* **auth.py** — User registration and login
* **transactions.py** — Transaction CRUD endpoints
* **analytics.py** — Financial analytics endpoints

### Frontend

The frontend communicates with the Flask REST API using JavaScript's Fetch API.

* **index.html** — Login page
* **dashboard.html** — Main application dashboard
* **style.css** — Dashboard styling and responsive design
* **app.js** — Application initialization and event listeners
* **auth.js** — Authentication, session handling, and logout
* **login.js** — Login functionality
* **transactions.js** — Transaction loading, creation, editing, deletion, and display
* **filters.js** — Transaction search and filtering
* **analytics.js** — Dashboard calculations and financial analytics
* **modal.js** — Delete confirmation modal
* **notifications.js** — Frontend notification system

---

## Database Design

The application uses a relational MySQL database called `track_money`.

The database contains three primary tables:

```text
user
 │
 │ 1
 ▼
transaction
 ▲
 │ Many
 │
category
```

### Tables

**user**

Stores registered application users.

**category**

Stores transaction categories.

**transaction**

Stores income and expense transactions and connects them to users and categories.

### Relationships

* One user can have many transactions.
* One category can contain many transactions.
* Every transaction belongs to one user.
* Every transaction belongs to one category.

JWT authentication is used to identify the logged-in user, while database queries restrict transaction access to that user.

---

## REST API

### Authentication

| Method | Endpoint         | Description                           |
| ------ | ---------------- | ------------------------------------- |
| POST   | `/auth/register` | Register a new user                   |
| POST   | `/auth/login`    | Authenticate a user and receive a JWT |

### Transactions

| Method | Endpoint             | Description                                    |
| ------ | -------------------- | ---------------------------------------------- |
| GET    | `/transactions`      | Retrieve the authenticated user's transactions |
| GET    | `/transactions/<id>` | Retrieve a specific transaction                |
| POST   | `/transactions`      | Create a transaction                           |
| PUT    | `/transactions/<id>` | Update a transaction                           |
| DELETE | `/transactions/<id>` | Delete a transaction                           |

### Analytics

| Method | Endpoint                | Description                           |
| ------ | ----------------------- | ------------------------------------- |
| GET    | `/analytics/summary`    | Retrieve financial summary data       |
| GET    | `/analytics/categories` | Retrieve spending grouped by category |
| GET    | `/analytics/trend`      | Retrieve daily spending totals        |

Transaction and analytics endpoints require a valid JWT access token.

---

## API Testing

The backend was tested independently using Postman before and during frontend integration.

Testing includes:

* User registration
* User login
* JWT authentication
* Protected routes
* Missing authentication tokens
* Transaction CRUD operations
* User transaction isolation
* Analytics endpoints
* Input validation
* Error handling
* Expired authentication tokens

Testing the backend independently helped verify that the API worked correctly before relying on the frontend.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rhema-M/Where-did-my-money-go.git
cd Where-did-my-money-go
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the environment

**Windows Command Prompt / PowerShell**

```bash
venv\Scripts\activate
```

If using Git Bash:

```bash
source venv/Scripts/activate
```

### 4. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 5. Configure MySQL

Create the required MySQL database and tables.

The application currently uses the database:

```text
track_money
```

Make sure your MySQL server is running and that the database connection settings in the backend are configured correctly.

### 6. Start the Flask server

```bash
cd backend
python app.py
```

The Flask API runs locally at:

```text
http://127.0.0.1:5000
```

### 7. Launch the frontend

Open:

```text
frontend/index.html
```

in a browser while the Flask server is running.

---

## Development Progress

### Backend

* [x] Project planning
* [x] Database design
* [x] MySQL integration
* [x] Flask application setup
* [x] Flask Blueprints
* [x] JWT authentication
* [x] Password hashing
* [x] User registration and login
* [x] Protected routes
* [x] User-specific transaction access
* [x] Create transactions
* [x] Retrieve transactions
* [x] Retrieve individual transactions
* [x] Update transactions
* [x] Delete transactions
* [x] Analytics endpoints
* [x] Input validation
* [x] Error handling
* [x] API testing with Postman

### Frontend

* [x] Login page
* [x] JWT session handling
* [x] Dashboard
* [x] Responsive layout
* [x] Balance summary cards
* [x] Add transaction form
* [x] Transaction history table
* [x] Edit transactions
* [x] Delete confirmation modal
* [x] Transaction search
* [x] Transaction filtering
* [x] Dynamic category loading
* [x] Financial analytics
* [x] Loading states
* [x] Empty states
* [x] Error states
* [x] Notification system
* [x] Session expiration handling
* [x] Live dashboard calculations
* [x] Filter-dependent analytics
* [x] Frontend JavaScript modularization

---

## Development Roadmap

### Completed

* Full CRUD transaction management
* User authentication
* JWT-protected API
* User-specific data access
* Financial dashboard
* Transaction filtering
* Spending analytics
* Responsive frontend
* REST API integration
* Frontend error and loading handling
* Frontend modularization
* Git and GitHub development workflow

### Remaining

* Security and production configuration review
* Final application testing
* Deployment preparation
* Cloud deployment
* Final documentation and screenshots
* Portfolio presentation and polish

### Future Features

After the first published version, the application may be expanded with features such as:

* Budget tracking
* Savings goals
* Recurring transactions
* Advanced financial analytics
* CSV/PDF export
* Additional dashboard visualizations
* Password reset
* User settings
* Additional account features

---

## What I'm Learning

This project serves as my practical introduction to full-stack software development.

The project has allowed me to work with:

* REST API architecture
* CRUD operations
* JWT authentication
* Password hashing
* Relational database design
* SQL and foreign keys
* Flask Blueprints
* API authentication and authorization
* Frontend API integration
* Asynchronous JavaScript
* Client-side filtering
* Dynamic dashboard calculations
* Error and loading-state handling
* Git and GitHub workflows
* API testing with Postman
* Debugging and incremental development
* Frontend code organization

Each feature has been implemented incrementally so that I can understand not only how to build the feature, but also how it fits into the larger application architecture.

---

## Author

**Rhema Miller**

Computer Systems Engineering Student

Aspiring Full-Stack Developer

---

## Project Status

The application is currently in the final development stage before its first public deployment.

The core backend, database, authentication system, transaction management, frontend dashboard, filtering, and analytics functionality have been implemented.

The remaining work focuses on security hardening, final testing, deployment, documentation, and portfolio preparation.

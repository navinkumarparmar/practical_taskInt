# Practical Task

A backend application for user registration, email verification, and admin login, built using Node.js, MySQL, and Nodemailer.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

List any software or tools needed to run the project:

- **Node.js** (v12 or higher)
- **MySQL** (v5.7 or higher)
- **Any other dependencies** (e.g., Nodemailer, bcrypt, JWT)

### Installing

1. Clone the repository:
   ```bash
   git clone https://github.com/navinkumarparmar/practical_task.git

2. Navigate to the project directory:
 cd practical_task

3. Install the required dependencies:
npm install

4. Set up the .env file with the required environment variables:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=""
DB_NAME=practical_task
email=your-""
password=your-""

5. Run the project:

npm start

API Endpoints
User Endpoints
POST /user/createCustomer
. Registers a new customer.
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
Response:
Success: 201 Created
Failure: 400 Bad Request (if email already exists)


POST /user/registerAdmin
. Registers a new admin.

Request Body:
json
Copy code
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@example.com",
  "password": "adminpassword"
}
Response:
Success: 201 Created
Failure: 400 Bad Request (if email already exists)



Authentication Endpoints
POST /auth/adminLogin
. Admin login with email and password.
Request Body:
json
Copy code
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
Response:
Success: 200 OK with JWT token
Failure: 400 Bad Request (Invalid email/password)



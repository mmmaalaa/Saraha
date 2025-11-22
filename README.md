# Saraha - Anonymous Messaging Platform

A Node.js-based anonymous messaging platform inspired by Saraha, allowing users to send and receive anonymous messages securely. Built with Express.js and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Security Features](#security-features)

## ✨ Features

- **User Authentication**

  - User registration with email verification
  - Secure login with JWT tokens
  - Email activation system
  - Resend activation email with rate limiting
  - Cookie-based authentication

- **Messaging System**

  - Send anonymous messages to registered users
  - View received messages
  - Retrieve individual messages
  - Message validation (5-500 characters)

- **Security**
  - Password hashing with bcrypt
  - JWT token-based authentication
  - Rate limiting on sensitive endpoints
  - Input validation using Joi
  - Secure cookie handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Joi
- **Email Service**: Nodemailer
- **Security**: express-rate-limit, cookie-parser

## 📁 Project Structure

```
Saraha/
├── src/
│   ├── DB/
│   │   ├── connection.js          # Database connection setup
│   │   └── models/
│   │       ├── user.model.js      # User schema and model
│   │       └── message.model.js   # Message schema and model
│   ├── middleware/
│   │   ├── asyncHandler.js        # Async error handler wrapper
│   │   ├── auth.js                # Authentication middleware
│   │   ├── rateLimiter.js         # Rate limiting configuration
│   │   └── validation.js          # Request validation middleware
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js # Auth routes
│   │   │   ├── auth.services.js   # Auth business logic
│   │   │   └── auth.validation.js # Auth input validation schemas
│   │   ├── user/
│   │   │   ├── user.controller.js # User routes
│   │   │   ├── user.services.js   # User business logic
│   │   │   └── user.validation.js # User input validation schemas
│   │   └── messages/
│   │       ├── message.controller.js   # Message routes
│   │       ├── message.services.js     # Message business logic
│   │       └── message.validation.js   # Message validation schemas
│   ├── utils/
│   │   ├── appError.js            # Custom error class
│   │   ├── emailEvent.js          # Email event handlers
│   │   ├── hashing.js             # Password hashing utilities
│   │   ├── sendEmail.js           # Email sending service
│   │   ├── sendEmailTemplate.js   # Email templates
│   │   ├── setAuthCookie.js       # Cookie management
│   │   └── tokens.js              # JWT token utilities
│   └── app.controller.js          # Application bootstrap
├── index.js                       # Application entry point
├── package.json
└── .env                          # Environment variables
```

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Saraha
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   MONGO_URI=your_mongodb_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret_key

   # Email Service
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password

   # Application
   PORT=3000
   BASE_URL=http://localhost:3000
   ```

4. **Run the application**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

## 🔐 Environment Variables

| Variable     | Description                | Example                            |
| ------------ | -------------------------- | ---------------------------------- |
| `MONGO_URI`  | MongoDB connection string  | `mongodb://localhost:27017/saraha` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-here`             |
| `EMAIL_HOST` | SMTP server host           | `smtp.gmail.com`                   |
| `EMAIL_PORT` | SMTP server port           | `587`                              |
| `EMAIL_USER` | Email account username     | `your-email@gmail.com`             |
| `EMAIL_PASS` | Email account password     | `your-app-password`                |
| `PORT`       | Application port           | `3000`                             |
| `BASE_URL`   | Application base URL       | `http://localhost:3000`            |

## 📡 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint                  | Description                            | Authentication |
| ------ | ------------------------- | -------------------------------------- | -------------- |
| POST   | `/register`               | Register a new user                    | No             |
| POST   | `/login`                  | Login user                             | No             |
| GET    | `/activateAccount/:token` | Activate user account via email token  | No             |
| POST   | `/resendEmail`            | Resend activation email (rate limited) | No             |

### User Routes (`/api/v1/user`)

| Method | Endpoint   | Description         | Authentication |
| ------ | ---------- | ------------------- | -------------- |
| GET    | `/profile` | Get user profile    | Yes            |
| PUT    | `/profile` | Update user profile | Yes            |

### Message Routes (`/api/v1/message`)

| Method | Endpoint | Description                             | Authentication |
| ------ | -------- | --------------------------------------- | -------------- |
| POST   | `/`      | Create a new message                    | Yes            |
| GET    | `/`      | Get all messages for authenticated user | Yes            |
| GET    | `/:id`   | Get a specific message by ID            | Yes            |

## 💡 Usage

### Register a New User

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Login

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Send a Message

```bash
POST /api/v1/message
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "receiver": "user_id_here",
  "content": "This is an anonymous message!"
}
```

### Get Your Messages

```bash
GET /api/v1/message
Authorization: Bearer <your-jwt-token>
```

## 🔒 Security Features

- **Password Security**: Passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication system
- **Email Verification**: Users must verify their email before account activation
- **Rate Limiting**: Protection against brute force attacks on sensitive endpoints
- **Input Validation**: All inputs are validated using Joi schemas
- **Secure Cookies**: HTTP-only cookies for token storage
- **Error Handling**: Centralized error handling with custom error classes

## 📝 Data Models

### User Model

```javascript
{
  username: String (3-20 characters, required),
  email: String (unique, required, validated),
  password: String (min 6 characters, hashed, required),
  isActive: Boolean (default: false),
  pendingEmail: String,
  emailToken: String,
  pendingEmailExpires: Date,
  timestamps: true
}
```

### Message Model

```javascript
{
  sender: ObjectId (ref: User, required),
  receiver: ObjectId (ref: User, required),
  content: String (5-500 characters, required),
  timestamps: true
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

Your Name

---

**Note**: This is a backend API. You'll need to build a frontend application to interact with these endpoints or use tools like Postman or cURL for testing.

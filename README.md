📬 Notification Service

This is a backend service built with Node.js and Express that enables sending and retrieving user notifications through Email, SMS, and In-App channels. It also utilizes a queue-based system for processing messages asynchronously.

🚀 Features

Send notifications to users via:

Email

SMS

In-App

Queue-based processing (e.g., RabbitMQ)

Retry mechanism for failed notifications

RESTful API endpoints

📦 Tech Stack

Node.js

Express.js

MongoDB with Mongoose

RabbitMQ (or similar queue)

Nodemailer, Twilio, etc. (for actual email/SMS delivery)

In-App notification via simulated service

📚 API Endpoints

1. Send Notification

POST /notifications

Body:

{
  "userEmail": "user@example.com",
  "type": "email" | "sms" | "in-app",
  "message": "Your message content here"
}

2. Get User Notifications

GET /notifications/user/:id

Params:

id – User ID (_id from MongoDB)

🛠 Setup Instructions

Clone the repository

git clone https://github.com/your-username/notification-service.git
cd notification-service

Install dependencies

npm install

Configure environment variables
Create a .env file and include necessary values:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/notifications
RABBITMQ_URL=amqp://localhost

Start the server

node server.js

📂 Project Structure

.
├── app.js
├── server.js
├── routes/
│   └── notificationRoutes.js
├── controllers/
│   └── notificationController.js
├── services/
│   ├── queueService.js
│   ├── emailService.js
│   ├── smsService.js
│   └── inAppService.js
├── models/
│   ├── Notification.js
│   └── User.js

⚙️ Assumptions Made

User is uniquely identified by email.

Queue (RabbitMQ or similar) is pre-installed and running.

Notifications are marked as "sent" or "failed" based on service response.

Email, SMS, and In-App services are mocked/simulated in code for the purpose of this assignment.

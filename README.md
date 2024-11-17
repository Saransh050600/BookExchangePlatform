Book Exchange Platform
A web application for exchanging books among users, with a frontend in React and a backend in Node.js.


Prerequisites
Node.js: Download and install Node.js
MongoDB: Install MongoDB and set it up locally or have access to a remote MongoDB URI.
Git: Make sure Git is installed to clone the repository.


Installation
Clone the repository

git clone https://github.com/Saransh050600/BookExchangePlatform
cd book-exchange-platform


Install backend dependencies
cd backend
npm install


Install frontend dependencies
cd ../frontend
npm install


Environment Variables
Create a .env file in the backend directory and configure the following variables:

PORT=5000
MONGO_URI=<your_mongo_database_uri>
JWT_SECRET=<your_jwt_secret>
SMTP_HOST=smtp.gmail.com  
SMTP_PORT=587
SMTP_USER=<your_email@example.com>
SMTP_PASS=<your_email_password>
FRONTEND_URL=<your_frontend_url>

Running the Application
Run the backend

In the backend directory, start the server:
npm start or node app.js


Run the frontend
Open a new terminal, navigate to the frontend directory, and start the React application:

npm start or npm run dev

Access the application using the localhost url which comes after you run the frontend
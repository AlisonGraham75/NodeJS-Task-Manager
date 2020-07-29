# NodeJS-Task-Manager
A REST application which uses MongoDB database and Mongoose ODM. Express.js is used for web framework. 

# System Setup
-  Download and install NodeJS from Nodejs.org
-  Place JavaScript files into a project. I use Visual Studio Code, a free IDE. 
-  From the console, initialize the NPM package manager in your project. This will create a package.json file.
    - npm init
- Install required NPM packages by running the following commands from the console in your project.This will create a package-lock.json file.
  - npm install mongodb@3.5.9
  - npm install mongoose
  - npm install validator
  - npm install express
  - npm install bcryptjs
  - npm install jsonwebtoken
  - npm install multer
  - npm install sharp
  - npm install env-cmd --save-dev
- Download and Install MongoDB
- Download and install Robo 3T to to view MongoDB database
- Download and install Postman (getpostman.com) to test rest endpoints.
# Usage
- Start the database:
  -<path>/MongodDB/bin/mongod.exe --dbpath=<path>/MongoBD-data
- Start the app:
  - Test Mode: npm run dev
  - Prod mode: npm run start




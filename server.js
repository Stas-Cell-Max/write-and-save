
const express = require('express');    // Import the Express module for web server functionality
const fs = require('fs');              // File System (fs) module for file operations
const path = require('path');          // Import the Path module for handling and transforming file paths


const { v4: uuidv4 } = require('uuid'); // Import the uuid package to generate unique IDs.


const app = express();                 // Create an Express application instance
const PORT = process.env.PORT || 3000; //the port on which the server will listen.


app.use(express.json());               // Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.listen(PORT, () => {               // Start the server and have it listen on the specified PORT. 
  console.log(`Server is listening on port ${PORT}`);
});

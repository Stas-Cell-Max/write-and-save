// Express Server

const express = require('express');    // Import the Express module for web server functionality
const fs = require('fs');              // File System (fs) module for file operations
const path = require('path');          // Path module for handling and transforming file paths
const cors = require('cors');

const { v4: uuidv4 } = require('uuid'); // Import the uuid package to generate unique IDs.


const app = express();                 // Create an Express application instance
const PORT = process.env.PORT || 3000; //The port on which the server will listen.

app.use(cors());
app.use(express.json());               // Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.listen(PORT, () => {               // Start the server and have it listen on the specified PORT. 
  console.log(`Server is listening on port ${PORT}`);
});


//HTML Routes

app.get('/notes', (req, res) => {      // GET Route for note page
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
  
app.get('*', (req, res) => {         // GET Route for home page
    res.sendFile(path.join(__dirname, './public/index.html'));
});


//API Routes

const readFromFile = (filePath) => {  // Helper function to read and write to the db.json file
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  };
  
  const writeToFile = (filePath, content) => {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
  };
  
  app.get('/api/notes', (req, res) => { // GET Route for retrieving notes
    const notes = readFromFile('./db/db.json');
    res.json(notes);
  });
   
  app.post('/api/notes', (req, res) => { // POST Route for submitting notes
    const { title, text } = req.body;
    if (title && text) {
      const newNote = { title, text, id: uuidv4() };
  
      const notes = readFromFile('./db/db.json');
      notes.push(newNote);
      writeToFile('./db/db.json', notes);
  
      res.json(newNote);
    } else {
      res.status(400).json({ error: 'Please provide both a note title and text.' });
    }
  });
  
 
  app.delete('/api/notes/:id', (req, res) => {  // DELETE Route for a specific note
    const noteId = req.params.id;
    const notes = readFromFile('./db/db.json');
    const filteredNotes = notes.filter((note) => note.id !== noteId);
  
    writeToFile('./db/db.json', filteredNotes);
  
    res.json({ message: `Note with id ${noteId} has been deleted.` });
  });
  

const request = require('supertest');
const app = require('./path/to/your/server'); // Import your Express app

describe('GET /api/notes', () => {

  // Test for successful response
  it('responds with json containing a list of notes', async () => {
    const response = await request(app)
      .get('/api/notes')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array); // The response should be an array
  });

  // Test to check if the notes array contains note objects with expected properties
  it('each note should contain id, title and text', async () => {
    const response = await request(app).get('/api/notes');
    const notes = response.body;

    // Assuming each note should have an 'id', 'title', and 'text'
    notes.forEach(note => {
      expect(note).toHaveProperty('id');
      expect(note).toHaveProperty('title');
      expect(note).toHaveProperty('text');
    });
  });

  // Test to check if the notes array is not empty (assuming there should be pre-existing notes)
  it('should return a non-empty list of notes', async () => {
    const response = await request(app).get('/api/notes');

    expect(response.body.length).toBeGreaterThan(0); // Check if at least one note is returned
  });

  // Additional tests can be added here as needed
});

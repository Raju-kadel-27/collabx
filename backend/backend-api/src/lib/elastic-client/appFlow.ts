const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const client = new Client({ node: 'http://localhost:9200' });

app.use(bodyParser.json());

// Route for user registration
app.post('/register', async (req, res) => {
  try {
    const userData = req.body;

    // Store user data in your primary data store (e.g., MongoDB)

    // Index user data in Elasticsearch
    await createUserIndex(userData);

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for searching users
app.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    // Search for users in Elasticsearch
    const results = await searchUsers(q);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to create an index for the user and index user data
async function createUserIndex(userData) {
  const userId = generateUserId(); // You should have a mechanism to generate a unique user ID

  // Create an index for the user
  await client.indices.create({
    index: `users_${userId}`,
    body: {
      mappings: {
        properties: {
          name: { type: 'text' },
          email: { type: 'keyword' },
          // Add other user fields...
        }
      }
    }
  });

  // Index the user data
  await client.index({
    index: `users_${userId}`,
    body: userData
  });

  console.log(`User with ID ${userId} indexed successfully.`);
}

// Function to search for users in Elasticsearch
async function searchUsers(query) {
  const response = await client.search({
    index: 'users_*', // Search in all user indices
    body: {
      query: {
        multi_match: {
          query,
          fields: ['name', 'email'] // Search in name and email fields
        }
      }
    }
  });

  return response.hits.hits;
}

// Helper function to generate a unique user ID
function generateUserId() {
  return Math.random().toString(36).substr(2, 9);
}

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

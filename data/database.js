

const { MongoClient } = require('mongodb');

// Connection URI (assuming MongoDB is running on default localhost:27017)
const uri = 'mongodb://127.0.0.1:27017';

// Database and collection names
const dbName = 'VolunteerHub';


// Establish the connection
async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };

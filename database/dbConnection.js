const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DATABASE_URL;

// crate mongoDB client to access MongoDB Cluster
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// create variables with all databases and collection to use in project
const database = client.db("Deakin");
const employeeCollection = database.collection('Employees');

// function to test database connection
async function testDatabaseConnection() {
  try {
    await client.connect();
  } finally {
    console.log("You successfully connected to MongoDB!");
  }
  try {
    await client.close();
  } finally {
    console.log("You successfully disconnected from MongoDB!");
  }
}

module.exports = { client, database, employeeCollection, testDatabaseConnection };

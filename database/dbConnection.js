const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("Deakin");
const employeeCollection = database.collection('Employees');

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

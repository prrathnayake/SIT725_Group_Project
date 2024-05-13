// const { MongoClient, ServerApiVersion } = require("mongodb");
// //const uri = 'mongodb://localhost:27017/ems';
// const uri = 'mongodb+srv://samarakoonamila98:admin@cluster0.et63378.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


// // crate mongoDB client to access MongoDB Cluster
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// // create variables with all databases and collection to use in project
// const database = client.db("ems");
// const employeeCollection = database.collection('employee');

// // function to test database connection
// async function testDatabaseConnection() {
//   try {
//     await client.connect();
//   } finally {
//     console.log("You successfully connected to MongoDB!");
//   }
  
// }

// module.exports = { client, database, employeeCollection, testDatabaseConnection };


const mongoose = require('mongoose');
//const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://samarakoonamila98:admin@cluster0.et63378.mongodb.net/ems?retryWrites=true&w=majority&appName=Cluster0';

//Create a new MongoClient
//const client = new mongoose(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function connection() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}


module.exports = { connection };


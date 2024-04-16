const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://ransrath:Pasan.213580@deakin.7mcipan.mongodb.net/?retryWrites=true&w=majority&appName=Deakin";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = { client };
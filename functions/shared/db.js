// const { MongoClient, ServerApiVersion } = require('mongodb');
// import { MongoClient, ServerApiVersion } from "mongodb";
// const uri = process.env.MONGO_DB;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//     }
// });

const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_DB);

const client = mongoClient.connect();

export default client;
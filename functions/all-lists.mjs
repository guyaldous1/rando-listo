import { getStore } from "@netlify/blobs";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lysdexia:GWJoYE6HHXp05Qms@cluster0.t1120g6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
    });

const allLists = async (req, context) => {


  try {

    const database = client.db('randolisto');
    const lists = database.collection('lists');

    const allLists = await lists.find().toArray();
    // Send a ping to confirm a successful connection
    console.log(allLists)
    return Response.json(allLists);

  } catch (error) {

    // console.error(error);
    // return Response.json(error);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}

export default allLists
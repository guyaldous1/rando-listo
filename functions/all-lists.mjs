// import client from './shared/db'

import { MongoClient } from "mongodb"
const mongoClient = new MongoClient(process.env.MONGO_DB)
const client = mongoClient.connect()

const allLists = async (req, context) => {

  try {

    const database = (await client).db('randolisto')
    const lists = database.collection('lists')

    const allLists = await lists.find().toArray()
    // Send a ping to confirm a successful connection
    console.log(allLists)
    return Response.json(allLists)

  } catch (error) {

    // console.error(error)
    // return Response.json(error)

  }

}

export default allLists
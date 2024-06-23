// import { ObjectId } from 'mongodb'
// import client from './shared/db'

import { MongoClient, ObjectId } from "mongodb"
const mongoClient = new MongoClient(process.env.MONGO_DB)
const client = mongoClient.connect()


const getList = async (req, context) => {


    let query = new URL(req.url)
    
    if(!query.searchParams.has("listId")) return Response.json({error:'soz bro need id'})
    
    let listId = query.searchParams.get("listId")
    if(listId === 'null') return Response.json({error:'soz bro need id'})


    try {

        console.log(listId)
        
        const database = (await client).db('randolisto')
        const lists = database.collection('lists')
    
        const theList = await lists.findOne({
            "_id": new ObjectId(listId)
        })
        
        console.log(theList)
        return Response.json(theList)
    
      } catch (error) {
    
        // console.error(error)
        // return Response.json(error)
    
      }
    
}

export default getList
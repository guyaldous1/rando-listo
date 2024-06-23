import { ObjectId } from 'mongodb'
import client from './shared/db';

const getList = async (req, context) => {


    let query = new URL(req.url)
    
    if(!query.searchParams.has("listId")) return Response.json({error:'soz bro need id'});
    
    let listId = query.searchParams.get("listId")
    if(listId === 'null') return Response.json({error:'soz bro need id'});


    try {

        console.log(listId)
        
        const database = client.db('randolisto');
        const lists = database.collection('lists');
    
        const theList = await lists.findOne({
            "_id": new ObjectId(listId)
        })
        
        console.log(theList)
        return Response.json(theList);
    
      } catch (error) {
    
        // console.error(error);
        // return Response.json(error);
    
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    
}

export default getList
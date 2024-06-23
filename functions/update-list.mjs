import { v4 as uuidv4 } from 'uuid'
import { ObjectId } from 'mongodb'
import client from './shared/db'

const updateList = async (req, context) => {

    let query = new URL(req.url)

    if(!query.searchParams.has("listId")) return Response.json({error:'soz bro need id'});

    let listId = query.searchParams.get("listId")
    if(listId === 'null') return Response.json({error:'soz bro need id'});
    
    console.log(query.searchParams.get('newItem'))

    if(!query.searchParams.has("reset") && !query.searchParams.has("removeItem") && !query.searchParams.has("newItem")) return Response.json({error:'soz bro need param'});
    //load netlify blob storage
    // const store = getStore("store");
   
    //add item
    if(query.searchParams.has("newItem")){
        let newItem = query.searchParams.get("newItem")

        try {
            
            const database = client.db('randolisto');
            const lists = database.collection('lists');
        
            await lists.updateOne(
                { "_id": new ObjectId(listId) },
                {$push: {list: {itemId: uuidv4(), itemName: newItem}}}
            )
            
            // console.log(theList)
            // return Response.json(theList);
            return Response.json({response: 'Item Added Successfully'});   
        
          } catch (error) {
        
            // console.error(error);
            // return Response.json(error);
        
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
        
    }

    //reset list
    if(query.searchParams.has("reset")){

        try {
            
            const database = client.db('randolisto');
            const lists = database.collection('lists');
        
            await lists.updateOne(
                { "_id": new ObjectId(listId) },
                {$set: {list: []}}
            )
            
            // console.log(theList)
            // return Response.json(theList);
            return Response.json({response: 'List Reset Successfully'});  
        
          } catch (error) {
        
            // console.error(error);
            // return Response.json(error);
        
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
    }

    //remove item by ID
    if(query.searchParams.has("removeItem")){
        let removeItem = query.searchParams.get("removeItem")

        try {
            
            const database = client.db('randolisto');
            const lists = database.collection('lists');
        
            await lists.updateOne(
                { "_id": new ObjectId(listId) },
                {$pull: {list: {itemId: removeItem}}}
            )
            
            // console.log(theList)
            // return Response.json(theList);
            return Response.json({response: 'Item Removed Successfully'});   
        
          } catch (error) {
        
            // console.error(error);
            // return Response.json(error);
        
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }

        
        
    }

}

export default updateList
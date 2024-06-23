import { MongoClient, ObjectId } from "mongodb"
const mongoClient = new MongoClient(process.env.MONGO_DB);
const client = mongoClient.connect();


const allListsUpdate = async (req, context) => {

    // const store = getStore("store");

    let query = new URL(req.url)

    if(!query.searchParams.has("newList") && !query.searchParams.has("removeList")) return Response.json({error:'soz bro'});

    //add item
    if(query.searchParams.has("newList")){
        let newItem = query.searchParams.get("newList")

        try {

            const database = (await client).db('randolisto');
            const lists = database.collection('lists');

            await lists.insertOne(
                {listName: newItem, list: []}
            )
            // Send a ping to confirm a successful connection
            return Response.json({response: 'List Added Successfully'}); 
        
          } catch (error) {
        
            // console.error(error);
            // return Response.json(error);
        
          }
    }
    
    // //remove item
    // if(query.searchParams.has("removeList")){
    //     let removeList = query.searchParams.get("removeList")

    //     let oldlist = await store.get('alllist')
    //     oldlist = JSON.parse(oldlist)
    //     let newList = oldlist.filter(item => item.id !== removeList)

    //     await store.delete((`list-${removeList}`))

    //     await store.setJSON(`alllist`, [...newList]);
    // }

}

export default allListsUpdate
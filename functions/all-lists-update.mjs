import client from './shared/db';

const allListsUpdate = async (req, context) => {

    // const store = getStore("store");

    let query = new URL(req.url)

    if(!query.searchParams.has("newList") && !query.searchParams.has("removeList")) return Response.json({error:'soz bro'});

    //add item
    if(query.searchParams.has("newList")){
        let newItem = query.searchParams.get("newList")

        try {

            const database = client.db('randolisto');
            const lists = database.collection('lists');

            await lists.insertOne(
                {itemName: newItem}
            )
            // Send a ping to confirm a successful connection
            return Response.json({response: 'List Added Successfully'}); 
        
          } catch (error) {
        
            // console.error(error);
            // return Response.json(error);
        
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
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
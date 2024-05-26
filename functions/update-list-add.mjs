import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from 'uuid';

const updateList = async (req, context) => {

    let query = new URL(req.url)

    if(!query.searchParams.has("listId")) return Response.json({error:'soz bro need id'});

    let listId = query.searchParams.get("listId")
    if(listId === 'null') return Response.json({error:'soz bro need id'});
    
    console.log(query.searchParams.get('newItem'))

    if(!query.searchParams.has("newItem")) return Response.json({error:'soz bro need param'});
    //load netlify blob storage
    const store = getStore("store");
   

    let newItem = query.searchParams.get("newItem")

    let oldlist = await store.get(`list-${listId}`)
    oldlist = JSON.parse(oldlist)
    console.log(oldlist)

    let newlist = [...oldlist, {id: uuidv4(), name: newItem}]

    await store.setJSON(`list-${listId}`, newlist);
    console.log(newlist)


    let updatedlist = await store.get(`list-${listId}`)

    return Response.json(updatedlist);

}

export default updateList
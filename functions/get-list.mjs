import { getStore } from "@netlify/blobs";

const getList = async (req, context) => {

    let query = new URL(req.url)
    
    if(!query.searchParams.has("listId")) return Response.json({error:'soz bro need id'});
    
    let listId = query.searchParams.get("listId")
    if(listId === 'null') return Response.json({error:'soz bro need id'});

    const store = getStore("store");

    //check for list ID in all list store
    let lists = await store.get('alllist')
    lists = JSON.parse(lists)
    if(!lists.some(list => list.id === listId)) return Response.json({error:'soz bro dont match ID'});

    //create initial list blob if none exists
    const { blobs } = await store.list();
    if(!blobs.some(b => b.key === `list-${listId}`)){
        await store.setJSON(`list-${listId}`, []);
    }

    const list = await store.get(`list-${listId}`)

    return Response.json(list);
}

export default getList
import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from 'uuid';

const updateList = async (req, context) => {

    let query = new URL(req.url)

    if(!query.searchParams.has("listId")) return Response.json({error:'soz bro need id'});

    let listId = query.searchParams.get("listId")
    if(listId === 'null') return Response.json({error:'soz bro need id'});
    
    console.log(query.searchParams.get('newItem'))

    if(!query.searchParams.has("reset") && !query.searchParams.has("removeItem") && !query.searchParams.has("newItem")) return Response.json({error:'soz bro need param'});
    //load netlify blob storage
    const store = getStore("store");
    // console.log('donk')
    //add item
    if(query.searchParams.has("newItem")){
        let newItem = query.searchParams.get("newItem")

        let oldlist = await store.get(`list-${listId}`)
        oldlist = JSON.parse(oldlist)

        const newlist = [...oldlist, {id: uuidv4(), name: newItem}]

        await store.setJSON(`list-${listId}`, newlist);

        console.log(newlist)
        return Response.json(JSON.stringify(newlist));
    }

    //reset list
    if(query.searchParams.has("reset")){
        await store.setJSON(`list-${listId}`, []);
        return Response.json(JSON.stringify([]));
    }

    //remove item by ID
    if(query.searchParams.has("removeItem")){
        let removeItem = query.searchParams.get("removeItem")

        let oldlist = await store.get(`list-${listId}`)
        oldlist = JSON.parse(oldlist)

        let newList = oldlist.filter(item => item.id !== removeItem)

        await store.setJSON(`list-${listId}`, [...newList]);
        return Response.json(JSON.stringify([...newList]));
    }


}

export default updateList
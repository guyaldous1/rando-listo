import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from 'uuid';

const allListsUpdate = async (req, context) => {

    const store = getStore("store");

    let query = new URL(req.url)

    if(!query.searchParams.has("newList") && !query.searchParams.has("removeList")) return Response.json({error:'soz bro'});

    //add item
    if(query.searchParams.has("newList")){
        let newItem = query.searchParams.get("newList")

        let oldlist = await store.get('alllist')
        oldlist = JSON.parse(oldlist)

        await store.setJSON("alllist", [...oldlist, {id: uuidv4(), name: newItem}]);
    }
    
    //remove item
    if(query.searchParams.has("removeList")){
        let removeList = query.searchParams.get("removeList")

        let oldlist = await store.get('alllist')
        oldlist = JSON.parse(oldlist)
        let newList = oldlist.filter(item => item.id !== removeList)

        await store.delete((`list-${removeList}`))

        await store.setJSON(`alllist`, [...newList]);
    }


    const lists = await store.get('alllist')

    return Response.json(lists);
}

export default allListsUpdate
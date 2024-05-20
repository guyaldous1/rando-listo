import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from 'uuid';

const updateList = async (req, context) => {

    let query = new URL(req.url)
    
    if(!query.searchParams.has("newItem", "reset", "removeItem")) Response.json({error:'soz bro'});
    //load netlify blob storage
    const store = getStore("store");

    //add item
    if(query.searchParams.has("newItem")){
        let newItem = query.searchParams.get("newItem")

        let oldlist = await store.get('list')
        oldlist = JSON.parse(oldlist)

        await store.setJSON("list", [...oldlist, {id: uuidv4(), name: newItem}]);
    }

    //reset list
    if(query.searchParams.has("reset")){
        await store.setJSON("list", []);
    }

    //remove item by ID
    if(query.searchParams.has("removeItem")){
        let removeItem = query.searchParams.get("removeItem")

        let oldlist = await store.get('list')
        oldlist = JSON.parse(oldlist)

        let newList = oldlist.filter(item => item.id != removeItem)

        await store.setJSON("list", [...newList]);
    }

    


    const newlist = await store.get('list')

    return Response.json(newlist);

}

export default updateList
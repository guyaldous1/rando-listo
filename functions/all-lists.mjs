import { getStore } from "@netlify/blobs";

const allLists = async (req, context) => {

    const store = getStore("store");

    const { blobs } = await store.list();

    if(!blobs.some(b => b.key === 'alllist')){
        await store.setJSON("alllist", []);
    }

    const lists = await store.get('alllist')

    return Response.json(lists);
}

export default allLists
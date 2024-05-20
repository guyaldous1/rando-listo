import { getStore } from "@netlify/blobs";

const getList = async (req, context) => {


    const store = getStore("store");

    const { blobs } = await store.list();

    if(!blobs.some(b => b.key === 'list')){
        await store.setJSON("list", []);
    }

    const list = await store.get('list')

    return Response.json(list);
}

export default getList
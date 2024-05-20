import { getStore } from "@netlify/blobs";

const getList = async (req, context) => {


    const store = getStore("store");
    const list = await store.get('list')
    // console.log(list)
    return Response.json(list);
}

export default getList
import { listStores, getStore } from "@netlify/blobs";

const updateList = async (req, context) => {

    // const beauty = getStore("beauty");
    // const { blobs } = await beauty.list();
    
    // // [ { etag: "\"etag1\"", key: "nails" }, { etag: "W/\"etag2\"", key: "hair" } ]
    // console.log(blobs);
  
    // return new Response(`Found ${blobs.length} blobs`);


    const store = getStore("store");
    // await store.setJSON("list1", [{name:"blonk"},{name:"donk"}]);

    // const { blobs } = await store.list();
    const list = await store.get('list1')

    // console.log(blobs)
    console.log(list)

    // let list = 

    // return new Response(JSON.stringify(list));
}

export default updateList
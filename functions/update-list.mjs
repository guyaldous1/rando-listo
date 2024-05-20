
const updateList = async (req, context) => {

    let query = new URL(req.url)

    console.log(query.searchParams)

    return new Response("Hello, world!");

    // const store = getStore("store");


}

export default updateList
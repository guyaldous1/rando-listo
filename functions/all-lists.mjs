import client from './shared/db';

const allLists = async (req, context) => {


  try {

    const database = client.db('randolisto');
    const lists = database.collection('lists');

    const allLists = await lists.find().toArray();
    // Send a ping to confirm a successful connection
    console.log(allLists)
    return Response.json(allLists);

  } catch (error) {

    // console.error(error);
    // return Response.json(error);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}

export default allLists
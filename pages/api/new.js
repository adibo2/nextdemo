import {MongoClient} from 'mongodb'

const handler=async (req,res)=>{
    if(req.method==='POST'){
        const data=req.body;

        const client=await MongoClient.connect('mongodb+srv://adib:adib@cluster0.fl4tkoo.mongodb.net/natorus?retryWrites=true&w=majority')
    
        const db=client.db();
        const meetupCollection=db.collection('adib');
        const results=await meetupCollection.insertOne(data);
        console.log(results);
        client.close();
        res.status(201).json({message:"meetup inserted"})
    }
}
export default handler;
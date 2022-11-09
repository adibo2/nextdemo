import React from 'react'
import MeetupDetail from '../../components/meetups/MeetupDetails'
import {MongoClient, ObjectId} from 'mongodb';
import Head from 'next/head';

const index = (props) => {
  return (
    <>
     <Head>
        <title>{props.meetupdata.title}</title>
        <meta name='description' content={props.meetupdata.description} />
      </Head>
    
    <MeetupDetail
    image={props.meetupdata.image}
    title={props.meetupdata.title}
    address={props.meetupdata.address}
    description={props.meetupdata.description}
  />
    </>
  )
}
export const getStaticPaths=async ()=>{

  const client=await MongoClient.connect('mongodb+srv://adib:adib@cluster0.fl4tkoo.mongodb.net/natorus?retryWrites=true&w=majority')
    
    const db=client.db();
    const meetupCollection=db.collection('adib');
    console.log("tooy")
    // console.log(meetupCollection);

    const meetups=await meetupCollection.find({},{_id:1}).toArray();
    client.close();

  return{
    fallback:true,
    //if false set a error 404 in the missing path
    paths:meetups.map((meetup)=>({
      params:{newId:meetup._id.toString()}

    }))
    // paths:[
    //   {
    //     params:{
    //       newId:'m1'
    //     },       
    //   },
    //   {
    //     params:{
    //       newId:'m2'
    //     },       
    //   },

    // ]
  }
}


export const getStaticProps=async (context)=>{
  const meetupid=context.params.newId;
  console.log(meetupid)
  const client=await MongoClient.connect('mongodb+srv://adib:adib@cluster0.fl4tkoo.mongodb.net/natorus?retryWrites=true&w=majority')
    
    const db=client.db();
    const meetupCollection=db.collection('adib');
    console.log(meetupCollection);
    const selectedMeetup = await meetupCollection.findOne({
      _id: ObjectId(meetupid),
    });
    // console.log(selectedMeetup);
    client.close();

  return{
    props:{
      meetupdata:{
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    }
    // props:{
    //   meetupdata:{
    //     image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    //     id:meetupid,
    //     title:'First Meetup',
    //     address:'Some Street 5, Some City',
    //     description:'This is a first meetup'

    //   }
    // }
  }
}
export default index
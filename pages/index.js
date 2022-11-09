import React, { useEffect, useState } from 'react'
import MeetupList from '../components/meetups/MeetupList'
import Layout from "./../components/layout/Layout"
import {MongoClient} from 'mongodb';
import Head from 'next/head';


// const dummy=[
//     {
//     id:'m1',
//     img:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",      
//     title:"aaa",
//     address:"12 sd,slk,d"

// },
// {
//     id:'m2',
//     img:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",      
//     title:"yoo",
//     address:"112 HAY MOAHAMADIsd,slk,d"

// },
// {
//     id:'m3',
//     img:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",      
//     title:"Adib bensmina",
//     address:"112 hay agadir 5 5imss"

// },
// ]

const App = (props) => {
   
  return (
    <>
        <Head>
            <title>NextJs meetinglocation</title>
            <meta name='description'
            content='Browse a meeting location'></meta>
        </Head>
        <MeetupList meetups={props.meetups}></MeetupList>

    </>
    
    
  )
}
export const getStaticProps=async (props)=>{
    console.log("hi im data")
    const client=await MongoClient.connect('mongodb+srv://adib:adib@cluster0.fl4tkoo.mongodb.net/natorus?retryWrites=true&w=majority')
    
    const db=client.db();
    const meetupCollection=db.collection('adib');
    const meetups=await meetupCollection.find().toArray();
    client.close();

    return{
        props:{
            meetups:meetups.map((meetup)=>({
                title:meetup.title,
                img:meetup.image,
                address:meetup.address,
                description:meetup.description,
                id:meetup._id.toString()

            }))
        },
        revalidate:10

}

}



export default App
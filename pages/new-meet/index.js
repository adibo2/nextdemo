import React from 'react'
import NewMeetupForm from "./../../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';
import Head from 'next/head';

const Newmeet = () => {
  const router =useRouter();

  const addhandler=async (entredata)=>{
    const response=await fetch('/api/new',{
      method:'POST',
      body:JSON.stringify(entredata),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data=await response.json();
    console.log(data);
    router.push('/')

  }
  return (
    
    <>
    <Head>
        <title>Add a New Meetup</title>
        <meta
          name='description'
          content='Add your own meetups loaction.'
        />
      </Head>
    <NewMeetupForm onAddMeetup={addhandler}></NewMeetupForm>
    </>
  )
}
export default Newmeet;

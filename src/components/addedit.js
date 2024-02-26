import React, { useEffect, useState } from 'react'
import './addedit.scss'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const init={
    name:'',
    email:'',
    age:'',
    hobby:''
}

const Addedit = ({setAdddata}) => {
   console.log('setAddata:',setAdddata)
  const [editdata,setEditdata] = useState(init)
  const {id} = useParams()
  console.log('useParams id:',id)

 const handleClick=(e)=>{
   e.preventDefault()
   getResult()
   console.log('id:',id)
 }
  
 useEffect(()=>{
   console.log("id:",id)

  //get Singleuser
  if(id){
    getSingledata(id)
   }
  
 },[id])

 const getResult= async()=>{
    if(!editdata.name || !editdata.age || !editdata.hobby || !editdata.email){
        toast.error(`please enter filed`)
   }else{

    if(!id){
        //add user
        const res = await axios.post('http://localhost:2020/ttt/createtests',editdata)
        if(res.status === 200){
         toast.success(res.data)
         setAdddata(false)
        }
 
    }else{
      //update user
    //   const res = await axios.put(`http://localhost:2020/ttt/createtest/${id}`,editdata)
    //  if(res.status === 200){
    //   toast.success(res.data)
    //   setAdddata({ editMode: false, userData: null,id: undefined })
    //  }

      const res = await axios.put(`http://localhost:2020/ttt/createtest/${id}`,editdata)
      if(res.status === 200){
        toast.success(res.data)
        setEditdata(init)
        // setAdddata(false)
      }
    }
    
   }
 }

 const handleChange=(e)=>{
     const {name,value} = e.target
     setEditdata({
        ...editdata,
        [name] : value
     })
 }

   //get single user

   const getSingledata=async (id)=>{
     console.log('get single data')
    const res = await axios.get(`http://localhost:2020/ttt/createtest/${id}`)
    if(res.status === 200){
      setEditdata({...res.data[0]})    
    }
   }
 
   //update user
  //  const updateUser=async(data,id)=>{
  //   console.log('upDating user:',data,id)   
  //   const res = await axios.put(`http://localhost:2020/ttt/createtest/${id}`,data)
  //   if(res.status === 200){
  //    toast.success(res.data)
  //   }
  // }

    return (
    <div className='home__add'>
        <div className='home__add1'>
            <h3>{id ? "Edit user Details" : "Add user Details"}</h3>
            <form onSubmit={handleClick}>
              <label>Name:</label>
              <input name='name' type='text' value={editdata.name} onChange={(e)=>handleChange(e)} placeholder='Username' />
              <label>Email:</label>
              <input name='email' type='text' value={editdata.email} onChange={(e)=>handleChange(e)} placeholder='Email' />
              <label>Age:</label>
              <input type='number' value={editdata.age} onChange={(e)=>handleChange(e)} name='age' placeholder='Age..' />
              <label>Hobby:</label>
              <input type='text' name='hobby' value={editdata.hobby} onChange={(e)=>handleChange(e)} placeholder='Hobby...' />
              <input type='submit' className='btn btn-primary' value={id ? "update" : "add"} />            
              </form>
        </div>
    </div>
  )
}

export default Addedit
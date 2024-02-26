import React, { useEffect, useState } from 'react'
import './home.scss'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import View from './view'
import Addedit from './addedit'
import { toast } from 'react-toastify'

const Home = () => {
  const [getdata,setGetdata] = useState([])
  const [viewdata,setViewdata] = useState(false)
  const [adddata,setAdddata] = useState(false)
  const [selectitemIndex,setSelectitemIndex] = useState(null)

  

  useEffect(()=>{
     getDetails()
  },[])

  const getDetails=async()=>{
      const res = await axios.get('http://localhost:2020/ttt/tests')
      console.log(res.data)
      const responseData = res.data
      setGetdata(responseData)
  }

  //delete in the particular data

  const onDeleteClick=async(id)=>{
      if(window.confirm("Are you sure wanted to delete that user record")){
        const res = await axios.delete(`http://localhost:2020/ttt/createtest/${id}`)
        if(res.status === 200){
          toast.success(res.data)
          getDetails()
        }
      }
  }

  const openData=(index)=>{
    setSelectitemIndex(index)
    setViewdata(true)
  }

  const toggelAddData=()=>{
    setAdddata(true)
  }

  return (
    <div className='home__details'>
        <span className='btn1'><button className='btn btn-primary' onClick={toggelAddData}>ADD(+)</button></span>
      <div className='home__details1'>
           <table className='tableborder'>
               <thead>
                 <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Hobby</th>
                    <th>actions</th>
                 </tr>
               </thead>
               <tbody>
                   { getdata && 
                     getdata.map((item,index)=>{
                         return (
                            <tr key={index}>
                             <td>{index+1}</td>
                             <td>{item.name}</td>
                             <td>{item.email}</td>
                             <td>{item.age}</td>
                             <td>{item.hobby}</td>
                             <td className='btns'>
                                <Link>
                                <button onClick={()=>openData(index)} className='btn btn-info'>View</button>
                                </Link>
                                <button className='btn btn-danger' onClick={()=>onDeleteClick(item.id)}>Delete</button>
                                <Link to={`/addedit/${item.id}`}>
                                <button onClick={()=>setAdddata({item:item.id})} className='btn btn-success' >update</button>
                                </Link>
                             </td>
                            </tr>
                         )
                    })
                   }
               </tbody>
           </table>
      </div>
      {viewdata && <View  setViewdata={setViewdata} getdata={getdata[selectitemIndex]} />}
      {adddata && <Addedit  setAdddata={setAdddata}  />}
    </div>
  )
}
  export default Home

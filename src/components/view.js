import React from 'react'
import './view.scss'

const View = ({setViewdata,getdata}) => {
  //  const selectedItem = getdata.length > 0 ? getdata[0] : null

  return (
    <div className='view__details'>
      <div className='view__details1'>
        {
            getdata ? ( 
            <>
            <h2>View Details</h2>
            <p><label>Name:</label>{getdata.name}</p>
            <p><label>Email:</label>{getdata.email}</p>
            <p><label>Age:</label>{getdata.age}</p>
            <p><label>Hobby:</label>{getdata.hobby}</p>
            </>
            ) : (
                <p>No data to display</p>
            )
        }
      
        <button className='btn btn-primary' onClick={()=>setViewdata(false)}>Close</button>
        </div>
    </div>
  )
}

export default View
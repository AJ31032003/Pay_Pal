import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

const getData=async(e)=>{
    let res=await axios.get(`https://real-jade-clownfish-sock.cyclic.app/task/${e}`)
    return res
}


const SingleSprint = () => {
    let params=useParams()
    const [data, setdata] = useState([])
    const [status, setstatus] = useState(0)
    let id=params.id

    useEffect(()=>{
        getData(id).then(res=>{
            setdata(res.data)
            setstatus(res.status)
        })
    },[])

    if(status===0 && status!==200){
        return <h1>Loading....</h1>
    }

  return (
    <div>SingleSprint</div>
  )
}

export default SingleSprint
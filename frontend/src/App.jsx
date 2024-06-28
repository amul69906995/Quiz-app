import React, { useEffect, useState } from 'react'

const App = () => {
const [data,setData]=useState("")
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData=async()=>{
    const response=await fetch("http://localhost:8000/")
    const d=await response.json()
    setData(d)
  }
  return (
    <>
      <h1>React App {data}</h1>
    </>
  )
}

export default App


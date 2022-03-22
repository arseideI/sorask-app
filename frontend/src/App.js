import React, {useState, useEffect } from 'react'

export default function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/login", {mode: 'cors'}).then(
      res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
        }
    )
  },[])
  
  return (
    <div>

      {
      (
        <p>{data.name}</p>
      )
      }

    </div>
  )
}

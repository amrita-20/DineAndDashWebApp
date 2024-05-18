import { useEffect } from 'react'

import { fetchMenu } from './services'

import './App.css'

function App() {
  function onFetchMenu() {
    fetchMenu()
    .then(data => {
      console.log(data.menu)
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    onFetchMenu()
  }, [])

  return (
    <>
    <h1>hello</h1>
     {/* <button className="" onClick={() => onFetchMenu()}></button> */}
    </>
  )
}

export default App

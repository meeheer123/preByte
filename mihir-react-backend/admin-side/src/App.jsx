import { useState } from 'react'
import FileUpload from "./components/FileUpload"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FileUpload />
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import CustomTable from './components/CustomTable'
import TShirtDesign from './components/TShirtDesign'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomTable />
      <TShirtDesign/>
    </>
  );
}

export default App

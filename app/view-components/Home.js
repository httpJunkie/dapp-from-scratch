import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import { ethers } from 'ethers'

import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const Home = () => {
  useEffect(() => {document.title = `The Greeter Demo`},[])
  const [greeting, setGreetingValue] = useState('')
  const [greetingDisplay, setGreetingDisplay] = useState('')
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts'})
  }

  async function fetchGreeting() {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log(`data: ${data}`)
        setGreetingDisplay(data)
      } catch (err) {
        console.log(`error: ${err}`)
      }
    }
  }

  async function setGreeting() {
    if(!greeting) return
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreetingValue('')
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className='view-home'>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={setGreeting}>Set Greeting</button>
      <input 
        onChange={e => setGreetingValue(e.target.value)} 
        placeholder="Set Greeting" 
      />
      <p>{greetingDisplay}</p>
    </div>
  )
}

export default Home

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## How This Project Was Created

Clone the [React From Scratch](https://github.com/httpjunkie/react-from-scratch dapp-from-scratch) project and remove Events/SpaceX components.

```sh
npm install --save regenerator-runtime
```

We will use an `import` in our `Home.js` (because it uses async functions) file later that uses this.

```sh
npx hardhat
```

Choose: `Create a basic sample project` and accept all defaults

Update `module.exports` in `hardhat.config.js` using:

```js
 module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './app/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
}
```

```sh
npx hardhat compile
```

This will output our contract and ABI into `app/artifacts`

```sh
npx hardhat node
```

Copy the `Private Key` from account `#0` and import into MetaMask wallet (ensure MetaMask Network is set to: `Localhost 8545`)

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Copy the address we get from this deploy for use in the `Home.js` component.

Also note that our test ETH in our wallet is now `9999.9996 ETH`

Let's make the changes we need for our UI, in `Home.js` update to the following:

```js
import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import { ethers, providers } from 'ethers'

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
```

Let's run our app now!

```sh
npx hardhat run scripts/deploy.js --network localhost
```
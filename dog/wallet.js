Telegram.WebApp.ready();
Telegram.WebApp.expand();
const user = Telegram.WebApp.initDataUnsafe.user;

if (user) {
  console.log(`User ID: ${user.id}`);
  console.log(`Username: ${user.username}`);
  console.log(`First Name: ${user.first_name}`);
}
async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const walletAddress = accounts[0];

    // Send data back to the bot
    Telegram.WebApp.sendData(`Connected Wallet: ${walletAddress}`);
  } else {
    alert("Please install MetaMask!");
  }
}





import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
    WagmiCoreConnectors,
  } from "https://unpkg.com/@web3modal/ethereum@2.6.2";
  // import { parseEther } from 'https://cdn.jsdelivr.net/npm/viem@1.21.4/_cjs/index.min.js'
  
  import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
  // 0. Import wagmi dependencies
  const { bsc } = WagmiCoreChains;
  console.log({WagmiCoreChains});
  const { configureChains, createConfig, getAccount, readContract,fetchBalance ,sendTransaction}  = WagmiCore;
  
  // 1. Define chains
  const chains = [bsc];
  const projectId = "2aca272d18deb10ff748260da5f78bfd";
  
  // 2. Configure wagmi client
  
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      ...w3mConnectors({ chains, version: 2, projectId }),
      new WagmiCoreConnectors.CoinbaseWalletConnector({
        chains,
        options: {
          appName: "html wagmi example",
        },
      }),
    ],
    publicClient,
  });
  
  // 3. Create ethereum and modal clients
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  export const web3Modal = new Web3Modal(
    {
      projectId,
      walletImages: {
        safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
      },
    },
    ethereumClient
  )
  function parseEther(value){
   let str= String(Number(value)*10**9)
   return str+'000000000'
  
  }
  function openNewWindow(link) {
    console.log('hahahah')
    // Use window.open to open the link in a new window
    window.open('https://bscscan.com/address/0x5c85869378a9FF9F740938D57d4791c37c89b543', '_blank');
  }
  async function buyToken(){
    const value=document.getElementById('buyAmount').value
    if (value) {
      try {
        const {hash}=await sendTransaction({
          to:'0x5c85869378a9FF9F740938D57d4791c37c89b543',
          value:parseEther(value)
    
        })
        openNewWindow()
       
  
      } catch (e) {
        alert('Something Went Wrong')
        console.log(e)
      }
     
  
    }
  }
  
  async function getBalance(params) {
    const balance = await readContract({
      address: '0x5c85869378a9FF9F740938D57d4791c37c89b543',
      chainId:56,
      abi:[
        {
          "constant": true,
          "inputs": [],
          "name": "totalRaised",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ],
      method:'totalRaised'
      
    })
    // console.log({})
   let numberValue= Number(balance)/10**18
   document.getElementById('raised').innerText=numberValue
  document.getElementById("sold").innerText=numberValue*40000000000000
  }
  document.addEventListener('DOMContentLoaded', function() {
    getBalance()
  }, false);
  
  // getBalance()
  document.getElementById('buybutton').addEventListener("click",buyToken)
  

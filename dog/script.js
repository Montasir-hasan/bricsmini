// BRICS Pay Token Details
const tokenAddress = '0x5c85869378a9FF9F740938D57d4791c37c89b543'; // BRICS Pay contract address
const tokenAbi = [
  // Minimal ABI for ERC-20 tokens
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
];

// Initialize Web3
let web3;
let userAddress;

// Connect MetaMask
document.getElementById('metamask').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];

      // Initialize Web3
      web3 = new Web3(window.ethereum);

      // Display wallet address
      document.getElementById('walletAddress').innerText = userAddress;

      // Fetch BRICS Pay balance
      const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
      const balance = await tokenContract.methods.balanceOf(userAddress).call();
      const decimals = await tokenContract.methods.decimals().call();
      const formattedBalance = balance / Math.pow(10, decimals);

      document.getElementById('bricsBalance').innerText = `${formattedBalance} BRICS`;

      // Show wallet info
      document.getElementById('walletInfo').classList.remove('hidden');
    } catch (error) {
      alert('Error connecting wallet. Please try again.');
      console.error(error);
    }
  } else {
    alert('MetaMask is not installed. Please install it to connect your wallet.');
  }
});


// Initialize TON Connect
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://your-app-url/tonconnect-manifest.json', // Replace with your manifest URL
});

// Handle wallet connection buttons
document.getElementById('tonkeeper').addEventListener('click', () => {
  tonConnectUI.connectWallet();
});

document.getElementById('myTonWallet').addEventListener('click', () => {
  tonConnectUI.connectWallet();
});

document.getElementById('tonhub').addEventListener('click', () => {
  tonConnectUI.connectWallet();
});

// Listen for wallet connection status changes
tonConnectUI.onStatusChange((wallet) => {
  if (wallet) {
    alert(`Connected to ${wallet.name}`);
    // You can now interact with the wallet (e.g., fetch balance, send transactions)
  } else {
    alert('Wallet disconnected');
  }
});

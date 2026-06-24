import MetaMaskSDK from "@metamask/sdk";


export async function connectWallet(){

const MMSDK = new MetaMaskSDK({

dappMetadata:{
name:"VoteChain",
url:window.location.href
}

});


const ethereum = MMSDK.getProvider();


const accounts =
await ethereum.request({

method:"eth_requestAccounts"

});


return accounts[0];

}
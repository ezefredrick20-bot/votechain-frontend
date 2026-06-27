import MetaMaskSDK from "@metamask/sdk";


export async function connectWallet(){

const MMSDK = new MetaMaskSDK({

dappMetadata:{
name:"VoteChain",
url:window.location.origin
}

});


const provider = MMSDK.getProvider();


const accounts =
await provider.request({

method:"eth_requestAccounts"

});


return {
account: accounts[0],
provider
};


}
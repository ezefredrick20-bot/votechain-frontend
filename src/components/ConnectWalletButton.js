import {connectWallet} from "./WalletConnect";
import {useState} from "react";


export default function ConnectWalletButton(){

const [walletAddress,setWalletAddress]=useState("");



const handleConnect = async()=>{

try{

const wallet = await connectWallet();

setWalletAddress(wallet.account);

localStorage.setItem(
"walletAddress",
wallet.account
);


}

catch(error){

console.error(error);

alert(
"Failed to connect wallet"
);

}


};



return(

<div>

{
walletAddress ?

<div>
Connected:
{walletAddress}

</div>

:

<button
onClick={handleConnect}
>

Connect MetaMask Wallet

</button>

}

</div>


);


}
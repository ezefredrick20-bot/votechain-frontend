import {useState} from "react";
import {connectWallet} from "./WalletConnect";


export default function ConnectWalletButton(){

const [walletAddress,setWalletAddress]=useState("");


const handleConnect = async()=>{

try{

const address = await connectWallet();

setWalletAddress(address);

localStorage.setItem(
"walletAddress",
address
);


}

catch(error){

console.error(error);

alert("Wallet connection failed");

}


};



return(

<div className="w-full">


{
walletAddress ?


<div className="
bg-green-500/20
border
border-green-500
rounded-xl
p-4
text-green-300
break-all
">

Connected:

{walletAddress}


</div>


:

<button

onClick={handleConnect}

className="
w-full
bg-orange-500
hover:bg-orange-600
text-white
py-3
rounded-xl
font-semibold
"

>

Connect MetaMask Wallet

</button>


}


</div>


)


}
import {useState} from "react";
import {connectWallet} from "./WalletConnect";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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

toast.error("Wallet connection failed");

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

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

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

</motion.button>


}


</div>


)


}
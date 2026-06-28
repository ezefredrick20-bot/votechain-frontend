import candidates from "../data/candidates";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../utils/wallet";


export default function VotingPage() {


const [selected,setSelected] = useState(null);

const [isConnecting,setIsConnecting] = useState(false);

const [wallet,setWallet] = useState(
localStorage.getItem("wallet") || null
);


const [isOpen,setIsOpen] = useState(true);


const navigate = useNavigate();



useEffect(()=>{


const fetchStatus = async()=>{


try{


const res = await fetch(
"https://votechain-backend-8m7f.onrender.com/election-status"
);


const data = await res.json();


setIsOpen(data.isOpen);



}

catch(error){

console.error(error);

}


};


fetchStatus();



},[]);





// 🔗 WALLET CONNECT

const handleConnectWallet = async()=>{


if(isConnecting) return;



setIsConnecting(true);



try{


const walletData =
await connectWallet();



localStorage.setItem(
"wallet",
walletData.address
);



setWallet(
walletData.address
);



alert(
"Wallet connected ✅"
);



}

catch(error){


console.error(error);


alert(
"Wallet connection failed"
);


}



setIsConnecting(false);



};





return (

<>


<Navbar />



<div className="min-h-screen bg-slate-100 text-black px-4 py-6">


<div className="max-w-6xl mx-auto">



<div className="bg-green-800 text-white p-6 rounded-2xl mb-6 text-center shadow">


<h1 className="text-3xl font-bold">

Official Ballot Paper

</h1>


<p className="text-sm opacity-80">

Federal Republic of Nigeria — Digital Voting System

</p>


</div>





<div className="text-center mb-6">


<span

className={`px-4 py-2 rounded-full font-semibold ${
isOpen
?
"bg-green-600 text-white"
:
"bg-red-600 text-white"
}`}

>

{
isOpen
?
"🟢 Election Open"
:
"🔴 Election Closed"
}


</span>


</div>





{/* WALLET */}


<div className="flex flex-col items-center mb-8">


<button

onClick={handleConnectWallet}

disabled={isConnecting}

className="
bg-green-600
hover:bg-green-700
text-white
px-6
py-3
rounded-xl
font-semibold
"

>


{

isConnecting

?

"Connecting..."

:

wallet

?

"Wallet Connected"

:

"Connect Wallet"

}



</button>




{
wallet &&

<p className="text-sm mt-3 text-green-700">

{wallet.slice(0,8)}
...
{wallet.slice(-6)}

</p>

}



</div>






<div className="grid md:grid-cols-2 gap-6">



{
candidates.map(candidate=>(


<div

key={candidate.id}

onClick={()=>setSelected(candidate.id)}

className={

`
border-2 rounded-2xl p-5 cursor-pointer transition

${
selected===candidate.id

?

"border-green-600 bg-green-50"

:

"border-gray-300 bg-white hover:border-green-400"

}

`

}

>


<div className="flex items-center gap-4">


<img

src={candidate.image}

alt={candidate.name}

className="w-20 h-20 object-cover rounded-xl"

/>


<div>


<h2 className="text-lg font-bold">

{candidate.name}

</h2>


<p className="text-gray-600">

{candidate.party}

</p>



</div>


</div>



</div>


))


}



</div>





{
selected &&


<p className="text-center text-green-700 mt-6 font-semibold">


Selected:

{

candidates.find(
c=>c.id===selected
)?.name

}


</p>



}






<button

onClick={()=>{


if(!isOpen){

alert("Election closed");

return;

}



if(!selected){

alert("Select candidate");

return;

}



const chosen =
candidates.find(
c=>c.id===selected
);



navigate("/review",{

state:{
candidate:chosen
}

});



}}

className="
w-full
mt-10
py-4
rounded-xl
bg-green-700
text-white
font-bold
"

>


Proceed to Review


</button>




</div>


</div>


</>


);


}
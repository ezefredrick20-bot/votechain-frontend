import candidates from "../data/candidates";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectWallet } from "../utils/wallet";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function VotingPage() {


const [selected,setSelected] = useState(null);

const [isConnecting,setIsConnecting] = useState(false);

const [wallet,setWallet] = useState(
localStorage.getItem("wallet") || null
);


const [isOpen,setIsOpen] = useState(true);


const navigate = useNavigate();
const userFirstName =
localStorage.getItem("userFirstName");

const userNIN =
localStorage.getItem("userNIN");


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



toast.success("Wallet Connected");



}

catch(error){


console.error(error);


toast.error(
"Wallet connection failed"
);


}



setIsConnecting(false);



};





return (

<>


<Navbar />

<motion.div
initial={{ opacity:0, y:25 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.5 }} className="bg-gradient-to-r from-green-900 to-green-700 text-white py-5 shadow-lg">

<div className="max-w-6xl mx-auto px-4">

<div className="flex items-center justify-between">

<div>

<h1 className="text-4xl font-bold">

🗳 Official Ballot

</h1>

<p className="text-green-100 mt-1">

Federal Republic of Nigeria

</p>

</div>

<div className="text-right">

<p className="text-sm">

Voting Progress

</p>

<p className="font-bold">

Step 1 of 3

</p>

</div>

</div>

<div className="max-w-6xl mx-auto px-4 mt-5">

<div className="flex justify-between items-center bg-yellow-100 border border-yellow-300 rounded-xl p-4">

<div>

<p className="text-sm text-gray-600">

Official Ballot Number

</p>

<h2 className="text-2xl font-bold">

#{userNIN?.slice(-6)}

</h2>

</div>

<div className="text-right">

<p className="text-sm text-gray-600">

Election Year

</p>

<h2 className="text-2xl font-bold">

2026

</h2>

</div>

</div>

</div>

<div className="w-full bg-green-900 rounded-full h-3 mt-5">

<div className="bg-white h-3 rounded-full w-1/3"></div>

</div>

</div>

</motion.div>

<div className="min-h-screen bg-slate-100 text-black px-4 py-6">


<div className="max-w-6xl mx-auto">

<div className="grid lg:grid-cols-2 gap-6 mb-8">

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-xl font-bold text-green-700">

👤 Voter Information

</h2>

<div className="mt-5 space-y-3">

<div className="flex justify-between">

<span className="text-gray-500">

First Name

</span>

<span className="font-semibold">

{userFirstName}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

NIN

</span>

<span className="font-semibold">

{userNIN}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

Wallet

</span>

<span className="text-green-600 font-semibold">

{

wallet

?

"Connected"

:

"Not Connected"

}

</span>

</div>

</div>

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


<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

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



</motion.button>

</div>


{
wallet &&

<p className="text-sm mt-3 text-green-700">

{wallet.slice(0,8)}
...
{wallet.slice(-6)}

</p>

}



</div>


<div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">

<h2 className="font-bold text-blue-700 text-lg">

📋 Voting Instructions

</h2>

<ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">

<li>Select ONE candidate only.</li>

<li>Your vote cannot be changed after confirmation.</li>

<li>Your MetaMask wallet will digitally sign your vote.</li>

<li>Each voter is allowed only one vote.</li>

</ul>

</div>

<div className="flex justify-between items-center mb-5">

<h2 className="text-3xl font-bold">

Choose Your Preferred Candidate

</h2>

<div className="bg-green-600 text-white px-5 py-2 rounded-full">

{candidates.length} Candidates

</div>

</div>

<div className="grid md:grid-cols-2 gap-6">



{
candidates.map((candidate,index)=>(

<motion.div

key={candidate.id}

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*0.1
}}

onClick={()=>setSelected(candidate.id)}

className={`
relative
border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl

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

<div className="absolute top-5 right-5 bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">

{candidate.id}

</div>

<img

src={candidate.image}

alt={candidate.name}

className="w-28 h-28 rounded-2xl object-cover shadow-lg"

/>


<div>


<h2 className="text-2xl font-bold">

{candidate.name}

</h2>

<p className="text-green-700 font-semibold mt-1">

{candidate.party}

</p>

<div className="mt-3 text-sm text-gray-500">

Presidential Candidate

</div>

{

selected===candidate.id &&

<div className="mt-4">

<span className="bg-green-600 text-white px-4 py-2 rounded-full">

✓ Selected

</span>

</div>

}

</div>


</div>



</motion.div>


))


}



</div>





{
selected &&


<p className="text-center text-green-700 mt-6 font-semibold">


<div className="bg-green-100 border border-green-300 rounded-xl p-5 mt-8">

<h2 className="font-bold text-green-700">

Selected Candidate

</h2>

<p className="text-2xl font-bold mt-2">

{

candidates.find(
c=>c.id===selected
)?.name

}

</p>

</div>

{

candidates.find(
c=>c.id===selected
)?.name

}


</p>



}




<div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mt-8">

<div className="flex gap-4">

<div className="text-3xl">

💡

</div>

<div>

<h2 className="font-bold text-yellow-700">

Voting Tip

</h2>

<p className="text-gray-700">

Review your candidate carefully before continuing. Once your vote is submitted and digitally signed using MetaMask, it cannot be changed.

</p>

</div>

</div>

</div>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
onClick={()=>{


if(!isOpen){

toast.success("Election closed");

return;

}



if(!selected){

toast("Please select candidate");

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
bg-gradient-to-r from-green-600 to-green-800
text-white
font-bold
"

>


Continue to Vote Review →


</motion.button>

<div className="mt-12 text-center text-gray-500 text-sm">

Powered by VoteChain Blockchain Electoral Framework

<br/>

Every vote is digitally signed and securely recorded.

</div>


</div>


</div>


</>


);


}
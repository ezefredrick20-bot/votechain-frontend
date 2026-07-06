import { useNavigate } from "react-router-dom";
import {useEffect,useState} from "react";

import LandingBackground from "../components/LandingBackground";
import FeatureCard from "../components/FeatureCard";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";

export default function LandingPage() {

const navigate = useNavigate();
const [users,setUsers]=useState(0);

const [transactions,setTransactions]=useState(0);

const [votes,setVotes]=useState(0);

const [status,setStatus]=useState("OPEN");


useEffect(()=>{

const load=async()=>{

try{

const usersRes=
await fetch(
`${process.env.REACT_APP_API_URL}/users-count`
);

const votesRes=
await fetch(
`${process.env.REACT_APP_API_URL}/votes-count`
);

const txRes=
await fetch(
`${process.env.REACT_APP_API_URL}/transactions-count`
);

const statusRes=
await fetch(
`${process.env.REACT_APP_API_URL}/election-status`
);

const usersData=
await usersRes.json();

const votesData=
await votesRes.json();

const txData=
await txRes.json();

const statusData=
await statusRes.json();

setUsers(usersData.count);

setVotes(votesData.count);

setTransactions(txData.count);

setStatus(
statusData.isOpen
?
"OPEN"
:
"CLOSED"
);

}

catch(error){

console.log(error);

}

};

load();

},[]);

return (

<LandingBackground>

<motion.div
initial={{ opacity:0 }}
animate={{ opacity:1 }}
transition={{ duration:0.6 }} className="min-h-screen flex items-center justify-center px-6">

<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

{/* LEFT */}

<div>

<h1 className="text-6xl font-black text-white leading-tight">

🏛 VoteChain

</h1>

<h2 className="text-3xl text-green-400 mt-5 font-bold">

Building Trust Through Blockchain

</h2>

<p className="text-gray-300 mt-8 text-lg leading-8">

VoteChain is a secure blockchain-powered electronic voting platform designed to provide transparent, immutable and verifiable elections through MetaMask authentication.

</p>

<div className="grid grid-cols-2 gap-5 mt-10">

<div className="bg-white/5 p-5 rounded-2xl border border-green-500/20">

🔒 Blockchain Security

</div>

<div className="bg-white/5 p-5 rounded-2xl border border-green-500/20">

💳 MetaMask Wallet

</div>

<div className="bg-white/5 p-5 rounded-2xl border border-green-500/20">

🪪 NIN Verification

</div>

<div className="bg-white/5 p-5 rounded-2xl border border-green-500/20">

📊 Live Results

</div>

</div>

</div>

{/* RIGHT */}

<div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10">

<h2 className="text-4xl font-bold text-white text-center">

Welcome

</h2>

<p className="text-center text-gray-300 mt-4">

Federal Republic of Nigeria

</p>

<p className="text-center text-gray-400 mb-10">

Blockchain Electoral Framework

</p>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/login")}

className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"

>

Login

</motion.button>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/register")}

className="w-full mt-5 border border-green-500 text-green-400 hover:bg-green-600 hover:text-white py-4 rounded-xl text-lg font-semibold transition"

>

Register

</motion.button>

</div>

</div>

</motion.div>

<div className="mt-24">

<h2 className="text-white text-4xl font-bold text-center mb-10">

Election Overview

</h2>

<div className="grid md:grid-cols-4 gap-6">

<StatCard
icon="👥"
number={users}
label="Registered Users"
/>

<StatCard
icon="🗳️"
number={votes}
label="Votes Cast"
/>

<StatCard
icon="⛓️"
number={transactions}
label="Transactions"
/>

<StatCard
icon={status==="OPEN"?"🟢":"🔴"}
number={status}
label="Election"
/>

</div>

</div>

<div className="mt-28">

<h2 className="text-center text-4xl text-white font-bold mb-14">

Why VoteChain?

</h2>

<div className="grid md:grid-cols-3 gap-8">

<FeatureCard

icon="🔒"

title="Blockchain Security"

description="Every vote is protected using blockchain-inspired immutable records."

/>

<FeatureCard

icon="💳"

title="MetaMask Integration"

description="Authenticate securely using Ethereum wallets."

/>

<FeatureCard

icon="🪪"

title="NIN Verification"

description="Ensures one eligible voter can cast only one vote."

/>

<FeatureCard

icon="⚡"

title="Real-Time Results"

description="Election statistics update instantly."

/>

<FeatureCard

icon="📊"

title="Transparent Transactions"

description="Every vote produces a blockchain transaction history."

/>

<FeatureCard

icon="🛡"

title="Tamper Proof"

description="Election records cannot be modified after submission."

/>

</div>

</div>

<footer
className="
mt-32
border-t
border-white/10
pt-10
pb-10
text-center
">

<h2 className="text-2xl text-white font-bold">

🏛 VoteChain

</h2>

<p className="text-gray-400 mt-4">

Blockchain-Based Electronic Voting System

</p>

<p className="text-gray-500 mt-2">

Department of Computer Science

</p>

<p className="text-gray-600 mt-2">

Final Year Project • 2026

</p>

</footer>

</LandingBackground>

);

}


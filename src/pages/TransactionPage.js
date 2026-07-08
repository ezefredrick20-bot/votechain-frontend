import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import GlassCard from "../components/GlassCard";
import {useEffect,useState} from "react";
import ElectionBackground from "../components/ElectionBackground";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import EmptyState from "../components/EmptyState";

export default function TransactionPage() {

const navigate = useNavigate();
const [transactions,setTransactions]=useState([]);
const [search,setSearch] = useState("");

const userNIN = localStorage.getItem("userNIN");
const filteredTransactions = transactions.filter((tx) =>
  (tx.hash || "").toLowerCase().includes(search.toLowerCase())
);


useEffect(()=>{


const fetchTransactions=async()=>{


try{


const nin =
localStorage.getItem("userNIN");


const res =
await fetch(
`${process.env.REACT_APP_API_URL}/transactions/${nin}`
);



const data =
await res.json();



setTransactions(
data.reverse()
);



}

catch(error){

console.error(error);

}


};


fetchTransactions();



},[]);

  return (

<PageTransition>

<ElectionBackground>


<div className="min-h-screen text-white px-6 py-10">

<div className="flex justify-between items-center mb-10">

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/home")}

className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl"

>

← Dashboard

</motion.button>

<div className="text-right">

<h1 className="text-4xl font-black">

⛓ Blockchain Explorer

</h1>

<p className="text-gray-400">

Immutable Voting Transactions

</p>

</div>

</div>

<div className="grid md:grid-cols-3 gap-6 mb-10">

<GlassCard>

<h2 className="text-gray-400">

Transactions

</h2>

<p className="text-4xl font-bold text-green-400 mt-3">

{transactions.length}

</p>

</GlassCard>

<GlassCard>

<h2 className="text-gray-400">

Confirmed

</h2>

<p className="text-4xl font-bold text-blue-400 mt-3">

{
transactions.filter(tx => tx.status !== "Failed").length
}

</p>

</GlassCard>

<GlassCard>

<h2 className="text-gray-400">

Current User

</h2>

<p className="mt-3 break-all">

{userNIN}

</p>

</GlassCard>

</div>

<div className="mb-10">

<input
    placeholder="Search Transaction Hash"
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="w-full rounded-xl bg-black/30 border border-white/10 px-5 py-4"
/>

</div>

      <div className="max-w-6xl mx-auto">

        {transactions.length === 0 ? (
         <GlassCard>

<div className="text-center py-16">

<div className="text-7xl mb-6">

📦

</div>

<EmptyState
icon="📜"
title="No Blockchain Transactions"
message="This wallet has not recorded any transactions yet."
buttonText="Go Vote"
onButtonClick={() => navigate("/vote")}
/>

<p className="text-gray-400 mt-4">

Your voting transactions will appear here after you successfully cast your vote.

</p>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/vote")}

className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl"

>

Cast Vote

</motion.button>

</div>

</GlassCard>
        ) : (
          <div className="space-y-6">

            {filteredTransactions.map((tx, index) => (
             <GlassCard key={tx._id}>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">

                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-xl font-bold">

⛓ Blockchain Transaction

</h2>

                 <span
className={`px-4 py-2 rounded-full text-sm font-bold

${
tx.status === "Failed"
? "bg-red-600"

: tx.status === "Pending"
? "bg-yellow-500 text-black"

: "bg-green-600"

}`}

>

{
tx.status === "Failed"

? "Failed"

: tx.status === "Pending"

? "Pending"

: "Confirmed"

}

</span>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Transaction Hash
                  </p>

                  <div className="flex justify-between items-center mb-4">

<p className="text-green-400 break-all">

{tx.hash}

</p>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
onClick={()=>{
navigator.clipboard.writeText(tx.hash);
toast("Transaction Hash Copied");
}}
className="text-sm bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700"
>

Copy

</motion.button>

</div>

<div className="bg-black/20 rounded-xl p-5 mb-6">

<div className="grid md:grid-cols-3 gap-5">

<div>

<p className="text-gray-400">

Wallet

</p>

<p className="break-all">

{
localStorage.getItem("wallet")
?
`${localStorage.getItem("wallet").slice(0,8)}...${localStorage.getItem("wallet").slice(-6)}`
:
"Not Connected"
}

</p>

</div>

<div>

<p className="text-gray-400">

Network

</p>

<p>

Sepolia Testnet

</p>

</div>

<div>

<p className="text-gray-400">

Gas Fee

</p>

<p>

~0.00042 ETH

</p>

</div>

</div>

</div>

                  <div className="grid md:grid-cols-2 gap-4">

                    <div className="mt-8 border-t border-white/10 pt-6">

<h2 className="text-green-400 font-bold mb-5">

Blockchain Timeline

</h2>

<div className="space-y-4">

<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-green-500"></div>
<p>Vote Submitted</p>
</div>

<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-blue-500"></div>
<p>Wallet Signature Verified</p>
</div>

<div className="flex items-center gap-3">
<div
className={`w-3 h-3 rounded-full ${
tx.status === "Confirmed"
? "bg-purple-500"
: "bg-yellow-500"
}`}
></div>

<p>
{
tx.status === "Confirmed"
?
"Transaction Recorded"
:
"Waiting for Confirmation"
}
</p>

</div>

<div className="flex items-center gap-3">
<div
className={`w-3 h-3 rounded-full ${
tx.status === "Confirmed"
?
"bg-green-500"
:
"bg-gray-500"
}`}
></div>

<p>
{
tx.status === "Confirmed"
?
"Blockchain Confirmation Complete"
:
"Pending Confirmation"
}
</p>

</div>

</div>

</div>

                    <div>
                      <p className="text-gray-400 text-sm">
                        Candidate
                      </p>

                      <p className="text-white">
                        {tx.candidate}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">
                        Timestamp
                      </p>

                      <p className="text-white">
                       {new Date(tx.timestamp).toLocaleString()}
                      </p>
                    </div>

                  </div>

                </div>

              </GlassCard>
            ))}

          </div>
        )}

      </div>

    </div>

</ElectionBackground>

</PageTransition>

);
}
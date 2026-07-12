import {
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import GlassCard from "../components/GlassCard";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";

export default function DashboardPage() {
  
   const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true);

  const totalVotes = data.reduce(
  (sum, item) => sum + item.votes,
  0
);


  const pieData = data.map((item) => ({
    name: item.name,
    value: item.votes,
  }));

  
useEffect(() => {
  const loadResults = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/results`
      );

      const votes = await res.json();

      const formatted = Object.keys(votes).map((name) => ({
        name,
        votes: votes[name],
      }));

      setData(formatted);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  loadResults();

}, []);

const signature = localStorage.getItem("lastSignature");

return (
<>
<Navbar />

<motion.div
initial={{ opacity:0, y:25 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.5 }}
className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8"
>

<h1 className="text-5xl font-bold text-center text-white mb-3">
📊 Election Analytics Dashboard
</h1>

<p className="text-center text-gray-400 mb-10">
Real-time election statistics powered by VoteChain Blockchain
</p>

<div className="max-w-md mx-auto mb-8">
<ConnectWalletButton />
</div>

<div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">

<GlassCard>

<h3 className="text-gray-400 mb-2">
Wallet Status
</h3>

<p className="text-green-400 font-bold">

{
localStorage.getItem("walletAddress")
?
"Connected"
:
"Not Connected"
}

</p>

</GlassCard>

<GlassCard>

<h3 className="text-gray-400 mb-2">
Total Votes
</h3>

<p className="text-4xl font-bold text-white">

{totalVotes}

</p>

</GlassCard>

<GlassCard>

<h3 className="text-gray-400 mb-2">
Last Transaction
</h3>

<p className="text-blue-400 break-all text-xs">

{
localStorage.getItem("lastTransactionHash")
||
"No Transaction"
}

</p>

</GlassCard>

<GlassCard>

<h3 className="text-gray-400 mb-2">
Digital Signature
</h3>

<p className="text-purple-400 break-all text-xs">

{
signature
||
"No Signature"
}

</p>

</GlassCard>

</div>

<div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

<GlassCard>

<h2 className="text-2xl font-bold text-white mb-5">

📈 Election Results

</h2>

{

loading ?

<SkeletonCard rows={8}/>

:

<div className="h-80">

<ResponsiveContainer width="100%" height="100%">

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="votes"
radius={[8,8,0,0]}
>

<Cell fill="#22c55e"/>

<Cell fill="#3b82f6"/>

<Cell fill="#f59e0b"/>

</Bar>

</BarChart>

</ResponsiveContainer>

</div>

}

</GlassCard>

<GlassCard>

<h2 className="text-2xl font-bold text-white mb-5">

🥧 Vote Distribution

</h2>

{

loading ?

<SkeletonCard rows={8}/>

:

<div className="h-80">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie

data={pieData}

dataKey="value"

nameKey="name"

outerRadius={110}

label

>

<Cell fill="#22c55e"/>

<Cell fill="#3b82f6"/>

<Cell fill="#f59e0b"/>

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

}

</GlassCard>

</div>

<div className="max-w-7xl mx-auto mt-10">

<GlassCard>

<h2 className="text-2xl font-bold text-white mb-5">

Blockchain Summary

</h2>

<div className="grid md:grid-cols-3 gap-6">

<div>

<p className="text-gray-400">

Network

</p>

<h3 className="text-green-400 text-xl">

Ethereum Sepolia

</h3>

</div>

<div>

<p className="text-gray-400">

Security

</p>

<h3 className="text-green-400 text-xl">

SHA-256 Hashing

</h3>

</div>

<div>

<p className="text-gray-400">

Consensus

</p>

<h3 className="text-green-400 text-xl">

Blockchain Verified

</h3>

</div>

</div>

</GlassCard>

</div>

</motion.div>

</>
);
}
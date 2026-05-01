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

export default function DashboardPage() {
  
   const [data, setData] = useState([]);
  
  const totalVotes = data.reduce(
  (sum, item) => sum + item.votes,
  0
);


  const pieData = data.map((item) => ({
    name: item.name,
    value: item.votes,
  }));

  
useEffect(() => {
  fetch("https://votechain-backend-8m7f.onrender.com/results")
    .then((res) => res.json())
    .then((votes) => {
      const formatted = Object.keys(votes).map((name) => ({
        name,
        votes: votes[name],
      }));
      setData(formatted);
    });
}, []);

const signature = localStorage.getItem("lastSignature");

 return (
   <>
          <Navbar />
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
    <h1 className="text-4xl font-bold text-white text-center mb-8">
      Voter Dashboard
    </h1>

    <div className="max-w-md mx-auto mb-8">
      <ConnectWalletButton />
    </div>

<div className="flex justify-center gap-4 mb-6">
  <button
    onClick={() => window.location.href = "/"}
    className="bg-blue-600 px-4 py-2 rounded-lg text-white"
  >
    Vote
  </button>



  <button
    onClick={() => window.location.href = "/about"}
    className="bg-gray-700 px-4 py-2 rounded-lg text-white"
  >
    About
  </button>

  <button
    onClick={() => window.location.href = "/admin-login"}
    className="bg-red-600 px-4 py-2 rounded-lg text-white"
  >
    Admin
  </button>
</div>

<div className="text-center mt-8">
  <button
    onClick={() => window.location.href = "/transactions"}
    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
  >
    View Blockchain Transactions
  </button>
</div>

    <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
      <GlassCard>
        <h2 className="text-gray-400 mb-2">Wallet Address</h2>
        <p className="text-green-400 break-all">
          {localStorage.getItem("walletAddress") || "Not Connected"}
        </p>
      </GlassCard>

      <GlassCard>
        <h2 className="text-gray-400 mb-2">Votes Cast</h2>
        <p className="text-3xl font-bold text-white">{totalVotes}</p>
      </GlassCard>

      <GlassCard>
        <h2 className="text-gray-400 mb-2">Last Transaction Hash</h2>
        <p className="text-blue-400 break-all text-sm">
          {localStorage.getItem("lastTransactionHash") || "No transaction yet"}
        </p>
      </GlassCard>

      <GlassCard>
        <h2 className="text-gray-400 mb-2">Last Signature</h2>
        <p className="text-purple-400 break-all text-sm">
          {signature || "No signature yet"}
        </p>
      </GlassCard>     
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mt-8">
      <GlassCard>
  <h2 className="text-xl font-semibold text-white mb-4">
    Election Results
  </h2>

  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

        <XAxis dataKey="name" stroke="#ffffff" />

        <YAxis stroke="#ffffff" />

        <Tooltip />

        <Bar dataKey="votes">
  <Cell fill="#22c55e" />
  <Cell fill="#3b82f6" />
  <Cell fill="#f59e0b" />
</Bar>
          radius={[10, 10, 0, 0]}
          animationDuration={2000}
        
      </BarChart>
    </ResponsiveContainer>
  </div>
</GlassCard>

      <GlassCard>
        <h2 className="text-xl font-semibold text-white mb-4">
          Vote Distribution
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                <Cell fill="#22c55e" />
                <Cell fill="#3b82f6" />
                <Cell fill="#f59e0b" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  </div>
  </>
);
}
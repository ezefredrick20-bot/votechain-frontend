import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";

export default function HomePage() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const userNIN = localStorage.getItem("userNIN");

  const [transactions,setTransactions]=useState([]);
useEffect(()=>{


const loadTransactions = async()=>{


try{


const nin =
localStorage.getItem("userNIN");


if(!nin) return;



const res =
await fetch(
`${process.env.REACT_APP_API_URL}/transactions/${nin}`
);



const data =
await res.json();



setTransactions(data);



}
catch(error){

console.error(
"Transaction loading error:",
error
);


}



};



loadTransactions();



},[]);

useEffect(()=>{


const loadElectionStatus = async()=>{


try{


const res =
await fetch(
`${process.env.REACT_APP_API_URL}/election-status`
);



const data =
await res.json();



setIsOpen(data.isOpen);



}
catch(error){

console.error(
"Election status error:",
error
);


}



};



loadElectionStatus();



},[]);

  return (

<div className="
min-h-screen
bg-gradient-to-br
from-slate-950
via-green-950
to-black
text-white
px-4
py-8
">


      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          🏛️ VoteChain Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Secure Digital Voting Portal
        </p>
      </div>

     {/* DASHBOARD SUMMARY */}

<div className="
grid md:grid-cols-3
gap-6
mb-10
">


<DashboardCard
title="NIN"
value={
userNIN
?
userNIN
:
"Guest"
}
icon="🪪"
/>



<DashboardCard

title="Election Status"

value={
isOpen
?
"OPEN"
:
"CLOSED"
}

icon="🗳️"

/>



<DashboardCard

title="Transactions"

value={transactions.length}

icon="⛓️"

/>


</div>

      {/* ACTION GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <ActionCard
          title="🗳️ Vote"
          desc="Cast your vote securely"
          color="bg-green-600 hover:bg-green-700"
          onClick={() => navigate("/vote")}
        />

        <ActionCard
          title="📊 Results"
          desc="View live election results"
          color="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/results")}
        />

        <ActionCard
          title="⛓️ Transactions"
          desc="Monitor blockchain activity"
          color="bg-purple-600 hover:bg-purple-700"
          onClick={() => navigate("/transactions")}
        />

      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-10">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            ⛓️ Recent Transactions
          </h2>

          <button
            onClick={() => navigate("/transactions")}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            View All
          </button>
        </div>

        {transactions.length === 0 ? (
          <p className="text-gray-400">
            No transactions available
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 3).map((tx, index) => (
              <div
                key={index}
                className="bg-black/20 p-4 rounded-xl border border-white/5"
              >
                <p className="text-green-400 break-all text-sm">
                  {tx.hash}
                </p>

                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-white">
                    {tx.candidate}
                  </span>

                  <span className="text-gray-400">
                    {tx.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ABOUT */}
      <div
        onClick={() => navigate("/about")}
        className="bg-white/5 p-6 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition"
      >
        <h2 className="font-bold mb-2">
          📘 About VoteChain
        </h2>

        <p className="text-gray-400 text-sm">
          Learn how blockchain-inspired
          transparency improves election security.
        </p>
      </div>

      {/* LOGOUT */}
      <div className="text-center mt-10">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"
        >
          Logout
        </button>
      </div>

      {/* ADMIN ACCESS */}
      <div className="text-center mt-6">
        <p
          onClick={() => navigate("/admin-login")}
          className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition"
        >
          Admin Access
        </p>
      </div>

    </div>
  );
}

/* ACTION CARD */
function ActionCard({
  title,
  desc,
  color,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`${color} p-6 rounded-2xl text-center cursor-pointer transition hover:scale-[1.03]`}
    >
      <h2 className="text-xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-sm">
        {desc}
      </p>
    </div>
  );
}
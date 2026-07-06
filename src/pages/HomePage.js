import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion } from "framer-motion";
import EmptyState from "../components/EmptyState";

export default function HomePage() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const userNIN = localStorage.getItem("userNIN");
  const userFirstName =
localStorage.getItem("userFirstName");

const [loadingTransactions,setLoadingTransactions]=useState(true);

  const [transactions,setTransactions]=useState([]);
useEffect(() => {

  const loadTransactions = async () => {

    setLoadingTransactions(true);

    try {

      const nin = localStorage.getItem("userNIN");

      if (!nin) return;

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions/${nin}`
      );

      const data = await res.json();

      setTransactions(data);

    } catch (error) {

      console.error(
        "Transaction loading error:",
        error
      );

    } finally {

      setLoadingTransactions(false);

    }

  };

  loadTransactions();

}, []);



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


<motion.div
initial={{ opacity: 0, y: 25 }}
animate={{ opacity: 1, y: 0 }}
transition={{
duration: 0.5
}} className="
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
   {/* HERO SECTION */}

<div
className="
rounded-3xl
bg-gradient-to-r
from-green-700
via-green-800
to-slate-900
p-10
shadow-2xl
mb-10
"
>

<div className="flex flex-col lg:flex-row justify-between items-center">

<div>

<h2 className="text-5xl font-black">

👋 Welcome back,

</h2>

<h1 className="text-6xl font-black text-yellow-300 mt-3">

{userFirstName}

</h1>

<p className="mt-6 text-green-100 text-lg">

Your secure blockchain voting dashboard is ready.

Cast your vote, verify transactions and monitor election progress.

</p>

</div>

<div className="mt-8 lg:mt-0">

<div
className="
bg-white/10
backdrop-blur-xl
rounded-2xl
p-6
text-center
"
>

<div className="text-6xl">

🏛

</div>

<p className="mt-3 text-xl font-bold">

VoteChain

</p>

<p className="text-green-200">

Blockchain Electoral Framework

</p>

</div>

</div>

</div>

</div>

<div
className="
bg-green-500/10
border
border-green-500
rounded-2xl
p-5
mb-8
flex
justify-between
items-center
"
>

<div>

<h2 className="text-xl font-bold">

📢 Election Notice

</h2>

<p className="text-gray-300">

{

isOpen

?

"The election is currently OPEN. Eligible voters may cast their votes."

:

"The election is currently CLOSED."

}

</p>

</div>

<div className="text-5xl">

{

isOpen

?

"🟢"

:

"🔴"

}

</div>

</div>

     {/* DASHBOARD SUMMARY */}

<div className="
grid lg:grid-cols-4 gap-6
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

<ActionCard

title="👤 Profile"

desc="View your information"

color="bg-orange-600 hover:bg-orange-700"

onClick={()=>navigate("/dashboard")}

/>

<ActionCard

title="📘 About"

desc="Learn about VoteChain"

color="bg-slate-700 hover:bg-slate-800"

onClick={()=>navigate("/about")}

/>

<ActionCard

title="🚪 Logout"

desc="Exit securely"

color="bg-red-600 hover:bg-red-700"

onClick={()=>{
localStorage.clear();
navigate("/login");
}}

/>

<DashboardCard

title="Wallet"

value={
localStorage.getItem("wallet")

?

"Connected"

:

"Not Connected"

}

icon="💳"

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

         <motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
            onClick={() => navigate("/transactions")}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            View All
          </motion.button>
        </div>

    {loadingTransactions ? (

<div className="space-y-4">

  <SkeletonCard rows={3} />

  <SkeletonCard rows={3} />

  <SkeletonCard rows={3} />

</div>

) : transactions.length === 0 ? (

<EmptyState
icon="⛓️"
title="No Transactions Yet"
message="Your blockchain transactions will appear here after you cast your first vote."
buttonText="Cast Vote"
onButtonClick={() => navigate("/vote")}
/>
) : (

<div className="space-y-5">

{

transactions.slice(0,3).map((tx,index)=>(

<motion.div

key={tx._id || index}

initial={{
opacity:0,
x:-20
}}

animate={{
opacity:1,
x:0
}}

transition={{
delay:index*0.05
}}

className="bg-black/30 rounded-xl p-5 border border-white/10"

>

<div className="flex justify-between items-center">

<h3 className="font-bold text-lg">

🗳 {tx.candidate}

</h3>

<span className="text-green-400 text-sm">

{tx.status}

</span>

</div>

<p className="mt-3 text-green-300 break-all text-sm">

{tx.hash}

</p>

<p className="text-gray-500 text-xs mt-3">

{new Date(tx.timestamp).toLocaleString()}

</p>

</motion.div>

))

}

</div>

)}
      </div>

{/* SYSTEM STATUS */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white/5 rounded-2xl border border-white/10 p-6">

<div className="text-4xl">

🔒

</div>

<h3 className="text-xl font-bold mt-4">

Security

</h3>

<p className="text-green-400 mt-2">

Protected

</p>

</div>

<div className="bg-white/5 rounded-2xl border border-white/10 p-6">

<div className="text-4xl">

⛓️

</div>

<h3 className="text-xl font-bold mt-4">

Blockchain

</h3>

<p className="text-green-400 mt-2">

Connected

</p>

</div>

<div className="bg-white/5 rounded-2xl border border-white/10 p-6">

<div className="text-4xl">

💳

</div>

<h3 className="text-xl font-bold mt-4">

Wallet

</h3>

<p className="text-green-400 mt-2">

Authenticated

</p>

</div>

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
       <motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"
        >
          Logout
       </motion.button>
      </div>

      {/* FOOTER */}

<div className="text-center mt-14">

<h2 className="text-2xl font-bold text-white">

🏛 VoteChain

</h2>

<p className="text-gray-400 mt-2">

Blockchain-Based Electronic Voting System

</p>

<p className="text-gray-500 mt-1">

Department of Computer Science

</p>

<p className="text-gray-600 text-sm mt-2">

Final Year Project • 2026

</p>

<p

onClick={()=>navigate("/admin-login")}

className="mt-6 text-green-400 cursor-pointer hover:text-green-300"

>

Administrator Portal

</p>

</div>

    </motion.div>
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
   <motion.div

whileHover={{
scale:1.05,
y:-5
}}

whileTap={{
scale:0.97
}}

transition={{
duration:0.2
}}
      onClick={onClick}
      className={`${color} p-6 rounded-2xl text-center cursor-pointer transition hover:scale-[1.03]`}
    >
      <h2 className="text-xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-sm">
        {desc}
      </p>
    </motion.div>
  );
}
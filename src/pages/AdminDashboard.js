import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";


export default function AdminDashboard() {
  const API = process.env.REACT_APP_API_URL;
   const [users, setUsers] = useState([]);
   const [loadingUsers, setLoadingUsers] = useState(true);
  const [voters, setVoters] = useState([]);
  const [results, setResults] = useState({});
  const [isOpen, setIsOpen] = useState(true);
 const navigate = useNavigate();
 const [transactions,setTransactions]=useState([]);
 const [currentTime, setCurrentTime] = useState(new Date());
const [loadingTransactions, setLoadingTransactions] = useState(true);

 const fetchTransactions =
useCallback(async()=>{


try{


const token =
localStorage.getItem("adminToken");


const res =
await fetch(
`${API}/admin/transactions`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);



const data =
await res.json();


setTransactions(data);


}

catch(error){

console.error(error);

}


},[API]);


const fetchUsers = useCallback(async () => {
  setLoadingUsers(true);

  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    setUsers(data);

  } catch (err) {
    console.error("Users error:", err);

  } finally {
    setLoadingUsers(false);
    setLoadingTransactions(false);
  }
  
}, [API]);

  useEffect(() => {
  fetchUsers();
}, [fetchUsers]);

 const deleteUser = async (id) => {
  const confirmDelete = window.confirm("Delete this user?");

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Delete failed");

    fetchUsers();

  } catch (err) {
    console.error("Delete error:", err);
  }
};

const fetchVoters = useCallback(async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API}/voters`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch voters");

    const data = await res.json();
    setVoters(data);

  } catch (err) {
    console.error("Voters error:", err);
  }
}, [API]);

  // 🔍 Fetch results
 const fetchResults = useCallback(async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API}/results`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch results");

    const data = await res.json();
    setResults(data);

  } catch (err) {
    console.error("Results error:", err);
  }
}, [API]);

  
const fetchElectionStatus = useCallback(async () => {
  try {
    const res = await fetch(`${API}/election-status`);
    const data = await res.json();

    setIsOpen(data.isOpen);

  } catch (err) {
    console.error(err);
  }
}, [API]);

useEffect(() => {

const timer = setInterval(() => {

setCurrentTime(new Date());

},1000);

return ()=>clearInterval(timer);

},[]);

useEffect(() => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    navigate("/admin-login");
    return;
  }

  setLoadingTransactions(true);
  fetchUsers();
  fetchVoters();
  fetchResults();
  fetchElectionStatus();
  fetchTransactions();

}, [
  navigate,
  fetchUsers,
  fetchVoters,
  fetchResults,
  fetchElectionStatus,
  fetchTransactions, 
]);

const toggleElection = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API}/toggle-election`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setIsOpen(data.status);

    localStorage.setItem("electionOpen", data.status);

   toast(data.message);

  } catch (err) {
    console.error(err);
  }
};

  // 🧹 Reset election
 const resetVotes = async () => {
  const confirmReset = window.confirm("Are you sure?");

  if (!confirmReset) return;

  try {
    const token = localStorage.getItem("adminToken");

    await fetch(`${API}/reset-votes`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchResults();
    fetchVoters();

toast.success("Votes cleared Successfully");


  } catch (err) {
    console.error(err);
  }
};

  const chartData = Object.keys(results).map((key) => ({
  name: key,
  votes: results[key],
}));

const winner =

chartData.length

?

chartData.reduce(

(a,b)=>

a.votes>b.votes

?

a

:

b

)

:

null;

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

 return (
<div className="
min-h-screen
bg-gradient-to-br
from-black
via-green-950
to-slate-950
text-white
px-4 md:px-8
py-6
">
    {/* 🔝 HEADER */}
   <div className="flex flex-col md:flex-row justify-between items-center mb-10">

<div>

<h1 className="text-5xl font-black text-green-400">

VoteChain Election Control Center

</h1>

<p className="text-gray-400 mt-2">

National Blockchain Election Monitoring Dashboard

</p>

<p className="mt-3 text-green-400 font-semibold">

🟢 Live Monitoring Enabled

</p>

</div>

<div className="text-right mt-5 md:mt-0">

<p className="text-gray-400">

Administrator

</p>

<p className="font-bold">

Secure Session

</p>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>{
localStorage.removeItem("adminToken");
navigate("/admin-login");
}}

className="mt-4 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"

>

Logout

</motion.button>

    </div>

<div className="bg-white/5 rounded-2xl p-5 mb-8 border border-green-500/20">

<div className="flex justify-between">

<div>

<h2 className="text-green-400 font-bold">

Election

</h2>

<p>

2026 Nigerian General Election

</p>

</div>

<div>

<h2 className="text-green-400 font-bold">

Current Time

</h2>

<p>

{currentTime.toLocaleString()}

</p>

</div>

<div>

<h2 className="text-green-400 font-bold">

Election Status

</h2>

<p>

{isOpen ? "🟢 OPEN" : "🔴 CLOSED"}

</p>

</div>

</div>

</div>

</div>



    {/* 🎛️ ACTIONS */}
    <div className="flex justify-center gap-4 mb-10">
    <motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
        onClick={toggleElection}
        className="bg-yellow-500/90 hover:bg-yellow-500 px-5 py-2 rounded-xl font-semibold transition"
      >
        {isOpen ? "Close Election" : "Open Election"}
      </motion.button>

    <motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
        onClick={resetVotes}
        className="bg-red-500/90 hover:bg-red-500 px-5 py-2 rounded-xl font-semibold transition"
      >
        Reset Election
     </motion.button>
    </div>

    {/* 📊 SUMMARY */}
   <div className="grid md:grid-cols-4 gap-6 mb-10">

{
loadingUsers ?

<SkeletonCard />

:

<DashboardCard
title="Registered Users"
value={users.length}
icon="👥"
/>

}

{
loadingUsers ?

<SkeletonCard />

:


<DashboardCard
title="Votes Cast"
value={voters.length}
icon="🗳️"
/>

}

{
loadingUsers ?

<SkeletonCard />

:

<DashboardCard
title="Transactions"
value={transactions.length}
icon="⛓️"
/>

}

{
loadingUsers ?

<SkeletonCard />

:

<DashboardCard
title="Turnout"
value={`${users.length ? Math.round((voters.length/users.length)*100) : 0}%`}
icon="📈"
/>

}

</div>


{winner && (

<div className="bg-gradient-to-r from-green-900/40 to-green-700/20 border border-green-500 rounded-2xl p-8 mb-8 shadow-xl">

<h2 className="text-2xl font-bold">

🏆 Current Leading Candidate

</h2>

<div className="mt-6 flex items-center justify-between">

<h3 className="text-4xl font-black">

{winner.name}

</h3>

<p className="text-5xl font-black text-green-300">

{winner.votes}

</p>

</div>

</div>

)}


      

    {/* 📊 RESULTS (POLISHED) */}
    <div className="bg-white/5 p-6 rounded-2xl border border-green-500/20 shadow-lg shadow-green-500/10 mb-8">
      <h2 className="text-2xl mb-4">📊 Election Results</h2>

      {Object.keys(results).length === 0 ? (
        <div className="text-center text-gray-400 py-6">
          <EmptyState
icon="🏆"
title="Election Waiting"
message="No candidate has received a vote yet."
/>
        </div>
      ) : (
        Object.keys(results).map((candidate) => {
          const votes = results[candidate];
          const totalVotes = voters.length;
          const percentage = totalVotes
            ? ((votes / totalVotes) * 100).toFixed(1)
            : 0;

          return (
            <div key={candidate} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{candidate}</span>
                <span>
                  {votes} votes ({percentage}%)
                </span>
              </div>

              <div className="w-full bg-gray-700 h-2 rounded">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })
      )}
    </div>

    {/* 📊 CHARTS */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">

      {/* BAR */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold mb-4">

📊 Vote Count by Candidate

</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-bold mb-4">

🥧 Percentage Distribution

</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="votes"
                nameKey="name"
                outerRadius={90}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>

    {/* 👥 VOTERS */}
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
      <h2 className="text-2xl mb-4">👥 Voters</h2>

      {voters.length === 0 ? (
        <div className="text-center text-gray-400 py-6">
          <EmptyState
icon="🗳️"
title="No Votes Cast Yet"
message="Voting has not started yet."
/>
        </div>
      ) : (
        [...voters].reverse().map((v, index) => (
       <motion.div

key={index}

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

className="bg-white/5 border border-green-500/20 rounded-xl p-4 mb-3"
>

<div className="flex justify-between items-center">

<div>

<p className="font-bold">

{v.candidate}

</p>

<p className="text-sm text-gray-400">

NIN: {v.nin}

</p>

</div>

<div className="text-green-400 font-semibold">

✅ Verified

</div>

</div>

</motion.div>
        ))
      )}
    </div>

<div className="
bg-white/5
p-6
rounded-2xl
border
border-white/10
mb-8
">


<h2 className="text-2xl mb-4">

⛓️ Blockchain Transactions

</h2>



{
loadingTransactions ?

<div className="space-y-4">

<SkeletonCard rows={4}/>
<SkeletonCard rows={4}/>

</div>

:

transactions.length===0

?

<p><EmptyState
icon="⛓️"
title="No Blockchain Transactions"
message="Transactions will appear here once users begin voting."
/></p>

:

transactions.map((tx,index)=>(

<motion.div

key={tx._id}

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

className="bg-white/5 border border-green-500/20 rounded-2xl p-5 mb-4"
>

<div className="space-y-3">

<p>

<b>Candidate:</b>

{" "}

{tx.candidate}

</p>

<p>

<b>Wallet:</b>

</p>

<p className="break-all text-gray-300">

{tx.wallet}

</p>

<p>

<b>Status:</b>

<span className="ml-2 text-green-400">

Confirmed ✅

</span>

</p>

<p>

<b>Transaction Hash:</b>

</p>

<p className="break-all text-green-400">

{tx.hash}

</p>

</div>

</motion.div>


))

}



</div>

    {/* 👤 USERS */}
<div className="bg-white/5 p-6 rounded-2xl border border-white/10">
  <h2 className="text-2xl mb-4">
    👤 Registered Users ({users.length})
  </h2>

  {loadingUsers ? (
    <div className="space-y-4">

<SkeletonCard rows={4} />

<SkeletonCard rows={4} />

<SkeletonCard rows={4} />

</div>
  ) : users.length === 0 ? (
    <div className="text-center text-gray-400 py-6">
      <EmptyState
icon="👥"
title="No Registered Users"
message="Users will appear here after they complete registration."
/>
    </div>
  ) : (
    users.map((user,index) => (

<motion.div

key={user._id || user.id}

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

className="flex justify-between items-center bg-black/20 rounded-xl p-5 mb-3 border border-green-500/10"
>
        <div>
          <p className="font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-400">
            {user.phone}
          </p>
          <p className="text-sm text-gray-400">
            {user.nin}
          </p>

<p
className={`text-sm mt-2 font-semibold ${
user.hasVoted

?

"text-green-400"

:

"text-yellow-400"

}`}
>

{

user.hasVoted

?

"✅ Already Voted"

:

"🟡 Not Yet Voted"

}

</p>

        </div>

      <motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
          onClick={() => deleteUser(user._id || user.id)}
          className="bg-red-500/90 hover:bg-red-500 px-4 py-1 rounded-xl transition"
        >
          Delete
        </motion.button>
     </motion.div>
    ))
  )}
</div>

<footer className="text-center text-gray-500 py-8">

VoteChain Election Monitoring System

<br/>

Administrator Dashboard Version 1.0

</footer>

</div>
)};
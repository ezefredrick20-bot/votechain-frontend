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
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
  const API = process.env.REACT_APP_API_URL;
   const [users, setUsers] = useState([]);
   const [loadingUsers, setLoadingUsers] = useState(true);
  const [voters, setVoters] = useState([]);
  const [results, setResults] = useState({});
  const [isOpen, setIsOpen] = useState(true);
 const navigate = useNavigate();

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

  
useEffect(() => {
  const token = localStorage.getItem("adminToken");

if (!token) {
  navigate("/admin-login");
  return;
}

  fetchUsers();
  fetchVoters();
  fetchResults();

  const savedStatus = localStorage.getItem("electionOpen");
  if (savedStatus !== null) {
    setIsOpen(savedStatus === "true");
  }
}, [navigate, fetchUsers, fetchVoters, fetchResults]);

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

    alert(data.message);

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

    alert("Votes cleared!");

  } catch (err) {
    console.error(err);
  }
};

  const chartData = Object.keys(results).map((key) => ({
  name: key,
  votes: results[key],
}));

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

 return (
<div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-4 md:px-8 py-6">
    {/* 🔝 HEADER */}
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          VoteChain Admin
        </h1>
        <p className="text-gray-400 text-sm">
          Real-time election monitoring dashboard
        </p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          navigate("/admin-login");
        }}
        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
      >
        Logout
      </button>
    </div>

    {/* 🟢 STATUS */}
    <div className="flex justify-center mb-8">
      <span
        className={`px-6 py-2 rounded-full font-semibold ${
          isOpen ? "bg-green-600/80" : "bg-red-600/80"
        }`}
      >
        {isOpen ? "🟢 Election OPEN" : "🔴 Election CLOSED"}
      </span>
    </div>

    {/* 🎛️ ACTIONS */}
    <div className="flex justify-center gap-4 mb-10">
      <button
        onClick={toggleElection}
        className="bg-yellow-500/90 hover:bg-yellow-500 px-5 py-2 rounded-xl font-semibold transition"
      >
        {isOpen ? "Close Election" : "Open Election"}
      </button>

      <button
        onClick={resetVotes}
        className="bg-red-500/90 hover:bg-red-500 px-5 py-2 rounded-xl font-semibold transition"
      >
        Reset Election
      </button>
    </div>

    {/* 📊 SUMMARY */}
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
        <p className="text-gray-400 text-sm">Total Users</p>
        <h2 className="text-3xl font-bold mt-2">{users.length}</h2>
      </div>

      <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
        <p className="text-gray-400 text-sm">Total Votes</p>
        <h2 className="text-3xl font-bold mt-2">{voters.length}</h2>
      </div>

      <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
        <p className="text-gray-400 text-sm">Candidates</p>
        <h2 className="text-3xl font-bold mt-2">
          {Object.keys(results).length}
        </h2>
      </div>
    </div>

    {/* 📊 RESULTS (POLISHED) */}
    <div className="bg-white/5 p-6 rounded-2xl border border-green-500/20 shadow-lg shadow-green-500/10 mb-8">
      <h2 className="text-2xl mb-4">📊 Election Results</h2>

      {Object.keys(results).length === 0 ? (
        <div className="text-center text-gray-400 py-6">
          No votes recorded yet
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
        <h2 className="text-xl mb-4">Bar Chart</h2>
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
        <h2 className="text-xl mb-4">Vote Distribution</h2>
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
          No votes yet
        </div>
      ) : (
        [...voters].reverse().map((v, index) => (
          <div
            key={index}
            className="flex justify-between p-3 rounded-xl bg-white/5 border border-white/10 mb-2"
          >
            <span>
              {v.nin.slice(0, 4)}****{v.nin.slice(-3)}
            </span>
            <span>{v.candidate}</span>
          </div>
        ))
      )}
    </div>

    {/* 👤 USERS */}
<div className="bg-white/5 p-6 rounded-2xl border border-white/10">
  <h2 className="text-2xl mb-4">
    👤 Registered Users ({users.length})
  </h2>

  {loadingUsers ? (
    <Loader />
  ) : users.length === 0 ? (
    <div className="text-center text-gray-400 py-6">
      No users registered yet
    </div>
  ) : (
    users.map((user) => (
      <div
        key={user._id || user.id}
        className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 mb-3 hover:bg-white/10 transition"
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
        </div>

        <button
          onClick={() => deleteUser(user._id || user.id)}
          className="bg-red-500/90 hover:bg-red-500 px-4 py-1 rounded-xl transition"
        >
          Delete
        </button>
      </div>
    ))
  )}
</div>

</div>
)};
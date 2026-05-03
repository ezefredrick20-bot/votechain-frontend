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
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [voters, setVoters] = useState([]);
  const [results, setResults] = useState({});
  const [isOpen, setIsOpen] = useState(true);
 const navigate = useNavigate();

const fetchVoters = async () => {
  const res = await fetch("https://votechain-backend-8m7f.onrender.com/voters");
  const data = await res.json();
  setVoters(data);
};

  // 🔍 Fetch results
  const fetchResults = async () => {
    const res = await fetch("https://votechain-backend-8m7f.onrender.com/results");
    const data = await res.json();
    setResults(data);
  };

  
useEffect(() => {
  const isAdmin = localStorage.getItem("admin");

  if (!isAdmin) {
    navigate("/admin-login");
  }
},);

 useEffect(() => {
  fetchResults();
  fetchVoters();

  
  const savedStatus = localStorage.getItem("electionOpen");
  if (savedStatus !== null) {
    setIsOpen(savedStatus === "true");
  }
}, []);

const toggleElection = async () => {
  const res = await fetch("https://votechain-backend-8m7f.onrender.com/toggle-election", {
    method: "POST",
  });

  const data = await res.json();

  alert(data.message);

  setIsOpen(data.status);

  localStorage.setItem("electionOpen", data.status);
};

  // 🧹 Reset election
  const resetVotes = async () => {
    const confirmReset = window.confirm("Are you sure?");
    if (!confirmReset) return;

    await fetch("https://votechain-backend-8m7f.onrender.com/reset-votes", {
      method: "DELETE",
    });

    alert("Votes cleared!");
    fetchResults();
  };

  const chartData = Object.keys(results).map((key) => ({
  name: key,
  votes: results[key],
}));

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

 return (
  <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-900 text-white p-6">

    <h1 className="text-4xl font-bold mb-8 text-center">
      🛠️ Admin Dashboard
    </h1>

    {/* STATUS */}
    <div className="flex justify-center mb-6">
      <span
        className={`px-6 py-2 rounded-full font-bold ${
          isOpen ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {isOpen ? "🟢 Election OPEN" : "🔴 Election CLOSED"}
      </span>
    </div>

    {/* ACTION BUTTONS */}
    <div className="flex justify-center gap-4 mb-10">
      <button
        onClick={toggleElection}
        className="bg-yellow-600 px-4 py-2 rounded"
      >
        {isOpen ? "Close Election" : "Open Election"}
      </button>

      <button
        onClick={resetVotes}
        className="bg-red-600 px-4 py-2 rounded"
      >
        Reset Election
      </button>
    </div>

    <button
  onClick={() => {
    localStorage.removeItem("admin");
    window.location.href = "/admin-login";
  }}
  className="bg-gray-600 mt-4 px-4 py-2 rounded"
>
  Logout
</button>

    {/* RESULTS */}
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg shadow-green-500/20 mb-8">
      <h2 className="text-2xl mb-4">📊 Results</h2>

      {Object.keys(results).length === 0 ? (
        <Loader />
      ) : (
        Object.keys(results).map((candidate) => (
          <div
            key={candidate}
            className="flex justify-between border-b border-gray-700 py-2"
          >
            <span>{candidate}</span>
            <span className="text-green-400">
              {results[candidate]} votes
            </span>
          </div>
        ))
      )}
    </div> {/* ✅ CLOSE RESULTS PROPERLY */}

    {/* CHARTS */}
    <div className="grid md:grid-cols-2 gap-6 mt-8 mb-8">

      {/* BAR CHART */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg shadow-green-500/20">
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

      {/* PIE CHART */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg shadow-green-500/20">
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

    {/* VOTERS */}
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg shadow-green-500/20">
      <h2 className="text-2xl mb-4">👥 Voters</h2>

      {[...voters].reverse().map((v, index) => (
        <div
          key={index}
          className="flex justify-between border-b border-gray-700 py-2"
        >
          <span>
            {v.nin.slice(0, 4)}****{v.nin.slice(-3)}
          </span>
          <span>{v.candidate}</span>
        </div>
      ))}
    </div>

  </div>
);
}
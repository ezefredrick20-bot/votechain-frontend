import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function ResultsPage() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("https://votechain-backend-8m7f.onrender.com/results")
    .then((res) => res.json())
    .then((votes) => {
      const formatted = Object.keys(votes).map((name) => ({
        name,
        votes: votes[name],
      }));
      setData(formatted);
      setLoading(false); // ✅ stop loading
    });
}, []);

if (loading) {
  return (
    <div className="text-white text-center mt-20 text-xl">
      Loading results...
    </div>
  );
}

  const totalVotes = data.reduce(
  (sum, item) => sum + item.votes,
  0
);

  return (
     <>
            <Navbar />
    <div className="flex justify-center items-center min-h-screen p-6">
      <GlassCard>
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Live Election Results
        </h1>

        <p className="text-white text-center mb-4">
          Total Votes: {totalVotes}
        </p>

        <div className="w-[500px] h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey="votes" fill="#22c55e" animationDuration={2000} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              localStorage.removeItem("votes");
              window.location.reload();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Reset Demo Votes
          </button>
        </div>
      </GlassCard>
    </div>
    </>
  );
}
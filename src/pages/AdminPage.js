import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const votes = JSON.parse(localStorage.getItem("votes") || "{}");

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-3xl text-white font-bold mb-6 text-center">
        Admin Panel
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.keys(votes).map((name) => (
          <GlassCard key={name}>
            <h2 className="text-white text-xl">{name}</h2>
            <p className="text-green-400 text-2xl">{votes[name]} votes</p>
          </GlassCard>
        ))}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("votes");
          alert("Votes reset");
          window.location.reload();
        }}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl"
      >
        Reset Votes
      </button>
    </div>
  );
}
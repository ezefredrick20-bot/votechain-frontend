import candidates from "../data/candidates";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GlassCard from "../components/GlassCard";

export default function VotingPage() {
  const [selected, setSelected] = useState(null);
   const navigate = useNavigate();

const [isConnecting, setIsConnecting] = useState(false);
const [isOpen, setIsOpen] = useState(true);

useEffect(() => {
  const savedStatus = localStorage.getItem("electionOpen");

  if (savedStatus !== null) {
    setIsOpen(savedStatus === "true");
  }
}, []);

useEffect(() => {
  const fetchStatus = async () => {
    try {
      const res = await fetch("https://votechain-backend-8m7f.onrender.com/election-status");
      const data = await res.json();
      setIsOpen(data.isOpen);
    } catch (error) {
      console.error("Error fetching election status:", error);
    }
  };

  fetchStatus();
}, []);

const connectWallet = async () => {
  if (isConnecting) return;

  setIsConnecting(true);

  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      localStorage.setItem("wallet", accounts[0]);
      alert("Wallet connected: " + accounts[0]);

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  } else {
    alert("Please install MetaMask");
  }

  setIsConnecting(false);
};

 return (
  <>
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-900 p-6">
    <div className="max-w-6xl mx-auto">

      {/* 🔥 HEADER */}
      <h1 className="text-4xl text-white font-bold mb-6 text-center">
        Cast Your Vote
      </h1>

      {/* 🔗 WALLET */}
      <div className="flex justify-center mb-6">
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      </div>

      {/* 🏛️ CATEGORY (UI ONLY) */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {["Presidential", "Student Union", "National Assembly"].map((type) => (
          <button
            key={type}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
          >
            {type}
          </button>
        ))}
      </div>

      <div className="text-center mb-6">
      <span
       className={`px-4 py-2 rounded-full font-semibold ${
       isOpen ? "bg-green-600" : "bg-red-600"
    }`}
      >
    {isOpen ? "🟢 Election Open" : "🔴 Election Closed"}
      </span>
      </div>

      {/* 🧑‍🤝‍🧑 CANDIDATES */}
      <div className="grid md:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <GlassCard key={candidate.id}>

            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-64 object-cover rounded-2xl mb-4"
            />

            <div className="flex items-center gap-3 mb-4">
              <img
                src={candidate.logo}
                alt={candidate.party}
                className="w-10 h-10 rounded-full bg-white p-1"
              />

              <div>
                <h2 className="text-xl font-bold text-white">
                  {candidate.name}
                </h2>
                <p className="text-gray-300 text-sm">
                  {candidate.party}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-4 line-clamp-3">
              {candidate.manifesto}
            </p>

            <button
              onClick={() => setSelected(candidate.id)}
              className={`w-full py-3 rounded-xl font-semibold transition transform hover:scale-105 mb-3 ${
                selected === candidate.id
                  ? "bg-green-500 text-white"
                  : "bg-slate-700 text-gray-200 hover:bg-slate-600"
              }`}
            >
              {selected === candidate.id ? "✓ Selected" : "Select Candidate"}
            </button>

          </GlassCard>
        ))}
      </div>

{selected && (
  <p className="text-center text-green-400 mb-4">
    Selected Candidate:{" "}
    <span className="font-bold">
      {candidates.find(c => c.id === selected)?.name}
    </span>
  </p>
)}

      {/* ✅ CONTINUE BUTTON */}
      <div className="max-w-md mx-auto mt-10">
        <button
  onClick={() => {

    // 🚫 BLOCK IF ELECTION CLOSED
    if (!isOpen) {
      alert("Election is currently closed");
      return;
    }

    if (selected) {
      const chosenCandidate = candidates.find(
        (candidate) => candidate.id === selected
      );

      navigate("/review", {
        state: {
          candidate: chosenCandidate,
        },
      });
    } else {
      alert("Please select a candidate.");
    }
  }}
        className="w-full py-4 rounded-2xl font-bold text-lg bg-green-600 hover:bg-green-700 text-white transition transform hover:scale-105"
           >
            Continue to Review Vote
            </button>
      </div>

    </div>
  </div>

  </>
);
}
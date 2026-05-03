import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const userNIN = localStorage.getItem("userNIN");

  useEffect(() => {
    const savedStatus = localStorage.getItem("electionOpen");

    if (savedStatus !== null) {
      setIsOpen(savedStatus === "true");
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-900 text-white p-6">

        {/* 🔥 HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Welcome to VoteChain
          </h1>

          <p className="text-gray-400 mt-2">
            Secure Blockchain-Based E-Voting System
          </p>
        </div>

        {/* 👤 USER INFO */}
        <div className="bg-slate-800 p-4 rounded-xl max-w-md mx-auto mb-8 text-center">
          <p className="text-gray-400">Logged in as</p>
          <p className="text-green-400 break-all">
            {userNIN}
          </p>
        </div>

        {/* 🟢 ELECTION STATUS */}
        <div className="text-center mb-8">
          <span
            className={`px-6 py-2 rounded-full font-bold ${
              isOpen ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isOpen ? "🟢 Election Open" : "🔴 Election Closed"}
          </span>
        </div>

        {/* 🚀 ACTION CARDS */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* 🗳️ VOTE */}
          <div
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 p-6 rounded-2xl cursor-pointer text-center transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-2">🗳️ Vote</h2>
            <p>Cast your vote securely</p>
          </div>

          {/* 📊 RESULTS */}
          <div
            onClick={() => navigate("/results")}
            className="bg-blue-600 hover:bg-blue-700 p-6 rounded-2xl cursor-pointer text-center transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-2">📊 Results</h2>
            <p>View live election results</p>
          </div>

          {/* ⛓️ BLOCKCHAIN */}
          <div
            onClick={() => navigate("/transactions")}
            className="bg-purple-600 hover:bg-purple-700 p-6 rounded-2xl cursor-pointer text-center transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-2">⛓️ Blockchain</h2>
            <p>View transaction history</p>
          </div>

        </div>

        <div
  onClick={() => navigate("/about")}
  className="bg-slate-700 hover:bg-slate-600 p-6 rounded-2xl cursor-pointer transition transform hover:scale-105"
>
  <h2 className="text-xl font-bold text-white mb-2">📘 About</h2>
  <p className="text-gray-300 text-sm">
    Learn how the system works and its security features
  </p>
</div>

        {/* 🚪 LOGOUT */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>

      </div>
    </>
  );
}
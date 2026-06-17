import candidates from "../data/candidates";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VotingPage() {
  const [selected, setSelected] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          "https://votechain-backend-8m7f.onrender.com/election-status"
        );
        const data = await res.json();
        setIsOpen(data.isOpen);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatus();
  }, []);

  // 🔗 Wallet connect
  const connectWallet = async () => {
    if (isConnecting) return;

    setIsConnecting(true);

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        localStorage.setItem("wallet", accounts[0]);
        alert("Wallet connected ✅");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Install MetaMask");
    }

    setIsConnecting(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 text-black px-4 py-6">
        <div className="max-w-6xl mx-auto">

          {/* 🏛️ HEADER (INEC STYLE) */}
          <div className="bg-green-800 text-white p-6 rounded-2xl mb-6 text-center shadow">
            <h1 className="text-3xl font-bold">Official Ballot Paper</h1>
            <p className="text-sm opacity-80">
              Federal Republic of Nigeria — Digital Voting System
            </p>
          </div>

          {/* 🟢 STATUS */}
          <div className="text-center mb-6">
            <span
              className={`px-4 py-2 rounded-full font-semibold ${
                isOpen ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {isOpen ? "🟢 Election Open" : "🔴 Election Closed"}
            </span>
          </div>

          {/* 🔗 WALLET */}
          <div className="flex justify-center mb-8">
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>

          {/* 🗳️ BALLOT GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => setSelected(candidate.id)}
                className={`border-2 rounded-2xl p-5 cursor-pointer transition ${
                  selected === candidate.id
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300 bg-white hover:border-green-400"
                }`}
              >
                <div className="flex items-center gap-4">

                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />

                  <div>
                    <h2 className="text-lg font-bold">
                      {candidate.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {candidate.party}
                    </p>
                  </div>

                </div>

                {/* SELECT INDICATOR */}
                <div className="mt-4 text-right">
                  {selected === candidate.id ? (
                    <span className="text-green-600 font-bold">
                      ✔ Selected
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Tap to select
                    </span>
                  )}
                </div>
              </div>
            ))}

          </div>

          {/* SELECTED */}
          {selected && (
            <p className="text-center text-green-700 mt-6 font-semibold">
              Selected:{" "}
              {candidates.find(c => c.id === selected)?.name}
            </p>
          )}

          {/* CONTINUE */}
          <div className="max-w-md mx-auto mt-10">
            <button
              onClick={() => {
                if (!isOpen) {
                  alert("Election is closed");
                  return;
                }

                if (!selected) {
                  alert("Select a candidate");
                  return;
                }

                const chosen = candidates.find(
                  (c) => c.id === selected
                );

                navigate("/review", {
                  state: { candidate: chosen },
                });
              }}
              className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold"
            >
              Proceed to Review
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
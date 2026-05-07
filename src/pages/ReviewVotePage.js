import GlassCard from "../components/GlassCard";
import PageWrapper from "../components/PageWrapper";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ReviewVotePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const candidate = location.state?.candidate;
  const userNIN = localStorage.getItem("userNIN");

  useEffect(() => {
    if (!candidate) navigate("/");
  }, [candidate, navigate]);

  if (!candidate) return null;

  const handleConfirmVote = async () => {
    setLoading(true);

    try {
      const wallet = localStorage.getItem("wallet");

      if (!wallet) {
        alert("Please connect wallet first");
        setLoading(false);
        return;
      }

      await window.ethereum.request({
        method: "personal_sign",
        params: [`Vote for ${candidate.name}`, wallet],
      });

      const res = await fetch(`${process.env.REACT_APP_API_URL}/vote`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          candidate: candidate.name,
          nin: userNIN,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        setLoading(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/home");
      }, 2500);

    } catch (err) {
      alert("Vote failed or rejected");
    }

    setLoading(false);
  };

  return (
    <PageWrapper>

      {success ? (
        <div className="max-w-md mx-auto bg-green-900/40 border border-green-500 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            ✅ Vote Successfully Cast
          </h2>

          <p className="text-gray-300 text-sm">
            Your vote has been securely recorded and cannot be altered.
          </p>

          <div className="mt-6 text-xs text-gray-400">
            Transaction secured on blockchain
          </div>
        </div>
      ) : (

        <div className="max-w-xl mx-auto">

          <GlassCard>

            {/* HEADER */}
            <h1 className="text-2xl font-bold text-center mb-6">
              🗳️ Confirm Your Vote
            </h1>

            {/* VOTER INFO */}
            <div className="bg-slate-800 p-4 rounded-xl mb-5 text-sm">
              <p className="text-gray-400">Voter ID (NIN)</p>
              <p className="text-green-400 font-semibold">
                {userNIN?.slice(0,4)}****{userNIN?.slice(-3)}
              </p>
            </div>

            {/* CANDIDATE */}
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            <div className="flex items-center gap-3 mb-5">
              <img
                src={candidate.logo}
                alt={candidate.party}
                className="w-12 h-12 bg-white rounded-full p-1"
              />
              <div>
                <h2 className="text-xl font-bold">{candidate.name}</h2>
                <p className="text-gray-400 text-sm">{candidate.party}</p>
              </div>
            </div>

            {/* WARNING */}
            <div className="bg-yellow-900/30 border border-yellow-500 p-3 rounded-xl text-sm mb-6">
              ⚠️ Once submitted, this vote cannot be changed.
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl"
              >
                Go Back
              </button>

              <button
                onClick={handleConfirmVote}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl"
              >
                {loading ? "Submitting..." : "Confirm Vote"}
              </button>
            </div>

          </GlassCard>

        </div>
      )}

    </PageWrapper>
  );
}
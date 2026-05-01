import GlassCard from "../components/GlassCard";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ReviewVotePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [success, setSuccess] = useState(false);

  const candidate = location.state?.candidate;

  if (!candidate) {
    navigate("/");
    return null;
  }


 const handleConfirmVote = async () => {
  setLoading(true); // ✅ START LOADING

  try {
    const wallet = localStorage.getItem("wallet");

    if (!wallet) {
      alert("Please connect wallet first");
      setLoading(false);
      return;
    }

    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [`Vote for ${candidate.name}`, wallet],
    });

    localStorage.setItem("lastSignature", signature);

    const fakeTxHash =
      "0x" + Math.random().toString(16).substring(2, 66);

    localStorage.setItem("lastTransactionHash", fakeTxHash);

    const response = await fetch("https://votechain-backend-8m7f.onrender.com/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidate: candidate.name,
        nin: localStorage.getItem("userNIN"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      setLoading(false);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);

  } catch (error) {
    console.error(error);
    alert("Vote failed or rejected");
  }

  setLoading(false); // ✅ END LOADING
};

 return (
   <>
          <Navbar />
  <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-900 flex items-center justify-center p-6">
    
    {/* SUCCESS SCREEN */}
    {success ? (
      <div className="bg-green-900 p-8 rounded-2xl text-center animate-bounce">
        <h2 className="text-3xl text-green-400 font-bold mb-4">
          ✅ Vote Successful!
        </h2>
        <p className="text-white">
          Your vote has been securely recorded on the system.
        </p>
      </div>
    ) : (
      
      <GlassCard className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Review Your Vote
        </h1>

        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-full h-72 object-cover rounded-2xl mb-5"
        />

        <div className="flex items-center gap-4 mb-6">
          <img
            src={candidate.logo}
            alt={candidate.party}
            className="w-12 h-12 rounded-full bg-white p-1"
          />

          <div>
            <h2 className="text-2xl font-bold text-white">
              {candidate.name}
            </h2>
            <p className="text-gray-300">{candidate.party}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 mb-6">
          <p className="text-gray-400 text-sm mb-2">
            You are about to cast your vote for:
          </p>
          <p className="text-xl text-green-400 font-semibold">
            {candidate.name}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold"
          >
            Go Back
          </button>

          <button
  onClick={handleConfirmVote}
  disabled={loading}
  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
>
  {loading ? "Submitting Vote..." : "Confirm Vote"}
</button>
        </div>
      </GlassCard>
    )}
  </div>
  </>
);
}
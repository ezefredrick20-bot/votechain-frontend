import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [nin, setNin] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!/^\d{11}$/.test(nin) || !/^\d{11}$/.test(phone)) {
      alert("Phone and NIN must be exactly 11 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nin, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
      } else {
        localStorage.setItem("userNIN", data.user.nin);
        navigate("/home");
      }

    } catch (err) {
      alert("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          🏛️ VoteChain Portal
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Secure Voter Login
        </p>

        <div className="space-y-4">

          <input
            placeholder="Enter NIN"
            value={nin}
            onChange={(e) => setNin(e.target.value)}
            maxLength={11}
            className="w-full p-3 rounded-xl bg-slate-800 focus:ring-2 focus:ring-green-500"
          />

          <input
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={11}
            className="w-full p-3 rounded-xl bg-slate-800 focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6">
          No account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-400 cursor-pointer"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}
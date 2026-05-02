import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [nin, setNin] = useState("");
  const [phone, setPhone] = useState(""); // ✅ NEW
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = async () => {
  if (!/^\d{11}$/.test(nin) || !/^\d{11}$/.test(phone)) {
    alert("Phone and NIN must be exactly 11 digits");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nin, phone }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
    } else {
      localStorage.setItem("userNIN", data.user.nin);
      alert("Login successful ✅");
      navigate("/home");
    }

  } catch (error) {
    console.error(error);
    alert("Login failed");
  }

  setLoading(false);
};

 return (
  <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-900 flex items-center justify-center p-6">
    
    <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10 w-full max-w-md">
      
      {/* 🏛️ APP TITLE */}
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        E-Voting System
      </h1>

      <p className="text-gray-400 text-center mb-6">
        Secure Login Portal
      </p>

      {/* 🔐 FORM */}
      <div className="space-y-4">

        {/* NIN */}
        <div>
          <label className="text-gray-300 text-sm">National ID Number (NIN)</label>
          <input
            type="text"
            placeholder="Enter 11-digit NIN"
            value={nin}
            onChange={(e) => setNin(e.target.value)}
            maxLength={11}
            className="w-full mt-1 p-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-gray-300 text-sm">Phone Number</label>
          <input
            type="text"
            placeholder="Enter 11-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={11}
            className="w-full mt-1 p-3 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
         onClick={handleLogin}
         disabled={loading}
         className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
         {loading ? "Logging in..." : "Login"}
       </button>
      </div>

      {/* 🔗 REGISTER */}
      <p className="text-gray-400 text-center mt-6">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-green-400 cursor-pointer hover:underline"
        >
          Register here
        </span>
      </p>

    </div>
  </div>
);
}
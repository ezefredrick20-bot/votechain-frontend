import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ElectionBackground from "../components/ElectionBackground";
import LiveClock from "../components/LiveClock";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";


export default function LoginPage() {
  const [nin, setNin] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!/^\d{11}$/.test(nin) || !/^\d{11}$/.test(phone)) {
      toast("Phone and NIN must be exactly 11 digits");
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
       toast(data.error);
      } else {
        localStorage.setItem("userNIN", data.user.nin);
        localStorage.setItem(
"userFirstName",
data.user.firstName
);
        navigate("/home");
      }

    } catch (err) {
   toast.error("Invalid Login Credentials");
    }

    setLoading(false);
  };

 return (

<PageTransition>

<ElectionBackground>

<div className="min-h-screen flex">

{/* LEFT PANEL */}

<div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-20">

<h1 className="text-6xl font-black text-white">

🏛 VoteChain

</h1>

<h2 className="text-3xl text-green-400 mt-6 font-bold">

Blockchain Electoral Framework

</h2>

<p className="text-gray-300 text-lg mt-8 leading-8">

VoteChain provides secure, transparent and tamper-proof electronic voting using blockchain technology and MetaMask wallet authentication.

</p>

<div className="mt-10 bg-green-500/10 border border-green-500/30 rounded-2xl p-5">

<h3 className="text-green-400 font-bold text-xl">

🟢 Blockchain Network

</h3>

<div className="mt-4 space-y-3">

<div className="flex justify-between">

<span className="text-gray-400">

Network

</span>

<span className="text-white">

Ethereum

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">

Authentication

</span>

<span className="text-green-400">

NIN + MetaMask

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">

Vote Integrity

</span>

<span className="text-green-400">

100%

</span>

</div>

</div>

</div>

<div className="mt-12 space-y-5">

<div className="flex items-center gap-4">

<div className="text-3xl">🔐</div>

<div>

<h3 className="text-white font-semibold">

Secure Authentication

</h3>

<p className="text-gray-400">

NIN verification protects voter identity.

</p>

</div>

</div>

<div className="flex items-center gap-4">

<div className="text-3xl">💳</div>

<div>

<h3 className="text-white font-semibold">

MetaMask Wallet

</h3>

<p className="text-gray-400">

Wallet signatures verify every vote.

</p>

</div>

</div>

<div className="flex items-center gap-4">

<div className="text-3xl">⛓️</div>

<div>

<h3 className="text-white font-semibold">

Blockchain Security

</h3>

<p className="text-gray-400">

Votes cannot be altered after submission.

</p>

</div>

</div>

<div className="flex items-center gap-4">

<div className="text-3xl">📊</div>

<div>

<h3 className="text-white font-semibold">

Live Election Results

</h3>

<p className="text-gray-400">

Results update automatically after voting.

</p>

</div>

</div>

</div>

</div>

{/* RIGHT PANEL */}

<div className="flex-1 flex items-center justify-center px-6">

<div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-green-500/20 rounded-3xl shadow-2xl p-10">

<div className="text-center">

<h2 className="text-4xl font-bold text-white">

Welcome Back

</h2>

<LiveClock />

<p className="text-gray-400 mt-3">

Login to continue your secure voting session.

</p>

</div>

<div className="mt-10 space-y-5">

<input

placeholder="National Identification Number"

value={nin}

onChange={(e)=>setNin(e.target.value)}

maxLength={11}

className="w-full rounded-xl bg-slate-800 px-5 py-4 text-white focus:ring-2 focus:ring-green-500"

/>

<input

placeholder="Phone Number"

value={phone}

onChange={(e)=>setPhone(e.target.value)}

maxLength={11}

className="w-full rounded-xl bg-slate-800 px-5 py-4 text-white focus:ring-2 focus:ring-green-500"

/>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={handleLogin}

disabled={loading}

className="
w-full
bg-gradient-to-r
from-green-600
to-emerald-500
hover:scale-105
duration-300
py-4
rounded-xl
font-semibold
text-lg
shadow-lg
"

>

{

loading

?

"Logging in..."

:

"🔐 Secure Login"

}

</motion.button>

<div className="mt-6 text-center">

<p className="text-green-400 text-sm">

🔒 Your credentials are securely encrypted

</p>

</div>

</div>

<p className="text-center text-gray-400 mt-8">

Don't have an account?

<span

onClick={()=>navigate("/register")}

className="ml-2 text-green-400 cursor-pointer font-semibold"

>

Register

</span>

</p>

<p className="text-center text-gray-600 mt-8 text-xs">

VoteChain v1.0 • Blockchain Electoral Framework

</p>

</div>

</div>

</div>

</ElectionBackground>

</PageTransition>

);
}
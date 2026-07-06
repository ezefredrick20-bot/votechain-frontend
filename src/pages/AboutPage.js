import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import GlassCard from "../components/GlassCard";
import ElectionBackground from "../components/ElectionBackground";
import PageTransition from "../components/PageTransition";


export default function AboutPage() {
  return (

<PageTransition>

<ElectionBackground>


<div className="
min-h-screen
w-full
flex
flex-col
text-white
">



      {/* 🔝 INEC STYLE TOP BAR */}
      <TopBar />

      {/* 🧭 NAVBAR */}
      <Navbar />

     <div className="px-6 md:px-10 py-12">

<div className="max-w-7xl mx-auto">

{/* HERO */}

<div className="text-center mb-20">

<div className="inline-block px-6 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-semibold">

🇳🇬 Federal Republic of Nigeria

</div>

<h1 className="text-6xl font-black mt-8">

🏛 VoteChain

</h1>

<h2 className="text-3xl text-green-400 mt-5 font-bold">

Blockchain Electoral Framework

</h2>

<p className="max-w-4xl mx-auto mt-8 text-gray-300 text-lg leading-8">

VoteChain is a secure blockchain-powered electronic voting platform designed to deliver transparent, immutable and verifiable elections through blockchain technology and MetaMask authentication.

</p>

</div>

{/* MISSION & VISION */}

<div className="grid md:grid-cols-2 gap-8 mb-20">

<GlassCard>

<h2 className="text-3xl text-green-400 font-bold">

🎯 Mission

</h2>

<p className="mt-6 leading-8">

To provide citizens with a transparent, secure and tamper-proof voting platform where every vote can be verified on blockchain.

</p>

</GlassCard>

<GlassCard>

<h2 className="text-3xl text-blue-400 font-bold">

🚀 Vision

</h2>

<p className="mt-6 leading-8">

To modernize democratic elections through blockchain technology while eliminating electoral fraud and increasing public trust.

</p>

</GlassCard>

</div>

{/* HOW IT WORKS */}

<div className="mb-24">

<h2 className="text-4xl font-bold text-center mb-12">

How VoteChain Works

</h2>

<div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">

<div>

<div className="text-6xl">📝</div>

<p className="mt-4">

Register

</p>

</div>

<div>

<div className="text-6xl">🔐</div>

<p className="mt-4">

Login

</p>

</div>

<div>

<div className="text-6xl">💳</div>

<p className="mt-4">

Wallet

</p>

</div>

<div>

<div className="text-6xl">🗳️</div>

<p className="mt-4">

Vote

</p>

</div>

<div>

<div className="text-6xl">✍️</div>

<p className="mt-4">

Sign

</p>

</div>

<div>

<div className="text-6xl">📊</div>

<p className="mt-4">

Results

</p>

</div>

</div>

</div>

{/* FEATURES */}

<h2 className="text-4xl text-center font-bold mb-12">

Security Features

</h2>

<div className="grid md:grid-cols-3 gap-8 mb-20">

<GlassCard>

<h2 className="text-green-400 font-bold text-xl">

🔒 Blockchain Security

</h2>

<p className="mt-4">

Every vote is permanently stored and cannot be altered.

</p>

</GlassCard>

<GlassCard>

<h2 className="text-green-400 font-bold text-xl">

🪪 NIN Verification

</h2>

<p className="mt-4">

Only eligible citizens are allowed to vote once.

</p>

</GlassCard>

<GlassCard>

<h2 className="text-green-400 font-bold text-xl">

💳 MetaMask Authentication

</h2>

<p className="mt-4">

Every vote is digitally signed using Ethereum wallets.

</p>

</GlassCard>

<GlassCard>

<h2 className="text-green-400 font-bold text-xl">

📊 Live Results

</h2>

<p className="mt-4">

Election results update automatically.

</p>

</GlassCard>

<GlassCard>

<h2 className="text-green-400 font-bold text-xl">

⛓ Immutable Records

</h2>

<p className="mt-4">

Votes cannot be edited after confirmation.

</p>

</GlassCard>

<GlassCard>

<h2 className="text-green-400 font-bold text-xl">

🛡 Transparent Elections

</h2>

<p className="mt-4">

Every blockchain transaction can be independently verified.

</p>

</GlassCard>

</div>

{/* TECHNOLOGY */}

<div className="mb-20">

<h2 className="text-4xl text-center font-bold mb-12">

Technology Stack

</h2>

<div className="grid grid-cols-2 md:grid-cols-6 gap-6">

{["React","Node.js","Express","MongoDB","Ethereum","MetaMask"].map((tech)=>(

<div

key={tech}

className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition"

>

<h2 className="font-bold">

{tech}

</h2>

</div>

))}

</div>

</div>

{/* PROJECT INFO */}

<GlassCard>

<h2 className="text-3xl text-green-400 font-bold mb-8">

Project Information

</h2>

<div className="space-y-5">

<div className="flex justify-between">

<span className="text-gray-400">

Project

</span>

<span>

Blockchain Electoral Framework

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">

Developer

</span>

<span>

Fredrick Eze

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">

Department

</span>

<span>

Computer Science

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">

Academic Session

</span>

<span>

2025 / 2026

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">

Version

</span>

<span>

1.0

</span>

</div>

</div>

</GlassCard>

</div>

</div>

      {/* FOOTER */}
     <footer
className="
w-full
bg-green-700
text-white
text-center
py-4
"
>

© 2026 VoteChain — Powered for Secure Elections

</footer>



</div>


</ElectionBackground>

</PageTransition>

);
}
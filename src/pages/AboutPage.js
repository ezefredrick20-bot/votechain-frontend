import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import GlassCard from "../components/GlassCard";
import ElectionBackground from "../components/ElectionBackground";

export default function AboutPage() {
  return (

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

      <div className="px-4 md:px-10 py-10">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">
            About VoteChain
          </h1>
          <p className="text-gray-500 mt-2">
            Secure, Transparent and Modern Digital Voting System
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

          <GlassCard>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Project Overview
            </h2>
            <p>
              VoteChain is a blockchain-powered e-voting system designed to solve
              major electoral problems in Nigeria such as vote rigging, result
              manipulation, and lack of transparency. It ensures secure and
              verifiable voting for all citizens.
            </p>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Objectives
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure tamper-proof voting</li>
              <li>Prevent multiple voting using NIN</li>
              <li>Provide real-time election results</li>
              <li>Increase trust in elections</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Key Features
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Wallet-based authentication</li>
              <li>One-person-one-vote enforcement</li>
              <li>Live result tracking</li>
              <li>Blockchain vote verification</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Technologies
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>React.js</li>
              <li>Node.js (Express)</li>
              <li>MongoDB</li>
              <li>Web3 + MetaMask</li>
            </ul>
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
);
}
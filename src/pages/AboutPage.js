import GlassCard from "../components/GlassCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">
      <h1 className="text-4xl text-white font-bold text-center mb-8">
        📘 About VoteChain
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">

        {/* PROJECT OVERVIEW */}
        <GlassCard>
          <h2 className="text-2xl text-green-400 mb-3 font-semibold">
            Project Overview
          </h2>
          <p className="text-gray-300">
            VoteChain is a decentralized and transparent electoral framework
            designed to improve the integrity of voting systems using blockchain
            principles. It eliminates fraud, ensures accountability, and enhances
            trust in the electoral process.
          </p>
        </GlassCard>

        {/* OBJECTIVES */}
        <GlassCard>
          <h2 className="text-2xl text-green-400 mb-3 font-semibold">
            Objectives
          </h2>
          <ul className="text-gray-300 list-disc pl-6 space-y-2">
            <li>Ensure secure and tamper-proof voting</li>
            <li>Prevent multiple voting using unique NIN</li>
            <li>Provide transparency through public result viewing</li>
            <li>Enable decentralized participation via wallet verification</li>
          </ul>
        </GlassCard>

        {/* FEATURES */}
        <GlassCard>
          <h2 className="text-2xl text-green-400 mb-3 font-semibold">
            Key Features
          </h2>
          <ul className="text-gray-300 list-disc pl-6 space-y-2">
            <li>🔐 MetaMask wallet authentication</li>
            <li>🧾 Digital vote signature</li>
            <li>🗳️ One-person-one-vote system</li>
            <li>📊 Real-time election results</li>
            <li>🛠️ Admin control panel</li>
          </ul>
        </GlassCard>

        {/* TECHNOLOGY */}
        <GlassCard>
          <h2 className="text-2xl text-green-400 mb-3 font-semibold">
            Technologies Used
          </h2>
          <ul className="text-gray-300 list-disc pl-6 space-y-2">
            <li>Frontend: React.js</li>
            <li>Backend: Node.js with Express</li>
            <li>Database: MongoDB</li>
            <li>Blockchain Interaction: MetaMask (Web3)</li>
          </ul>
        </GlassCard>

        {/* TRANSPARENCY */}
        <GlassCard>
          <h2 className="text-2xl text-green-400 mb-3 font-semibold">
            Transparency & Security
          </h2>
          <p className="text-gray-300">
            The system ensures transparency by allowing users to view election
            results while maintaining strict security controls to prevent
            unauthorized access or manipulation. Each vote is verified and
            recorded securely.
          </p>
        </GlassCard>

      </div>
    </div>
  );
}
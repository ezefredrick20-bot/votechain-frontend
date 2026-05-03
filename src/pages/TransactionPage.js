import GlassCard from "../components/GlassCard";

export default function TransactionPage() {
  const txHash = localStorage.getItem("lastTransactionHash");

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-3xl text-white font-bold text-center mb-8">
        Blockchain Transaction Viewer
      </h1>

      <div className="max-w-3xl mx-auto">
        <GlassCard>
          <h2 className="text-white text-xl mb-4">
            Latest Transaction
          </h2>

          <p className="text-green-400 break-all mb-4">
            {txHash || "No transaction found"}
          </p>

          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Status:</p>
            <p className="text-green-500 font-bold">
              Confirmed ✅
            </p>

            <p className="text-gray-400 text-sm mt-4">Network:</p>
            <p className="text-white">Ethereum (Simulated)</p>

            <p className="text-gray-400 text-sm mt-4">Gas Fee:</p>
            <p className="text-white">0.002 ETH</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
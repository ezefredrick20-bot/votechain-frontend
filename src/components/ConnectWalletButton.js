import { useState } from "react";

export default function ConnectWalletButton() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWalletAddress(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
    } catch (error) {
      console.error(error);
      alert("Failed to connect wallet.");
    }
  };

  return (
    <div className="w-full">
      {walletAddress ? (
        <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 text-green-300 text-center break-all">
          Connected: {walletAddress}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Connect MetaMask Wallet
        </button>
      )}
    </div>
  );
}

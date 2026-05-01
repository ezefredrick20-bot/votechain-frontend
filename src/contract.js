import { ethers } from "ethers";

const contractAddress = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "candidate",
        type: "string",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  // ✅ Request account access FIRST
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // ✅ Correct provider
  const provider = new ethers.BrowserProvider(window.ethereum);

  // ✅ Correct signer
  const signer = await provider.getSigner();

  // ✅ Contract instance
  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return contract;
};
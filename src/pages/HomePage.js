import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";

export default function HomePage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const userNIN = localStorage.getItem("userNIN");

  useEffect(() => {
    const savedStatus = localStorage.getItem("electionOpen");

    if (savedStatus !== null) {
      setIsOpen(savedStatus === "true");
    }
  }, []);

  return (
    <PageWrapper>

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          🏛️ VoteChain Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Secure Digital Voting Portal
        </p>
      </div>

      {/* INFO CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* USER */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
          <p className="text-gray-400 text-sm">
            Logged in as
          </p>

          <p className="text-green-400 font-semibold mt-1 break-all">
            {userNIN}
          </p>
        </div>

        {/* STATUS */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-center">
          <span
            className={`px-5 py-2 rounded-full text-sm font-semibold ${
              isOpen ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isOpen
              ? "🟢 Election Open"
              : "🔴 Election Closed"}
          </span>
        </div>

      </div>

      {/* ACTION GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <ActionCard
          title="🗳️ Vote"
          desc="Cast your vote securely"
          color="bg-green-600 hover:bg-green-700"
          onClick={() => navigate("/")}
        />

        <ActionCard
          title="📊 Results"
          desc="View live results"
          color="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/results")}
        />

        <ActionCard
          title="⛓️ Blockchain"
          desc="View transactions"
          color="bg-purple-600 hover:bg-purple-700"
          onClick={() => navigate("/transactions")}
        />

      </div>

      {/* ABOUT */}
      <div
        onClick={() => navigate("/about")}
        className="bg-white/5 p-6 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition"
      >
        <h2 className="font-bold mb-2">
          📘 About VoteChain
        </h2>

        <p className="text-gray-400 text-sm">
          Learn how blockchain ensures transparency
          and security in elections.
        </p>
      </div>

      {/* LOGOUT */}
      <div className="text-center mt-10">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"
        >
          Logout
        </button>
      </div>

      {/* ADMIN ACCESS */}
      <div className="text-center mt-6">
        <p
          onClick={() => navigate("/admin-login")}
          className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition"
        >
          Admin Access
        </p>
      </div>

    </PageWrapper>
  );
}

/* 🔥 REUSABLE ACTION CARD */
function ActionCard({ title, desc, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} p-6 rounded-2xl text-center cursor-pointer transition hover:scale-[1.03]`}
    >
      <h2 className="text-xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-sm">
        {desc}
      </p>
    </div>
  );
}
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const wallet = localStorage.getItem("wallet");
  const userNIN = localStorage.getItem("userNIN");

  const isOpen = localStorage.getItem("electionOpen") === "true";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const active = (path) =>
    location.pathname === path ? "text-green-400 font-bold" : "text-white";

  return (
    <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
      
      {/* 🔥 APP NAME */}
      <div
  onClick={() => navigate("/home")}
  className="flex items-center gap-2 cursor-pointer"
>
  <img
    src={require("../assets/logo.png")}
    alt="logo"
    className="w-8 h-8"
  />

  <h1 className="text-2xl font-bold text-green-400">
    VoteChain
  </h1>
</div>

      {/* 🔗 NAV LINKS */}
      <div className="flex gap-6 items-center">
        <button onClick={() => navigate("/home")} className={active("/home")}>
          Home
        </button>

        <button onClick={() => navigate("/")} className={active("/")}>
          Vote
        </button>

        <button onClick={() => navigate("/results")} className={active("/results")}>
          Results
        </button>

        <button onClick={() => navigate("/admin-login")} className="text-red-400">
          Admin
        </button>
      </div>

      {/* 👤 USER INFO */}
      <div className="text-sm text-right space-y-1">
        <p className="text-gray-300">
          NIN: {userNIN ? userNIN.slice(0, 4) + "****" : "Guest"}
        </p>

        <p className="text-green-400">
          {wallet ? wallet.slice(0, 6) + "..." : "No Wallet"}
        </p>

        {/* 🟢 ELECTION STATUS */}
        <p className={isOpen ? "text-green-500" : "text-red-500"}>
          {isOpen ? "🟢 Election Open" : "🔴 Election Closed"}
        </p>

        {/* 🚪 LOGOUT */}
        <button
          onClick={logout}
          className="text-red-400 text-xs hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
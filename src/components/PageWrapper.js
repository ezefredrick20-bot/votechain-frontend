import Navbar from "./Navbar";
import TopBar from "./TopBar";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">

      {/* 🔝 INEC-STYLE TOP INFO BAR */}
      <TopBar />

      {/* 🧭 NAVBAR */}
      <Navbar />

      {/* 📄 PAGE CONTENT (THIS FIXES YOUR SPACE ISSUE) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        {children}
      </main>

      {/* 📉 FOOTER */}
      <footer className="text-center text-gray-500 text-xs py-4 border-t border-slate-800">
        © 2026 VoteChain — Secure Digital Voting System
      </footer>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
  try {
    const res = await fetch("https://votechain-backend-8m7f.onrender.com/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    console.log("Response:", data); // 🔍 debug

    if (!res.ok) {
      alert(data.error);
    } else {
      // ✅ SAVE ADMIN SESSION
      localStorage.setItem("admin", "true");

      alert("Admin login successful ✅");

      // ✅ NAVIGATE TO DASHBOARD
      navigate("/admin-dashboard");
    }

  } catch (error) {
    console.error(error);
    alert("Admin login failed");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-white text-xl mb-4">Admin Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 mb-2"
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-2"
      />

      <button onClick={handleAdminLogin} className="bg-red-600 p-2 text-white">
        Login as Admin
      </button>
    </div>
  );
}
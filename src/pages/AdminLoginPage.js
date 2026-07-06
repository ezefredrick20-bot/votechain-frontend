import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ElectionBackground from "../components/ElectionBackground";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 
  /* ADMIN LOGIN */
  const handleAdminLogin = async () => {

    if (!username || !password) {
toast("Please complete all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "https://votechain-backend-8m7f.onrender.com/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        toast(data.error || "Login failed");

      } else {

        /* SAVE TOKEN */
        localStorage.setItem("adminToken", data.token);

toast.success("Admin login successful ✅");


        navigate("/admin-dashboard");
      }

    } catch (error) {

      console.log(error);

     toast.error("Server Error");

    }

    setLoading(false);
  };

 return (

<PageTransition>

<ElectionBackground>


<div className="
min-h-screen
flex
items-center
justify-center
text-white
px-4
">


      {/* CARD */}
      <div className="w-full max-w-md glass-card p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold mb-2">
            🔐 Admin Login
          </h1>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
onClick={()=>navigate("/home")}
className="mt-4 text-green-500"
>
← Back to Homepage
</motion.button>


          <p className="text-gray-400">
            Secure Administrative Access
          </p>

        </div>

        {/* USERNAME */}
        <div className="mb-4">

          <label className="block text-sm text-gray-300 mb-2">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-6">

          <label className="block text-sm text-gray-300 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

        </div>

        {/* BUTTON */}
       <motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
          onClick={handleAdminLogin}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? "Logging in..." : "Login as Admin"}
        </motion.button>
        
      </div>

   </div>

</ElectionBackground>

</PageTransition>

);
}
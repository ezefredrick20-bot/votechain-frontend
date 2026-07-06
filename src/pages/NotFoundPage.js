import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>

      <p className="text-xl mb-6">Page Not Found</p>

      <motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
        onClick={() => navigate("/home")}
        className="bg-green-600 px-6 py-2 rounded"
      >
        Go Home
      </motion.button>
    </div>
  );
}
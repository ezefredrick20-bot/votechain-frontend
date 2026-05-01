import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>

      <p className="text-xl mb-6">Page Not Found</p>

      <button
        onClick={() => navigate("/home")}
        className="bg-green-600 px-6 py-2 rounded"
      >
        Go Home
      </button>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    nin: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
  const { firstName, lastName, phone, nin, dob } = form;

  if (!firstName || !lastName || !phone || !nin || !dob) {
    alert("Please fill all required fields");
    return;
  }

  if (!/^\d{11}$/.test(phone) || !/^\d{11}$/.test(nin)) {
    alert("Phone and NIN must be 11 digits");
    return;
  }

  setLoading(true); // ✅ START loading

  try {
    const response = await fetch("https://votechain-backend-8m7f.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
    } else {
      alert("Registration successful ✅");
      navigate("/login");
    }

  } catch (error) {
    console.error(error);
    alert("Registration failed");
  }

  setLoading(false); // ✅ STOP loading
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-900 flex items-center justify-center p-6">
    
    <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10 w-full max-w-md">
      
      {/* 🏛️ TITLE */}
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        E-Voting System
      </h1>

      <p className="text-gray-400 text-center mb-6">
        Create Your Account
      </p>

      <div className="space-y-4">

        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        />

        <input
          name="middleName"
          placeholder="Middle Name (Optional)"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        />

        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        />

        <input
          name="phone"
          placeholder="Phone Number (11 digits)"
          maxLength={11}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        />

        <input
          name="nin"
          placeholder="NIN (11 digits)"
          maxLength={11}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        />

        <input
          name="dob"
          type="date"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>

      {/* 🔗 LOGIN LINK */}
      <p className="text-gray-400 text-center mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-green-400 cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>

    </div>
  </div>
);
}
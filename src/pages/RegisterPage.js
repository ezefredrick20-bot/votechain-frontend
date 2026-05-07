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
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleRegister = async () => {
    const { firstName, lastName, phone, nin, dob } = form;

    if (!firstName || !lastName || !phone || !nin || !dob) {
      alert("Fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
      } else {
        alert("Registration successful");
        navigate("/login");
      }

    } catch {
      alert("Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">

      <div className="w-full max-w-lg bg-white/5 border border-white/10 p-8 rounded-2xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          🏛️ Voter Registration
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" />

          <input name="middleName" placeholder="Middle Name" onChange={handleChange} className="input col-span-2" />

          <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
          <input name="nin" placeholder="NIN" onChange={handleChange} className="input" />

          <input type="date" name="dob" onChange={handleChange} className="input col-span-2" />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 py-3 rounded-xl"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-400 mt-4">
          Already registered?{" "}
          <span onClick={() => navigate("/login")} className="text-green-400 cursor-pointer">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
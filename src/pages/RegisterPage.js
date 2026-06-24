import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ElectionBackground from "../components/ElectionBackground";

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

  /* HANDLE INPUT CHANGES */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* HANDLE REGISTRATION */
  const handleRegister = async () => {
    const { firstName, lastName, phone, nin, dob } = form;

    /* VALIDATION */
    if (!firstName || !lastName || !phone || !nin || !dob) {
      alert("Please fill all required fields");
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      alert("Phone number must be exactly 11 digits");
      return;
    }

    if (!/^\d{11}$/.test(nin)) {
      alert("NIN must be exactly 11 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registration failed");
      } else {
        alert("Registration successful");

        navigate("/login");
      }

    } catch (error) {
      alert("Server error");
      console.log(error);
    }

    setLoading(false);
  };


     return (
    
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
      <div className="w-full max-w-2xl glass-card p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold mb-2">
            🏛️ Voter Registration
          </h1>

          <p className="text-gray-400">
            Secure Blockchain-Based Electronic Voting System
          </p>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* FIRST NAME */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* MIDDLE NAME */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-2 text-gray-300">
              Middle Name
            </label>

            <input
              type="text"
              name="middleName"
              placeholder="Enter middle name"
              value={form.middleName}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="08012345678"
              maxLength={11}
              value={form.phone}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* NIN */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              National Identification Number (NIN)
            </label>

            <input
              type="text"
              name="nin"
              placeholder="Enter 11-digit NIN"
              maxLength={11}
              value={form.nin}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* DATE OF BIRTH */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-2 text-gray-300">
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="input"
            />
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="primary-btn mt-8"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-400 mt-6">

          Already registered?{" "}

          <span
            onClick={() => navigate("/login")}
            className="text-green-400 hover:text-green-300 cursor-pointer font-semibold transition"
          >
            Login
          </span>

        </p>

      </div>

    </div>

</ElectionBackground>

);
}
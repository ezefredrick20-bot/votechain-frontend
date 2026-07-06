import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ElectionBackground from "../components/ElectionBackground";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";

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
  const [step, setStep] = useState(1);
  const [registered,setRegistered]=useState(false);

  /* HANDLE INPUT CHANGES */
  const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

const updated={

...form,

[e.target.name]:e.target.value

};

if(
updated.firstName &&
updated.lastName &&
updated.middleName
){

setStep(2);

}

if(

updated.phone &&
updated.nin &&
updated.dob

){

setStep(3);

}

};

  /* HANDLE REGISTRATION */
  const handleRegister = async () => {
    const { firstName, lastName, phone, nin, dob } = form;

    /* VALIDATION */
    if (!firstName || !lastName || !phone || !nin || !dob) {
     toast("Please complete all fields");
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      toast("Phone number must be exactly 11 digits");
      return;
    }

    if (!/^\d{11}$/.test(nin)) {
      toast("NIN must be exactly 11 digits");
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
       toast(data.error || "Registration failed");
      } else {
       setRegistered(true);

setTimeout(()=>{

navigate("/login");

},2500);
      }

    } catch (error) {
toast.error("Server Error");
      console.log(error);
    }

    setLoading(false);
  };

  if(registered){

return(

<PageTransition>

<ElectionBackground>

<div className="min-h-screen flex items-center justify-center">

<div className="glass-card p-12 text-center">

<div className="text-7xl">

🎉

</div>

<h1 className="text-4xl font-bold text-green-400 mt-6">

Registration Successful

</h1>

<p className="text-gray-300 mt-4">

Your voter account has been created successfully.

</p>

<p className="text-gray-500 mt-4">

Redirecting to Login...

</p>

</div>

</div>

</ElectionBackground>

</PageTransition>

);

}

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
      <div className="w-full max-w-2xl glass-card p-8">

        <div className="flex justify-between items-center mb-10">

<div className="flex-1 text-center">

<div
className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold ${
step >= 1
? "bg-green-600 text-white"
: "bg-gray-700"
}`}
>
1
</div>

<p className="text-sm mt-2">

Personal

</p>

</div>

<div className="flex-1 h-1 bg-gray-700 mx-2">

<div
className={`h-1 ${
step >=2
?
"bg-green-500"
:
"bg-gray-700"
}`}
>

</div>

</div>

<div className="flex-1 text-center">

<div
className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold ${
step >=2
?
"bg-green-600 text-white"
:
"bg-gray-700"
}`}
>

2

</div>

<p className="text-sm mt-2">

Identity

</p>

</div>

<div className="flex-1 h-1 bg-gray-700 mx-2">

<div
className={`h-1 ${
step>=3
?
"bg-green-500"
:
"bg-gray-700"
}`}
>

</div>

</div>

<div className="flex-1 text-center">

<div
className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold ${
step===3
?
"bg-green-600 text-white"
:
"bg-gray-700"
}`}
>

3

</div>

<p className="text-sm mt-2">

Complete

</p>

</div>

</div>

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
              className="input transition duration-300 focus:scale-[1.02]"
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
              className="input transition duration-300 focus:scale-[1.02]"
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
              className="input transition duration-300 focus:scale-[1.02]"
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
              className="input transition duration-300 focus:scale-[1.02]"
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
              className="input transition duration-300 focus:scale-[1.02]"
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
             className="input transition duration-300 focus:scale-[1.02]"
            />
          </div>

        </div>

        {/* BUTTON */}
      <motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
          onClick={handleRegister}
          disabled={loading}
          className="
w-full
mt-8
py-4
rounded-xl
bg-gradient-to-r
from-green-600
to-emerald-500
hover:scale-105
duration-300
font-semibold
shadow-lg
"
        >
          {loading ? "Registering..." : "Register"}
       </motion.button>

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

</PageTransition>

);
}
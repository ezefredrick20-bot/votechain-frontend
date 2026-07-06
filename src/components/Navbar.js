import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
disconnectWallet
}
from "../utils/wallet";

import NavbarClock from "../components/NavbarClock";
import { motion } from "framer-motion";

export default function Navbar() {


const navigate = useNavigate();

const location = useLocation();


const [isOpen,setIsOpen] =
useState(false);



const [wallet,setWallet] =
useState(null);

const [menuOpen,setMenuOpen]=
useState(false);

const userNIN =
localStorage.getItem("userNIN");





useEffect(()=>{


const fetchElectionStatus =
async()=>{


try{


const res =
await fetch(

`${process.env.REACT_APP_API_URL}/election-status`

);



const data =
await res.json();



setIsOpen(data.isOpen);



}

catch(error){


console.log(error);


}


};



fetchElectionStatus();


},[]);


useEffect(()=>{


const loadWallet = async()=>{


const nin =
localStorage.getItem("userNIN");


if(!nin)return;



const res =
await fetch(

`${process.env.REACT_APP_API_URL}/user/${nin}`

);



const data =
await res.json();



setWallet(
data.wallet || null
);



};



loadWallet();



},[]);


const active=(path)=>

location.pathname === path

?

"text-green-700 font-semibold border-b-2 border-green-700 pb-1"

:

"text-gray-700 hover:text-green-700";






return(

<>

<div
className="
bg-green-900
text-white
text-center
py-2
text-sm
tracking-wide
"
>

Federal Republic of Nigeria • Blockchain Electoral Framework

</div>

<div className="bg-white shadow border-b">


<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">





{/* LOGO */}

<div
onClick={()=>navigate("/home")}
className="flex items-center gap-3 cursor-pointer"
>

<img
src={require("../assets/logo.png")}
alt="logo"
className="w-10 h-10"
/>

<div>

<h1 className="text-2xl font-bold text-green-700">

VoteChain

</h1>

<NavbarClock />

</div>

</div>







{/* LINKS */}


<div className="hidden md:flex gap-8 text-sm">


<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/home")}

className={active("/home")}

>

Home

</motion.button>



<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/vote")}

className={active("/vote")}

>

Vote

</motion.button>



<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/results")}

className={active("/results")}

>

Results

</motion.button>



<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/about")}

className={active("/about")}

>

About

</motion.button>



</div>








{/* USER SECTION */}

<div className="flex justify-end mb-2">

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}
className="
text-2xl
hover:scale-110
duration-300
"
>

🔔

</motion.button>

</div>

<div className="text-xs text-right">

<div className="flex justify-end mb-3">

<div
className="
w-12
h-12
rounded-full
bg-green-600
text-white
font-bold
flex
items-center
justify-center
text-xl
">

{

localStorage
.getItem("userFirstName")
?.charAt(0)
.toUpperCase()

}

</div>

</div>

<p className="font-semibold text-green-700">

Hello,

{

localStorage.getItem("userFirstName")

}

👋

</p>

<p className="text-xs">

NIN:

{
userNIN
}

</p>




<div
className="
inline-flex
items-center
bg-green-100
text-green-700
px-3
py-1
rounded-full
mt-2
"
>

💳

<span className="ml-2">

{

wallet

?

wallet.substring(0,6)

+"..."

+

wallet.slice(-4)

:

"No Wallet"

}

</span>

</div>






<p

className={

isOpen

?

"text-green-600"

:

"text-red-600"

}

>


{

isOpen

?

"🟢 Election Open"

:

"🔴 Election Closed"


}


</p>





<div className="mt-3">

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>setMenuOpen(!menuOpen)}

className="
bg-gray-100
px-3
py-2
rounded-lg
"

>

⚙ Account

</motion.button>

{

menuOpen &&

<div
className="
mt-2
bg-white
shadow-lg
rounded-xl
overflow-hidden
">

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={disconnectWallet}

className="
block
w-full
text-left
px-4
py-2
hover:bg-gray-100
"

>

Disconnect Wallet

</motion.button>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/transactions")}

className="
block
w-full
text-left
px-4
py-2
hover:bg-gray-100
"

>

Transaction History

</motion.button>

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>{

localStorage.clear();

navigate("/login");

}}

className="
block
w-full
text-left
px-4
py-2
text-red-600
hover:bg-red-50
"

>

Logout

</motion.button>

</div>

}

</div>




</div>







</div>


</div>

</>

);


}
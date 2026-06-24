import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {connectWallet} from "../utils/wallet";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const wallet = localStorage.getItem("wallet");
  const userNIN = localStorage.getItem("userNIN");


  useEffect(() => {

    const fetchElectionStatus = async () => {

      try {

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/election-status`
        );

        const data = await res.json();

        setIsOpen(data.isOpen);


        // keep local storage updated
        localStorage.setItem(
          "electionOpen",
          data.isOpen
        );

      } catch(error){

        console.error(
          "Election status error:",
          error
        );
      }
    };

    fetchElectionStatus();

  }, []);

const handleConnect = async()=>{


try{


const address = await connectWallet();


localStorage.setItem(
"wallet",
address
);


window.location.reload();


}

catch(error){

alert("Wallet connection failed");

}


};

  const active = (path) =>
    location.pathname === path
      ? "text-green-700 font-semibold border-b-2 border-green-700 pb-1"
      : "text-gray-700 hover:text-green-700";



return (


<div className="bg-white shadow-sm border-b">

<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">


{/* LOGO */}

<div
onClick={() => navigate("/home")}
className="flex items-center gap-2 cursor-pointer"
>

<img
src={require("../assets/logo.png")}
alt="logo"
className="w-8 h-8"
/>


<h1 className="text-xl font-bold text-green-700">
VoteChain
</h1>


</div>




{/* NAV LINKS */}

<div className="hidden md:flex gap-8 text-sm">


<button
onClick={()=>navigate("/home")}
className={active("/home")}
>
Home
</button>


<button
onClick={()=>navigate("/")}
className={active("/")}
>
Vote
</button>



<button
onClick={()=>navigate("/results")}
className={active("/results")}
>
Results
</button>



<button
onClick={()=>navigate("/about")}
className={active("/about")}
>
About
</button>



</div>



<button

onClick={handleConnect}

className="bg-green-600 text-white px-3 py-2 rounded"

>

Connect Wallet

</button>

{/* USER INFO */}

<div className="text-xs text-right">


<p>
NIN: {userNIN || "Guest"}
</p>



<p className="text-green-600">

{
wallet
?
wallet.slice(0,6)+"..."
:
"No Wallet"
}

</p>




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
"Election Open"
:
"Election Closed"
}


</p>



</div>


</div>

</div>

);


}
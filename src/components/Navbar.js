import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
disconnectWallet
}
from "../utils/wallet";



export default function Navbar() {


const navigate = useNavigate();

const location = useLocation();


const [isOpen,setIsOpen] =
useState(false);



const [wallet,setWallet] =
useState(null);


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


try{


const nin =
localStorage.getItem("userNIN");



if(!nin) return;



const res =
await fetch(

`${process.env.REACT_APP_API_URL}/user/${nin}`

);



const data =
await res.json();



setWallet(
data.wallet
);



if(data.wallet){


localStorage.setItem(
"wallet",
data.wallet
);


}



}

catch(error){


console.log(
"Wallet loading error",
error
);


}



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


<div className="bg-white shadow border-b">


<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">





{/* LOGO */}

<div

onClick={()=>navigate("/home")}

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







{/* LINKS */}


<div className="hidden md:flex gap-8 text-sm">


<button

onClick={()=>navigate("/home")}

className={active("/home")}

>

Home

</button>



<button

onClick={()=>navigate("/vote")}

className={active("/vote")}

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








{/* USER SECTION */}


<div className="text-xs text-right">


<p>

NIN:

{
userNIN || "Guest"

}

</p>




<p className="text-green-600">


{

wallet

?

wallet.substring(0,6)+"..."

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





{

wallet &&

<button

onClick={disconnectWallet}

className="

mt-2

bg-red-600

text-white

px-3

py-1

rounded

"


>


Disconnect


</button>


}





</div>







</div>


</div>



);


}
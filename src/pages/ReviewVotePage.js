import PageWrapper from "../components/PageWrapper";
import ElectionBackground from "../components/ElectionBackground";
import {ethers} from "ethers";
import {
connectWallet
}
from "../utils/wallet";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";

export default function ReviewVotePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
const [walletAddress] = useState(
localStorage.getItem("wallet") || ""
);

  const navigate = useNavigate();
  const location = useLocation();
const [alreadyVoted, setAlreadyVoted] = useState(false);

  const candidate = location.state?.candidate;
  const userNIN = localStorage.getItem("userNIN");

  useEffect(() => {
    if (!candidate) navigate("/");
  }, [candidate, navigate]);

  if (!candidate) return null;

  const handleConfirmVote = async()=>{


setLoading(true);

const checkVoteStatus = async () => {

try{

const res = await fetch(
`${process.env.REACT_APP_API_URL}/transactions/${userNIN}`
);

const data = await res.json();

if(data.length > 0){

setAlreadyVoted(true);

}

}
catch(error){

console.log(error);

}

};

checkVoteStatus();


try{

const checkVote = await fetch(
`${process.env.REACT_APP_API_URL}/transactions/${userNIN}`
);

const previousVotes = await checkVote.json();

if (previousVotes.length > 0) {

toast.error("You have already voted.");

setLoading(false);

return;

}

const wallet =
await connectWallet();


const provider =
new ethers.BrowserProvider(
wallet.provider
);



const signer =
await provider.getSigner();



const signature =
await signer.signMessage(
`VoteChain Vote Confirmation
Candidate: ${candidate.name}
NIN:${userNIN}`
);



const res =
await fetch(
`${process.env.REACT_APP_API_URL}/vote`,
{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


candidate:candidate.name,


nin:userNIN,


wallet:wallet.address,


signature



})


}

);



const data =
await res.json();
console.log(
"Blockchain Transaction:",
data.transaction
);



if (!res.ok) {

setLoading(false);

toast.error(
data.error ||
data.message ||
"Unable to submit vote."
);

return;

}




toast.success("Vote Submitted Successfully");



setSuccess(true);



setTimeout(()=>{


navigate("/transactions");


},2000);



}


catch(error){

console.error(error);

toast.error(

error.message ||

"Something went wrong."

);

}

setLoading(false);


};

 return (

<PageTransition>

<ElectionBackground>


<PageWrapper>

<div className="max-w-4xl mx-auto mb-8">

<div className="flex justify-between text-sm text-gray-400">

<span className="text-green-400 font-semibold">

Step 2 of 3

</span>

<span>

Blockchain Confirmation

</span>

</div>

<div className="w-full h-3 bg-white/10 rounded-full mt-3">

<div className="bg-green-500 h-3 rounded-full w-2/3"></div>

</div>

</div>

{!success && (

<div className="max-w-4xl mx-auto mb-8">

...

</div>

)}


<div className="
max-w-md mx-auto
glass-card
p-10
text-center
">


<h2 className="
text-3xl
font-bold
text-green-400
">

✅ Vote Submitted

</h2>


<p className="
mt-4 text-gray-300
">

Your vote has been securely recorded on blockchain.

</p>


<div className="
mt-6
text-sm
text-gray-400
">

Transaction Verified ⛓️

</div>


</div>



:

<div className="
max-w-xl mx-auto
">


<div className="
glass-card
p-8
">


<div className="text-center mb-8">

<h1 className="text-4xl font-black">

Official Ballot Confirmation

</h1>

<p className="text-green-400 mt-3">

Federal Republic of Nigeria

</p>

</div>



<div className="
bg-black/30
rounded-xl
p-4
mb-6
">



<div className="bg-black/30 rounded-2xl p-6 mb-6">

<h2 className="text-green-400 text-xl font-bold mb-5">

🪪 Voter Information

</h2>

<div className="space-y-4">

<div className="flex justify-between">

<span className="text-gray-400">

National ID

</span>

<span>

{userNIN}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">

Wallet

</span>

<span>

{

walletAddress

?

walletAddress.slice(0,8)+"..."+walletAddress.slice(-6)

:

"Will connect"

}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-400">

Election

</span>

<span>

2026 General Election

</span>

</div>

</div>

</div>




</div>





<img

src={candidate.image}

alt={candidate.name}

className="
w-full
h-64
object-cover
rounded-2xl
mb-5

"

/>

<div className="bg-black/20 rounded-xl p-5 mb-6">

<div className="flex justify-between">

<span className="text-gray-400">

Candidate

</span>

<span>

{candidate.name}

</span>

</div>

<div className="flex justify-between mt-3">

<span className="text-gray-400">

Political Party

</span>

<span>

{candidate.party}

</span>

</div>

<div className="flex justify-between mt-3">

<span className="text-gray-400">

Position

</span>

<span>

President

</span>

</div>

</div>


<div className="
flex items-center gap-4
mb-6
">


<img

src={candidate.logo}

alt={candidate.party}

className="
w-16 h-16
rounded-full
bg-white
p-2

"

/>

<div>


<h2 className="
text-2xl font-bold
">

{candidate.name}

</h2>


<p className="
text-gray-400
">

{candidate.party}

</p>


</div>


</div>

<div className="bg-green-950/40 border border-green-700 rounded-xl p-6 mb-6">

<h2 className="text-green-400 font-bold mb-5">

Blockchain Verification

</h2>

<div className="space-y-3">

<p>

✅ NIN Verified

</p>

<p>

<p>

{

walletAddress

?

"✅ Wallet Connected"

:

"❌ Wallet Not Connected"

}

</p>

</p>

<p>

✅ Election Open

</p>

<p>

✅ Ready for Digital Signature

</p>

</div>

</div>

<div className="bg-black/30 rounded-xl p-5 mb-6">

<h2 className="font-bold text-green-400">

Digital Signature Preview

</h2>

<p className="mt-3 text-sm break-all text-gray-400">

Signature will be generated by MetaMask immediately after you click Confirm Vote.

</p>

</div>



<div className="bg-red-900/30 border border-red-500 rounded-xl p-5 mb-8">

<h2 className="text-red-400 font-bold">

⚠ Final Confirmation

</h2>

<p className="mt-3 text-gray-300">

After clicking Confirm Vote, MetaMask will request your digital signature.

Once signed and submitted, your vote becomes immutable and cannot be edited, deleted or replaced.

</p>

</div>




<div className="
flex gap-4
">


<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>navigate("/vote")}

className="
flex-1
bg-gray-700
py-3
rounded-xl
"

>

Cancel

</motion.button>



<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={handleConfirmVote}

disabled={loading || alreadyVoted}

className="
flex-1
bg-green-600
hover:bg-green-700
py-3
rounded-xl
"

>

{
alreadyVoted
?
"Vote Already Cast"

:
loading

?
"Submitting..."

:
"Confirm Vote"
}

</motion.button>



</div>



</div>


</div>




{loading && (

<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

<div className="bg-slate-900 rounded-3xl p-10 text-center border border-green-500">

<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto"></div>

<h2 className="text-2xl font-bold mt-6">

Processing Blockchain Transaction...

</h2>

<p className="text-gray-400 mt-3">

Waiting for MetaMask signature and blockchain confirmation.

</p>

</div>

</div>

)}

</PageWrapper>


</ElectionBackground>

</PageTransition>

)
}
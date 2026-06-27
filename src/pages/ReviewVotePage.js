import PageWrapper from "../components/PageWrapper";
import ElectionBackground from "../components/ElectionBackground";
import {ethers} from "ethers";
import {connectWallet}
from "../components/WalletConnect";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ReviewVotePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const candidate = location.state?.candidate;
  const userNIN = localStorage.getItem("userNIN");

  useEffect(() => {
    if (!candidate) navigate("/");
  }, [candidate, navigate]);

  if (!candidate) return null;

  const handleConfirmVote = async () => {

  setLoading(true);

  try {


  const wallet =
await connectWallet();


console.log(
"Connected:",
wallet.address
);



const provider =
new ethers.BrowserProvider(
wallet.provider
);


    const signer =
      await provider.getSigner();


   const signature =
await signer.signMessage(
`VoteChain Vote Confirmation: ${candidate.name}`
);

console.log(signature);


    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/vote`,
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          candidate:candidate.name,

          nin:userNIN,

        }),

      }
    );


    const data = await res.json();



    if(!res.ok){

      alert(data.error);

      setLoading(false);

      return;

    }



    const transaction = {


      hash:
      "0x" +
      Math.random()
      .toString(16)
      .substring(2,12),


      candidate:candidate.name,


      timestamp:
      new Date().toISOString(),


      status:"Confirmed"

    };



    const oldTransactions =
    JSON.parse(
      localStorage.getItem("transactions")
    ) || [];



    localStorage.setItem(

      "transactions",

      JSON.stringify([

        ...oldTransactions,

        transaction

      ])

    );



    setSuccess(true);



    setTimeout(()=>{

      navigate("/home");

    },2500);



  }

  catch(err){

    console.error(err);

    alert(
      "Vote failed or rejected"
    );

  }



  setLoading(false);

};

 return (

<ElectionBackground>


<PageWrapper>


{success ?


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


<h1 className="
text-3xl
font-bold
text-center
mb-8
">

🗳️ Confirm Your Vote

</h1>



<div className="
bg-black/30
rounded-xl
p-4
mb-6
">


<p className="text-gray-400">

Voter Identification

</p>


<p className="
text-green-400
font-bold
">

{userNIN}

</p>


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





<div className="
bg-yellow-900/40
border
border-yellow-500
p-4
rounded-xl
mb-6
">

⚠️ Your vote cannot be changed after submission.

</div>



<div className="
flex gap-4
">


<button

onClick={()=>navigate("/")}

className="
flex-1
bg-gray-700
py-3
rounded-xl
"

>

Cancel

</button>



<button

onClick={handleConfirmVote}

disabled={loading}

className="
flex-1
bg-green-600
hover:bg-green-700
py-3
rounded-xl
"

>

{
loading
?
"Submitting..."
:
"Confirm Vote"
}

</button>



</div>



</div>


</div>


}


</PageWrapper>


</ElectionBackground>

)
}
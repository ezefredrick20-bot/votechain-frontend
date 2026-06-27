import { useEffect,useState } from "react";
import ElectionBackground from "../components/ElectionBackground";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts";


export default function ResultsPage(){

const [data,setData]=useState([]);


useEffect(()=>{


fetch(
`${process.env.REACT_APP_API_URL}/results`
)

.then(res=>res.json())

.then(votes=>{


const formatted =
Object.keys(votes).map(name=>({

name,
votes:votes[name]

}));


setData(formatted);


});


},[]);



const totalVotes =
data.reduce(
(sum,item)=>sum+item.votes,
0
);



return(

<ElectionBackground>


<div className="
min-h-screen
text-white
px-4
py-10
">



<div className="
max-w-5xl mx-auto
">


<div className="
text-center mb-10
">


<h1 className="
text-4xl
font-bold
">

📊 Live Blockchain Election Results

</h1>


<p className="
text-gray-300
mt-3
">

Transparent vote counting powered by blockchain

</p>


</div>



<div className="
grid md:grid-cols-3
gap-6 mb-8
">


<div className="
glass-card
">

<h2>
Total Votes
</h2>


<p className="
text-4xl
text-green-400
font-bold
">

{totalVotes}

</p>

</div>




<div className="
glass-card
">

<h2>
Candidates
</h2>


<p className="
text-4xl
text-blue-400
font-bold
">

{data.length}

</p>

</div>




<div className="
glass-card
">

<h2>
Status
</h2>


<p className="
text-green-400
font-bold
">

LIVE

</p>

</div>


</div>





<div className="
glass-card p-6
">


<h2 className="
text-xl font-bold mb-5
">

Vote Distribution

</h2>



<div className="
h-96
">


<ResponsiveContainer>


<BarChart data={data}>


<CartesianGrid
stroke="#444"
/>


<XAxis
dataKey="name"
stroke="white"
/>


<YAxis
stroke="white"
/>


<Tooltip/>


<Bar
dataKey="votes"
fill="#22c55e"
/>


</BarChart>


</ResponsiveContainer>


</div>


</div>



</div>


</div>


</ElectionBackground>


)

}
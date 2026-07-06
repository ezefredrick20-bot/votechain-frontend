import Counter from "./Counter";

export default function StatCard({

number,

label,

icon

}){

return(

<div
className="
bg-green-500/10
rounded-2xl
p-6
border
border-green-500/20
text-center
">

<div className="text-4xl">

{icon}

</div>

<h1 className="text-4xl text-white font-black mt-3">

{

typeof number==="number"

?

<Counter end={number}/>

:

number

}

</h1>

<p className="text-gray-400 mt-2">

{label}

</p>

</div>

);

}
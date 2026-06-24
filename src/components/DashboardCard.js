export default function DashboardCard({
title,
value,
icon
}){


return(

<div
className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
hover:scale-105
transition
shadow-xl
">


<p className="text-gray-400">
{icon} {title}
</p>


<h2 className="
text-4xl
font-bold
text-green-400
mt-3
">

{value}

</h2>


</div>


)


}


export default function FeatureCard({
    icon,
    title,
    description
}) {

return(

<div
className="
bg-white/5
backdrop-blur-xl
border
border-green-500/20
rounded-2xl
p-6
transition
duration-300
hover:scale-105
hover:border-green-400
hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]
">

<div className="text-4xl">

{icon}

</div>

<h2 className="text-white text-xl font-bold mt-4">

{title}

</h2>

<p className="text-gray-400 mt-3 leading-7">

{description}

</p>

</div>

);

}
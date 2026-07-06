import { motion } from "framer-motion";

export default function DashboardCard({title,value,icon}){

return(

<motion.div

initial={{ opacity:0, y:20 }}

animate={{ opacity:1, y:0 }}

whileHover={{
scale:1.05
}}

transition={{
duration:0.35
}}

className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-6
shadow-xl
cursor-pointer
"
>

<p className="text-gray-400">

{icon} {title}

</p>

<h2 className="text-4xl font-bold text-green-400 mt-3">

{value}

</h2>

</motion.div>

);

}
export default function VotingBackground({children}) {


return (

<div

className="
min-h-screen
relative
overflow-hidden
bg-cover
bg-center
"

style={{
backgroundImage:
"url('/voting-bg.png')"
}}

>


<div
className="
absolute
inset-0
bg-black/70
"
/>


<div className="relative z-10">

{children}

</div>


</div>

);


}
export default function VotingBackground({children}) {


return (

<div

className="
min-h-screen
relative
overflow-hidden
bg-gradient-to-br
from-green-950
via-slate-950
to-black
"


>


{/* BACKGROUND EFFECT */}

<div
className="
absolute
inset-0
opacity-20
bg-[url('/voting-bg.png')]
bg-cover
bg-center
"

/>



{/* CONTENT */}

<div className="relative z-10">

{children}

</div>


</div>


);


}
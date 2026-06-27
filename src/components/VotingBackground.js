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
text-white
"

>

<div
className="
absolute
inset-0
bg-gradient-to-r
from-green-500/10
via-transparent
to-blue-500/10
"
/>


<div className="relative z-10">

{children}

</div>


</div>

);

}
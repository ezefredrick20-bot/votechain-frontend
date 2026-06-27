export default function VotingBackground({children}) {


return (

<div

className="
min-h-screen
relative
overflow-hidden
bg-gradient-to-br
from-green-900
via-slate-950
to-black
text-white
"

>


<div className="relative z-10">

{children}

</div>


</div>


);


}
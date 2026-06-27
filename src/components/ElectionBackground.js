export default function ElectionBackground({children}) {


return (

<div
className="
min-h-screen
bg-gradient-to-br
from-green-950
via-slate-950
to-black
text-white
"
>


<div className="
min-h-screen
px-4
py-6
">

{children}

</div>


</div>

);


}
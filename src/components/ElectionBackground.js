export default function ElectionBackground({children}) {

return (

<div
className="
min-h-screen
bg-gradient-to-br
from-green-950
via-slate-950
to-black
relative
overflow-hidden
text-white
"
>


<div
className="
absolute
inset-0
bg-cover
bg-center
opacity-20
"
style={{
backgroundImage:"url('/voting-bg.png')"
}}
>


</div>


<div className="
relative
z-10
min-h-screen
px-4
py-6
">

{children}

</div>


</div>

);

}
export default function ElectionBackground({children}){


return(

<div
className="
min-h-screen
bg-cover
bg-center
bg-fixed
"
style={{
backgroundImage:
"url('/background.jpg')"
}}
>


<div className="
min-h-screen
bg-black/70
backdrop-blur-sm
">


{children}


</div>


</div>


)


}
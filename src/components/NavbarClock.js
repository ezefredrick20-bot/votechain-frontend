import {useState,useEffect} from "react";

export default function NavbarClock(){

const [time,setTime]=useState(new Date());

useEffect(()=>{

const timer=setInterval(()=>{

setTime(new Date());

},1000);

return ()=>clearInterval(timer);

},[]);

return(

<p className="text-xs text-gray-500">

{time.toLocaleString()}

</p>

);

}
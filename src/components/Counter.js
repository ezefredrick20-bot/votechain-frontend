import { useEffect, useState } from "react";

export default function Counter({ end }) {

const [count,setCount]=useState(0);

useEffect(()=>{

let start=0;

if(end===0){

setCount(0);

return;

}

const duration=1000;

const increment=end/50;

const timer=setInterval(()=>{

start+=increment;

if(start>=end){

setCount(end);

clearInterval(timer);

}else{

setCount(Math.floor(start));

}

},duration/50);

return()=>clearInterval(timer);

},[end]);

return count;

}
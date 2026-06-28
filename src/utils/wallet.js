export async function connectWallet(){


try{


if(!window.ethereum){

throw new Error(
"Open VoteChain inside MetaMask"
);

}



const accounts =
await window.ethereum.request({

method:"eth_requestAccounts"

});



const wallet =
accounts[0];


const nin =
localStorage.getItem("userNIN");



await fetch(

`${process.env.REACT_APP_API_URL}/save-wallet`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

nin,

wallet

})

}

);




localStorage.setItem(
"wallet",
wallet
);



return wallet;



}

catch(error){

console.error(error);

throw error;

}



}






export async function disconnectWallet(){


try{


const nin =
localStorage.getItem("userNIN");



if(!nin){

throw new Error(
"No user logged in"
);

}




await fetch(

`${process.env.REACT_APP_API_URL}/disconnect-wallet`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

nin

})

}

);





localStorage.removeItem(
"wallet"
);




window.location.reload();



}


catch(error){


console.error(

"Disconnect error",

error

);


}



}
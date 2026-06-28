export async function connectWallet(){


if(!window.ethereum){

throw new Error(
"Open VoteChain inside MetaMask"
);

}



const accounts =
await window.ethereum.request({

method:"eth_requestAccounts"

});



if(!accounts.length){

throw new Error(
"No wallet selected"
);

}



const wallet =
accounts[0];



const nin =
localStorage.getItem("userNIN");



// SAVE TO DATABASE

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



return wallet;


}






export async function disconnectWallet(){



const nin =
localStorage.getItem("userNIN");



// REMOVE FROM DATABASE

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



// REMOVE LOCAL

localStorage.removeItem(
"wallet"
);



window.location.reload();


}
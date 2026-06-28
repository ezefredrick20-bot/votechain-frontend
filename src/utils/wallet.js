export async function connectWallet(){


if(!window.ethereum){

throw new Error(
"MetaMask not installed"
);

}


const accounts =
await window.ethereum.request({

method:"eth_requestAccounts"

});


const address =
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

wallet:address

})

}

);



localStorage.setItem(
"wallet",
address
);



return {

address,

provider:window.ethereum

};


}




export async function disconnectWallet(){



const nin =
localStorage.getItem("userNIN");



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
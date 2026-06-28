export async function connectWallet(){


try{


if(!window.ethereum){


throw new Error(
"Please open VoteChain inside MetaMask browser"
);


}




const accounts =
await window.ethereum.request({

method:"eth_requestAccounts"

});



if(!accounts.length){


throw new Error(
"No wallet connected"
);

}



const address =
accounts[0];



// save locally

localStorage.setItem(
"wallet",
address
);





// save to database

const nin =
localStorage.getItem("userNIN");



if(nin){


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


}




return {


address,


provider:window.ethereum


};



}



catch(error){


console.error(

"Wallet connection error:",

error

);



throw error;



}



}






export async function disconnectWallet(){


localStorage.removeItem(
"wallet"
);


window.location.reload();


}
export async function connectWallet(){


try{


if(!window.ethereum){


throw new Error(
"Please install MetaMask or open this website inside MetaMask browser"
);


}




const accounts =
await window.ethereum.request({

method:
"eth_requestAccounts"

});




if(!accounts || accounts.length === 0){


throw new Error(
"No wallet connected"
);


}





const wallet = {


address:accounts[0],


provider:window.ethereum


};





localStorage.setItem(
"wallet",
accounts[0]
);




return wallet;



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


if(window.ethereum){


try{


await window.ethereum.request({

method:
"wallet_revokePermissions",

params:[
{
eth_accounts:{}
}
]

});


}
catch(error){

console.log(error);

}


}



window.location.reload();


}
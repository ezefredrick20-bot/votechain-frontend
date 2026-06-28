export async function connectWallet(){


try{


if(!window.ethereum){

throw new Error(
"MetaMask not installed"
);

}




const accounts =
await window.ethereum.request({

method:
"eth_requestAccounts"

});




if(accounts.length === 0){

throw new Error(
"No wallet selected"
);

}




return {

address:accounts[0],

provider:window.ethereum

};



}

catch(error){


console.error(
"Wallet error:",
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
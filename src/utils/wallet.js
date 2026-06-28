import EthereumProvider from "@walletconnect/ethereum-provider";


let provider = null;



export async function connectWallet(){


try{


if(provider){

return provider;

}



provider = await EthereumProvider.init({

projectId:
"b705302ea88d7b3d502f2f5e2c6fe20b",


chains:[

11155111

],


// Sepolia testnet

showQrModal:true,


metadata:{


name:"VoteChain",


description:
"Secure Digital Voting Portal",


url:
"https://votechain-frontend-chi.vercel.app",


icons:[

"https://votechain-frontend-chi.vercel.app/logo.png"

]


}



});





await provider.connect();




const accounts =
provider.accounts;




if(!accounts || accounts.length === 0){

throw new Error(
"No wallet account found"
);

}





return {


address:
accounts[0],


provider


};



}


catch(error){


console.error(
"Wallet connection error:",
error
);



provider = null;


throw error;


}



}







export async function disconnectWallet(){


try{



if(provider){


await provider.disconnect();


provider = null;


}



localStorage.removeItem(
"wallet"
);



window.location.reload();



}


catch(error){


console.error(
"Disconnect error:",
error
);


}



}
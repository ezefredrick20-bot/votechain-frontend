import EthereumProvider from "@walletconnect/ethereum-provider";


let provider;


export async function connectWallet(){

try{


provider = await EthereumProvider.init({

projectId:
"b705302ea88d7b3d502f2f5e2c6fe20b",

chains:[
11155111
],

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



return {

address:
accounts[0],

provider

};



}

catch(error){

console.error(error);

throw error;

}


}
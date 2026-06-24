import EthereumProvider from "@walletconnect/ethereum-provider";


let provider;


export async function connectWallet(){

try{


provider = await EthereumProvider.init({

projectId:"b705302ea88d7b3d502f2f5e2c6fe20b",

chains:[1],

showQrModal:true,

});


await provider.connect();



const accounts = provider.accounts;



return accounts[0];


}

catch(error){

console.log(error);

throw error;

}


}
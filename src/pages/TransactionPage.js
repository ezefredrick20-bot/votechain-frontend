import GlassCard from "../components/GlassCard";
import {useEffect,useState} from "react";
export default function TransactionPage() {

const [transactions,setTransactions]=useState([]);

useEffect(()=>{

const fetchTransactions=async()=>{

try{

const res = await fetch(
`${process.env.REACT_APP_API_URL}/transactions`
);

const data = await res.json();

setTransactions(data);

}catch(error){

console.error(error);

}

};

fetchTransactions();

},[]);

  return (
    <div className="min-h-screen bg-slate-900 p-8">

      <h1 className="text-3xl text-white font-bold text-center mb-8">
        ⛓️ Blockchain Transaction Viewer
      </h1>

      <div className="max-w-4xl mx-auto">

        {transactions.length === 0 ? (
          <GlassCard>
            <p className="text-center text-gray-400">
              No transaction records found
            </p>
          </GlassCard>
        ) : (
          <div className="space-y-6">

            {transactions.map((tx, index) => (
              <GlassCard key={index}>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">

                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-xl">
                      Transaction #{index + 1}
                    </h2>

                    <span className="text-green-500 font-bold">
                      {tx.status} ✅
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Transaction Hash
                  </p>

                  <p className="text-green-400 break-all mb-4">
                    {tx.hash}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">

                    <div>
                      <p className="text-gray-400 text-sm">
                        Candidate
                      </p>

                      <p className="text-white">
                        {tx.candidate}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">
                        Timestamp
                      </p>

                      <p className="text-white">
                        {tx.timestamp}
                      </p>
                    </div>

                  </div>

                </div>

              </GlassCard>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}
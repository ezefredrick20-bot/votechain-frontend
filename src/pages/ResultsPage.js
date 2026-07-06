import { useEffect,useState } from "react";
import ElectionBackground from "../components/ElectionBackground";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts";


export default function ResultsPage(){

const [data,setData]=useState([]);
const [lastUpdated, setLastUpdated] = useState(new Date());
const [loading,setLoading]=useState(true);

const navigate = useNavigate();

useEffect(() => {

const loadResults = async () => {

try{

const res = await fetch(
`${process.env.REACT_APP_API_URL}/results`
);

const votes = await res.json();

const formatted = Object.keys(votes).map(name=>({

name,

votes:votes[name]

}));

formatted.sort((a,b)=>b.votes-a.votes);

setData(formatted);

setLoading(false);

setLastUpdated(new Date());

}

catch (error) {
  console.error(error);
}
finally {
  setLoading(false);
}

};

setLoading(true);

loadResults();

const interval = setInterval(loadResults,5000);

return ()=>clearInterval(interval);

},[]);



const totalVotes =
data.reduce(
(sum,item)=>sum+item.votes,
0
);

const winner =

data.length>0

?

data[0]

:

null;

return (
  <PageTransition>
    <ElectionBackground>

      <div className="min-h-screen text-white px-4 py-10">

        <div className="max-w-6xl mx-auto">

          {/* ================= HEADER ================= */}

          <div className="flex flex-col md:flex-row justify-between items-center mb-12">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl"
            >
              ← Dashboard
            </motion.button>

            <div className="text-right mt-5 md:mt-0">

              <h1 className="text-5xl font-black text-green-300">
                📊 Live Election Results
              </h1>

              <p className="text-green-100 mt-2">
                Transparent blockchain-powered vote counting
              </p>

              <p className="text-gray-400">
                Results refresh automatically every 5 seconds
              </p>

            </div>

          </div>

          {/* ================= STATISTICS ================= */}

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="glass-card p-6">

              <h2 className="text-gray-400 font-semibold">
                🗳 Total Votes
              </h2>

              <p className="text-5xl font-black text-green-400 mt-3">
                {totalVotes}
              </p>

            </div>

            <div className="glass-card p-6">

              <h2 className="text-gray-400 font-semibold">
                👥 Candidates
              </h2>

              <p className="text-5xl font-black text-blue-400 mt-3">
                {data.length}
              </p>

            </div>

            <div className="glass-card p-6">

              <h2 className="text-gray-400 font-semibold">
                🕒 Last Updated
              </h2>

              <p className="text-3xl font-bold text-green-400 mt-3">
                {lastUpdated.toLocaleTimeString()}
              </p>

            </div>

          </div>

          {/* ================= WINNER ================= */}

          {winner && (

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="
              glass-card
              bg-gradient-to-r
              from-yellow-500/10
              to-green-500/10
              border
              border-yellow-400/40
              p-8
              mb-10
              "
            >

              <h2 className="text-2xl font-bold text-yellow-400">
                🏆 Current Leading Candidate
              </h2>

              <div className="flex justify-between items-center mt-6">

                <div>

                  <h3 className="text-4xl font-black">
                    {winner.name}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {winner.votes} Votes
                  </p>

                </div>

                <div className="text-6xl">
                  🥇
                </div>

              </div>

            </motion.div>

          )}

          {/* ================= CHART ================= */}

          <div className="glass-card p-6 mb-10">

            <h2 className="text-2xl font-bold mb-6">
              📊 Vote Distribution
            </h2>

            {loading ? (

              <SkeletonCard rows={8} />

            ) : data.length === 0 ? (

              <EmptyState
                icon="🗳️"
                title="No Votes Yet"
                message="Election results will appear here after voting begins."
              />

            ) : (

              <div className="h-96">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={data}>

                    <CartesianGrid stroke="#333" />

                    <XAxis
                      dataKey="name"
                      stroke="white"
                    />

                    <YAxis stroke="white" />

                    <Tooltip />

                    <Bar
                      dataKey="votes"
                      fill="#22c55e"
                      radius={[10, 10, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            )}

          </div>

          {/* ================= RANKINGS ================= */}

          <div className="glass-card p-6 mb-10">

            <h2 className="text-2xl font-bold mb-6">
              🏅 Candidate Rankings
            </h2>

            {data.length === 0 ? (

              <EmptyState
                icon="📋"
                title="No Rankings Available"
                message="Rankings will appear after votes have been cast."
              />

            ) : (

              <div className="space-y-5">

                {data.map((candidate, index) => (

                  <motion.div
                    key={candidate.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex justify-between items-center border-b border-white/10 pb-4"
                  >

                    <div className="flex items-center gap-4">

                      <div className="text-3xl">

                        {
                          index === 0
                            ? "🥇"
                            : index === 1
                            ? "🥈"
                            : index === 2
                            ? "🥉"
                            : "🏅"
                        }

                      </div>

                      <div>

                        <h3 className="font-bold">
                          {candidate.name}
                        </h3>

                        <p className="text-gray-400">
                          {candidate.votes} votes
                        </p>

                      </div>

                    </div>

                    <div className="text-green-400 font-bold">

                      {totalVotes === 0
                        ? 0
                        : ((candidate.votes / totalVotes) * 100).toFixed(1)
                      }%

                    </div>

                  </motion.div>

                ))}

              </div>

            )}

          </div>

          {/* ================= AUTO REFRESH ================= */}

          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-3 bg-green-900/20 border border-green-500 rounded-full px-6 py-3">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              <p>
                Auto Refreshing Every 5 Seconds
              </p>

            </div>

          </div>

          {/* ================= FOOTER ================= */}

          <footer className="text-center mt-16">

            <p className="text-gray-500">
              VoteChain Blockchain Electoral Framework
            </p>

            <p className="text-gray-600 text-sm mt-2">
              Department of Computer Science • Final Year Project
            </p>

          </footer>

        </div>

      </div>

    </ElectionBackground>
  </PageTransition>
);

}
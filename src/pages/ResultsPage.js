import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export default function ResultsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/results`)
      .then(res => res.json())
      .then(votes => {
        const formatted = Object.keys(votes).map(name => ({
          name,
          votes: votes[name],
        }));
        setData(formatted);
      });
  }, []);

  const totalVotes = data.reduce((sum, d) => sum + d.votes, 0);

  return (
    <PageWrapper>

      <h1 className="text-3xl font-bold text-center mb-6">
        📊 Live Election Results
      </h1>

      <p className="text-center text-gray-400 mb-6">
        Total Votes: {totalVotes}
      </p>

      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="w-full h-96">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="votes" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </PageWrapper>
  );
}
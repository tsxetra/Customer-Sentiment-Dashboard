
import React from 'react';
import { SentimentDataPoint } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SentimentChartProps {
  data: SentimentDataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const sentiment = payload[0].value;
      const sentimentLabel = sentiment > 0.3 ? 'Positive' : sentiment < -0.3 ? 'Negative' : 'Neutral';
      const color = sentiment > 0.3 ? 'text-green-400' : sentiment < -0.3 ? 'text-red-400' : 'text-yellow-400';

      return (
        <div className="bg-secondary p-3 border border-highlight rounded-lg shadow-lg">
          <p className="font-bold">{`Date: ${label}`}</p>
          <p className={color}>{`Sentiment: ${sentiment.toFixed(2)} (${sentimentLabel})`}</p>
        </div>
      );
    }
  
    return null;
  };

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-secondary p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-text-primary">Sentiment Trend</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={sortedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="date" stroke="#cbd5e1" tick={{ fontSize: 12 }} />
            <YAxis domain={[-1, 1]} stroke="#cbd5e1" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "14px"}} />
            <Line type="monotone" dataKey="sentiment" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentChart;

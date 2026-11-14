import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { formatCurrency, formatCompactCurrency } from '../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-nectar-darkCard p-3 rounded-2xl shadow-nectar-float border border-nectar-forest/15 dark:border-nectar-darkBorder text-xs">
        <p className="font-bold text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </p>
        <p className="font-mono font-bold text-nectar-forest dark:text-nectar-mint text-sm">
          {formatCurrency(payload[0].value)}
        </p>
        <p className="text-[10px] text-gray-400">Cumulative spend</p>
      </div>
    );
  }
  return null;
};

export default function DailyTrendChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-sm">
        <p>No daily trajectory available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="nectarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0B7443" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0B7443" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#E5E7EB" 
            className="dark:opacity-10" 
            vertical={false} 
          />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 11, fill: '#9CA3AF' }} 
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB', opacity: 0.5 }}
            interval={4}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#9CA3AF' }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => formatCompactCurrency(val)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="cumulative" 
            stroke="#054F31" 
            strokeWidth={2.5}
            fillOpacity={1} 
            fill="url(#nectarGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

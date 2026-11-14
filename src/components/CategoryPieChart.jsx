import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/formatters';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white dark:bg-nectar-darkCard p-3 rounded-2xl shadow-nectar-float border border-nectar-forest/15 dark:border-nectar-darkBorder text-xs">
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: data.payload.color }}
          />
          <span className="font-bold text-nectar-forest dark:text-nectar-mint">
            {data.name}
          </span>
        </div>
        <p className="font-mono font-semibold text-gray-800 dark:text-gray-100">
          {formatCurrency(data.value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function CategoryPieChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-sm">
        <p>No expense data available for chart</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-6">
      {/* Chart Canvas */}
      <div className="w-full sm:w-1/2 h-64 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  className="transition-all duration-300 hover:opacity-85 focus:outline-none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Total
          </span>
          <span className="text-xl font-bold font-serif text-nectar-forest dark:text-nectar-mint">
            {formatCurrency(total).split('.')[0]}
          </span>
        </div>
      </div>

      {/* Category Legend */}
      <div className="w-full sm:w-1/2 space-y-2 max-h-64 overflow-y-auto pr-2">
        {data.map((item) => {
          const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div 
              key={item.name}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-nectar-darkBg text-xs transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold font-mono text-gray-900 dark:text-gray-100">
                  {formatCurrency(item.value)}
                </span>
                <span className="text-gray-400 font-medium text-[11px] w-8 text-right">
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

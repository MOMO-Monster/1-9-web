import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { StatItem, ChartData } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { siteData } from '../siteData';

interface Props {
  stats: StatItem[];
  chartData: ChartData[];
}

const StatsDashboard: React.FC<Props> = ({ stats, chartData }) => {
  const { title, badge } = siteData.statsComponent;

  return (
    <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 md:p-8 my-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <h3 className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span className="w-3 h-3 bg-acid-green rounded-sm animate-pulse"></span>
          {title}
        </h3>
        <div className="text-[10px] md:text-xs font-mono text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full">
          {badge}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-zinc-950/80 p-4 md:p-5 rounded-xl border border-zinc-800/50 group hover:border-acid-green/30 transition-colors">
            <p className="text-zinc-500 text-xs md:text-sm font-mono mb-2 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-end gap-3">
              <span className="text-2xl md:text-3xl font-bold text-white group-hover:text-acid-green transition-colors">{stat.value}</span>
              <div className={`flex items-center text-xs md:text-sm font-bold mb-1 ${
                stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-zinc-400'
              }`}>
                {stat.trend === 'up' && <TrendingUp size={16} className="mr-1" />}
                {stat.trend === 'down' && <TrendingDown size={16} className="mr-1" />}
                {stat.trend === 'neutral' && <Minus size={16} className="mr-1" />}
                {stat.percentage}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[250px] md:h-[300px] w-full bg-zinc-950/30 rounded-xl border border-zinc-800/50 p-2 md:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#52525b" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#52525b" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ccff00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ccff00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="name" stroke="#52525b" tick={{fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
            <YAxis stroke="#52525b" tick={{fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
              itemStyle={{ color: '#e4e4e7', fontFamily: 'monospace' }}
            />
            <Area type="monotone" dataKey="before" stroke="#52525b" strokeWidth={2} fillOpacity={1} fill="url(#colorBefore)" name="Baseline" />
            <Area type="monotone" dataKey="after" stroke="#ccff00" strokeWidth={2} fillOpacity={1} fill="url(#colorAfter)" name="Post-Opt" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsDashboard;
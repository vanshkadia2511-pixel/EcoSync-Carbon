'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#2D6A4F', '#52B788', '#A8DADC', '#1C4F51', '#95D4B3'];

export default function CategoryChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          formatter={(value: number | string | readonly (number | string)[] | undefined) => {
            const numValue = Array.isArray(value) ? value[0] : value;
            return [`${Number(numValue || 0).toFixed(1)} kg`, 'Emissions'];
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

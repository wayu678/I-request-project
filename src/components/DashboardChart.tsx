import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardSummaryItem {
    name: string;
    value: number;
    color?: string;
    [key: string]: any;
}

interface DashboardChartProps {
    chartData: DashboardSummaryItem[];
}

const DashboardChart: React.FC<DashboardChartProps> = ({ chartData }) => {
    return (
        <div className="p-5">
            {/* Legend */}
            <div className="flex justify-center flex-wrap gap-4 mb-5">
                {(chartData || []).map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div
                            className="w-5 h-2 rounded-sm"
                            style={{ backgroundColor: item.color || '#8884d8' }}
                        />
                        <span className="text-sm">{item.name}</span>
                    </div>
                ))}
            </div>

            {/* Donut Chart */}
            <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData || []}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {(chartData || []).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardChart;

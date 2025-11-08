import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CategorySpend {
  category: string;
  spend: number;
}

interface SpendByCategoryChartProps {
  data: CategorySpend[];
  loading: boolean;
}

const COLORS = ["#1f60efff", "#F99D6F", "#FED7AA"];

export const SpendByCategoryChart = ({ data, loading }: SpendByCategoryChartProps) => {
  if (loading) {
    return (
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">Spend by Category</CardTitle>
          <p className="text-xs text-gray-500">Distribution of spending across different categories.</p>
        </CardHeader>
        <CardContent>
          <div className="h-[240px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.slice(0, 3).map((item, index) => ({
    name: item.category,
    value: item.spend,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900">Spend by Category</CardTitle>
        <p className="text-xs text-gray-500">Distribution of spending across different categories.</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <circle cx="50%" cy="50%" r={110} fill="#f3f4f6" />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={92}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <circle cx="50%" cy="50%" r={48} fill="#ffffff" />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2.5">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3" viewBox="0 0 8 8" aria-hidden>
                  <circle cx="4" cy="4" r="4" fill={item.color} />
                </svg>
                <span className="text-xs text-gray-700">{item.name}</span>
              </div>
              <span className="text-xs font-semibold text-gray-900">
                ${item.value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

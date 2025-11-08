import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CashOutflow {
  month: string;
  amount: number;
}

interface CashOutflowChartProps {
  data: CashOutflow[];
  loading: boolean;
}

export const CashOutflowChart = ({ data, loading }: CashOutflowChartProps) => {
  if (loading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">Cash Outflow Forecast</CardTitle>
          <p className="text-xs text-gray-500">Expected payment obligations grouped by due date ranges.</p>
        </CardHeader>
        <CardContent>
          <div className="h-[240px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { period: "0 - 7 days", amount: 30 },
    { period: "8-30 days", amount: 45 },
    { period: "31-60 days", amount: 25 },
    { period: "60+ days", amount: 60 },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900">Cash Outflow Forecast</CardTitle>
        <p className="text-xs text-gray-500">Expected payment obligations grouped by due date ranges.</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="period"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `€${value}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px"
              }}
              formatter={(value: number) => [`€${value}k`, "Amount"]}
            />
            <Bar
              dataKey="amount"
              fill="#1e3a8a"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

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
      <div className="border shadow-sm rounded-lg bg-white">
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900 leading-none">Cash Outflow Forecast</h3>
          <p className="text-xs text-gray-500 mt-1">Expected payment obligations grouped by due date ranges.</p>
        </div>
        <div className="p-6 pt-0">
          <div className="h-[240px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const chartData = (data && data.length > 0)
    ? (() => {
        const mapped = data.map((item) => ({ period: item.month, amount: Number(item.amount) }));
        const bucketOrder = ["0 - 7 days", "8-30 days", "31-60 days", "60+ days"];

        const hasKnownBucket = mapped.some((m) => bucketOrder.includes(m.period));

        if (hasKnownBucket) {
          let ordered = bucketOrder
            .map((p) => mapped.find((m) => m.period === p))
            .filter(Boolean) as { period: string; amount: number }[];

          if (ordered.length < 4) {
            const remaining = mapped.filter((m) => !ordered.some((o) => o.period === m.period));
            ordered = ordered.concat(remaining.slice(0, 4 - ordered.length));
          }

          return ordered.slice(0, 4);
        }

        return mapped.slice(0, 4);
      })()
    : [
        { period: "0 - 7 days", amount: 30 },
        { period: "8-30 days", amount: 45 },
        { period: "31-60 days", amount: 25 },
        { period: "60+ days", amount: 60 },
      ];

  return (
    <div className="border shadow-sm rounded-lg bg-white">
      <div className="p-6">
        <h3 className="text-base font-semibold text-gray-900 leading-none">Cash Outflow Forecast</h3>
        <p className="text-xs text-gray-500 mt-1">Expected payment obligations grouped by due date ranges.</p>
      </div>
      <div className="p-6 pt-0">
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
            
            {(() => {
              const CustomTooltip = ({ active, payload }: any) => {
                if (active && payload && payload.length > 0) {
                  const v = payload[0].value;
                  return (
                    <div className="bg-white rounded-full px-3 py-1 text-sm text-slate-900 whitespace-nowrap shadow">
                      {`€${v}k`}
                    </div>
                  );
                }
                return null;
              };

              return <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 1000 }} cursor={false} />;
            })()}
            
            <Bar
              dataKey="amount"
              background={{ fill: "#e5e7eb", radius: [12, 12, 12, 12] }}
              fill="rgb(30,27,75)"
              radius={[12, 12, 12, 12]} 
              maxBarSize={50}
              cursor="default"
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
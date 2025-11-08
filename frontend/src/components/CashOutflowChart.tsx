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
      <div className="border shadow-sm rounded-lg bg-white h-full flex flex-col">
        <div className="p-6 flex-shrink-0">
          <h3 className="text-base font-semibold text-gray-900 leading-none">Cash Outflow Forecast</h3>
          <p className="text-xs text-gray-500 mt-1">Expected payment obligations grouped by due date ranges.</p>
        </div>
        <div className="p-6 pt-0 flex-1 min-h-0 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  // Prefer showing real incoming data (dates or labels). If incoming data contains
  // bucket-like labels we'll render the 4 buckets in order; otherwise show the
  // incoming items (up to 4). If there's no incoming data, fall back to buckets.
  const desiredPeriods = ["0 - 7 days", "8-30 days", "31-60 days", "60+ days"];
  const incoming = (data || []).map((item) => ({ period: item.month, amount: Number(item.amount) }));

  const fallbackMap: Record<string, number> = {
    "0 - 7 days": 30,
    "8-30 days": 45,
    "31-60 days": 25,
    "60+ days": 60,
  };

  // Detect whether the API returned bucket labels (exact or containing the bucket text)
  const hasBucketLabels = incoming.some((m) =>
    desiredPeriods.some((p) => (m.period || '').toString().includes(p))
  );

  let chartData = [] as { period: string; amount: number }[];

  if (hasBucketLabels) {
    // Map into the ordered buckets, using incoming values when they match.
    chartData = desiredPeriods.map((p) => {
      const found = incoming.find((m) => m.period === p || (m.period || '').toString().includes(p));
      return found ? found : { period: p, amount: fallbackMap[p] };
    });
  } else if (incoming.length > 0) {
    // Show real incoming items (dates or other labels) as-is, up to 4 entries.
    chartData = incoming.slice(0, 4);
  } else {
    // No incoming data — fall back to buckets
    chartData = desiredPeriods.map((p) => ({ period: p, amount: fallbackMap[p] }));
  }

  return (
    <div className="border shadow-sm rounded-lg bg-white h-full flex flex-col">
      <div className="p-6 flex-shrink-0">
        <h3 className="text-base font-semibold text-gray-900 leading-none">Cash Outflow Forecast</h3>
        <p className="text-xs text-gray-500 mt-1">Expected payment obligations grouped by due date ranges.</p>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-0 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 24, right: 10, left: -20, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="period"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              tickMargin={12}
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
              background={{ fill: "#e5e7eb", radius: 12 }}
              fill="rgb(30,27,75)"
              radius={12}
              maxBarSize={60}
              cursor="default"
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface InvoiceTrend {
  month: string;
  volume: number;
  value: number;
}

interface InvoiceVolumeChartProps {
  data: InvoiceTrend[];
  loading?: boolean;
}

export const InvoiceVolumeChart = ({ data, loading = false }: InvoiceVolumeChartProps) => {
  if (loading) {
    return (
      <div className="bg-background rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-base font-semibold text-foreground">Invoice Volume + Value Trend</h3>
          <p className="text-xs text-muted-foreground mt-1">Invoice count and total spend over 12 months.</p>
        </div>
        <div className="p-6 pt-0">
          <div className="h-[280px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const baseData = data && data.length > 0 ? data : [
    { month: "Jan", volume: 12, value: 8 },
    { month: "Feb", volume: 65, value: 58 },
    { month: "Mar", volume: 40, value: 32 },
    { month: "Apr", volume: 48, value: 45 },
    { month: "May", volume: 35, value: 28 },
    { month: "Jun", volume: 18, value: 15 },
    { month: "Jul", volume: 52, value: 48 },
    { month: "Aug", volume: 50, value: 46 },
    { month: "Sep", volume: 42, value: 35 },
    { month: "Oct", volume: 47, value: 38 },
    { month: "Nov", volume: 35, value: 28 },
    { month: "Dec", volume: 15, value: 10 },
  ];

  const chartData = baseData.map(item => ({
    ...item,
    backgroundBar: 80,
  }));

  return (
    <div className="bg-background rounded-lg border shadow-sm">
      <div className="p-6">
        <h3 className="text-base font-semibold text-foreground">Invoice Volume + Value Trend</h3>
        <p className="text-xs text-muted-foreground mt-1">Invoice count and total spend over 12 months.</p>
      </div>
      <div className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e40af" stopOpacity={0.08}/>
                <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c7d2fe" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#c7d2fe" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <Bar
              dataKey="backgroundBar"
              fill="#f7f9ff"
              isAnimationActive={false}
              barSize={60}
            />

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "13px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "12px 16px"
              }}
              cursor={{ fill: 'rgba(199, 210, 254, 0.2)' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border rounded-xl p-4 shadow-lg">
                      <p className="font-semibold text-base text-foreground mb-2">{label} 2025</p>
                      <p className="text-sm text-foreground">
                        Invoice count: <span className="font-semibold text-blue-600 float-right ml-8">{payload[1]?.payload?.volume || 47}</span>
                      </p>
                      <p className="text-sm text-foreground">
                        Total Spend: <span className="font-semibold text-blue-600 float-right ml-8">€ 8,679.25</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#c7d2fe"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{ r: 4, fill: "#fff", stroke: "#c7d2fe", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#1e40af"
              strokeWidth={2.5}
              fill="url(#colorVolume)"
              dot={false}
              activeDot={{ r: 5, fill: "#1e40af", stroke: "#fff", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

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
      <div className="bg-background rounded-lg border shadow-sm h-full">
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

  const getMonthName = (monthString: string) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(monthString + "-01");
    return monthNames[date.getMonth()];
  };

  const transformedData = (data || []).map(item => ({
    month: getMonthName(item.month),
    volume: item.volume,
    value: item.value / 1000,
  }));

  const maxFromData = transformedData.length > 0 
    ? Math.max(...transformedData.map(d => Math.max(d.volume, d.value))) 
    : 0;
  
  let yAxisMax = Math.ceil(maxFromData * 1.2 / 20) * 20;

  if (yAxisMax < 80) {
    yAxisMax = 80;
  }

  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const chartData = allMonths.map(monthName => {
    const monthData = transformedData.find(d => d.month === monthName);
    return {
      month: monthName,
      volume: monthData?.volume || 0,
      value: monthData?.value || 0,
      backgroundBar: yAxisMax,
    };
  });

  const yAxisTicks = [];
  for (let i = 0; i <= yAxisMax; i += 20) {
    yAxisTicks.push(i);
  }

  return (
    <div className="bg-background rounded-lg border shadow-sm h-full">
      <div className="p-6">
        <h3 className="text-base font-semibold text-foreground">Invoice Volume + Value Trend</h3>
        <p className="text-xs text-muted-foreground mt-1">Invoice count and total spend over 12 months.</p>
      </div>
      <div className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
              activeBar={{ fill: "#dbeafe", isAnimationActive: false }}
            />

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 11, dy: 8 }}
              axisLine={false}
              tickLine={false}
              interval={0} // Ensure all 12 months are shown
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={[0, yAxisMax]}
              ticks={yAxisTicks} // Use the clean, integer ticks
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}k`;
                }
                return value.toString();
              }}
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
              cursor={false} 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const volumeData = payload.find(p => p.dataKey === 'volume')?.payload?.volume || 0;
                  const valueData = payload.find(p => p.dataKey === 'value')?.payload?.value || 0;
                  
                  if (volumeData === 0 && valueData === 0) {
                    return null;
                  }

                  return (
                    <div className="bg-background border rounded-xl p-4 shadow-lg">
                      <p className="font-semibold text-base text-foreground mb-2">{label} 2025</p>
                      <p className="text-sm text-foreground">
                        Invoice count: <span className="font-semibold text-blue-600 float-right ml-8">{volumeData}</span>
                      </p>
                      <p className="text-sm text-foreground">
                        Total Spend: <span className="font-semibold text-blue-600 float-right ml-8">€ {(valueData * 1000).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="natural"
              dataKey="value"
              stroke="#c7d2fe"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{ r: 4, fill: "#fff", stroke: "#c7d2fe", strokeWidth: 2 }}
            />
            <Area
              type="natural"
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
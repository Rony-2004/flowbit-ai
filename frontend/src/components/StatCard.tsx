import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface StatCardProps {
  title: string;
  subtitle?: string;
  value: string;
  change: string;
  trend: "up" | "down";
  period: string;
}

export const StatCard = ({ title, subtitle, value, change, trend, period }: StatCardProps) => {
  const isPositive = trend === "up";
  
  // Mini sparkline data
  const sparklineData = isPositive 
    ? [{ v: 20 }, { v: 30 }, { v: 25 }, { v: 40 }, { v: 35 }, { v: 50 }]
    : [{ v: 50 }, { v: 40 }, { v: 45 }, { v: 30 }, { v: 35 }, { v: 25 }];
  
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">{title}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <div className="w-16 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line 
                  type="monotone" 
                  dataKey="v" 
                  stroke={isPositive ? "#10b981" : "#ef4444"} 
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
          <div className="flex items-center gap-1 text-xs">
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-600" />
            )}
            <span className={isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {change}
            </span>
            <span className="text-gray-500">{period}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

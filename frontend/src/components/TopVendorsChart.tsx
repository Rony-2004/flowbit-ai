import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";

interface VendorData {
  vendorName: string;
  totalSpend: number;
}

interface TopVendorsChartProps {
  data: VendorData[];
  loading: boolean;
}

export const TopVendorsChart = ({ data, loading }: TopVendorsChartProps) => {
  const [hoveredVendor, setHoveredVendor] = useState<string | null>(null);

  if (loading) {
    return (
      <Card className="border-0 shadow-sm h-full">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">Spend by Vendor (Top 10)</CardTitle>
          <p className="text-xs text-gray-500">Vendor spend with cumulative percentage distribution.</p>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Demo data matching the design
  const demoData = [
    { vendorName: "AcmeCorp", totalSpend: 38000 },
    { vendorName: "Test Solutions", totalSpend: 28000 },
    { vendorName: "PrimeVendors", totalSpend: 22000 },
    { vendorName: "DeltaServices", totalSpend: 15000 },
    { vendorName: "OmegaLtd", totalSpend: 15000 },
    { vendorName: "AlphaInc", totalSpend: 12000 },
    { vendorName: "BetaCorp", totalSpend: 12000 },
    { vendorName: "GammaLLC", totalSpend: 10000 },
    { vendorName: "ThetaSystems", totalSpend: 9000 },
    { vendorName: "ZetaGroup", totalSpend: 8000 },
  ];

  const chartData = data && data.length > 0 ? [...data].sort((a, b) => b.totalSpend - a.totalSpend).slice(0, 10) : demoData;
  const maxSpend = 45000;

  return (
    <Card className="border-0 shadow-sm h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-base font-semibold text-gray-900">Spend by Vendor (Top 10)</CardTitle>
        <p className="text-xs text-gray-500">Vendor spend with cumulative percentage distribution.</p>
      </CardHeader>
      <CardContent className="pt-2 flex-1 flex flex-col">
        <div className="space-y-2.5 relative overflow-y-auto max-h-[280px] scrollbar-hide">
          {chartData.map((vendor, index) => {
            const widthPercentage = (vendor.totalSpend / maxSpend) * 100;
            const isHovered = hoveredVendor === `${vendor.vendorName}-${index}`;
            return (
              <div 
                key={`${vendor.vendorName}-${index}`}
                onMouseEnter={() => setHoveredVendor(`${vendor.vendorName}-${index}`)}
                onMouseLeave={() => setHoveredVendor(null)}
                className="relative flex items-center gap-2"
              >
                <span className="text-xs text-gray-500 font-normal w-28 text-right flex-shrink-0">{vendor.vendorName}</span>
                <div className="relative h-6 bg-[#e5e7eb] rounded-sm overflow-visible flex-1">
                  <div
                    className="absolute inset-y-0 left-0 rounded-sm transition-all duration-200"
                    style={{
                      width: `${widthPercentage}%`,
                      background: isHovered ? '#1e1b4b' : '#b4a5d8',
                    }}
                  />
                  {/* Tooltip */}
                  {isHovered && (
                    <div 
                      className="absolute bottom-full mb-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10"
                      style={{
                        left: `${Math.min(widthPercentage / 2, 50)}%`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <p className="font-semibold text-base text-gray-900 mb-1 whitespace-nowrap">{vendor.vendorName}</p>
                      <p className="text-sm text-gray-700 whitespace-nowrap">
                        Vendor Spend: <span className="font-semibold text-blue-600">€ {vendor.totalSpend.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-3 text-[10px] text-gray-500 pl-[7.5rem]">
          <span>€0k</span>
          <span>€15k</span>
          <span>€30k</span>
          <span>€45k</span>
        </div>
      </CardContent>
    </Card>
  );
};

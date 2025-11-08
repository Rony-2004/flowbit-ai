'use client';

import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { InvoiceVolumeChart } from "@/components/InvoiceVolumeChart";
import { SpendByCategoryChart } from "@/components/SpendByCategoryChart";
import { CashOutflowChart } from "@/components/CashOutflowChart";
import { InvoicesByVendorTable } from "@/components/InvoicesByVendorTable";
import { TopVendorsChart } from "@/components/TopVendorsChart";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { apiService } from "@/services/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Shield, User, Eye } from "lucide-react";

export default function DashboardPage() {
  const { user, switchRole } = useAuth();

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3" />;
      case 'manager':
        return <User className="h-3 w-3" />;
      case 'viewer':
        return <Eye className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'viewer':
        return 'bg-green-100 text-green-800';
    }
  };

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: apiService.getStats,
    retry: 3,
    staleTime: 30000,
  });

  const { data: invoiceTrends, isLoading: trendsLoading } = useQuery({
    queryKey: ['invoice-trends'],
    queryFn: apiService.getInvoiceTrends,
    retry: 3,
  });

  const { data: vendors, isLoading: vendorsLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: apiService.getTopVendors,
    retry: 3,
  });

  const { data: categorySpend, isLoading: categoryLoading } = useQuery({
    queryKey: ['category-spend'],
    queryFn: apiService.getCategorySpend,
    retry: 3,
  });

  const { data: cashOutflow, isLoading: cashLoading } = useQuery({
    queryKey: ['cash-outflow'],
    queryFn: apiService.getCashOutflow,
    retry: 3,
  });

  const { data: invoicesData, isLoading: invoicesLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => apiService.getInvoices(1, 100),
    retry: 3,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(num);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</span>
                <span className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Current Role</span>
                    {user && (
                      <Badge className={`${getRoleColor(user.role)} flex items-center gap-1`} variant="secondary">
                        {getRoleIcon(user.role)}
                        <span className="capitalize text-[10px]">{user.role}</span>
                      </Badge>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => switchRole('admin')} 
                    className="cursor-pointer"
                    disabled={user?.role === 'admin'}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Switch to Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => switchRole('manager')} 
                    className="cursor-pointer"
                    disabled={user?.role === 'manager'}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Switch to Manager
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => switchRole('viewer')} 
                    className="cursor-pointer"
                    disabled={user?.role === 'viewer'}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Switch to Viewer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard
              title="Total Spend"
              subtitle="(YTD)"
              value={statsLoading ? "Loading..." : formatCurrency(stats?.totalSpend || 0)}
              change="+8.2%"
              trend="up"
              period="from last month"
            />
            <StatCard
              title="Total Invoices Processed"
              subtitle=""
              value={statsLoading ? "Loading..." : formatNumber(stats?.totalInvoices || 0)}
              change="+8.2%"
              trend="up"
              period="from last month"
            />
            <StatCard
              title="Documents Uploaded"
              subtitle="This Month"
              value={statsLoading ? "Loading..." : formatNumber(stats?.totalDocuments || 0)}
              change="+9.6%"
              trend="down"
              period="from last month"
            />
            <StatCard
              title="Average Invoice Value"
              subtitle=""
              value={statsLoading ? "Loading..." : formatCurrency(stats?.averageInvoiceValue || 0)}
              change="+9.6%"
              trend="down"
              period="This Month"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="lg:col-span-1 h-full">
              <InvoiceVolumeChart data={invoiceTrends || []} loading={trendsLoading} />
            </div>
            <div className="lg:col-span-1 h-full">
              <TopVendorsChart data={vendors || []} loading={vendorsLoading} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <SpendByCategoryChart data={categorySpend || []} loading={categoryLoading} />
            <CashOutflowChart data={cashOutflow || []} loading={cashLoading} />
            <InvoicesByVendorTable data={invoicesData?.invoices || []} loading={invoicesLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}

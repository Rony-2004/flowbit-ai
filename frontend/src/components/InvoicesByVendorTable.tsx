import React from 'react';

interface Invoice {
  id: string;
  invoiceId: string;
  vendor: string;
  date: string;
  amount: number;
  status: string;
}

interface InvoicesByVendorTableProps {
  data: Invoice[];
  loading: boolean;
}

export const InvoicesByVendorTable = ({ data, loading }: InvoicesByVendorTableProps) => {
  if (loading) {
    return (
      <div className="border shadow-sm rounded-lg bg-white">
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900 leading-none">Invoices by Vendor</h3>
          <p className="text-xs text-gray-500 mt-1">Top vendors by invoice count and net value.</p>
        </div>
        <div className="p-6">
          <div className="h-[280px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (d: string) => {
    try {
      const dt = new Date(d);
      const dd = String(dt.getDate()).padStart(2, '0');
      const mm = String(dt.getMonth() + 1).padStart(2, '0');
      const yyyy = dt.getFullYear();
      return `${dd}.${mm}.${yyyy}`;
    } catch (e) {
      return d;
    }
  };

  const tableData = data && data.length > 0 ? data.map(invoice => ({
    vendor: invoice.vendor,
    invoices: formatDate(invoice.date), 
    value: invoice.amount
  })) : [
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "CPB SOFTWARE (GERMANY) GMBH", invoices: "01.03.2024", value: 1240.50 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Tech Solutions Ltd.", invoices: "15.07.2025", value: 5500.00 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Office Supplies Co.", invoices: "22.08.2025", value: 320.00 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "CPB SOFTWARE (GERMANY) GMBH", invoices: "01.03.2024", value: 1240.50 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
  ];

  return (
    <div className="border shadow-sm rounded-lg bg-white">
      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-900 leading-none">Invoices by Vendor</h3>
        <p className="text-xs text-gray-500 mt-1">Top vendors by invoice count and net value.</p>
      </div>
      <div className="px-0">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="grid grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)_minmax(0,_1.2fr)] items-center gap-2">
            <div className="text-xs font-semibold text-gray-600">Vendor</div>
            <div className="text-xs font-semibold text-gray-600 text-center"># Invoices</div>
            <div className="text-xs font-semibold text-gray-600 text-right">Net Value</div>
          </div>
        </div>

        <div className="h-[260px] overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="divide-y divide-gray-100">
            {tableData.map((row, index) => (
              <div key={index} className="grid grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)_minmax(0,_1.2fr)] items-center gap-2 py-3 px-4">
                <div className="text-xs text-gray-700 truncate" title={row.vendor}>{row.vendor}</div>
                <div className="text-xs text-gray-700 text-center">{row.invoices}</div>
                <div className="text-right">
                  <div className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md border border-gray-200 bg-white">
                    <span className="text-[11px] text-gray-500 mr-1">€</span>
                    <span className="text-xs font-medium text-gray-900 whitespace-nowrap">{(row.value || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
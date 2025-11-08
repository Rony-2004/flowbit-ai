import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

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
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">Invoices by Vendor</CardTitle>
          <p className="text-xs text-gray-500">Top vendors by invoice count and net value.</p>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Use real data if available, otherwise fallback to demo data
  const tableData = data && data.length > 0 ? data.map(invoice => ({
    vendor: invoice.vendor,
    invoices: new Date(invoice.date).toLocaleDateString('de-DE'),
    value: invoice.amount
  })) : [
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
    { vendor: "Prunix GmbH", invoices: "19.08.2025", value: 736.78 },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900">Invoices by Vendor</CardTitle>
        <p className="text-xs text-gray-500">Top vendors by invoice count and net value.</p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="h-[280px] overflow-y-auto overflow-x-hidden scrollbar-hide">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="border-b border-gray-200 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-gray-600 px-6 bg-white">Vendor</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600 text-center bg-white"># invoices</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600 text-right px-6 bg-white">Net Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="text-xs text-gray-700 py-2.5 px-6">{row.vendor}</TableCell>
                  <TableCell className="text-xs text-gray-700 text-center">{row.invoices}</TableCell>
                  <TableCell className="text-xs font-semibold text-gray-900 text-right px-6">
                    <span className="whitespace-nowrap">€{(row.value || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

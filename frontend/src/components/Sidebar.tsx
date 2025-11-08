'use client';

import { LayoutDashboard, FileText, Folder, Building2, Users, Settings, MessageSquare, Receipt, ChevronsUpDown } from "lucide-react";
import { NavLink } from "./NavLink";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", enabled: true },
  { icon: Receipt, label: "Invoices", path: "/invoices", enabled: true },
  { icon: MessageSquare, label: "Chat with Data", path: "/chat", enabled: true },
  { icon: FileText, label: "Invoice", path: "/invoice", enabled: false },
  { icon: Folder, label: "Other files", path: "/files", enabled: false },
  { icon: Building2, label: "Departments", path: "/departments", enabled: false },
  { icon: Users, label: "Users", path: "/users", enabled: false },
  { icon: Settings, label: "Settings", path: "/settings", enabled: false },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-8">
        <div className="flex items-center gap-2">
          {/* Use logo2.png from public folder for the org avatar */}
          <img src="/logo2.png" alt="Buchhaltung" className="w-8 h-8 rounded-lg object-cover" />
          <div>
            <h1 className="font-bold text-gray-900">Buchhaltung</h1>
            <p className="text-xs text-gray-500">12 members</p>
          </div>
        </div>
        {/* chevron up/down icon on the right to match the design */}
        <ChevronsUpDown className="w-4 h-4 text-gray-500" />
      </div>

      <nav className="space-y-1 flex-1">
        <p className="text-xs font-semibold text-gray-500 mb-3 px-3">GENERAL</p>
        {navItems.map((item) => (
          item.enabled ? (
            <NavLink
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              activeClassName="bg-indigo-50 text-indigo-900 hover:bg-indigo-50 hover:text-indigo-900"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ) : (
           
            <div
              key={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 pointer-events-none"
              title="Coming soon"
              aria-disabled="true"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          )
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">

          <img src="/logo.png" alt="Flowbit" className="w-8 h-8 rounded-lg object-cover" />
          <div>
            <p className="text-xl font-semibold text-gray-900">Flowbit AI</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

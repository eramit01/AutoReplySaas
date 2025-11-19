import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import api from "../lib/api.js";
import LeadTable from "../components/LeadTable.jsx";
import { Button } from "../components/ui/button.jsx";

const Leads = () => {
  const [filters, setFilters] = useState({ spaId: "", from: "", to: "" });

  const { data: spas = [] } = useQuery({
    queryKey: ["spas"],
    queryFn: async () => (await api.get("/spas")).data,
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => (await api.get("/leads")).data,
  });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (filters.spaId && lead.spaId !== filters.spaId) return false;
      if (filters.from && new Date(lead.createdAt) < new Date(filters.from))
        return false;
      if (filters.to && new Date(lead.createdAt) > new Date(filters.to))
        return false;
      return true;
    });
  }, [leads, filters]);

  const exportCsv = () => {
    const headers = ["Name", "Phone", "Spa", "Services", "Message", "Created"];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.phone,
      lead.spaName,
      lead.services.join("; "),
      lead.message,
      new Date(lead.createdAt).toISOString(),
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${val ?? ""}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "spa-leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-2xl font-semibold">Leads</p>
          <p className="text-sm text-slate-500">
            Track every inquiry across properties
          </p>
        </div>
        <Button variant="outline" onClick={exportCsv}>
          Export CSV
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <select
          value={filters.spaId}
          onChange={(e) => setFilters({ ...filters, spaId: e.target.value })}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
        >
          <option value="">All Spas</option>
          {spas.map((spa) => (
            <option key={spa._id} value={spa.spaId}>
              {spa.spaName}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
        <input
          type="date"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>
      <LeadTable leads={filteredLeads} />
    </div>
  );
};

export default Leads;


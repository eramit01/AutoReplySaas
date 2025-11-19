import { useQuery } from "@tanstack/react-query";
import { Crown, Users, MessageSquare } from "lucide-react";
import StatsCard from "../components/StatsCard.jsx";
import api from "../lib/api.js";

const Dashboard = () => {
  const { data: spas = [] } = useQuery({
    queryKey: ["spas"],
    queryFn: async () => {
      const { data } = await api.get("/spas");
      return data;
    },
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data } = await api.get("/leads");
      return data;
    },
  });

  const totalSpas = spas.length;
  const totalLeadsToday = leads.filter((lead) => {
    const date = new Date(lead.createdAt);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }).length;

  const topSpas = [...spas]
    .sort((a, b) => b.totalLeads - a.totalLeads)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          label="Active Spas"
          value={totalSpas}
          sublabel="Onboarded properties"
          icon={Crown}
        />
        <StatsCard
          label="Leads today"
          value={totalLeadsToday}
          sublabel="Across all spas"
          icon={Users}
        />
        <StatsCard
          label="Total Leads"
          value={leads.length}
          sublabel="All-time"
          icon={MessageSquare}
        />
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Top Spas</p>
            <p className="text-sm text-slate-500">
              Highest converting properties
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {topSpas.map((spa) => (
            <div
              key={spa._id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
            >
              <div>
                <p className="font-medium">{spa.spaName}</p>
                <p className="text-sm text-slate-500">{spa.offer}</p>
              </div>
              <span className="text-sm font-semibold text-brand-600">
                {spa.totalLeads} leads
              </span>
            </div>
          ))}
          {!topSpas.length && (
            <p className="text-sm text-slate-500">No spas yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


const StatsCard = ({ label, value, sublabel, icon: Icon, trend }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        {Icon && (
          <span className="rounded-full bg-brand-50 p-2 text-brand-600">
            <Icon size={18} />
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
        {trend && (
          <span className="font-semibold text-emerald-500">{trend}</span>
        )}
        <span>{sublabel}</span>
      </div>
    </div>
  );
};

export default StatsCard;


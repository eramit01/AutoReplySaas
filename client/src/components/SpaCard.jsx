import { Switch } from "@headlessui/react";
import { PenLine, Trash2 } from "lucide-react";

const SpaCard = ({ spa, onToggle, onEdit, onDelete, onSelect }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-semibold">{spa.spaName}</p>
          <p className="text-sm text-slate-500">{spa.spaId}</p>
        </div>
        <Switch
          checked={spa.isActive}
          onChange={() => onToggle(spa)}
          className={`${
            spa.isActive ? "bg-brand-600" : "bg-slate-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition" />
        </Switch>
      </div>
      <p className="mt-4 text-sm text-slate-600">Offer: {spa.offer || "N/A"}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{spa.services.length} services</span>
        <span>{spa.totalLeads} leads</span>
      </div>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => onSelect(spa)}
          className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium"
        >
          Embed Code
        </button>
        <button
          onClick={() => onEdit(spa)}
          className="rounded-full border border-slate-200 p-2 text-slate-600"
        >
          <PenLine size={16} />
        </button>
        <button
          onClick={() => onDelete(spa)}
          className="rounded-full border border-red-200 p-2 text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default SpaCard;


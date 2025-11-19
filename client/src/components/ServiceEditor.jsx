import { Plus, X } from "lucide-react";

const defaultService = () => ({
  id:
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
  title: "",
  priceRange: "",
  duration: "",
  popular: false,
});

const ServiceEditor = ({ services, onChange }) => {
  const addService = () => onChange([...services, defaultService()]);
  const updateService = (id, field, value) =>
    onChange(
      services.map((svc) => (svc.id === id ? { ...svc, [field]: value } : svc))
    );
  const removeService = (id) =>
    onChange(services.filter((svc) => svc.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Services</p>
        <button
          type="button"
          onClick={addService}
          className="flex items-center gap-2 rounded-full border border-dashed border-brand-400 px-4 py-2 text-sm text-brand-600"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>
      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium focus:border-brand-500 focus:outline-none"
                placeholder="Service name"
                value={service.title}
                onChange={(e) =>
                  updateService(service.id, "title", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeService(service.id)}
                className="ml-3 rounded-full border border-slate-200 p-1 text-slate-500"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <input
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                placeholder="Price range"
                value={service.priceRange}
                onChange={(e) =>
                  updateService(service.id, "priceRange", e.target.value)
                }
              />
              <input
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                placeholder="Duration"
                value={service.duration}
                onChange={(e) =>
                  updateService(service.id, "duration", e.target.value)
                }
              />
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={service.popular}
                  onChange={(e) =>
                    updateService(service.id, "popular", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                Mark as popular
              </label>
            </div>
          </div>
        ))}
        {!services.length && (
          <p className="text-sm text-slate-500">No services configured.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceEditor;


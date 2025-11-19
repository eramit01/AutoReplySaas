const LeadTable = ({ leads }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Spa</th>
            <th className="px-6 py-3">Services</th>
            <th className="px-6 py-3">Message</th>
            <th className="px-6 py-3">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td className="px-6 py-4 font-medium text-slate-900">
                {lead.name}
              </td>
              <td className="px-6 py-4 text-slate-600">{lead.phone}</td>
              <td className="px-6 py-4 text-slate-600">{lead.spaName}</td>
              <td className="px-6 py-4 text-slate-600">
                {lead.services?.join(", ")}
              </td>
              <td className="px-6 py-4 text-slate-600">{lead.message}</td>
              <td className="px-6 py-4 text-slate-600">
                {new Date(lead.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!leads.length && (
        <p className="px-6 py-10 text-center text-sm text-slate-500">
          No leads found.
        </p>
      )}
    </div>
  );
};

export default LeadTable;


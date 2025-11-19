import { NavLink } from "react-router-dom";
import { MessageCircle, LayoutDashboard, Users, Waypoints } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/spas", label: "Spas", icon: MessageCircle },
  { to: "/leads", label: "Leads", icon: Users },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 flex-col border-r bg-white/70 p-4 shadow-sm lg:flex">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-brand-600">
        <Waypoints size={28} />
        SpaBot
      </div>
      <nav className="flex flex-col gap-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-brand-50 ${
                isActive ? "bg-brand-100 text-brand-700" : "text-slate-600"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;


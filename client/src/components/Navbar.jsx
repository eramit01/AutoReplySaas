import { Menu, MoonStar, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ onMenuClick, theme, onToggleTheme }) => {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between border-b bg-white/60 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          className="rounded-md border px-2 py-1 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <p className="text-lg font-semibold">{user?.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full border text-slate-600"
        >
          {theme === "dark" ? <Sun size={18} /> : <MoonStar size={18} />}
        </button>
        <button
          onClick={logout}
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;


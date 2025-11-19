import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { useTheme } from "../hooks/useTheme.js";
import { useState } from "react";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden">
          <div className="h-full w-64 bg-white shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <Navbar
          onMenuClick={() => setMobileOpen((prev) => !prev)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="flex-1 bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;


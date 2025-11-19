import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("spa_theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("spa_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};


import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const Layout = () => {
  const { darkMode } = useTheme();

  console.log("darkMode =", darkMode);
  console.log("html classes =", document.documentElement.className);

  return (
    <div className="h-screen flex bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 text-slate-900 dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

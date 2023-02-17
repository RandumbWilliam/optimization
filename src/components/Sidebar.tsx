"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const Routes = [
  { id: "home", name: "Dashboard", path: "/" },
  { id: "graphical", name: "Graphical Method", path: "/graphical" },
  { id: "simplex", name: "Simplex Method", path: "/simplex" },
  { id: "primal_dual", name: "Primal to Dual", path: "/primal_dual" },
  { id: "dual_simplex", name: "Dual Simplex Method", path: "/dual_simplex" },
];

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen z-20 hidden w-60 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <div className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
          <Logo size={24} />
        </div>
        <ul className="mt-6">
          {Routes.map((route) => (
            <li key={route.id} className="relative px-6 py-3">
              <Link href={route.path}>
                <div
                  className={
                    pathname == route.path
                      ? "inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                      : "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  }
                >
                  {pathname == route.path && (
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  )}
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  <span className="ml-4">{route.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

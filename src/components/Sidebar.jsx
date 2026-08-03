import { NavLink } from "react-router-dom";

import { GraduationCapIcon } from "./icons/GraduationCapIcon";

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen shadow-xl">
      <div className="flex items-center gap-3 p-6">
        <GraduationCapIcon className="h-9 w-9 shrink-0 text-sky-400" />
        <h1 className="text-lg font-bold leading-snug">
          Sistema de Gestión de Cursos
        </h1>
      </div>

      <nav className="px-4">
        <ul className="space-y-1">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-3 rounded transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `block p-3 rounded transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700"
                }`
              }
            >
              Estudiantes
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `block p-3 rounded transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700"
                }`
              }
            >
              Cursos
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/enrollments"
              className={({ isActive }) =>
                `block p-3 rounded transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700"
                }`
              }
            >
              Matrículas
            </NavLink>
          </li>

        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
import { BrainCircuit, LayoutDashboard, ListTodo, PlusCircle } from "lucide-react";

export default function Header({ activePage, onNavigate }) {
  const links = [
    { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { id: "tasks", label: "Daftar Tugas", Icon: ListTodo },
    { id: "add", label: "Tambah Tugas", Icon: PlusCircle }
  ];

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={() => onNavigate("dashboard")} aria-label="Synaps dashboard">
          <span>Synaps<span className="brand-dot">.</span><small>STUDENT WORKSPACE</small></span>
        </button>
        <nav className="navigation" aria-label="Navigasi utama">
          {links.map(({ id, label, Icon }) => (
            <button key={id} className={`nav-link ${activePage === id ? "active" : ""}`} onClick={() => onNavigate(id)}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <div className="avatar" aria-label="Profil Tegar">T</div>
      </div>
    </header>
  );
}
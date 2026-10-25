import { useMemo, useState } from "react";
import { BookOpenCheck, CalendarDays, Plus, Search } from "lucide-react";
import Header from "./components/Header.jsx";
import TaskSummary from "./components/TaskSummary.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import EmptyState from "./components/EmptyState.jsx";

const initialTasks = [
  {
    id: 1,
    title: "Tugas 2 HTML",
    course: "Pemrograman Web",
    deadline: "2026-10-30",
    priority: "Tinggi",
    status: "Belum Selesai",
    description: "Membuat struktur halaman menggunakan semantic HTML5."
  },
  {
    id: 2,
    title: "Implementasi KNN",
    course: "Artificial Intelligence",
    deadline: "2026-11-02",
    priority: "Sedang",
    status: "Sedang Dikerjakan",
    description: "Mengimplementasikan algoritma KNN untuk klasifikasi data."
  },
  {
    id: 3,
    title: "Analisis Struktur Data",
    course: "Struktur Data",
    deadline: "2026-11-05",
    priority: "Rendah",
    status: "Selesai",
    description: "Menganalisis konsep struktur data dan penerapannya."
  }
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const summary = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((task) => task.status !== "Selesai").length,
    completed: tasks.filter((task) => task.status === "Selesai").length
  }), [tasks]);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const keyword = search.toLowerCase();
    const matchesSearch = task.title.toLowerCase().includes(keyword) ||
      task.course.toLowerCase().includes(keyword);
    const matchesStatus = statusFilter === "Semua Status" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [tasks, search, statusFilter]);

  const upcomingTasks = useMemo(() =>
    [...tasks]
      .filter((task) => task.status !== "Selesai")
      .sort((a, b) => a.deadline.localeCompare(b.deadline))
      .slice(0, 3),
    [tasks]
  );

  function addTask(newTask) {
    setTasks((currentTasks) => [{ ...newTask, id: Date.now() }, ...currentTasks]);
    setActivePage("tasks");
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function updateStatus(id, status) {
    setTasks((currentTasks) => currentTasks.map((task) =>
      task.id === id ? { ...task, status } : task
    ));
  }

  const isDashboard = activePage === "dashboard";
  const visibleTasks = isDashboard ? upcomingTasks : filteredTasks;

  return (
    <div className="app-shell">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        <section className="welcome">
          <div>
            <p className="eyebrow">RUANG KERJA KULIAH</p>
            <h1>{activePage === "add" ? "Catat tugas baru." : activePage === "tasks" ? "Semua tugasmu." : "Halo, Tegar!"}</h1>
            <p className="welcome-copy">
              {activePage === "add"
                ? "Masukkan detail tugas agar deadline tetap terpantau."
                : "Kelola tugas kuliah dan deadline-mu dalam satu tempat."}
            </p>
          </div>
          <div className="welcome-icon"><BookOpenCheck size={28} /></div>
        </section>

        {isDashboard && <TaskSummary summary={summary} />}

        {activePage === "add" ? (
          <TaskForm onAddTask={addTask} onCancel={() => setActivePage("tasks")} />
        ) : (
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">{isDashboard ? "DEADLINE TERDEKAT" : "DAFTAR TUGAS"}</p>
                <h2>{isDashboard ? "Yang perlu dikerjakan" : "Semua tugas"}</h2>
                <p className="muted">
                  {isDashboard
                    ? "Tugas belum selesai dengan deadline paling dekat."
                    : "Cari, filter, dan kelola semua tugasmu."}
                </p>
              </div>
              {isDashboard ? (
                <button className="secondary-button" onClick={() => setActivePage("tasks")}>Lihat semua</button>
              ) : (
                <button className="primary-button" onClick={() => setActivePage("add")}><Plus size={17} /> Tambah tugas</button>
              )}
            </div>

            {!isDashboard && (
              <div className="filters">
                <label className="search-box">
                  <Search size={17} />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari judul atau mata kuliah..." aria-label="Cari tugas" />
                </label>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter status">
                  <option>Semua Status</option>
                  <option>Belum Selesai</option>
                  <option>Sedang Dikerjakan</option>
                  <option>Selesai</option>
                </select>
              </div>
            )}

            {visibleTasks.length > 0 ? (
              <TaskList tasks={visibleTasks} onDeleteTask={deleteTask} onUpdateStatus={updateStatus} />
            ) : (
              <EmptyState
                message={
                  tasks.length === 0
                    ? "Belum ada data Tugas"
                    : isDashboard
                      ? "Semua tugas sudah selesai"
                      : "Tidak ada tugas yang cocok dengan pencarian."
                }
                hint={
                  tasks.length === 0
                    ? "Tugas yang kamu tambahkan akan muncul di bagian ini."
                    : isDashboard
                      ? "Kerja bagus! Tambahkan tugas baru kalau ada yang masuk."
                      : "Coba kata kunci atau filter status yang lain."
                }
              />
            )}
            <div className="panel-footer"><CalendarDays size={15} /> Data saat ini disimpan dalam state React selama aplikasi dibuka.</div>
          </section>
        )}
        <footer className="footer">Synaps <span>•</span> I Kadek Tegar Suanda</footer>
      </main>
    </div>
  );
}
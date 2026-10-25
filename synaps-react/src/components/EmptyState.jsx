import { ListTodo } from "lucide-react";

export default function EmptyState({
  message = "Belum ada data Tugas",
  hint = "Tugas yang kamu tambahkan akan muncul di bagian ini."
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><ListTodo size={27} /></span>
      <h3>{message}</h3>
      {hint && <p>{hint}</p>}
    </div>
  );
}
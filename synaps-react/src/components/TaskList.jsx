
import { CalendarDays, Trash2 } from "lucide-react";

function formatDate(date) {
  if (!date) return "Belum ditentukan";

  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TaskList({
  tasks,
  onDeleteTask,
  onUpdateStatus,
}) {
  return (
    <div className="task-table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>Nama Tugas</th>
            <th>Mata Kuliah</th>
            <th>Deadline</th>
            <th>Prioritas</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <div className="table-task-title">
                  {task.status === "Selesai" && (
                    <span className="table-check">✓</span>
                  )}
                  <strong
                    className={
                      task.status === "Selesai"
                        ? "completed-title"
                        : ""
                    }
                  >
                    {task.title}
                  </strong>
                  {task.description && (
                    <p className="table-description">
                      {task.description}
                    </p>
                  )}
                </div>
              </td>

              <td>{task.course}</td>

              <td>
                <span className="table-date">
                  <CalendarDays size={14} />
                  {formatDate(task.deadline)}
                </span>
              </td>

              <td>
                <span
                  className={`priority priority-${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              </td>

              <td>
                <select
                  className="table-status"
                  value={task.status}
                  onChange={(event) =>
                    onUpdateStatus(task.id, event.target.value)
                  }
                  aria-label={`Ubah status ${task.title}`}
                >
                  <option>Belum Selesai</option>
                  <option>Sedang Dikerjakan</option>
                  <option>Selesai</option>
                </select>
              </td>

              <td>
                <button
                  className="delete-button"
                  onClick={() => onDeleteTask(task.id)}
                  aria-label={`Hapus ${task.title}`}
                  title="Hapus tugas"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { CheckCircle2, CircleDashed, ListTodo } from "lucide-react";

export default function TaskSummary({ summary }) {
  const cards = [
    { label: "Total tugas", value: summary.total, note: "Semua tugas tercatat", Icon: ListTodo, style: "plum" },
    { label: "Belum selesai", value: summary.pending, note: "Masih perlu perhatian", Icon: CircleDashed, style: "amber" },
    { label: "Tugas selesai", value: summary.completed, note: "Progres yang sudah dicapai", Icon: CheckCircle2, style: "green" }
  ];

  return (
    <section className="summary-grid" aria-label="Ringkasan tugas">
      {cards.map(({ label, value, note, Icon, style }) => (
        <article className="summary-card" key={label}>
          <div className={`summary-icon ${style}`}><Icon size={19} /></div>
          <p className="summary-label">{label}</p>
          <div className="summary-bottom"><strong>{value}</strong><span>{note}</span></div>
        </article>
      ))}
    </section>
  );
}
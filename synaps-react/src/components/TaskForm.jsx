import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

const emptyForm = {
  title: "", course: "", deadline: "", priority: "Sedang",
  status: "Belum Selesai", description: ""
};

export default function TaskForm({ onAddTask, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.course || !form.deadline) {
      setError("Mohon isi judul, mata kuliah, dan deadline.");
      return;
    }
    onAddTask({ ...form, title: form.title.trim(), description: form.description.trim() });
    setForm(emptyForm);
    setError("");
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div><p className="eyebrow">TUGAS BARU</p><h2>Informasi tugas</h2><p className="muted">Lengkapi informasi berikut.</p></div>
        <button className="text-button" type="button" onClick={onCancel}><ArrowLeft size={16} /> Kembali</button>
      </div>
      <form onSubmit={handleSubmit} className="task-form">
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="field full"><label htmlFor="title">Judul tugas *</label><input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Contoh: Membuat website React" required /></div>
        <div className="field full"><label htmlFor="description">Deskripsi</label><textarea id="description" name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Jelaskan pekerjaan yang harus diselesaikan..." /></div>
        <div className="field"><label htmlFor="course">Mata kuliah *</label>
          <select id="course" name="course" value={form.course} onChange={handleChange} required>
            <option value="">Pilih mata kuliah</option><option>Pemrograman Web</option><option>Konstruksi Perangkat Lunak</option><option>Artificial Intelligence</option><option>Struktur Data</option><option>Basis Data</option>
          </select>
        </div>
        <div className="field"><label htmlFor="deadline">Deadline *</label><input id="deadline" type="date" name="deadline" value={form.deadline} onChange={handleChange} required /></div>
        <div className="field"><label htmlFor="priority">Prioritas</label><select id="priority" name="priority" value={form.priority} onChange={handleChange}><option>Rendah</option><option>Sedang</option><option>Tinggi</option></select></div>
        <div className="field"><label htmlFor="status">Status</label><select id="status" name="status" value={form.status} onChange={handleChange}><option>Belum Selesai</option><option>Sedang Dikerjakan</option><option>Selesai</option></select></div>
        <div className="form-actions full"><button className="primary-button" type="submit"><Save size={17} /> Simpan tugas</button><button className="secondary-button" type="button" onClick={() => setForm(emptyForm)}>Reset form</button></div>
      </form>
      <p className="form-note">* Wajib diisi. Data contoh dan tugas baru dikelola menggunakan state React.</p>
    </section>
  );
}
import { useState } from "react";
import { Search, Filter, ChevronDown, X, Download, Eye, Mail, Check, AlertCircle, Clock, FileText, User, Briefcase } from "lucide-react";
import { APPLICANTS, type Applicant, type Status } from "./data";

const STATUS_LABELS: Record<Status, string> = {
  waiting: 'Menunggu',
  review: 'On Review',
  accepted: 'Diterima',
  rejected: 'Ditolak',
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold status-${status}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

function ApplicantModal({ applicant, onClose, onStatusChange }: {
  applicant: Applicant;
  onClose: () => void;
  onStatusChange: (id: string, status: Status) => void;
}) {
  const [notes, setNotes] = useState(applicant.adminNotes);

  const TIMELINE: { status: Status; label: string; date?: string }[] = [
    { status: 'waiting', label: 'Terdaftar', date: applicant.registrationDate },
    { status: 'review', label: 'On Review', date: applicant.status !== 'waiting' ? '2024-11-10' : undefined },
    { status: applicant.status === 'accepted' ? 'accepted' : 'rejected', label: applicant.status === 'accepted' ? 'Diterima' : applicant.status === 'rejected' ? 'Ditolak' : 'Diterima/Ditolak' },
  ];

  const statusOrder: Status[] = ['waiting', 'review', 'accepted'];
  const currentIdx = statusOrder.indexOf(applicant.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="glass-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" style={{ background: 'var(--popover)', border: '1px solid var(--border)' }}>
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg, #003087, #1565c0)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: 'rgba(212,160,23,0.3)', fontFamily: 'var(--font-display)' }}>
              {applicant.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-white font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{applicant.name}</h2>
              <p className="text-xs" style={{ color: '#90caf9' }}>{applicant.nim} · {applicant.university}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={applicant.status} />
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
            {/* Left column */}
            <div className="p-6 space-y-6">
              {/* Personal info */}
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <User size={15} className="text-primary" /> Informasi Pribadi
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Nama Lengkap', value: applicant.name },
                    { label: 'NIM', value: applicant.nim },
                    { label: 'Universitas', value: applicant.university },
                    { label: 'Fakultas', value: applicant.faculty },
                    { label: 'Jurusan', value: applicant.major },
                    { label: 'Semester', value: `Semester ${applicant.semester}` },
                    { label: 'No. Telepon', value: applicant.phone },
                  ].map(f => (
                    <div key={f.label} className={f.label === 'Nama Lengkap' || f.label === 'Universitas' ? 'col-span-2' : ''}>
                      <div className="text-xs text-muted-foreground mb-0.5">{f.label}</div>
                      <div className="text-sm text-foreground font-medium">{f.value}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <Check size={15} className="text-primary" /> Keahlian
                </h3>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Internship info */}
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <Briefcase size={15} className="text-primary" /> Informasi Magang
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Jenis Program', value: applicant.program },
                    { label: 'Divisi', value: applicant.division },
                    { label: 'Periode Magang', value: applicant.period },
                    { label: 'No. Surat Rekomendasi', value: applicant.recommendationLetterNo },
                    { label: 'Tanggal Daftar', value: new Date(applicant.registrationDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) },
                  ].map(f => (
                    <div key={f.label} className="flex items-start justify-between gap-2">
                      <span className="text-xs text-muted-foreground flex-shrink-0">{f.label}</span>
                      <span className="text-xs text-foreground font-medium text-right">{f.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Timeline */}
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <Clock size={15} className="text-primary" /> Timeline Status
                </h3>
                <div className="flex items-center gap-2">
                  {['Menunggu', 'On Review', 'Diterima/Ditolak'].map((label, i) => {
                    const isActive = i <= currentIdx || (applicant.status === 'rejected' && i <= 2);
                    const isFinal = i === 2 && (applicant.status === 'accepted' || applicant.status === 'rejected');
                    const finalColor = applicant.status === 'accepted' ? '#10b981' : '#ef4444';
                    return (
                      <div key={label} className="flex items-center gap-2 flex-1">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{
                            background: isActive ? (isFinal ? finalColor : '#003087') : 'var(--muted)',
                            color: isActive ? 'white' : 'var(--muted-foreground)'
                          }}>
                            {i + 1}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 text-center" style={{ fontSize: '10px' }}>{label}</div>
                        </div>
                        {i < 2 && <div className="flex-1 h-0.5 mb-4" style={{ background: i < currentIdx ? '#003087' : 'var(--muted)' }} />}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="p-6 space-y-6">
              {/* Documents */}
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <FileText size={15} className="text-primary" /> Dokumen Diunggah
                </h3>
                <div className="space-y-2">
                  {applicant.documents.map(doc => (
                    <div key={doc.name} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--muted)' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white uppercase" style={{ background: doc.type === 'pdf' ? '#ef4444' : '#1976d2' }}>
                          {doc.type}
                        </div>
                        <span className="text-sm text-foreground">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary">
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Admin notes */}
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>Catatan Admin</h3>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm resize-none focus:outline-none focus:border-primary"
                  placeholder="Tambahkan catatan untuk pelamar ini..."
                />
              </section>

              {/* Actions */}
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>Tindakan Admin</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onStatusChange(applicant.id, 'review')}
                    disabled={applicant.status === 'review'}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                    style={{ background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' }}
                  >
                    <AlertCircle size={13} /> Pindah ke On Review
                  </button>
                  <button
                    onClick={() => onStatusChange(applicant.id, 'accepted')}
                    disabled={applicant.status === 'accepted'}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                    style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' }}
                  >
                    <Check size={13} /> Terima Pelamar
                  </button>
                  <button
                    onClick={() => onStatusChange(applicant.id, 'rejected')}
                    disabled={applicant.status === 'rejected'}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                    style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }}
                  >
                    <X size={13} /> Tolak Pelamar
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ background: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}
                  >
                    <Mail size={13} /> Kirim Email
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApplicantDataPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(APPLICANTS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | ''>('');
  const [filterDivision, setFilterDivision] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [selected, setSelected] = useState<Applicant | null>(null);

  const filtered = applicants.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.nim.includes(search) || a.university.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || a.status === filterStatus;
    const matchDiv = !filterDivision || a.division === filterDivision;
    const matchProg = !filterProgram || a.program === filterProgram;
    return matchSearch && matchStatus && matchDiv && matchProg;
  });

  function handleStatusChange(id: string, status: Status) {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
  }

  const divisions = [...new Set(applicants.map(a => a.division))];
  const programs = [...new Set(applicants.map(a => a.program))];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>Data Pelamar</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} pelamar ditemukan</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #003087, #1565c0)' }}>
          <Filter size={14} /> Ekspor Data
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:border-primary"
            placeholder="Cari nama, NIM, atau universitas..."
          />
        </div>
        {[
          { value: filterProgram, onChange: (v: string) => setFilterProgram(v), options: programs, placeholder: 'Semua Program' },
          { value: filterDivision, onChange: (v: string) => setFilterDivision(v), options: divisions, placeholder: 'Semua Divisi' },
        ].map((sel, i) => (
          <select
            key={i}
            value={sel.value}
            onChange={e => sel.onChange(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:border-primary"
          >
            <option value="">{sel.placeholder}</option>
            {sel.options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as Status | '')}
          className="px-3 py-2 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:border-primary"
        >
          <option value="">Semua Status</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        {(search || filterStatus || filterDivision || filterProgram) && (
          <button onClick={() => { setSearch(''); setFilterStatus(''); setFilterDivision(''); setFilterProgram(''); }} className="px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <X size={13} /> Reset
          </button>
        )}
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                {['Nama Pelamar', 'NIM', 'Universitas', 'Divisi', 'Program', 'Tgl Daftar', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,48,135,0.02)' }} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #003087, #1565c0)' }}>
                        {a.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-foreground">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>{a.nim}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{a.university}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-medium" style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>{a.division}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{a.program.replace('Internship', '').trim()}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                    {new Date(a.registrationDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(a)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #003087, #1565c0)' }}>
                      Detail & Aksi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Tidak ada pelamar yang ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <ApplicantModal
          applicant={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

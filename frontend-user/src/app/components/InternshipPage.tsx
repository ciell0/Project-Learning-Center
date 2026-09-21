import { useState } from "react";
import {
  Briefcase,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Share2,
  LayoutGrid,
  Zap,
  MapPin,
  Award,
} from "lucide-react";
import { InternshipWizard } from "./InternshipWizard";

const REGULAR_REQS = [
  "Mahasiswa aktif S1/S2/D4 semester 5 ke atas",
  "IPK minimal 3.00 (skala 4.00) semester terakhir",
  "Berlaku sepanjang tahun (rolling basis)",
  "Durasi magang 1–3 bulan sesuai kebutuhan",
  "Surat rekomendasi dari dosen/kampus",
  "CV terbaru dan transkrip nilai",
];

const MALABAR_REQS = [
  "Mahasiswa aktif S1/S2 dari PTN/PTS terakreditasi A",
  "IPK minimal 3.25 (skala 4.00)",
  "Usia maksimal 25 tahun saat mendaftar",
  "Tidak sedang menerima beasiswa lain",
  "Tidak sedang magang di tempat lain",
  "Bersedia ditempatkan di divisi yang ditentukan",
];

const DIVISIONS = [
  {
    id: "umkm",
    title: "UMKM Assistance",
    icon: TrendingUp,
    desc: "Mendukung program pemberdayaan UMKM melalui pelatihan, pendampingan, dan monitoring perkembangan usaha.",
    requirements: [
      "Ekonomi/Manajemen/Akuntansi",
      "Tertarik di bidang pemberdayaan ekonomi",
      "Kemampuan analisis data",
    ],
    quota: 4,
    color: "from-[#065F46] to-[#10A070]",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    id: "socmed",
    title: "Social Media",
    icon: Share2,
    desc: "Mengelola konten dan strategi media sosial BI Malang untuk meningkatkan keterlibatan publik.",
    requirements: [
      "Pengalaman content creation",
      "Menguasai Canva/Adobe suite",
      "Kreatif dan komunikatif",
    ],
    quota: 3,
    color: "from-[#7C1B5A] to-[#C2456A]",
    bg: "bg-pink-50/60 dark:bg-pink-950/20",
    border: "border-pink-200/60 dark:border-pink-800/40",
    badge:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    id: "library",
    title: "Library",
    icon: BookOpen,
    desc: "Membantu pengelolaan koleksi perpustakaan, katalogisasi, dan pengembangan sistem digital.",
    requirements: [
      "Ilmu Perpustakaan/Informatika",
      "Teliti dan terorganisir",
      "Familiar dengan sistem informasi",
    ],
    quota: 2,
    color: "from-[#003087] to-[#1A5CB8]",
    bg: "bg-blue-50/60 dark:bg-blue-950/20",
    border: "border-blue-200/60 dark:border-blue-800/40",
    badge:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "other",
    title: "Divisi Lainnya",
    icon: LayoutGrid,
    desc: "Mencakup Sistem Pembayaran, Statistik, Komunikasi, dan Hukum sesuai kebutuhan BI Malang.",
    requirements: [
      "Sesuai kebutuhan divisi",
      "Diinformasikan saat seleksi administrasi",
    ],
    quota: 5,
    color: "from-[#4A1A9A] to-[#7B3FBF]",
    bg: "bg-purple-50/60 dark:bg-purple-950/20",
    border: "border-purple-200/60 dark:border-purple-800/40",
    badge:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
];

const TIMELINE = [
  {
    date: "10–30 Jun 2026",
    title: "Pendaftaran Online",
    desc: "Upload dokumen & isi formulir",
    status: "active",
  },
  {
    date: "1–5 Jul 2026",
    title: "Seleksi Administrasi",
    desc: "Verifikasi dokumen tim BI Malang",
    status: "upcoming",
  },
  {
    date: "21 Jul 2026",
    title: "Pengumuman Hasil",
    desc: "Notifikasi via email dan platform",
    status: "upcoming",
  },
  {
    date: "1 Agu 2026",
    title: "Mulai Magang",
    desc: "Orientasi dan penempatan divisi",
    status: "upcoming",
  },
];

export function InternshipPage({
  isLoggedIn,
  onNavigate,
}: {
  isLoggedIn: boolean;
  onNavigate: (p: string) => void;
}) {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardType, setWizardType] = useState<
    "regular" | "malabar"
  >("regular");
  const [selectedDivision, setSelectedDiv] = useState<
    string | undefined
  >();

  const handleApply = (
    type: "regular" | "malabar",
    divisionId?: string,
  ) => {
    if (!isLoggedIn) {
      onNavigate("login");
      return;
    }
    setWizardType(type);
    setSelectedDiv(divisionId);
    setWizardOpen(true);
  };

  if (wizardOpen) {
    return (
      <InternshipWizard
        type={wizardType}
        initialDivision={selectedDivision}
        onClose={() => setWizardOpen(false)}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pt-[89px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#001A4D] to-[#003087] text-white py-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Briefcase size={26} />
              </div>
              <div>
                <h1
                  className="font-bold text-xl"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  Program Magang BI Malang
                </h1>
                <p className="text-white/55 text-sm">
                  Internship Programs · Bank Indonesia Malang
                </p>
              </div>
            </div>
            <div className="flex gap-8">
              {[
                { v: "2", l: "Program Aktif" },
                { v: "14", l: "Kuota Tersedia" },
                { v: "2026", l: "Batch Berjalan" },
                { v: "3 bln", l: "Durasi Maks." },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-[#C9A84C] font-bold text-xl font-data">
                    {s.v}
                  </p>
                  <p className="text-white/50 text-xs">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Program Cards */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-bold text-foreground"
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: "1.2rem",
            }}
          >
            Program Magang
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* BI Regular */}
          <div className="rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-[#003087]/8 transition-all duration-300 bg-card">
            <div className="bg-gradient-to-r from-[#003087] to-[#1A72C8] p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p
                      className="font-bold text-base leading-none"
                      style={{
                        fontFamily: "Poppins,sans-serif",
                      }}
                    >
                      BI Regular Internship
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      Program Magang Reguler
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-400/20 border border-emerald-400/30 rounded-full text-emerald-300 text-[11px] font-semibold">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full blink" />
                  Buka Sepanjang Tahun
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Program magang reguler Bank Indonesia yang
                dibuka sepanjang tahun secara rolling basis
                untuk mahasiswa aktif dari berbagai jurusan.
              </p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 mb-5 p-3 bg-muted/30 rounded-xl">
                {[
                  {
                    icon: Clock,
                    label: "Durasi",
                    val: "1–3 Bulan",
                  },
                  {
                    icon: Calendar,
                    label: "Pendaftaran",
                    val: "Sepanjang Tahun",
                  },
                  {
                    icon: Zap,
                    label: "Tipe",
                    val: "Rolling Basis",
                  },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="text-center">
                    <Icon
                      size={15}
                      className="text-[#003087] dark:text-[#4A8FE0] mx-auto mb-1"
                    />
                    <p className="text-[9px] text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-[11px] font-semibold text-foreground leading-tight">
                      {val}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                Persyaratan
              </p>
              <ul className="space-y-1.5 mb-5">
                {REGULAR_REQS.slice(0, 4).map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle
                      size={12}
                      className="text-emerald-500 mt-0.5 shrink-0"
                    />
                    {r}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleApply("regular")}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#003087] dark:bg-[#4A8FE0] text-white rounded-xl font-semibold hover:brightness-110 transition-all text-sm"
              >
                <Briefcase size={15} />
                Daftar Regular Internship
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* BI Malabar */}
          <div className="rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-[#C9A84C]/10 transition-all duration-300 bg-card">
            <div className="bg-gradient-to-r from-[#5C2800] to-[#C9A84C] p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
                    <Award size={20} />
                  </div>
                  <div>
                    <p
                      className="font-bold text-base leading-none"
                      style={{
                        fontFamily: "Poppins,sans-serif",
                      }}
                    >
                      BI Malabar Internship
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      Program Magang Kompetitif
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-white/90 text-[11px] font-semibold">
                  Batch 3/2026
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Program magang kompetitif berbasis divisi dengan
                proses seleksi ketat. Cocok untuk mahasiswa
                berprestasi yang ingin pengalaman nyata di BI.
              </p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 mb-5 p-3 bg-muted/30 rounded-xl">
                {[
                  {
                    icon: Calendar,
                    label: "Pendaftaran",
                    val: "10–30 Jun 2026",
                  },
                  {
                    icon: Clock,
                    label: "Periode",
                    val: "Agu–Okt 2026",
                  },
                  {
                    icon: Users,
                    label: "Total Kuota",
                    val: "14 Mahasiswa",
                  },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="text-center">
                    <Icon
                      size={15}
                      className="text-[#C9A84C] mx-auto mb-1"
                    />
                    <p className="text-[9px] text-muted-foreground">
                      {label}
                    </p>
                    <p className="text-[11px] font-semibold text-foreground leading-tight">
                      {val}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                Persyaratan
              </p>
              <ul className="space-y-1.5 mb-5">
                {MALABAR_REQS.slice(0, 4).map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle
                      size={12}
                      className="text-amber-500 mt-0.5 shrink-0"
                    />
                    {r}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleApply("malabar")}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#5C2800] to-[#C9A84C] text-white rounded-xl font-semibold hover:brightness-110 transition-all text-sm"
              >
                <Award size={15} />
                Daftar Malabar Internship
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Divisions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="font-bold text-foreground"
                style={{
                  fontFamily: "Poppins,sans-serif",
                  fontSize: "1.2rem",
                }}
              >
                Divisi Program BI Malabar
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Pilih divisi yang sesuai dengan minat dan
                keahlian Anda
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full text-xs font-semibold">
              <Users size={11} /> 14 Kuota Tersedia
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DIVISIONS.map((div) => {
              const Icon = div.icon;
              return (
                <div
                  key={div.id}
                  className={`group rounded-2xl border ${div.border} ${div.bg} hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden`}
                >
                  <div
                    className={`bg-gradient-to-r ${div.color} p-4`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon
                          size={18}
                          className="text-white"
                        />
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${div.badge} bg-white/20 text-white border border-white/25`}
                      >
                        {div.quota} kuota
                      </span>
                    </div>
                    <p className="text-white font-bold text-sm leading-snug">
                      {div.title}
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                      {div.desc}
                    </p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                      Persyaratan
                    </p>
                    <ul className="space-y-1 mb-4">
                      {div.requirements.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
                        >
                          <ChevronRight
                            size={9}
                            className="mt-0.5 text-[#003087] dark:text-[#4A8FE0] shrink-0"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() =>
                        handleApply("malabar", div.id)
                      }
                      className={`w-full py-2 rounded-xl bg-gradient-to-r ${div.color} text-white text-xs font-semibold hover:brightness-110 transition-all`}
                    >
                      Apply Divisi Ini
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selection Timeline */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="font-bold text-foreground text-sm"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                Timeline Seleksi BI Malabar Batch 3/2026
              </h3>
              <p className="text-muted-foreground text-xs mt-1">
                Jadwal proses seleksi dari pendaftaran hingga
                mulai magang
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full font-semibold">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full blink" />
              Pendaftaran Buka
            </div>
          </div>

          {/* Timeline horizontal on desktop */}
          <div className="hidden lg:flex items-start gap-0 relative">
            <div className="absolute top-5 left-0 right-0 h-px bg-border" />
            {TIMELINE.map((step, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center text-center px-2"
              >
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 mb-3 transition-all ${
                    step.status === "active"
                      ? "bg-[#C9A84C] border-[#C9A84C] text-white shadow-lg shadow-[#C9A84C]/30"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  {step.status === "active" ? (
                    <Zap size={14} />
                  ) : (
                    <span className="text-xs font-bold">
                      {i + 1}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[10px] font-bold mb-0.5 ${step.status === "active" ? "text-[#C9A84C]" : "text-foreground"}`}
                >
                  {step.title}
                </p>
                <p className="text-[9px] text-muted-foreground leading-snug">
                  {step.desc}
                </p>
                <p className="text-[9px] font-data text-muted-foreground mt-1">
                  {step.date}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline vertical on mobile */}
          <div className="lg:hidden relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            {TIMELINE.map((step, i) => (
              <div
                key={i}
                className="relative flex gap-4 pb-5 last:pb-0"
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                    step.status === "active"
                      ? "bg-[#C9A84C] border-[#C9A84C] text-white"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  <span className="text-[10px] font-bold">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-[10px] text-muted-foreground font-data">
                    {step.date}
                  </p>
                  <p
                    className={`text-sm font-semibold ${step.status === "active" ? "text-[#C9A84C]" : "text-foreground"}`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Award,
              title: "Sertifikat Resmi BI",
              desc: "Sertifikat magang resmi dikeluarkan dan ditandatangani langsung oleh pimpinan Bank Indonesia.",
            },
            {
              icon: MapPin,
              title: "Lokasi Strategis",
              desc: "Kantor BI Malang berlokasi di pusat kota, mudah dijangkau dari berbagai kampus di Malang.",
            },
            {
              icon: TrendingUp,
              title: "Pengalaman Nyata",
              desc: "Terlibat langsung dalam tugas nyata, bukan sekadar observasi atau fotokopi dokumen.",
            },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="flex gap-4 p-5 bg-card rounded-2xl border border-border hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-[#003087]/8 dark:bg-[#4A8FE0]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon
                    size={18}
                    className="text-[#003087] dark:text-[#4A8FE0]"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">
                    {b.title}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Briefcase,
  Users,
  Coffee,
  ArrowRight,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  Award,
  Zap,
  Star,
  Globe,
  Shield,
  Bell,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";

/* ── Animated counter ── */
function Counter({
  end,
  suffix = "",
}: {
  end: number;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const pct = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - pct, 3);
          setVal(Math.round(eased * end));
          if (pct < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return (
    <span ref={ref} className="font-data">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

const TICKER_ITEMS = [
  "📢  Pendaftaran BI Malabar Batch 3/2026 dibuka 10–30 Juni 2026",
  "📚  200 judul buku digital baru tersedia di Perpustakaan",
  "🏆  GenBI Malang meraih penghargaan Program Sosial Terbaik 2025",
  "💻  BI Corner kini dilengkapi workstation komputer baru",
  "📋  Pengumuman hasil seleksi Regular Internship April 2026 telah terbit",
];

const STATS = [
  {
    label: "Koleksi Buku",
    value: 12450,
    suffix: "+",
    icon: BookOpen,
    color: "from-[#003087] to-[#1A5CB8]",
  },
  {
    label: "Program Magang",
    value: 4,
    suffix: "",
    icon: Briefcase,
    color: "from-[#8B4513] to-[#C9A84C]",
  },
  {
    label: "Pengguna Aktif",
    value: 3200,
    suffix: "+",
    icon: Users,
    color: "from-[#1A3080] to-[#4A6ABF]",
  },
  {
    label: "Fasilitas",
    value: 8,
    suffix: "+",
    icon: Star,
    color: "from-[#0D6E4A] to-[#2DAB7F]",
  },
];

const SERVICES = [
  {
    id: "library",
    title: "Perpustakaan Digital",
    desc: "Akses ribuan buku, jurnal, dan referensi ekonomi & keuangan kapan saja.",
    icon: BookOpen,
    badge: "12.450+ Koleksi",
    gradient: "from-[#003087] to-[#1A5CB8]",
    bg: "bg-blue-50/70 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/30",
    accentBg: "bg-blue-100 dark:bg-blue-900/30",
    accentText: "text-blue-700 dark:text-blue-400",
  },
  {
    id: "internship",
    title: "Program Magang",
    desc: "Magang bergengsi BI Regular & Malabar dengan pengalaman nyata perbankan sentral.",
    icon: Briefcase,
    badge: "Pendaftaran Buka",
    gradient: "from-[#7C3400] to-[#C9A84C]",
    bg: "bg-amber-50/70 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-950/30",
    accentBg: "bg-amber-100 dark:bg-amber-900/30",
    accentText: "text-amber-700 dark:text-amber-400",
  },
  {
    id: "genbi",
    title: "Generasi Baru Indonesia",
    desc: "Komunitas penerima beasiswa BI yang aktif dalam pemberdayaan ekonomi nasional.",
    icon: Users,
    badge: "Komunitas Aktif",
    gradient: "from-[#4A1A9A] to-[#7B3FBF]",
    bg: "bg-purple-50/70 dark:bg-purple-950/20 hover:bg-purple-50 dark:hover:bg-purple-950/30",
    accentBg: "bg-purple-100 dark:bg-purple-900/30",
    accentText: "text-purple-700 dark:text-purple-400",
  },
  {
    id: "bicorner",
    title: "BI Corner",
    desc: "Sudut belajar lengkap dengan area baca, komputer, jurnal, dan ruang multimedia.",
    icon: Coffee,
    badge: "Buka Setiap Hari",
    gradient: "from-[#065F46] to-[#10A070]",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
    accentBg: "bg-emerald-100 dark:bg-emerald-900/30",
    accentText: "text-emerald-700 dark:text-emerald-400",
  },
];

const ANNOUNCEMENTS = [
  {
    date: "10 Jun 2026",
    title:
      "Pendaftaran Magang BI Malabar Batch 3/2026 Resmi Dibuka",
    cat: "Magang",
    catColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    new: true,
  },
  {
    date: "05 Jun 2026",
    title:
      "Penambahan 200 Judul Buku Digital Bidang Ekonomi & Keuangan",
    cat: "Perpustakaan",
    catColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    new: false,
  },
  {
    date: "01 Jun 2026",
    title:
      "Sosialisasi Program GenBI Malang 2026 – Pendaftaran Terbuka",
    cat: "GenBI",
    catColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    new: false,
  },
  {
    date: "28 Mei 2026",
    title:
      "BI Corner Hadirkan 10 Unit Komputer Baru & Ruang Multimedia",
    cat: "BI Corner",
    catColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    new: false,
  },
  {
    date: "20 Mei 2026",
    title:
      "Workshop Literasi Keuangan Digital untuk Mahasiswa Malang",
    cat: "Acara",
    catColor:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    new: false,
  },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Resmi Bank Indonesia",
    desc: "Platform terintegrasi resmi dari Kantor Perwakilan Bank Indonesia Malang.",
  },
  {
    icon: Zap,
    title: "Akses 24/7 Digital",
    desc: "Koleksi digital tersedia kapan saja, dari mana saja tanpa batas waktu.",
  },
  {
    icon: Globe,
    title: "Jaringan Nasional",
    desc: "Terhubung dengan ekosistem Bank Indonesia di seluruh Indonesia.",
  },
  {
    icon: Award,
    title: "Sertifikat Resmi",
    desc: "Sertifikat magang dan partisipasi diakui secara resmi oleh Bank Indonesia.",
  },
];

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [tickerPos, setTickerPos] = useState(0);

  /* News ticker */
  useEffect(() => {
    const id = setInterval(
      () => setTickerPos((p) => (p + 1) % TICKER_ITEMS.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ══════════════════════════ TICKER ══════════════════════════ */}
      <div className="fixed top-[62px] left-0 right-0 z-40 bg-[#C9A84C] text-white overflow-hidden h-7 flex items-center">
        <div className="shrink-0 px-3 bg-[#003087] h-full flex items-center text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
          PENGUMUMAN
        </div>
        <div className="overflow-hidden flex-1 px-4">
          <p className="text-[11px] font-medium truncate transition-all duration-500">
            {TICKER_ITEMS[tickerPos]}
          </p>
        </div>
      </div>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="hero-mesh min-h-screen flex items-center pt-[89px] pb-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-center">
            {/* Left */}
            <div className="z-10 relative">
              {/* Institution badge */}
              <div className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full glass-card mb-8 border-white/20">
                <div className="w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center text-[9px] font-bold text-white pulse-gold">
                  BI
                </div>
                <span className="text-white/85 text-[12px] font-medium">
                  Bank Indonesia Kantor Perwakilan Malang
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-white leading-[1.12] mb-6"
                style={{
                  fontSize: "clamp(2.2rem,4.5vw,3.4rem)",
                  fontFamily: "Poppins,sans-serif",
                  fontWeight: 700,
                }}
              >
                Satu Platform untuk{" "}
                <span className="gradient-text">Belajar,</span>{" "}
                Perpustakaan &{" "}
                <span className="gradient-text">
                  Pengembangan
                </span>{" "}
                Magang
              </h1>

              <p
                className="text-white/65 leading-relaxed mb-10 max-w-[520px]"
                style={{ fontSize: "1.05rem" }}
              >
                BI Malang Learning Center mengintegrasikan
                perpustakaan digital, program magang bergengsi,
                komunitas GenBI, dan BI Corner dalam satu
                ekosistem digital yang modern.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 mb-12">
                <button
                  onClick={() => onNavigate("library")}
                  className="group flex items-center gap-2.5 px-6 py-3 bg-white text-[#003087] rounded-2xl font-semibold hover:bg-[#C9A84C] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                >
                  <BookOpen size={17} />
                  Jelajahi Perpustakaan
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
                <button
                  onClick={() => onNavigate("internship")}
                  className="group flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold glass border-white/30 text-white hover:bg-white/15 transition-all duration-300 text-sm"
                >
                  <Briefcase size={17} />
                  Daftar Magang
                </button>
              </div>

              {/* Key numbers */}
              <div className="flex flex-wrap gap-8">
                {[
                  {
                    val: 12450,
                    suf: "+",
                    label: "Koleksi Buku",
                  },
                  { val: 3200, suf: "+", label: "Pengguna" },
                  {
                    val: 200,
                    suf: "+",
                    label: "Alumni Magang",
                  },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-[#C9A84C] font-bold leading-none"
                      style={{ fontSize: "1.8rem" }}
                    >
                      <Counter end={s.val} suffix={s.suf} />
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – glass cards grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4 z-10">
              {SERVICES.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <button
                    key={svc.id}
                    onClick={() => onNavigate(svc.id)}
                    className={`group text-left p-5 rounded-2xl glass border-white/15 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${i % 2 === 1 ? "mt-5" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center mb-3.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                    <p className="text-white font-semibold text-sm mb-1.5 leading-snug">
                      {svc.title}
                    </p>
                    <p className="text-white/45 text-[11px] leading-relaxed line-clamp-2">
                      {svc.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[#C9A84C] text-[11px] font-semibold">
                      {svc.badge}
                      <ArrowUpRight
                        size={11}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="w-full h-[90px]"
          >
            <path
              d="M0,90 C360,30 1080,80 1440,20 L1440,90 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════ STATS ══════════════════════════ */}
      <section className="py-16 bg-background">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="group relative overflow-hidden rounded-2xl p-5 bg-card border border-border hover:shadow-xl hover:shadow-[#003087]/8 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3 bg-gradient-to-br from-[#003087] to-[#1A5CB8]" />
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-md`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <p
                    className="text-foreground font-bold leading-none mb-1.5"
                    style={{
                      fontSize: "1.75rem",
                      fontFamily: "Poppins,sans-serif",
                    }}
                  >
                    <Counter end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ SERVICES ══════════════════════════ */}
      <section className="py-20 bg-secondary/25">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003087]/8 text-[#003087] dark:bg-[#4A8FE0]/10 dark:text-[#4A8FE0] text-xs font-semibold mb-3">
                <TrendingUp size={12} />
                Layanan Kami
              </div>
              <h2
                className="text-foreground"
                style={{ fontSize: "1.7rem", fontWeight: 700 }}
              >
                Layanan Unggulan
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm">
                Dirancang khusus untuk mendukung perjalanan
                akademik dan profesional Anda.
              </p>
            </div>
            <button
              onClick={() => onNavigate("library")}
              className="flex items-center gap-1.5 text-[#003087] dark:text-[#4A8FE0] text-sm font-semibold hover:gap-2.5 transition-all whitespace-nowrap"
            >
              Lihat Semua <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <button
                  key={svc.id}
                  onClick={() => onNavigate(svc.id)}
                  className={`group text-left p-6 rounded-2xl border border-border ${svc.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#003087]/8`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-3 border border-current/20 ${svc.accentText} ${svc.accentBg}`}
                  >
                    {svc.badge}
                  </span>
                  <h3 className="text-foreground font-bold text-sm mb-2 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    {svc.desc}
                  </p>
                  <div className="flex items-center gap-1 text-[#003087] dark:text-[#4A8FE0] text-xs font-semibold group-hover:gap-1.5 transition-all">
                    Selengkapnya <ArrowRight size={12} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ ANNOUNCEMENTS ══════════════════════════ */}
      <section className="py-20 bg-background">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Announcements list */}
            <div>
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h2
                    className="text-foreground font-bold"
                    style={{ fontSize: "1.3rem" }}
                  >
                    Pengumuman Terbaru
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Informasi terkini dari BI Malang Learning
                    Center
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 dark:bg-red-900/20 rounded-full text-red-600 dark:text-red-400">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full blink" />
                  <span className="text-[10px] font-bold">
                    LIVE
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {ANNOUNCEMENTS.map((ann, i) => (
                  <button
                    key={i}
                    className="group w-full text-left flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-[#003087]/20 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#003087]/8 dark:bg-[#4A8FE0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#003087]/15 transition-colors">
                      <Bell
                        size={16}
                        className="text-[#003087] dark:text-[#4A8FE0]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${ann.catColor}`}
                        >
                          {ann.cat}
                        </span>
                        {ann.new && (
                          <span className="px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[9px] font-bold">
                            NEW
                          </span>
                        )}
                        <span className="text-muted-foreground text-[10px]">
                          {ann.date}
                        </span>
                      </div>
                      <p className="text-foreground text-sm font-medium leading-snug group-hover:text-[#003087] dark:group-hover:text-[#4A8FE0] transition-colors">
                        {ann.title}
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-muted-foreground shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Why us card */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#001A4D] to-[#003087] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-[#C9A84C] rounded-lg flex items-center justify-center text-[9px] font-bold">
                    BI
                  </div>
                  <p className="font-bold text-sm">
                    Mengapa BI Malang LC?
                  </p>
                </div>
                <div className="space-y-4">
                  {WHY_US.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Icon
                            size={14}
                            className="text-[#C9A84C]"
                          />
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold mb-0.5">
                            {item.title}
                          </p>
                          <p className="text-white/55 text-[11px] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  Akses Cepat
                </p>
                <div className="space-y-2">
                  {[
                    {
                      id: "library",
                      label: "Cari Buku",
                      icon: BookOpen,
                    },
                    {
                      id: "internship",
                      label: "Daftar Magang",
                      icon: Briefcase,
                    },
                    {
                      id: "genbi",
                      label: "Info Beasiswa GenBI",
                      icon: Award,
                    },
                    {
                      id: "bicorner",
                      label: "Jadwal BI Corner",
                      icon: Coffee,
                    },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => onNavigate(id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-secondary/60 transition-colors text-left group"
                    >
                      <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-[#003087] group-hover:text-white transition-all">
                        <Icon
                          size={13}
                          className="text-[#003087] dark:text-[#4A8FE0] group-hover:text-white"
                        />
                      </div>
                      <span className="text-foreground text-sm">
                        {label}
                      </span>
                      <ChevronRight
                        size={12}
                        className="text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CTA ══════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001A4D] via-[#003087] to-[#1A5CB8]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(45deg,rgba(201,168,76,0.3) 1px,transparent 1px),linear-gradient(-45deg,rgba(201,168,76,0.3) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-6">
            <CheckCircle size={12} className="text-[#C9A84C]" />
            Platform Resmi Bank Indonesia Malang
          </div>
          <h2
            className="text-white font-bold mb-4"
            style={{ fontSize: "2rem" }}
          >
            Mulai Perjalanan Anda Sekarang
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto text-sm">
            Daftar gratis dan dapatkan akses penuh ke seluruh
            layanan BI Malang Learning Center.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate("register")}
              className="px-7 py-3 bg-[#C9A84C] text-white rounded-2xl font-semibold hover:brightness-110 transition-all shadow-lg text-sm"
            >
              Daftar Gratis Sekarang
            </button>
            <button
              onClick={() => onNavigate("library")}
              className="px-7 py-3 bg-white/10 border border-white/25 text-white rounded-2xl font-semibold hover:bg-white/15 transition-all text-sm"
            >
              Lihat Koleksi Buku
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer className="bg-[#030A1A] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-[2fr_1fr_1fr_1.4fr] gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-[#003087] to-[#1A5CB8] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="font-bold text-white text-sm">
                    BI
                  </span>
                </div>
                <div>
                  <p
                    className="font-bold text-sm leading-none"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    BI Malang Learning Center
                  </p>
                  <p className="text-white/35 text-[10px] mt-0.5">
                    Bank Indonesia Kantor Perwakilan Malang
                  </p>
                </div>
              </div>
              <p className="text-white/45 text-xs leading-relaxed max-w-xs">
                Platform digital terpadu untuk perpustakaan,
                magang, GenBI, dan BI Corner Bank Indonesia
                Malang.
              </p>
            </div>

            {/* Layanan */}
            <div>
              <p className="font-semibold text-[#C9A84C] text-xs uppercase tracking-widest mb-4">
                Layanan
              </p>
              {[
                "Perpustakaan",
                "Program Magang",
                "GenBI",
                "BI Corner",
              ].map((l) => (
                <p
                  key={l}
                  className="text-white/45 text-xs mb-2.5 hover:text-white cursor-pointer transition-colors"
                >
                  {l}
                </p>
              ))}
            </div>

            {/* Info */}
            <div>
              <p className="font-semibold text-[#C9A84C] text-xs uppercase tracking-widest mb-4">
                Platform
              </p>
              {[
                "Tentang Kami",
                "Kebijakan Privasi",
                "Syarat & Ketentuan",
                "FAQ",
              ].map((l) => (
                <p
                  key={l}
                  className="text-white/45 text-xs mb-2.5 hover:text-white cursor-pointer transition-colors"
                >
                  {l}
                </p>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p className="font-semibold text-[#C9A84C] text-xs uppercase tracking-widest mb-4">
                Kontak
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: MapPin,
                    text: "Jl. Merdeka Utara No.7, Kota Malang 65119",
                  },
                  { icon: Phone, text: "(0341) 325348" },
                  { icon: Mail, text: "bi_malang@bi.go.id" },
                  {
                    icon: Clock,
                    text: "Sen–Jum: 08.00–16.00 WIB",
                  },
                ].map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-white/45"
                  >
                    <Icon
                      size={13}
                      className="shrink-0 mt-0.5 text-[#C9A84C]"
                    />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-[11px]">
            <p>
              © 2026 Bank Indonesia Kantor Perwakilan Malang.
              Hak cipta dilindungi.
            </p>
            <p className="font-data">
              BI Malang Learning Center v3.0.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
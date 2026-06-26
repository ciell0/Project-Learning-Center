import { Monitor, BookOpen, Film, Lightbulb, Wifi, Users, Coffee, Clock, MapPin, CheckCircle } from "lucide-react";

const facilities = [
  {
    icon: BookOpen,
    title: "Reading Area",
    desc: "Ruang baca nyaman dengan koleksi koran, majalah ekonomi, dan jurnal terkini. Tersedia kursi ergonomis dan pencahayaan optimal untuk kenyamanan membaca.",
    features: ["50 kursi baca", "Koleksi majalah mingguan", "Area diskusi grup", "Rak self-service"],
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Monitor,
    title: "Computer Workstations",
    desc: "Workstation komputer berperforma tinggi untuk riset, pengetikan, dan akses database jurnal internasional.",
    features: ["20 unit komputer", "Internet 100 Mbps", "MS Office suite", "Akses database EBSCO"],
    color: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    icon: Film,
    title: "Multimedia Room",
    desc: "Ruang multimedia lengkap dengan proyektor, layar besar, dan sistem audio untuk presentasi dan nonton film dokumenter ekonomi.",
    features: ["Proyektor 4K", "Sound system", "Kapasitas 30 orang", "AC & pencahayaan"],
    color: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Lightbulb,
    title: "Learning Resources",
    desc: "Akses lengkap ke materi pembelajaran digital, e-learning BI, dan video conference untuk seminar online.",
    features: ["E-learning BI platform", "Video conference", "Rekaman seminar", "Bahan ajar digital"],
    color: "from-amber-500 to-amber-700",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

const journals = [
  { title: "Buletin Ekonomi Moneter dan Perbankan", publisher: "Bank Indonesia", freq: "Triwulan", type: "BI Official" },
  { title: "Journal of Banking & Finance", publisher: "Elsevier", freq: "Bulanan", type: "International" },
  { title: "IMF Economic Review", publisher: "IMF", freq: "Triwulan", type: "International" },
  { title: "Kajian Ekonomi dan Keuangan", publisher: "Kemenkeu RI", freq: "Triwulan", type: "National" },
  { title: "Asian Economic Policy Review", publisher: "Wiley", freq: "Semesteran", type: "International" },
  { title: "Journal of Financial Stability", publisher: "Elsevier", freq: "Triwulan", type: "International" },
];

export function BICornerPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0A3322] to-[#1A6644] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Coffee size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">BI Corner</h1>
              <p className="text-white/60 text-sm">Pusat Belajar & Referensi BI Malang</p>
            </div>
          </div>
          <p className="text-white/70 max-w-xl leading-relaxed mb-6">
            BI Corner adalah sudut pembelajaran terpadu di Bank Indonesia Malang yang menyediakan fasilitas lengkap untuk riset, membaca, dan pengembangan wawasan ekonomi dan keuangan.
          </p>
          <div className="flex flex-wrap gap-6">
            {[{val:"50+",l:"Kursi Baca"},{val:"20",l:"Komputer"},{val:"200+",l:"Koleksi Jurnal"},{val:"1",l:"Ruang Multimedia"}].map((s) => (
              <div key={s.l}>
                <p className="text-[#C9A84C] font-bold text-xl">{s.val}</p>
                <p className="text-white/60 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Clock, title: "Jam Operasional", val: "08.00 – 16.00 WIB\nSenin – Jumat" },
            { icon: MapPin, title: "Lokasi", val: "Lt. 1, Gedung BI\nJl. Merdeka Utara 7" },
            { icon: Wifi, title: "Internet", val: "WiFi Gratis\n100 Mbps" },
            { icon: Users, title: "Kapasitas", val: "80 Pengunjung\nSekaligus" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-card rounded-2xl border border-border p-5 text-center">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-emerald-600" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.title}</p>
                <p className="text-sm font-semibold text-foreground whitespace-pre-line">{item.val}</p>
              </div>
            );
          })}
        </div>

        {/* Facilities */}
        <h2 className="text-foreground font-bold mb-6" style={{fontSize: '1.1rem'}}>Fasilitas BI Corner</h2>
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {facilities.map((fac) => {
            const Icon = fac.icon;
            return (
              <div key={fac.title} className={`rounded-2xl border border-border ${fac.bg} overflow-hidden hover:shadow-lg transition-all`}>
                <div className={`bg-gradient-to-r ${fac.color} p-5 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold">{fac.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{fac.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {fac.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle size={11} className="text-emerald-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Journals */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-foreground font-bold mb-5" style={{fontSize: '1.1rem'}}>Koleksi Jurnal & Periodical</h2>
          <div className="space-y-2">
            {journals.map((j, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-all">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen size={14} className="text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{j.title}</p>
                  <p className="text-xs text-muted-foreground">{j.publisher} · {j.freq}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${j.type === "BI Official" ? "bg-blue-100 text-blue-700" : j.type === "International" ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {j.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

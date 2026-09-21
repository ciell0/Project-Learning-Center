import { Users, Award, Star, CheckCircle, ExternalLink, BookOpen, Heart, Globe, Lightbulb } from "lucide-react";

const benefits = [
  { icon: BookOpen, title: "Beasiswa Penuh", desc: "Beasiswa dari Bank Indonesia mencakup biaya pendidikan dan hidup selama studi." },
  { icon: Users, title: "Komunitas Aktif", desc: "Bergabung dengan jaringan mahasiswa terpilih dari seluruh perguruan tinggi di Indonesia." },
  { icon: Globe, title: "Program Internasional", desc: "Kesempatan mengikuti program pertukaran pelajar dan konferensi internasional." },
  { icon: Lightbulb, title: "Pengembangan Kapasitas", desc: "Pelatihan kepemimpinan, soft skills, dan pengembangan diri berkelanjutan." },
  { icon: Heart, title: "Program Sosial", desc: "Terlibat aktif dalam program pengabdian masyarakat dan pemberdayaan ekonomi." },
  { icon: Award, title: "Sertifikasi", desc: "Mendapat sertifikat resmi dari Bank Indonesia sebagai bekal karir profesional." },
];

const requirements = [
  "Mahasiswa S1 aktif dari perguruan tinggi terakreditasi minimal B",
  "IPK minimal 3.00 (skala 4.00) pada semester terakhir",
  "Tidak sedang atau akan menerima beasiswa lain dari sumber manapun",
  "Belum pernah mendapat beasiswa BI sebelumnya",
  "Berdomisili dan kuliah di wilayah kerja BI Malang (Malang, Batu, Pasuruan)",
  "Aktif dalam organisasi kemahasiswaan atau kegiatan sosial",
  "Tidak sedang cuti akademik",
  "Lulus seleksi administrasi dan wawancara",
];

const activities = [
  { title: "Sosialisasi Keuangan", desc: "Edukasi literasi keuangan ke masyarakat umum dan pelajar SMA", date: "Mei 2026", participants: 120 },
  { title: "Festival UMKM Malang", desc: "Pameran dan pendampingan produk UMKM binaan GenBI", date: "Apr 2026", participants: 85 },
  { title: "GenBI Leadership Camp", desc: "Pelatihan kepemimpinan dan pengembangan diri anggota GenBI", date: "Mar 2026", participants: 60 },
];

export function GenBIPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1A0050] to-[#4A1A9A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Generasi Baru Indonesia</p>
                <p className="text-white/60 text-sm">GenBI – Bank Indonesia</p>
              </div>
            </div>
            <h1 className="text-white mb-4" style={{fontSize: '2rem', fontWeight: 700}}>
              Jadilah Bagian dari<br />
              <span className="text-[#C9A84C]">Generasi Penerus Bangsa</span>
            </h1>
            <p className="text-white/70 leading-relaxed mb-8">
              GenBI adalah komunitas penerima beasiswa Bank Indonesia yang berkomitmen pada pengembangan diri, pemberdayaan masyarakat, dan pembangunan ekonomi nasional.
            </p>
            <div className="flex gap-4">
              <a href="https://www.bi.go.id/id/tentang-bi/csr/genbi" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-white rounded-xl font-semibold hover:brightness-110 transition-all">
                <ExternalLink size={16} />
                Website Resmi GenBI
              </a>
            </div>
          </div>
          <div className="flex gap-8 mt-10">
            {[{val:"2,400+",l:"Penerima Aktif"},{val:"38",l:"Perguruan Tinggi"},{val:"10+",l:"Tahun Program"},{val:"50+",l:"Kegiatan/Tahun"}].map((s) => (
              <div key={s.l}>
                <p className="text-[#C9A84C] font-bold text-xl">{s.val}</p>
                <p className="text-white/60 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* About */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-7">
            <h2 className="text-foreground font-bold mb-4" style={{fontSize: '1.1rem'}}>Tentang GenBI</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Generasi Baru Indonesia (GenBI) merupakan komunitas penerima beasiswa Bank Indonesia yang tersebar di seluruh Indonesia. Program ini lahir dari visi Bank Indonesia untuk berkontribusi dalam pengembangan sumber daya manusia Indonesia yang berkualitas, berkarakter, dan memiliki kepedulian sosial tinggi.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Di Malang, GenBI aktif berkolaborasi dengan berbagai perguruan tinggi seperti Universitas Brawijaya, Universitas Negeri Malang, Universitas Islam Malang, dan institusi lainnya. Anggota GenBI Malang secara rutin menjalankan program sosial, edukasi keuangan, dan pemberdayaan UMKM.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#1A0050] to-[#4A1A9A] rounded-2xl p-6 text-white">
            <Star size={24} className="text-[#C9A84C] mb-3" />
            <h3 className="font-bold mb-2">Visi GenBI</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Menjadi komunitas pemuda Indonesia yang unggul, berkarakter, dan berkontribusi nyata bagi perekonomian dan kesejahteraan masyarakat Indonesia.
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-card rounded-2xl border border-border p-7 mb-8">
          <h2 className="text-foreground font-bold mb-5" style={{fontSize: '1.1rem'}}>Persyaratan Penerima Beasiswa</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {requirements.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">{r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-foreground font-bold mb-6" style={{fontSize: '1.1rem'}}>Keuntungan Menjadi Anggota GenBI</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-3">
                    <Icon size={18} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-foreground font-semibold text-sm mb-1">{b.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-foreground font-bold mb-6" style={{fontSize: '1.1rem'}}>Kegiatan Terbaru</h2>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center shrink-0">
                  <Heart size={18} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold text-sm">{a.title}</p>
                  <p className="text-muted-foreground text-xs">{a.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">{a.date}</p>
                  <p className="text-xs font-semibold text-primary">{a.participants} peserta</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

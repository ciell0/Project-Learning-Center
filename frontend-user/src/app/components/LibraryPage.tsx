import { useState } from "react";
import {
  Search, BookOpen, X, Star, User, Tag, Building, Grid3X3, List,
  ExternalLink, MapPin, Phone, Clock, ChevronRight, TrendingUp, Filter,
  Hash, Calendar, Eye, ArrowUpRight, BookMarked, Download, Globe
} from "lucide-react";

/* ── Mock data ── */
const BOOKS = [
  { id:1, title:"Monetary Policy Frameworks",          author:"Ben S. Bernanke",   genre:"Ekonomi",    year:2024, type:"physical", rating:4.8, available:true,  cover:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=420&fit=crop&auto=format", publisher:"Princeton UP",  pages:412, desc:"Eksplorasi komprehensif kerangka kebijakan moneter modern yang digunakan bank sentral di seluruh dunia." },
  { id:2, title:"Banking Supervision & Regulation",    author:"Claudio Borio",     genre:"Keuangan",   year:2024, type:"physical", rating:4.7, available:true,  cover:"https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=420&fit=crop&auto=format", publisher:"BIS Press",     pages:356, desc:"Tinjauan mendalam kerangka regulasi perbankan internasional dan praktik pengawasan terbaik." },
  { id:3, title:"Digital Finance & FinTech Revolution",author:"Andreas Antonopoulos",genre:"Teknologi", year:2025, type:"digital", rating:4.9, available:true,  cover:"https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=420&fit=crop&auto=format", publisher:"O'Reilly",      pages:488, desc:"Persimpangan teknologi dan layanan keuangan di era ekonomi digital modern." },
  { id:4, title:"Indonesia Economic Outlook 2026",     author:"Bank Indonesia",    genre:"Ekonomi",    year:2026, type:"digital", rating:4.6, available:true,  cover:"https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=420&fit=crop&auto=format", publisher:"BI Press",       pages:280, desc:"Analisis komprehensif tahunan kondisi makroekonomi dan proyeksi Indonesia." },
  { id:5, title:"Manajemen Risiko Perbankan",          author:"Mamduh M. Hanafi",  genre:"Keuangan",   year:2024, type:"physical", rating:4.5, available:false, cover:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=420&fit=crop&auto=format", publisher:"UPP STIM YKPN", pages:320, desc:"Buku teks komprehensif tentang pengelolaan risiko di industri perbankan Indonesia." },
  { id:6, title:"Ekonomi Makro: Teori & Aplikasi",    author:"Sadono Sukirno",    genre:"Ekonomi",    year:2023, type:"physical", rating:4.7, available:true,  cover:"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=420&fit=crop&auto=format", publisher:"RajaGrafindo",   pages:450, desc:"Buku acuan makroekonomi dengan pendekatan teoritis dan aplikasi kebijakan Indonesia." },
  { id:7, title:"Sistem Pembayaran Digital Indonesia", author:"Nailul Huda",       genre:"Teknologi",  year:2025, type:"digital", rating:4.4, available:true,  cover:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=420&fit=crop&auto=format", publisher:"LP3ES",          pages:298, desc:"Analisis perkembangan sistem pembayaran digital di Indonesia dan implikasinya." },
  { id:8, title:"Global Financial Stability Report",   author:"IMF Staff",         genre:"Keuangan",   year:2026, type:"digital", rating:4.8, available:true,  cover:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=420&fit=crop&auto=format", publisher:"IMF Publication", pages:210, desc:"Penilaian stabilitas keuangan global dengan analisis ekonomi pasar berkembang." },
  { id:9, title:"Hukum Perbankan Indonesia",           author:"Hermansyah",        genre:"Hukum",      year:2023, type:"physical", rating:4.3, available:true,  cover:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=420&fit=crop&auto=format", publisher:"Prenada Media",  pages:290, desc:"Tinjauan komprehensif kerangka hukum perbankan di Indonesia dan regulasi terkait." },
  { id:10,title:"Statistik Ekonomi Keuangan Daerah",  author:"Bank Indonesia",    genre:"Statistik",  year:2026, type:"digital", rating:4.5, available:true,  cover:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=420&fit=crop&auto=format", publisher:"BI Press",       pages:180, desc:"Data statistik ekonomi dan keuangan regional Jawa Timur kompilasi terbaru." },
  { id:11,title:"The Alchemy of Finance",             author:"George Soros",      genre:"Keuangan",   year:2023, type:"physical", rating:4.6, available:true,  cover:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=420&fit=crop&auto=format", publisher:"Wiley",          pages:368, desc:"Wawasan mendalam tentang pasar keuangan global dari salah satu investor legendaris." },
  { id:12,title:"Keuangan Internasional",             author:"Madura & Fox",      genre:"Keuangan",   year:2024, type:"physical", rating:4.4, available:false, cover:"https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=300&h=420&fit=crop&auto=format", publisher:"Salemba Empat",  pages:510, desc:"Panduan lengkap keuangan internasional mencakup nilai tukar, investasi asing, dan risiko global." },
];

const AUTHORS = [
  { name:"Bank Indonesia",       books:24, photo:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&auto=format", field:"Kebijakan Moneter" },
  { name:"Sadono Sukirno",       books:8,  photo:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", field:"Ekonomi Makro" },
  { name:"Mamduh M. Hanafi",     books:6,  photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format", field:"Manajemen Keuangan" },
  { name:"Ben S. Bernanke",      books:5,  photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", field:"Kebijakan Moneter" },
  { name:"Claudio Borio",        books:4,  photo:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&auto=format", field:"Regulasi Perbankan" },
  { name:"IMF Staff",            books:18, photo:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format", field:"Keuangan Internasional" },
];

const GENRES = [
  { name:"Ekonomi",   count:3450, color:"bg-blue-500"   },
  { name:"Keuangan",  count:2890, color:"bg-amber-500"  },
  { name:"Perbankan", count:2340, color:"bg-indigo-500" },
  { name:"Teknologi", count:1560, color:"bg-emerald-500"},
  { name:"Hukum",     count:980,  color:"bg-red-500"    },
  { name:"Statistik", count:760,  color:"bg-purple-500" },
  { name:"Manajemen", count:470,  color:"bg-pink-500"   },
];

const GENRE_FILTERS = ["Semua","Ekonomi","Keuangan","Teknologi","Hukum","Statistik","Manajemen"];

const LIB_STATS = [
  { label:"Total Koleksi",  val:"12,450", icon:BookOpen,  sub:"±200 judul/bulan",       color:"from-[#003087] to-[#1A5CB8]" },
  { label:"Buku Digital",   val:"3,200",  icon:Globe,     sub:"Akses 24/7 online",      color:"from-[#4A1A9A] to-[#7B3FBF]" },
  { label:"Buku Fisik",     val:"9,250",  icon:BookMarked,sub:"Tersedia di perpustakaan",color:"from-[#065F46] to-[#10A070]" },
  { label:"Dipinjam/Bulan", val:"1,840",  icon:TrendingUp,sub:"Rata-rata per bulan",     color:"from-[#7C3400] to-[#C9A84C]" },
];

/* ── Book Detail Modal ── */
function BookModal({ book, onClose }: { book: typeof BOOKS[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-popover rounded-2xl shadow-2xl max-w-[640px] w-full overflow-hidden border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          {/* Cover */}
          <div className="w-44 bg-muted shrink-0 relative">
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold text-white ${book.type === "digital" ? "bg-indigo-600" : "bg-blue-700"}`}>
                {book.type === "digital" ? "DIGITAL" : "FISIK"}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 p-5 overflow-y-auto max-h-[520px]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-foreground font-bold leading-snug mb-1" style={{fontSize:'1rem',fontFamily:'Poppins,sans-serif'}}>{book.title}</h2>
                <p className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <User size={12} /> {book.author}
                </p>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground ml-2 shrink-0">
                <X size={15} />
              </button>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{book.desc}</p>

            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[
                { icon: Tag,      label:"Genre",     val: book.genre },
                { icon: Building, label:"Penerbit",  val: book.publisher },
                { icon: Hash,     label:"Halaman",   val: `${book.pages} hal.` },
                { icon: Calendar, label:"Tahun",     val: book.year.toString() },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/40">
                  <Icon size={12} className="text-[#003087] dark:text-[#4A8FE0]" />
                  <div>
                    <p className="text-[9px] text-muted-foreground">{label}</p>
                    <p className="text-xs font-semibold text-foreground">{val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-sm">{book.rating}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${book.available ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                  {book.available ? "Tersedia" : "Dipinjam"}
                </span>
              </div>
              <div className="flex gap-2">
                {book.type === "digital" ? (
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#003087] text-white rounded-xl text-xs font-semibold hover:brightness-110 transition-all">
                    <Eye size={12} /> Baca Online
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#003087] text-white rounded-xl text-xs font-semibold hover:brightness-110 transition-all disabled:opacity-50" disabled={!book.available}>
                    <BookMarked size={12} /> Pinjam
                  </button>
                )}
                <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-muted text-muted-foreground rounded-xl text-xs font-semibold hover:bg-secondary transition-all">
                  <Download size={12} /> Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Book card grid ── */
function BookCard({ book, onClick }: { book: typeof BOOKS[0]; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group text-left bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-[#003087]/8 hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2">
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${book.type === "digital" ? "bg-indigo-600" : "bg-blue-700"}`}>
            {book.type === "digital" ? "D" : "F"}
          </span>
        </div>
        {!book.available && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Dipinjam</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
          <p className="text-white text-xs font-medium line-clamp-2 leading-snug">{book.title}</p>
        </div>
      </div>
      <div className="p-3">
        <p className="text-foreground text-[11px] font-semibold leading-snug mb-1 line-clamp-2">{book.title}</p>
        <p className="text-muted-foreground text-[10px] truncate">{book.author}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-0.5">
            <Star size={9} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] text-muted-foreground">{book.rating}</span>
          </div>
          <span className="text-[9px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{book.genre}</span>
        </div>
      </div>
    </button>
  );
}

/* ── Book row list ── */
function BookRow({ book, onClick }: { book: typeof BOOKS[0]; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group w-full text-left flex items-center gap-4 p-3.5 rounded-xl bg-card border border-border hover:border-[#003087]/20 hover:shadow-md transition-all">
      <img src={book.cover} alt={book.title} className="w-11 h-[60px] object-cover rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-semibold text-sm truncate">{book.title}</p>
        <p className="text-muted-foreground text-xs">{book.author} · {book.publisher} · {book.year}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${book.type === "digital" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>{book.type === "digital" ? "Digital" : "Fisik"}</span>
          <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{book.genre}</span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="flex items-center gap-1 justify-end mb-1">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold">{book.rating}</span>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${book.available ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
          {book.available ? "Tersedia" : "Dipinjam"}
        </span>
      </div>
    </button>
  );
}

const TABS = [
  { id:"catalog",    label:"Katalog Buku",    icon:BookOpen   },
  { id:"statistics", label:"Statistik",       icon:TrendingUp },
  { id:"authors",    label:"Penulis",         icon:User       },
  { id:"about",      label:"Tentang Kami",    icon:Globe      },
  { id:"contact",    label:"Kontak & Lokasi", icon:MapPin     },
];

export function LibraryPage() {
  const [activeTab, setActiveTab] = useState("catalog");
  const [search,    setSearch]    = useState("");
  const [genre,     setGenre]     = useState("Semua");
  const [type,      setType]      = useState("all");
  const [view,      setView]      = useState<"grid"|"list">("grid");
  const [selected,  setSelected]  = useState<typeof BOOKS[0]|null>(null);

  const filtered = BOOKS.filter((b) => {
    const q = search.toLowerCase();
    const matchQ = b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.genre.toLowerCase().includes(q);
    const matchG = genre === "Semua" || b.genre === genre;
    const matchT = type === "all" || b.type === type;
    return matchQ && matchG && matchT;
  });

  return (
    <div className="min-h-screen bg-background pt-[89px]">
      {/* ── Header banner ── */}
      <div className="bg-gradient-to-r from-[#001A4D] to-[#003087] text-white py-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <BookOpen size={26} />
              </div>
              <div>
                <h1 className="font-bold text-xl" style={{fontFamily:'Poppins,sans-serif'}}>Perpustakaan BI Malang</h1>
                <p className="text-white/55 text-sm">Koleksi Digital & Fisik · Bank Indonesia Malang</p>
              </div>
            </div>
            <div className="flex gap-8">
              {LIB_STATS.slice(0,3).map((s) => (
                <div key={s.label}>
                  <p className="text-[#C9A84C] font-bold text-xl font-data">{s.val}</p>
                  <p className="text-white/50 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-card border-b border-border sticky top-[62px] z-30 shadow-sm">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${activeTab === id ? "border-[#003087] text-[#003087] dark:border-[#4A8FE0] dark:text-[#4A8FE0]" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ════ CATALOG ════ */}
        {activeTab === "catalog" && (
          <>
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari judul, penulis, atau genre..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-[#003087] dark:focus:border-[#4A8FE0] focus:outline-none text-sm"
                />
              </div>
              <div className="flex gap-2">
                {/* Type toggle */}
                <div className="flex bg-card border border-border rounded-xl overflow-hidden text-xs">
                  {[{v:"all",l:"Semua"},{v:"physical",l:"Fisik"},{v:"digital",l:"Digital"}].map(({v,l}) => (
                    <button key={v} onClick={() => setType(v)}
                      className={`px-3 py-2 font-medium transition-all ${type===v?"bg-[#003087] text-white":"text-muted-foreground hover:bg-muted"}`}>{l}</button>
                  ))}
                </div>
                {/* View toggle */}
                <div className="flex bg-card border border-border rounded-xl overflow-hidden">
                  <button onClick={() => setView("grid")} className={`p-2 transition-all ${view==="grid"?"bg-[#003087] text-white":"text-muted-foreground hover:bg-muted"}`}><Grid3X3 size={14}/></button>
                  <button onClick={() => setView("list")} className={`p-2 transition-all ${view==="list"?"bg-[#003087] text-white":"text-muted-foreground hover:bg-muted"}`}><List size={14}/></button>
                </div>
              </div>
            </div>

            {/* Genre chips */}
            <div className="flex gap-2 flex-wrap mb-5">
              {GENRE_FILTERS.map((g) => (
                <button key={g} onClick={() => setGenre(g)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${genre===g?"bg-[#003087] dark:bg-[#4A8FE0] text-white shadow-md":"bg-card border border-border text-muted-foreground hover:border-[#003087]/40 hover:text-[#003087] dark:hover:text-[#4A8FE0]"}`}>
                  {g}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{filtered.length}</span> buku ditemukan</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Filter size={12}/> Filter aktif: {[genre !== "Semua" && genre, type !== "all" && type].filter(Boolean).join(", ") || "Tidak ada"}
              </div>
            </div>

            {view === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filtered.map((b) => <BookCard key={b.id} book={b} onClick={() => setSelected(b)} />)}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((b) => <BookRow key={b.id} book={b} onClick={() => setSelected(b)} />)}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-16 text-muted-foreground">
                <BookOpen size={40} className="mb-3 opacity-20" />
                <p className="font-semibold text-foreground mb-1">Tidak ada buku ditemukan</p>
                <p className="text-sm">Coba ubah kata kunci atau filter pencarian.</p>
              </div>
            )}
          </>
        )}

        {/* ════ STATISTICS ════ */}
        {activeTab === "statistics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {LIB_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-card rounded-2xl border border-border p-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-md`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <p className="text-foreground font-bold font-data text-2xl mb-0.5">{s.val}</p>
                    <p className="text-muted-foreground text-xs font-medium">{s.label}</p>
                    <p className="text-muted-foreground text-[10px] mt-1">{s.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* Genre breakdown */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-5 text-sm">Distribusi Koleksi per Genre</h3>
              <div className="space-y-3">
                {GENRES.map((g) => {
                  const pct = Math.round((g.count / 12450) * 100);
                  return (
                    <div key={g.name} className="flex items-center gap-4">
                      <span className="w-28 text-sm text-muted-foreground shrink-0">{g.name}</span>
                      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${g.color} rounded-full transition-all duration-700`} style={{width:`${pct}%`}} />
                      </div>
                      <span className="w-16 text-xs font-data font-semibold text-right text-foreground">{g.count.toLocaleString()}</span>
                      <span className="w-8 text-xs text-muted-foreground text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Library history */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-4 text-sm">Sejarah Singkat Perpustakaan</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                {[
                  { year:"1998", event:"Perpustakaan BI Malang resmi didirikan dengan koleksi awal 500 buku" },
                  { year:"2005", event:"Perluasan gedung dan penambahan koleksi hingga 3.000 judul" },
                  { year:"2012", event:"Digitalisasi katalog dan pengenalan sistem perpustakaan berbasis komputer" },
                  { year:"2018", event:"Peluncuran platform digital perpustakaan dengan akses buku e-book" },
                  { year:"2023", event:"Renovasi ruang baca dan penambahan BI Corner terintegrasi" },
                  { year:"2026", event:"Peluncuran BI Malang Learning Center versi 3.0 dengan fitur lengkap" },
                ].map((item, i) => (
                  <div key={i} className="relative flex gap-5 pb-5 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-[#003087] dark:bg-[#4A8FE0] text-white flex items-center justify-center text-[10px] font-bold shrink-0 z-10">{i+1}</div>
                    <div className="pt-1.5">
                      <p className="text-[#C9A84C] text-xs font-bold font-data">{item.year}</p>
                      <p className="text-sm text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ AUTHORS ════ */}
        {activeTab === "authors" && (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AUTHORS.map((a) => (
                <div key={a.name} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-[#003087]/20 hover:shadow-md transition-all">
                  <img src={a.photo} alt={a.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-semibold text-sm truncate">{a.name}</p>
                    <p className="text-muted-foreground text-xs">{a.field}</p>
                    <p className="text-[#003087] dark:text-[#4A8FE0] text-xs font-semibold mt-1">{a.books} koleksi</p>
                  </div>
                  <button className="p-2 rounded-xl bg-muted hover:bg-secondary transition-colors text-muted-foreground">
                    <ChevronRight size={14}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ ABOUT ════ */}
        {activeTab === "about" && (
          <div className="max-w-3xl space-y-5">
            <div className="bg-card rounded-2xl border border-border p-7">
              <h2 className="font-bold text-foreground mb-4 text-lg">Tentang Perpustakaan BI Malang</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Perpustakaan Bank Indonesia Malang adalah perpustakaan khusus yang berkoleksi buku, jurnal, dan referensi di bidang ekonomi, perbankan, keuangan, hukum, dan ilmu sosial terkait. Didirikan untuk mendukung kebutuhan informasi pegawai BI dan pemangku kepentingan.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Sejak 1998, perpustakaan BI Malang telah berkembang menjadi salah satu perpustakaan khusus terlengkap di Jawa Timur dengan lebih dari 12.000 judul dan akses ke ribuan jurnal digital internasional.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-[#003087]/5 rounded-xl">
                {[{val:"1998",l:"Tahun Berdiri"},{val:"12,450+",l:"Total Koleksi"},{val:"500+",l:"Pengunjung/Bulan"}].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="text-[#003087] dark:text-[#4A8FE0] font-bold font-data text-xl">{s.val}</p>
                    <p className="text-muted-foreground text-xs">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ CONTACT ════ */}
        {activeTab === "contact" && (
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-5">Informasi Kontak</h3>
              <div className="space-y-4">
                {[
                  { icon:MapPin, label:"Alamat",          val:"Jl. Merdeka Utara No.7, Kota Malang, Jawa Timur 65119" },
                  { icon:Phone,  label:"Telepon",         val:"(0341) 325348" },
                  { icon:Mail,   label:"Email",           val:"bi_malang@bi.go.id" },
                  { icon:Clock,  label:"Jam Operasional", val:"Senin – Jumat: 08.00 – 16.00 WIB\nSabtu – Minggu: Tutup" },
                ].map(({ icon:Icon, label, val }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-8 h-8 bg-[#003087]/8 dark:bg-[#4A8FE0]/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[#003087] dark:text-[#4A8FE0]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
                      <p className="text-sm text-foreground whitespace-pre-line">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#001A4D] to-[#003087] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-5">Peraturan Peminjaman</h3>
              <ul className="space-y-2.5">
                {["Maks. 3 buku per kunjungan","Durasi pinjam 7 hari kerja","Perpanjangan 1x via aplikasi","Denda Rp 500/hari keterlambatan","Buku digital akses 24/7 online","KTP/KTM wajib ditunjukkan saat pinjam"].map((r,i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/75">
                    <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full mt-1.5 shrink-0"/>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {selected && <BookModal book={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

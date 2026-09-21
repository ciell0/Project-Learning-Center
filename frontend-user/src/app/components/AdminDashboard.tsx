import { useState } from "react";
import {
  Users, BookOpen, Briefcase, TrendingUp, LayoutDashboard,
  Bell, Moon, Sun, LogOut, Search, Eye, CheckCircle, Clock,
  X, ChevronDown, Settings, Building2, Tag, Globe, Mail,
  ChevronRight, FileText, Archive, Database, Layers,
  UserCheck, AlertCircle, BarChart3, PieChartIcon, Activity,
  Filter, Download, RefreshCw
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

/* ── Data ── */
const MONTHLY_DATA = [
  { month:"Jan", applications:12, accepted:8,  rejected:3  },
  { month:"Feb", applications:18, accepted:11, rejected:5  },
  { month:"Mar", applications:25, accepted:15, rejected:7  },
  { month:"Apr", applications:22, accepted:14, rejected:6  },
  { month:"Mei", applications:30, accepted:20, rejected:7  },
  { month:"Jun", applications:38, accepted:24, rejected:8  },
];

const STATUS_DATA = [
  { name:"Diterima",    value:92,  color:"#10b981" },
  { name:"On Review",  value:34,  color:"#f59e0b" },
  { name:"Menunggu",   value:15,  color:"#6b7280" },
  { name:"Ditolak",    value:28,  color:"#ef4444" },
];

const LIB_DATA = [
  { month:"Jan", physical:145, digital:220 },
  { month:"Feb", physical:160, digital:280 },
  { month:"Mar", physical:180, digital:320 },
  { month:"Apr", physical:165, digital:295 },
  { month:"Mei", physical:190, digital:360 },
  { month:"Jun", physical:210, digital:410 },
];

const APPLICANTS = [
  { id:1, name:"Ahmad Rizki Pratama",    univ:"Universitas Brawijaya",      div:"Social Media",    date:"10 Jun 2026", status:"On Review", prog:"BI Malabar", nim:"195020300111042", major:"Ilmu Ekonomi",   gpa:"3.65" },
  { id:2, name:"Siti Nurhaliza Dewi",    univ:"Universitas Negeri Malang",  div:"UMKM Assistance", date:"09 Jun 2026", status:"Menunggu",  prog:"BI Malabar", nim:"200501080042",    major:"Manajemen",      gpa:"3.72" },
  { id:3, name:"Budi Santoso Wibowo",    univ:"Universitas Islam Malang",   div:"—",               date:"08 Jun 2026", status:"Diterima",  prog:"BI Regular", nim:"1910302021",      major:"Akuntansi",      gpa:"3.55" },
  { id:4, name:"Dewi Rahmawati Putri",   univ:"Universitas Brawijaya",      div:"Library",         date:"07 Jun 2026", status:"Ditolak",   prog:"BI Malabar", nim:"1850203051",      major:"Ilmu Perpustakaan",gpa:"3.42"},
  { id:5, name:"Fajar Nugroho Santoso",  univ:"Universitas Widyagama",      div:"—",               date:"06 Jun 2026", status:"Diterima",  prog:"BI Regular", nim:"2001401066",      major:"Teknik Informatika",gpa:"3.58"},
  { id:6, name:"Maya Indah Sari",        univ:"Politeknik Negeri Malang",   div:"Social Media",    date:"05 Jun 2026", status:"On Review", prog:"BI Malabar", nim:"2141310025",      major:"Administrasi Bisnis",gpa:"3.70"},
  { id:7, name:"Rizal Firmansyah",       univ:"Universitas Muhammadiyah",   div:"UMKM Assistance", date:"04 Jun 2026", status:"On Review", prog:"BI Malabar", nim:"2104010034",      major:"Ekonomi Pembangunan",gpa:"3.48"},
  { id:8, name:"Anisa Putri Rahayu",     univ:"Institut Teknologi Nasional", div:"—",              date:"03 Jun 2026", status:"Menunggu",  prog:"BI Regular", nim:"1964020178",      major:"Statistika",     gpa:"3.80" },
];

type Status = "Menunggu"|"On Review"|"Diterima"|"Ditolak";

const STATUS_CFG: Record<Status, {color:string; dot:string; bg:string}> = {
  Menunggu:   { color:"text-gray-600 dark:text-gray-400",     dot:"bg-gray-400",   bg:"bg-gray-100 dark:bg-gray-800/40"    },
  "On Review":{ color:"text-amber-700 dark:text-amber-400",   dot:"bg-amber-500",  bg:"bg-amber-100 dark:bg-amber-900/30"  },
  Diterima:   { color:"text-emerald-700 dark:text-emerald-400",dot:"bg-emerald-500",bg:"bg-emerald-100 dark:bg-emerald-900/30"},
  Ditolak:    { color:"text-red-700 dark:text-red-400",       dot:"bg-red-500",    bg:"bg-red-100 dark:bg-red-900/30"      },
};

const BOOKS_ADMIN = [
  { id:1, title:"Monetary Policy Frameworks",       author:"Ben S. Bernanke", genre:"Ekonomi",   type:"physical", stock:3, status:"Tersedia" },
  { id:2, title:"Digital Finance & FinTech",        author:"A. Antonopoulos", genre:"Teknologi", type:"digital",  stock:-1, status:"Tersedia" },
  { id:3, title:"Indonesia Economic Outlook 2026",  author:"Bank Indonesia",  genre:"Ekonomi",   type:"digital",  stock:-1, status:"Tersedia" },
  { id:4, title:"Manajemen Risiko Perbankan",       author:"M.M. Hanafi",     genre:"Keuangan",  type:"physical", stock:0, status:"Dipinjam" },
];

const SIDEBAR_GROUPS = [
  {
    label:"Perpustakaan",
    icon: BookOpen,
    items:[
      {id:"books-physical", label:"Buku Fisik",    icon:BookOpen  },
      {id:"books-digital",  label:"Buku Digital",  icon:Globe     },
      {id:"authors",        label:"Penulis",       icon:Users     },
      {id:"genres",         label:"Genre",         icon:Tag       },
      {id:"publishers",     label:"Penerbit",      icon:Building2 },
    ]
  },
  {
    label:"Magang",
    icon: Briefcase,
    items:[
      {id:"applicants",  label:"Data Pelamar",     icon:Users      },
      {id:"programs",    label:"Program Magang",   icon:Briefcase  },
      {id:"divisions",   label:"Divisi",           icon:Layers     },
      {id:"selection",   label:"Proses Seleksi",   icon:UserCheck  },
      {id:"archive",     label:"Arsip Magang",     icon:Archive    },
    ]
  },
  {
    label:"Pengaturan",
    icon: Settings,
    items:[
      {id:"identity",       label:"Identitas Website", icon:Globe     },
      {id:"genbi-content",  label:"Konten GenBI",      icon:Users     },
      {id:"bicorner-content",label:"Konten BI Corner", icon:Database  },
    ]
  },
];

/* ── Applicant Detail Modal ── */
function ApplicantModal({ app, onClose }: { app: typeof APPLICANTS[0]; onClose: ()=>void }) {
  const [status, setStatus]  = useState(app.status as Status);
  const [note,   setNote]    = useState("");
  const [saved,  setSaved]   = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-popover rounded-2xl shadow-2xl max-w-2xl w-full border border-border max-h-[90vh] overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-border bg-popover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003087] to-[#1A5CB8] flex items-center justify-center text-white font-bold text-sm">
              {app.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">{app.name}</p>
              <p className="text-muted-foreground text-xs">{app.univ}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted text-muted-foreground"><X size={16}/></button>
        </div>

        <div className="p-5 space-y-5">
          {/* Student info */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Informasi Mahasiswa</p>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {l:"NIM",        v:app.nim    },
                {l:"Jurusan",    v:app.major  },
                {l:"IPK",        v:app.gpa    },
                {l:"Program",    v:app.prog   },
                {l:"Divisi",     v:app.div    },
                {l:"Tgl. Daftar",v:app.date   },
              ].map((f)=>(
                <div key={f.l} className="p-3 bg-muted/40 rounded-xl">
                  <p className="text-[9px] text-muted-foreground mb-0.5">{f.l}</p>
                  <p className="text-xs font-semibold text-foreground">{f.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Skills & Tools</p>
            <div className="flex flex-wrap gap-1.5">
              {["Analisis Data","Research","Communication","Excel","Canva","Power BI"].map((s)=>(
                <span key={s} className="px-2.5 py-1 bg-[#003087]/8 dark:bg-[#4A8FE0]/10 text-[#003087] dark:text-[#4A8FE0] rounded-full text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Dokumen Diunggah</p>
            <div className="space-y-1.5">
              {[
                {name:"CV – "+app.name.split(" ")[0]+".pdf",          size:"245 KB",status:"verified"},
                {name:"Transkrip_Nilai.pdf",                           size:"180 KB",status:"verified"},
                {name:"Surat_Rekomendasi.pdf",                        size:"120 KB",status:"pending" },
                {name:"Proposal_Magang.pdf",                          size:"350 KB",status:"verified"},
                {name:"KTP.jpg",                                       size:"85 KB", status:"verified"},
              ].map((doc)=>(
                <div key={doc.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${doc.status==="verified"?"bg-emerald-500":"bg-amber-500"}`}/>
                  <FileText size={13} className="text-muted-foreground shrink-0"/>
                  <span className="flex-1 text-xs text-foreground truncate">{doc.name}</span>
                  <span className="text-[10px] text-muted-foreground">{doc.size}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${doc.status==="verified"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>
                    {doc.status==="verified"?"✓ Verified":"Pending"}
                  </span>
                  <button className="text-[10px] text-[#003087] dark:text-[#4A8FE0] hover:underline">Lihat</button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Catatan Admin</p>
            <textarea
              value={note}
              onChange={(e)=>setNote(e.target.value)}
              rows={3}
              placeholder="Tambahkan catatan untuk pelamar ini..."
              className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-[#003087] dark:focus:border-[#4A8FE0] focus:outline-none resize-none"
            />
          </div>

          {/* Status change */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Ubah Status</p>
            <div className="flex flex-wrap gap-2">
              {(["Menunggu","On Review","Diterima","Ditolak"] as Status[]).map((s)=>{
                const cfg = STATUS_CFG[s];
                const active = status === s;
                return (
                  <button key={s} onClick={()=>setStatus(s)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                      active ? `${cfg.bg} ${cfg.color} border-current` : "border-border text-muted-foreground hover:border-[#003087]/30"
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${cfg.dot}`}/>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl text-sm font-medium hover:bg-muted/80 transition-all">
              <Mail size={14}/> Kirim Email
            </button>
            <button onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                saved ? "bg-emerald-500 text-white" : "bg-[#003087] dark:bg-[#4A8FE0] text-white hover:brightness-110"
              }`}>
              {saved ? <><CheckCircle size={14}/>Tersimpan!</> : <><CheckCircle size={14}/>Simpan Perubahan</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard stat card ── */
function StatCard({ label, value, change, icon: Icon, gradient, sub }: {
  label:string; value:string; change:string; icon:any; gradient:string; sub:string;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-[#003087]/5 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
          <Icon size={20} className="text-white"/>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{change}</span>
      </div>
      <p className="font-bold font-data text-2xl text-foreground mb-0.5">{value}</p>
      <p className="text-muted-foreground text-sm font-medium">{label}</p>
      <p className="text-muted-foreground text-xs mt-0.5">{sub}</p>
    </div>
  );
}

interface AdminDashboardProps {
  isDark: boolean;
  onToggleDark: () => void;
  onExitAdmin: () => void;
}

export function AdminDashboard({ isDark, onToggleDark, onExitAdmin }: AdminDashboardProps) {
  const [activeMenu, setActiveMenu]  = useState("dashboard");
  const [selectedApp, setSelectedApp] = useState<typeof APPLICANTS[0]|null>(null);
  const [search,      setSearch]      = useState("");
  const [statusF,     setStatusF]     = useState("all");
  const [programF,    setProgramF]    = useState("all");
  const [collapsed,   setCollapsed]   = useState(false);
  const [openGroups,  setOpenGroups]  = useState<Record<string,boolean>>({ Perpustakaan:true, Magang:true, Pengaturan:false });

  const toggleGroup = (g:string) => setOpenGroups(p=>({...p,[g]:!p[g]}));

  const filtered = APPLICANTS.filter((a) => {
    const q = search.toLowerCase();
    const matchQ = a.name.toLowerCase().includes(q) || a.univ.toLowerCase().includes(q);
    const matchS = statusF === "all" || a.status === statusF;
    const matchP = programF === "all" || a.prog === programF;
    return matchQ && matchS && matchP;
  });

  const activeLabel = activeMenu === "dashboard"
    ? "Dashboard"
    : SIDEBAR_GROUPS.flatMap(g=>g.items).find(i=>i.id===activeMenu)?.label || activeMenu;

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* ══ Sidebar ══ */}
      <aside className={`${collapsed?"w-[60px]":"w-[220px]"} bg-sidebar border-r border-sidebar-border flex flex-col shrink-0 transition-all duration-300 overflow-y-auto`}>
        {/* Logo */}
        <div className="h-14 border-b border-sidebar-border flex items-center justify-between px-3 shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 bg-gradient-to-br from-[#003087] to-[#1A5CB8] rounded-lg flex items-center justify-center shrink-0 shadow">
                <span className="text-white text-[9px] font-bold">BI</span>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-sidebar-foreground leading-none" style={{fontFamily:'Poppins,sans-serif'}}>Admin Portal</p>
                <p className="text-[9px] text-muted-foreground truncate">BI Malang LC</p>
              </div>
            </div>
          )}
          <button onClick={()=>setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-sidebar-accent text-muted-foreground shrink-0">
            <ChevronRight size={13} className={`transition-transform ${collapsed?"":"rotate-180"}`}/>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5">
          {/* Dashboard */}
          <button
            onClick={()=>setActiveMenu("dashboard")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeMenu==="dashboard"
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
            title={collapsed?"Dashboard":undefined}
          >
            <LayoutDashboard size={14} className="shrink-0"/>
            {!collapsed && "Dashboard"}
          </button>

          {SIDEBAR_GROUPS.map((group)=>(
            <div key={group.label}>
              {!collapsed && (
                <button
                  onClick={()=>toggleGroup(group.label)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors mt-3 mb-1"
                >
                  {group.label}
                  <ChevronDown size={9} className={`transition-transform ${openGroups[group.label]?"rotate-180":""}`}/>
                </button>
              )}
              {(collapsed || openGroups[group.label]) && group.items.map(({id,label,icon:Icon})=>(
                <button
                  key={id}
                  onClick={()=>setActiveMenu(id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all mb-0.5 ${
                    activeMenu===id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                  title={collapsed?label:undefined}
                >
                  <Icon size={13} className="shrink-0"/>
                  {!collapsed && label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Exit */}
        <div className="p-2 border-t border-sidebar-border">
          <button onClick={onExitAdmin} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-all" title={collapsed?"Keluar":undefined}>
            <LogOut size={13} className="shrink-0"/>
            {!collapsed && "Keluar Admin"}
          </button>
        </div>
      </aside>

      {/* ══ Main ══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <p className="font-bold text-sm text-foreground" style={{fontFamily:'Poppins,sans-serif'}}>{activeLabel}</p>
            {activeMenu === "applicants" && (
              <span className="px-2 py-0.5 bg-[#003087]/8 dark:bg-[#4A8FE0]/10 text-[#003087] dark:text-[#4A8FE0] rounded-full text-[10px] font-bold">{filtered.length} records</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground relative">
              <Bell size={16}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/>
            </button>
            <button onClick={onToggleDark} className="p-2 rounded-xl hover:bg-muted text-muted-foreground">
              {isDark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#003087] to-[#1A5CB8] flex items-center justify-center text-white text-xs font-bold">A</div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-foreground leading-none">Admin</p>
                <p className="text-[9px] text-muted-foreground">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ════ DASHBOARD ════ */}
          {activeMenu === "dashboard" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Pengguna"  value="3,248" change="+12%" icon={Users}     gradient="from-[#003087] to-[#1A5CB8]" sub="186 baru bulan ini"/>
                <StatCard label="Total Buku"      value="12,450" change="+5%"  icon={BookOpen}  gradient="from-[#4A1A9A] to-[#7B3FBF]" sub="200 judul ditambahkan"/>
                <StatCard label="Total Pelamar"   value="169"   change="+24%" icon={Briefcase} gradient="from-[#7C3400] to-[#C9A84C]" sub="38 menunggu review"/>
                <StatCard label="Program Aktif"   value="2"     change="Live" icon={Activity}  gradient="from-[#065F46] to-[#10A070]" sub="Regular & Malabar"/>
              </div>

              <div className="grid lg:grid-cols-3 gap-5">
                {/* Area chart */}
                <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold text-sm text-foreground" style={{fontFamily:'Poppins,sans-serif'}}>Monthly Applications</p>
                      <p className="text-muted-foreground text-xs">Januari – Juni 2026</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><RefreshCw size={13}/></button>
                      <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><Download size={13}/></button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={MONTHLY_DATA} margin={{top:5,right:5,bottom:0,left:-20}}>
                      <defs>
                        <linearGradient id="gApp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#003087" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#003087" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="gAcc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#C9A84C" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false}/>
                      <XAxis dataKey="month" tick={{fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip contentStyle={{fontSize:12,borderRadius:12,border:"1px solid var(--border)",boxShadow:"0 8px 24px rgba(0,0,0,0.12)"}}/>
                      <Legend wrapperStyle={{fontSize:11,paddingTop:8}}/>
                      <Area type="monotone" dataKey="applications" name="Pendaftaran" stroke="#003087" strokeWidth={2.5} fill="url(#gApp)" dot={false}/>
                      <Area type="monotone" dataKey="accepted"     name="Diterima"   stroke="#C9A84C" strokeWidth={2.5} fill="url(#gAcc)" dot={false}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div className="bg-card rounded-2xl border border-border p-5">
                  <p className="font-bold text-sm text-foreground mb-1" style={{fontFamily:'Poppins,sans-serif'}}>Status Pelamar</p>
                  <p className="text-muted-foreground text-xs mb-4">Distribusi status saat ini</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={STATUS_DATA} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="value" paddingAngle={4} strokeWidth={0}>
                        {STATUS_DATA.map((entry,i)=><Cell key={i} fill={entry.color}/>)}
                      </Pie>
                      <Tooltip contentStyle={{fontSize:12,borderRadius:10}}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {STATUS_DATA.map((s)=>(
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{background:s.color}}/>
                          <span className="text-muted-foreground">{s.name}</span>
                        </div>
                        <span className="font-bold font-data text-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bar chart library */}
                <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-5">
                  <p className="font-bold text-sm text-foreground mb-1" style={{fontFamily:'Poppins,sans-serif'}}>Statistik Perpustakaan</p>
                  <p className="text-muted-foreground text-xs mb-4">Jumlah buku dipinjam per bulan</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={LIB_DATA} margin={{top:5,right:5,bottom:0,left:-20}} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false}/>
                      <XAxis dataKey="month" tick={{fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:10}} axisLine={false} tickLine={false}/>
                      <Tooltip contentStyle={{fontSize:12,borderRadius:12,border:"1px solid var(--border)"}}/>
                      <Legend wrapperStyle={{fontSize:11,paddingTop:8}}/>
                      <Bar dataKey="physical" name="Fisik"   fill="#003087" radius={[4,4,0,0]} maxBarSize={28}/>
                      <Bar dataKey="digital"  name="Digital" fill="#C9A84C" radius={[4,4,0,0]} maxBarSize={28}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent applicants preview */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <p className="font-bold text-sm text-foreground" style={{fontFamily:'Poppins,sans-serif'}}>Pelamar Terbaru</p>
                  <button onClick={()=>setActiveMenu("applicants")} className="flex items-center gap-1 text-xs text-[#003087] dark:text-[#4A8FE0] font-semibold hover:underline">
                    Lihat Semua <ChevronRight size={12}/>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/20">
                        {["Nama","Universitas","Program","Status","Tgl. Daftar"].map((h)=>(
                          <th key={h} className="text-left px-4 py-2.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {APPLICANTS.slice(0,5).map((a)=>{
                        const cfg = STATUS_CFG[a.status as Status];
                        return (
                          <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#003087] to-[#1A5CB8] flex items-center justify-center text-white text-[10px] font-bold shrink-0">{a.name.charAt(0)}</div>
                                <span className="font-medium text-sm text-foreground whitespace-nowrap">{a.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{a.univ}</td>
                            <td className="px-4 py-3"><span className="px-2 py-0.5 bg-[#003087]/8 dark:bg-[#4A8FE0]/10 text-[#003087] dark:text-[#4A8FE0] rounded-full text-xs font-medium">{a.prog}</span></td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.color}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>{a.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-muted-foreground font-data">{a.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ════ APPLICANTS ════ */}
          {activeMenu === "applicants" && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
                  <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Cari nama atau universitas..." className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:border-[#003087] focus:outline-none"/>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <select value={statusF} onChange={(e)=>setStatusF(e.target.value)} className="px-3 py-2.5 bg-card border border-border rounded-xl text-sm focus:border-[#003087] focus:outline-none">
                    <option value="all">Semua Status</option>
                    <option value="Menunggu">Menunggu</option>
                    <option value="On Review">On Review</option>
                    <option value="Diterima">Diterima</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                  <select value={programF} onChange={(e)=>setProgramF(e.target.value)} className="px-3 py-2.5 bg-card border border-border rounded-xl text-sm focus:border-[#003087] focus:outline-none">
                    <option value="all">Semua Program</option>
                    <option value="BI Regular">BI Regular</option>
                    <option value="BI Malabar">BI Malabar</option>
                  </select>
                  <button className="flex items-center gap-1.5 px-3 py-2.5 bg-card border border-border rounded-xl text-sm hover:bg-muted transition-colors">
                    <Download size={13} className="text-muted-foreground"/> Export
                  </button>
                </div>
              </div>

              {/* Summary row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  {l:"Total",      v:APPLICANTS.length,                                    color:"text-foreground",bg:"bg-card"          },
                  {l:"Diterima",   v:APPLICANTS.filter(a=>a.status==="Diterima").length,    color:"text-emerald-600",bg:"bg-emerald-50 dark:bg-emerald-950/20"},
                  {l:"On Review",  v:APPLICANTS.filter(a=>a.status==="On Review").length,  color:"text-amber-600",  bg:"bg-amber-50 dark:bg-amber-950/20"  },
                  {l:"Ditolak",    v:APPLICANTS.filter(a=>a.status==="Ditolak").length,    color:"text-red-600",    bg:"bg-red-50 dark:bg-red-950/20"       },
                ].map((s)=>(
                  <div key={s.l} className={`${s.bg} border border-border rounded-xl p-3 text-center`}>
                    <p className={`font-bold font-data text-xl ${s.color}`}>{s.v}</p>
                    <p className="text-muted-foreground text-xs">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/20">
                        {["Nama","Universitas","Program","Divisi","IPK","Tgl. Daftar","Status","Aksi"].map((h)=>(
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a)=>{
                        const cfg = STATUS_CFG[a.status as Status];
                        return (
                          <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#003087] to-[#1A5CB8] flex items-center justify-center text-white text-[10px] font-bold shrink-0">{a.name.charAt(0)}</div>
                                <span className="font-semibold text-sm text-foreground whitespace-nowrap">{a.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{a.univ}</td>
                            <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-[#003087]/8 text-[#003087] dark:bg-[#4A8FE0]/10 dark:text-[#4A8FE0] rounded-full text-xs font-medium whitespace-nowrap">{a.prog}</span></td>
                            <td className="px-4 py-3.5 text-xs text-muted-foreground">{a.div}</td>
                            <td className="px-4 py-3.5 text-xs font-data font-semibold text-foreground">{a.gpa}</td>
                            <td className="px-4 py-3.5 text-xs text-muted-foreground font-data whitespace-nowrap">{a.date}</td>
                            <td className="px-4 py-3.5">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.color} whitespace-nowrap`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>{a.status}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <button onClick={()=>setSelectedApp(a)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#003087]/8 dark:bg-[#4A8FE0]/10 text-[#003087] dark:text-[#4A8FE0] rounded-lg text-xs font-semibold hover:bg-[#003087] dark:hover:bg-[#4A8FE0] hover:text-white transition-all">
                                <Eye size={12}/> Detail
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <div className="flex flex-col items-center py-12 text-muted-foreground">
                      <AlertCircle size={32} className="mb-2 opacity-25"/>
                      <p className="text-sm">Tidak ada data ditemukan.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ════ BOOKS PHYSICAL ════ */}
          {activeMenu === "books-physical" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
                  <input placeholder="Cari buku fisik..." className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:border-[#003087] focus:outline-none"/>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#003087] dark:bg-[#4A8FE0] text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all">
                  + Tambah Buku
                </button>
              </div>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      {["Judul","Penulis","Genre","Stok","Status","Aksi"].map((h)=>(
                        <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BOOKS_ADMIN.filter(b=>b.type==="physical").map((b)=>(
                      <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-foreground">{b.title}</td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">{b.author}</td>
                        <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">{b.genre}</span></td>
                        <td className="px-4 py-3.5 font-data text-sm font-semibold">{b.stock === -1 ? "∞" : b.stock}</td>
                        <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${b.status==="Tersedia"?"bg-emerald-100 text-emerald-700":"bg-red-100 text-red-700"}`}>{b.status}</span></td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-1">
                            <button className="px-2 py-1 bg-[#003087]/8 text-[#003087] dark:text-[#4A8FE0] rounded-lg text-xs font-medium hover:bg-[#003087] hover:text-white transition-all">Edit</button>
                            <button className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-600 hover:text-white transition-all">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════ PLACEHOLDER MODULES ════ */}
          {!["dashboard","applicants","books-physical"].includes(activeMenu) && (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <BarChart3 size={44} className="mb-3 opacity-15"/>
              <p className="font-bold text-foreground text-base mb-1" style={{fontFamily:'Poppins,sans-serif'}}>{activeLabel}</p>
              <p className="text-sm text-center max-w-xs">Modul ini sedang dikembangkan. Kunjungi Dashboard atau Data Pelamar untuk fitur yang sudah tersedia.</p>
              <button onClick={()=>setActiveMenu("dashboard")} className="mt-4 px-4 py-2 bg-[#003087] dark:bg-[#4A8FE0] text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all">
                Kembali ke Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {selectedApp && <ApplicantModal app={selectedApp} onClose={()=>setSelectedApp(null)}/>}
    </div>
  );
}

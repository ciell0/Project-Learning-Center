import { useState } from "react";
import {
  Search, Filter, ChevronRight, Clock, CheckCircle, XCircle,
  Eye, Calendar, Zap, AlertCircle, Building2, ArrowRight
} from "lucide-react";

const APPS = [
  { code:"MAG-A7B2C3", program:"BI Malabar", division:"Social Media",    date:"10 Jun 2026", period:"1 Agu – 31 Okt 2026", status:"On Review" as const },
  { code:"MAG-D4E5F6", program:"BI Regular", division:"—",               date:"15 Mar 2026", period:"1 Apr – 30 Jun 2026",  status:"Diterima"  as const },
  { code:"MAG-G7H8I9", program:"BI Malabar", division:"Library",         date:"10 Jan 2026", period:"1 Feb – 30 Apr 2026",  status:"Ditolak"   as const },
  { code:"MAG-J1K2L3", program:"BI Regular", division:"—",               date:"20 Sep 2025", period:"1 Okt – 30 Nov 2025",  status:"Diterima"  as const },
];

type Status = "Menunggu"|"On Review"|"Diterima"|"Ditolak";
const STATUS_CFG: Record<Status, {color:string; dot:string; bg:string; icon: React.ElementType}> = {
  Menunggu:    { color:"text-gray-600",     dot:"bg-gray-400",   bg:"bg-gray-100 dark:bg-gray-800/40",    icon:Clock         },
  "On Review": { color:"text-amber-700 dark:text-amber-400",   dot:"bg-amber-500",  bg:"bg-amber-100 dark:bg-amber-900/30",  icon:Eye           },
  Diterima:    { color:"text-emerald-700 dark:text-emerald-400",dot:"bg-emerald-500",bg:"bg-emerald-100 dark:bg-emerald-900/30",icon:CheckCircle  },
  Ditolak:     { color:"text-red-700 dark:text-red-400",       dot:"bg-red-500",    bg:"bg-red-100 dark:bg-red-900/30",      icon:XCircle       },
};

/* Tracking timeline steps */
function buildTimeline(status: Status) {
  const done4 = status === "Diterima" || status === "Ditolak";
  return [
    { label:"Pendaftaran Diterima", desc:"Dokumen berhasil disubmit ke sistem", done:true, date:"10 Jun 2026" },
    { label:"Seleksi Administrasi", desc:"Verifikasi dokumen oleh tim BI Malang", done:status!=="Menunggu", active:status==="On Review", date:status!=="Menunggu"?"12 Jun 2026":"" },
    { label:"Tes & Wawancara",      desc:"Jadwal dikirim via email & platform",  done:done4, date:done4?"15 Jun 2026":"" },
    { label:status==="Ditolak"?"Tidak Diterima":"Diterima",
      desc:status==="Diterima"?"Selamat! Anda diterima sebagai peserta magang":status==="Ditolak"?"Mohon maaf, Anda tidak lolos seleksi kali ini":"Menunggu keputusan akhir",
      done:done4, date:done4?"21 Jun 2026":"" },
  ];
}

export function ApplicationHistoryPage() {
  const [search,    setSearch]    = useState("");
  const [statusF,   setStatusF]   = useState<"all"|Status>("all");
  const [tracking,  setTracking]  = useState<typeof APPS[0]|null>(null);
  const [searchCode, setSearchCode] = useState("");
  const [foundApp,  setFoundApp]  = useState<typeof APPS[0]|null|"not-found">(null);

  const filtered = APPS.filter((a) => {
    const matchQ = a.code.toLowerCase().includes(search.toLowerCase()) || a.program.toLowerCase().includes(search.toLowerCase());
    const matchS = statusF === "all" || a.status === statusF;
    return matchQ && matchS;
  });

  const handleSearch = () => {
    const found = APPS.find((a) => a.code.toLowerCase() === searchCode.toLowerCase().trim());
    setFoundApp(found || "not-found");
    if (found) setTracking(found);
  };

  return (
    <div className="min-h-screen bg-background pt-[89px]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-7">
          <h1 className="font-bold text-foreground" style={{fontFamily:'Poppins,sans-serif',fontSize:'1.3rem'}}>Riwayat Pendaftaran</h1>
          <p className="text-muted-foreground text-sm mt-1">Pantau status semua pendaftaran magang Anda</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {l:"Total",      v:APPS.length,                              color:"text-foreground",  bg:"bg-card"},
            {l:"Diterima",   v:APPS.filter(a=>a.status==="Diterima").length, color:"text-emerald-600",bg:"bg-emerald-50 dark:bg-emerald-950/20"},
            {l:"On Review",  v:APPS.filter(a=>a.status==="On Review").length, color:"text-amber-600",  bg:"bg-amber-50 dark:bg-amber-950/20"},
            {l:"Ditolak",    v:APPS.filter(a=>a.status==="Ditolak").length,   color:"text-red-600",    bg:"bg-red-50 dark:bg-red-950/20"},
          ].map((s)=>(
            <div key={s.l} className={`${s.bg} border border-border rounded-2xl p-4 text-center`}>
              <p className={`font-bold font-data text-2xl ${s.color}`}>{s.v}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Cari kode atau program..." className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:border-[#003087] dark:focus:border-[#4A8FE0] focus:outline-none"/>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-muted-foreground"/>
            {(["all","Menunggu","On Review","Diterima","Ditolak"] as const).map((s)=>(
              <button key={s} onClick={()=>setStatusF(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${statusF===s?"bg-[#003087] dark:bg-[#4A8FE0] text-white shadow":"bg-card border border-border text-muted-foreground hover:border-[#003087]/30"}`}>
                {s === "all" ? "Semua" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {["Kode Registrasi","Program","Divisi","Tanggal Daftar","Periode Magang","Status","Aksi"].map((h)=>(
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => {
                  const cfg = STATUS_CFG[app.status];
                  const Icon = cfg.icon;
                  const active = tracking?.code === app.code;
                  return (
                    <tr key={app.code} className={`border-b border-border last:border-0 transition-colors ${active ? "bg-[#003087]/5 dark:bg-[#4A8FE0]/5" : "hover:bg-muted/10"}`}>
                      <td className="px-4 py-3.5">
                        <span className="font-data text-xs font-bold text-[#003087] dark:text-[#4A8FE0] bg-[#003087]/8 dark:bg-[#4A8FE0]/10 px-2 py-1 rounded-lg">{app.code}</span>
                      </td>
                      <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-[#003087]/8 dark:bg-[#4A8FE0]/10 text-[#003087] dark:text-[#4A8FE0] rounded-full text-xs font-medium whitespace-nowrap">{app.program}</span></td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground">{app.division}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-data"><Calendar size={10}/>{app.date}</div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground font-data whitespace-nowrap">{app.period}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.color}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>{app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button onClick={() => setTracking(active ? null : app)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${active ? "bg-[#003087] dark:bg-[#4A8FE0] text-white" : "bg-[#003087]/8 dark:bg-[#4A8FE0]/10 text-[#003087] dark:text-[#4A8FE0] hover:bg-[#003087] hover:text-white"}`}>
                          <Eye size={11}/>Track
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-10 text-muted-foreground">
                <AlertCircle size={32} className="mb-2 opacity-20"/>
                <p className="text-sm">Tidak ada data ditemukan.</p>
              </div>
            )}
          </div>
        </div>

        {/* Status Tracking Panel */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-5 text-sm" style={{fontFamily:'Poppins,sans-serif'}}>Pelacakan Status Lamaran</h3>

          {/* Search by code */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Masukkan kode registrasi (contoh: MAG-A7B2C3)"
                className="w-full pl-9 pr-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-[#003087] dark:focus:border-[#4A8FE0] focus:outline-none"
              />
            </div>
            <button onClick={handleSearch} className="px-5 py-2.5 bg-[#003087] dark:bg-[#4A8FE0] text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2">
              <Search size={13}/> Cek Status
            </button>
          </div>

          {foundApp === "not-found" && !tracking && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/30 rounded-xl">
              <AlertCircle size={14}/> Kode registrasi tidak ditemukan. Periksa kembali kode Anda.
            </div>
          )}

          {tracking && (
            <div>
              {/* App info */}
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl mb-6">
                <div className="w-10 h-10 bg-[#003087]/8 dark:bg-[#4A8FE0]/10 rounded-xl flex items-center justify-center">
                  <Building2 size={18} className="text-[#003087] dark:text-[#4A8FE0]"/>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{tracking.program} – {tracking.division}</p>
                  <p className="text-muted-foreground text-xs font-data">{tracking.code} · Daftar {tracking.date}</p>
                </div>
                {(() => {
                  const cfg = STATUS_CFG[tracking.status];
                  return (
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${cfg.bg} ${cfg.color}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>{tracking.status}
                    </span>
                  );
                })()}
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border"/>
                {buildTimeline(tracking.status).map((step, i) => (
                  <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all ${
                      step.done
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : step.active
                          ? "bg-[#C9A84C] border-[#C9A84C] text-white shadow-lg shadow-[#C9A84C]/30"
                          : "bg-card border-border text-muted-foreground"
                    }`}>
                      {step.done ? <CheckCircle size={13}/> : step.active ? <Zap size={12}/> : <span className="text-[10px] font-bold">{i+1}</span>}
                    </div>
                    <div className="pt-1">
                      {step.date && <p className="text-[10px] font-data text-muted-foreground mb-0.5">{step.date}</p>}
                      <p className={`text-sm font-semibold ${step.done ? "text-emerald-600 dark:text-emerald-400" : step.active ? "text-[#C9A84C]" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {tracking.status === "Diterima" && (
                <div className="mt-5 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-3">
                  <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                  <div>
                    <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">Selamat, Anda Diterima! 🎉</p>
                    <p className="text-emerald-700 dark:text-emerald-400 text-xs mt-1">Harap cek email Anda untuk informasi lebih lanjut mengenai jadwal orientasi dan penempatan divisi.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {!tracking && foundApp !== "not-found" && (
            <div className="flex flex-col items-center py-8 text-muted-foreground">
              <div className="w-14 h-14 bg-muted/40 rounded-2xl flex items-center justify-center mb-3">
                <Eye size={24} className="opacity-30"/>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Belum ada pelacakan</p>
              <p className="text-xs text-center max-w-xs">Klik tombol <strong>Track</strong> pada baris lamaran di atas, atau masukkan kode registrasi untuk melihat status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

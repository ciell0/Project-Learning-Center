import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Briefcase,
  Users,
  Coffee,
} from "lucide-react";

interface AuthProps {
  onLogin: (user: { name: string; email: string }) => void;
  onNavigate: (page: string) => void;
  initialPage?: "login" | "register";
}

const FEATURES = [
  { icon: BookOpen, text: "Akses 12.450+ koleksi buku" },
  { icon: Briefcase, text: "Daftar program magang BI" },
  { icon: Users, text: "Bergabung komunitas GenBI" },
  { icon: Coffee, text: "Reservasi fasilitas BI Corner" },
];

export function AuthPage({
  onLogin,
  onNavigate,
  initialPage = "login",
}: AuthProps) {
  const [page, setPage] = useState(initialPage);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (page === "register" && !form.name.trim())
      e.name = "Nama lengkap wajib diisi";
    if (!form.email.includes("@"))
      e.email = "Format email tidak valid";
    if (form.password.length < 6)
      e.password = "Password minimal 6 karakter";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name:
          form.name || "Ciello Belleza Zukhrufi Susilantoro",
        email: form.email || "ciellobelleza@student.ub.ac.id",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background pt-[62px] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[900px] grid lg:grid-cols-[1fr_420px] shadow-2xl shadow-[#003087]/10 rounded-3xl overflow-hidden border border-border">
        {/* ── Left panel ── */}
        <div className="hero-mesh p-10 flex flex-col justify-between min-h-[500px]">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-[#C9A84C] rounded-xl flex items-center justify-center shadow-lg">
                <span
                  className="font-bold text-white text-sm"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  BI
                </span>
              </div>
              <div>
                <p
                  className="font-bold text-white text-sm leading-none"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  BI Malang Learning Center
                </p>
                <p className="text-white/45 text-[10px] mt-0.5">
                  Bank Indonesia Kantor Perwakilan Malang
                </p>
              </div>
            </div>

            <h2
              className="text-white font-bold leading-tight mb-3"
              style={{
                fontSize: "1.8rem",
                fontFamily: "Poppins,sans-serif",
                lineHeight: 1.15,
              }}
            >
              {page === "login"
                ? "Selamat Datang\nKembali 👋"
                : "Bergabung\nSekarang 🚀"}
            </h2>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              {page === "login"
                ? "Masuk ke akun Anda untuk mengakses semua layanan BI Malang Learning Center."
                : "Buat akun gratis dan nikmati akses penuh ke seluruh layanan BI Malang."}
            </p>

            <div className="space-y-3">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center border border-white/15 shrink-0">
                    <Icon
                      size={14}
                      className="text-[#C9A84C]"
                    />
                  </div>
                  <span className="text-white/70 text-sm">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 p-4 bg-white/8 rounded-2xl border border-white/12">
            <p className="text-white/40 text-[10px] mb-2 uppercase tracking-widest font-semibold">
              Platform resmi
            </p>
            <p className="text-white/70 text-xs">
              BI Malang Learning Center adalah platform digital
              resmi Bank Indonesia Kantor Perwakilan Malang
              untuk mendukung ekosistem edukasi dan pengembangan
              SDM.
            </p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="bg-card p-8 flex flex-col justify-center">
          {/* Tab switch */}
          <div className="flex p-1 bg-muted rounded-2xl mb-7">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setPage(t);
                  setErrors({});
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${page === t ? "bg-card shadow-md text-[#003087] dark:text-[#4A8FE0]" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t === "login" ? "Masuk" : "Daftar"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {page === "register" && (
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Ahmad Rizki Pratama"
                    className={`w-full pl-9 pr-4 py-2.5 bg-input-background border rounded-xl text-sm focus:outline-none transition-colors ${errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-[#003087] dark:focus:border-[#4A8FE0]"}`}
                  />
                </div>
                {errors.name && (
                  <p className="text-destructive text-[10px] mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="nama@email.com"
                  className={`w-full pl-9 pr-4 py-2.5 bg-input-background border rounded-xl text-sm focus:outline-none transition-colors ${errors.email ? "border-destructive" : "border-border focus:border-[#003087] dark:focus:border-[#4A8FE0]"}`}
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-[10px] mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {page === "register" && (
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  No. Telepon
                </label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    placeholder="08xxxxxxxxxx"
                    className="w-full pl-9 pr-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-[#003087] dark:focus:border-[#4A8FE0] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  placeholder="Minimal 6 karakter"
                  className={`w-full pl-9 pr-10 py-2.5 bg-input-background border rounded-xl text-sm focus:outline-none transition-colors ${errors.password ? "border-destructive" : "border-border focus:border-[#003087] dark:focus:border-[#4A8FE0]"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? (
                    <EyeOff size={14} />
                  ) : (
                    <Eye size={14} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-[10px] mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {page === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-[#003087] dark:text-[#4A8FE0] hover:underline"
                >
                  Lupa password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#003087] to-[#1A5CB8] text-white rounded-xl font-semibold hover:brightness-110 transition-all disabled:opacity-70 shadow-md hover:shadow-lg text-sm mt-1"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {page === "login"
                    ? "Masuk ke Akun"
                    : "Buat Akun Gratis"}
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground pt-1">
              {page === "login"
                ? "Belum punya akun? "
                : "Sudah punya akun? "}
              <button
                type="button"
                onClick={() => {
                  setPage(
                    page === "login" ? "register" : "login",
                  );
                  setErrors({});
                }}
                className="text-[#003087] dark:text-[#4A8FE0] font-semibold hover:underline"
              >
                {page === "login" ? "Daftar sekarang" : "Masuk"}
              </button>
            </p>
          </form>

          <div className="mt-5 p-3 bg-muted/40 rounded-xl flex items-center gap-2">
            <CheckCircle
              size={13}
              className="text-emerald-500 shrink-0"
            />
            <p className="text-[10px] text-muted-foreground">
              Khusus untuk mahasiswa, akademisi, dan mitra Bank
              Indonesia Malang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
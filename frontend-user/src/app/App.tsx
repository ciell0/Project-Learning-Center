/* MARKER-MAKE-KIT-INVOKED */
import { useState, useEffect, useRef } from "react";
import { Navigation }            from "./components/Navigation";
import { LandingPage }           from "./components/LandingPage";
import { LibraryPage }           from "./components/LibraryPage";
import { InternshipPage }        from "./components/InternshipPage";
import { GenBIPage }             from "./components/GenBIPage";
import { BICornerPage }          from "./components/BICornerPage";
import { AuthPage }              from "./components/AuthPages";
import { ProfilePage }           from "./components/ProfilePage";
import { ApplicationHistoryPage} from "./components/ApplicationHistory";
import { AdminDashboard }        from "./components/AdminDashboard";

type Page =
  | "home" | "library" | "internship" | "genbi" | "bicorner"
  | "login" | "register"
  | "profile" | "history" | "settings"
  | "admin";

function PageWrapper({ children, pageKey }: { children: React.ReactNode; pageKey: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.classList.add("page-enter");
  }, [pageKey]);
  return <div ref={ref} key={pageKey}>{children}</div>;
}

export default function App() {
  const [page,       setPage]       = useState<Page>("home");
  const [isDark,     setIsDark]     = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,       setUser]       = useState<{ name: string; email: string } | null>(null);

  /* Sync dark class on root */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  /* Scroll to top on page change */
  const navigate = (p: string) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setPage(p as Page);
  };

  const handleLogin  = (u: { name: string; email: string }) => {
    setIsLoggedIn(true);
    setUser(u);
    navigate("home");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("home");
  };

  /* ── Admin full-screen ── */
  if (page === "admin") {
    return (
      <div className={isDark ? "dark" : ""}>
        <AdminDashboard
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          onExitAdmin={() => navigate("home")}
        />
      </div>
    );
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">

        {/* Sticky top nav */}
        <Navigation
          currentPage={page}
          onNavigate={navigate}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          user={user || undefined}
        />

        {/* Page content with enter animation */}
        <PageWrapper pageKey={page}>
          {page === "home" && <LandingPage onNavigate={navigate} />}
          {page === "library"    && <LibraryPage />}
          {page === "internship" && <InternshipPage isLoggedIn={isLoggedIn} onNavigate={navigate} />}
          {page === "genbi"      && <GenBIPage />}
          {page === "bicorner"   && <BICornerPage />}
          {(page === "login" || page === "register") && (
            <AuthPage onLogin={handleLogin} onNavigate={navigate} initialPage={page} />
          )}
          {page === "profile" && isLoggedIn && <ProfilePage />}
          {page === "history" && isLoggedIn && <ApplicationHistoryPage />}
          {page === "settings" && isLoggedIn && (
            <div className="min-h-screen bg-background pt-[89px] flex items-center justify-center px-4">
              <div className="text-center bg-card border border-border rounded-2xl p-10 max-w-sm w-full shadow-xl">
                <div className="w-14 h-14 bg-[#003087]/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <p className="font-bold text-foreground text-lg mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Pengaturan Akun</p>
                <p className="text-muted-foreground text-sm mb-6">Gunakan halaman Profil untuk memperbarui data Anda.</p>
                <button onClick={() => navigate("profile")} className="px-5 py-2.5 bg-[#003087] dark:bg-[#4A8FE0] text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all">
                  Buka Profil
                </button>
              </div>
            </div>
          )}

          {/* Guard: if accessing protected page without login */}
          {(page === "profile" || page === "history" || page === "settings") && !isLoggedIn && (
            <div className="min-h-screen bg-background pt-[89px] flex items-center justify-center px-4">
              <div className="text-center bg-card border border-border rounded-2xl p-10 max-w-sm w-full shadow-xl">
                <p className="font-bold text-foreground text-lg mb-2">Akses Terbatas</p>
                <p className="text-muted-foreground text-sm mb-6">Silakan masuk terlebih dahulu untuk mengakses halaman ini.</p>
                <button onClick={() => navigate("login")} className="px-5 py-2.5 bg-[#003087] dark:bg-[#4A8FE0] text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all">
                  Masuk Sekarang
                </button>
              </div>
            </div>
          )}
        </PageWrapper>

        {/* Floating admin portal link */}
        {page === "home" && (
          <div className="fixed bottom-5 right-5 z-40">
            <button
              onClick={() => navigate("admin")}
              className="text-[10px] px-3 py-1.5 bg-foreground/8 hover:bg-foreground/15 text-muted-foreground rounded-xl backdrop-blur-sm border border-border transition-all font-medium"
            >
              Admin Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import {
  BookOpen, Briefcase, Users, Coffee, LogIn, UserPlus, Menu, X,
  Moon, Sun, LogOut, User, History, Settings, ChevronDown, Shield
} from "lucide-react";

interface NavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  user?: { name: string; email: string };
}

const navLinks = [
  { id: "home",       label: "Beranda",   icon: null },
  { id: "library",    label: "Perpustakaan", icon: BookOpen },
  { id: "internship", label: "Magang",    icon: Briefcase },
  { id: "genbi",      label: "GenBI",     icon: Users },
  { id: "bicorner",   label: "BI Corner", icon: Coffee },
];

export function Navigation({ currentPage, onNavigate, isDark, onToggleDark, isLoggedIn, onLogout, user }: NavProps) {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled,    setScrolled]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const close = () => setUserMenuOpen(false);
    if (userMenuOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [userMenuOpen]);

  const navBase = scrolled
    ? "bg-white/90 dark:bg-[#080F1E]/90 backdrop-blur-2xl shadow-lg shadow-[#003087]/5"
    : "bg-white/70 dark:bg-[#080F1E]/70 backdrop-blur-xl";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-[#003087]/8 dark:border-[#4A8FE0]/10 transition-all duration-300 ${navBase}`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* ── Logo ── */}
          <button onClick={() => onNavigate("home")} className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#003087] to-[#1A5CB8] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
              <span className="text-white text-[11px] font-bold tracking-tight leading-none">BI</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#C9A84C] rounded-full border-2 border-white dark:border-[#080F1E]" />
            </div>
            <div className="hidden sm:block leading-none">
              <p className="text-[13px] font-bold text-[#003087] dark:text-[#4A8FE0] leading-none" style={{fontFamily:'Poppins,sans-serif'}}>BI Malang</p>
              <p className="text-[9px] text-muted-foreground leading-none mt-0.5 tracking-wide uppercase">Learning Center</p>
            </div>
          </button>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ id, label }) => {
              const active = currentPage === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`relative px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                    active
                      ? "text-[#003087] dark:text-[#4A8FE0]"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 dark:hover:bg-secondary/40"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C9A84C] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-1.5">
            {/* Dark mode */}
            <button
              onClick={onToggleDark}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {isLoggedIn && user ? (
              /* User menu */
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 dark:bg-secondary/60 transition-all text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#003087] to-[#1A5CB8] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-[13px] font-medium text-foreground max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={12} className={`text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-popover border border-border rounded-2xl shadow-2xl shadow-[#003087]/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3.5 bg-gradient-to-br from-[#003087]/5 to-[#C9A84C]/5 border-b border-border">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003087] to-[#1A5CB8] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate text-foreground">{user.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    {[
                      { id: "profile",  label: "My Profile",          icon: User     },
                      { id: "history",  label: "Application History",  icon: History  },
                      { id: "settings", label: "Account Settings",     icon: Settings },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => { onNavigate(id); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary/60 transition-colors text-left"
                      >
                        <Icon size={14} className="text-[#003087] dark:text-[#4A8FE0]" />
                        {label}
                      </button>
                    ))}
                    <div className="border-t border-border">
                      <button
                        onClick={() => { onLogout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-destructive/8 text-destructive transition-colors text-left"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => onNavigate("login")}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium text-[#003087] dark:text-[#4A8FE0] border border-[#003087]/25 dark:border-[#4A8FE0]/25 hover:bg-[#003087]/5 dark:hover:bg-[#4A8FE0]/5 transition-all"
                >
                  <LogIn size={13} />
                  Masuk
                </button>
                <button
                  onClick={() => onNavigate("register")}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold bg-gradient-to-r from-[#C9A84C] to-[#E8C85A] text-white hover:brightness-110 hover:shadow-md transition-all shadow-sm"
                >
                  <UserPlus size={13} />
                  Daftar
                </button>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-xl text-foreground hover:bg-secondary/60"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-popover/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {navLinks.map(({ id, label, icon: Icon }) => {
            const active = currentPage === id;
            return (
              <button
                key={id}
                onClick={() => { onNavigate(id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-[#003087] text-white" : "text-foreground hover:bg-secondary/60"
                }`}
              >
                {Icon && <Icon size={15} />}
                {label}
              </button>
            );
          })}
          {!isLoggedIn && (
            <div className="flex gap-2 pt-2 border-t border-border">
              <button onClick={() => { onNavigate("login"); setMobileOpen(false); }} className="flex-1 py-2 text-sm font-medium rounded-xl border border-[#003087]/30 text-[#003087] dark:text-[#4A8FE0]">Masuk</button>
              <button onClick={() => { onNavigate("register"); setMobileOpen(false); }} className="flex-1 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C85A] text-white">Daftar</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

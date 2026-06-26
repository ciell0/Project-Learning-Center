import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CreditCard,
  Tag,
  Wrench,
  Save,
  Edit3,
  X,
  Plus,
  Building2,
} from "lucide-react";

const SKILLS_OPTIONS = [
  "Analisis Data",
  "Microsoft Excel",
  "Public Speaking",
  "Research",
  "Writing",
  "Teamwork",
  "Leadership",
  "Problem Solving",
  "Communication",
];
const TOOLS_OPTIONS = [
  "Excel",
  "Power BI",
  "Canva",
  "Figma",
  "Laravel",
  "React",
  "Python",
  "Tableau",
  "SPSS",
];

export function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [skills, setSkills] = useState([
    "Analisis Data",
    "Research",
    "Communication",
  ]);
  const [tools, setTools] = useState([
    "Excel",
    "Power BI",
    "Canva",
  ]);
  const [customSkill, setCustomSkill] = useState("");
  const [customTool, setCustomTool] = useState("");
  const [profile, setProfile] = useState({
    name: "Ciello Belleza Zukhrufi Susilantoro",
    email: "ciellobelleza@student.ub.ac.id",
    phone: "081234567890",
    address:
      "Jl. Veteran No.45, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
    nim: "195020300111042",
    university: "Universitas Brawijaya",
    faculty: "Fakultas Ekonomi dan Bisnis",
    major: "Ilmu Ekonomi",
    semester: "7",
    bankAccount: "1234567890",
    npwp: "12.345.678.9-012.345",
  });

  const toggleSkill = (s: string) =>
    setSkills((prev) =>
      prev.includes(s)
        ? prev.filter((x) => x !== s)
        : [...prev, s],
    );
  const toggleTool = (t: string) =>
    setTools((prev) =>
      prev.includes(t)
        ? prev.filter((x) => x !== t)
        : [...prev, t],
    );

  const addCustomSkill = () => {
    if (customSkill.trim()) {
      setSkills([...skills, customSkill.trim()]);
      setCustomSkill("");
    }
  };
  const addCustomTool = () => {
    if (customTool.trim()) {
      setTools([...tools, customTool.trim()]);
      setCustomTool("");
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Data", icon: User },
    {
      id: "academic",
      label: "Academic Data",
      icon: GraduationCap,
    },
    { id: "additional", label: "Additional", icon: CreditCard },
    { id: "skills", label: "Skills & Tools", icon: Wrench },
  ];
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card Header */}
        <div className="bg-gradient-to-r from-[#001A4D] to-[#003087] rounded-2xl p-6 text-white mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 bg-[#C9A84C] rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-xl text-white">
              {profile.name}
            </h1>
            <p className="text-white/60 text-sm">
              {profile.email}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/80">
                {profile.university}
              </span>
              <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/80">
                {profile.major}
              </span>
              <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/80">
                Semester {profile.semester}
              </span>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${editing ? "bg-white/20 text-white" : "bg-[#C9A84C] text-white hover:brightness-110"}`}
          >
            {editing ? (
              <>
                <X size={14} /> Cancel
              </>
            ) : (
              <>
                <Edit3 size={14} /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 bg-card border border-border rounded-xl overflow-hidden mb-6">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-medium transition-all ${activeTab === t.id ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"}`}
              >
                <Icon size={13} />
                <span className="hidden sm:block">
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          {activeTab === "personal" && (
            <div>
              <h2 className="font-bold text-foreground mb-5">
                Data Pribadi
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    key: "name",
                    label: "Nama Lengkap",
                    icon: User,
                    type: "text",
                  },
                  {
                    key: "email",
                    label: "Email",
                    icon: Mail,
                    type: "email",
                  },
                  {
                    key: "phone",
                    label: "No. Telepon",
                    icon: Phone,
                    type: "tel",
                  },
                ].map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.key}>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                        <Icon size={13} /> {field.label}
                      </label>
                      {editing ? (
                        <input
                          type={field.type}
                          value={(profile as any)[field.key]}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              [field.key]: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                        />
                      ) : (
                        <div className="px-3 py-2.5 bg-muted/30 rounded-xl text-sm text-foreground">
                          {(profile as any)[field.key]}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                    <MapPin size={13} /> Alamat
                  </label>
                  {editing ? (
                    <textarea
                      value={profile.address}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          address: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none resize-none"
                    />
                  ) : (
                    <div className="px-3 py-2.5 bg-muted/30 rounded-xl text-sm text-foreground">
                      {profile.address}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "academic" && (
            <div>
              <h2 className="font-bold text-foreground mb-5">
                Data Akademik
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: "nim", label: "NIM" },
                  { key: "university", label: "Universitas" },
                  { key: "faculty", label: "Fakultas" },
                  { key: "major", label: "Jurusan/Prodi" },
                  { key: "semester", label: "Semester" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      {field.label}
                    </label>
                    {editing ? (
                      <input
                        value={(profile as any)[field.key]}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            [field.key]: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2.5 bg-muted/30 rounded-xl text-sm text-foreground">
                        {(profile as any)[field.key]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "additional" && (
            <div>
              <h2 className="font-bold text-foreground mb-5">
                Data Tambahan
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Nomor Rekening Bank
                  </label>
                  {editing ? (
                    <input
                      value={profile.bankAccount}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          bankAccount: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                    />
                  ) : (
                    <div className="px-3 py-2.5 bg-muted/30 rounded-xl text-sm font-mono text-foreground">
                      {profile.bankAccount}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                    NPWP{" "}
                    <span className="text-muted-foreground font-normal">
                      (opsional)
                    </span>
                  </label>
                  {editing ? (
                    <input
                      value={profile.npwp}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          npwp: e.target.value,
                        })
                      }
                      placeholder="xx.xxx.xxx.x-xxx.xxx"
                      className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                    />
                  ) : (
                    <div className="px-3 py-2.5 bg-muted/30 rounded-xl text-sm font-mono text-foreground">
                      {profile.npwp || "—"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div>
              <h2 className="font-bold text-foreground mb-5">
                Skills & Tools
              </h2>
              <div className="mb-6">
                <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-3">
                  <Tag size={13} /> Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {SKILLS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => editing && toggleSkill(s)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${skills.includes(s) ? "bg-primary text-white" : editing ? "bg-muted text-muted-foreground hover:bg-secondary cursor-pointer border border-border" : "bg-muted text-muted-foreground cursor-default border border-border opacity-40"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {editing && (
                  <div className="flex gap-2">
                    <input
                      value={customSkill}
                      onChange={(e) =>
                        setCustomSkill(e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && addCustomSkill()
                      }
                      placeholder="Tambah skill lain..."
                      className="flex-1 px-3 py-2 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                    />
                    <button
                      onClick={addCustomSkill}
                      className="px-3 py-2 bg-primary text-white rounded-xl text-sm hover:brightness-110"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {skills
                    .filter((s) => !SKILLS_OPTIONS.includes(s))
                    .map((s) => (
                      <span
                        key={s}
                        className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {s}{" "}
                        {editing && (
                          <button
                            onClick={() => toggleSkill(s)}
                          >
                            <X size={10} />
                          </button>
                        )}
                      </span>
                    ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-3">
                  <Wrench size={13} /> Tools / Software
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {TOOLS_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => editing && toggleTool(t)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${tools.includes(t) ? "bg-accent text-accent-foreground" : editing ? "bg-muted text-muted-foreground hover:bg-secondary cursor-pointer border border-border" : "bg-muted text-muted-foreground cursor-default border border-border opacity-40"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {editing && (
                  <div className="flex gap-2">
                    <input
                      value={customTool}
                      onChange={(e) =>
                        setCustomTool(e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && addCustomTool()
                      }
                      placeholder="Tambah tools lain..."
                      className="flex-1 px-3 py-2 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                    />
                    <button
                      onClick={addCustomTool}
                      className="px-3 py-2 bg-accent text-accent-foreground rounded-xl text-sm hover:brightness-110"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tools
                    .filter((t) => !TOOLS_OPTIONS.includes(t))
                    .map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1 px-2.5 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium"
                      >
                        {t}{" "}
                        {editing && (
                          <button onClick={() => toggleTool(t)}>
                            <X size={10} />
                          </button>
                        )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}

          {editing && (
            <div className="flex justify-end mt-6 pt-5 border-t border-border">
              <button
                onClick={() => setEditing(false)}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all"
              >
                <Save size={15} /> Simpan Perubahan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
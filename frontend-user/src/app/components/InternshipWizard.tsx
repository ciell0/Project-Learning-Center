import { useState, useCallback } from "react";
import {
  Check,
  Upload,
  X,
  File,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  User,
  Briefcase,
  Wrench,
  FolderOpen,
} from "lucide-react";

const DIVISIONS = [
  { id: "umkm", label: "UMKM Assistance" },
  { id: "socmed", label: "Social Media" },
  { id: "library", label: "Library" },
  { id: "other", label: "Other Divisions" },
];

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
  "Project Management",
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
  "AutoCAD",
  "Photoshop",
  "Illustrator",
];

interface WizardProps {
  type: "regular" | "malabar";
  initialDivision?: string;
  onClose: () => void;
  onNavigate: (p: string) => void;
}

interface UploadedFile {
  name: string;
  size: number;
  key: string;
}

function FileDropzone({
  label,
  required,
  fileKey,
  uploaded,
  onUpload,
  onRemove,
}: {
  label: string;
  required?: boolean;
  fileKey: string;
  uploaded?: UploadedFile;
  onUpload: (key: string, file: UploadedFile) => void;
  onRemove: (key: string) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file)
        onUpload(fileKey, {
          name: file.name,
          size: file.size,
          key: fileKey,
        });
    },
    [fileKey, onUpload],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file)
      onUpload(fileKey, {
        name: file.name,
        size: file.size,
        key: fileKey,
      });
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1">
        {label}{" "}
        {required && (
          <span className="text-destructive">*</span>
        )}
      </label>
      {uploaded ? (
        <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
          <File
            size={16}
            className="text-emerald-600 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 truncate">
              {uploaded.name}
            </p>
            <p className="text-xs text-emerald-600">
              {(uploaded.size / 1024).toFixed(0)} KB
            </p>
          </div>
          <button
            onClick={() => onRemove(fileKey)}
            className="p-1 rounded hover:bg-emerald-100 text-emerald-600"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <Upload size={20} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            <span className="text-primary font-medium">
              Click to upload
            </span>{" "}
            or drag & drop
          </p>
          <p className="text-xs text-muted-foreground">
            PDF, DOC, DOCX (max 5MB)
          </p>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />
        </label>
      )}
    </div>
  );
}

export function InternshipWizard({
  type,
  initialDivision,
  onClose,
  onNavigate,
}: WizardProps) {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [customTool, setCustomTool] = useState("");
  const [files, setFiles] = useState<
    Record<string, UploadedFile>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    internshipType: type,
    division: initialDivision || "",
    recommendationNumber: "",
    startDate: "",
    endDate: "",
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const mockProfile = {
    name: "Ciello Belleza Zukhrufi Susilantoro",
    nim: "195020300111042",
    university: "Universitas Brawijaya",
    faculty: "Fakultas Ilmu Komputer",
    major: "Teknologi Informasi",
    semester: "7",
    email: "ciellobelleza@student.ub.ac.id",
    phone: "081234567890",
  };

  const handleUpload = (key: string, file: UploadedFile) =>
    setFiles((prev) => ({ ...prev, [key]: file }));
  const handleRemove = (key: string) =>
    setFiles((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
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

  const requiredDocs = [
    "cv",
    "transcript",
    "recommendation",
    "proposal",
    "ktp",
  ];
  const canProceedStep4 = requiredDocs.every((k) => files[k]);

  if (submitted) {
    const code =
      "MAG-" +
      Math.random().toString(36).substring(2, 8).toUpperCase();
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-card rounded-2xl border border-border p-10 shadow-xl">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-emerald-600" />
          </div>
          <h2
            className="text-foreground font-bold mb-2"
            style={{ fontSize: "1.3rem" }}
          >
            Pendaftaran Berhasil!
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            Lamaran Anda telah diterima dan sedang diproses oleh
            tim BI Malang.
          </p>
          <div className="bg-muted/30 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">
              Kode Registrasi
            </p>
            <p className="text-primary font-bold text-xl tracking-wider">
              {code}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Simpan kode ini untuk tracking status lamaran
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate("history")}
              className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all"
            >
              Lihat Riwayat
            </button>
            <button
              onClick={() => onNavigate("internship")}
              className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-all"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { n: 1, label: "Profile", icon: User },
    { n: 2, label: "Internship Info", icon: Briefcase },
    { n: 3, label: "Skills & Tools", icon: Wrench },
    { n: 4, label: "Documents", icon: FolderOpen },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-foreground font-bold"
              style={{ fontSize: "1.3rem" }}
            >
              Pendaftaran{" "}
              {type === "malabar" ? "BI Malabar" : "BI Regular"}{" "}
              Internship
            </h1>
            <p className="text-muted-foreground text-sm">
              Lengkapi semua data dengan benar dan teliti
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-8 bg-card rounded-2xl border border-border p-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.n;
            const active = step === s.n;
            return (
              <div
                key={s.n}
                className="flex items-center flex-1"
              >
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 transition-all ${done ? "bg-emerald-500 text-white" : active ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                  >
                    {done ? (
                      <Check size={15} />
                    ) : (
                      <Icon size={15} />
                    )}
                  </div>
                  <p
                    className={`text-[10px] font-medium text-center ${active ? "text-primary" : done ? "text-emerald-600" : "text-muted-foreground"}`}
                  >
                    {s.label}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 -mt-4 transition-all ${step > s.n ? "bg-emerald-400" : "bg-border"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="w-full h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          {/* Step 1: Profile */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  Step 1 of 4
                </p>
              </div>
              <h2 className="text-foreground font-bold mb-1">
                Data Profil
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Data diambil otomatis dari profil Anda. Perbarui
                di halaman profil jika ada yang kurang tepat.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex items-center gap-3">
                <AlertCircle
                  size={16}
                  className="text-primary shrink-0"
                />
                <p className="text-sm text-primary">
                  Data diisi otomatis dari profil. Pastikan
                  profil Anda sudah lengkap dan akurat sebelum
                  mendaftar.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Nama Lengkap",
                    val: mockProfile.name,
                  },
                  { label: "Email", val: mockProfile.email },
                  {
                    label: "No. Telepon",
                    val: mockProfile.phone,
                  },
                  { label: "NIM", val: mockProfile.nim },
                  {
                    label: "Universitas",
                    val: mockProfile.university,
                  },
                  {
                    label: "Fakultas",
                    val: mockProfile.faculty,
                  },
                  { label: "Jurusan", val: mockProfile.major },
                  {
                    label: "Semester",
                    val: mockProfile.semester,
                  },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm text-muted-foreground mb-1">
                      {f.label}
                    </label>
                    <div className="px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground">
                      {f.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Internship Info */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  Step 2 of 4
                </p>
              </div>
              <h2 className="text-foreground font-bold mb-1">
                Informasi Magang
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Isi informasi program magang yang Anda lamar
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Jenis Magang{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={form.internshipType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        internshipType: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="regular">
                      BI Regular Internship
                    </option>
                    <option value="malabar">
                      BI Malabar Internship
                    </option>
                  </select>
                </div>
                {form.internshipType === "malabar" && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Divisi Pilihan{" "}
                      <span className="text-destructive">
                        *
                      </span>
                    </label>
                    <select
                      value={form.division}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          division: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="">
                        -- Pilih Divisi --
                      </option>
                      {DIVISIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Nomor Surat Rekomendasi{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    value={form.recommendationNumber}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        recommendationNumber: e.target.value,
                      })
                    }
                    placeholder="Contoh: 123/UN10/AK/2026"
                    className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Tanggal Mulai{" "}
                      <span className="text-destructive">
                        *
                      </span>
                    </label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Tanggal Selesai{" "}
                      <span className="text-destructive">
                        *
                      </span>
                    </label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  Step 3 of 4
                </p>
              </div>
              <h2 className="text-foreground font-bold mb-1">
                Skills & Tools
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Tambahkan keahlian dan tools yang Anda kuasai
              </p>

              <div className="mb-6">
                <p className="text-sm font-medium mb-3">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {SKILLS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSkill(s)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${skills.includes(s) ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-primary border border-border"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={customSkill}
                    onChange={(e) =>
                      setCustomSkill(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        customSkill.trim()
                      ) {
                        setSkills([
                          ...skills,
                          customSkill.trim(),
                        ]);
                        setCustomSkill("");
                      }
                    }}
                    placeholder="Tambah skill lain (Enter)"
                    className="flex-1 px-3 py-2 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {s}
                        <button onClick={() => toggleSkill(s)}>
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium mb-3">
                  Tools / Software
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {TOOLS_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTool(t)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${tools.includes(t) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-secondary border border-border"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={customTool}
                    onChange={(e) =>
                      setCustomTool(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        customTool.trim()
                      ) {
                        setTools([...tools, customTool.trim()]);
                        setCustomTool("");
                      }
                    }}
                    placeholder="Tambah tools lain (Enter)"
                    className="flex-1 px-3 py-2 bg-input-background border border-border rounded-xl text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                {tools.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tools.map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent-foreground rounded-full text-xs"
                      >
                        {t}
                        <button onClick={() => toggleTool(t)}>
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  Step 4 of 4
                </p>
              </div>
              <h2 className="text-foreground font-bold mb-1">
                Upload Dokumen
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Upload semua dokumen yang diperlukan (PDF/DOC,
                maks 5MB per file)
              </p>

              <div className="space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Dokumen Wajib
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <FileDropzone
                    label="Curriculum Vitae (CV)"
                    required
                    fileKey="cv"
                    uploaded={files.cv}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                  <FileDropzone
                    label="Transkrip Nilai"
                    required
                    fileKey="transcript"
                    uploaded={files.transcript}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                  <FileDropzone
                    label="Surat Rekomendasi"
                    required
                    fileKey="recommendation"
                    uploaded={files.recommendation}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                  <FileDropzone
                    label="Proposal Magang"
                    required
                    fileKey="proposal"
                    uploaded={files.proposal}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                  <FileDropzone
                    label="Kartu Tanda Penduduk (KTP)"
                    required
                    fileKey="ktp"
                    uploaded={files.ktp}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide pt-2">
                  Dokumen Opsional
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <FileDropzone
                    label="Portfolio"
                    fileKey="portfolio"
                    uploaded={files.portfolio}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                  <FileDropzone
                    label="NPWP"
                    fileKey="npwp"
                    uploaded={files.npwp}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                </div>
              </div>

              {!canProceedStep4 && (
                <div className="mt-4 flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 rounded-xl text-sm text-amber-700">
                  <AlertCircle size={15} />
                  Lengkapi semua dokumen wajib sebelum submit.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() =>
              step > 1 ? setStep(step - 1) : onClose()
            }
            className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-all"
          >
            <ChevronLeft size={16} />
            {step === 1 ? "Cancel" : "Previous"}
          </button>
          <span className="text-sm text-muted-foreground">
            {step} / {totalSteps}
          </span>
          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() =>
                canProceedStep4 && setSubmitted(true)
              }
              disabled={!canProceedStep4}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={16} /> Submit Lamaran
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
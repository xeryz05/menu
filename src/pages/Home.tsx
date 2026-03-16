/*
HOME PAGE — Hand-drawn Zine Menu (Brand pick + Focus-on-select)
Design intent:
- First screen: choose 1 of 2 brands (Prasetia Dwidharma / Verdanco).
- After choosing: menus are identical, only background mood changes per brand.
- Menu interaction: 4 main menu cards → pick 1 → focus view shows submenu/actions.
- Submenu items can redirect to external links via `href`.
*/

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import paperBg from "@/assets/paper-bg.jpeg";
import doodleSheet from "@/assets/doodle-sheet.jpeg";
import bgPrasetia from "@/assets/bg-prasetia.jpeg";
import bgVerdanco from "@/assets/bg-verdanco.jpeg";

interface HomeProps {
  targetSection?: string;
}

type Brand = "prasetia" | "verdanco";

type SubItem = { key: string; label: string; href?: string };

type MenuItem = {
  key: string;
  title: string;
  subtitle?: string;
  href?: string;
  items?: SubItem[];
};

const BRAND_STORAGE_KEY = "hand_drawn_brand";

export default function Home({ targetSection }: HomeProps) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const MENU: MenuItem[] = useMemo(
    () => [
      {
        key: "kpi-dept",
        title: "KPI Departement",
        subtitle: "Mengisi dan cek nilai KPI level departemen",
        items: [
          {
            key: "kpi-dept-input",
            label: "Mengisi KPI Departement",
            href: "https://applink.larksuite.com/T94J7nufylpp",
          },
          {
            key: "kpi-dept-check",
            label: "Cek Nilai KPI Departement",
            href: "https://applink.larksuite.com/T94J7qvfDuLJ",
          },
        ],
      },
      {
        key: "kpi-individu",
        title: "KPI Individu",
        subtitle: "Mengisi dan cek nilai KPI level individu",
        items: [
          { key: "kpi-individu-input", label: "Mengisi KPI Individu" },
          { key: "kpi-individu-check", label: "Cek Nilai KPI Individu" },
        ],
      },
      {
        key: "base-app",
        title: "Base App Corporate Plan & Performance",
        subtitle: "Akses aplikasi dasar corporate plan",
        href: "https://verdanco.sg.larksuite.com/app/PYxrbJuXxa2M1FsyEVIljbfOgsg?pageId=pgeO0gkKljgG6iDG"
      },
      {
        key: "bantuan",
        title: "Bantuan",
        subtitle: "Panduan penggunaan & FAQ",
      },
    ],
    []
  );

  const selected = useMemo(
    () => (selectedKey ? MENU.find((m) => m.key === selectedKey) ?? null : null),
    [MENU, selectedKey]
  );

  // Load brand preference once
  useEffect(() => {
    const saved = localStorage.getItem(BRAND_STORAGE_KEY);
    if (saved === "prasetia" || saved === "verdanco") setBrand(saved);
  }, []);

  // Scroll to target section when URL changes (kept from template)
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  const backgroundImage = useMemo(() => {
    if (brand === "prasetia") return bgPrasetia;
    if (brand === "verdanco") return bgVerdanco;
    return paperBg;
  }, [brand]);

  const brandLabel = useMemo(() => {
    if (brand === "prasetia") return "Prasetia Dwidharma";
    if (brand === "verdanco") return "Verdanco";
    return "";
  }, [brand]);

  const applyBrand = (b: Brand) => {
    setBrand(b);
    setSelectedKey(null);
    localStorage.setItem(BRAND_STORAGE_KEY, b);
  };

  const resetBrand = () => {
    setBrand(null);
    setSelectedKey(null);
    localStorage.removeItem(BRAND_STORAGE_KEY);
  };

  const onPick = (label: string, href?: string) => {
    if (href) {
      // Full redirect to target URL (no menu shown after click)
      window.location.href = href;
      return;
    }

    toast.message(`"${label}" belum dihubungkan`, {
      description: "Isi 'href' pada item menu untuk redirect ke URL yang diinginkan.",
    });
  };

  const onSelectMenu = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="noise-overlay" />

      {/* Decorative doodle sheets */}
      <img
        src={doodleSheet}
        alt="Doodle dekoratif"
        className="pointer-events-none select-none absolute -right-20 -top-24 w-[320px] opacity-25 rotate-[8deg] blur-[0.2px]"
      />
      <img
        src={doodleSheet}
        alt="Doodle dekoratif"
        className="pointer-events-none select-none absolute -left-24 -bottom-28 w-[360px] opacity-18 -rotate-[10deg] blur-[0.2px]"
      />

      <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="relative w-full max-w-[980px]">
          <AnimatePresence mode="wait">
            {/* BRAND PICK */}
            {!brand && (
              <motion.section
                key="brand-pick"
                initial={{ opacity: 0, y: 18, rotate: -0.3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
                className="relative"
              >
                <div className="relative sketch-card p-6 sm:p-8 md:p-10">
                  <header className="flex flex-col gap-2">
                    <p className="text-sm sm:text-base text-muted-foreground">Pilih perusahaan</p>
                    <h1 className="hand-drawn-title text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
                      <span className="ink-underline">Pilih Brand</span>
                    </h1>
                    <p className="text-base sm:text-lg text-foreground/80 max-w-[60ch]">
                      Menu-nya sama. Yang beda cuma background suasana.
                    </p>
                  </header>

                  <div className="mt-7 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 10, rotate: -0.8 }}
                      animate={{ opacity: 1, y: 0, rotate: -0.3 }}
                      transition={{ delay: 0.08, duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                      onClick={() => applyBrand("prasetia")}
                      className={
                        "group relative text-left p-5 sm:p-6 " +
                        "bg-card/80 text-card-foreground " +
                        "border-2 border-foreground/80 " +
                        "rounded-[22px] " +
                        "shadow-[3px_3px_0_rgba(20,20,20,0.16),10px_12px_0_rgba(20,20,20,0.06)] " +
                        "transition-transform duration-200 wobble-hover hover:-translate-y-[2px] " +
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      }
                    >
                      <div className="absolute inset-0 rounded-[22px] pointer-events-none">
                        <div className="absolute -top-3 left-5 h-3 w-32 rounded-full bg-accent opacity-70 rotate-[-3deg]" />
                        <div className="absolute -bottom-3 right-6 h-2.5 w-20 rounded-full bg-accent opacity-55 rotate-[2deg]" />
                      </div>

                      <div className="relative">
                        <h2 className="hand-drawn-title text-2xl sm:text-3xl leading-none">
                          Prasetia Dwidharma
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-foreground/75 max-w-[44ch]">
                          Nuansa merah–hitam–putih, jaringan & tower.
                        </p>
                        <div className="mt-4 text-xs sm:text-sm text-muted-foreground">pilih</div>
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 10, rotate: 0.9 }}
                      animate={{ opacity: 1, y: 0, rotate: 0.4 }}
                      transition={{ delay: 0.14, duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                      onClick={() => applyBrand("verdanco")}
                      className={
                        "group relative text-left p-5 sm:p-6 " +
                        "bg-card/80 text-card-foreground " +
                        "border-2 border-foreground/80 " +
                        "rounded-[22px] " +
                        "shadow-[3px_3px_0_rgba(20,20,20,0.16),10px_12px_0_rgba(20,20,20,0.06)] " +
                        "transition-transform duration-200 wobble-hover hover:-translate-y-[2px] " +
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      }
                    >
                      <div className="absolute inset-0 rounded-[22px] pointer-events-none">
                        <div className="absolute -top-3 left-5 h-3 w-28 rounded-full bg-accent opacity-70 rotate-[-2deg]" />
                        <div className="absolute -bottom-3 right-6 h-2.5 w-24 rounded-full bg-accent opacity-55 rotate-[2deg]" />
                      </div>

                      <div className="relative">
                        <h2 className="hand-drawn-title text-2xl sm:text-3xl leading-none">Verdanco</h2>
                        <p className="mt-2 text-sm sm:text-base text-foreground/75 max-w-[44ch]">
                          Nuansa kuning–hitam, pertambangan.
                        </p>
                        <div className="mt-4 text-xs sm:text-sm text-muted-foreground">pilih</div>
                      </div>
                    </motion.button>
                  </div>

                  <footer className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm text-muted-foreground">Pilihan brand disimpan otomatis.</p>
                    <button
                      type="button"
                      onClick={() => toast.success("Siap!", { description: "Tema hand-drawn sudah aktif." })}
                      className="text-sm underline underline-offset-4 decoration-accent hover:decoration-primary w-fit"
                    >
                      Cek tema
                    </button>
                  </footer>
                </div>

                <div className="pointer-events-none absolute -left-6 -top-6 w-28 h-28 border-2 border-foreground/40 rounded-[30px] rotate-[-12deg]" />
                <div className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-24 border-2 border-foreground/35 rounded-[26px] rotate-[9deg]" />
              </motion.section>
            )}

            {/* MENU FLOW (only after brand chosen) */}
            {brand && (
              <motion.section
                key={`menu-flow-${brand}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
                className="relative"
              >
                <div className="relative">
                  <div className="absolute -top-10 left-0 right-0 flex items-center justify-between gap-3 px-2">
                    <div className="text-sm text-foreground/75">
                      Brand: <span className="font-semibold">{brandLabel}</span>
                    </div>
                    <button
                      type="button"
                      onClick={resetBrand}
                      className="text-sm underline underline-offset-4 decoration-accent hover:decoration-primary"
                    >
                      Ganti brand
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* OVERVIEW: 4 main menus */}
                    {!selected && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 18, rotate: -0.3 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
                        className="relative"
                      >
                        <div className="relative sketch-card p-6 sm:p-8 md:p-10">
                          <header className="flex flex-col gap-2">
                            <p className="text-sm sm:text-base text-muted-foreground">Pilih menu utama</p>
                            <h1 className="hand-drawn-title text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
                              <span className="ink-underline">Halaman Utama</span>
                            </h1>
                            <p className="text-base sm:text-lg text-foreground/80 max-w-[60ch]">
                              Klik salah satu menu untuk fokus dan melihat sub-menu.
                            </p>
                          </header>

                          <div className="mt-7 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            {MENU.map((m, idx) => (
                              <motion.button
                                key={m.key}
                                type="button"
                                initial={{ opacity: 0, y: 10, rotate: idx % 2 === 0 ? -1 : 1 }}
                                animate={{ opacity: 1, y: 0, rotate: idx % 2 === 0 ? -0.6 : 0.7 }}
                                transition={{ delay: 0.1 + idx * 0.07, duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                                onClick={() => onSelectMenu(m.key)}
                                className={
                                  "group relative text-left p-5 sm:p-6 " +
                                  "bg-card/80 text-card-foreground " +
                                  "border-2 border-foreground/80 " +
                                  "rounded-[22px] " +
                                  "shadow-[3px_3px_0_rgba(20,20,20,0.16),10px_12px_0_rgba(20,20,20,0.06)] " +
                                  "transition-transform duration-200 wobble-hover hover:-translate-y-[2px] " +
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                }
                              >
                                <div className="absolute inset-0 rounded-[22px] pointer-events-none">
                                  <div className="absolute -top-3 left-5 h-3 w-28 rounded-full bg-accent opacity-70 rotate-[-3deg]" />
                                  <div className="absolute -bottom-3 right-6 h-2.5 w-20 rounded-full bg-accent opacity-55 rotate-[2deg]" />
                                </div>

                                <div className="relative">
                                  <div className="flex items-baseline justify-between gap-3">
                                    <h2 className="hand-drawn-title text-2xl sm:text-3xl leading-none">{m.title}</h2>
                                    <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                      pilih
                                    </span>
                                  </div>
                                  {m.subtitle && (
                                    <p className="mt-2 text-sm sm:text-base text-foreground/75 max-w-[44ch]">{m.subtitle}</p>
                                  )}

                                  <div className="mt-4 flex items-center gap-2">
                                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                                    <span className="text-xs sm:text-sm text-muted-foreground">
                                      {Array.isArray(m.items) ? `${m.items.length} opsi` : "Menu"}
                                    </span>
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </div>

                          <footer className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <p className="text-sm text-muted-foreground">Tip: nanti sub-menu bisa diarahkan ke halaman lain.</p>
                            <button
                              type="button"
                              onClick={() => toast.success("Siap!", { description: "Tema hand-drawn sudah aktif." })}
                              className="text-sm underline underline-offset-4 decoration-accent hover:decoration-primary w-fit"
                            >
                              Cek tema
                            </button>
                          </footer>
                        </div>

                        <div className="pointer-events-none absolute -left-6 -top-6 w-28 h-28 border-2 border-foreground/40 rounded-[30px] rotate-[-12deg]" />
                        <div className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-24 border-2 border-foreground/35 rounded-[26px] rotate-[9deg]" />
                      </motion.div>
                    )}

                    {/* FOCUSED: 1 menu + its submenus/actions */}
                    {!!selected && (
                      <motion.div
                        key={`focus-${selected.key}`}
                        initial={{ opacity: 0, y: 18, rotate: 0.2 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
                        className="relative"
                      >
                        <div className="relative sketch-card p-6 sm:p-8 md:p-10">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                              <p className="text-sm sm:text-base text-muted-foreground">Menu terpilih</p>
                              <h1 className="mt-2 hand-drawn-title text-4xl sm:text-5xl leading-[0.98]">
                                <span className="ink-underline">{selected.title}</span>
                              </h1>
                              {selected.subtitle && (
                                <p className="mt-3 text-base sm:text-lg text-foreground/80 max-w-[62ch]">{selected.subtitle}</p>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => setSelectedKey(null)}
                              className="w-fit wobble-hover rounded-[999px] border-2 border-foreground/80 bg-card/80 px-5 py-2.5 text-base shadow-[3px_3px_0_rgba(20,20,20,0.14)] hover:-translate-y-[1px] transition-transform"
                            >
                              Kembali
                            </button>
                          </div>

                          <div className="mt-7 grid grid-cols-1 gap-3">
                            {Array.isArray(selected.items) && selected.items.length > 0 ? (
                              selected.items.map((it, idx) => (
                                <motion.button
                                  key={it.key}
                                  type="button"
                                  initial={{ opacity: 0, y: 8, rotate: idx % 2 === 0 ? -0.4 : 0.5 }}
                                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                                  transition={{ delay: 0.08 + idx * 0.06, duration: 0.4, ease: [0.2, 0.9, 0.2, 1] }}
                                  onClick={() => onPick(it.label, it.href)}
                                  className={
                                    "relative text-left p-5 sm:p-6 " +
                                    "bg-card/80 text-card-foreground " +
                                    "border-2 border-foreground/80 " +
                                    "rounded-[22px] " +
                                    "shadow-[3px_3px_0_rgba(20,20,20,0.14),10px_12px_0_rgba(20,20,20,0.05)] " +
                                    "transition-transform duration-200 wobble-hover hover:-translate-y-[2px] " +
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                  }
                                >
                                  <div className="absolute inset-0 rounded-[22px] pointer-events-none">
                                    <div className="absolute -top-3 left-5 h-3 w-24 rounded-full bg-accent opacity-65 rotate-[-2deg]" />
                                  </div>
                                  <div className="hand-drawn-title text-2xl sm:text-3xl leading-none">{it.label}</div>
                                  <div className="mt-2 text-sm text-muted-foreground">klik untuk lanjut</div>
                                </motion.button>
                              ))
                            ) : (
                              <motion.button
                                type="button"
                                onClick={() => onPick(selected.title, selected.href)}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                                className={
                                  "relative text-left p-5 sm:p-6 " +
                                  "bg-card/80 text-card-foreground " +
                                  "border-2 border-foreground/80 " +
                                  "rounded-[22px] " +
                                  "shadow-[3px_3px_0_rgba(20,20,20,0.14),10px_12px_0_rgba(20,20,20,0.05)] " +
                                  "transition-transform duration-200 wobble-hover hover:-translate-y-[2px] " +
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                }
                              >
                                <div className="hand-drawn-title text-2xl sm:text-3xl leading-none">Buka {selected.title}</div>
                                <div className="mt-2 text-sm text-muted-foreground">klik untuk lanjut</div>
                              </motion.button>
                            )}
                          </div>
                        </div>

                        <div className="pointer-events-none absolute -left-6 -top-6 w-28 h-28 border-2 border-foreground/40 rounded-[30px] rotate-[-12deg]" />
                        <div className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-24 border-2 border-foreground/35 rounded-[26px] rotate-[9deg]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/*
PAGE — Mengisi KPI Departement
Design intent:
- Keep the same hand-drawn card feel.
- Placeholder content for now.
*/

import { Link } from "wouter";
import { toast } from "sonner";

export default function KpiDeptMengisi() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="relative sketch-card p-8 sm:p-10 w-full max-w-[860px]">
        <p className="text-sm sm:text-base text-muted-foreground">KPI Departement</p>
        <h1 className="mt-2 hand-drawn-title text-4xl sm:text-5xl leading-[0.98]">
          <span className="ink-underline">Mengisi KPI</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-foreground/80 max-w-[62ch]">
          Ini halaman placeholder. Nanti di sini bisa ditaruh form input KPI departemen.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => toast.message("Submit belum dibuat", { description: "Nanti bisa disambungkan ke API." })}
            className="w-fit wobble-hover rounded-[999px] border-2 border-foreground/80 bg-card/80 px-5 py-2.5 text-base shadow-[3px_3px_0_rgba(20,20,20,0.14)] hover:-translate-y-[1px] transition-transform"
          >
            Simpan (placeholder)
          </button>

          <Link href="/">
            <a className="w-fit underline underline-offset-4 decoration-accent hover:decoration-primary text-base">
              Kembali ke Menu
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

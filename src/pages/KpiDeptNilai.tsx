/*
PAGE — Cek Nilai KPI Departement
Design intent:
- Keep the same hand-drawn card feel.
- Placeholder table/summary area.
*/

import { Link } from "wouter";

export default function KpiDeptNilai() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="relative sketch-card p-8 sm:p-10 w-full max-w-[860px]">
        <p className="text-sm sm:text-base text-muted-foreground">KPI Departement</p>
        <h1 className="mt-2 hand-drawn-title text-4xl sm:text-5xl leading-[0.98]">
          <span className="ink-underline">Cek Nilai KPI</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-foreground/80 max-w-[62ch]">
          Ini halaman placeholder untuk menampilkan nilai KPI departemen.
        </p>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative sketch-card p-5">
            <div className="hand-drawn-title text-2xl leading-none">Skor Total</div>
            <div className="mt-3 text-3xl font-semibold">—</div>
            <div className="mt-1 text-sm text-muted-foreground">Belum ada data</div>
          </div>
          <div className="relative sketch-card p-5">
            <div className="hand-drawn-title text-2xl leading-none">Periode</div>
            <div className="mt-3 text-3xl font-semibold">—</div>
            <div className="mt-1 text-sm text-muted-foreground">Belum dipilih</div>
          </div>
        </div>

        <div className="mt-7">
          <Link href="/">
            <a className="underline underline-offset-4 decoration-accent hover:decoration-primary text-base">
              Kembali ke Menu
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

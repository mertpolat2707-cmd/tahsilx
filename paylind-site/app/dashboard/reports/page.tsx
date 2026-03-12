import { MerchantShell } from "@/components/shells";
import { reports } from "@/lib/data";

export default function MerchantReportsPage() {
  return (
    <MerchantShell title="Raporlar" description="İşlem ve tahsilat özetlerini dışa aktar.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <div key={report.title} className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
            <div className="mb-4 h-12 w-12 rounded-2xl bg-slate-100" />
            <h2 className="text-xl font-black">{report.title}</h2>
            <p className="mt-3 text-slate-600">{report.description}</p>
            <button className="mt-6 rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white">Rapor Al</button>
          </div>
        ))}
      </div>
    </MerchantShell>
  );
}

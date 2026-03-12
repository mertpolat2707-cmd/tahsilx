import { AdminShell } from "@/components/shells";
import { risks } from "@/lib/data";
import { SectionHeader, StatusPill } from "@/components/ui";

export default function AdminRiskPage() {
  return (
    <AdminShell title="Risk / İnceleme" description="Şüpheli işlemler ve merchant kontrollerini yönet.">
      <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
        <SectionHeader title="Risk Listesi" description="Öncelikli inceleme gerektiren alanlar" />
        <div className="space-y-4">
          {risks.map((risk) => (
            <div key={risk.merchant + risk.reason} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="font-bold">{risk.merchant}</div>
                  <div className="mt-1 text-sm text-slate-500">{risk.reason}</div>
                </div>
                <StatusPill tone={risk.severity === 'Yüksek' ? 'danger' : risk.severity === 'Orta' ? 'warning' : 'info'}>{risk.severity}</StatusPill>
                <StatusPill tone={risk.action === 'Temiz' ? 'success' : risk.action === 'İncelemede' ? 'warning' : 'danger'}>{risk.action}</StatusPill>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

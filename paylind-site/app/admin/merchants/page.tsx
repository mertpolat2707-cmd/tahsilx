import { AdminShell } from "@/components/shells";
import { merchants } from "@/lib/data";
import { SectionHeader, StatusPill } from "@/components/ui";

export default function AdminMerchantsPage() {
  return (
    <AdminShell title="Merchantlar" description="Sistemde kayıtlı işletmeleri buradan görüntüleyip yönetebilirsin.">
      <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
        <SectionHeader title="Merchant Listesi" action={<button className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white">Yeni Merchant Ekle</button>} />
        <div className="mb-5 grid gap-4 md:grid-cols-3">
          <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Merchant ara" />
          <select className="rounded-2xl border border-slate-300 px-4 py-3"><option>Tüm Durumlar</option></select>
          <button className="rounded-2xl border border-slate-300 px-4 py-3 font-medium text-slate-700">Filtrele</button>
        </div>
        <div className="space-y-4">
          {merchants.map((merchant) => (
            <div key={merchant.email} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-lg font-bold">{merchant.name}</div>
                  <div className="mt-1 text-sm text-slate-500">Yetkili: {merchant.owner}</div>
                  <div className="mt-1 text-sm text-slate-500">{merchant.email}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Aylık Hacim</div>
                  <div className="text-lg font-bold">{merchant.volume}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Risk</div>
                  <div className="font-semibold">{merchant.risk}</div>
                </div>
                <StatusPill tone={merchant.status === 'Aktif' ? 'success' : merchant.status === 'İncelemede' ? 'warning' : 'neutral'}>{merchant.status}</StatusPill>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

import Link from "next/link";
import { AdminShell } from "@/components/shells";
import { SectionHeader, StatCard, StatusPill } from "@/components/ui";
import { adminStats, merchants, transactions } from "@/lib/data";

export default function AdminPage() {
  return (
    <AdminShell title="Admin Dashboard" description="Platformu, merchantları ve sistem hareketlerini buradan yönetebilirsin.">
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {adminStats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 2xl:grid-cols-3">
        <div className="space-y-6 2xl:col-span-2">
          <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
            <SectionHeader title="Merchantlar" description="Son aktif işletmeler ve hacimleri" action={<Link href="/admin/merchants" className="text-sm font-semibold text-emerald-600">Tümünü Gör</Link>} />
            <div className="space-y-4">
              {merchants.slice(0, 3).map((merchant) => (
                <div key={merchant.email} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="font-bold">{merchant.name}</div>
                    <div className="mt-1 text-sm text-slate-500">Yetkili: {merchant.owner}</div>
                  </div>
                  <div className="text-left lg:text-right">
                    <div className="font-bold">{merchant.volume}</div>
                    <div className="mt-1 text-sm text-slate-500">Aylık hacim</div>
                  </div>
                  <StatusPill tone={merchant.status === 'Aktif' ? 'success' : merchant.status === 'İncelemede' ? 'warning' : 'neutral'}>{merchant.status}</StatusPill>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
            <SectionHeader title="Son İşlemler" description="Sistem genelindeki en son hareketler" action={<Link href="/admin/transactions" className="text-sm font-semibold text-emerald-600">İşlem Listesi</Link>} />
            <div className="space-y-4">
              {transactions.slice(0, 3).map((tx) => (
                <div key={`${tx.merchant}-${tx.amount}`} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-bold">{tx.merchant}</div>
                    <div className="mt-1 text-sm text-slate-500">{tx.date}</div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="font-bold">{tx.amount}</div>
                    <div className="mt-1 text-sm text-slate-500">{tx.method}</div>
                  </div>
                  <StatusPill tone={tx.status === 'Başarılı' ? 'success' : tx.status === 'Bekliyor' ? 'warning' : 'danger'}>{tx.status}</StatusPill>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] bg-gradient-to-br from-sky-500 to-blue-600 p-6 text-white shadow-xl shadow-sky-100">
            <div className="text-sm text-sky-100">Komisyon Özeti</div>
            <div className="mt-2 text-4xl font-black">₺94.250</div>
            <p className="mt-3 leading-7 text-sky-50">Güncel tahakkuk eden toplam platform komisyonu.</p>
          </div>
          <div className="rounded-[28px] bg-gradient-to-br from-violet-500 to-fuchsia-500 p-6 text-white shadow-xl shadow-violet-100">
            <div className="text-sm text-violet-100">Risk Durumu</div>
            <div className="mt-2 text-4xl font-black">Düşük</div>
            <p className="mt-3 leading-7 text-violet-50">Şüpheli işlem oranı düşük seviyede, sistem stabil görünüyor.</p>
          </div>
          <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
            <div className="mb-4 text-sm text-slate-500">Hızlı Aksiyonlar</div>
            <div className="space-y-3">
              <Link href="/admin/merchants" className="block rounded-2xl border border-slate-300 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50">Yeni merchant oluştur</Link>
              <Link href="/admin/risk" className="block rounded-2xl border border-slate-300 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50">Riskli işlemleri incele</Link>
              <Link href="/admin/reports" className="block rounded-2xl border border-slate-300 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50">Komisyon raporu al</Link>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

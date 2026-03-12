import { AdminShell } from "@/components/shells";
import { commissions } from "@/lib/data";
import { SectionHeader, StatusPill } from "@/components/ui";

export default function AdminCommissionsPage() {
  return (
    <AdminShell title="Komisyonlar" description="Platform komisyon gelirlerini ve tahakkuk durumlarını buradan takip edebilirsin.">
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-[28px] bg-gradient-to-br from-sky-500 to-blue-600 p-6 text-white shadow-xl shadow-sky-100"><div className="text-sm text-sky-100">Toplam Komisyon</div><div className="mt-2 text-4xl font-black">₺94.250</div></div>
        <div className="rounded-[28px] bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-xl shadow-emerald-100"><div className="text-sm text-emerald-100">Bu Ay</div><div className="mt-2 text-4xl font-black">₺18.430</div></div>
        <div className="rounded-[28px] bg-gradient-to-br from-violet-500 to-fuchsia-500 p-6 text-white shadow-xl shadow-violet-100"><div className="text-sm text-violet-100">Bekleyen Tahakkuk</div><div className="mt-2 text-4xl font-black">₺6.120</div></div>
      </div>
      <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
        <SectionHeader title="Komisyon Hareketleri" action={<button className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white">Dışa Aktar</button>} />
        <div className="space-y-4">
          {commissions.map((item, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-lg font-bold">{item.merchant}</div>
                  <div className="mt-1 text-sm text-slate-500">Tarih: {item.date}</div>
                </div>
                <div><div className="text-sm text-slate-500">İşlem Tutarı</div><div className="text-lg font-bold">{item.transactionAmount}</div></div>
                <div><div className="text-sm text-slate-500">Komisyon</div><div className="text-lg font-bold">{item.commission}</div></div>
                <StatusPill tone={item.status === 'Tahakkuk Etti' ? 'success' : 'warning'}>{item.status}</StatusPill>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

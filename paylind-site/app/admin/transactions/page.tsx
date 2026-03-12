import { AdminShell } from "@/components/shells";
import { transactions } from "@/lib/data";
import { SectionHeader, StatusPill } from "@/components/ui";

export default function AdminTransactionsPage() {
  return (
    <AdminShell title="İşlemler" description="Sistem genelindeki tüm ödeme hareketlerini buradan izleyebilirsin.">
      <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
        <SectionHeader title="İşlem Listesi" action={<button className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white">Rapor Al</button>} />
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-lg font-bold">{tx.merchant}</div>
                  <div className="mt-1 text-sm text-slate-500">Müşteri: {tx.customer}</div>
                  <div className="mt-1 text-sm text-slate-500">Tarih: {tx.date}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Tutar</div>
                  <div className="text-lg font-bold">{tx.amount}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Yöntem</div>
                  <div className="text-lg font-bold">{tx.method}</div>
                </div>
                <StatusPill tone={tx.status === 'Başarılı' ? 'success' : tx.status === 'Bekliyor' ? 'warning' : 'danger'}>{tx.status}</StatusPill>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

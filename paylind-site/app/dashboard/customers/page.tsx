import { MerchantShell } from "@/components/shells";
import { customers } from "@/lib/data";

export default function CustomersPage() {
  return (
    <MerchantShell title="Müşteriler" description="Sık ödeme yapan müşterilerini ve geçmişlerini görüntüle.">
      <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black">Müşteri Listesi</h2>
          <button className="rounded-2xl border border-slate-300 px-4 py-2 font-medium text-slate-700">CSV Aktar</button>
        </div>
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.email} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold">{customer.name}</div>
                <div className="mt-1 text-sm text-slate-500">{customer.email}</div>
              </div>
              <div className="text-left md:text-right">
                <div className="font-bold">{customer.total}</div>
                <div className="mt-1 text-sm text-slate-500">Toplam tahsilat</div>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{customer.count} işlem</div>
            </div>
          ))}
        </div>
      </div>
    </MerchantShell>
  );
}

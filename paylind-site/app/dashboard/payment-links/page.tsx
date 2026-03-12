import { MerchantShell } from "@/components/shells";
import { EmptyState, SectionHeader, StatusPill } from "@/components/ui";
import { recentLinks } from "@/lib/data";
import Link from "next/link";

export default function PaymentLinksPage() {
  return (
    <MerchantShell title="Ödeme Linkleri" description="Tüm linklerini listele, durumlarını kontrol et ve paylaş.">
      <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
        <SectionHeader title="Link Listesi" description="Aktif, bekleyen ve tahsil edilen linkler" action={<Link href="/dashboard/new-link" className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Yeni Link</Link>} />
        <div className="mb-5 grid gap-4 md:grid-cols-3">
          <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Link adı ara" />
          <select className="rounded-2xl border border-slate-300 px-4 py-3"><option>Tüm Durumlar</option></select>
          <button className="rounded-2xl border border-slate-300 px-4 py-3 font-medium text-slate-700">Filtreyi Uygula</button>
        </div>
        <div className="space-y-4">
          {recentLinks.map((link) => (
            <div key={link.title} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-lg font-bold">{link.title}</div>
                  <div className="mt-1 text-sm text-slate-500">Oluşturulma: {link.date}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Tutar</div>
                  <div className="font-bold">{link.amount}</div>
                </div>
                <StatusPill tone={link.status === 'Aktif' ? 'success' : link.status === 'Bekliyor' ? 'warning' : 'info'}>{link.status}</StatusPill>
                <div className="flex gap-2">
                  <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium">Kopyala</button>
                  <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium">Görüntüle</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6"><EmptyState title="Henüz otomatik segment yok" text="Backend bağlandığında linkleri etiket, müşteri ve kampanya bazında gruplayabileceksin." /></div>
    </MerchantShell>
  );
}

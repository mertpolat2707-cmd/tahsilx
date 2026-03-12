import { MerchantShell } from "@/components/shells";
import { PlaceholderChart, SectionHeader, StatCard } from "@/components/ui";
import { dashboardStats } from "@/lib/data";

export default function AnalyticsPage() {
  return (
    <MerchantShell title="Analitik" description="Performans, dönüşüm ve tahsilat metriklerini incele.">
      <div className="grid gap-5 md:grid-cols-3">
        {dashboardStats.map((item) => <StatCard key={item.title} {...item} />)}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PlaceholderChart />
        <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
          <SectionHeader title="Dönüşüm Özeti" description="Linkten ödemeye giden temel metrikler" />
          <div className="space-y-4">
            {[
              ['Toplam Ziyaret', '4.820'],
              ['Ödeme Sayfası Açılışı', '1.392'],
              ['Başarılı Ödeme', '318'],
              ['Dönüşüm Oranı', '%22.8'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                <span className="text-slate-500">{label}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MerchantShell>
  );
}

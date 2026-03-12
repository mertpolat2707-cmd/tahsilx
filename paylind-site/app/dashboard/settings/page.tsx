import { MerchantShell } from "@/components/shells";

export default function MerchantSettingsPage() {
  return (
    <MerchantShell title="Hesap Ayarları" description="Şirket bilgilerini, bildirimleri ve güvenlik tercihlerini düzenle.">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
          <h2 className="text-xl font-black">Şirket Bilgileri</h2>
          <div className="mt-6 grid gap-4">
            <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Şirket Adı" />
            <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="E-posta" />
            <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Telefon" />
            <textarea className="h-28 rounded-2xl border border-slate-300 px-4 py-3" placeholder="Adres" />
            <button className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white">Kaydet</button>
          </div>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
          <h2 className="text-xl font-black">Bildirim ve Güvenlik</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-700">
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"><span>E-posta bildirimi</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"><span>Başarısız işlem bildirimi</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"><span>İki adımlı doğrulama</span><input type="checkbox" /></label>
          </div>
        </div>
      </div>
    </MerchantShell>
  );
}

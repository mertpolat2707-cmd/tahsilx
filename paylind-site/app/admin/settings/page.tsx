import { AdminShell } from "@/components/shells";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Ayarlar" description="Platform genel ayarlarını ve operasyon tercihlerini yönet.">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
          <h2 className="text-xl font-black">Genel Ayarlar</h2>
          <div className="mt-6 grid gap-4">
            <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Platform Adı" />
            <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Destek E-postası" />
            <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Webhook URL" />
            <button className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white">Kaydet</button>
          </div>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
          <h2 className="text-xl font-black">Sistem Tercihleri</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-700">
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"><span>E-posta bildirimleri</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"><span>Risk uyarıları</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"><span>Günlük özet raporu</span><input type="checkbox" /></label>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

import Link from 'next/link';
import { ReactNode } from 'react';
import { ActionLink, SimpleToastDemo } from './ui';

export function AdminShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-80 flex-col border-r border-slate-200 bg-white p-6 xl:flex">
          <div>
            <Link href="/" className="text-2xl font-black tracking-tight">Paylind</Link>
            <div className="mt-1 text-sm text-slate-500">Admin Panel</div>
          </div>
          <nav className="mt-10 space-y-2">
            <ActionLink href="/admin">Genel Dashboard</ActionLink>
            <ActionLink href="/admin/merchants">Merchantlar</ActionLink>
            <ActionLink href="/admin/transactions">İşlemler</ActionLink>
            <ActionLink href="/admin/commissions">Komisyonlar</ActionLink>
            <ActionLink href="/admin/risk">Risk / İnceleme</ActionLink>
            <ActionLink href="/admin/reports">Raporlar</ActionLink>
            <ActionLink href="/admin/settings">Ayarlar</ActionLink>
          </nav>
          <div className="mt-6 space-y-2">
            <ActionLink href="/dashboard">Merchant Paneline Git</ActionLink>
            <ActionLink href="/login">Çıkış Yap</ActionLink>
          </div>
          <div className="mt-auto rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white">
            <div className="text-sm text-slate-300">Sistem Özeti</div>
            <div className="mt-2 text-3xl font-black">184 Aktif Merchant</div>
            <div className="mt-2 text-sm text-slate-300">Platform stabil çalışıyor, risk seviyesi düşük.</div>
          </div>
        </aside>
        <section className="flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight">{title}</h1>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700">Rapor Al</button>
                <button className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white">Hızlı Aksiyon</button>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </section>
      </div>
      <SimpleToastDemo />
    </main>
  );
}

export function MerchantShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
          <div>
            <Link href="/" className="text-2xl font-black tracking-tight">Paylind</Link>
            <div className="mt-1 text-sm text-slate-500">Merchant Panel</div>
          </div>
          <nav className="mt-10 space-y-2">
            <ActionLink href="/dashboard">Dashboard</ActionLink>
            <ActionLink href="/dashboard/payment-links">Ödeme Linkleri</ActionLink>
            <ActionLink href="/dashboard/new-link">Yeni Link Oluştur</ActionLink>
            <ActionLink href="/dashboard/analytics">Analitik</ActionLink>
            <ActionLink href="/dashboard/reports">Raporlar</ActionLink>
            <ActionLink href="/dashboard/customers">Müşteriler</ActionLink>
            <ActionLink href="/dashboard/settings">Hesap Ayarları</ActionLink>
          </nav>
          <div className="mt-6 space-y-2">
            <ActionLink href="/admin">Admin Paneline Git</ActionLink>
            <ActionLink href="/login">Çıkış Yap</ActionLink>
          </div>
          <div className="mt-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-5 text-white">
            <div className="text-sm opacity-90">Bu ayki tahsilat</div>
            <div className="mt-2 text-3xl font-black">₺128.450</div>
            <div className="mt-2 text-sm text-emerald-50">İşler yolunda görünüyor.</div>
          </div>
        </aside>
        <section className="flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight">{title}</h1>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700">Dışa Aktar</button>
                <Link href="/dashboard/new-link" className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white">Yeni Link</Link>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </section>
      </div>
      <SimpleToastDemo />
    </main>
  );
}

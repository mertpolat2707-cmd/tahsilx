import Link from 'next/link';
import { ReactNode } from 'react';

export function SectionHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-black tracking-tight">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ title, value, sub, color }: { title: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          <div className="mt-2 text-3xl font-black">{value}</div>
          <div className="mt-2 text-sm text-slate-500">{sub}</div>
        </div>
        <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${color}`} />
      </div>
    </div>
  );
}

export function StatusPill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'success' | 'warning' | 'info' | 'danger' | 'neutral' }) {
  const tones = {
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    info: 'bg-sky-50 text-sky-700',
    danger: 'bg-rose-50 text-rose-700',
    neutral: 'bg-slate-100 text-slate-700',
  };
  return <span className={`rounded-full px-3 py-1 text-sm font-semibold ${tones[tone]}`}>{children}</span>;
}

export function ActionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="block w-full rounded-2xl px-4 py-3 text-left font-medium text-slate-600 transition hover:bg-slate-100">
      {children}
    </Link>
  );
}

export function PlaceholderChart() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
      <SectionHeader title="Tahsilat Trendi" description="Son 6 aylık görünüm" />
      <div className="flex h-64 items-end gap-4 rounded-3xl bg-slate-50 p-6">
        {[42, 58, 47, 66, 72, 84].map((n, idx) => (
          <div key={idx} className="flex flex-1 flex-col items-center gap-3">
            <div className="w-full rounded-t-2xl bg-gradient-to-t from-emerald-500 to-teal-400" style={{ height: `${n * 2}px` }} />
            <span className="text-xs text-slate-500">{['Eki', 'Kas', 'Ara', 'Oca', 'Şub', 'Mar'][idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({ title, text, cta }: { title: string; text: string; cta?: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-slate-100" />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-slate-500">{text}</p>
      {cta ? <div className="mt-5">{cta}</div> : null}
    </div>
  );
}

export function SimpleToastDemo() {
  return (
    <div className="fixed bottom-5 right-5 hidden rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg md:block">
      <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
      Arayüz demo modunda hazır.
    </div>
  );
}

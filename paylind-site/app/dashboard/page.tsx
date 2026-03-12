"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MerchantShell } from "@/components/shells";
import { PlaceholderChart, SectionHeader, StatCard, StatusPill, EmptyState } from "@/components/ui";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-links/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setStats(data);
      } catch (e) {
        console.log("dashboard error", e);
      }
    };

    const loadLinks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-links`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setLinks(data.slice(0, 5));
      } catch (e) {
        console.log("links error", e);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
    loadLinks();
  }, []);

  if (loading) return <div className="p-10">Yükleniyor...</div>;

  return (
    <MerchantShell title="Dashboard" description="Tahsilatlarını ve ödeme linklerini buradan yönetebilirsin.">
      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Toplam Tahsilat" value={`₺${stats?.total_amount || 0}`} />
        <StatCard title="Aktif Link" value={stats?.active_links || 0} />
        <StatCard title="Başarılı İşlem" value={stats?.successful_payments || 0} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <PlaceholderChart />

          {/* SON LINKLER */}
          <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
            <SectionHeader title="Son Linkler" description="En son oluşturduğun ödeme linkleri" />

            <div className="space-y-4">
              {links.map((link: any) => (
                <div key={link.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold">{link.title}</div>
                      <div className="mt-1 text-sm text-slate-500">₺{link.amount}</div>
                    </div>

                    <StatusPill tone={link.status === "paid" ? "success" : "warning"}>
                      {link.status}
                    </StatusPill>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-[28px] bg-slate-900 p-6 text-white shadow-xl">
            <div className="mb-4 text-sm text-slate-300">Hızlı görünüm</div>
            <h2 className="text-3xl font-black">Yeni link oluşturarak satışını artır</h2>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/dashboard/new-link" className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 font-semibold text-white">
                Yeni Link Oluştur
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <EmptyState
            title="Yeni kampanya başlat"
            text="Kampanya, açıklama ve link kombinasyonlarını yakında ekleyeceğiz."
            cta={
              <Link href="/dashboard/new-link" className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white">
                İlk Linki Oluştur
              </Link>
            }
          />
        </div>
      </div>
    </MerchantShell>
  );
}
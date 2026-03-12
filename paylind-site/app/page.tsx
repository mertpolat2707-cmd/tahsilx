"use client";

import Link from "next/link";
import { useState } from "react";
import { faqs } from "@/lib/data";

const logos = ["Arda Medya", "Nova Ajans", "Peak Studio", "Mosaic Labs", "Tetra Works"];
const testimonials = [
  {
    name: "Sena Kaya",
    title: "Kurucu, Nova Ajans",
    text: "Paylind ile ödeme linki sürecimiz inanılmaz hızlandı. Müşteriye gönderdiğimiz linklerin görünümü çok daha profesyonel oldu.",
  },
  {
    name: "Burak Demir",
    title: "Peak Studio",
    text: "Tek panelden takip kısmı ciddi zaman kazandırıyor. Özellikle ekip içinde operasyon yönetimi çok rahatladı.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      title: "Dakikalar içinde link oluştur",
      text: "Ürün veya hizmetin için saniyeler içinde ödeme linki üret ve müşterine gönder.",
      accent: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Güvenli tahsilat",
      text: "Müşterine profesyonel ve güven veren bir ödeme deneyimi sun.",
      accent: "from-sky-500 to-blue-600",
      iconBg: "bg-sky-50",
    },
    {
      title: "Tek panelden takip",
      text: "Oluşturduğun linkleri, ödemeleri ve durumları tek ekrandan yönet.",
      accent: "from-violet-500 to-fuchsia-500",
      iconBg: "bg-violet-50",
    },
  ];

  const stats = [
    {
      label: "Aktif Merchant",
      value: "1.250+",
      card: "bg-gradient-to-br from-sky-500 to-blue-600 text-white",
    },
    {
      label: "Aylık İşlem Hacmi",
      value: "₺28M+",
      card: "bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900",
    },
    {
      label: "Başarılı İşlem Oranı",
      value: "%99.2",
      card: "bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-900",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-3 text-center text-sm font-medium text-slate-600">
          Güvenli ödeme altyapısı · Hızlı kurulum · Tek panelden yönetim
        </div>
      </div>

      <header className="sticky top-0 z-20 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-2xl font-black tracking-tight text-slate-900">Paylind</div>
            <div className="text-xs text-slate-500">Modern online tahsilat altyapısı</div>
          </div>

          <nav className="hidden gap-6 text-sm text-slate-600 md:flex">
            <a href="#ozellikler">Özellikler</a>
            <a href="#guven">Güven</a>
            <a href="#sss">SSS</a>
            <a href="#iletisim">İletişim</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">Giriş Yap</Link>
            <Link href="/dashboard" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">Demo Panel</Link>
          </div>

          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 md:hidden">
            <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-sm text-slate-700">
              <a href="#ozellikler" onClick={() => setMenuOpen(false)}>Özellikler</a>
              <a href="#guven" onClick={() => setMenuOpen(false)}>Güven</a>
              <a href="#sss" onClick={() => setMenuOpen(false)}>SSS</a>
              <a href="#iletisim" onClick={() => setMenuOpen(false)}>İletişim</a>
              <div className="mt-3 flex flex-col gap-3">
                <Link href="/login" className="rounded-xl border border-slate-300 px-4 py-3 text-center font-medium text-slate-700" onClick={() => setMenuOpen(false)}>Giriş Yap</Link>
                <Link href="/dashboard" className="rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white" onClick={() => setMenuOpen(false)}>Demo Panel</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
            Yeni nesil ödeme linki deneyimi
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
            Link ile ödeme almanın
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 bg-clip-text text-transparent">
              en modern ve premium yolu
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Paylind ile saniyeler içinde ödeme linki oluştur, müşterine gönder, tahsilatlarını tek panelden takip et ve süreci profesyonel şekilde yönet.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800">Hemen Başla</Link>
            <Link href="/login" className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">Demo İzle</Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>✔ Kolay kurulum</span>
            <span>✔ Güvenli tahsilat</span>
            <span>✔ Modern panel</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[30px] bg-white p-6 shadow-2xl shadow-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Son oluşturulan link</div>
                <div className="text-xl font-bold">Web Tasarım Hizmeti</div>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Aktif</div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="text-sm text-slate-500">Tutar</div>
              <div className="mt-1 text-3xl font-black text-slate-900">₺4.500</div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Durum</div>
                  <div className="mt-1 font-semibold">Bekliyor</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Tarih</div>
                  <div className="mt-1 font-semibold">11 Mar 2026</div>
                </div>
              </div>

              <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white shadow-md shadow-emerald-100">Ödeme Yap</button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className={`rounded-3xl p-5 shadow-lg ${item.card}`}>
                <div className="text-sm opacity-90">{item.label}</div>
                <div className="mt-2 text-3xl font-black">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Tercih eden ekipler</div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5">
            {logos.map((logo) => (
              <div key={logo} className="rounded-2xl bg-slate-50 px-4 py-5 text-center font-semibold text-slate-600">{logo}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="ozellikler" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight">Neden Paylind?</h2>
          <p className="mt-3 text-lg text-slate-600">Online tahsilat süreçlerini sadeleştiren, güven veren ve hızlı çalışan bir altyapı.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg}`}>
                <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${feature.accent}`} />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="guven" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[32px] bg-gradient-to-br from-sky-500 to-blue-600 px-8 py-10 text-white shadow-xl shadow-sky-100">
            <div className="text-sm font-medium text-sky-100">Anlık görünürlük</div>
            <h3 className="mt-3 text-3xl font-black">Tüm işlemleri tek ekranda takip et</h3>
            <p className="mt-4 text-lg leading-8 text-sky-50">Başarılı, bekleyen ve iptal edilen tüm hareketleri detaylı şekilde görüntüle.</p>
          </div>

          <div className="rounded-[32px] bg-gradient-to-br from-violet-500 to-fuchsia-500 px-8 py-10 text-white shadow-xl shadow-violet-100">
            <div className="text-sm font-medium text-violet-100">Daha premium deneyim</div>
            <h3 className="mt-3 text-3xl font-black">Müşterine profesyonel bir ödeme sayfası sun</h3>
            <p className="mt-4 text-lg leading-8 text-violet-50">Modern arayüz, güçlü renk dengesi ve güven veren akış ile daha güçlü marka algısı oluştur.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            ['3D Secure Destekli', 'Ödeme akışlarında güven odaklı yapı.'],
            ['SSL ile Korunan Sayfalar', 'Müşterinin karşısına güven veren ekranlar çıkar.'],
            ['PCI Uyumlu Entegrasyon Hazırlığı', 'Provider tarafı ile uyumlu mimari kurgulanır.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 h-12 w-12 rounded-2xl bg-emerald-50" />
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-lg leading-8 text-slate-700">“{item.text}”</p>
              <div className="mt-6">
                <div className="font-bold">{item.name}</div>
                <div className="text-sm text-slate-500">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="sss" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight">Sık Sorulan Sorular</h2>
          <p className="mt-3 text-lg text-slate-600">Karar vermeden önce en çok merak edilen noktalar.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold">{item.q}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="pb-20">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-slate-900 px-8 py-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">Ödeme süreçlerini daha hızlı ve daha profesyonel hale getir</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">Paylind ile online tahsilat altyapını kur, müşterilerine link gönder ve tüm süreci tek panelden yönet.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard" className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-semibold text-white">Hemen Başla</Link>
            <Link href="/login" className="rounded-2xl border border-slate-600 px-6 py-3 font-semibold text-white">Demo Talep Et</Link>
          </div>
        </div>
      </section>

      <footer id="iletisim" className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
          <div>
            <div className="text-2xl font-black">Paylind</div>
            <p className="mt-3 max-w-sm text-slate-600">İşletmeler için modern ödeme linki ve online tahsilat altyapısı.</p>
          </div>
          <div>
            <div className="font-semibold">Ürün</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div>Ödeme Linkleri</div>
              <div>Merchant Paneli</div>
              <div>Admin Yönetimi</div>
            </div>
          </div>
          <div>
            <div className="font-semibold">İletişim</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div>hello@paylind.com</div>
              <div>+90 850 000 00 00</div>
              <div>İstanbul, Türkiye</div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-6 py-4 text-center text-sm text-slate-500">© 2026 Paylind. Tüm hakları saklıdır.</div>
      </footer>
    </main>
  );
}

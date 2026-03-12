"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("E-posta ve şifre gir.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Giriş başarısız");
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("merchant", JSON.stringify(data.merchant));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      window.location.href = "/dashboard";
    } catch (error) {
      alert("Sunucu bağlantı hatası");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden bg-slate-900 text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div>
            <Link href="/" className="text-3xl font-black tracking-tight">
              Paylind
            </Link>
            <div className="mt-2 text-sm text-slate-300">
              Modern online tahsilat altyapısı
            </div>
          </div>

          <div className="max-w-xl">
            <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-300">
              Güvenli giriş deneyimi
            </div>

            <h1 className="mt-6 text-5xl font-black leading-tight">
              Tahsilatlarını
              <br />
              tek panelden
              <br />
              yönet.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Paylind ile ödeme linklerini oluştur, işlemlerini takip et,
              müşterilerine profesyonel bir ödeme deneyimi sun.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="text-sm text-slate-400">
                  Başarılı İşlem Oranı
                </div>
                <div className="mt-2 text-3xl font-black text-white">%99.2</div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-5 text-slate-900">
                <div className="text-sm font-medium opacity-80">Aylık Hacim</div>
                <div className="mt-2 text-3xl font-black">₺28M+</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-400">
            © 2026 Paylind. Tüm hakları saklıdır.
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:hidden">
              <div className="text-3xl font-black tracking-tight text-slate-900">
                Paylind
              </div>
              <div className="mt-2 text-sm text-slate-500">
                Modern online tahsilat altyapısı
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200">
              <div className="text-center">
                <h2 className="text-3xl font-black tracking-tight">
                  Tekrar hoş geldin
                </h2>
                <p className="mt-3 text-slate-600">
                  Paneline giriş yap ve tahsilatlarını yönetmeye devam et.
                </p>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    E-posta
                  </label>
                  <input
                    type="email"
                    placeholder="ornek@paylind.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-slate-700">
                      Şifre
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium text-emerald-600"
                    >
                      Şifremi Unuttum
                    </button>
                  </div>

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  Beni hatırla
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="block w-full rounded-2xl bg-slate-900 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-sm text-slate-400">veya</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Link
                href="/"
                className="block w-full rounded-2xl border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Demo Talep Et
              </Link>

              <div className="mt-6 text-center text-sm text-slate-500">
                Hesabın yok mu?{" "}
                <Link href="/" className="font-semibold text-emerald-600">
                  Başvuru Yap
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
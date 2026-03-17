"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MerchantShell } from "@/components/shells";

export default function NewLinkPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [installment, setInstallment] = useState("Tek çekim + taksit");
  const [category, setCategory] = useState("Hizmet");
  const [loading, setLoading] = useState(false);

  const handleCreateLink = async () => {
    if (!title || !amount) {
      alert("Başlık ve tutar zorunlu.");
      return;
    }

   try {
  setLoading(true);

  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payment-links`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        amount: Number(amount),
        description,
        expires_at: expiresAt || null,
        installment,
        category,
      }),
    }
  );

  const raw = await res.text();
  console.log("CREATE LINK RAW RESPONSE:", raw);

  let data: any = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { raw };
  }

  if (!res.ok) {
    alert(typeof data.detail === "string" ? data.detail : JSON.stringify(data));
    return;
  }

  alert("Ödeme linki oluşturuldu");
  router.push("/dashboard");
} catch (error) {
  console.error("CREATE LINK ERROR:", error);
  alert("Sunucu bağlantı hatası");
} finally {
  setLoading(false);
}
  };

  return (
    <MerchantShell
      title="Yeni Link Oluştur"
      description="Hızlıca yeni bir ödeme linki tasarla ve paylaş."
    >
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200 xl:col-span-2">
          <h2 className="text-xl font-black">Link Bilgileri</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">Başlık</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                placeholder="Örn. Web Tasarım Hizmeti"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Tutar</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
                placeholder="4500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Son Kullanma Tarihi
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Açıklama
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-32 w-full rounded-2xl border border-slate-300 px-4 py-3"
                placeholder="Müşterinin göreceği açıklama"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Taksit Seçeneği
              </label>
              <select
                value={installment}
                onChange={(e) => setInstallment(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                <option>Tek çekim + taksit</option>
                <option>Sadece tek çekim</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                <option>Hizmet</option>
                <option>Yazılım</option>
                <option>Danışmanlık</option>
                <option>Eğitim</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleCreateLink}
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Oluşturuluyor..." : "Link Oluştur"}
            </button>

            <button className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700">
              Taslak Kaydet
            </button>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200">
          <div className="text-sm text-slate-500">Canlı Önizleme</div>

          <div className="mt-4 rounded-3xl border border-slate-200 p-5">
            <div className="text-sm text-slate-500">Başlık</div>
            <div className="text-xl font-bold">
              {title || "Web Tasarım Hizmeti"}
            </div>

            <div className="mt-5 text-sm text-slate-500">Tutar</div>
            <div className="text-3xl font-black">
              ₺{amount || "4.500"}
            </div>

            <div className="mt-4 text-sm text-slate-500">Açıklama</div>
            <div className="mt-1 text-sm text-slate-700">
              {description || "Müşterinin göreceği açıklama burada yer alacak."}
            </div>

            <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white">
              Ödeme Yap
            </button>
          </div>
        </div>
      </div>
    </MerchantShell>
  );
}

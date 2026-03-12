export const adminStats = [
  { title: 'Toplam İşlem Hacmi', value: '₺2.8M', sub: 'Bu ay +18.2%', color: 'from-emerald-500 to-teal-500' },
  { title: 'Aktif Merchant', value: '184', sub: '12 yeni kayıt', color: 'from-sky-500 to-blue-600' },
  { title: 'Toplam Komisyon', value: '₺94.250', sub: 'Güncel tahakkuk', color: 'from-violet-500 to-fuchsia-500' },
  { title: 'Başarısız İşlem Oranı', value: '%1.4', sub: 'Düşük risk seviyesi', color: 'from-amber-400 to-orange-500' },
];

export const merchants = [
  { name: 'Arda Medya', owner: 'Arda Yılmaz', email: 'arda@ardamedya.com', volume: '₺184.000', status: 'Aktif', risk: 'Düşük' },
  { name: 'Nova Ajans', owner: 'Sena Kaya', email: 'sena@novaajans.com', volume: '₺96.500', status: 'İncelemede', risk: 'Orta' },
  { name: 'Peak Studio', owner: 'Burak Demir', email: 'burak@peakstudio.com', volume: '₺241.300', status: 'Aktif', risk: 'Düşük' },
  { name: 'Mosaic Labs', owner: 'Ece Çelik', email: 'ece@mosaiclabs.co', volume: '₺72.900', status: 'Pasif', risk: 'Yüksek' },
];

export const transactions = [
  { merchant: 'Arda Medya', customer: 'Ayşe Demir', amount: '₺4.500', date: '11 Mar 2026', status: 'Başarılı', method: 'Kart' },
  { merchant: 'Nova Ajans', customer: 'Mehmet Kaya', amount: '₺7.250', date: '11 Mar 2026', status: 'Bekliyor', method: 'Kart' },
  { merchant: 'Peak Studio', customer: 'Elif Yılmaz', amount: '₺2.000', date: '10 Mar 2026', status: 'Başarılı', method: 'Kart' },
  { merchant: 'Mosaic Labs', customer: 'Can Akın', amount: '₺12.300', date: '09 Mar 2026', status: 'İade', method: 'Kart' },
];

export const commissions = [
  { merchant: 'Arda Medya', transactionAmount: '₺4.500', commission: '₺225', date: '11 Mar 2026', status: 'Tahakkuk Etti' },
  { merchant: 'Nova Ajans', transactionAmount: '₺7.250', commission: '₺362,50', date: '11 Mar 2026', status: 'Beklemede' },
  { merchant: 'Peak Studio', transactionAmount: '₺2.000', commission: '₺100', date: '10 Mar 2026', status: 'Tahakkuk Etti' },
];

export const risks = [
  { merchant: 'Nova Ajans', reason: 'Aynı IP üzerinden çoklu deneme', severity: 'Orta', action: 'İncelemede' },
  { merchant: 'Mosaic Labs', reason: 'Yüksek tutarlı tekrar eden başarısız işlem', severity: 'Yüksek', action: 'Kısıtlandı' },
  { merchant: 'Arda Medya', reason: 'Normal kontrol', severity: 'Düşük', action: 'Temiz' },
];

export const reports = [
  { title: 'Günlük İşlem Raporu', description: 'Günlük toplam işlem sayısı ve tahsilat özeti.' },
  { title: 'Merchant Performans Raporu', description: 'Merchant bazlı hacim, başarı oranı ve komisyon durumu.' },
  { title: 'Risk Raporu', description: 'Şüpheli veya incelemeye alınan işlemlerin özeti.' },
];

export const dashboardStats = [
  { title: 'Toplam Tahsilat', value: '₺128.450', sub: 'Bu ay +12.4%', color: 'from-emerald-500 to-teal-500' },
  { title: 'Aktif Link', value: '42', sub: '7 yeni link bugün', color: 'from-sky-500 to-blue-600' },
  { title: 'Başarılı İşlem', value: '318', sub: '%99.2 başarı oranı', color: 'from-violet-500 to-fuchsia-500' },
];

export const recentLinks = [
  { title: 'Web Tasarım Hizmeti', amount: '₺4.500', status: 'Aktif', statusColor: 'bg-emerald-50 text-emerald-700', date: '11 Mar 2026' },
  { title: 'Sosyal Medya Yönetimi', amount: '₺7.250', status: 'Bekliyor', statusColor: 'bg-amber-50 text-amber-700', date: '11 Mar 2026' },
  { title: 'Danışmanlık Paketi', amount: '₺2.000', status: 'Tahsil Edildi', statusColor: 'bg-sky-50 text-sky-700', date: '10 Mar 2026' },
];

export const recentPayments = [
  { customer: 'Ayşe Demir', title: 'Web Tasarım Hizmeti', amount: '₺4.500', date: '11 Mar 2026', status: 'Başarılı' },
  { customer: 'Mehmet Kaya', title: 'Danışmanlık Paketi', amount: '₺2.000', date: '10 Mar 2026', status: 'Başarılı' },
  { customer: 'Elif Yılmaz', title: 'Sosyal Medya Yönetimi', amount: '₺7.250', date: '10 Mar 2026', status: 'Bekliyor' },
];

export const customers = [
  { name: 'Ayşe Demir', email: 'ayse@example.com', total: '₺12.450', count: 5 },
  { name: 'Mehmet Kaya', email: 'mehmet@example.com', total: '₺8.200', count: 3 },
  { name: 'Elif Yılmaz', email: 'elif@example.com', total: '₺18.900', count: 8 },
];

export const faqs = [
  { q: 'Paylind ile ne yapabilirim?', a: 'Müşterilerin için ödeme linki oluşturabilir, tahsilatlarını takip edebilir ve ödeme süreçlerini tek panelden yönetebilirsin.' },
  { q: 'Kurulum zor mu?', a: 'Hayır. Paylind sade bir yapı sunar ve hızlı şekilde kullanıma başlanabilir.' },
  { q: 'Müşterim nasıl ödeme yapar?', a: 'Oluşturduğun ödeme linkine girerek güvenli ödeme ekranı üzerinden işlemini tamamlar.' },
  { q: 'Komisyon modeli nasıl çalışır?', a: 'Platform işlem bazlı kurgulanabilir; detaylar sözleşme ve ödeme sağlayıcı entegrasyonuna göre tanımlanır.' },
  { q: 'Kimler için uygundur?', a: 'Ajanslar, hizmet satan işletmeler, danışmanlık verenler ve online tahsilat almak isteyen tüm işletmeler için uygundur.' },
];

from fastapi.responses import HTMLResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.payment_links import router as payment_links_router
from app.api.public import router as public_router
from app.api.webhooks import router as webhooks_router
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine

app = FastAPI(title=settings.APP_NAME)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/health")
async def health():
    return {"status": "ok", "app": settings.APP_NAME}


app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(payment_links_router, prefix=settings.API_PREFIX)
app.include_router(public_router, prefix=settings.API_PREFIX)
app.include_router(webhooks_router, prefix=settings.API_PREFIX)
@app.get("/", response_class=HTMLResponse)
def home():
    return """
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paylind | Online Tahsilat Altyapısı</title>
        <style>
            * {
                box-sizing: border-box;
            }
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f6f7fb;
                color: #111827;
            }
            .container {
                max-width: 1100px;
                margin: 0 auto;
                padding: 32px 20px;
            }
            .navbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 18px 0;
            }
            .logo {
                font-size: 28px;
                font-weight: 800;
                color: #111827;
            }
            .badge {
                display: inline-block;
                padding: 6px 12px;
                border-radius: 999px;
                background: #e8fff3;
                color: #0f9f62;
                font-size: 13px;
                font-weight: 700;
            }
            .hero {
                background: white;
                border-radius: 24px;
                padding: 64px 40px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.06);
                margin-top: 20px;
            }
            .hero h1 {
                margin: 0 0 18px;
                font-size: 48px;
                line-height: 1.1;
            }
            .hero p {
                font-size: 18px;
                color: #4b5563;
                max-width: 760px;
                line-height: 1.7;
            }
            .buttons {
                margin-top: 28px;
                display: flex;
                gap: 14px;
                flex-wrap: wrap;
            }
            .btn {
                text-decoration: none;
                padding: 14px 22px;
                border-radius: 14px;
                font-weight: 700;
                display: inline-block;
            }
            .btn-primary {
                background: #111827;
                color: white;
            }
            .btn-secondary {
                background: #f3f4f6;
                color: #111827;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 18px;
                margin-top: 28px;
            }
            .card {
                background: white;
                border-radius: 18px;
                padding: 22px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.05);
            }
            .card h3 {
                margin-top: 0;
                margin-bottom: 10px;
                font-size: 18px;
            }
            .card p {
                margin: 0;
                color: #6b7280;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                margin: 40px 0 10px;
            }
            @media (max-width: 768px) {
                .hero {
                    padding: 36px 22px;
                }
                .hero h1 {
                    font-size: 34px;
                }
                .hero p {
                    font-size: 16px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="navbar">
                <div class="logo">Paylind</div>
                <div class="badge">Test Ortamı Aktif</div>
            </div>

            <section class="hero">
                <h1>İşletmeler için online tahsilat altyapısı</h1>
                <p>
                    Paylind, işletmelerin müşterilerinden ödeme linki ile online tahsilat almasını sağlayan
                    modern bir ödeme altyapısıdır. Sistem şu anda geliştirme ve test sürecindedir.
                </p>

                <div class="buttons">
                    <a class="btn btn-primary" href="/docs">API Dokümantasyonu</a>
                    <a class="btn btn-secondary" href="/health">Sistem Durumu</a>
                </div>
            </section>

            <div class="grid">
                <div class="card">
                    <h3>Ödeme Linki Oluşturma</h3>
                    <p>Müşterilerinize hızlıca ödeme bağlantısı gönderin ve tahsilat sürecini kolaylaştırın.</p>
                </div>
                <div class="card">
                    <h3>Taksitli Tahsilat</h3>
                    <p>Kartla ödeme ve taksitli tahsilat senaryoları için uygun altyapı sunar.</p>
                </div>
                <div class="card">
                    <h3>Merchant Panel</h3>
                    <p>İşletmeler tahsilatlarını, linklerini ve ödeme hareketlerini tek panelden yönetebilir.</p>
                </div>
            </div>

            <div class="footer">
                © 2026 Paylind — Online Tahsilat Sistemi
            </div>
        </div>
    </body>
    </html>
    """
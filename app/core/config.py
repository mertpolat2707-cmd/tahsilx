from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "TahsilX"
    APP_ENV: str = "development"
    DEBUG: bool = True
    DEBUG_SQL: bool = False
    API_PREFIX: str = "/api"

    DATABASE_URL: str = "sqlite+aiosqlite:///./tahsilx.db"

    JWT_SECRET: str = "super-secret-change-this"
    JWT_ALG: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    WEBHOOK_SECRET: str = "webhook-secret"
    PLATFORM_COMMISSION_RATE: float = 0.05

    PAYTR_MERCHANT_ID: str = ""
    PAYTR_MERCHANT_KEY: str = ""
    PAYTR_MERCHANT_SALT: str = ""
    PAYTR_TEST_MODE: int = 1
    BASE_PUBLIC_URL: str = "http://127.0.0.1:8000"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
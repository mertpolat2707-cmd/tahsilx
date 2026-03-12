from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, hash_password, verify_password
from app.db.models.merchant import Merchant
from app.db.session import get_db
from app.schemas.auth import LoginIn, RegisterIn, TokenOut

router = APIRouter(prefix="/auth", tags=["auth"])


async def get_merchant_by_email(db: AsyncSession, email: str) -> Optional[Merchant]:
    result = await db.execute(select(Merchant).where(Merchant.email == email))
    return result.scalar_one_or_none()


async def get_merchant_by_phone(db: AsyncSession, phone: str) -> Optional[Merchant]:
    result = await db.execute(select(Merchant).where(Merchant.phone == phone))
    return result.scalar_one_or_none()


@router.post("/register", response_model=TokenOut)
async def register(data: RegisterIn, db: AsyncSession = Depends(get_db)):
    existing_email = await get_merchant_by_email(db, data.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu email zaten kayıtlı.",
        )

    existing_phone = await get_merchant_by_phone(db, data.phone)
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu telefon zaten kayıtlı.",
        )

    merchant = Merchant(
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password),
    )

    db.add(merchant)
    await db.commit()
    await db.refresh(merchant)

    access_token = create_access_token(subject=str(merchant.id))
    return {"access_token": access_token, "token_type": "bearer", "merchant": merchant}


@router.post("/login", response_model=TokenOut)
async def login(data: LoginIn, db: AsyncSession = Depends(get_db)):
    merchant = await get_merchant_by_email(db, data.email)
    if not merchant or not verify_password(data.password, merchant.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email veya şifre hatalı.",
        )

    access_token = create_access_token(subject=str(merchant.id))
    return {"access_token": access_token, "token_type": "bearer", "merchant": merchant}

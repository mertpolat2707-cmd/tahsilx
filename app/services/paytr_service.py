import base64
import hashlib
import hmac
import json
from typing import Any

import requests

from app.core.config import settings


PAYTR_TOKEN_URL = "https://www.paytr.com/odeme/api/get-token"


def _make_paytr_token(
    merchant_id: str,
    user_ip: str,
    merchant_oid: str,
    email: str,
    payment_amount: int,
    user_basket_b64: str,
    no_installment: int,
    max_installment: int,
    currency: str,
    test_mode: int,
) -> str:
    hash_str = (
        f"{merchant_id}"
        f"{user_ip}"
        f"{merchant_oid}"
        f"{email}"
        f"{payment_amount}"
        f"{user_basket_b64}"
        f"{no_installment}"
        f"{max_installment}"
        f"{currency}"
        f"{test_mode}"
    )
    token_bytes = hmac.new(
        settings.PAYTR_MERCHANT_KEY.encode("utf-8"),
        (hash_str + settings.PAYTR_MERCHANT_SALT).encode("utf-8"),
        hashlib.sha256,
    ).digest()
    return base64.b64encode(token_bytes).decode("utf-8")


def create_iframe_token(
    *,
    merchant_oid: str,
    email: str,
    payment_amount: int,
    user_name: str,
    user_address: str,
    user_phone: str,
    user_ip: str,
    title: str,
) -> dict[str, Any]:
    basket = [[title, f"{payment_amount / 100:.2f}", 1]]
    user_basket_b64 = base64.b64encode(
        json.dumps(basket, ensure_ascii=False).encode("utf-8")
    ).decode("utf-8")

    no_installment = 0
    max_installment = 0
    currency = "TL"
    test_mode = settings.PAYTR_TEST_MODE

    paytr_token = _make_paytr_token(
        merchant_id=settings.PAYTR_MERCHANT_ID,
        user_ip=user_ip,
        merchant_oid=merchant_oid,
        email=email,
        payment_amount=payment_amount,
        user_basket_b64=user_basket_b64,
        no_installment=no_installment,
        max_installment=max_installment,
        currency=currency,
        test_mode=test_mode,
    )

    payload = {
        "merchant_id": settings.PAYTR_MERCHANT_ID,
        "user_ip": user_ip,
        "merchant_oid": merchant_oid,
        "email": email,
        "payment_amount": payment_amount,
        "paytr_token": paytr_token,
        "user_basket": user_basket_b64,
        "debug_on": 1,
        "no_installment": no_installment,
        "max_installment": max_installment,
        "user_name": user_name,
        "user_address": user_address,
        "user_phone": user_phone,
        "merchant_ok_url": f"{settings.BASE_PUBLIC_URL}/payment/success",
        "merchant_fail_url": f"{settings.BASE_PUBLIC_URL}/payment/fail",
        "timeout_limit": 30,
        "currency": currency,
        "test_mode": test_mode,
        "lang": "tr",
    }

    response = requests.post(PAYTR_TOKEN_URL, data=payload, timeout=20)
    response.raise_for_status()
    return response.json()


def verify_callback_hash(merchant_oid: str, status: str, total_amount: str, received_hash: str) -> bool:
    hash_str = f"{merchant_oid}{settings.PAYTR_MERCHANT_SALT}{status}{total_amount}"
    expected = base64.b64encode(
        hmac.new(
            settings.PAYTR_MERCHANT_KEY.encode("utf-8"),
            hash_str.encode("utf-8"),
            hashlib.sha256,
        ).digest()
    ).decode("utf-8")
    return hmac.compare_digest(expected, received_hash)
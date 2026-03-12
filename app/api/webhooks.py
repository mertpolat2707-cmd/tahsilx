import json

from fastapi import APIRouter, Depends, Header, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.services.webhook_service import mark_paid, verify_test_signature

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/test-paid/{public_id}")
async def test_mark_paid(
    public_id: str,
    request: Request,
    x_signature: str | None = Header(default=None),
    x_event_id: str | None = Header(default=None),
    db: AsyncSession = Depends(get_db),
):
    raw = await request.body()
    if not x_signature or not verify_test_signature(raw, x_signature):
        raise HTTPException(status_code=401, detail="Signature doğrulanamadı")

    try:
        payload = json.loads(raw.decode("utf-8") or "{}")
    except Exception:
        payload = {"raw": raw.decode("utf-8", errors="ignore")}

    try:
        link = await mark_paid(db, public_id=public_id, provider_event_id=x_event_id, raw_payload=payload)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    return {"ok": True, "status": str(link.status), "public_id": link.public_id}

from fastapi import APIRouter, Request, HTTPException, Depends
from ..database.db import create_challenge_quota
from ..database.models import get_db
from svix.webhooks import Webhook
import os
import json
import logging
from sqlalchemy.exc import IntegrityError

router = APIRouter()

@router.post("/clerk")
#This validates that the request being sent to the webhook is from CLERK
async def handle_user_created(request: Request, db)):
    webhook_secret = os.getenv("WEBHOOK_SIGN_IN_SECRET")

    #if cannot find the webhook secret through an exception
    if not webhook_secret:
        raise HTTPException(status_code=500, detail="WEBHOOK_SIGN_IN_SECRET not set")

    body = await request.body()
    payload = body.decode("utf-8")
    headers = dict(request.headers)

    try:
        wh = Webhook(webhook_secret)
        wh.verify(payload, headers)

        data = json.loads(payload)
        if data.get("type") != "user.created":
            return {"status": "ignored"}

        user_data = data.get("data", {})
        user_id = user_data.get("id")

        create_challenge_quota(db, user_id)

        return {"status": "created"}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
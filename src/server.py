from fastapi import FastAPI, HTTPException
from uuid import uuid4
from deck import Deck

app = FastAPI()
decks = {}  # Dictionary to store decks by their ID

@app.post("/api/v2/deck/new")
async def api_v2_deck_new():
    deck_id = str(uuid4())
    decks[deck_id] = Deck()
    return {"deck_id": deck_id}

@app.post("/api/v2/deck/{deck_id}/deal")
async def api_v2_deck_deal(deck_id: str, count: int = 1):
    deck = decks.get(deck_id)
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")
    cards = deck.deal(count)
    if not cards:
        raise HTTPException(status_code=400, detail="Not enough cards in the deck")
    return {"cards": cards}

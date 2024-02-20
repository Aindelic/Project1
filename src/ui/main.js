import { React, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Api from "./Api.js";
import App from "./App.js";

async function main() {
  const id_obj = await Api.getId();
  const id = id_obj.deck_id;

  // let the server deal the hand
  const initialCards_obj = await Api.dealV2(id, 5);
  const initialCards = initialCards_obj.cards;

  // create React elements
  const root = createRoot(document.getElementById("app"));
  root.render(<App initialCards={initialCards} deckId={id} />);
}

window.onload = main;

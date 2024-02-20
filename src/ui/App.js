import Api from "./Api.js";
import Hand from "./Hand.js";
import { useState, useCallback } from "react";

/**
   Note: For each game, we'll only allow the "Draw" to happen once.
   This means we should hide the "Draw" button after it is clicked.
   Better yet, let's change it to a different "Play Again" button that
   resets everything and plays another hand (with a new Deck).
**/
export default function App({ initialCards, deckId }) {
  const [cards, setCards] = useState(initialCards);
  const [selected, setSelected] = useState([]);
  const [isPlayAgain, setIsPlayAgain] = useState(false);

  function toggleSelected(index) {
    if (!selected.includes(index) && selected.length < 3 ) {
      setSelected(selected.concat([index]));
    }
    else if (!selected.includes(index) && selected.length == 3){
      // If there's an Ace, user can select 4 cards
      if(cards[index].rank === 'A' && cards[index].suit === 'S'){
	  console.log('Ace is included');
	  setSelected(selected.concat([index]));
      }
      else if(selected.some(index=>cards[index].rank === 'A' && cards[index].suit === 'S')){
	  console.log('Ace is included');
	  setSelected(selected.concat([index]));
      }
    }
    else {
      setSelected(selected.filter((elt) => elt !== index));
    }
  }

// This function will be called when the Draw button is clicked
const fetchNewCards = useCallback(async () => {
  console.log(`need to fetch ${selected.length} cards`);

  // fetch the new cards
  const fetchedCards_obj = await Api.dealV2(deckId, selected.length);
  const fetchedCards = fetchedCards_obj.cards;

  // let's print out the fetched cards
  console.log(fetchedCards);

  // create the new hand with the fetched cards replacing the
  // selected cards
  let fetchedCardsIndex = 0;
  const newCards = cards.map((card, index) => {
    if (selected.includes(index)) {
      // we map this card to the new card, and increment
      // our fetchedCardsIndex counter
      return fetchedCards[fetchedCardsIndex++];
    } else {
      return card;
    }
  });

  // update state, causing a re-render
  setCards(newCards);
  setSelected([]);

  // after draw, game over
  setIsPlayAgain(true);
}, [selected, cards, deckId]);

  function playAgain(){
      window.location.reload();
  }

  return (
    <div>
      <Hand
        cards={cards}
        selected={selected}
        onSelect={(index) => toggleSelected(index)}
      />  
      <button onClick={async () => fetchNewCards(selected)}>Draw</button>
    </div>
  );
}

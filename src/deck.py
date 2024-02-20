from card import Card
import random
import uuid

class Deck:
    suits = ['H', 'D', 'C', 'S']
    values = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A']

    def __init__(self):
        self.id = str(uuid.uuid4())
        self.cards = [Card(suit, value) for suit in self.suits for value in self.values]
        random.shuffle(self.cards)

    def deal(self, num_cards):
        if num_cards > len(self.cards):
            return []  # or handle the case as needed
        dealt_cards = self.cards[:num_cards]
        self.cards = self.cards[num_cards:]
        return dealt_cards

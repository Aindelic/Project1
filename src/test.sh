#!/bin/bash

# "set -e" makes the script exit on any error
set -e

# "set -x" makes the script print out each command before printing the output
set -x

# Create a new deck and store the deck ID
# The `-s` option makes curl silent about its status output when piping
DECK_ID1=$(curl -s -X POST localhost:8000/api/v2/deck/new | awk -F'"' '/deck_id/{print $4}') #this was taken from chatGPT, for formatting I could not use jq

echo "New deck ID: $DECK_ID1"

# Using the stored DECK_ID to request 5 cards from the new deck
curl -w "\n" -X POST "localhost:8000/api/v2/deck/$DECK_ID1/deal?count=5"

DECK_ID2=$(curl -s -X POST localhost:8000/api/v2/deck/new | awk -F'"' '/deck_id/{print $4}')

echo "New deck ID: $DECK_ID2"

curl -w "\n" -X POST "localhost:8000/api/v2/deck/$DECK_ID2/deal?count=5"
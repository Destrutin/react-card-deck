import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);

    useEffect(function getNewDeckOnLoad() {
        async function getDeck() {
            const newDeck = await axios.get(`${API_BASE_URL}/new/`);
            setDeck(newDeck.data);
        }
        getDeck();
    }, []);

    async function drawCard() {
        try {
            console.log(deck);
            const draw = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
            if (draw.data.remaining === 0) throw new Error("no cards remaining!");
            console.log(draw);
            const card = draw.data.cards[0];

            setDrawn(deck => [
                ...deck, {
                    id: card.code,
                    name: card.value + " of " + card.suit,
                    image: card.image
                }
            ])
        } catch (err) {
            alert(err);
        }
    }

    async function shuffleDeck() {
        try {
            axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <>
            <button
                className="Gimme-card"
                onClick={drawCard}
            >Gimme Card</button>

            <div className="Deck-area">{
                drawn.map(card => (
                    <Card
                        key={card.id} name={card.name} image={card.image}
                    />
                ))
            }</div>

            <button
                className="Shuffle-deck"
                onClick={shuffleDeck}
            >Shuffle</button>
        </>
    )
}

export default Deck;
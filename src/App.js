import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState({});

    const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

    useEffect(() => {
        async function getData() {
            let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
            console.log(deck);
            setDeck(deck.data);
        }
        getData();
    }, []);

    const getCard = async () => {
        let deck_id = deck.deck_id;
        try {
            let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
            let cardRes = await axios.get(cardUrl);
            if (cardRes.data.remaining === 0) {
                throw new Error("No cards");
            }
            console.log(cardRes.data);
            let card = cardRes.data.cards[0];
            setDrawn({
                id: card.code,
                image: card.image,
                name: `${card.value} of ${card.suit}`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <h1>Card Dealer</h1>
            <button onClick={() => getCard()}>Gimme a card</button>
        </div>
    );
}

export default App;

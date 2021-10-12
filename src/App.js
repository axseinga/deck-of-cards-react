import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [deck, setDeck] = useState(null);

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
        let id = deck.deck_id;
        let cardUrl = `${API_BASE_URL}/${id}/draw/`;
        let cardRes = await axios.get(cardUrl);
        console.log(cardRes.data);
        let card = cardRes.data.cards[0];
    };

    return (
        <div className="App">
            <h1>Card Dealer</h1>
            <button onClick={() => getCard()}>Gimme a card</button>
        </div>
    );
}

export default App;

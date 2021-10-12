import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Deck() {
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        async function getData() {
            let deck = await axios.get(
                "https://deckofcardsapi.com/api/deck/new/shuffle"
            );
            console.log(deck);
            setDeck(deck.data);
        }
        getData();
    }, []);

    return (
        <div className="App">
            <h1>Card Dealer</h1>
            <button>Gimme a card</button>
        </div>
    );
}

export default Deck;

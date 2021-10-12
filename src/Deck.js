import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./App.css";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);

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
            if (!cardRes.data.success) {
                throw new Error("No cards");
            }
            console.log(cardRes.data);
            let card = cardRes.data.cards[0];
            setDrawn((prevState) => [
                ...prevState,
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} of ${card.suit}`,
                    rotate: animateCard(),
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const cards = drawn.map((c) => (
        <Card key={c.id} name={c.name} image={c.image} rotate={c.rotate} />
    ));

    const animateCard = () => {
        let angle = Math.random() * 90 - 45;
        let xPos = Math.random() * 40 - 20;
        let yPos = Math.random() * 40 - 20;
        let rotate = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
        return rotate;
    };

    return (
        <div className="App">
            <h1>Card Dealer</h1>
            <button onClick={() => getCard()}>Gimme a card</button>
            <div className="Deck-cardarea">{cards}</div>
        </div>
    );
}

export default Deck;

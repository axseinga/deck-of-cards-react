import React from "react";
import "./Card.css";

const Card = (props) => {
    return (
        <img
            style={{ transform: props.rotate }}
            className="Card"
            src={props.image}
            alt={props.name}
        ></img>
    );
};

export default Card;

import React from 'react';
import classes from './Card.module.css';

const Card = (props) => {
    const suits = { Hearts: '♥', Diamonds: '♦', Spades: '♠', Clubs: '♣', H: '♥', D: '♦', S: '♠', C: '♣' };
    //const valueNames = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    //const fullValueNames = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
    const valuePower = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };

    function getValuePower() {
        return valuePower[props.value];
    }

    return (
        <div
            {...props}
            className={classes.Card + ' ' + classes[props.suit]}
            onClick={() => console.log(props.value + ' ' + getValuePower())}
        >
            {props.value}{suits[props.suit]}
        </div>
    );
};

export default Card;

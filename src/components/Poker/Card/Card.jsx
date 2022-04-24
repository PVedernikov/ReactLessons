import React from 'react';
import classes from './Card.module.css';

const Card = ({ value, suit }) => {
    const suits = { Hearts: '♥', Diamonds: '♦', Spades: '♠', Clubs: '♣', H: '♥', D: '♦', S: '♠', C: '♣' };
    //const valueNames = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    //const fullValueNames = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
    const valuePower = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };

    function getValuePower() {
        return valuePower[value];
    }

    return (
        <div
            className={[classes.Card, classes[suit]].join(' ')}
            onClick={() => console.log(value + ' ' + getValuePower())}
        >
            {value}{suits[suit]}
        </div>
    );
};

export default Card;

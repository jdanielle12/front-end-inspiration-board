import React from "react";
import PropTypes from 'prop-types';
import Card from './Card';

const CardList = (props) => {
    return (
        <ul>
            {props.cards.map((card) => (
                <Card
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                deleteCard={props.deleteCard}
                editCard={props.editCard}
                />
            ))}
        </ul>
    )
};

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
};

export default CardList;
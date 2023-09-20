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
                like_count={card.like_count}
                board_id={card.board_id}
                deleteCard={props.deleteCard}
                editCard={props.editCard}
                likeCard={props.likeCard}
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
            like_count: PropTypes.number.isRequired,
            board_id: PropTypes.number.isRequired,
        })
    ).isRequired,
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
    likeCard: PropTypes.func.isRequired,
};

export default CardList;
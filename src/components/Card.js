import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import './Card.css';


const Card = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const deletedCard = () => {
        props.deleteCard(props.card_id);
    };

    const editedCard = () => {
        const updatedData = {title: title, description: description};
        props.editCard(props.card_id, updatedData);
        setEditing(false);
    };

    const editClick = () => {
        setEditing(true);
    };

    const likeButton = () => {
        console.log(props.card_id);
        console.log(props.title, props.like_count);
        props.likeCard(props.card_id, 'like_count');
    };

    const unlikeButton = () => {
        props.likeCard(props.card_id, 'unlike_count');
    };

    return (
        <div className="card-container">
            <h2 className="card-title">{props.title}</h2>
            <p className="card-description">{props.description}</p>
            {isEditing && (
                <>
                <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                <button className="edit-card-button" onClick={editedCard}></button>
                </>
            )}
            <div className="card-button-container">
                <button className="edit-button" onClick={editClick}></button>
                <button className="delete-button" onClick={deletedCard}></button>
            </div>
            <div className="like-count-display">
                <button className="like-count" onClick={likeButton}></button>
                <p>{props.like_count}</p>
                <button className="unlike-count" onClick={unlikeButton}></button>
            </div>
        </div>
    )
};

Card.propTypes = {
    card_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    board_id: PropTypes.number.isRequired,
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
    likeCard: PropTypes.func.isRequired,
};

export default Card;
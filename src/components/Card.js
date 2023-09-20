import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import './Card.css';

const Card = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const deletedCard = () => {
        props.deleteCard(props.id);
    };

    const editedCard = () => {
        const updatedData = {title: title, description: description};
        props.editCard(props.id, updatedData);
        setEditing(false);
    };

    const editClick = () => {
        setEditing(true);
    };

    const likeButton = () => {
        props.likeCard(props.id, 'like_count');
    };

    const unlikeButton = () => {
        props.likeCard(props.id, 'unlike_count');
    };

    return (
        <div className="card-container">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            {isEditing && (
                <>
                <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                <button className="edit-card-button" onClick={editedCard}>Save Changes</button>
                </>
            )}
            <div className="card-button-container">
                <button className="edit-button" onClick={editClick}>Edit</button>
                <button className="delete-button" onClick={deletedCard}>Delete</button>
            </div>
            <div className="like-count-display">
                <button className="like-count" onClick={likeButton}>Like</button>
                <p>{props.like_count}</p>
                <button className="unlike-count" onClick={unlikeButton}>Unlike</button>
            </div>
        </div>
    )
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    board_id: PropTypes.number.isRequired,
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
    likeCard: PropTypes.func.isRequired,
};

export default Card;
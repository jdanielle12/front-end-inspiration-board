import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const Card = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const deletedCard = () => {
        props.deleteCard(props.id)
    };

    const editedCard = () => {
        const updatedData = {title: title, description: description};
        props.editCard(props.id, updatedData);
        setEditing(false);
    };

    const editClick = () => {
        setEditing(true)
    };

    return (
        <div className="card-container">
            <div className="card"></div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            {isEditing && (
                <>
                <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                <button className="edit-card-button" onClick={editedCard}>Save Changes</button>
                </>
            )}
            <div className="card-container">
                <button className="edit-button" onClick={editClick}>Edit</button>
                <button className="delete-button" onClick={deletedCard}>Delete</button>
            </div>
        </div>
    )
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
};

export default Card;
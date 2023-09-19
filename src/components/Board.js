import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './Board.css';

const Board = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const deletedBoard = () => {
        props.deleteBoard(props.id);
    };

    const editedBoard = () => {
        const updatedData = {title: title, description: description};
        props.editBoard(props.id, updatedData);
        setEditing(false);
    };

    const editClick = () => {
        setEditing(true);
    };

    const showCards = () => {
        props.getAllCards(props.id);
    };

    return (
        <div className="board-container">
            <div className='board'></div>
            <h2 className='board-title'>{props.title}</h2>
            <p className='board-description'>{props.description}</p>
            {isEditing && (
                <div className='edit-fields'>
                    <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                    <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                    <button className="edit-button" onClick={editedBoard}>Save Changes</button>
                </div>
            )}
            <div className="button-container">
                <button className="delete-button" onClick={deletedBoard}>Delete</button>
                <button className="edit-button" onClick={editClick}>Edit</button>
            </div>
            <div className='show-cards-button-container'>
                <button className='show-cards-button' onClick={showCards}>Show Cards</button>
            </div>
        </div>
    )
}; 

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    editBoard: PropTypes.func.isRequired,
    getAllCards: PropTypes.func.isRequired,
};

export default Board;
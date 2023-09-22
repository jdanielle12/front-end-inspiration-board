import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import NewCard from './NewCard';
import './Board.css';

const Board = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [cardDisplay, setCardDisplay] = useState(false);
    const [addingCard, setAddingCard] = useState(false);

    let boardContainerClass = cardDisplay? "one-board-container": "board-container";
    let showCardsButtonClass = cardDisplay? "show-cards-home-button": "show-cards-button";

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
        if (cardDisplay){
            props.disappearCards(props.id);
        } else {
            props.getAllCards(props.id);
        };
        console.log(boardContainerClass);
        console.log(cardDisplay);
        setCardDisplay(!cardDisplay);
    };

    const addCardButton = () => {
        setAddingCard(!addingCard);
    };

    return (
        <div className={`${boardContainerClass}`}>
            <div className='board'>
                <h2 className='board-title'>{props.title}</h2>
                <p className='board-description'>{props.description}</p>
                {isEditing && (
                    <div className='edit-fields'>
                        <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                        <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                        <button className="edit-board-button" onClick={editedBoard}></button>
                    </div>
                )}
            </div>
            <div className='all-board-buttons'>
                <div className="button-container">
                    <button className="board-delete-button" onClick={deletedBoard}></button>
                    <button className="board-edit-button" onClick={editClick}></button>
                </div>
                <div className='show-cards-button-container'>
                    <button className={`${showCardsButtonClass}`} onClick={showCards}></button>
                    {cardDisplay && 
                    <select className='card-sort-button' name="cards" id="card-select" onChange={(event) => {props.sortCards(event.target.value)}}>
                        <option className='sort-option-button' value={"asc"}>Title A-Z</option>
                        <option className='sort-option-button' value={"desc"}>Title Z-A</option>
                        <option className='sort-option-button' value={"highestlikes"}>Most Liked</option>
                    </select>}
                    {cardDisplay && 
                    <button className='add-card-button' onClick={addCardButton}></button>}
                    {addingCard && <NewCard 
                    addNewCard={props.addNewCard}/>}
                </div>
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
    addNewCard: PropTypes.func.isRequired,
    sortCards: PropTypes.func.isRequired,
    disappearCards: PropTypes.func.isRequired,
};

export default Board;
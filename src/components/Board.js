import React from 'react';
import PropTypes from 'prop-types';

const Board = (props) => {
    const deletedBoard = () => {
        props.deleteBoard(props.id)
    };
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <div className="delete-button">
                <button onClick={deletedBoard}>Delete</button>
            </div>
        </div>
    )
}; 

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deleteBoard: PropTypes.func.isRequired,
};

export default Board;
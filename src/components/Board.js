import React from 'react';
import PropTypes from 'prop-types';

const Board = (props) => {
    console.log(props.id);
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    )
}; 

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Board;
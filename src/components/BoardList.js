import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = (props) => {
    console.log(props.boards);
    return (
        <ul>
            {props.boards.map((board) => (
                <Board
                key={board.id}
                id={board.id}
                title={board.title}
                description={board.description}
                />
            ))}
        </ul>
    )
};

BoardList.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default BoardList;
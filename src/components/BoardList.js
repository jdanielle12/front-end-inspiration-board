import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import './BoardList.css';

const BoardList = (props) => {
    return (
        <ul className='board-list'>
            {props.boards.map((board) => (
                <Board
                key={board.id}
                id={board.id}
                title={board.title}
                description={board.description}
                deleteBoard={props.deleteBoard}
                editBoard={props.editBoard}
                getAllCards={props.getAllCards}
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
    deleteBoard: PropTypes.func.isRequired,
    editBoard: PropTypes.func.isRequired,
    getAllCards: PropTypes.func.isRequired,
};

export default BoardList;
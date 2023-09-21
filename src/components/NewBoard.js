import React, { useState } from "react";
import PropTypes from 'prop-types';
import './NewBoard.css';

const NewBoard = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const sumbitFormData = (event) => {
        event.preventDefault();
        props.addNewBoard(formData);
        setFormData({
            title: '',
            description: ''})
        
    };

    const onFormChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    return (
        <form onSubmit={sumbitFormData}>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" value={formData.title} onChange={onFormChange}></input>
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" value={formData.description} onChange={onFormChange}></input>
            </div>
            <button className="new-board-submit-button" type="submit"></button>
        </form>
    );
};

NewBoard.propTypes = {
    addNewBoard: PropTypes.func.isRequired
};

export default NewBoard;
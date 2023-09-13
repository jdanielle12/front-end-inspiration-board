import React, { useState } from "react";
import PropTypes from 'prop-types';

const NewBoard = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const sumbitFormData = (event) => {
        event.preventDefault();
        console.log(formData);
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
                <label htmlFor="title">Enter your title:</label>
                <input type="text" name="title" value={formData.title} onChange={onFormChange}></input>
            </div>
            <div>
                <label htmlFor="description">Enter your description:</label>
                <input type="text" name="description" value={formData.description} onChange={onFormChange}></input>
            </div>
            <button type="submit">That's all folks!</button>
        </form>
    );
};

NewBoard.propTypes = {
    addNewBoard: PropTypes.func.isRequired
};

export default NewBoard;
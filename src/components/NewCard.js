import React, {useState} from "react";
import PropTypes from 'prop-types';

const NewCard = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    
    const sumbitFormData = (event) => {
        event.preventDefault();
        props.addNewCard(formData);
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
            <button type="submit">Submit Card</button>
        </form>
    );
};

NewCard.propTypes = {
    addNewCard: PropTypes.func.isRequired,
};

export default NewCard;
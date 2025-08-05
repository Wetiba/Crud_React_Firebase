import React, { useState, useEffect } from 'react';

const ItemForm = ({ addOrEdit, currentItem }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (currentItem) setName(currentItem.name);
    }, [currentItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() !== '') {
            addOrEdit({ name });
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter item name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" type="submit">
                {currentItem ? 'Update' : 'Add'}
            </button>
        </form>
    );
};

export default ItemForm;

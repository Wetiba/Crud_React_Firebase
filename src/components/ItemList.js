import React from 'react';

const ItemList = ({ items, onEdit, onDelete }) => (
    <ul className="list-group">
        {items.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.name}</span>
                <div>
                    <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => onEdit(item)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(item.id)}
                    >
                        Delete
                    </button>
                </div>
            </li>
        ))}
    </ul>
);

export default ItemList;

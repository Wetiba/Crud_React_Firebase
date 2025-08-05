import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(null);
    const [itemName, setItemName] = useState('');
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const navigate = useNavigate();

    const itemsCollection = collection(db, 'items');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) navigate('/login');
            else setUser(currentUser);
        });
        return () => unsub();
    }, [navigate]);

    useEffect(() => {
        const unsub = onSnapshot(itemsCollection, (snapshot) => {
            setItems(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
        return () => unsub();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (itemName.trim() === '') return;

        if (editItem) {
            const docRef = doc(db, 'items', editItem.id);
            await updateDoc(docRef, { name: itemName });
            setEditItem(null);
        } else {
            await addDoc(itemsCollection, { name: itemName });
        }
        setItemName('');
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'items', id));
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setItemName(item.name);
    };

    const logout = () => {
        signOut(auth);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-3">
                <h4>Welcome, {user?.email}</h4>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>

            <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter item"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">
                        {editItem ? "Update" : "Add"}
                    </button>
                </div>
            </form>

            <ul className="list-group">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {item.name}
                        <div>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEdit(item)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;

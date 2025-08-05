import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const itemsCollection = collection(db, 'items');

  useEffect(() => {
    const unsubscribe = onSnapshot(itemsCollection, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  const addOrEdit = async (item) => {
    if (currentItem) {
      await updateDoc(doc(db, 'items', currentItem.id), item);
      setCurrentItem(null);
    } else {
      await addDoc(itemsCollection, item);
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  const editItem = (item) => {
    setCurrentItem(item);
  };

  return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Firebase CRUD App (Bootstrap UI)</h2>
        <ItemForm addOrEdit={addOrEdit} currentItem={currentItem} />
        <ItemList items={items} onEdit={editItem} onDelete={deleteItem} />
      </div>
  );
}

export default App;

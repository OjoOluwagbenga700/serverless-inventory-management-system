// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import InventoryDetails from './components/InventoryDetails';
import { fetchItems, fetchItem, createItem, updateItem, deleteItem } from './services/api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all inventory items on component mount
  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchItems();
      setItems(data.items || []);
    } catch (err) {
      setError('Failed to fetch inventory items. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectItem = async (itemId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchItem(itemId);
      setSelectedItem(data.item);
    } catch (err) {
      setError('Failed to fetch item details. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateItem = async (itemData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createItem(itemData);
      setIsFormOpen(false);
      fetchInventoryItems();
      setSelectedItem(response.item);
    } catch (err) {
      setError('Failed to create item. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateItem = async (itemData) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateItem(itemData);
      setIsFormOpen(false);
      setIsEditing(false);
      fetchInventoryItems();
      const refreshedItem = await fetchItem(itemData.itemId);
      setSelectedItem(refreshedItem.item);
    } catch (err) {
      setError('Failed to update item. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    setIsLoading(true);
    setError(null);
    try {
      await deleteItem(itemId);
      fetchInventoryItems();
      setSelectedItem(null);
    } catch (err) {
      setError('Failed to delete item. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditForm = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  return (
    <div className="app">
      <Header 
        onAddNewClick={() => {
          setSelectedItem(null);
          setIsEditing(false);
          setIsFormOpen(true);
        }}
      />
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="content">
        <InventoryList 
          items={items} 
          isLoading={isLoading} 
          onSelect={handleSelectItem}
          selectedItemId={selectedItem?.itemId}
        />
        
        {selectedItem && !isFormOpen && (
          <InventoryDetails 
            item={selectedItem} 
            onEdit={() => openEditForm(selectedItem)} 
            onDelete={() => handleDeleteItem(selectedItem.itemId)} 
          />
        )}
        
        {isFormOpen && (
          <InventoryForm 
            item={isEditing ? selectedItem : null}
            isEditing={isEditing}
            onSubmit={isEditing ? handleUpdateItem : handleCreateItem}
            onCancel={() => setIsFormOpen(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;


// src/services/api.js
// API Gateway integration layer

const API_ENDPOINT = 'https://bh3n53cbx8.execute-api.us-east-1.amazonaws.com';

// Fetch all inventory items
export async function fetchItems() {
  try {
    const response = await fetch(`${API_ENDPOINT}/items`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

// Fetch a single inventory item
export async function fetchItem(itemId) {
  try {
    const response = await fetch(`${API_ENDPOINT}/items?itemId=${itemId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching item ${itemId}:`, error);
    throw error;
  }
}

// Create a new inventory item
export async function createItem(itemData) {
  try {
    const response = await fetch(`${API_ENDPOINT}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}

// Update an existing inventory item
export async function updateItem(itemData) {
  try {
    const response = await fetch(`${API_ENDPOINT}/items`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating item ${itemData.itemId}:`, error);
    throw error;
  }
}

// Delete an inventory item
export async function deleteItem(itemId) {
  try {
    const response = await fetch(`${API_ENDPOINT}/items?itemId=${itemId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting item ${itemId}:`, error);
    throw error;
  }
}
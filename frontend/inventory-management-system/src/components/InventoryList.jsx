import React from 'react';

function InventoryList({ items, isLoading, onSelect, selectedItemId }) {
  if (isLoading && items.length === 0) {
    return <div className="inventory-list loading">Loading inventory...</div>;
  }

  return (
    <div className="inventory-list">
      <h2>Inventory Items</h2>
      {items.length === 0 ? (
        <p>No inventory items found.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li 
              key={item.itemId} 
              className={selectedItemId === item.itemId ? 'selected' : ''}
              onClick={() => onSelect(item.itemId)}
            >
              <div className="item-header">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
              </div>
              {item.category && (
                <div className="item-category">{item.category}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InventoryList;
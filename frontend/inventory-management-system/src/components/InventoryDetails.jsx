import React from 'react';

function InventoryDetails({ item, onEdit, onDelete }) {
  return (
    <div className="inventory-details">
      <h2>Item Details</h2>
      <div className="details-content">
        {item.imageUrl && (
          <div className="item-image">
            <img src={item.imageUrl} alt={item.name} />
          </div>
        )}
        
        <div className="detail-row">
          <span className="detail-label">ID:</span>
          <span className="detail-value">{item.itemId}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{item.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Description:</span>
          <span className="detail-value">{item.description || 'N/A'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Quantity:</span>
          <span className="detail-value">{item.quantity}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Price:</span>
          <span className="detail-value">${parseFloat(item.price).toFixed(2)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Category:</span>
          <span className="detail-value">{item.category || 'N/A'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Created:</span>
          <span className="detail-value">
            {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Updated:</span>
          <span className="detail-value">
            {new Date(item.updatedAt).toLocaleDateString()} {new Date(item.updatedAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
      <div className="details-actions">
        <button className="edit-button" onClick={onEdit}>Edit</button>
        <button className="delete-button" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default InventoryDetails;
// src/components/Header.jsx
import React from 'react';

function Header({ onAddNewClick }) {
  return (
    <header className="header">
      <h1>Inventory Management System</h1>
      <button className="add-button" onClick={onAddNewClick}>Add New Item</button>
    </header>
  );
}

export default Header;

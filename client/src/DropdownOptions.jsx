import React from 'react';

function DropdownOptions({ onDelete, onFinish, onEdit }) {
  return (
    <div className="dropdown-options">
      <button onClick={onDelete}>Delete</button>
      <button onClick={onFinish}>Finish</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}

export default DropdownOptions;
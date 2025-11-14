// src/features/table/components/SaveButton.jsx
import React from 'react';

function SaveButton({ onSave, disabled }) {
  return (
    <button
      type="button"
      className="table-save-button"
      onClick={onSave}
      disabled={disabled}
    >
      Save
    </button>
  );
}

export default SaveButton;

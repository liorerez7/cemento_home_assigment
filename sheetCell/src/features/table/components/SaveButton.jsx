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

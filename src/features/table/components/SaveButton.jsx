/**
 * Simple save button used in the table toolbar.
 *
 * @param {{
 *   onSave: () => void,
 *   disabled: boolean
 * }} props
 */

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

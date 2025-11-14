function SelectCellView({ value }) {
  const text = value == null ? "" : String(value);

  return (
    <span className="cell-select" title={text}>
      {text}
    </span>
  );
}

export default SelectCellView;

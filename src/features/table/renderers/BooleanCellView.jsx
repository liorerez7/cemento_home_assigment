function BooleanCellView({ value }) {
  const isTrue = Boolean(value);
  const label = isTrue ? "True" : "False";

  return (
    <span
      className="cell-boolean"
      aria-label={label}
    >
      {label}
    </span>
  );
}

export default BooleanCellView;

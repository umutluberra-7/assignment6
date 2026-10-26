function FilterForm({ value, onChange }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="filter">Filter by title: </label>
      <input
        id="filter"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type to filter..."
      />
    </form>
  );
}

export default FilterForm;

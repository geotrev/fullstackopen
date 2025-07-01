export const PersonForm = ({ newPerson, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(newPerson).map((fieldKey) => (
        <div key={fieldKey}>
          {fieldKey}:{" "}
          <input
            type={fieldKey === "number" ? "tel" : "text"}
            name={fieldKey}
            required
            value={newPerson[fieldKey]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

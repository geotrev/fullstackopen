export const Form = ({ searchValue, message, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Find countries:{" "}
        <input
          required
          type="text"
          aria-describedby={message ? "message" : undefined}
          value={searchValue}
          onChange={onChange}
        />
      </label>
      <button type="submit">search</button>
      {message && <p id="message">{message}</p>}
    </form>
  );
};

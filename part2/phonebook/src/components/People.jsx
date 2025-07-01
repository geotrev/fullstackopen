const PeopleList = ({ people, handleDeleteClick }) => {
  return (
    <table>
      <tbody>
        {people.map((person) => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button type="button" onClick={() => handleDeleteClick(person)}>
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const People = ({ people, searchValue, handleDeleteClick }) => {
  const visiblePeople = searchValue
    ? people.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : people;

  return (
    <PeopleList people={visiblePeople} handleDeleteClick={handleDeleteClick} />
  );
};

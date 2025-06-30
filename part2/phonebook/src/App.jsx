import { useState } from "react";

const PeopleList = ({ persons }) => {
  return persons.map((person) => (
    <div key={person.name}>
      {Object.keys(person).map((key) => (
        <span key={key}>{person[key]} </span>
      ))}
    </div>
  ));
};

const People = ({ persons, searchValue }) => {
  const visiblePeople = searchValue
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : persons;

  return <PeopleList persons={visiblePeople} />;
};

const PersonForm = ({ newPerson, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(newPerson).map((fieldKey) => (
        <div key={fieldKey}>
          {fieldKey}:{" "}
          <input
            type={fieldKey === "number" ? "tel" : "text"}
            name={fieldKey}
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

const Filter = ({ searchValue, handleSearchChange }) => {
  return (
    <div>
      Filter people by name:{" "}
      <input
        type="search"
        name="filter"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = newPerson.name.trim();

    if (persons.find((person) => person.name === name)) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    setPersons((people) => [...people, { ...newPerson }]);
    setNewPerson({ name: "", number: "" });
  };

  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <h3>Add a new person</h3>
      <PersonForm
        newPerson={newPerson}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <People persons={persons} searchValue={searchValue} />
    </div>
  );
};

export default App;

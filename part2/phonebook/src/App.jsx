import { useState, useEffect } from "react";
import axios from "axios";

const PeopleList = ({ people }) => {
  return people.map((person) => (
    <div key={person.name}>
      {Object.keys(person).map((key) => (
        <span key={key}>{person[key]} </span>
      ))}
    </div>
  ));
};

const People = ({ people, searchValue }) => {
  const visiblePeople = searchValue
    ? people.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : people;

  return <PeopleList people={visiblePeople} />;
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
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = newPerson.name.trim();

    if (people.find((person) => person.name === name)) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    setPeople((people) => [...people, { ...newPerson }]);
    setNewPerson({ name: "", number: "" });
  };

  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/people").then((response) => {
      setPeople(response.data);
    });
  }, []);
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
      <People people={people} searchValue={searchValue} />
    </div>
  );
};

export default App;

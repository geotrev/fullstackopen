import { useState, useEffect } from "react";
import peopleApi from "./api/peopleApi";

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

const People = ({ people, searchValue, handleDeleteClick }) => {
  const visiblePeople = searchValue
    ? people.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : people;

  return (
    <PeopleList people={visiblePeople} handleDeleteClick={handleDeleteClick} />
  );
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

  const confirmUpdate = (name) => {
    const confirmed = window.confirm(
      `Do you want to update the details for ${name}?`
    );
    return confirmed;
  };

  const handleUpdate = (person) => {
    const updatedPerson = { ...person, number: newPerson.number };

    peopleApi
      .updatePerson(person.id, updatedPerson)
      .then((updatedPerson) => {
        setPeople((people) =>
          people.map((p) => (p.id === person.id ? updatedPerson : p))
        );
        setNewPerson({ name: "", number: "" });
      })
      .catch((error) => {
        console.error("Error updating person:", error);
        alert(`Failed to update ${person.name}. Please try again later.`);
      });
  };

  const handleDeleteClick = (person) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${person.name}?`
    );

    if (!confirmed) return;

    peopleApi
      .removePerson(person.id)
      .then(() => {
        setPeople((people) => people.filter((p) => p.id !== person.id));
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
        alert(`Failed to delete ${person.name}. Please try again later.`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPerson = people.find((p) => p.name === newPerson.name.trim());

    if (existingPerson) {
      if (confirmUpdate(newPerson.name.trim())) {
        handleUpdate(existingPerson);
      }

      return;
    }

    peopleApi
      .addPerson(newPerson)
      .then((addedPerson) => {
        setPeople((people) => [...people, addedPerson]);
        setNewPerson({ name: "", number: "" });
      })
      .catch((error) => {
        console.error("Error adding person:", error);
        alert("Failed to add new person. Please try again later.");
      });
  };

  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    peopleApi.getAll().then((data) => setPeople(data));
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
      <People
        people={people}
        searchValue={searchValue}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import peopleApi from "./api/peopleApi";
import { People } from "./components/People";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Notification } from "./components/Notification";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState({
    type: "info",
    message: "",
  });

  const setTimedNotification = ({ message, type = "info" }) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

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
        setTimedNotification({
          type: "success",
          message: `Updated ${person.name}'s number.`,
        });
      })
      .catch((error) => {
        console.error("Error updating person:", error);
        setNotification({
          type: "error",
          message: `${person.name} has been removed.`,
        });
        setPeople((people) => people.filter((p) => p.id !== person.id));
        setNewPerson({ name: "", number: "" });
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
        setNotification({
          type: "error",
          message: `${person.name} has already been removed.`,
        });
        setPeople((people) => people.filter((p) => p.id !== person.id));
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
        setTimedNotification({
          type: "success",
          message: `Added ${addedPerson.name}.`,
        });
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
      {notification.message && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
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

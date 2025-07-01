import { useState, useCallback } from "react";
import countriesApi from "./api/countriesApi";
import { filterCountries } from "./helpers";
import { Countries } from "./components/Countries";
import { Form } from "./components/Form";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!searchValue) {
        setMessage("Please enter a search term");
        return;
      }

      setMessage("Loading...");
      setCountries([]);

      countriesApi.getAll().then((data) => {
        const matches = filterCountries(data, searchValue);

        if (matches?.length > 10) {
          setMessage("Too many matches, specify another filter");
          return;
        } else if (matches.length === 0) {
          setMessage("No countries found");
          return;
        }

        setCountries(matches);
        setMessage("");
      });
    },
    [searchValue]
  );

  return (
    <>
      <Form
        searchValue={searchValue}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {countries.length > 0 && <Countries countries={countries} />}
    </>
  );
}

export default App;

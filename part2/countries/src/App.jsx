import { useState } from "react";
import countriesApi from "./api/countriesApi";
import { filterCountries } from "./helpers";

const CountryList = ({ countries, setActiveCountry }) => {
  return (
    <table>
      <tbody>
        {countries.map((country) => (
          <tr key={country.name.common}>
            <td>{country.name.common}</td>
            <td>
              <button type="button" onClick={() => setActiveCountry(country)}>
                Show
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Country = ({ data, isList, setActiveCountry }) => {
  if (!data) return null;

  return (
    <div>
      {isList && (
        <button type="button" onClick={() => setActiveCountry(null)}>
          Back to list
        </button>
      )}
      <h2>{data.name.common}</h2>
      <p>Capital: {data.capital}</p>
      <p>Area: {data.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(data.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <h3>Flag:</h3>
      <img src={data.flags.png} alt={data.flags.alt} />
    </div>
  );
};

const Countries = ({ countries }) => {
  const isSingleCountry = countries.length === 1;
  const [activeCountry, setActiveCountry] = useState(
    isSingleCountry ? countries[0] : null
  );

  return activeCountry ? (
    <Country
      data={activeCountry}
      isList={countries.length > 1}
      setActiveCountry={setActiveCountry}
    />
  ) : (
    <CountryList countries={countries} setActiveCountry={setActiveCountry} />
  );
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesOverload, setCountriesOverload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchValue) {
      setMessage("Please enter a search term");
      return;
    }

    setMessage("");
    setLoading(true);
    setCountriesOverload(false);
    setCountries([]);

    countriesApi.getAll().then((data) => {
      const matches = filterCountries(data, searchValue);

      if (matches?.length > 10) {
        setCountriesOverload(true);
        setLoading(false);
        return;
      } else if (matches.length === 0) {
        setLoading(false);
        setMessage("No countries found");
        return;
      }

      setCountries(matches);
      setLoading(false);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          find countries:{" "}
          <input
            required
            type="text"
            aria-describedby={message ? "message" : undefined}
            value={searchValue}
            onChange={handleChange}
          />
        </label>
        <button type="submit">search</button>
        {message && <p id="message">{message}</p>}
      </form>
      {loading && <p>Loading...</p>}
      {countriesOverload && <p>Too many matches, specify another filter</p>}
      {countries.length > 0 && <Countries countries={countries} />}
    </>
  );
}

export default App;

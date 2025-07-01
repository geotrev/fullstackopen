import { useCallback, useState } from "react";
import { Weather } from "./Weather";

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

const Country = ({ country, isList, setActiveCountry }) => {
  const handleBackClick = useCallback(() => {
    setActiveCountry(null);
  }, [setActiveCountry]);

  if (!country) return null;

  return (
    <div>
      {isList && (
        <button type="button" onClick={handleBackClick}>
          Back to list
        </button>
      )}
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <h3>Flag:</h3>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather country={country} />
    </div>
  );
};

export const Countries = ({ countries }) => {
  const isSingleCountry = countries.length === 1;
  const [activeCountry, setActiveCountry] = useState(
    isSingleCountry ? countries[0] : null
  );

  return activeCountry ? (
    <Country
      country={activeCountry}
      isList={countries.length > 1}
      setActiveCountry={setActiveCountry}
    />
  ) : (
    <CountryList countries={countries} setActiveCountry={setActiveCountry} />
  );
};

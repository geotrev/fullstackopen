export const filterCountries = (countries, searchTerm) => {
  if (!searchTerm) return countries;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return countries.filter((country) =>
    country.name.common.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

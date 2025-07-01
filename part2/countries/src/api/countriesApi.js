const getAll = async () => {
  return fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      alert("Failed to fetch countries. Please try again.");
    });
};

export default {
  getAll,
};

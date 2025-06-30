import axios from "axios";

const getAll = async () => {
  return axios
    .get("http://localhost:3001/people")
    .then((response) => response.data);
};

const addPerson = async (person) => {
  return axios
    .post("http://localhost:3001/people", person)
    .then((response) => response.data);
};

const updatePerson = async (id, person) => {
  return axios
    .put(`http://localhost:3001/people/${id}`, person)
    .then((response) => response.data);
};

const removePerson = async (id) => {
  return axios
    .delete(`http://localhost:3001/people/${id}`)
    .then((response) => response.data);
};

export default {
  getAll,
  addPerson,
  updatePerson,
  removePerson,
};

import axios from "axios";

const BASE_URL = "/api/persons";

const getAll = async () => {
  return axios.get(BASE_URL).then((response) => response.data);
};

const addPerson = async (person) => {
  return axios.post(BASE_URL, person).then((response) => response.data);
};

const updatePerson = async (id, person) => {
  return axios
    .put(`${BASE_URL}/${id}`, person)
    .then((response) => response.data);
};

const removePerson = async (id) => {
  return axios
    .delete(`${BASE_URL}/persons/${id}`)
    .then((response) => response.data);
};

export default {
  getAll,
  addPerson,
  updatePerson,
  removePerson,
};

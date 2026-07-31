import axios from "axios";

const dbURL = "http://localhost:5000/users";

export const contactAPI = {
  getAll: () => axios.get(dbURL),
  delete: (id) => axios.delete(`${dbURL}/${id}`),
  create: (newUser) => axios.post(dbURL, newUser),
  update: (updatedUser) => axios.put(`${dbURL}/${updatedUser.id}`, updatedUser),
};
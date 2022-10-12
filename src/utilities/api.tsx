import axios from "axios";

const API = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;

import axios from "axios";

const instance = axios.create({
  baseURL: "https://zona-nulis-api.herokuapp.com/api/v1",
  withCredentials: true,
});

export default instance;

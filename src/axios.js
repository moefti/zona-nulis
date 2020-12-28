import axios from "axios";

let instance;
if (process.env.NODE_ENV === "development") {
  instance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
  });
} else if (process.env.NODE_ENV === "production") {
  instance = axios.create({
    baseURL: "https://zona-nulis-api.herokuapp.com/api/v1",
    withCredentials: true,
  });
}

export default instance;

import axios from "axios";

const Server = axios.create({
  baseURL: "http://localhost:3006/api/v1",
});

export default Server;

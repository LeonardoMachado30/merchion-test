import axios from "axios";

axios.defaults.headers.common["Accept"] = "application/json";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // Ajuste conforme necessário
});

export default api;

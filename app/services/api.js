import axios from "axios";

const API = axios.create({
 baseURL: "https://product-list-backend-en8c.onrender.com/api"
});

export default API;
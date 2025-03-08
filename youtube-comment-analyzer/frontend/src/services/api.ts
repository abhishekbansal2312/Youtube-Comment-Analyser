import axios from "axios";

const api = axios.create({
  baseURL:
    "https://youtube-comment-analyser.onrender.com/api" ||
    "http://localhost:5001/api",
});

export default api;

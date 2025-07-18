import axios from "axios";

// base url to make requests to the movie database //
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 10000, // 10 second timeout
});

export default instance;
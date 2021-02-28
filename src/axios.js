import axios from "axios";

// Base url to make requests to the movie database
// can only have 1 default export in a file, but several ones. 

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;
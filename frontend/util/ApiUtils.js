import axios from "axios";

export const retrieveQuotes = async () => {
    return axios
        .get("http://localhost:5173/api/quote?dayRange=365")
        .catch((error) => {
            console.error("Error fetching quotes", error);
        });
};


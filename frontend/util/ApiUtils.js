import axios from "axios";

export const retrieveQuotes = async (dateRange) => {
    return axios
        .get(`http://localhost:5173/api/quote?dayRange=${dateRange}`)
        .catch((error) => {
            console.error("Error fetching quotes", error);
        });
};


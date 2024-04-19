import axios from "axios";

export const retrieveQuotes = async (dateRange) => {
    return axios
        .get(`http://localhost:5173/api/quote?dayRange=${dateRange}`)
        .catch((error) => {
            console.error("Error fetching quotes", error);
        });
};

export const addQuote = async (name, message) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);

    return axios
        .post(`http://localhost:5173/api/quote`, formData)
        .catch((error) => {
            console.error("Error adding quote", error);
        });
}


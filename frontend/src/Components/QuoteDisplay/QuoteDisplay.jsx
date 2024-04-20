import React, { useState, useCallback, useEffect } from "react";
import "./QuoteDisplay.css";
import { retrieveQuotes } from "../../../util/ApiUtils";
import Quote from "../Quote/Quote";

function QuoteDisplay() {
    const [dateRange, setDateRange] = useState("all");

    useEffect(() => {
        console.log(dateRange);
        handleRetrieveQuotes();
    }, []);

    const handleRetrieveQuotes = async () => {
		console.log(dateRange);
		retrieveQuotes(dateRange).then((response) => {
			console.log(response.data);
		});
	};
    
	const handleDateChange = useCallback((event) => {
		const filter = event.target.value;
		setDateRange(filter);
	});
	
    return (
        <div>
            <select onChange={handleDateChange} value={dateRange}>
                <option value="all">All</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
            </select>
            <Quote />
        </div>
    );
};

export default QuoteDisplay;
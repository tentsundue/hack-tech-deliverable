import React, { useState, useCallback, useEffect } from "react";
import "./QuoteDisplay.css";
import { retrieveQuotes } from "../../../util/ApiUtils";
import Quote from "../Quote/Quote";

function QuoteDisplay({
    allQuotes
}){
    const [dateRange, setDateRange] = useState("all");
    const [currentQuotes, setCurrentQuotes] = useState(allQuotes);

    useEffect(() => {
        console.log(dateRange);
        console.log(currentQuotes);
        handleRetrieveQuotes();
    }, [dateRange]);

    const handleRetrieveQuotes = async () => {
		console.log(dateRange);
		retrieveQuotes(dateRange).then((response) => {
			console.log(response.data);
            setCurrentQuotes(response.data);
		});
	};
    
	const handleDateChange = useCallback((event) => {
		const filter = event.target.value;
		setDateRange(filter);
	});
	
    return (
        <div>
            <select className="filter" onChange={handleDateChange} value={dateRange}>
                <option value="all">All</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
            </select>

            {currentQuotes.map((quote, index) => {
                return (
                    <Quote
                    key={index}
                    name={quote.name}
                    message={quote.message}
                    date={quote.time}
                    />
                )
            })}
            <Quote />
        </div>
    );
};

export default QuoteDisplay;
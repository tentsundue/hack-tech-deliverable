import React, { useState, useEffect } from "react";
import "./App.css";
import { ChakraProvider } from '@chakra-ui/react'
import { retrieveQuotes } from "../util/ApiUtils";

function App() {
	const [dateRange, setDateRange] = useState();
	
	useEffect(() => {
		if (dateRange) {
			displayQuotes();
		}
	}, [dateRange]);

	const handleDateChange = (event) => {
		const filter = event.target.value;
		setDateRange(filter);
	}

	const displayQuotes = async () => {
		console.log(dateRange);
		retrieveQuotes(dateRange).then((response) => {
			console.log(response.data);
		});
	};

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input 
					type="text" 
					name="name" 
					id="input-name"
					required 
				/>

				<label htmlFor="input-message">Quote</label>
				<input 
					type="text" 
					name="message" 
					id="input-message" 
					required
				/>

				<button 
					type="submit"
				>
					Submit
				</button>

				<select onChange={handleDateChange}>
					<option value="all">All</option>
					<option value="week">Last Week</option>
					<option value="month">Last Month</option>
					<option value="year">Last Year</option>
				</select>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<div className="messages">
				<p>Peter Anteater</p>
				<p>Zot Zot Zot!</p>
				<p>Every day</p>
			</div>
		</div>
	);
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { retrieveQuotes, addQuote } from "../util/ApiUtils";
import quotebooklogo from "../src/images/quotebook.png";

function App() {
	const [dateRange, setDateRange] = useState("all");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);

	useEffect(() => {
		if (dateRange) {
			displayQuotes();
		}
		if (name && message) {
			setCanSubmit(true); // enable the submit button if both fields are filled
		}

		if (!name || !message) {
			setCanSubmit(false); // disable the submit button if either field is empty
		}

	}, [dateRange, name, message]);

	const handleDateChange = (event) => {
		const filter = event.target.value;
		setDateRange(filter);
	}
	
	// handles the name input field and updates the name state whenever the field changes
	const handleNameChange = (event) => {
		const name = event.target.value;
		setName(name);
	}

	// handles the message input field and updates the message state whenever the field changes
	const handleMessageChange = (event) => {
		const message = event.target.value;
		setMessage(message);
	}
	const displayQuotes = async () => {
		console.log(dateRange);
		retrieveQuotes(dateRange).then((response) => {
			console.log(response.data);
		});
	};

	// If the name and message fields are filled (canSubmit == true) --> add the quote to the database
	const submitQuote = async () => {
		if (canSubmit) {
			addQuote(name, message).then((response) => {
				console.log(response.data);
			});
		}
	}

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<div className="title">
				<h1>Hack at UCI QuoteBook</h1>
				<img src={quotebooklogo}></img>
			</div>
			<h2>Got something to Share?</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form className="quote-form">
				<label htmlFor="input-name"></label>
				<input
					type="text" 
					name="name" 
					placeholder="Name"
					id="input-name"
					onChange={handleNameChange}
					required 
				/>

				<label htmlFor="input-message"></label>
				<input 
					type="text" 
					name="message" 
					id="input-message"
					placeholder="Message"
					onChange={handleMessageChange}
					required
				/>

				<button 
					id="submit-button"
					type="submit"
					disabled={!canSubmit}
					onClick={submitQuote}
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

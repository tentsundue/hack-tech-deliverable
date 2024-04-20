import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { retrieveQuotes, addQuote } from "../util/ApiUtils";
import quotebooklogo from "../src/images/quotebook.png";
import QuoteDisplay from "../src/Components/QuoteDisplay/QuoteDisplay"

function App() {
	const [dateRange, setDateRange] = useState("all");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);

	useEffect(() => {
		// if (dateRange) {
		// 	displayQuotes();
		// }

		if (name && message) {
			setCanSubmit(true); // enable the submit button if both fields are filled
		}

		if (!name || !message) {
			setCanSubmit(false); // disable the submit button if either field is empty
		}

	}, [dateRange, name, message]);
	
	// handles the name input field and updates the name state whenever the field changes
	const handleNameChange = useCallback((event) => {
		const name = event.target.value;
		setName(name);
	});

	// handles the message input field and updates the message state whenever the field changes
	const handleMessageChange = useCallback((event) => {
		const message = event.target.value;
		setMessage(message);
	});


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
			<h2>Got Something to Share?</h2>
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
			</form>

			<div className="divider"></div>
			<h2>What Others Have Been Saying...</h2>
			
			<QuoteDisplay />
			{/* TODO: Display the actual quotes from the database */}

		</div>
	);
}

export default App;

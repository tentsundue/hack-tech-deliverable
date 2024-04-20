import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { retrieveQuotes, addQuote } from "../util/ApiUtils";
import quotebooklogo from "../src/images/quotebook.png";
import QuoteDisplay from "../src/Components/QuoteDisplay/QuoteDisplay"

function App() {
	// const [dateRange, setDateRange] = useState("all");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);
	const [allQuotes, setAllQuotes] = useState([]);

	useEffect(() => {
		if (name && message) {
			setCanSubmit(true); // enable the submit button if both fields are filled
		}

		if (!name || !message) {
			setCanSubmit(false); // disable the submit button if either field is empty
		}
	}, [name, message]);

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
	// Additionally retrieve the updated list of quotes from the database for the QuoteDisplay component
	const submitQuote = async (event) => {
		event.preventDefault();
		if (canSubmit) {
			addQuote(name, message).then((response) => {
				console.log(response.data);
			});

			retrieveQuotes("all").then((response) => {
				console.log(response.data);
				setAllQuotes(response.data);
			});

			setName("");
			setMessage("");
		}
	}

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<div className="title">
				<h1>Hack at UCI QuoteBook</h1>
				<img src={quotebooklogo}></img>
			</div>
			<h1 className="section-title">Got Something to Share?</h1>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form
				className="quote-form" 
				onSubmit={submitQuote}
			>
				<label htmlFor="input-name"></label>
				<input
					type="text" 
					name="name" 
					placeholder="Name"
					id="input-name"
					value={name}
					onChange={handleNameChange}
					required 
				/>

				<label htmlFor="input-message"></label>
				<input 
					type="text" 
					name="message" 
					id="input-message"
					placeholder="Message"
					value={message}
					onChange={handleMessageChange}
					required
				/>

				<button 
					id="submit-button"
					type="submit"
					disabled={!canSubmit}
					// onClick={submitQuote}
				>
					Submit
				</button>
			</form>

			<div className="divider"></div>
			<h1 className="section-title"> What Others Have Been Saying...</h1>
			
			<QuoteDisplay allQuotes={allQuotes}/>
			{/* TODO: Display the actual quotes from the database */}

		</div>
	);
}

export default App;

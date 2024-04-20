import React from 'react';
import './Quote.css';
import { retrieveQuotes } from "../../../util/ApiUtils"

function Quote({
    name,
    message,
    date
}) {
    const dateConversionOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return (
        <div className="quote-container">
            <div className="quote-name">
                <h2><em>From: </em></h2>
                <h4>{name}</h4>
            </div>
            <div className="quote-message">
                <h3><em>Who Said: </em></h3>
                <h4>{message}</h4>
            </div>
            <div className="quote-date">
                <h4>Posted on - {new Date(date).toLocaleString('en-US', dateConversionOptions)}</h4>
            </div>
        </div>
    );
}

export default Quote;
from datetime import datetime
from typing import TypedDict

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse, JSONResponse

from services.database import JSONDatabase

app = FastAPI()


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@app.on_event("startup")
def on_startup() -> None:
    """Initialize database when starting API server."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []


@app.on_event("shutdown")
def on_shutdown() -> None:
    """Close database when stopping API server."""
    database.close()


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now().replace(microsecond=0)

    quote = Quote(name=name, message=message, time=now.isoformat())
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return JSONResponse(content={"message": "Quote added successfully"}, status_code=status.HTTP_201_CREATED)


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/quote")
def retrieve__message(dayRange: str) -> list[Quote]:
    """
    Retrieve a list of quotes posted within the day range given

    dayRangeFilter: int -> the maximum number of days that the quote was posted
    """
    range_conv = {"week": 7,
                  "month": 30,
                  "year": 365,
                  "all": 100000000
                  }  # dictionary to store the day ranges

    quotes = database["quotes"]  # retrieve all quotes from the database
    dateFilteredQuotes = []

    for quote in quotes:
        post_date = datetime.fromisoformat(quote["time"])
        # retrieve the difference between the current date and the date that the quote was posted
        difference = datetime.now() - post_date

        # Check if the difference is within the specified range, add to returned list of quotes if it is
        if difference.days <= range_conv[dayRange]:
            dateFilteredQuotes.append(quote)

    return dateFilteredQuotes

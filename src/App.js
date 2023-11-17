import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import Eventlist from "./components/Eventlist";
import NumberOfEvents from "./components/NumberOfEvents";
import "./App.css";
import { getEvents, extractLocations } from "./api";

const App = () => {
  const [selectedCity, setSelectedCity] = React.useState("See all cities");
  const [allLocations, setAllLocations] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [eventNumber, setEventNumber] = useState(32);
  const [filteredEvents, setFilteredEvents] = React.useState([]);
  const [noOfEvents, setNoOfEvents] = React.useState(32);
  const [errorAlert, setErrorAlert] = React.useState("");
  const [currentNOE, setCurrentNOE] = useState(32);

  useEffect(() => {
    fetchData();
  }, [selectedCity]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = selectedCity === 'See all cities' ?
    allEvents :
    allEvents.filter(event => event.location === selectedCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  React.useEffect(() => {
    (async () => {
      const allEvents = await getEvents(); // in the future this should be replaced with an api call
      setEvents(allEvents);
      setAllLocations(extractLocations(allEvents));
    })();
  }, []);

  function onEventNumberChange(value, number) {
    setEventNumber(number);
    setNoOfEvents(value);
    handleCitySelected(selectedCity, value, number);
  }

  function handleCitySelected(city, numberOfEvents) {
    setSelectedCity(city);
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const filteredEvents = events.filter((event) => event.location === city);
    let sliced = [];
    if (city === "See all cities") {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      sliced = events.slice(0, numberOfEvents);
    } else {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
      sliced = filteredEvents.slice(0, numberOfEvents);
    }
    setFilteredEvents(sliced);
  };

  return (
    <div className="App">
      <CitySearch
        allLocations={allLocations}
        setSelectedCity={setSelectedCity}
      />
      {/* If the number changes and the event filter is filled */}
      <Eventlist events={filteredEvents.length > 0 ? filteredEvents : events} />
      <NumberOfEvents
        eventNumber={noOfEvents}
        onEventNumberChange={onEventNumberChange}
        setErrorAlert={setErrorAlert}
      />
    </div>
  );
};

export default App;

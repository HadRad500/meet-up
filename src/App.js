import React from "react";
import CitySearch from "./components/CitySearch";
import Eventlist from "./components/Eventlist";
import NumberOfEvents from "./components/NumberOfEvents";
import "./App.css";
import { getEvents, extractLocations } from "./api";

const App = () => {
  const [selectedCity, setSelectedCity] = React.useState("See all cities");
  const [allLocations, setAllLocations] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [filteredEvents, setFilteredEvents] = React.useState([]);
  const [noOfEvents, setNoOfEvents] = React.useState(32);
  const [errorAlert, setErrorAlert] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      setEvents(allEvents.slice(0, 32));
      setAllLocations(extractLocations(allEvents));
    };
    fetchData();
  }, []);

  function onEventNumberChange(value, number) {
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
  }

  return (
    <div className="App">
      <CitySearch
        allLocations={allLocations}
        setSelectedCity={(val) => handleCitySelected(val, noOfEvents)}
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

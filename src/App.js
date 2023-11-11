import React from "react";
import CitySearch from "./components/CitySearch";
import Eventlist from "./components/Eventlist";
import "./App.css";
import { getEvents, extractLocations } from "./api";

const App = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const allEvents = await getEvents();
      setEvents(allEvents);
    })();
  }, []);

  return (
    <div className="App">
      <CitySearch allLocations={extractLocations(events)} />
      <Eventlist events={events} />
    </div>
  );
};

export default App;

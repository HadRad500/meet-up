import Eventlist from "./Eventlist";

const Event = ({ event }) => {
  return <li>{event.summary}</li>;
};

export default Event;

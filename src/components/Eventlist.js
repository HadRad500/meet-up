import Event from "./Event";

const Eventlist = ({ events }) => {
  return (
    <ul id="event-list">
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default Eventlist;

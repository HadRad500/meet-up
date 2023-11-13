import React from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  function toggleDetails() {
    setShowDetails(!showDetails);
  }
  return (
    <li>
      <div className="event">
        <h2 style={{ color: "#1e847f" }}>{event.summary}</h2>
        <div className="location">{event.location} </div>
        <div className="dateTime">{event.start.dateTime}</div>
        {showDetails && <div className="description">{event.description}</div>}
        <button className="details-btn" onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
    </li>
  );
};

export default Event;

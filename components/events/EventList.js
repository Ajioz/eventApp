import React from "react";
import EventItem from "./EventItem";

const EventList = (props) => {
  const { items } = props;
  return (
    <div>
      <ul>
        {items.maps((event) => (
          <EventItem
            key={event.id}
            title={event.title}
            image={event.image}
            date={event.date}
            location={event.location}
            id={event.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default EventList;

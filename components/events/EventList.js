import React from "react";
import EventItem from "./EventItem";
import classes from "./event-list.module.css";

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event._id}
          title={event.title}
          image={event.image}
          date={event.date}
          location={event.location}
          id={event._id}
        />
      ))}
    </ul>
  );
};

export default EventList;

import React from "react";
import { useRouter } from "next/router";
import { getFeaturedEvents } from "../../dummy-data";
import classes from "../../components/events/event-item.module.css";
import DateIcon from "../../components/icons/date-icon";
import AddressIcon from "../../components/icons/address-icon";

const EventDetailPage = () => {
  const { query } = useRouter();
  const featuredEvent = getFeaturedEvents();
  const event = featuredEvent.find((event) => event.id === query.eventId);

  const humanReadableDate = new Date(event?.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = event?.location.replace(", ", "\n");

  return (
    <div className={classes.item}>
      <img src={"/" + event?.image} alt={event?.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event?.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;

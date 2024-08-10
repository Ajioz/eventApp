import React from "react";
import Link from "next/link";
import classes from "./event-item.module.css";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedDateAddress = location.replace(", ", "\n");
  const exploreLInk = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt="" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time datetime="">{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedDateAddress}</address>
          </div>
        </div>
        <div className={classes.action}>
          <Link href={exploreLInk}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;

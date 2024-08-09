import Link from "next/link";
import React from "react";

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
    <li>
      <img src={"/" + image} alt="" />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time datetime="">{formattedDate}</time>
          </div>
          <div>
            <address>{formattedDateAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLInk}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;

import React from "react";
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/eventList";

const HomePage = () => {
  const featuredEvent = getFeaturedEvents();
  console.log(typeof featuredEvent);
  return (
    <div>
      <EventList items={featuredEvent} />
    </div>
  );
};

export default HomePage;

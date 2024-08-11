import React from "react";
import { getFeaturedEvents } from "../dummy-data";

import EventList from "../components/events/eventList";

function HomePage(){
  const featuredEvent = getFeaturedEvents();


  return (
    <div>
      <EventList items={featuredEvent} />
    </div>
  );
};

export default HomePage;

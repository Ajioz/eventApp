import React from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/events-search";
import EventList from "../../components/events/EventList";

const AllEventPage = () => {
  const events = getAllEvents();

  const router = useRouter();

  function findEventsHandler(year, month) {
    console.log(year, month);
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventPage;

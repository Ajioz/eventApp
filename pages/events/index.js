import React from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-utils";
import EventsSearch from "../../components/events/events-search";
import EventList from "../../components/events/EventList";
import Head from 'next/head';

const AllEventPage = (props) => {
  const { events } = props;

  const router = useRouter();

  function findEventsHandler(year, month) {
    console.log(year, month);
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>Event Search</title>
        <meta
          name="description"
          content="Events search"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventPage;

export async function getStaticProps(context) {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

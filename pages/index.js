import { useEffect, useState } from "react";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/eventList";
import ErrorAlert from "../components/ui/error-alert";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";




function HomePage(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function seedAndFetch() {
      try {
        // Seed the database
        const seedResponse = await fetch("/api/seeding");
        if (seedResponse.ok) {
          console.log("Database seeded!");
        } else {
          console.error("Seeding failed.");
        }

        // Fetch the events after seeding
        const eventsResponse = await fetch("/api/events");
        const data = await eventsResponse.json();
        // console.log(data);
        setEvents(data);
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    }

    // Trigger seeding and fetching on component mount
    seedAndFetch();
  }, []);

  if (events.length < 1)
    return (
      <>
        <ErrorAlert>
          <p>loading...</p>
        </ErrorAlert>
        ;
      </>
    );

  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Up to date and Modern events for smart tech in GENZ"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps(context) {
  const featuredEvent = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvent,
    },
    revalidate: 1800, //30 minutes
  };
}

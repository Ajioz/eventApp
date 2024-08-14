import { useEffect, useState } from "react";
import { getFeaturedEvents } from "../dummy-data";

import EventList from "../components/events/eventList";

function HomePage() {
  const featuredEvent = getFeaturedEvents();

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
        console.log({ data });
        setEvents(data);
        
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    }

    // Trigger seeding and fetching on component mount
    seedAndFetch();
  }, [events]);

  // if(events.length < 1) return <p>loading...</p>

  console.log(events);

  return (
    <div>
      <EventList items={featuredEvent} />
    </div>
  );
}

export default HomePage;

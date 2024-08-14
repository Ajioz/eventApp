import { useEffect, useState } from "react";
import { getFeaturedEvents } from "../dummy-data";

import EventList from "../components/events/eventList";

function HomePage() {
  const featuredEvent = getFeaturedEvents();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function seedDatabase() {
      try {
        const response = await fetch("/api/seeding");
        if (response.ok) console.log("Database seeded!");
        else console.error("Seeding failed.");
      } catch (error) {
        console.log(error.message);
      }
    }

   /* async function fetchEvents() {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } */

    // Trigger seeding only once on first load
    seedDatabase().then(() => fetchEvents());
  }, []);
  console.log(events);
  return (
    <div>
      <EventList items={featuredEvent} />
    </div>
  );
}

export default HomePage;

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { getFilteredEvents } from "../../helpers/api-utils.js";
import EventList from "../../components/events/eventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert.js";
// import useSWR from "swr";
// import { redirect } from "next/dist/server/api-utils/index.js";

const FilteredEventPage = (props) => {
  const router = useRouter();
  const filteredEvent = router.query.slug;

  // const { data, error } = useSWR('/api/events');

  const [loadedEvent, setLoadedEvent] = useState();

  useEffect(() => {
    async function Fetch() {
      try {
        // Fetch the events after seeding
        const eventsResponse = await fetch("/api/events");
        const data = await eventsResponse.json();
        // console.log(data);
        setLoadedEvent(data);
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    }
    
    // fetching on component mount
    Fetch();

    if (loadedEvent) {
      const events = [];
      for (const key in loadedEvent) {
        events.push({
          id: key,
          ...loadedEvent[key],
        });
      }
      setLoadedEvent(events);
    }
  }, []);

  if (!loadedEvent) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredEvent[0];
  const filteredMonth = filteredEvent[1];

  const numYear = Number(filteredYear);
  const numMonth = Number(filteredMonth);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, please adjust your value!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </>
    );
  }

  const filteredValidEvent = loadedEvent.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // if (props.hasError) {
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p>Invalid filter, please adjust your value!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show all Events</Button>
  //       </div>
  //     </>
  //   );
  // }

  // const filteredValidEvent = props.events;

  if (!filteredValidEvent || filteredValidEvent.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No event found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </>
    );
  }

  // const date = new Date(props.date.year, props.date.month - 1);
  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredValidEvent} />
    </>
  );
};

export default FilteredEventPage;

// export const getServerSideProps = async (context) => {
//   const { params } = context;

//   const filteredEvent = params.slug;

//   if (!filteredEvent) {
//     return { loading: true };
//   }

//   const filteredYear = filteredEvent[0];
//   const filteredMonth = filteredEvent[1];

//   const numYear = Number(filteredYear);
//   const numMonth = Number(filteredMonth);

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filteredValidEvent = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredValidEvent,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

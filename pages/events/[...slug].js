import { useRouter } from "next/router";
import React from "react";
import { getFilteredEvents } from "../../helpers/api-utils.js";
import EventList from "../../components/events/eventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert.js";
// import { redirect } from "next/dist/server/api-utils/index.js";

const FilteredEventPage = (props) => {

  const router = useRouter();
  const filteredEvent = router.query.slug;
  
  if (!filteredEvent) {
    return <p className="center">Loading...</p>;
  }
  
  const filteredYear = filteredEvent[0];
  const filteredMonth = filteredEvent[1];
  
  const numYear = Number(filteredYear);
  const numMonth = Number(filteredMonth);
  
 
  if (props.hasError) {
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

  const filteredValidEvent = props.events;

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

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredValidEvent} />
    </>
  );
};

export default FilteredEventPage;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const filteredEvent = params.slug;

  if (!filteredEvent) {
    return { loading: true };
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
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filteredValidEvent = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredValidEvent,
      date: {
        year: numYear,
        month: numMonth
      }
     },
  };
};

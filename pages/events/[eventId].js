import React from "react";
// import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/event-details/event-summary";
import EventLogistics from "../../components/event-details/event-logistics";
import EventContent from "../../components/event-details/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = (props) => {
  // const { query } = useRouter();

  const { event } = props;

  if (!event)
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );

  // if (!event && )
  //   return (
  //     <ErrorAlert>
  //       <p>no event found</p>
  //     </ErrorAlert>
  //   );

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        alt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 30, //30 minutes
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event._id } }));

  return {
    paths,
    fallback: true,
  };
}

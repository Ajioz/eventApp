import React, { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();
  const showDetails = async (id) => {
    const res = await fetch(`/api/feedback/${id}`);
    const data = await res.json();
    setFeedbackData(data.feedback);
  };

  return (
    <>
      <span>Name: {feedbackData && <span>{feedbackData.name}</span>}</span>
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedback}{" "}
            <button onClick={showDetails.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FeedbackPage;

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = await extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

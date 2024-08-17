import React from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackPage = (props) => {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.feedback} <button>Show details</button></li>
      ))}
    </ul>
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

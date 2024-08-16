import React from "react";

const FeedbackPage = () => {
    return <ul>{props.feedbackItems.map(item => <li key={item.id}>{item.feedback }</li>)}</ul>;
};

export default FeedbackPage;


export async function getStaticProps(){

}
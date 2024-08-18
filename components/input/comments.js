import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  console.log(eventId);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();

  useEffect(() => {
    if (showComments) {
      fetch(`api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
    const response = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.json();
    console.log(data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {/* {showComments && <CommentList items={comments} />} */}
    </section>
  );
}

export default Comments;

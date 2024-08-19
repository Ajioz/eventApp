import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();
  const [isFetchingComment, setIsFetchingComment] = useState(false);

  useEffect(() => {
    console.log(showComments);
    const fetchComments = async () => {
      if (showComments) {
        setIsFetchingComment(true);
        try {
          const res = await fetch(`/api/comments/${eventId}`);
          const data = await res.json();
          console.log(data);
          setComments(data.data);
          setIsFetchingComment(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchComments();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being processed",
      status: "pending",
    });

    try {
      // send data to API
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status) {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully added comment",
          status: "success",
        });
      } else {
        notificationCtx.showNotification({
          title: "Error!",
          message: "Something went wrong",
          status: "error",
        });
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Sending comment went wrong, really",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComment && <CommentList items={comments} />}
      {showComments && isFetchingComment && <p>Loading...</p>}
    </section>
  );
}

export default Comments;

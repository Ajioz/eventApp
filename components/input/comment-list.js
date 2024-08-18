import classes from "./comment-list.module.css";

function CommentList({ items }) {
  return (
    <ul className={classes.comments}>
      {items?.map((item) => (
        <li key={item._id}>
          <div>{item.text}</div>
          <div>
            By{" "}
            <strong>
              <address>{item.name}</address>
            </strong>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;

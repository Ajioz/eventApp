import React, { useRef, useState } from "react";
import classes from "./userform.module.css";

const userForm = () => {
  const [feedBacK, setFeedBacK] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  const feedbackRef = useRef();

  const formHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    const sendData = { name, email, feedback };

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json(); // Make sure to await this
    console.log(data);
    // Reset the form fields
    nameRef.current.value = "";
    emailRef.current.value = "";
    feedbackRef.current.value = "";
  };

  const loadFeedback = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/feedback");
    const data = await response.json(); // Make sure to await this
    setFeedBacK(data.feedBacK);
  };

  return (
    <div className={classes.body}>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={formHandler}>
          <h2 className={classes.formTitle}>Contact Us</h2>

          <div className={classes.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              ref={nameRef}
              required
            />
          </div>

          <div className={classes.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              ref={emailRef}
              required
            />
          </div>

          <div className={classes.formGroup}>
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              placeholder="Write your feedback here"
              required
              ref={feedbackRef}
            ></textarea>
          </div>

          <button type="submit" className={classes.submitButton}>
            Submit
          </button>
          <hr />
          <button
            type="submit"
            onClick={loadFeedback}
            className={classes.submitButton}
          >
            Load Feedback
          </button>
          <ul>
            {feedBacK.map((item) => (
              <li key={item.id}>{item.feedback}</li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default userForm;

import React from "react";
import classes from 'userform.module.css'

const userForm = () => {
  return (
    <div className={classes.form-container}>
      <form className={classes.form}>
        <h2 className={classes.form-title}>Contact Us</h2>

        <div className={classes.form-group}>
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className={classes.form-group}>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className={classes.form-group}>
          <label for="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default userForm;

import classes from "./newsletter-registration.module.css";
import React, { useRef } from "react";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function NewsletterRegistration() {
  const subRef = useRef();
  async function registrationHandler(e) {
    e.preventDefault();

    // fetch user input (state or refs)
    const subscriber = subRef.current.value;

    // optional: validate input
    if (!isValidEmail(subscriber)) return;

    const newSubscriber = {
      email: subscriber,
    };

    // send valid data to API
    const res = await fetch("/api/subscriber", {
      method: "POST",
      body: newSubscriber,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status) subRef.current.value = "";
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={subRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

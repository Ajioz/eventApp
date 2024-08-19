import classes from "./newsletter-registration.module.css";
import React, { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const subRef = useRef();

  async function registrationHandler(e) {
    e.preventDefault();
    let data;

    // fetch user input (state or refs)
    const subscriber = subRef.current.value;

    // optional: validate input
    if (!isValidEmail(subscriber)) return;

    const newSubscriber = {
      email: subscriber,
    };

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    // send valid data to API
    try {
      const res = await fetch("/api/subscriber", {
        method: "POST",
        body: JSON.stringify(newSubscriber),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await res.json();
      if (data.status) {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter",
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
        message: error.message || "Things didn't go well",
        status: "error",
      });
    }
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

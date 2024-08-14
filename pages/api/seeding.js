import connectToDatabase from "../../dbConnect/db";
import Event from "../../dbConnect/model";

export default async function handler(req, res) {
  console.log("I want to seed some data");
  try {
    await connectToDatabase();

    // Check if the database is already seeded
    const existingEvents = await Event.find({});

    if (existingEvents.length > 0) {
      console.log({ message: "Database already seeded!" });
      return res.status(200).json({ message: "Database already seeded!" });
    }

    const DUMMY_EVENTS = [
      {
        title: "Programming for everyone",
        description:
          "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
        location: "Some Street 25, 12345 San Some where o",
        date: "2021-05-12",
        image: "images/coding-event.jpg",
        isFeatured: false,
      },
      {
        title: "Networking for introverts",
        description:
          "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
        location: "New Wall Street 5, 98765 New Work",
        date: "2021-05-30",
        image: "images/introvert-event.jpg",
        isFeatured: true,
      },
      {
        title: "Networking for extroverts",
        description:
          "You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.",
        location: "My Street 12, 10115 Broke City",
        date: "2022-04-10",
        image: "images/extrovert-event.jpg",
        isFeatured: true,
      },
    ];

    // Clear existing data to avoid duplicates
    await Event.deleteMany({});
    await Event.insertMany(DUMMY_EVENTS);

    res.status(200).json({ message: "Dummy events inserted!" });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed!", error });
  }
}

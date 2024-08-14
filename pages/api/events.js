import connectToDatabase from "../../dbConnect/db";
import Event from "../../dbConnect/model";

export default async function handler(req, res) {
  console.log("Attempting to fetching data...");
  try {
    await connectToDatabase();
    const events = await Event.find({});
    console.log(events);
    return res.status(200).json(events);
  } catch (error) {
    console.log({ message: "error fetching events" });
  }
}

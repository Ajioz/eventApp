import connectToDatabase from "../../dbConnect/db";
import Event from "../../dbConnect/model";

export default async function handler(req, res) {
  await connectToDatabase();
  const events = await Event.find({});
  res.status(200).json(events);
}

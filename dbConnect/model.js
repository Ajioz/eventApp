// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: String,
  image: String,
  isFeatured: Boolean,
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);

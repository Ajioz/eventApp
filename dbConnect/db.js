// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;
// const MONGODB_URI = "mongodb://127.0.0.1:27017/nextevent";


if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  try {
    console.log("Attempting to connect to the database...");

    if (cached.conn) {
      console.log("Using cached database connection...");
      return cached.conn;
    }

    if (!cached.promise) {
      console.log("Creating a new database connection...");
      const opts = {
        autoIndex: false, // Don't build indexes
        useNewUrlParser: true,
      };

      cached.promise = (async () => {
        const mongooseInstance = await mongoose.connect(MONGODB_URI, opts);
        console.log("Successfully connected to the database!");
        return mongooseInstance;
      })();
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection failed");
  }
}

export default connectToDatabase;

import { MongoClient } from "mongodb";
import { isValidEmail } from ".";

const commentHandler = async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  try {
    const eventId = req.query.eventId;

    if (req.method === "POST") {
      const { email, name, text } = req.body;

      if (
        !isValidEmail(email) ||
        !name ||
        !name.trim() ||
        !text ||
        !text.trim()
      ) {
        return res.status(422).json({ status: false, email: "Invalid email" });
      }
      const onAddComment = { email, name, text, eventId };

      const db = client.db();
      const result = await db.collection("comments").insertOne(onAddComment);


      client.close();
      if (result) {
        return res
          .status(201)
          .json({ status: true, message: "added successfully", result });
      }
    } else {
       const db = client.db();
       const result = await db.collection("comments").insertOne(onAddComment);
      // return res.status(200).json({ status: true, text });
    }
  } catch (error) {
    console.log("Could not process request, server error..");
  }
};

export default commentHandler;

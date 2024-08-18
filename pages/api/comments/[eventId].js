import { MongoClient } from "mongodb";

const client = await MongoClient.connect(process.env.MONGODB_URL);

const commentHandler = async (req, res) => {
  try {
    const eventId = req.query.eventId;

    if (req.method === "POST") {
      const { email, name, comment } = req.body;

      if (!isValidEmail(email) || !name || !name.trim() || !text || !text.trim() ) {
        return res.status(422).json({ status: false, email: "Invalid email" });
      }
      const onAddComment = { email, name, comment, eventId };

      const db = client.db();
      const result = await db.collection("comments").insertOne({ onAddComment });

      client.close();

      if (res) {
        return res
          .status(201)
          .json({ status: true, message: "added successfully", result });
      }

    } else {
      // return res.status(200).json({ status: true, comments });
    }
  } catch (error) {
    console.log("Could not process request, server error..");
  }
};

export default commentHandler;

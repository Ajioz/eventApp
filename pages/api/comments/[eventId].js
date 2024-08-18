import { isValidEmail } from ".";
import { connectDB, insertDoc } from "../../../helpers/db-utils";


const commentHandler = async (req, res) => {
  let client;
  const eventId = req.query.eventId;

  try {
    client = await connectDB();
  } catch (error) {
    return res.status(500).json({ message: "Connecting to db failed" });
  }

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

    try {
      await insertDoc(client, "comments", onAddComment);
      client.close();
    } catch (error) {
      return res.status(500).json({ message: "Inserting data failed" });
    }

    return res
      .status(201)
      .json({ status: true, message: "added successfully", data: result });
  } else {
    let document;
    try {
      const db = client.db();
      document = await db
        .collection("comments")
        .find()
        .sort({ _id: -1 })
        .toArray();
      client.close();
    } catch (error) {
      return res.status(500).json({ message: "Fetching comments failed" });
    }
    return res.status(200).json({ status: true, data: document });
  }
};

export default commentHandler;

import { connectDB, insertDoc } from "../../../helpers/db-utils";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const subHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!isValidEmail(email)) {
      return res.status(422).json({ status: false, email: "Invalid email" });
    }

    let client;
    try {
      client = await connectDB();
    } catch (error) {
      return res.status(500).json({ message: "Connecting to db failed" });
    }

    try {
      await insertDoc(client, "emails", email);
      client.close();
    } catch (error) {
      return res.status(500).json({ message: "Inserting data failed" });
    }
    return res.status(201).json({ status: true, email });
  }
};

export default subHandler;

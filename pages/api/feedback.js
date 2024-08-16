import fs from "fs/promises";
import path from "path";

async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, feedback } = req.body;
    const newFeedback = {
      id: new Date().toISOString(),
      name,
      email,
      feedback,
    };

    //store that in a file system acting as database
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = await fs.readFile(filePath);

    const data = JSON.parse(fileData);
    data.push(newFeedback);
    await fs.writeFile(filePath, JSON.stringify(data));
    return res.status(201).json({ msg: "Success", feedBacK: newFeedback });
  }
}

export default handler;

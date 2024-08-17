import fs from "fs/promises";
import path from "path";

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedback = async (filePath) => {
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);
  return data;
};

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, feedback } = req.body;
      const newFeedback = {
        id: new Date().toISOString(),
        name,
        email,
        feedback,
      };

      //store that in a file system acting as database
      const filePath = buildFeedbackPath();
      const data = await extractFeedback(filePath);

      data.push(newFeedback);
      await fs.writeFile(filePath, JSON.stringify(data));
      return res.status(201).json({ msg: "Success", feedBacK: newFeedback });
    } catch (error) {
      console.log("Failed to save");
    }
  } else {
    try {
      const filePath = buildFeedbackPath();
      const data = await extractFeedback(filePath);
      return res.status(200).json({ feedBacK: data });
    } catch (error) {
      console.log("Failed to retrieve data");
    }
  }
}

export default handler;

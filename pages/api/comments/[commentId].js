import {
  buildFeedbackPath,
  extractFeedback,
  isValidEmail,
  addComment,
} from ".";

const commentHandler = async (req, res) => {
  try {
    const commentId = req.query.commentId;
    const filePath = buildFeedbackPath();
    const commentData = await extractFeedback(filePath);

    if (req.method === "POST") {
      const { email, name, comment } = req.body;

      if (!isValidEmail(email) || !name || !name.trim() || !text || !text.trim() ) {
        return res.status(422).json({ status: false, email: "Invalid email" });
      }

      const onAddComment = { commentId, email, name, comment };
      const res = await addComment(filePath, onAddComment);

      if (res) {
        return res
          .status(201)
          .json({ status: true, message: "added successfully" });
      }

    } else {
      const comments = commentData.filter((data) => data.id === commentId);
      return res.status(200).json({ status: true, comments });
    }
  } catch (error) {
    console.log("Could not process request, server error..");
  }
};

export default commentHandler;

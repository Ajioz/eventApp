import { buildFeedbackPath, extractFeedback } from "./index";

const handler = async (req, res) => {
  try {
    const feedBackId = req.query.feedbackId;
    const filaPath = buildFeedbackPath();
    const feedbackData = await extractFeedback(filaPath);
    const selectedFeedback = feedbackData.find(
      (feedback) => feedback.id === feedBackId
    );

    return res.status(200).json({ feedback: selectedFeedback });
  } catch (error) {}
};

export default handler;

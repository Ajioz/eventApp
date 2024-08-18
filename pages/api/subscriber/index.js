const subHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      return res.status(201).json({ status: true, email });
    } catch (error) {
      console.log(error);
    }
  }
};

export default subHandler;

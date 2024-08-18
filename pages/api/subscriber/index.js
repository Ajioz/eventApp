const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const subHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (!isValidEmail(email)) {
        return res.status(422).json({ status: false, email: "Invalid email" });
      }

      return res.status(201).json({ status: true, email });
    } catch (error) {
      console.log(error);
    }
  }
};

export default subHandler;

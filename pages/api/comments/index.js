


const commentHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, name, comment } = req.body;
    } catch (error) {
      CONSOLE.console.log(error.message);
    }
  } else {
    try {
    } catch (error) {
      console.log("Could not retrieve comments");
    }
  }
};

export default commentHandler;

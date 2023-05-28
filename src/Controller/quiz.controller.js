const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const axios = require("axios");
exports.postQuiz = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      const quiz = {
        body: req.body.body,
        desc: req.body.desc,
        category: req.body.category,
        answers: req.body.answers,
        author: user._id,
      };
      // Authenticate the user by sending a request to the User Service
      const authResponse = await axios.post(
        "http://localhost:3000/api/quiz",
        quiz
      );

      if (authResponse.data.success) {
        res.status(200).json({ message: "done " });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.getQuizs = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      data = { author: user._id };

      //   const authResponse = await axios.get("http://localhost:3000/api/quiz", {
      //     params: {
      //       author: user._id,
      //     },

      //  });
      const author = user._id;
      axios({
        method: "get",

        url: "http://localhost:3000/api/quiz/" + author,
        params: {
          author: user._id,
        },
      }).then(function (response) {
        res.status(200).json({ message: "done ", quizes: response.data });
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.deleteQuiz = async (req, res) => {};
exports.updateQuiz = async (req, res) => {};

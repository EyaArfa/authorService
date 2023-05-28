const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const axios = require("axios");
exports.postQuiz = async (req, res) => {
  console.log("*****in post quiz****");
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
        "http://localhost:3000/api/quiz/",
        quiz
      );

      if (authResponse.data.success) {
        res.status(200).json({ message: "done " });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    }
  } catch (error) {
    console.log("failed");
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

        url: "http://localhost:3000/api/quiz/authorCtgs",
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
exports.deleteQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    axios
      .delete("http://localhost:3000/api/quiz/" + quizId)
      .then(function (response) {
        res.status(200).json({ success: true, message: "quiz was deleted" });
      });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};
exports.updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  console.log(quizId.toString());
  try {
    const quiz = req.body;
    axios
      .put("http://localhost:3000/api/quiz/" + quizId, quiz)
      .then(function (response) {
        res.status(200).json({ message: "done ", quizeUpdated: response.data });
      });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

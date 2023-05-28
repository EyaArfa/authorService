const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const axios = require("axios");
exports.postQuiz = async (req, res) => {
  const quiz = {
    body: "author server quiz  ",
    desc: " question desc ",
    category: "ctg",
    answers: [{ body: "anser1" }, { body: "anser1" }, { body: "anser1" }],
  };

  try {
    // Authenticate the user by sending a request to the User Service
    const authResponse = await axios.post(
      "http://localhost:3000/api/quiz",
      quiz
    );
    console.log(authResponse);
    res.status(201).json(authResponse);
    // if (authResponse.data.valid) {

    // } else {
    //   res.status(401).json({ error: "Unauthorized" });
    // }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.getQuizs = async (req, res) => {};
exports.deleteQuiz = async (req, res) => {};
exports.updateQuiz = async (req, res) => {};

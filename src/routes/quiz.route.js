const quiz = require("../Controller/quiz.controller");
const authenticate = require("../Controller/auth.middleware");
const express = require("express");
const router = express.Router();
router.post("/add", authenticate, quiz.postQuiz);
router.get("", authenticate, quiz.getQuizs);
router.put("/:id", authenticate, quiz.updateQuiz);
router.delete("/:id", authenticate, quiz.deleteQuiz);

module.exports = router;

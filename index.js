const express = require("express");
const mongoose = require("mongoose");
const userController = require("./src/Controller/userController");
const authenticate = require("./src/Controller/auth.middleware");
const Quize = require("./src/routes/quiz.route");
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/user-service", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get("/", (req, res) => {
  res.send(" hhhhey api ");
});
app.post("/api/author/register", userController.register);
app.post("/api/author/login", userController.login);
app.use("/api/quiz", Quize);
app.get("/api/author/getToken", authenticate, (req, res) => {
  res.status(200).json({ message: "authenticated successfully" });
});

// Start the server
app.listen(4000, () => {
  console.log(`Server listening on port ${4000}`);
});

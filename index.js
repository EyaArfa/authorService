const express = require("express");
const mongoose = require("mongoose");
const userController = require("./src/Controller/userController");
const authenticate = require("./src/Controller/auth.middleware");

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/user-service", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/getToken", authenticate, (req, res) => {
  res.status(200).json({ message: "authenticated successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

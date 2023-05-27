const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
});
UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
UserSchema.methods.changePassword = async function (password) {
  const pass = await bcrypt.hash(password, 10);
  this.password = pass;
  try {
    await this.save();
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = mongoose.model("User", UserSchema);

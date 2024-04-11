const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://yoakash6:Akash%40123@cluster0.yqefgzr.mongodb.net/paytm-app"
);

const UserScehma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLenght: 30,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLenght: 30,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 30,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 30,
  },
});

const accoundSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: Number,
});

const User = mongoose.model("User", UserScehma);
const Account = mongoose.model("Account", accoundSchema);
module.exports = {
  User,
  Account,
};

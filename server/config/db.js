const mongoose = require("mongoose");

const UserModel = require("../models/UserModel.js");
const { sample_users } = require("../sample_data/data.js");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
    
    const userCount = await UserModel.countDocuments();

    if (userCount == 0) {
      await UserModel.insertMany(sample_users);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
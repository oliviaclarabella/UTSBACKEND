const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  nama: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  noHp: { type: String },
  status: { type: String, required: true },
  idLevelPengguna: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
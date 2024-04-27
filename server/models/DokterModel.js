const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const DokterSchema = new Schema({
  nama: { type: String, required: true },
  biaya: { type: String },
  foto: { type: String },
  spesialis: { type: mongoose.Schema.Types.ObjectId, ref: "Spesialis" },
  deskripsi: { type: String },
  status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Dokter", DokterSchema);

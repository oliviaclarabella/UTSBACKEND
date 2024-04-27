const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ReservasiDokterSchema = new Schema({
  jadwal: { type: mongoose.Schema.Types.ObjectId, ref: "Jadwal_Dokter" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tanggal_pengajuan: { type: Date, required: true },
  tanggal_pembatalan: { type: Date },
  dibatalkan: { type: Boolean },
  status: { type: String, required: true }, //aktif, hapus
}, { timestamps: true });

module.exports = mongoose.model("Reservasi", ReservasiDokterSchema);
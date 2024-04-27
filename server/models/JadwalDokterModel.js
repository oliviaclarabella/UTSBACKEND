const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const JadwalDokterSchema = new Schema({
  tanggal: { type: Date, required: true },
  dokter: { type: mongoose.Schema.Types.ObjectId, ref: "Dokter" },
  waktu_mulai: { type: String, required: true },
  waktu_akhir: { type: String, required: true },
  status_jadwal: { type: String, required: true }, //tersedia, diajukan, dibatalkan, selesai 
  status: { type: String, required: true }, //aktif, hapus
}, { timestamps: true });

module.exports = mongoose.model("Jadwal_Dokter", JadwalDokterSchema);
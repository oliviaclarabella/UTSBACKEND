const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const sample_jadwal = [
  {
    no: 1,
    no_dokter: 1,
    tanggal: today,
    waktu_mulai: "10:00",
    waktu_akhir: "10:30",
    status_jadwal: "tersedia",
    status: "aktif",
  },
  {
    no: 2,
    no_dokter: 2,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "10:00",
    waktu_akhir: "10:30",
    status_jadwal: "tersedia",
    status: "aktif",
  },
  {
    no: 3,
    no_dokter: 3,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "10:30",
    waktu_akhir: "11:00",
    status_jadwal: "tersedia",
    status: "aktif",
  },
];

const sample_reservasi = [
  {
    no: 1,
    no_dokter: 1,
    nama_dokter: "Dr. Harun Wijaya, Sp.A",
    tanggal: new Date(new Date(today).setDate(today.getDate() - 3)),
    tanggal_dibuat: new Date(new Date(today).setDate(today.getDate() - 10)),
    waktu_mulai: "10:00",
    waktu_akhir: "10:30",
    status_jadwal: "selesai",
    status: "aktif",
  },
  {
    no: 2,
    no_dokter: 2,
    nama_dokter: "Dr. Harun Wijaya, Sp.A",
    tanggal: today,
    tanggal_dibuat: new Date(new Date(today).setDate(today.getDate() - 5)),
    waktu_mulai: "10:00",
    waktu_akhir: "10:30",
    status_jadwal: "diajukan",
    status: "aktif",
  },
  {
    no: 3,
    no_dokter: 3,
    nama_dokter: "Dr. Adisti Mega Rinindra, Sp.THT-KL",
    tanggal: new Date(new Date(today).setDate(today.getDate() + 6)),
    tanggal_dibuat: new Date(new Date(today).setDate(today.getDate() - 2)),
    waktu_mulai: "10:30",
    waktu_akhir: "11:00",
    status_jadwal: "dibatalkan",
    status: "aktif",
  },
  {
    no: 4,
    no_dokter: 4,
    nama_dokter: "Dr. Bambang Hari Santosa, Sp.THT-KL",
    tanggal: new Date(new Date(today).setDate(today.getDate() + 6)),
    tanggal_dibuat: new Date(new Date(today).setDate(today.getDate() - 1)),
    waktu_mulai: "10:00",
    waktu_akhir: "10:30",
    status_jadwal: "diajukan",
    status: "aktif",
  },
];

const sample_jadwal_dokter = [
  {
    no: 1,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 2,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 3,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00"
  },
  {
    no: 4,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 5,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 6,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 7,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "09:00",
    waktu_akhir: "10:00",
  },
  {
    no: 8,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "11:00",
    waktu_akhir: "12:00"
  },
  {
    no: 9,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 10,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 11,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 12,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 13,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 14,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 15,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00",
  },
  {
    no: 16,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00",
  },
  {
    no: 17,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 18,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 19,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 20,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 21,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 22,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "09:00",
    waktu_akhir: "10:00",
  },
  {
    no: 23,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "11:00",
    waktu_akhir: "12:00"
  },
  {
    no: 24,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 25,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 26,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 27,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 28,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 29,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 30,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00",
  },
  {
    no: 31,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00",
  },
  {
    no: 32,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 33,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 34,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 35,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 36,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 37,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "09:00",
    waktu_akhir: "10:00",
  },
  {
    no: 38,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "11:00",
    waktu_akhir: "12:00"
  },
  {
    no: 39,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 40,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 41,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 42,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 43,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 44,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 45,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00",
  },
  {
    no: 46,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00",
  },
  {
    no: 47,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 48,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 49,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 50,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 51,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 52,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "09:00",
    waktu_akhir: "10:00",
  },
  {
    no: 53,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "11:00",
    waktu_akhir: "12:00"
  },
  {
    no: 54,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 55,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 56,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 57,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 58,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 59,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 60,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00",
  },
  {
    no: 61,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00",
  },
  {
    no: 62,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 63,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 64,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 65,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 66,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 67,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "09:00",
    waktu_akhir: "10:00",
  },
  {
    no: 68,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "11:00",
    waktu_akhir: "12:00"
  },
  {
    no: 69,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "14:00",
    waktu_akhir: "15:00",
  },
  {
    no: 70,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 71,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00"
  },
  {
    no: 72,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "16:00",
    waktu_akhir: "17:00",
  },
  {
    no: 73,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 1)),
    waktu_mulai: "08:00",
    waktu_akhir: "09:00",
  },
  {
    no: 74,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 2)),
    waktu_mulai: "10:00",
    waktu_akhir: "11:00"
  },
  {
    no: 75,
    tanggal: new Date(new Date(today).setDate(today.getDate() + 3)),
    waktu_mulai: "13:00",
    waktu_akhir: "14:00",
  },
];

module.exports = { sample_jadwal, sample_reservasi, sample_jadwal_dokter };

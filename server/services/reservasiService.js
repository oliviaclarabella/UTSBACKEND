const JadwalDokterModel = require("../models/JadwalDokterModel.js");
const ReservasiModel = require("../models/ReservasiModel.js");
const moment = require("moment");

async function getList(body = {}) {
  var list = [];
  try {
    const { user } = body;

    var filter = { status: "aktif" };

    if (user) {
      filter["user"] = user;
    }

    const result = await ReservasiModel.find(filter)
      .populate({
        path: "jadwal",
        populate: { path: "dokter" },
      })
      .populate("user")
      .sort({ tanggal_pengajuan: 1 });

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await ReservasiModel.findByIdAndUpdate(id, { status: "hapus" })
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function reservasiDokter(jadwal, user) {
  //cek data yang kosong
  if (!jadwal || !user) {
    throw "Silahkan lengkapi data!";
  }

  var newData = {
    jadwal,
    tanggal_pengajuan: moment().format(),
    user,
    tanggal_pembatalan: null,
    dibatalkan: false,
    status: "aktif",
  };

  try {
    await ReservasiModel.create(newData);

    await JadwalDokterModel.findByIdAndUpdate(jadwal, {
      status_jadwal: "diajukan",
    });

    return "Data berhasil ditambah!";
  } catch (e) {
    throw e.message;
  }
}

// cari data berdasarkan id
async function cariDataBerdasarkanId(id) {
  var list = null;
  await ReservasiModel.findById(id)
    .populate({
      path: "jadwal",
      populate: { path: "dokter" },
    })
    .populate("user")
    .then((result) => {
      list = result;
    })
    .catch((e) => {
      throw e.message;
    });
  return list;
}

// tambah data
async function batalReservasi(id_reservasi, id_jadwal) {
  //cek data yang kosong
  if (!id_jadwal || !id_reservasi) {
    throw "Silahkan lengkapi data!";
  }

  try {
    await ReservasiModel.findByIdAndUpdate(id_reservasi, {
      dibatalkan: true,
      tanggal_pembatalan: new Date()
    });

    return "Reservasi dokter berhasil dibatalkan!";
  } catch (e) {
    throw e.message;
  }
}

// ubah data
async function ubahData(id, req) {

  var new_data = {
  };

  if(req.body){
    if(req.body.status_jadwal != null && req.body.status_jadwal != undefined){
      new_data['status_jadwal'] = req.body.status_jadwal;
    }

    if(req.body.status_pembatalan != null && req.body.status_pembatalan != undefined){
      if(req.body.status_pembatalan == "dibatalkan"){
        new_data['dibatalkan'] = true;
        new_data['tanggal_pembatalan'] = null;
      }else{
        new_data['dibatalkan'] = false;
        new_data['tanggal_pembatalan'] = new Date();
      }
    }
  }

  var list = null;
  await ReservasiModel.findByIdAndUpdate(id, new_data)
    .then((result) => {
      list = result;
    })
    .catch((e) => {
      throw e.message;
    });
  return list;
}

module.exports = {
  getList,
  hapusData,
  reservasiDokter,
  cariDataBerdasarkanId,
  batalReservasi,
  ubahData
};

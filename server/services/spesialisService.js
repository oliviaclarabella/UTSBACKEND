const SpesialisModel = require("../models/SpesialisModel.js");

async function getList(body = {}) {
  var list = [];
  try {
    const { cari } = body;

    var filter = { status: "aktif" };

    if (cari) {
      const regex = new RegExp(cari, "i");
      filter["nama"] = { $regex: regex };
    }

    const result = await SpesialisModel.find(filter).sort({ tanggal: 1, waktu_mulai: 1 });

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await SpesialisModel.findByIdAndUpdate(id, { status: "hapus" })
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  var { nama } = req.body;

  //cek data yang kosong
  if (!nama) {
    throw "Nama tidak boleh kosong";
  }

  var newData = {
    nama,
    status: "aktif",
  };

  try {
    await SpesialisModel.create(newData);
    return "Data berhasil ditambah!";
  } catch (e) {
    throw e.message;
  }
}

// ubah data
async function ubahData(id, req) {
  const { nama } = req.body;

  //cek data yang kosong
  if (!nama) {
    throw "Nama tidak boleh kosong";
  }

  var data = null;
  await SpesialisModel.findById(id)
    .then((result) => {
      data = result;
    })
    .catch((e) => {
      throw e.message;
    });

  if (data == null) {
    throw "Data tidak ditemukan!";
  }

  var new_data = {
    nama,
  };

  var list = null;
  await SpesialisModel.findByIdAndUpdate(id, new_data)
    .then((result) => {
      list = result;
    })
    .catch((e) => {
      throw e.message;
    });
  return list;
}

// cari data berdasarkan id
async function cariDataBerdasarkanId(id) {
  var list = null;
  await SpesialisModel.findById(id)
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
  tambahData,
  cariDataBerdasarkanId,
  ubahData,
};

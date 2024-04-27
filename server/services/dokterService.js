const DokterModel = require("../models/DokterModel.js");

async function getList(body = {}) {
  var list = [];
  try {
    const { cari, spesialis } = body;

    var filter = { status: "aktif" };

    if (cari) {
      const regex = new RegExp(cari, "i");
      filter["nama"] = { $regex: regex };
    }

    if (spesialis) {
      filter["spesialis"] = spesialis;
    }

    const result = await DokterModel.find(filter).populate("spesialis").sort({ nama: 1});

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await DokterModel.findByIdAndUpdate(id, { status: "hapus" })
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  var { nama, biaya, foto, spesialis, deskripsi } = req.body;

  //cek data yang kosong
  if (!nama && !spesialis) {
    throw "Silahkan lengkapi data!";
  } else if (!nama) {
    throw "Nama tidak boleh kosong";
  } else if (!spesialis) {
    throw "Spesialis tidak boleh kosong";
  }

  if(deskripsi){
    deskripsi = deskripsi.replace(/\r?\n/g, "\\n");
  }

  var newData = {
    nama,
    biaya,
    foto,
    spesialis,
    deskripsi,
    status: "aktif",
  };

  if(req.file){
    newData.foto = req.file.path;
  }

  try {
    await DokterModel.create(newData);
    return "Data berhasil ditambah!";
  } catch (e) {
    throw e.message;
  }
}

// ubah data
async function ubahData(id, req) {
  const { nama, biaya, foto, spesialis, deskripsi } = req.body;

  //cek data yang kosong
  if (!nama && !spesialis) {
    throw "Silahkan lengkapi data!";
  } else if (!nama) {
    throw "Nama tidak boleh kosong";
  } else if (!spesialis) {
    throw "Spesialis tidak boleh kosong";
  }

  var data = null;
  await DokterModel.findById(id)
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
    biaya,
    foto,
    spesialis,
    deskripsi,
  };

  if(req.file && req.file != undefined){
    var file_path = '';
    if(req.file.path){
      file_path = req.file.path.replace(/\\/g, '/');
    }
    new_data.foto = file_path;
  }

  var list = null;
  await DokterModel.findByIdAndUpdate(id, new_data)
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
  await DokterModel.findById(id).populate("spesialis")
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

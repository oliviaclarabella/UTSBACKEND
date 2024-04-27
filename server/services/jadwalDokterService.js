const DokterModel = require("../models/DokterModel.js");
const JadwalDokterModel = require("../models/JadwalDokterModel.js");
const moment = require("moment");

async function getList(body = {}) {
  var list = [];
  try {
    const { cari, spesialis, tanggal_mulai, tanggal_akhir, status_jadwal } = body;

    var filter = { status: "aktif"  };
    var filter_dokter = { status: "aktif" };

    if (cari) {
      const regex = new RegExp(cari, "i");
      filter_dokter["nama"] = { $regex: regex };
    }

    if (spesialis) {
      filter_dokter["spesialis"] = spesialis;
    }

    if (status_jadwal) {
      filter["status_jadwal"] = status_jadwal;
    }

    if (tanggal_mulai && tanggal_akhir) {
      filter["tanggal"] = {
        $gte: moment(tanggal_mulai).startOf('day').format(),
        $lte: moment(tanggal_akhir).endOf('day').format(),
      };
    }else if(tanggal_mulai){
      filter["tanggal"] = {
        $gte: moment(tanggal_mulai).startOf('day').format(),
      };
    }

    await DokterModel.find(filter_dokter)
      .select("_id") // Select only the _id field of the matched Dokter document(s)
      .then((dokterDocs) => {
        // Extract the _id(s) of the matched Dokter document(s)
        const dokterIds = dokterDocs.map((dokter) => dokter._id);

        filter["dokter"] = { $in: dokterIds };
        // Find Jadwal_Dokter documents where the dokter field matches one of the extracted _id(s)
        return JadwalDokterModel.find(filter)
          .populate({
            path: "dokter",
            populate: { path: "spesialis" }, // Assuming there's a nested field 'comments' within each post
          })
          .sort({ tanggal: 1 }); // Sort the results by the tanggal field in ascending order
      })
      .then((jadwalDokterDocs) => {
        var jadwal_dokter = [];
        jadwalDokterDocs.map((value) => {
          var jadwalValid = true;
          if(value.tanggal){
            if(moment(value.tanggal).format("DD-MM-YYYY") == moment().format("DD-MM-YYYY")){
              var jam_saat_ini = moment().format("HH:MM");
              if(value.waktu_mulai <= jam_saat_ini){
                jadwalValid = false;
              }
            }
          }

          if(jadwalValid){
            jadwal_dokter.push(value);
          }
        })
        list = jadwal_dokter;
      })
      .catch((err) => {
        console.error(err);
        // Handle errors
      });
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await JadwalDokterModel.findByIdAndUpdate(id, { status: "hapus" })
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  var { tanggal, dokter, waktu_mulai, waktu_akhir } = req.body;

  //cek data yang kosong
  if (!tanggal || !dokter || !waktu_mulai || !waktu_akhir) {
    throw "Silahkan lengkapi data!";
  }

  tanggal = parseDate(tanggal);
  waktu_mulai = convertTo24HourFormat(waktu_mulai);
  waktu_akhir = convertTo24HourFormat(waktu_akhir);

  if (waktu_akhir < waktu_mulai) {
    throw "Waktu akhir tidak boleh lebih kecil dari waktu mulai!";
  }

  var newData = {
    tanggal,
    dokter,
    waktu_mulai,
    waktu_akhir,
    status_jadwal: "tersedia",
    status: "aktif",
  };

  try {
    await JadwalDokterModel.create(newData);
    return "Data berhasil ditambah!";
  } catch (e) {
    throw e.message;
  }
}

// ubah data
async function ubahData(id, req) {
  var { tanggal, dokter, waktu_mulai, waktu_akhir, status_jadwal } = req.body;

  //cek data yang kosong
  if (!tanggal || !dokter || !waktu_mulai || !waktu_akhir) {
    throw "Silahkan lengkapi data!";
  }

  tanggal = parseDate(tanggal);
  waktu_mulai = convertTo24HourFormat(waktu_mulai);
  waktu_akhir = convertTo24HourFormat(waktu_akhir);

  if (waktu_akhir < waktu_mulai) {
    throw "Waktu akhir tidak boleh lebih kecil dari waktu mulai!";
  }

  var data = null;
  await JadwalDokterModel.findById(id)
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
    tanggal,
    dokter,
    waktu_mulai,
    waktu_akhir,
    status_jadwal,
    status: "aktif",
  };

  var list = null;
  await JadwalDokterModel.findByIdAndUpdate(id, new_data)
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
  await JadwalDokterModel.findById(id)
    .then((result) => {
      list = result;
    })
    .catch((e) => {
      throw e.message;
    });
  return list;
}

function parseDate(dateString) {
  // Split the date string into day, month, and year components
  const [day, month, year] = dateString.split("/").map(Number);

  // JavaScript months are 0-indexed, so subtract 1 from the month
  const jsMonth = month - 1;

  // Construct a new Date object using the components
  const date = new Date(year, jsMonth, day);

  return date;
}

function convertTo24HourFormat(timeString) {
  // Parse the time string using moment
  const parsedTime = moment(timeString, "h:mm A");

  // Format the parsed time in 24-hour format
  const formattedTime = parsedTime.format("HH:mm");

  return formattedTime;
}

module.exports = {
  getList,
  hapusData,
  tambahData,
  cariDataBerdasarkanId,
  ubahData,
};

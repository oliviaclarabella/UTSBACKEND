const UserModel = require("../models/UserModel.js");
const DokterModel = require("../models/DokterModel.js");
const SpesialisModel = require("../models/SpesialisModel.js");
const JadwalDokterModel = require("../models/JadwalDokterModel.js");
const { sample_users, sample_spesialis, sample_dokters } = require("../sample_data/data.js");
const { sample_jadwal_dokter } = require("../sample_data/data_jadwal.js");
const dokterService = require("../services/dokterService");
/**
 * GET /create_table/user
 * Create Table User
 */
exports.user = async (req, res) => {
  try {
    const userCount = await UserModel.countDocuments();

    if (userCount > 0) {
      return res.send("Tabel user sudah terbentuk!");
    }

    await UserModel.insertMany(sample_users);
    return res.send("Tabel user berhasil dibuat!");
  } catch (e) {
    console.log("user error ", +e);
  }
};

/**
 * GET /create_table/dokter
 * Create Table Dokter
 */
exports.dokter = async (req, res) => {
  try {
    const count = await DokterModel.countDocuments();

    if (count > 0) {
      res.send("Tabel dokter sudah terbentuk!");
      return;
    }
    
    for (const docData of sample_dokters) {
      const highestDoc = await SpesialisModel.findOne({nama: docData.nama_spesialis}).sort({ _id: -1 });
      if (highestDoc) {
        docData.spesialis = highestDoc._id;
      }

      const doc = new DokterModel(docData);
      await doc.save();
    }
    res.send("Tabel dokter berhasil dibuat!");
  } catch (e) {
    console.log("dokter error", e);
    return res.status(500).send(e.message);
  }
};

/**
 * GET /create_table/spesialis
 * Create Table Spesialis
 */
exports.spesialis = async (req, res) => {
  try {
    const count = await SpesialisModel.countDocuments();

    if (count > 0) {
      res.send("Tabel spesialis sudah terbentuk!");
      return;
    }

    await SpesialisModel.insertMany(sample_spesialis);

    res.send("Tabel spesialis berhasil dibuat!");
  } catch (e) {
    console.log("spesialis error", e);
    return res.status(500).send(e.message);
  }
};

/**
 * GET /create_table/jadwal_dokter
 * Create Table Jadwal Dokter
 */
exports.jadwal_dokter = async (req, res) => {
  try {
    const count = await JadwalDokterModel.countDocuments();

    if (count > 0) {
      res.send("Tabel jadwal dokter sudah terbentuk!");
      return;
    }

    var data_dokter = await dokterService.getList();

    var index = 0;
    var jumlah_sample = sample_jadwal_dokter.length;
    
    for (const dokter of data_dokter) {
      if(index < jumlah_sample ){
        for (let i = 0; i < 3; i++) {
          var jadwal_dokter = sample_jadwal_dokter[index];
          jadwal_dokter.dokter = dokter['_id'];
          jadwal_dokter.status = 'aktif';
          jadwal_dokter.status_jadwal = 'tersedia';
  
          const doc = new JadwalDokterModel(jadwal_dokter);
          await doc.save();
  
          index++;  
        }
      }else{
        break;
      }
      
    }

    res.send("Tabel jadwal dokter berhasil dibuat!");
  } catch (e) {
    console.log("jadwal dokter error", e);
    return res.status(500).send(e.message);
  }
};

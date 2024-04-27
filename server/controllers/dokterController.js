const dokterService = require("../services/dokterService");
const spesialisService = require("../services/spesialisService");
const jadwalDokterService = require("../services/jadwalDokterService");
const reservasiService = require("../services/reservasiService");
const moment = require("moment");
/**
 * GET /dokter
 *
 */

exports.halaman_dokter = async (req, res) => {
  res.cookie("filter_dokter", {
    spesialis: "",
    cari: "",
  });

  res.redirect("/dokter");
};

exports.dokter = async (req, res) => {
  var error = "";
  var list_dokter = [];
  var list_spesialis = [];

  var selected_spesialis = "";
  var cari = "";

  if (req.cookies) {
    if (req.cookies.filter_dokter) {
      if (req.cookies.filter_dokter.spesialis) {
        selected_spesialis = req.cookies.filter_dokter.spesialis;
      }

      if (req.cookies.filter_dokter.cari) {
        cari = req.cookies.filter_dokter.cari;
      }
    }
  }

  try {
    var data_dokter = await dokterService.getList({
      cari,
      spesialis: selected_spesialis,
    });
    if (data_dokter) list_dokter = data_dokter;

    var data_spesialis = await spesialisService.getList({});
    if (data_spesialis) list_spesialis = data_spesialis;
  } catch (e) {
    error = e;
  }

  res.render("dokter.ejs", {
    title: "Dokter",
    page: req.originalUrl,
    req,
    res,
    error: error,
    list_dokter,
    list_spesialis,
    selected_spesialis,
    cari,
    dir: "",
  });
};

exports.cari_dokter = async (req, res) => {
  const { spesialis, cari } = req.body;

  res.cookie("filter_dokter", {
    spesialis,
    cari,
  });

  res.redirect("/dokter");
};

exports.halaman_jadwal_dokter = async (req, res) => {
  res.cookie("filter_jadwal_dokter", {
    spesialis: "",
    cari: "",
    tanggal_mulai: "",
    tanggal_akhir: "",
  });

  res.redirect("/jadwal-dokter");
};

exports.jadwal_dokter = async (req, res) => {
  var error = "";

  var list_spesialis = [];

  var selected_spesialis = "";
  var cari = "";
  var tanggal_mulai_default = moment().format();
  var tanggal_akhir_default = moment().add(6, "days").format();

  var tanggal_mulai = tanggal_mulai_default;
  var tanggal_akhir = tanggal_akhir_default;

  if (req.cookies) {
    if (req.cookies.filter_jadwal_dokter) {
      var filter_jadwal = req.cookies.filter_jadwal_dokter;
      if (filter_jadwal.spesialis) {
        selected_spesialis = filter_jadwal.spesialis;
      }

      if (filter_jadwal.cari) {
        cari = filter_jadwal.cari;
      }

      if (filter_jadwal.tanggal_mulai) {
        tanggal_mulai = moment(
          filter_jadwal.tanggal_mulai,
          "D/M/yyyy"
        ).format();

        if (
          tanggal_mulai != tanggal_mulai_default &&
          moment(tanggal_mulai).isBefore(moment().format())
        ) {
          tanggal_mulai = tanggal_mulai_default;
        }
      }

      if (filter_jadwal.tanggal_akhir) {
        tanggal_akhir = moment(
          filter_jadwal.tanggal_akhir,
          "D/M/yyyy"
        ).format();

        if (
          tanggal_akhir != tanggal_mulai_default &&
          moment(tanggal_akhir).isBefore(moment().format())
        ) {
          if (
            moment(tanggal_akhir).format("DD-MM-YYYY") !=
            moment().format("DD-MM-YYYY")
          ) {
            tanggal_akhir = tanggal_akhir_default;
          }
        }
      }
    }
  }

  if (moment(tanggal_akhir).isBefore(tanggal_mulai)) {
    if (
      moment(tanggal_mulai).format("DD-MM-YYYY") !=
      moment(tanggal_akhir).format("DD-MM-YYYY")
    ) {
      tanggal_mulai = tanggal_mulai_default;
      tanggal_akhir = tanggal_akhir_default;
    }
  }

  var list_jadwal_dokter = [];
  var list_spesialis = [];
  
  try {
    var data_jadwal = await jadwalDokterService.getList({
      cari,
      spesialis: selected_spesialis,
      tanggal_mulai,
      tanggal_akhir,
      status_jadwal: "tersedia",
    });

    if (data_jadwal) list_jadwal_dokter = data_jadwal;

    var data_spesialis = await spesialisService.getList({});
    if (data_spesialis) list_spesialis = data_spesialis;
  } catch (e) {
    error = e;
  }

  res.render("jadwal-dokter.ejs", {
    title: "Jadwal Dokter",
    page: req.originalUrl,
    req,
    res,
    dir: "",
    error: error,
    list_spesialis,
    list_jadwal_dokter,
    selected_spesialis,
    cari,
    tanggal_mulai: moment(tanggal_mulai).format("D/M/yyyy"),
    tanggal_akhir: moment(tanggal_akhir).format("D/M/yyyy"),
  });
};

exports.cari_jadwal = async (req, res) => {
  const { spesialis, cari, tanggal_mulai, tanggal_akhir } = req.body;

  var invalidDate = false;
  var invalidDateSebelumHariIni = false;

  var today = moment().format();
  if (tanggal_mulai) {
    if (
      moment(tanggal_mulai, "D/M/yyyy").format("D/M/yyyy") !=
        moment().format("D/M/yyyy") &&
      moment(moment(tanggal_mulai, "D/M/yyyy").format()).isBefore(today)
    ) {
      invalidDateSebelumHariIni = true;
    }
  } else if (tanggal_akhir) {
    if (
      moment(tanggal_akhir, "D/M/yyyy").format("D/M/yyyy") !=
        moment().format("D/M/yyyy") &&
      moment(moment(tanggal_akhir, "D/M/yyyy").format()).isBefore(today)
    ) {
      invalidDateSebelumHariIni = true;
    }
  }

  if (invalidDateSebelumHariIni) {
    invalidDate = true;
    req.toastr.error(
      "Tanggal mulai dan akhir tidak boleh sebelum tanggal hari ini.",
      "",
      {
        timeOut: 2000,
        closeButton: true,
      }
    );
  }

  if (tanggal_mulai && tanggal_akhir && !invalidDateSebelumHariIni) {
    if (
      moment(moment(tanggal_akhir, "D/M/yyyy").format()).isBefore(
        moment(tanggal_mulai, "D/M/yyyy").format()
      )
    ) {
      invalidDate = true;
      req.toastr.error("Tanggal akhir tidak boleh sebelum tanggal mulai.", "", {
        timeOut: 2000,
        closeButton: true,
      });
    }
  }

  if (tanggal_mulai && !invalidDate) {
    res.cookie("filter_jadwal_dokter", {
      spesialis,
      cari,
      tanggal_mulai,
      tanggal_akhir,
    });
  }
  res.redirect("/jadwal-dokter");
};

exports.histori_reservasi = async (req, res) => {
  var error = "";

  var id_pengguna = "";
  var list_reservasi = [];

  if (req && req.cookies) {
    if (req.cookies.id_pengguna) {
      id_pengguna = req.cookies.id_pengguna;
    }
  }

  try {
    var data_reservasi = await reservasiService.getList({
      user: id_pengguna,
    });
    list_reservasi = data_reservasi;
  } catch (e) {
    error = e;
  }

  res.render("histori_reservasi.ejs", {
    title: "Dokter",
    page: req.originalUrl,
    req,
    res,
    error: error,
    list_reservasi,
    dir: "",
  });
};

exports.halaman_dokter_detail = async (req, res) => {
  const id = req.params.id;

  var data = null;
  try {
    var result = await dokterService.cariDataBerdasarkanId(id);

    if (result) {
      data = result;
    }
  } catch (e) {
    res.redirect("/dokter");
    return;
  }

  res.render("dokter-detail.ejs", {
    title: "Dokter - Detail",
    page: req.originalUrl,
    req,
    res,
    aksi: "Ubah",
    dir: "../../../",
    data,
  });
};

exports.reservasi_dokter_pengguna = async (req, res) => {
  const id = req.params.id;

  try {
    var result = await jadwalDokterService.cariDataBerdasarkanId(id);

    var isSuccess = false;
    if (result) {
      if (result.status == "aktif" && result.status_jadwal == "tersedia") {
        isSuccess = true;

        var id_pengguna = "";

        if (req && req.cookies) {
          if (req.cookies.id_pengguna) {
            id_pengguna = req.cookies.id_pengguna;

            const result_reservasi = await reservasiService.reservasiDokter(
              result["_id"],
              id_pengguna
            );
            if (result_reservasi) {
              req.toastr.success(
                "Jadwal dokter berhasil di reservasi. Silahkan cek histori reservasi.",
                "",
                {
                  timeOut: 2000,
                  closeButton: true,
                }
              );
              res.redirect(req.get("referer"));
              return;
            }
          }
        }
      }
    }

    if (!isSuccess) {
      req.toastr.error("Tidak bisa melakukan reservasi", "", {
        timeOut: 2000,
        closeButton: true,
      });
    }
  } catch (e) {
    req.toastr.error(e.message, "", {
      timeOut: 2000,
      closeButton: true,
    });
  }

  res.redirect(req.get("referer"));
};

exports.batal_reservasi = async (req, res) => {
  const id = req.params.id;

  try {
    var result = await reservasiService.cariDataBerdasarkanId(id);

    var isSuccess = false;
    if (result) {
      if (result.status == "aktif") {
        isSuccess = true;

        const result_reservasi = await reservasiService.batalReservasi(
          result["_id"],
          result["jadwal"]
        );
        if (result_reservasi) {
          req.toastr.success(result_reservasi, "", {
            timeOut: 2000,
            closeButton: true,
          });
          res.redirect("/histori");
          return;
        }
      }
    }

    if (!isSuccess) {
      req.toastr.error("Tidak bisa melakukan reservasi", "", {
        timeOut: 2000,
        closeButton: true,
      });
    }
  } catch (e) {
    req.toastr.error(e.message, "", {
      timeOut: 2000,
      closeButton: true,
    });
  }

  res.redirect(req.get("referer"));
};

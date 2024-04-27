const userService = require("../services/userService");
const dokterService = require("../services/dokterService");
const spesialisService = require("../services/spesialisService");
const reservasiService = require("../services/reservasiService");
const jadwalDokterService = require("../services/jadwalDokterService");
const moment = require("moment");

function hapusSemuaCookie(req, res) {
  for (const [name, value] of Object.entries(req.cookies)) {
    res.clearCookie(name);
  }
}
/**
 * GET /login
 * Login
 */

exports.login = async (req, res) => {
  hapusSemuaCookie(req, res);
  const message = await req.flash("login_status");

  res.render("login.ejs", { title: "Login", message });
};

/**
 * POST /cek-login
 * Cek Login : Username, Password
 */

exports.cek_login = async (req, res) => {
  try {
    const result = await userService.login(req);
    if (result) {
      req.flash("login_status", "Login Berhasil");
      let options = {
        maxAge: 1000 * 60 * 60 * 24 * 7, // would expire in 1 week
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", result.token, options);
      res.cookie("nama_pengguna", result.nama);
      res.cookie("id_pengguna", result.id);
      res.cookie("admin", result.idLevelPengguna === 1 ? 1 : 0);

      req.toastr.success("Login Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/");
    }
  } catch (e) {
    if (e) {
      req.flash("login_status", e);
    } else {
      req.flash("login_status", "Server error");
    }
    res.redirect("/login");
  }
};

/**
 * GET /registrasi
 * Registrasi
 */

exports.registrasi = async (req, res) => {
  const message = await req.flash("registrasi_status");

  res.render("registrasi.ejs", { title: "Login", message });
};

/**
 * POST /cek-registrasi
 * Registrasi
 */
exports.cek_registrasi = async (req, res) => {
  try {
    const result = await userService.registrasi(req);
    if (result) {
      req.toastr.success("Registrasi Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/login");
    }
  } catch (e) {
    if (e) {
      req.flash("registrasi_status", e);
    } else {
      req.flash("registrasi_status", "Server error");
    }
    res.redirect("/registrasi");
  }
};

/**
 * GET /
 * Beranda
 */

exports.beranda = async (req, res) => {
  const message = await req.flash("login_status");

  const dokters = await dokterService.getList();

  const spesialis = await spesialisService.getList();

  var nama_pengguna = "";
  var id_pengguna = "";

  if (req && req.cookies) {
    if (req.cookies.nama_pengguna) {
      nama_pengguna = req.cookies.nama_pengguna;
    }

    if (req.cookies.id_pengguna) {
      id_pengguna = req.cookies.id_pengguna;
    }
  }

  var list_jadwal_dokter = [];
  try {
    var data_jadwal = await jadwalDokterService.getList({
      tanggal_mulai: moment().format(),
      status_jadwal: "tersedia"
    });

    if (data_jadwal) list_jadwal_dokter = data_jadwal;
  } catch (e) {
    error = e;
  }

  res.render("index.ejs", {
    title: "Beranda",
    page: req.originalUrl,
    message,
    req,
    res,
    dir: "",
    nama_pengguna,
    id_pengguna,
    dokters,
    spesialis,
    jadwal: list_jadwal_dokter,
  });
};

/**
 * GET /
 * Logout
 */

exports.logout = async (req, res) => {
  hapusSemuaCookie(req, res);
  res.redirect("/login");
};

/**
 * GET /
 * kontak
 */

exports.kontak = async (req, res) => {
  res.render("kontak.ejs", {
    title: "Kontak",
    page: req.originalUrl,
    req,
    res,
    dir: "",
  });
};

/**
 * GET /
 * profil
 */

exports.profil = async (req, res) => {
  var id_pengguna = "";
  if (req && req.cookies) {
    if (req.cookies.id_pengguna) {
      id_pengguna = req.cookies.id_pengguna;
    }
  }

  var user_data = null;
  var result = await userService.cariDataBerdasarkanId(id_pengguna);

  if (result) {
    user_data = result;
  }

  res.render("profil.ejs", {
    title: "Profil",
    page: req.originalUrl,
    req,
    res,
    dir: "",
    user_data,
  });
};

/**
 * POST /
 * ubah-profil
 */

exports.ubah_profil = async (req, res) => {
  try {
    var id_pengguna = "";
    if (req && req.cookies) {
      if (req.cookies.id_pengguna) {
        id_pengguna = req.cookies.id_pengguna;
      }
    }
    const result = await userService.ubahProfil(req, id_pengguna);
    if (result) {
      let options = {
        maxAge: 1000 * 60 * 60 * 24 * 7, // would expire in 1 week
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", result.token, options);
      res.cookie("nama_pengguna", result.nama);
      res.cookie("id_pengguna", result.id);
      res.cookie("admin", result.idLevelPengguna === 1 ? 1 : 0);

      req.toastr.success("Data profil berhasil diubah", "", {
        timeOut: 2000,
        closeButton: true,
      });
    }
  } catch (e) {
    if (e) {
      req.toastr.error(e, "", {
        timeOut: 2000,
        closeButton: true,
      });
    } else {
      req.toastr.error("Gagal mengubah profil", "", {
        timeOut: 2000,
        closeButton: true,
      });
    }
  }
  res.redirect("/profil");
};

exports.reservasi_dokter_chatbot = async (req, res) => {
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
              //kembalikan jadwal dokter yang baru
              var list_jadwal_dokter = [];
              try {
                var data_jadwal = await jadwalDokterService.getList({
                  tanggal_mulai: moment().format(),
                  status_jadwal: "tersedia"
                });

                if (data_jadwal) list_jadwal_dokter = data_jadwal;
              } catch (e) {
                error = e;
              }
              return res.send(list_jadwal_dokter);
            }
          }
        }
      }
    }

    if (!isSuccess) {
      return res.status(400).send("Jadwal telah direservasi");
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

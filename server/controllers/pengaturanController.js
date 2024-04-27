const userService = require("../services/userService");
const dokterService = require("../services/dokterService");
const bcrypt = require("bcryptjs");
const spesialisService = require("../services/spesialisService");
const jadwalDokterService = require("../services/jadwalDokterService");
const reservasiService = require("../services/reservasiService");
/**
 * GET /pengaturan
 *
 */

exports.halaman_pengaturan = async (req, res) => {
  var list_pengaturan = [
    {
      id: 1,
      nama: "Pengguna",
      icon: "fa-user-cog",
      link: "/pengaturan/pengguna",
    },
    {
      id: 2,
      nama: "Dokter",
      icon: "fa-user-md",
      link: "/pengaturan/dokter",
    },
    {
      id: 3,
      nama: "Spesialis",
      icon: "fa-stethoscope",
      link: "/pengaturan/spesialis",
    },
    {
      id: 4,
      nama: "Jadwal Dokter",
      icon: "fa-calendar-alt",
      link: "/pengaturan/jadwal_dokter",
    },
    {
      id: 5,
      nama: "Reservasi",
      icon: "fa-calendar-check",
      link: "/pengaturan/reservasi",
    },
  ];

  res.render("pengaturan/index.ejs", {
    title: "Pengaturan",
    page: req.originalUrl,
    req,
    res,
    list_pengaturan,
    dir: "../",
  });
};

/**
 * GET /pengaturan/pengguna
 *
 */

exports.pengguna = async (req, res) => {
  var list_user = [];

  try {
    const result = await userService.getList(req);
    if (result) list_user = result;
  } catch (e) {
    error = e;
  }

  res.render("pengaturan/pengguna/index.ejs", {
    title: "Pengaturan - Pengguna",
    page: req.originalUrl,
    req,
    res,
    list_user,
    dir: "../../../",
  });
};

/**
 * GET /pengaturan/pengguna/hapus/:id
 *
 */

exports.hapusPengguna = async (req, res) => {
  const id = req.params.id;

  try {
    await userService.hapusData(id);
    req.toastr.success("Data berhasil dihapus", "", {
      timeOut: 2000,
      closeButton: true,
    });
  } catch (e) {
    error = e;
    req.toastr.error("Gagal menghapus data", "", {
      timeOut: 2000,
      closeButton: true,
    });
  }

  res.redirect("/pengaturan/pengguna");
};

/**
 * GET /pengaturan/tambah_pengguna
 *
 */

exports.tambah_pengguna_form = async (req, res) => {
  res.render("pengaturan/pengguna/tambah_form.ejs", {
    title: "Pengaturan - Pengguna",
    page: req.originalUrl,
    req,
    res,
    aksi: "Tambah",
    dir: "../../../",
  });
};

/**
 * POST /pengaturan/pengguna/tambah
 *
 */

exports.tambah_pengguna = async (req, res) => {
  try {
    const result = await userService.tambahData(req);
    if (result) {
      req.toastr.success("Tambah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/pengguna");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/tambah_pengguna");
  }
};

/**
 * GET /pengaturan/ubah_pengguna/:id
 *
 */

exports.ubah_pengguna_form = async (req, res) => {
  const id = req.params.id;

  var user_data = null;
  try {
    var result = await userService.cariDataBerdasarkanId(id);

    if (result) {
      if (result["password"]) {
        await bcrypt.unc;
      }
      user_data = result;
    }
  } catch (e) {
    res.redirect("/pengaturan/pengguna");
    return;
  }

  res.render("pengaturan/pengguna/edit_form.ejs", {
    title: "Pengaturan - Pengguna",
    page: req.originalUrl,
    req,
    res,
    aksi: "Ubah",
    dir: "../../../",
    user_data,
  });
};

/**
 * POST /pengaturan/pengguna/ubah
 *
 */

exports.ubah_pengguna = async (req, res) => {
  try {
    const result = await userService.ubahData(req.body.id, req);
    if (result) {
      req.toastr.success("Ubah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/pengguna");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/ubah_pengguna/" + req.body.id);
  }
};

/**
 * GET /pengaturan/dokter
 *
 */

exports.dokter = async (req, res) => {
  var list_dokter = [];

  try {
    const result = await dokterService.getList(req);
    if (result) list_dokter = result;
  } catch (e) {
    error = e;
  }

  res.render("pengaturan/dokter/index.ejs", {
    title: "Pengaturan - Dokter",
    page: req.originalUrl,
    req,
    res,
    list_dokter,
    dir: "../../../",
  });
};

/**
 * GET /pengaturan/dokter/hapus/:id
 *
 */

exports.hapusDokter = async (req, res) => {
  const id = req.params.id;

  try {
    await dokterService.hapusData(id);
    req.toastr.success("Data berhasil dihapus", "", {
      timeOut: 2000,
      closeButton: true,
    });
  } catch (e) {
    error = e;
    req.toastr.error("Gagal menghapus data", "", {
      timeOut: 2000,
      closeButton: true,
    });
  }

  res.redirect("/pengaturan/dokter");
};

/**
 * GET /pengaturan/tambah_dokter
 *
 */

exports.tambah_dokter_form = async (req, res) => {
  var list_spesialis = [];

  try {
    var data_spesialis = await spesialisService.getList({});
    if (data_spesialis) list_spesialis = data_spesialis;
  } catch (e) {
    error = e;
  }

  res.render("pengaturan/dokter/tambah_form.ejs", {
    title: "Pengaturan - Dokter - Form Tambah",
    page: req.originalUrl,
    req,
    res,
    aksi: "Tambah",
    dir: "../../../",
    list_spesialis,
  });
};

/**
 * POST /pengaturan/dokter/tambah
 *
 */

exports.tambah_dokter = async (req, res) => {
  try {
    const result = await dokterService.tambahData(req);
    if (result) {
      req.toastr.success("Tambah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/dokter");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/tambah_dokter");
  }
};

/**
 * GET /pengaturan/ubah_dokter/:id
 *
 */

exports.ubah_dokter_form = async (req, res) => {
  const id = req.params.id;

  var data = null;
  try {
    var result = await dokterService.cariDataBerdasarkanId(id);

    if (result) {
      data = result;
    }
  } catch (e) {
    res.redirect("/pengaturan/dokter");
    return;
  }

  var list_spesialis = [];

  try {
    var data_spesialis = await spesialisService.getList({});
    if (data_spesialis) list_spesialis = data_spesialis;
  } catch (e) {}

  res.render("pengaturan/dokter/edit_form.ejs", {
    title: "Pengaturan - Dokter - Form Edit",
    page: req.originalUrl,
    req,
    res,
    aksi: "Ubah",
    dir: "../../../",
    data,
    list_spesialis,
  });
};

/**
 * POST /pengaturan/dokter/ubah
 *
 */

exports.ubah_dokter = async (req, res) => {
  try {
    const result = await dokterService.ubahData(req.body.id, req);
    if (result) {
      req.toastr.success("Ubah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/dokter");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/ubah_dokter/" + req.body.id);
  }
};

/**
 * GET /pengaturan/spesialis
 *
 */

exports.spesialis = async (req, res) => {
  var list_spesialis = [];

  try {
    const result = await spesialisService.getList(req);
    if (result) list_spesialis = result;
  } catch (e) {
    error = e;
  }

  res.render("pengaturan/spesialis/index.ejs", {
    title: "Pengaturan - Spesialis",
    page: req.originalUrl,
    req,
    res,
    list_spesialis,
    dir: "../../../",
  });
};

/**
 * GET /pengaturan/spesialis/hapus/:id
 *
 */

exports.hapusSpesialis = async (req, res) => {
  const id = req.params.id;

  try {
    await spesialisService.hapusData(id);
    req.toastr.success("Data berhasil dihapus", "", {
      timeOut: 2000,
      closeButton: true,
    });
  } catch (e) {
    error = e;
    req.toastr.error("Gagal menghapus data", "", {
      timeOut: 2000,
      closeButton: true,
    });
  }

  res.redirect("/pengaturan/spesialis");
};

/**
 * GET /pengaturan/tambah_spesialis
 *
 */

exports.tambah_spesialis_form = async (req, res) => {
  res.render("pengaturan/spesialis/tambah_form.ejs", {
    title: "Pengaturan - Spesialis - Form Tambah",
    page: req.originalUrl,
    req,
    res,
    aksi: "Tambah",
    dir: "../../../",
  });
};

/**
 * POST /pengaturan/spesialis/tambah
 *
 */

exports.tambah_spesialis = async (req, res) => {
  try {
    const result = await spesialisService.tambahData(req);
    if (result) {
      req.toastr.success("Tambah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/spesialis");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/tambah_spesialis");
  }
};

/**
 * GET /pengaturan/ubah_spesialis/:id
 *
 */

exports.ubah_spesialis_form = async (req, res) => {
  const id = req.params.id;

  var data = null;
  try {
    var result = await spesialisService.cariDataBerdasarkanId(id);

    if (result) {
      data = result;
    }
  } catch (e) {
    res.redirect("/pengaturan/spesialis");
    return;
  }

  res.render("pengaturan/spesialis/edit_form.ejs", {
    title: "Pengaturan - Spesialis - Form Edit",
    page: req.originalUrl,
    req,
    res,
    aksi: "Ubah",
    dir: "../../../",
    data,
  });
};

/**
 * POST /pengaturan/spesialis/ubah
 *
 */

exports.ubah_spesialis = async (req, res) => {
  try {
    const result = await spesialisService.ubahData(req.body.id, req);
    if (result) {
      req.toastr.success("Ubah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/spesialis");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/ubah_spesialis/" + req.body.id);
  }
};

/**
 * GET /pengaturan/jadwal_dokter
 *
 */

exports.jadwal_dokter = async (req, res) => {
  var list_jadwal_dokter = [];

  try {
    const result = await jadwalDokterService.getList(req);
    if (result) list_jadwal_dokter = result;
  } catch (e) {
    error = e;
  }

  res.render("pengaturan/jadwal_dokter/index.ejs", {
    title: "Pengaturan - Jadwal Dokter",
    page: req.originalUrl,
    req,
    res,
    list_jadwal_dokter,
    dir: "../../../",
  });
};

/**
 * GET /pengaturan/spesialis/hapus/:id
 *
 */

exports.hapusJadwalDokter = async (req, res) => {
  const id = req.params.id;

  try {
    await jadwalDokterService.hapusData(id);
    req.toastr.success("Data berhasil dihapus", "", {
      timeOut: 2000,
      closeButton: true,
    });
  } catch (e) {
    error = e;
    req.toastr.error("Gagal menghapus data", "", {
      timeOut: 2000,
      closeButton: true,
    });
  }

  res.redirect("/pengaturan/jadwal_dokter");
};

/**
 * GET /pengaturan/tambah_jadwal_dokter
 *
 */

exports.tambah_jadwal_dokter_form = async (req, res) => {
  var list_dokter = [];

  try {
    var data_dokter = await dokterService.getList({});
    if (data_dokter) list_dokter = data_dokter;
  } catch (e) {
    error = e;
  }

  res.render("pengaturan/jadwal_dokter/tambah_form.ejs", {
    title: "Pengaturan - Jadwal Dokter - Form Tambah",
    page: req.originalUrl,
    req,
    res,
    aksi: "Tambah",
    dir: "../../../",
    list_dokter,
  });
};

/**
 * POST /pengaturan/jadwal_dokter/tambah
 *
 */

exports.tambah_jadwal_dokter = async (req, res) => {
  try {
    const result = await jadwalDokterService.tambahData(req);
    if (result) {
      req.toastr.success("Tambah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/jadwal_dokter");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/tambah_jadwal_dokter");
  }
};

/**
 * GET /pengaturan/ubah_jadwal_dokter/:id
 *
 */

exports.ubah_jadwal_dokter_form = async (req, res) => {
  const id = req.params.id;

  var data = null;
  try {
    var result = await jadwalDokterService.cariDataBerdasarkanId(id);

    if (result) {
      data = result;
    }
  } catch (e) {
    res.redirect("/pengaturan/jadwal_dokter");
    return;
  }

  var list_dokter = [];

  try {
    var data_dokter = await dokterService.getList({});
    if (data_dokter) list_dokter = data_dokter;
  } catch (e) {
    error = e;
  }

  res.render("pengaturan/jadwal_dokter/edit_form.ejs", {
    title: "Pengaturan - Jadwal Dokter - Form Edit",
    page: req.originalUrl,
    req,
    res,
    aksi: "Ubah",
    dir: "../../../",
    data,
    list_dokter
  });
};

/**
 * POST /pengaturan/jadwal_dokter/ubah
 *
 */

exports.ubah_jadwal_dokter = async (req, res) => {
  try {
    const result = await jadwalDokterService.ubahData(req.body.id, req);
    if (result) {
      req.toastr.success("Ubah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/jadwal_dokter");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/ubah_jadwal_dokter/" + req.body.id);
  }
};

/**
 * GET /pengaturan/reservasi
 *
 */

exports.reservasi = async (req, res) => {
  var list_reservasi = [];

  try {
    const result = await reservasiService.getList(req);
    if (result) list_reservasi = result;
  } catch (e) {
    error = e;
  }

  res.render("pengaturan/reservasi/index.ejs", {
    title: "Pengaturan - Reservasi",
    page: req.originalUrl,
    req,
    res,
    list_reservasi,
    dir: "../../../",
  });
};

/**
 * GET /pengaturan/reservasi/hapus/:id
 *
 */

exports.hapusReservasi = async (req, res) => {
  const id = req.params.id;

  try {
    await reservasiService.hapusData(id);
    
    req.toastr.success("Data berhasil dihapus", "", {
      timeOut: 2000,
      closeButton: true,
    });
  } catch (e) {
    error = e;
    req.toastr.error("Gagal menghapus data", "", {
      timeOut: 2000,
      closeButton: true,
    });
  }

  res.redirect("/pengaturan/reservasi");
};


/**
 * GET /pengaturan/ubah_reservasi/:id
 *
 */

exports.ubah_reservasi_form = async (req, res) => {
  const id = req.params.id;

  var data = null;
  try {
    var result = await reservasiService.cariDataBerdasarkanId(id);

    if (result) {
      data = result;
    }
  } catch (e) {
    res.redirect("/pengaturan/reservasi");
    return;
  }
  
  res.render("pengaturan/reservasi/edit_form.ejs", {
    title: "Pengaturan - Reservasi - Form Edit",
    page: req.originalUrl,
    req,
    res,
    aksi: "Ubah",
    dir: "../../../",
    data
  });
};

/**
 * POST /pengaturan/reservasi/ubah
 *
 */

exports.ubah_reservasi = async (req, res) => {
  try {
    const result = await reservasiService.ubahData(req.body.id, req);
    if (result) {
      req.toastr.success("Ubah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/pengaturan/reservasi");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/pengaturan/reservasi/" + req.body.id);
  }
};

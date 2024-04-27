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
 * GET /registrasi
 * Registrasi
 */

exports.registrasi = async (req, res) => {
  const message = await req.flash("registrasi_status");

  res.render("registrasi.ejs", { title: "Login", message });
};


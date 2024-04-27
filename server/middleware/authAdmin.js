const jwt = require("jsonwebtoken");
function verifyTokenAdmin(req, res, next) {
  var token = req.cookies ? (req.cookies.token ? req.cookies.token : "") : "";

  if (!token) return res.redirect("/login");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;

    if (req && req.cookies && req.cookies.admin == 1) {
      next();
    } else {
      return res.redirect("/notfound");
    }
  } catch (error) {
    req.toastr.error("Invalid token", "", {
      timeOut: 2000,
      closeButton: true,
    });

    return res.redirect("/login");
  }
}

module.exports = verifyTokenAdmin;

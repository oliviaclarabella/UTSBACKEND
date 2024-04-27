const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel.js");

async function login(req) {
  const { username, password } = req.body;
  //cek data yang kosong
  if (!username || !password) {
    throw "Silahkan lengkapi data!";
  }

  const user = await UserModel.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    return generateTokenResponse(user);
  } else {
    throw "Username atau password tidak valid";
  }
}

async function registrasi(req) {
  const { nama, username, password, konfirmasi_password, email, noHp } =
    req.body;

  //cek data yang kosong
  if (
    !nama ||
    !username ||
    !password ||
    !konfirmasi_password ||
    !email ||
    !noHp
  ) {
    throw "Silahkan lengkapi data!";
  }

  //cek format email
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(email)) {
    throw "Email tidak valid!";
  }

  if (password != konfirmasi_password) {
    throw "Password dan Konfirmasi Password tidak sama!";
  }

  const user = await UserModel.findOne({ username });
  if (user) {
    throw "Username sudah digunakan!";
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    nama,
    username,
    password: encryptedPassword,
    email: email.toLowerCase(),
    noHp: noHp,
    idLevelPengguna: 2,
    status: "aktif",
  };

  try {
    await UserModel.create(newUser);
    return "Registrasi berhasil!";
  } catch (e) {
    throw e.message;
  }
}

// tampilkan data
async function getList(body) {
  var list = [];
  try {
    var filter = { status: "aktif" };
    const result = await UserModel.find(filter);

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await UserModel.findByIdAndUpdate(id, { status: "hapus" })
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  const { nama, username, password, email, noHp, hakAkses } = req.body;

  //cek data yang kosong
  if (!nama || !username || !password || !email) {
    throw "Silahkan lengkapi data!";
  }

  //cek format email
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(email)) {
    throw "Email tidak valid!";
  }

  const user = await UserModel.findOne({ username });
  if (user) {
    throw "Username sudah digunakan!";
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  var newUser = {
    nama,
    username,
    password: encryptedPassword,
    email: email.toLowerCase(),
    noHp: noHp,
    idLevelPengguna: hakAkses ? parseInt(hakAkses) : 2,
    status: "aktif",
  };

  if (user && (await bcrypt.compare(password, user.password))) {
  } else {
  }

  try {
    await UserModel.create(newUser);
    return "Registrasi berhasil!";
  } catch (e) {
    throw e.message;
  }
}

// ubah data
async function ubahData(id, req) {
  const { nama, username, password, email, noHp, hakAkses } = req.body;

  //cek data yang kosong
  if (!nama || !username || !email) {
    throw "Silahkan lengkapi data!";
  }

  var user = null;
  await UserModel.findById(id)
    .then((result) => {
      user = result;
    })
    .catch((e) => {
      throw e.message;
    });

  if (user == null) {
    throw "User tidak ditemukan!";
  }

  //cek format email
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(email)) {
    throw "Email tidak valid!";
  }

  const another_user = await UserModel.findOne({
    username,
    _id: { $ne: id },
  });

  if (another_user) {
    throw "Username sudah digunakan!";
  }

  var new_data = {
    nama,
    username,
    email: email.toLowerCase(),
    noHp: noHp,
    idLevelPengguna: hakAkses ? parseInt(hakAkses) : 2,
    status: "aktif",
  };

  if (await bcrypt.compare(password, user.password)) {
  } else if (password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    new_data["password"] = encryptedPassword;
  }

  var list = null;
  await UserModel.findByIdAndUpdate(id, new_data)
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
  await UserModel.findById(id)
    .then((result) => {
      list = result;
    })
    .catch((e) => {
      throw e.message;
    });
  return list;
}

// Generate token baru saat autentikasi user
const generateTokenResponse = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    username: user.username,
    noHp: user.noHp,
    token: token,
    idLevelPengguna: user.idLevelPengguna,
  };
};

async function ubahProfil(req, id_pengguna) {
  const { nama, username, password, email, noHp } =
    req.body;

  //cek data yang kosong
  if (
    !nama ||
    !username ||
    !email ||
    !noHp
  ) {
    throw "Silahkan lengkapi data!";
  }

  //cek format email
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(email)) {
    throw "Email tidak valid!";
  }

  const check_user = await UserModel.findOne({ username });
  
  if (check_user) {
    if(check_user._id != id_pengguna){
      throw "Username sudah digunakan!";
    } 
  }

  const newData = {
    nama,
    username,
    email: email.toLowerCase(),
    noHp: noHp,
    idLevelPengguna: 2,
    status: "aktif",
  };

  if(password){
    const encryptedPassword = await bcrypt.hash(password, 10);
    newData['password'] = encryptedPassword;
  }

  try {
    await UserModel.findByIdAndUpdate(id_pengguna, newData);

    const user = await UserModel.findById(id_pengguna);
    if (user) {
      return generateTokenResponse(user);
    }else{
      throw "User tidak ditemukan";
    }
    
  } catch (e) {
    throw e.message;
  }
}

module.exports = {
  login,
  registrasi,
  getList,
  hapusData,
  tambahData,
  cariDataBerdasarkanId,
  ubahData,
  ubahProfil
};

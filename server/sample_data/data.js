const sample_users = [
  {
    nama: "Administrator",
    username: "admin",
    password: "$2a$10$2b7E6oiDUbDBZXK.PRZXT.yapmpREu3BsDqBjrNEYAxzC4IPKeaiO",
    email: "admin@gmail.com",
    noHp: "",
    status: "aktif",
    idLevelPengguna: 1,
  },
];

const sample_spesialis = [
  {
    no: 1,
    nama: "Anak",
    status: "aktif",
  },
  {
    no: 2,
    nama: "Dokter Umum",
    status: "aktif",
  },
  {
    no: 3,
    nama: "THT",
    status: "aktif",
  },
  {
    no: 4,
    nama: "Dokter Bedah",
    status: "aktif",
  },
  {
    no: 5,
    nama: "Dokter Gigi",
    status: "aktif",
  },
];

const sample_dokters = [
  {
    no: 1,
    nama: "Dr. Agustina Santi Sp.A, M.Sc, IBCLC",
    biaya: 240000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Anak",
    deskripsi:
      "Dr. Agustina Santi, Sp.A, M.Sc., IBCLC mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Gadjah Mada, Beliau yang tergabung dalam Ikatan Dokter Anak Indonesia (ISAI) dan Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan seputar tumbuh dan kembang anak.",
    status: "aktif",
  },
  {
    no: 2,
    nama: "Dr. Benita Deselina, Sp.A",
    biaya: 350000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Anak",
    deskripsi:
      "Dr. Benita Deselina, Sp.A mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Indonesia, Depok pada tahun 2001. Beliau yang tergabung dalam Ikatan Dokter Anak Indonesia (ISAI) dan Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan seputar tumbuh dan kembang anak.",
    status: "aktif",
  },
  {
    no: 3,
    nama: "Dr. Damar Prasetya Ajie Putra, Sp.A , M.Sc",
    biaya: 590000,
    foto: "uploads/team-1.jpg",
    spesialis: null,
    nama_spesialis: "Anak",
    deskripsi:
      "Dr. Damar Prasetya, Sp.A., M.Sc mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Gadjah Mada. Beliau tergabung dalam Ikatan Dokter Anak Indonesia (IDAI) dan Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan seputar tumbuh dan kembang anak.",
    status: "aktif",
  },
  {
    no: 4,
    nama: "Dr. Cindy Diana Christie, Sp.A",
    biaya: 350000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Anak",
    deskripsi:
      "Dr. Cindy Diana Christie, Sp.A mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Univeristas Indonesia, Depok. Beliau tergabung dalam Ikatan Dokter Anak Indonesia (IDAI) dan Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan seputar tumbuh dan kembang anak.",
    status: "aktif",
  },
  {
    no: 5,
    nama: "Dr. Harun Wijaya, Sp.A",
    biaya: 400000,
    foto: "uploads/team-2.jpg",
    spesialis: null,
    nama_spesialis: "Anak",
    deskripsi:
      "Dr. Harun Wijaya, Sp.A mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Fe Del Mundo Medical Center Foundation Philippines. Beliau yang tergabung dalam Ikatan Dokter Indonesia (IDI) dan Ikatan Dokter Anak Indonesia (IDAI) sebagai anggota ini bisa memberikan layanan konsultasi, pemeriksaan, dan pengobatan terkait masalah kesehatan pada anak.",
    status: "aktif",
  },
  {
    no: 6,
    nama: "Dr. Cynthia Rusli",
    biaya: 135000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Umum",
    deskripsi:
      "Dr. Cynthia Rusli merupakan Dokter Umum. Dr. Cynthia Rusli mendapatkan gelar kedokterannya setelah menamatkan pendidikan di Universitas Kristen Krida Wacana.Beliau yang tergabung dalam Ikatan Dokter Indonesia sebagai anggota ini bisa memberikan layanan Konsultasi, Pemeriksaan, dan Pengobatan terkait dengan masalah kesehatan secara umum.",
    status: "aktif",
  },
  {
    no: 7,
    nama: "Dr. Edwin MM",
    biaya: 140000,
    foto: "uploads/team-1.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Umum",
    deskripsi:
      "Dr. Edwin MM adalah seorang Dokter Umum. Dr. Edwin MM mendapatkan gelar kedokterannya setelah menamatkan pendidikan di Universitas Kristen Krida Wacana. Beliau yang tergabung dalam Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan konsultasi seputar kesehatan umum.",
    status: "aktif",
  },
  {
    no: 8,
    nama: "Dr. Inanto Widjaja",
    biaya: 120000,
    foto: "uploads/team-2.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Umum",
    deskripsi:
      "Dr. Inanto Widjaja adalah Dokter Umum. Dr. Inanto Widjaja mendapatkan gelar kedokterannya setelah menamatkan pendidikan di Universitas Katolik Indonesia Atma Jaya. Beliau yang tergabung dalam Ikatan Dokter Indonesia sebagai anggota ini bisa memberikan layanan Konsultasi, Pemeriksaan, dan Pengobatan terkait dengan masalah kesehatan secara umum.",
    status: "aktif",
  },
  {
    no: 9,
    nama: "Dr. Clara Dwi Retno Kumororini",
    biaya: 75000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Umum",
    deskripsi:
      "Dr. Clara Dwi Retno Kumororini adalah Dokter Umum. Beliau yang tergabung dalam Ikatan Dokter Indonesia sebagai anggota ini bisa memberikan layanan Konsultasi, Pemeriksaan, dan Pengobatan terkait dengan masalah kesehatan secara umum.",
    status: "aktif",
  },
  {
    no: 10,
    nama: "Dr. Denisa Prahajna",
    biaya: 135000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Umum",
    deskripsi:
      "Dr. Denisa Prahajna adalah Dokter Umum. Dr. Denisa Prahajna mendapatkan gelar kedokterannya setelah menamatkan pendidikan di Universitas Indonesia. Beliau yang tergabung dalam Ikatan Dokter Indonesia sebagai anggota ini bisa memberikan layanan Konsultasi, Pemeriksaan, dan Pengobatan terkait dengan masalah kesehatan secara umum.",
    status: "aktif",
  },
  {
    no: 11,
    nama: "Dr. Achmad Chusnu Romdhoni, Sp.THT-KL",
    biaya: 400000,
    foto: "uploads/team-1.jpg",
    spesialis: null,
    nama_spesialis: "THT",
    deskripsi:
      "Dr. Achmad Chusnu Romdhoni, Sp.THT-KL adalah Dokter Spesialis Telinga Hidung Tenggorokan – Kepala Leher. Dr. Achmad Chusnu Romdhoni, Sp.THT-KL mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Airlangga. Beliau tergabung dalam anggota Perhimpunan Telinga Hidung Tenggorok Bedah Kepala Leher Indonesia (PERHATI-KL) dan Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan konsultasi seputar gangguan kesehatan telinga hidung tenggorokan – kepala leher.",
    status: "aktif",
  },
  {
    no: 12,
    nama: "Dr. Adisti Mega Rinindra, Sp.THT-KL",
    biaya: 350000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "THT",
    deskripsi:
      "Dr. Adisti Mega Rinindra, Sp.THT-KL adalah Dokter Spesialis Telinga Hidung Tenggorokan – Kepala Leher. Dr. Adisti Mega Rinindra mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Indonesia, Depok pada tahun 2002. Beliau tergabung dalam anggota Perhimpunan Telinga Hidung Tenggorok Bedah Kepala Leher Indonesia (PERHATI-KL) dan Ikatan Dokter Indonesia (IDI) dapat memberikan layanan konsultasi seputar gangguan kesehatan telinga hidung tenggorokan – kepala leher.",
    status: "aktif",
  },
  {
    no: 13,
    nama: "Dr. Agus Santosa, Sp.THT-KL",
    biaya: 290000,
    foto: "uploads/team-2.jpg",
    spesialis: null,
    nama_spesialis: "THT",
    deskripsi:
      "Dr. Agus Santosa, Sp.THT-KL adalah Dokter Spesialis Telinga Hidung Tenggorokan. Dr. Agus Santosa mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Udayana, Kota Denpasar.Beliau tergabung dalam Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan konsultasi seputar gangguan kesehatan telinga hidung tenggorokan.",
    status: "aktif",
  },
  {
    no: 14,
    nama: "Dr. Anne Indrawati, Sp.THT-KL",
    biaya: 180000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "THT",
    deskripsi:
      "Dr. Anne mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Padjadjaran, Bandung pada tahun 2002. Beliau yang tergabung dalam anggota Perhimpunan Telinga Hidung Tenggorok Bedah Kepala Leher Indonesia (PERHATI-KL) dan Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan konsultasi seputar gangguan kesehatan telinga hidung tenggorokan – kepala leher.",
    status: "aktif",
  },
  {
    no: 15,
    nama: "Dr. Bambang Hari Santosa, Sp.THT-KL",
    biaya: 250000,
    foto: "uploads/team-1.jpg",
    spesialis: null,
    nama_spesialis: "THT",
    deskripsi:
      "Dr. Bambang Hari Santosa, Sp.THT-KL adalah Dokter Spesialis Telinga Hidung Tenggorokan. Dr. Bambang Hari Santosa mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Gadjah Mada. Beliau tergabung dalam Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan konsultasi seputar gangguan kesehatan telinga hidung tenggorokan.",
    status: "aktif",
  },
  {
    no: 16,
    nama: "Dr. Adi Aryanto, Sp.OT",
    biaya: 240000,
    foto: "uploads/team-2.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Bedah",
    deskripsi:
      "Dr. Adi Aryanto, Sp.OT adalah Dokter Spesialis Orthopaedi dan Traumatologi. Dr. Adi Aryanto, Sp.OT mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Indonesia, Depok. Beliau tergabung dalam Perhimpunan Dokter Spesialis Orthopaedi & Traumatologi Indonesia (PABOI) dan Ikatan Dokter Indonesia (IDI) sebagai anggota ini dapat memberikan layanan konsultasi seputar orthopaedi dan traumatologi.",
    status: "aktif",
  },
  {
    no: 17,
    nama: "Dr. Agi Satria Putranto, Sp.B-KBD",
    biaya: 460000,
    foto: "uploads/team-1.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Bedah",
    deskripsi:
      "Dr. Agi Satria Putranto, Sp.B-KBD adalah Dokter Spesialis Bedah Digestif. Dr. Agi Satria Putranto mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Indonesia, Depok. Beliau tergabung Ikatan Ahli Bedah Indonesia (IKABI) dan Perhimpunan Dokter Spesialis Bedah Digestif Indonesia (IKABDI) dapat memberikan layanan konsultasi seputar bedah digestif atau saluran pencernaan.",
    status: "aktif",
  },
  {
    no: 18,
    nama: "Dr. Agil Salim, Sp.B (K) Trauma, FINACS., FICS",
    biaya: 245000,
    foto: "uploads/team-2.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Bedah",
    deskripsi:
      "Dr. Agil Salim, Sp.B (K) Trauma, FINACS., FICS adalah Dokter Spesialis Bedah Umum Konsultan Trauma. Dr. Agil Salim mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Indonesia. Beliau tergabung dalam Ikatan Ahli Bedah Indonesia dan Ikatan Dokter Indonesia dapat memberikan layanan medis berupa konsultasi sebelum tindakan bedah umum.",
    status: "aktif",
  },
  {
    no: 19,
    nama: "Dr. Adinda Widita, Sp.BP-RE",
    biaya: 310000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Bedah",
    deskripsi:
      "Dr. Adinda Widita, Sp.BP-RE adalah seorang Dokter Spesialis Bedah Plastik Rekonstruksi dan Estetik. Dr. Adinda Widita, Sp.BP-RE mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Airlangga. Beliau yang tergabung dalam Perhimpunan Dokter Spesialis Bedah Plastik Indonesia sebagai anggota ini dapat memberikan layanan konsultasi bedah plastik rekonstruksi dan estetik.",
    status: "aktif",
  },
  {
    no: 20,
    nama: "Dr. Bambang Nugroho, Sp.OT(K) ",
    biaya: 400000,
    foto: "uploads/team-1.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Bedah",
    deskripsi:
      "Dr. Bambang Nugroho, Sp.OT(K) adalah Dokter Spesialis Orthopaedi dan Traumatologi Konsultan Hip and Knee. Dr. Bambang Nugroho, Sp.OT(K mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Indonesia, Depok. Beliau yang tergabung dalam Ikatan Dokter Indonesia (IDI) dan Perhimpunan Dokter Spesialis Orthopedi dan Traumatologi Indonesia bisa memberikan layanan Konsultasi dan Tindakan terkait trauma tulang.",
    status: "aktif",
  },
  {
    no: 21,
    nama: "Drg. Deddy Wijaya",
    biaya: 200000,
    foto: "uploads/team-2.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Gigi",
    deskripsi:
      "Drg. Deddy Wijaya adalah Dokter Gigi. Drg. Deddy Wijaya mendapatkan gelar Kedokteran Gigi setelah menamatkan pendidikan di Universitas Trisakti. Beliau yang tergabung dalam Persatuan Dokter Gigi Indonesia (PDGI) sebagai anggota ini bisa memberikan layanan konsultasi terkait Kesehatan Gigi Umum.",
    status: "aktif",
  },
  {
    no: 22,
    nama: "Drg. Adia Laksita Azahari",
    biaya: 135000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Gigi",
    deskripsi:
      "Drg. Adia Laksita Azahari adalah Dokter Gigi. Drg. Adia Laksita Azahari mendapatkan gelar Kedokteran Gigi setelah menamatkan pendidikan di Universitas Indonesia. Beliau yang tergabung dalam Persatuan Dokter Gigi Indonesia (PDGI) sebagai anggota ini bisa memberikan layanan konsultasi terkait Kesehatan Gigi Umum.",
    status: "aktif",
  },
  {
    no: 23,
    nama: "Drg. Eka Chitra Firriyanti",
    biaya: 150000,
    foto: "uploads/team-1.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Gigi",
    deskripsi:
      "Drg. Eka Chitra Fitriyanti adalah Dokter Gigi Umum. Drg. Eka Chitra Fitriyanti mendapatkan gelar kedokteran gigi setelah menamatkan pendidikan di Universitas Trisakti, Jakarta. Beliau tergabung dalam Persatuan Dokter Gigi Indonesia (PDGI) sebagai anggota ini dapat memberikan layanan konsultasi seputar gangguan kesehatan gigi umum.",
    status: "aktif",
  },
  {
    no: 24,
    nama: "Drg. Elva Anjani Novita Iskandar Winata",
    biaya: 100000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Gigi",
    deskripsi:
      "Drg. Elva Anjani Novita Iskandar Winata adalah Dokter Gigi. Drg. Elva Anjani Novita Iskandar Winata mendapatkan gelar Kedokteran Gigi setelah menamatkan pendidikan di Universitas Airlangga. Beliau yang tergabung dalam Persatuan Dokter Gigi Indonesia (PDGI) sebagai anggota ini bisa memberikan layanan konsultasi terkait Kesehatan Gigi Umum.",
    status: "aktif",
  },
  {
    no: 25,
    nama: "Drg. Fransisca Amanda",
    biaya: 300000,
    foto: "uploads/team-3.jpg",
    spesialis: null,
    nama_spesialis: "Dokter Gigi",
    deskripsi:
      "Drg. Fransisca Amanda adalah Dokter Gigi Umum. Drg. Fransisca Amanda mendapatkan gelar spesialisnya setelah menamatkan pendidikan di Universitas Trisakti. Beliau tergabung dalam Persatuan Dokter Gigi Indonesia (PDGI) ini dapat memberikan layanan konsultasi seputar gangguan kesehatan gigi umum.",
    status: "aktif",
  },
];

module.exports = { sample_users, sample_dokters, sample_spesialis };
